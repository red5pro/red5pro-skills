---
title: 10. Configure and Deploy
description: Configure and Deploy Stream Manager
menu_order: 11
---

**Note: after the Stream Manager instance is started up, you will need to add its Private IP address to the Database Security group, per [the DB security step above](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/prepare-mysql/)**

<u>**New Server Instance:**</u>

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), in the region where you reserved the streammanager IP address
* Click on Launch Instance.
* Step 1: Choose an Amazon Machine Image (AMI) - click on My AMIs, and select the AMI that you just created for the nodes.
* Step 2: Choose an Instance Type - we suggest selecting a multi-cpu instance type with high network performance (for example, m4.large). Click on Next: Configure Instance Details
* Step 3: Configure Instance Details - Network: chose the VPC that you set up earlier for this region; accept other defaults. Click on Next: Add Storage.
* Step 4: Add Storage - the default disk size should be sufficient. Click on Next: Tag Instance, then Next: Configure Security Group
* Step 6: Configure Security Group - Create a new security group with the following ports allowed from anywhere (optionally, you can restrict SSH access to your network):

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro; websockets for WebRTC / Stream Manager | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |
| *8081* | *websockets for WebRTC (severs earlier than 5.4.0)*| TCP |
| *8083* | *secure websockets for WebRTC (severs earlier than 5.4.0)*| TCP |

**NOTE: As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`, so you do not need to open up port 8083.**

* Click on Review And Launch, then Launch - Select the keypair that you added, or create a new one to use exclusively on this machine.
* Make a note of the instance ID - will need this to associate the Elastic IP address.

<u>**Associate the reserved IP address with this instance:**</u>

* From the left-hand navigation, under NETWORK & SECURITY, select Elastic IPs
* Choose the IP address that you reserved
* Actions, Associate Address
* Select the Stream Manager instance from the list. Accept the defaults. Click on **Associate**

## Configure the Stream Manager Instance

* SSH into the Stream Manager instance
* Stop the Red5 Pro service (`sudo systemctl stop red5pro`)

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC (this should be the default on AWS instances). Type `date` at the prompt. This will return the date, time and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

* Navigate to the directory where you installed Red5 Pro (e.g. `/usr/local/red5pro`)
* **Delete the following files:**
  * `{red5prohome}/conf/autoscale.xml`
  * `{red5prohome}/plugins/red5pro-autoscale-plugin-<version>.jar`
  * `{red5prohome}/plugins/red5pro-webrtc-plugin-<version>.jar`

Import and Activate AWS Cloud Controller

Copy the aws-cloud-controller.jar into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the applicationContext.xml file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml` per the following:

* Locate the AWS controller “bean” and uncomment it as shown below  (*note: do not modify the values, only uncomment the bean configuration to make it active*):

```xml
<!-- AWS CONTROLLER -->
<bean id="apiBridge" class="com.red5pro.services.cloud.aws.component.AWSInstanceController" init-method="initialize">
<property name="accessKey" value="${aws.accessKey}"/>
<property name="accessSecret" value="${aws.accessSecret}"/>
<property name="ec2KeyPairName" value="${aws.ec2KeyPairName}"/>
<property name="ec2SecurityGroup" value="${aws.ec2SecurityGroup}"/>
<property name="defaultZone" value="${aws.defaultzone}"/>
<property name="operationTimeoutMilliseconds" value="${aws.operationTimeoutMilliseconds}"/>
</bean>
```

Comment out (or delete the entry for) the default controller as shown below to disable it:

```xml
<!-- Default CONTROLLER -->
<! --
<bean id="apiBridge" class="com.red5pro.services.cloud.sample.component.DummyCloudController" init-method="initialize">
</bean>
 -->
```

### Modify Stream Manager App Properties (red5-web.properties)

Refer to your [AWSAutoScalingChecklist.rtf](/docs_static/installation/static/AWSAutoScalingChecklist.rtf) for the data needed to complete this section.

The Stream Manager’s configuration details are stored in the red5-web.properties file, found in:
`{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties`. This is where the stream manager reads all its settings from. Each configurable setting is organized into its own section.

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>

* `config.dbHost={host}` -- the DB Endpoint URL of your MySQL server instance
* `config.dbUser={username}` -- Database Master Username
* `config.dbPass={password}` -- Database Master Password

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* instancecontroller.replaceDeadClusters=true -- The default value of `true` will automatically replace any clusters that have failed. If you set this value to `false` then a failed nodegroup will be deleted and not replaced.
* instancecontroller.deleteDeadGroupNodesOnCleanUp=true   -- by default, any unresponsive nodes will be deleted from the dashboard. Setting this value to `false` will stop the instances, but not delete them. **note** the `false` variable is not supported with terraform.
* `instancecontroller.instanceNamePrefix={unique-value}` -- the `unique-value` **must be modified** with an identifier to pre-pend nodes that are created by the stream manager. **It is critical** that this value be different if you have multiple environments (eg, develop, staging, production), otherwise the stream manager will remove nodes with that prefix that are not in its database. Also note - if you use `node` in one environment and `nodedev` in a second environment, the first stream manager will remove the `nodedev` instances because it sees them as instances starting with `node`.

**Corrupted Nodes Check** (added with server release 6.2.0)

By default, Stream Manager uses RTMP response from nodes to determine their health (this check originates on the node side). Optionally, you can also monitor HTTP response from the nodes, by modifying the following values in the `NODE CONTROLLER` section:

* `instancecontroller.checkCorruptedNodes=false` -- change to `true` to monitor HTTP response from the autoscaling nodes.
* `instancecontroller.corruptedNodeCheckInterval=300000` -- frequency of stream manager checks to nodes in milleseconds (default is 5 minutes)
* `instancecontroller.corruptedNodesEndPoint=live` -- webapp to monitor. This is set to `live` by default, but can be changed to any webapp.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* cluster.password=changeme  -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>LOADBALANCING CONFIGURATION</u>

* `streammanager.ip={streammanager-static-ip}` -- The static IP address used for Stream Manager. This is required when you wish to setup multiple Stream Managers behind a load balancer. This parameter is optional for a single Stream Manager setup.

<u>AWS CLOUD CONTROLLER CONFIGURATION</u>

You will need to un-comment and configure the following entries:

* `aws.defaultzone={default-region}` -- the default zone for your autoscaling
* aws.operationTimeoutMilliseconds=20000 -- estimated time to start a new VM. We do not recommend modifying this value
* `aws.accessKey = {account-accessKey}` -- IAM access key
* `aws.accessSecret = {account-accessSecret}` -- IAM access secret
* `aws.ec2KeyPairName = {keyPairName}` -- SSH keypair name for connecting to nodes
* `aws.ec2SecurityGroup ={securityGroupName}` -- security group name
* `aws.defaultVPC={boolean}` -- `true` if using the `default` VPC, or `false` if not; (AWS accounts created in the last few years have default VPCs in each region; older accounts do not).
* `aws.vpcName={vpc-name}` -- The name of your VPC (needs to be the same name for each region that you are using for autoscaling.

<u>REST SECURITY SECTION</u>

* rest.administratorToken=  -- **You need to set a valid password string here before you start using streammanager**. This is the password that you will use to execute API commands

<u>RED5PRO NODE DEFAULT APPLICATION</u>

* webapp which the stream manager uses for checking node cluster status. The default value is `live`

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to `true` enables, or set to `false` disables the [websocket proxy service](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/).  You must use the proxy if you are using WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be specially useful during development on cloud. With log access enabled you can use the Stream Manager REST api to download log files with using SSH. For more info on how to use the log access api refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-logs/).

>Please note that if you modify any of the above values after your initial deployment, you will need to restart the Red5 Pro service.

<u>ALARM THRESHOLD (no longer in the properties file)</u>

The autoscaling alarm threshold is no longer set in the `red5-web.properties` file. Instead, the default value is 60%. If you want to modify this value, do so directly after node group creation using the [Rest API for alarms calls](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-alarms/). You can set different thresholds for origins and edges via the rest API.

<u>**Sample red5-web.properties file content:**</u>

```properties
## RED5 APP CONFIGURATION SECTION - Do Not Tamper
webapp.contextPath=/streammanager
webapp.virtualHosts=*

## DATABASE CONFIGURATION SECTION
config.dbHost=streammanager-db.abcdefghi.us-west-1.rds.amazonaws.com
config.dbPort=3306
config.dbUser=streammanager
config.dbPass=123445ffff
#config.dbDriver=org.postgresql.Driver
## DATA STORE MANAGEMENT CONFIGURATION SECTION
store.usageStatsDiscardThresholdDays=7

## NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS
instancecontroller.newNodePingTimeThreshold=150000
instancecontroller.replaceDeadClusters=true
instancecontroller.deleteDeadGroupNodesOnCleanUp=true
instancecontroller.instanceNamePrefix=jesnode
instancecontroller.nodeGroupStateToleranceTime=180000
instancecontroller.nodeStateToleranceTime=180000
instancecontroller.cloudCleanupInterval=180000
instancecontroller.blackListCleanUpTime=600000
instancecontroller.pathMonitorInterval=30000
instancecontroller.minimumNodeFreeMemory=50
instancecontroller.checkCorruptedNodes=false
instancecontroller.corruptedNodeCheckInterval=300000
instancecontroller.corruptedNodesEndPoint=live
instancecontroller.httptimeout=30000

## METRIC WEIGHTS FOR BEST NODE EVALUATION SECTION
instanceevaluator.streams.metricweight=30
instanceevaluator.connections.metricweight=15
instanceevaluator.subscribers.metricweight=60
instanceevaluator.memory.metricweight=20
instanceevaluator.restreamer.metricweight=35

## CLUSTER CONFIGURATION INFORMATION
cluster.password=changeme
cluster.publicPort=1935
cluster.accessPort=5080
cluster.reportingSpeed=10000
cluster.retryDuration=30
cluster.mode=auto
cluster.idleClusterPathThreshold=30000

## LOADBALANCING CONFIGURATION
streammanager.ip=

## LOCATIONAWARE CONFIGURATION
location.region=
location.geozone=
location.strict=false

## CLOUD CONTROLLER CONFIGURATION SECTION  - MILLISECONDS

## AWS CLOUD CONTROLLER CONFIGURATION ##
aws.defaultzone=us-west-1b
aws.operationTimeoutMilliseconds=200000
aws.accessKey=ABCDEFGHIJKLMNOPQ
aws.accessSecret=12344556778abcdeFGHIJKLMNOPabud12345
aws.ec2KeyPairName=red5proautoscaling
aws.ec2SecurityGroup=red5pro-nodes
aws.defaultVPC=false
aws.vpcName=red5proauto
aws.faultZoneBlockMilliseconds=3600000
aws.forUsGovRegions=false

## AZURE CLOUD CONTROLLER CONFIGURATION ##
#az.resourceGroupName={master-resourcegroup}
#az.resourceGroupRegion={master-resourcegroup-region}
#az.resourceNamePrefix={resource-name-prefix}
#az.clientId={azure-ad-application-id}
#az.clientKey={azure-ad-application-key}
#az.tenantId={azure-ad-id}
#az.subscriptionId={azure-ad-subscription-id}
#az.vmUsername=ubuntu
#az.vmPassword={password-to-set-for-dynamic-instances}
#az.defaultSubnetName=default
#az.operationTimeoutMilliseconds=120000
#az.quickOperationResponse=true
#az.quickResponseCheckInitialDelay=20000
#az.apiLogLevel=BASIC

## GOOGLE COMPUTE CLOUD CONTROLLER CONFIGURATION ##
#compute.project={project-id}
#compute.defaultzone={zone-id}
#compute.defaultdisk=pd-standard
#compute.network=default
#compute.operationTimeoutMilliseconds=200000

## SIMULATED-CLOUD CONTROLLER CONFIGURATION ##
#managed.regionNames={custom-region}
#managed.availabilityZoneNames={custom-region-zone}
#managed.operationTimeoutMilliseconds=20000
#managed.recycleDeadNodes=true

## LIMELIGHT-CLOUD CONTROLLER CONFIGURATION ##
#limelight.regionNames={region-name}
#limelight.availabilityZoneNames={zone-name}
#limelight.operationTimeoutMilliseconds=20000
#limelight.recycleDeadNodes=true
#limelight.ipmode=true
#limelight.port=
#limelight.user=
#limelight.pwd=

## REST SECURITY SECTION
rest.administratorToken=123abc

## RED5PRO NODE DEFAULT APPLICATION
default.server.application=live

## RED5PRO NODE SERVER API SECTION
serverapi.port=5080
serverapi.protocol=http
serverapi.version=v1
serverapi.accessToken=456xyz

## DEBUGGING CONFIGURATION SECTION
debug.logaccess=true
debug.logcachexpiretime=60000

## WEBSOCKET PROXY SECTION
proxy.enabled=true
```

<u>**Start Red5 Pro Service to Use the Stream Manager**</u>

`sudo systemctl start red5pro`

# Configure Stream Manager with SSL

If you want to publish via WebRTC, or iOS, you must set up the Stream Manager with a valid SSL certificate and use the Stream Manager SSL Proxy feature.  Please refer to [this document](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/prerequisites/) to configure SSL on your Red5 Pro Stream Manager.

If your Stream Manager(s) is behind an Application Load Balancer using a certificate, then you do not have to configure Red5 Pro to run with SSL.
