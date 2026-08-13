---
title: Configure Stream Manager Instance
description: ""
menu_order: 8
---

<u>**Install Red5 Pro on the Instance:**</u>

* SSH into the Stream Manager instance that you created.
* Follow the [Installing Red5 Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that the Red5 Pro service is set to auto-start on launch
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

* [Install an SSL certificate](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/) on your Stream Manager instance so that it can be used as a proxy for publishers and subscribers. If you aren't using SSL proxy, it is still recommended that you install an SSL certificate for secure communication.

## Import and Activate the Terraform Cloud Controller

Copy the `terraform-cloud-controller.jar` into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the `applicationContext.xml` file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml` as per the following:

* Locate the `Terraform Cloud controller` “bean” and uncomment it as shown below  (*note: do not modify the values, only uncomment the bean configuration to make it active*):

```xml
<!-- TERRAFORM-CLOUD CONTROLLER -->
<bean id="apiBridge"
        class="com.red5pro.services.terraform.component.TerraformCloudController">
        <property name="operationTimeoutMilliseconds"
             value="${terra.operationTimeoutMilliseconds}" />
        <property name="regionNames" value="${terra.regionNames}" />
        <property name="availabilityZoneNames"
             value="${terra.regionNames}" />
        <property name="instanceName"
        value="${terra.instanceName}" />
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

## Modify Stream Manager App Properties

The Stream Manager’s configuration details are stored in the `red5-web.properties file`, found in:
`{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties`. This is where Stream Manager reads all its settings from. Each configurable setting is organized into its own section. [For more details on the red5-web.properties file sections, read here](/docs/special/user-guide/overview/).

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>

* `config.dbHost={host}` -- the DB private IP endpoint
* `config.dbPort`=3306 - the default MySQL port
* `config.dbUser={username}` -- Database Admin Username
* `config.dbPass={password}` -- Database Admin Password

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* `instancecontroller.replaceDeadClusters=true` -- The default value of `true` will automatically replace any clusters that have failed. If you set this value to `false` then a failed nodegroup will be deleted and not replaced.
* `instancecontroller.instanceNamePrefix={unique-value}` -- the `unique-value` **must be modified** with an identifier to pre-pend nodes that are created by the stream manager. **It is critical** that this value be different if you have multiple environments (eg, develop, staging, production), otherwise the stream manager will remove nodes with that prefix that are not in its database. Also note - if you use `node` in one environment and `nodedev` in a second environment, the first stream manager will remove the `nodedev` instances because it sees them as instances starting with `node`.

**Corrupted Nodes Check** (added with server release 6.2.0)

By default, Stream Manager uses RTMP response from nodes to determine their health (this check originates on the node side). Optionally, you can also monitor HTTP response from the nodes, by modifying the following values in the `NODE CONTROLLER` section:

* `instancecontroller.checkCorruptedNodes=false` -- change to `true` to monitor HTTP response from the autoscaling nodes.
* `instancecontroller.corruptedNodeCheckInterval=300000` -- frequency of stream manager checks to nodes in milleseconds (default is 5 minutes)
* `instancecontroller.corruptedNodesEndPoint=live` -- webapp to monitor. This is set to `live` by default but can be changed to any webapp.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* `cluster.password=changeme`  -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>TERRAFORM-CLOUD CONTROLLER CONFIGURATION</u>

You will need to uncomment and modify these properties.

`## TERRAFORM-CLOUD CONTROLLER CONFIGURATION##` section:

* `terra.host` -- IP address of the terraform server configured in the previous step (`127.0.0.1` for all in one VM)
* `terra.port` -- Port for accessing the terraform service API; the default port is `8083`
* `terra.token` -- Token configured for the terraform service configured in the previous step

`## TERRAFORM CONFIGURATION ##` section:

* `terra.regionNames` -- `private`
* `terra.instanceName` -- `vsphere_virtual_machine`


<u>REST SECURITY SECTION</u>

* `rest.administratorToken=`  -- **You need to set a valid password string here before you start using Stream Manager**. This is the password that you will use to execute API commands.

<u>RED5 PRO NODE SERVER API SECTION</u>

* `serverapi.port`: The port on which the Red5 Pro HTTP service is accessible. Unless this has been changed explicitly, it defaults to `5080`.
* `serverapi.protocol`: The protocol over which the HTTP service is accessible. If your instances have SSL certificates on them, then the value should be `https`, else it should be `http`. The default is `http`.
* `serverapi.accessToken`: The security access token required to make API calls to the node servers. Use the security access token value that you set on your nodes.

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to **true** enables, or set to **false** disables the  [websocket proxy service](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/). You must use the proxy if you are using WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be especially useful during development on the cloud, however, if your stream manager is behind a load balancer this call will not work. For more information, refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-logs/).

> Please note that if you modify any of the above values after your initial deployment, you will need to restart the Red5 Pro service.

<u>**Sample red5-web.properties file content:**</u>

```xml
## RED5 APP CONFIGURATION SECTION - Do Not Tamper
webapp.contextPath=/streammanager
webapp.virtualHosts=*

## DATABASE CONFIGURATION SECTION
config.dbHost=localhost
config.dbPort=3306
config.dbUser=autoadmin
config.dbPass=abcdefghi1234567

## DATA STORE MANAGEMENT CONFIGURATION SECTION
store.usageStatsDiscardThresholdDays=7

## NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS
instancecontroller.newNodePingTimeThreshold=150000
instancecontroller.replaceDeadClusters=true
instancecontroller.deleteDeadGroupNodesOnCleanUp=true
instancecontroller.instanceNamePrefix=autonode
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
cluster.password=changedme
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
## TERRAFORM-CLOUD CONTROLLER CONFIGURATION##
terra.regionNames=private
terra.instanceName=vsphere_virtual_machine
terra.host=127.0.0.1
terra.port=8083
terra.token=abc123

## REST SECURITY SECTION
rest.administratorToken=xyz123

## RED5PRO NODE SERVER API SECTION
serverapi.port=5080
serverapi.protocol=http
serverapi.version=v1
serverapi.accessToken=abc123

## DEBUGGING CONFIGURATION SECTION
debug.logaccess=false
debug.logcachexpiretime=60000

## WEBSOCKET PROXY SECTION
proxy.enabled=true

## SPRING INCLUSION
spring.jackson.default-property-inclusion=non_null
```

<u>**Start Red5 Pro Service to Use the Stream Manager**</u>

`systemctl start red5pro`

## Configure Stream Manager Whip/Whep Proxy

To enable Whip and Whep proxying to the edge and origin nodes respectively, the Stream Manager needs to be configured properly.  Details on enabling this proxy can be found on the [Whip/Whep Configuration](/docs/red5-pro/users-guide/red5-pro-whip-and-whep-configuration/#StreamManagerConfiguration) page in the Stream Manager section.
