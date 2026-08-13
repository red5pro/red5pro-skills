---
title: 6. Stream Manager Configuration
description: ""
menu_order: 7
---

Create a new VM instance using the image you created above.

> It is recommended that you select a compute-optimized machine type with a minimum of 2 vcpu and 8 GiB Memory (`c2-standard-4`) for acceptable performance for the Stream Manager.

From Compute Engine, VM Instances:

* Create an instance
* Choose the same Zone where your MySQL database was assigned
* Boot disk - Change - Your image tab, select the server image you just created
* Boot disk type: Standard persistent disk
* **IMPORTANT:** - Compute Engine default service account, Allow full access to all Cloud APIs
* On the networking tab:
* You can choose the default network profile that you set up for Red5 Pro, or if you want to be more restrictive, the Stream Manager only needs ports 22, for ssh access, and 5080 open. If you are using the Stream Manager as an SSL proxy, then you also need to open port 443.
* Under External IP, choose the static IP that you reserved from the Networking tab.

![createsm](/_images/installation/server/autoscalgooglecloud/createsm.png)

Copy the google-cloud-controller.jar file up to the server (`gcloud compute scp google-cloud-controller.jar stream-manager-01:/tmp/`)

> The google cloud SDK will help you generate SSH keys that are required to access the compute instances for your project. Usually, the keys are associated with your login account when generated using the cloud SDK. Also, check out [Connecting to Instance](https://cloud.google.com/compute/docs/connect/standard-ssh).

SSH into the stream manager instance (`gcloud compute ssh stream-manager-01`)

Stop the Red5 Pro service (`sudo systemctl stop red5pro`)

## Install NTP (network time protocol)

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC (this should be the default on Google Cloud instances). Type `date` at the prompt. This will return the date, time, and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

## Remove Autoscale Files and WebRTC Plugin

Navigate to the directory where you installed Red5 Pro (e.g. `/usr/local/red5pro`)

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

## Import Cloud Controller and Activate

Copy the google-cloud-controller.jar into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the applicationContext.xml file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml`,

Locate the google controller “bean” and uncomment it as shown below  (*IMPORTANT: do not modify the values (as they may change between releases), <u>only uncomment the bean configuration to make it active</u>*):

```xml
    <!-- GOOGLE COMPUTE CONTROLLER -->
        <bean id="apiBridge" class="com.red5pro.services.cloud.google.component.ComputeInstanceController"
                init-method="initialize"> <property name="project" value="${compute.project}"/>
                <property name="defaultZone" value="${compute.defaultzone}"/> <property name="defaultDiskType"
                value="${compute.defaultdisk}"/> <property name="operationTimeoutMilliseconds"
                value="${compute.operationTimeoutMilliseconds}"/> <property name="network"
                value="${compute.network}"/> </bean>
```

Comment out (or delete the entry for) the default controller as shown below to disable it:

```xml
<!-- Default CONTROLLER -->
<! --
<bean id="apiBridge" class="com.red5pro.services.cloud.sample.component.DummyCloudController" init-method="initialize">
</bean>
 -->
```

## Modify Stream Manager App Properties (red5-web.properties)

The Stream Manager’s configuration details are stored in the red5-web.properties file, found in:
`{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties`. This is where the streammanager reads all its settings from. Each configurable setting is organized into its own section.

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>u>

* `config.dbHost={host}`  -- the IP address of your MySQL server instance
* `config.dbUser={username}` -- username you set to connect to the MySQL instance
* `config.dbPass={password}` -- password used to connect to the MySQL instance

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* `instancecontroller.replaceDeadClusters=true` -- The default value of `true` will automatically replace any clusters that have failed. If you set this value to `false` then a failed nodegroup will be deleted and not replaced.
* `instancecontroller.deleteDeadGroupNodesOnCleanUp=true`   -- by default, any unresponsive nodes will be deleted from the dashboard. Setting this value to `false` will stop the instances, but not delete them. **note** the `false` variable is not supported with terraform.
* `instancecontroller.instanceNamePrefix={unique-value}` -- the `unique-value` **must be modified** with an identifier to pre-pend nodes that are created by the stream manager. **It is critical** that this value be different if you have multiple environments (eg, develop, staging, production), otherwise the stream manager will remove nodes with that prefix that are not in its database. Also note - if you use `node` in one environment and `nodedev` in a second environment, the first stream manager will remove the `nodedev` instances because it sees them as instances starting with `node`.

**Corrupted Nodes Check** (added with server release 6.2.0)

By default, Stream Manager uses RTMP response from nodes to determine their health (this check originates on the node side). Optionally, you can also monitor HTTP response from the nodes, by modifying the following values in the `NODE CONTROLLER` section:

* `instancecontroller.checkCorruptedNodes=false` -- change to `true` to monitor HTTP response from the autoscaling nodes.
* `instancecontroller.corruptedNodeCheckInterval=300000` -- frequency of stream manager checks to nodes in milleseconds (default is 5 minutes)
* `instancecontroller.corruptedNodesEndPoint=live` -- webapp to monitor. This is set to `live` by default but can be changed to any webapp.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* cluster.password=changeme -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>LOADBALANCING CONFIGURATION</u>

* `streammanager.ip={streammanager-static-ip}`  -- The static IP address used for stream manager. This parameter is optional for a single stream manager setup. This is required when you wish to set up multiple stream managers behind a load balancer. If you use the [GCP autoscaling for Stream Managers](/docs/red5-pro/users-guide/installation/archive/auto-google-cloud/smautoscalegoogle/), this will be populated with a unique string for each stream manager instance, with a startup script in the instance template configuration.

<u>GOOGLE COMPUTE CLOUD CONTROLLER CONFIGURATION</u>

You will need to un-comment the following entries:

* `compute.project={project-id}`  -- your Google Cloud project ID
* `compute.defaultzone={zone-id}`  -- the default zone for your Google Cloud project
* `compute.defaultdisk=pd-standard`  -- do not modify this value
* `compute.network=default` -- modify this if you are using a different VPC than `default`. This is the VPC name.
* `compute.operationTimeoutMilliseconds=20000` -- estimated time to start a new VM. We do not recommend modifying this value.

<u>REST SECURITY SECTION</u>

* `rest.administratorToken=`  -- You need to set a valid password string here before you start using the streammanager. This is the password that you will use to execute API commands

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to **true** enables, or set to **false** disables the  [websocket proxy service](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/). You must use the proxy (`true`) if you are using WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be especially useful during development on a cloud. With log access enabled you can use the Stream Manager REST API to download log files using SSH. For more info on how to use the log access API refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-logs/).

>Please note that if you modify any of the above values after your initial deployment, you will need to restart the Red5 Pro service.

<u>ALARM THRESHOLD (no longer in the properties file)</u>

The autoscaling alarm threshold is no longer set in the `red5-web.properties` file. Instead, the default value is 60%. If you want to modify this value, do so directly after node group creation using the [Rest API for alarms calls](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-alarms/). You can set different thresholds for origins and edges via the rest API.

Sample red5-web.properties file content:

```properties
 ## RED5 APP CONFIGURATION SECTION - Do Not Tamper
webapp.contextPath=/streammanager
webapp.virtualHosts=*

## DATABASE CONFIGURATION SECTION
config.dbHost=192.168.0.100
config.dbPort=3306
config.dbUser=admin
config.dbPass=aBcD12345EfGhijk

## DATA STORE MANAGEMENT CONFIGURATION SECTION
store.usageStatsDiscardThresholdDays=7

## NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS
instancecontroller.newNodePingTimeThreshold=150000
instancecontroller.replaceDeadClusters=true
instancecontroller.deleteDeadGroupNodesOnCleanUp=true
instancecontroller.instanceNamePrefix=testnode
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
#aws.defaultzone={default-region}
#aws.operationTimeoutMilliseconds=200000
#aws.accessKey={account-accessKey}
#aws.accessSecret={account-accessSecret}
#aws.ec2KeyPairName={keyPairName}
#aws.ec2SecurityGroup={securityGroupName}
#aws.defaultVPC={boolean}
#aws.vpcName={vpcname}
#aws.faultZoneBlockMilliseconds=3600000
#aws.forUsGovRegions=false

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
compute.project=root-random-131129
compute.defaultzone=us-east1
compute.defaultdisk=pd-standard
compute.network=default
compute.operationTimeoutMilliseconds=20000

## SIMULATED-CLOUD CONTROLLER CONFIGURATION ##
#managed.regionNames={region-name}
#managed.availabilityZoneNames={zone-name}
#managed.operationTimeoutMilliseconds=20000
#managed.recycleDeadNodes=true

## LIMELIGHT-CLOUD CONTROLLER CONFIGURATION ##
#limelight.regionNames={region-name}
#limelight.availabilityZoneNames={zone-name}
#limelight.operationTimeoutMilliseconds=20000
#limelight.port=
#limelight.user=
#limelight.pwd=
#limelight.recycleDeadNodes=true

## TERRAFORM-CLOUD CONTROLLER CONFIGURATION DIGITAL OCEAN##
#terra.regionNames=ams2, ams3, blr1, fra1, lon1, nyc1, nyc2, nyc3, sfo1, sfo2, sgp1, tor1
#terra.operationTimeoutMilliseconds=20000
#terra.instanceName=digitalocean_droplet
#terra.token={token}
#terra.sshkey={ssh_key}
#terra.parallelism=10

## RED5PRO NODE SERVER API SECTION
serverapi.port=5080
serverapi.protocol=http
serverapi.version=v1
serverapi.accessToken={node api security token}
## STREAM MANAGER REST SECURITY SECTION
rest.administratorToken=password

## DEBUGGING CONFIGURATION SECTION
debug.logaccess=false
debug.logcachexpiretime=60000

## WEBSOCKET PROXY SECTION
proxy.enabled=true

## SPRING INCLUSION
spring.jackson.default-property-inclusion=non_null
```

<u>**Start Red5 Pro Service to Use the Stream Manager**</u>

`sudo systemctl start red5pro`

## Optional: Load-Balance Multiple Stream Managers

<u>**Prerequisites:**</u>

* One reserved elastic IP address for *each* Stream Manager.
* A registered Domain Name to associate with the reserved Load Balancer IP address.
* Create the first Stream Manager per the above instructions, then create a snapshot from that instance. Build the second stream manager from that snapshot. **It is essential that the config files be identical between the two stream managers with one exception:**
* Edit `red5pro/webapps/streammanager/WEB-INF/red5-web.properties` and modify `## LOADBALANCING CONFIGURATION streammanager.ip=`, adding the Assigned IP address of the individual Stream Manager instance you are modifying.
* Add all Stream Manager public IP addresses to the Database security group.

<u>Under Networking tab choose **Load balancing**.</u>

![loadbalancer01](/_images/installation/server/autoscalgooglecloud/loadbalancer01.png)

Click on `+` CREATE LOAD BALANCER

Choose **TCP Load Balancing**, and click on **Start configuration**.

![loadbalancer02](/_images/installation/server/autoscalgooglecloud/loadbalancer02.png)

**Internet facing or internal only** - choose **From internet to my VMs**; Connection termination - *Do you want to offload SSL processing to the Load Balancer?* - choose Yes (SSL Proxy) if you have an SSL cert; otherwise choose No (TCP). Click on **Continue**

![loadbalancer03](/_images/installation/server/autoscalgooglecloud/loadbalancer03.png)

Name your load balancer (eg, `streammanager-loadbalancer`), then click on **Backend configuration**.

![loadbalancer04](/_images/installation/server/autoscalgooglecloud/loadbalancer04.png)

**Backend configuration:** Choose the region where your stream managers are from the pull-down. Click on **Select existing instances**  tab and add your two stream managers.

![loadbalancer06](/_images/installation/server/autoscalgooglecloud/loadbalancer06.png)

**Create a health check:** name your health check, and modify HTTP to use port 5080 (Red5 Pro default). You can make the healthy/unhealthy threshold (to remove/re-add servers in the pool accordingly) as aggressive as you like.

![loadbalancer05](/_images/installation/server/autoscalgooglecloud/loadbalancer05.png)

**Frontend configuration:** click on Create IP address to Reserve a new static IP for the Load Balancer

![loadbalancer07](/_images/installation/server/autoscalgooglecloud/loadbalancer07.png) 

**Review and finalize:** look over the details, then click on **Create**

**IMPORTANT** You will need to create a new disk image - create a new VM from the original disk image, and modify `{red5prohome}/conf/autoscale.xml` to point to the **Load Balancer** IP address, then create a new disk image from this VM to use for your nodes.

## Configure Stream Manager Whip/Whep Proxy

To enable Whip and Whep proxying to the edge and origin nodes respectively, the Stream Manager needs to be configured properly.  Details on enabling this proxy can be found on the [Whip/Whep Configuration](/docs/red5-pro/users-guide/red5-pro-whip-and-whep-configuration/#StreamManagerConfiguration) page in the Stream Manager section.
