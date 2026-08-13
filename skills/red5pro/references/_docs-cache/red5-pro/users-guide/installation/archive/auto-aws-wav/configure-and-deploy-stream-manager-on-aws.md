---
title: Configure and Deploy Stream Manager
description: ""
---

**Note: after the Stream Manager instance is started up, you will need to add its Private IP address to the Database Security group, per [the DB security step above](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/prepare-mysql/)**

## New Server Instance

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), in the region where you reserved the streammanager IP address
* Click on Launch Instance.
* Step 1: Choose an Amazon Machine Image (AMI) - click on My AMIs, and select the AMI that you just created for the nodes.
* Step 2: Choose an Instance Type - we suggest selecting a multi-cpu instance type with high network performance (for example, `m5.large`). Click on Next: Configure Instance Details
* Step 3: Configure Instance Details - Network: chose the VPC and a non-wavelength subnet that you set up earlier for this region; accept other defaults. Click on Next: Add Storage.
* Step 4: Add Storage - the default disk size should be sufficient. Click on Next: Tag Instance, then Next: Configure Security Group
* Step 6: Configure Security Group - Create a new security group with the following ports allowed from anywhere (optionally, you can restrict SSH access to your network):

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro; websockets for WebRTC / Stream Manager | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |

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
* If you haven't already, <u>**Install NTP (network time protocol)**</u>
* Navigate to the directory where you installed Red5 Pro (e.g. `/usr/local/red5pro`)

**Delete the following files/directories:**

* `{red5prohome}/conf/autoscale.xml`
* `{red5prohome}/plugins/red5pro-autoscale-plugin-*`
* `{red5prohome}/plugins/red5pro-webrtc-plugin-*`
* `{red5prohome}/plugins/inspector.jar`
* `{red5prohome}/webapps/inspector/`

These additional files/directories should be deleted for server optimization:

* `{red5prohome}/plugins/red5pro-restreamer-plugin-*`
* `{red5prohome}/plugins/red5pro-mpegts-plugin-*`
* `{red5prohome}/plugins/red5pro-socialpusher-plugin-*`
* `{red5prohome}/webapps/api/`
* `{red5prohome}/webapps/bandwidthdetection/`
* `{red5prohome}/webapps/template/`

## Import and Activate AWS Cloud Controller

Copy the `aws-cloud-controller-<version>.jar` into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the applicationContext.xml file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml` per the following:

* Locate the AWS controller “bean” and uncomment it as shown below  (*note: do not modify the values, only uncomment the bean configuration to make it active*):

```xml
<!-- AWS CONTROLLER -->
        <bean id="apiBridge" class="com.red5pro.services.cloud.aws.component.AWSInstanceController"
                init-method="initialize"> <property name="accessKey" value="${aws.accessKey}"
                /> <property name="accessSecret" value="${aws.accessSecret}" /> <property
                name="ec2KeyPairName" value="${aws.ec2KeyPairName}" /> <property name="ec2SecurityGroup"
                value="${aws.ec2SecurityGroup}" /> <property name="defaultZone" value="${aws.defaultzone}"
                /> <property name="operationTimeoutMilliseconds" value="${aws.operationTimeoutMilliseconds}"
                /> <property name="faultZoneBlockMilliseconds" value="${aws.faultZoneBlockMilliseconds}"
                /> </bean>
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
`{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties`. This is where streammanager reads all its settings from. Each configurable setting is organized into its own section.

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>

* `config.dbHost={host}` -- the DB Endpoint URL of your MySQL server instance (or `localhost` if you are running MySQL on the SM instance)
* `config.dbUser={username}` -- Database Master Username
* `config.dbPass={password}` -- Database Master Password

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* instancecontroller.replaceDeadClusters=true -- The default value of `true` will automatically replace any clusters that have failed. If you set this value to `false` then a failed nodegroup will be deleted and not replaced.
* instancecontroller.deleteDeadGroupNodesOnCleanUp=true   -- by default, any unresponsive nodes will be deleted from the dashboard. Setting this value to `false` will stop the instances, but not delete them. **note** the `false` variable is not supported with terraform.
* `instancecontroller.instanceNamePrefix={unique-value}` -- the `unique-value` **must be modified** with an identifier to pre-pend nodes that are created by the stream manager. **It is critical** that this value be different if you have multiple environments (eg, develop, staging, production), otherwise the stream manager will remove nodes with that prefix that are not in its database. Also note - if you use `node` in one environment and `nodedev` in a second environment, the first stream manager will remove the `nodedev` instances because it sees them as instances starting with `node`.

<u>CLUSTER CONFIGURATION INFORMATION</u>

* cluster.password=changeme  -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>AWS CLOUD CONTROLLER CONFIGURATION</u>

You will need to un-comment and configure the following entries:

* `aws.defaultzone={default-region}` -- the default region for your autoscaling
* aws.operationTimeoutMilliseconds=20000 -- estimated time to start a new VM. recommend changing this to 400000 to account for wavelength zones
* `aws.accessKey = {account-accessKey}` -- IAM access key
* `aws.accessSecret = {account-accessSecret}` -- IAM access secret
* `aws.ec2KeyPairName = {keyPairName}` -- SSH keypair name for connecting to nodes
* `aws.ec2SecurityGroup ={securityGroupName}` -- node security group name

<u>REST SECURITY SECTION</u>

* rest.administratorToken=  -- **You need to set a valid password string here before you start using streammanager**. This is the password that you will use to execute API commands

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to `true` enables, or set to `false` disables the [websocket proxy service](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/).  You must use the proxy if you are using WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be especially useful during development on the cloud, however if your stream manager is behind a load balancer this call will not work. For more information, refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-logs/).

>Please note that if you modify any of the above values after your initial deployment, you will need to restart the Red5 Pro service.

<u>**Sample red5-web.properties file content:**</u>

```properties
## RED5 APP CONFIGURATION SECTION - Do Not Tamper
webapp.contextPath=/streammanager
webapp.virtualHosts=*

## DATABASE CONFIGURATION SECTION
config.dbHost=127.0.0.1
config.dbPort=3306
config.dbUser=myadmin
config.dbPass=skywardho

## DATA STORE MANAGEMENT CONFIGURATION SECTION
store.usageStatsDiscardThresholdDays=7

## NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS
instancecontroller.newNodePingTimeThreshold=150000
instancecontroller.replaceDeadClusters=true
instancecontroller.deleteDeadGroupNodesOnCleanUp=true
instancecontroller.instanceNamePrefix=wav-node
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
aws.defaultzone=us-west-2
aws.operationTimeoutMilliseconds=400000
aws.accessKey=ABCDEFGHIJKLMNOPQ
aws.accessSecret=12344556778abcdeFGHIJKLMNOPabud12345
aws.ec2KeyPairName=red5pro
aws.vpcName=wav-west2-vpc
aws.faultZoneBlockMilliseconds=3600000

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

## SPRING INCLUSION
spring.jackson.default-property-inclusion=non_null
```

<u>**Start Red5 Pro Service to Use the Stream Manager**</u>

`sudo systemctl start red5pro`

## Configure Stream Manager with SSL

You must set up the Stream Manager with a valid SSL certificate and use the Stream Manager SSL Proxy feature.  Please refer to [this document](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/prerequisites/) to configure SSL on your Red5 Pro Stream Manager.
