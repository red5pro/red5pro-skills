---
title: 3. Deploy and Configure Stream Manager
description: ""
menu_order: 4
---

It is critical that the Stream Manager have a static IP address so that in the event that the instance is rebooted, it will retain the same public IP address. If you plan to be using WebRTC, you will want to [install an SSL certificate](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/) on your Stream Manager instance so that it can be used as a proxy for publishers and subscribers.

<u>**Install Red5 Pro on the Instance:**</u>

* Follow the [Installing Red5 Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that Red5 Pro service is set to auto-start on launch

| Port | Description | Protocol |
|---|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro; websockets for WebRTC / Stream Manager | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC / Stream Manager | TCP |
| *8081* | *websockets for WebRTC (severs earlier than 5.4.0)*| TCP |
| *8083* | *secure websockets for WebRTC (severs earlier than 5.4.0)*| TCP |

**NOTE: As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`, so you do not need to open up ports 8081/8083.**

## Configure the Stream Manager Instance

* SSH into the Stream Manager instance
* Stop the Red5 Pro service (`sudo systemctl stop red5pro`)

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC. Type `date` at the prompt. This will return the date, time, and zone (*eg: Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

* Navigate to the directory where you installed Red5 Pro (e.g. `/usr/local/red5pro`)
* **Delete the following files/directories:**
* * `{red5prohome}/conf/autoscale.xml`
* * `{red5prohome}/plugins/red5pro-autoscale-plugin-*`
* * `{red5prohome}/plugins/red5pro-webrtc-plugin-*`
* * `{red5prohome}/plugins/inspector.jar`
* * `{red5prohome}/webapps/inspector/`

### Import and Activate Simulated Cloud Controller

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

#### Modify Stream Manager App Properties (red5-web.properties)

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
* `instancecontroller.corruptedNodesEndPoint=live` -- webapp to monitor. This is set to `live` by default but can be changed to any webapp.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* `cluster.password=changeme`  -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>SIMULATED-CLOUD CONTROLLER CONFIGURATION</u>

You will need to uncomment and modify these properties.

* `managed.regionNames`: This attribute takes a comma-separated list of region names. For managed instances, we create our own region names which represent where the servers are located. The region name should be in a format similar to `us-test1`. You do not need to add more than one region.
* `managed.availabilityZoneNames`: This attribute takes a comma-separated list of zone names. For managed instances, we create our own zone names which represent where the servers are located. The zone names should be in a format similar to `us-test1-a`. You do not need to add more than one zone.
* `managed.operationTimeoutMilliseconds`: This attribute is common to all cloud platform controllers. It controls the max time allowed for a cloud operation. However, in the context of `SimulatedCloud`, this attribute is instead used to set the simulated `responseDelay` in milliseconds. A `responseDelay` makes the SimulatedCloud, simulate an operation like a cloud operation.
* `managed.recycleDeadNodes`: This attribute configured how the simulated cloud handles dead nodes. Normally when nodes are scaled-down they are recycled automatically (ie: They are soft-reset & put back in the availability list for reuse).  A node that is being deleted because of failure is generally not a healthy node. Hence it is not a candidate for reuse by default. Setting this attribute to true directs the controller to force the reusability of the node. If the value is set to `true`, the failed node being deleted will be reused; if set to `false` then the node will not be reused.

<u>REST SECURITY SECTION</u>

* `rest.administratorToken=`  -- **You need to set a valid password string here before you start using Stream Manager**. This is the password that you will use to execute API commands.

<u>RED5 PRO NODE SERVER API SECTION</u>

* `serverapi.port`: The port on which the Red5 Pro HTTP service is accessible. Unless this has been changed explicitly, it defaults to `5080`.
* `serverapi.protocol`: The protocol over which the HTTP service is accessible. If your instances have SSL certificates on them, then the value should be `https`, else it should be `http`. The default is `http`.
* `serverapi.version`: The API version that is applicable to your Red5 Pro instances. You can get information on the latest server API version for the [Red5 Pro server API documentation](/docs/development/api/overview/). The default value is `v1`.
* `serverapi.accessToken`: The security access token required to make api calls to the node servers. Use the security access token value that you set on your nodes.

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to **true** enables, or set to **false** disables the  [websocket proxy service](/docs/red5-pro/users-guide/installation/archive/stream-manager-proxy/overview/). You must use the proxy if you are using WebRTC with Red5 Pro autoscaling.

<u>RED5PRO NODE DEFAULT APPLICATION</u>

* webapp which the stream manager uses for checking node cluster status. The default value is `live`

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
#config.dbDriver=org.postgresql.Driver

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
```

<u>**Start Red5 Pro Service to Use the Stream Manager**</u>

`sudo systemctl start red5pro`

## Set Scaling Policy

With Stream Manager API v3.0, the Scaling and Launch policies are set via the API (see [scale policy management](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-scalepolicy/) and [launch policy management](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-launchconfig/)).

Using a tool like [Postman](https://www.postman.com/), you must set a scaling policy before creating any node groups. The policy supports two optional attributes per `role` target - `scaleInWaitTime` & `scaleOutWaitTime`. These are optional parameters denoting delayed scale-in/scale-out time in milliseconds. The attributes require positive values (>=0). If the attribute is omitted it defaults to `0`. For more information see the scale policy description.

You will need to create a scaling policy that includes each node type that you want in your setup. If you want to take advantage of the new features (multi-bitrate streaming, adaptive bitrate subscribing, and dynamic clustering) you need to have a minimum of **two** each **origin, edge,** and **relay** nodes. If you want to include VP8 transcoding support, then you also need two **transcoder** nodes.

**POST call:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=<accessToken>
```

**Data** (make sure to select **JSON** as the body type):

```json
   {
    "policy": {
        "name": "<policy-name>",
        "description": "<policy-description>>",
        "version": "<policy-version>",
        "type": "<policy-type>",
    "targets": {
      "target": [
        {
          "role": "<role>",
          "minLimit": "<min-node-count>",
          "maxLimit": "<max-node-count>",
          "scaleAdjustment": "<node-scale-adjustmant>"
        }
      ]
    }
    }}

```

**Example:**

**REQUEST:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=xyz123
```

**Data:**

```json
   {
      "policy": {
          "name": "all-nodes",
          "description": "Sample Scale Policy with All Four Node Types",
          "type": "com.red5pro.services.autoscaling.model.ScalePolicyMaster",
          "version": "0.0.3",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "target": [
                          {
                              "role": "edge",
                              "maxLimit": 20,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "origin",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "relay",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "transcoder",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          }
                      ]
                  }

```

## Set Launch Configuration Policy

You will need to create a launch policy that includes each node type that you want in your setup. If you want to take advantage of the new features (multi-bitrate streaming, adaptive bitrate subscribing, and dynamic clustering) you need to have a minimum of **two** each **origin, edge,** and **relay** nodes. If you want to include VP8 transcoding support, then you also need two **transcoder** nodes. 

<!-- You will need the name of the `ami` that you created in [step 7 above]FIXME-DOM(./prepare-red5-pro-ami-for-nodes). 
-->
You can choose different instance types and capacities for each node type if you wish.

**POST call:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<accessToken>
```

**Data** (make sure to select **JSON** as the body type):

```json
   {
    "launchconfig": {
      "name": "<configuration-name>",
      "description": "<configuration-descrption>",
      "image": "<red5pro-image>",
      "version": "0.0.2",

    "targets": {
        "target": [
      {
        "role": "<role>",
        "instanceType": "<instance-type>",
        "connectionCapacity": "<instance-capacity>"
      }
      ]
      },

      "properties": {
        "property": [
          {
            "name": "<property-name>",
            "value": "<property-value>"
          }
        ]
      },
      "metadata": {
        "meta": [
          {
            "key": "<meta-name>",
            "value": "<meta-value>"
          }
        ]
      }
    }}
```

**Example:**

**REQUEST:** 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchpolicy?accessToken=xyz123
```

**Data:**

```json
     {
    "launchconfig": {
      "name": "allnodes-launch",
      "description": "Sample Launch Policy with all four node types",
      "image": "managed",
      "version": "0.0.2",

      "targets": {
          "target": [
        {
          "role": "origin",
          "instanceType": "standard",
          "connectionCapacity": "2000"
        },
        {
          "role": "edge",
          "instanceType": "standard",
          "connectionCapacity": "2000"
        },
        {
          "role": "relay",
          "instanceType": "standard",
          "connectionCapacity": "2000"
        },
        {
          "role": "transcoder",
          "instanceType": "large",
          "connectionCapacity": "2000"
        }
         ]
        },

        "properties": {
          "property": [
            {
              "name": "property-name",
              "value": "property-value"
            }
          ]
        },
        "metadata": {
          "meta": [
            {
              "key": "meta-name",
              "value": "meta-value"
            }
          ]
        }
      }}
```