_From: 6. Stream Manager Configuration_

## Modify Stream Manager App Properties (red5-web.properties)

The Stream Manager’s configuration details are stored in the red5-web.properties file, found in:
`{red5prohome}/webapps/streammanager/WEB-INF/red5-web.properties`. This is where streammanager reads all its settings from. Each configurable setting is organized into its own section.

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>u>

* `config.dbHost={host}`  -- the IP address of your MySQL server instance
* `config.dbUser={username}` -- username you set to connect to the MySQL instance
* `config.dbPass={password}` -- password used to connect to the MySQL instance

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* instancecontroller.replaceDeadClusters=true -- The default value of `true` will automatically replace any clusters that have failed. If you set this value to `false` then a failed nodegroup will be deleted and not replaced.
* instancecontroller.deleteDeadGroupNodesOnCleanUp=true   -- by default, any unresponsive nodes will be deleted from the dashboard. Setting this value to `false` will stop the instances, but not delete them. **note** the `false` variable is not supported with terraform.
* `instancecontroller.instanceNamePrefix={unique-value}` -- the `unique-value` **must be modified** with an identifier to pre-pend nodes that are created by the stream manager. **It is critical** that this value be different if you have multiple environments (eg, develop, staging, production), otherwise the stream manager will remove nodes with that prefix which are not in its database. Also note - if you use `node` in one environment and `nodedev` in a second environment, the first stream manager will remove the `nodedev` instances because it sees them as instances starting with `node`.

**Corrupted Nodes Check** (added with server release 6.2.0)

By default, Stream Manager uses RTMP response from nodes to determine their health (this check originates on the node side). Optionally, you can also monitor HTTP response from the nodes, by modifying the following values in the `NODE CONTROLLER` section:

* `instancecontroller.checkCorruptedNodes=false` -- change to `true` to monitor HTTP response from the autoscaling nodes.
* `instancecontroller.corruptedNodeCheckInterval=300000` -- frequency of stream manager checks to nodes in milleseconds (default is 5 minutes)
* `instancecontroller.corruptedNodesEndPoint=live` -- webapp to monitor. This is set to `live` by default, but can be changed to any webapp.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* cluster.password=changeme -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>LOADBALANCING CONFIGURATION</u>

* `streammanager.ip={streammanager-static-ip}`  -- The static IP address used for stream manager. This parameter is optional for a single stream manager setup. This is required when you wish to setup multiple stream managers behind a load balancer. If you use the [GCP autoscaling for Stream Managers](/docs/red5-pro/users-guide/installation/archive/auto-google-cloud/smautoscalegoogle/), this will be populated with a unique string for each stream manager instance, with a startup script in the instance template configuration.

<u>GOOGLE COMPUTE CLOUD CONTROLLER CONFIGURATION</u>

You will need to comment out the following entries:

* `compute.project={project-id}`  -- your Google Cloud project ID
* `compute.defaultzone={zone-id}`  -- the default zone for your Google Cloud project
* compute.defaultdisk=pd-standard  -- do not modify this value
* compute.network=default -- modify this if you are using a different VPC than `default`. This is the VPC name.
* compute.operationTimeoutMilliseconds=20000 -- estimated time to start a new VM. We do not recommend modifying this value.

<u>REST SECURITY SECTION</u>

* rest.administratorToken=  -- You need to set a valid password string here before you start using streammanager. This is the password that you will use to execute API commands

<u>RED5PRO NODE DEFAULT APPLICATION</u>

* webapp which the stream manager uses for checking node cluster status. The default value is `live`

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` set to **true** enables, or set to **false** disables the  websocket proxy service. You must use the proxy if you are using WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be specially useful during development on cloud. With log access enabled you can use the Stream Manager REST api to download log files with using SSH. For more info on how to use the log access api refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-logs/).

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
#config.dbDriver=org.postgresql.Driver

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
```

<u>**Start Red5 Pro Service to Use the Stream Manager**</u>

`sudo systemctl start red5pro`
