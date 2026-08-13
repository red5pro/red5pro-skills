---
title: 3. Deploy and Configure Stream Manager
description: ""
menu_order: 4
---

It is critical that the Stream Manager have a static IP address, so that in the event that the instance is rebooted, it will retain the same public IP address. If you plan to be using WebRTC, you will want to [install an SSL certificate](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/) on your Stream Manager instance so that it can be used as a proxy for publishers and subscribers.

<u>**Install Red5 Pro on the Instance:**</u>

* Follow the [Installing Red5 Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that Red5 Pro service is set to auto-start on launch

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro; websockets for WebRTC / Stream Manager | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |

## Configure the Stream Manager Instance

* SSH into the Stream Manager instance
* Stop the Red5 Pro service (`sudo systemctl stop red5pro`)

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

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

## Import and Activate Simulated Cloud Controller

Copy the `simulated-cloud-controller.jar` into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the `applicationContext.xml` file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml` as per the following:

* Locate the `SimulatedCloud controller` “bean” and uncomment it as shown below  (*note: do not modify the values, only uncomment the bean configuration to make it active*):

```xml
<!-- SIMULATED-CLOUD CONTROLLER -->

<bean id="apiBridge" class="com.red5pro.services.simulatedcloud.generic.component.GenericSimulatedCloudController" init-method="initialize">
   <property name="operationTimeoutMilliseconds" value="${managed.operationTimeoutMilliseconds}"/>
   <property name="regionNames" value="${managed.regionNames}"/>
   <property name="availabilityZoneNames" value="${managed.availabilityZoneNames}"/>
   <property name="recycleDeadNodes" value="${managed.recycleDeadNodes}"/>
</bean>
```

Comment out (or delete the entry for) the default controller as shown below to disable it:

```xml
<!-- Default CONTROLLER -->
<!--
<bean id="apiBridge" class="com.red5pro.services.cloud.sample.component.DummyCloudController" init-method="initialize">
</bean>
 -->
```

## Modify Stream Manager App Properties (red5-web.properties)

The Stream Manager’s configuration details are stored in the `red5-web.properties file`, found in:
`{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties`. This is where Stream Manager reads all its settings from. Each configurable setting is organized into its own section. 

<!-- DOMINICK
[For more details on the red5-web.properties file sections, read here]DOMINICK(/server/streammanagerug/#red5-webproperties-configuration-file).
-->

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>

* `config.dbHost={host}` -- the DB Endpoint URL of your MySQL server instance
* `config.dbUser={username}` -- Database Master Username
* `config.dbPass={password}` -- Database Master Password

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* `instancecontroller.replaceDeadClusters=false` -- by default, any cluster that becomes unresponsive will be shut down. Setting this value to `true` will automatically replace any clusters that have failed.
* `instancecontroller.deleteDeadGroupNodesOnCleanUp=true` -- by default, any unresponsive nodes will be deleted from the dashboard. Setting this value to `false` will stop the instances, but not delete them.

**Corrupted Nodes Check** (added with server release 6.2.0)

By default, Stream Manager uses RTMP response from nodes to determine their health (this check originates on the node side). Optionally, you can also monitor HTTP response from the nodes, by modifying the following values in the `NODE CONTROLLER` section:

* `instancecontroller.checkCorruptedNodes=false` -- change to `true` to monitor HTTP response from the autoscaling nodes.
* `instancecontroller.corruptedNodeCheckInterval=300000` -- frequency of stream manager checks to nodes in milleseconds (default is 5 minutes)
* `instancecontroller.corruptedNodesEndPoint=live` -- webapp to monitor. This is set to `live` by default, but can be changed to any webapp.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* `cluster.password=changeme`  -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>SIMULATED-CLOUD CONTROLLER CONFIGURATION</u>

You will need to uncomment and modify these properties.

* `managed.regionNames`: This attribute takes a comma separated list of region names. For managed instances we create our own region names which represent where the servers are located. The region name should be in the format similar to `us-test1`. You do not need to add more than one region.
* `managed.availabilityZoneNames`: This attribute takes a comma separated list of zone names. For managed instances we create our own zone names which represent where the servers are located. The zone names should be in the format simlilar to `us-test1-a`. You do not need to add more than one zone.
* `managed.operationTimeoutMilliseconds`: This attribute is common to all cloud platform controllers. It controls the max time allowed for a cloud operation. However in the context of `SimulatedCloud`, this attribute is instead used to set the simulated `responseDelay` in milliseconds. A `responseDelay` makes the SimulatedCloud, simulate an operation like a cloud operation.
* `managed.recycleDeadNodes`: This attribute configured how the simulated cloud handles dead nodes. Normally when nodes are scaled down they are recycled automatically (ie: They are soft-reset & put back in availability list for reuse).  A node that is being deleted because of failure is generally not a healthy node. Hence it is not a candidate for reuse by default. Setting this attribute to true, directs the controller to force reusability of the node. If the value is set to `true`, the failed node beging deleted will be reused; if set to `false` then the node will not be reused.

<u>REST SECURITY SECTION</u>

* `rest.administratorToken=`  -- **You need to set a valid password string here before you start using Stream Manager**. This is the password that you will use to execute API commands.

<u>RED5 PRO NODE SERVER API SECTION</u>

* `serverapi.port`: The port on which the Red5 Pro HTTP service is accessible. Unless this has been changed explicitly, it defaults to `5080`.
* `serverapi.protocol`: The protocol over which the HTTP service is accessible. If your instances have SSL certificates on them, then the value should be `https`, else it should be `http`. The default is `http`.
* `serverapi.version`: The API version that is applicable to your Red5 Pro instances. You can get information on the latest server API version for the [Red5 Pro server API documentation](/docs/development/api/overview/). The default value is `v1`.
* `serverapi.accessToken`: The security access token required to make api calls to the node servers. Use the security access token value that you set on your nodes.

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to **true** enables, or set to **false** disables the  [websocket proxy service](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/). You must use the proxy if you are using WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be especially useful during development on the cloud, however, if your stream manager is behind a load balancer this call will not work. For more information, refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-logs/).

>Please note that if you modify any of the above values after your initial deployment, you will need to restart the Red5 Pro service.

<u>**Sample red5-web.properties file content:**</u>

```xml
 ## RED5 APP CONFIGURATION SECTION - Do Not Tamper
webapp.contextPath=/streammanager

 ## DATABASE CONFIGURATION SECTION
config.dbHost=streammanager-db.abcdefghi.us-west-1.rds.amazonaws.com
config.dbPort=3306
config.dbUser=streammanager
config.dbPass=123445ffff

## DATA STORE MANAGEMENT CONFIGURATION SECTION
store.usageStatsDiscardThresholdDays=7

## NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS
instancecontroller.newNodePingTimeThreshold=150000
instancecontroller.replaceDeadClusters=true
instancecontroller.deleteDeadGroupNodesOnCleanUp=true
instancecontroller.instanceNamePrefix={unique-value}
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

## CLOUD CONTROLLER CONFIGURATION SECTION  - MILLISECONDS

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
#az.apiLogLevel={azure-sdk-loglevel}

## AWS CLOUD CONTROLLER CONFIGURATION ##
#aws.defaultzone={default-region}
#aws.operationTimeoutMilliseconds=200000
#aws.accessKey={account-accessKey}
#aws.accessSecret={account-accessSecret}
#aws.ec2KeyPairName={keyPairName}
#aws.ec2SecurityGroup={securityGroupName}
#aws.defaultVPC={boolean}
#aws.vpcName={vpc-name}
#aws.faultZoneBlockMilliseconds=3600000
#aws.forUsGovRegions=false

## GOOGLE COMPUTE CLOUD CONTROLLER CONFIGURATION ##
#compute.project={project-id}
#compute.defaultzone={zone-id}
#compute.defaultdisk=pd-standard
#compute.network=default
#compute.operationTimeoutMilliseconds={operation-timeout}

## SIMULATED-CLOUD CONTROLLER CONFIGURATION ##
managed.regionNames=us-test1
managed.availabilityZoneNames=us-test1-a
managed.operationTimeoutMilliseconds=20000
managed.recycleDeadNodes=true

## REST SECURITY SECTION
rest.administratorToken=xyz123

## RED5PRO NODE SERVER API SECTION
serverapi.port=5080
serverapi.protocol=http
serverapi.version=v1
serverapi.accessToken=rst789

## DEBUGGING CONFIGURATION SECTION
debug.logaccess=false
debug.logcachexpiretime=60000

## WEBSOCKET PROXY SECTION
proxy.enabled=true

## SPRING INCLUSION
spring.jackson.default-property-inclusion=non_null
```

## Start Red5 Pro Service to Use the Stream Manager

`sudo systemctl start red5pro`

## Configure Stream Manager Whip/Whep Proxy

To enable Whip and Whep proxying to the edge and origin nodes respectively, the Stream Manager needs to be configured properly.  Details on enabling this proxy can be found on the [Whip/Whep Configuration](/docs/red5-pro/users-guide/red5-pro-whip-and-whep-configuration/#StreamManagerConfiguration) page in the Stream Manager section.
