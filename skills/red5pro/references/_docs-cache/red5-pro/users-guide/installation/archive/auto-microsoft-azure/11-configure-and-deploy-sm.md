---
title: 9. Configure and Deploy Stream Manager
description: ""
menu_order: 12
---

**Note: after the Stream Manager instance is started up, you will need to add its IP address to the database firewall settings if you have not done that already**

<u>**Launch an Instance and Install Red5Pro**</u>

You can use the image that you created for the nodes above as a base for the Stream Manager.

* Navigate to the [Images list](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.Compute%2Fimages)
* Select the image that you created, and click on **Create VM**

![Create VM](/_images/installation/server/autoscaleazure/createvm.png)

* **Basic** : Fill in the basic information to configure the VM as per the following:
  * **Name**: The instance name. `Ex: streammanager-eastus-vm`
  * **VM Disk type**: HDD or Standard SSD
  * **Authentication type** : Select SSH Public Key.
  * **Username**: ubuntu
  * **SSH Public Key**: Paste the content of your public key (From the RSA key pair created earlier) here.
  * **Subscription**: Your subscription account
  * **Resource Group**: Select **Use existing** then select our resource group created previously.
  * **Location**:  Select the region where the Stream Manager VM will be created.

Click **Ok** to move to next step in the wizard.

* **Size**: Select an appropriate instance size for the VM. Instance types on Azure come with different configuration and pricing policy.
  * Change the **Supported disks type** drop down to select **HDD**.
  * Click on an appropriate instance size type size type. You can get more information on their configuration and performance from the [Azure Sizes for Cloud Services page](https://learn.microsoft.com/en-us/azure/cloud-services/cloud-services-sizes-specs). We suggest selecting a multi-vcpu instance type with high network performance. Azure provides a wide range of machine sizes to select from.
  * Click **Select** to save selection and continue.

* **Settings**: Select configuration options as mentioned below.
  * **Availability Set**: None
  * **Use Managed Disks**: Yes
  * **Virtual Network**: Select the virtual network created for the target region Ex: `<prefix>-<region>-vnet`.
  * **Subnet**: `default`
  * **Public IP Address**: Click to select the static public IP address (by name) that we created for Stream Manager web app earlier. EX: `streammanager-eastus-pip`.
  * **Network Security Group**: Select the Network Security Group created for the target region Ex: `<prefix>-<region>-nsg`
  * Ensure to turn off **Boot diagnostics** under **Monitoring** option

  > If you added ports for Stream Manager to your network security group for nodes you should use the same one for Stream Manager. Otherwise you can create a new network security group for Stream Manager with all the necessary ports listed earlier.

Once you are done, click **ok** to move to the final step.

* **Summary**: The final step checks your parameters and validates them for VM parameters. Click on **Create** to start creating the VM.

>This operation can take a couple of minutes. If you navigate to the “Virtual Machines” menu you can see the VM being created.

* After a few minutes the VM switches state from **Creating** to **Running**. The instance is now ready for Red5 Pro installation.

<u>**Associating the static IP address with this VM at a later stage:**</u>

You can also assign the static public IP address to the Stream Manager after it has started. However it is recommended to assign the public IP address at configuration stage. Once the new instance is created it will have a dynamic IP associated with it. If you wish to associate the static IP address at this this you will need to do it via the network interface of the Stream Manager VM.

* Navigate to **Virtual Machines** content window using the left pane
* Locate the Stream Manager virtual machine, and click on it to open the detail view.
* Click on the **Networking** option, locate the Network interface associated with the virtual machine and “click” on it. This will take you to the **Network Interface** detail view window for the particular network interface.

![Network Interface ](/_images/installation/server/autoscaleazure/vm-streammanager-networking.png)

* Click on **IP Configuration** under settings to show IP configuration for this network interface. Each network interface can have more than one IP configurations. But for simplicity we will be working with a single one.
* Click on the **Primary** IP Configuration listed in the window. This will show the IP configuration detail view.
* Click on **IP address** and select the static public IP address (by name) that was created earlier.
* You can leave the **Private IP address settings** untouched.
* Click **Save** to save changed to the IP configuration for the network interface. (It takes a few seconds for changes to be saved).
* You can now access the VM using the static IP address instead of the old one.
* Delete the older dynamic **Public IP address** resource which is now disassociated from the network interface by locating it in the **All Resources** menu.

>Once you have a static IP assigned to your instance You can also install SSL certificate on the Stream Manager instance.

## Configure the Stream Manager Instance

* SSH into the Stream Manager instance
* Stop the Red5 Pro service (`sudo systemctl stop red5pro`)

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC. Type `date` at the prompt. This will return the date, time and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

* Navigate to the directory where you installed Red5 Pro (e.g. `/usr/local/red5pro`)
* Remove the `red5pro` directory that was configured for the node; unzip the distribution and rename the unzipped directory `red5pro`.

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

Import and Activate Azure Cloud Controller

Copy the `azure-cloud-controller.jar` file into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the applicationContext.xml file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml` per the following:

* Locate the Azure controller “bean” and uncomment it as shown below  (*note: do not modify the values, only uncomment the bean configuration to make it active*):

```xml
<!-- AZURE CONTROLLER -->
<bean id="apiBridge" class="com.red5pro.services.cloud.microsoft.component.AzureComputeController" init-method="initialize">
   <property name="resourceGroupName" value="${az.resourceGroupName}"/>
   <property name="resourceGroupRegion" value="${az.resourceGroupRegion}"/>
   <property name="resourceNamePrefix" value="${az.resourceNamePrefix}"/>
   <property name="instanceNamePrefix" value="${instancecontroller.instanceNamePrefix}"/>
   <property name="clientId" value="${az.clientId}"/>
   <property name="clientKey" value="${az.clientKey}"/>
   <property name="tenantId" value="${az.tenantId}"/>
   <property name="subscriptionId" value="${az.subscriptionId}"/>
   <property name="vmUsername" value="${az.vmUsername}"/>
   <property name="vmPassword" value="${az.vmPassword}"/>
   <property name="defaultSubnetName" value="${az.defaultSubnetName}"/>
   <property name="operationTimeoutMilliseconds" value="${az.operationTimeoutMilliseconds}"/>
   <property name="quickOperationResponse" value="${az.quickOperationResponse}"/>
   <property name="quickResponseCheckInitialDelay" value="${az.quickResponseCheckInitialDelay}"/>
   <property name="apiLogLevel" value="${az.apiLogLevel}"/>
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

## Modify Stream Manager App Properties (red5-web.properties)

<u>**You will need to modify the following values:**</u>

<u>DATABASE CONFIGURATION SECTION</u>

* `config.dbHost={host}` -- the DB Endpoint URL of your MySQL server instance
* `config.dbUser={username}` -- Database Master Username
* `config.dbPass={password}` -- Database Master Password

<u>NODE CONTROLLER CONFIGURATION SECTION - MILLISECONDS</u>

* instancecontroller.replaceDeadClusters=true -- The default value of `true` will automatically replace any clusters that have failed. If you set this value to `false` then a failed nodegroup will be deleted and not replaced.
* instancecontroller.deleteDeadGroupNodesOnCleanUp=true   -- by default, any unresponsive nodes will be deleted from the dashboard. Setting this value to `false` will stop the instances, but not delete them. **note** the `false` variable is not supported with terraform.
* `instancecontroller.instanceNamePrefix={unique-value}` -- the `unique-value` **must be modified** with an identifier to pre-pend nodes that are created by the stream manager. **It is critical** that this value be different if you have multiple environments (eg, develop, staging, production), otherwise the stream manager will remove nodes with that prefix that are not in its database. Also note - if you use `node` in one environment and `nodedev` in a second environment, the first stream manager will remove the `nodedev` instances because it sees them as instances starting with `node`.
* `instancecontroller.newNodePingTimeThreshold=200000` --This is the max calculated time taken by a new Red5 Pro node to get into the running state and ping Stream Manager. On Azure, it takes longer than most of the other supported cloud platforms. Make sure to set this value to at least `200000`
* `instancecontroller.nodeGroupStateToleranceTime=500000` -- This is the maximum time for which Stream Manager allows a node group to be in an inconsistent state. After this, it is removed from the system forcibly. Attributing  to the long startup time of Red5 Pro node on Azure, this value must be set to `500000`
* `instancecontroller.nodeStateToleranceTime=500000` -- This is the maximum time for which Stream Manager allows a node to be in an inconsistent state. After this, it is removed from the system forcibly. Due to the long startup time of Red5 Pro node on Azure, this value must be set to `500000`

**Corrupted Nodes Check** (added with server release 6.2.0)

By default, Stream Manager uses RTMP response from nodes to determine their health (this check originates on the node side). Optionally, you can also monitor HTTP response from the nodes, by modifying the following values in the `NODE CONTROLLER` section:

* `instancecontroller.checkCorruptedNodes=false` -- change to `true` to monitor HTTP response from the autoscaling nodes.
* `instancecontroller.corruptedNodeCheckInterval=300000` -- frequency of stream manager checks to nodes in milleseconds (default is 5 minutes)
* `instancecontroller.corruptedNodesEndPoint=live` -- web app to monitor. This is set to `live` by default but can be changed to any web app.
* `instancecontroller.httptimeout=30000` -- allowed HTTP response time in milleseconds (30 seconds by default)

<u>CLUSTER CONFIGURATION INFORMATION</u>

* `cluster.password=changeme`  -- modify this to be the same as the password that you set in the `cluster.xml` file on your disk image.

<u>AZURE CLOUD CONTROLLER CONFIGURATION</u>

You will need to un-comment all the `az` name-spaced attributes and configure the following entries:

* `az.resourceGroupName` -- Name of the master autoscaling resource group
* `az.resourceGroupRegion` -- Default region of the master autoscaling resource group
* `az.resourceNamePrefix` -- Resource prefix used for namespacing and resolving resources on the Azure platform
* `az.clientId` -- Azure active directory client ID is the application access ID received after web app registration.
* `az.clientKey` -- Azure active directory client ID is the application access secret received after web app registration.
* `az.tenantId` -- The ID of the Azure active directory.
* `az.subscriptionId` -- The ID of the subscription plan that is used for autoscaling setup
* `az.vmUsername` -- Dynamic virtual machine username to be created for ssh. Recommended a minimum of 6 characters.
* `az.vmPassword` -- Dynamic virtual machine password to be created for ssh access. Password must be between 6-72 characters long and must satisfy at least 3 of password complexity requirements from the following:

  1. Contains an uppercase character
  2. Contains a lowercase character
  3. Contains a numeric digit
  4. Contains a special character
  5. Control characters are not allowed

* `az.defaultSubnetName` -- The default subnet name of virtual network(s) used. This should always be `default`.
* `az.quickOperationResponse` -- Boolean flag indicating whether to use `quickresponse` mode for delete operations. This is set to `true` by default. Setting it to `false` would mean that Stream Manager will wait for all resources to be deleted. This can take up to 400 seconds or more and can be blocking on autoscale operations. With the value set to `true` The controller returns a success to Stream Manager as soon as the virtual machine reaches `Deleting` state.
* `az.quickResponseCheckInitialDelay` -- Initial wait time before checking for virtual machine `Deleting` state. This should default to `20000`.
* `az.apiLogLevel` -- The Azure SDK logging level for `API` operations. Default is `BASIC` - which will provide the most logging. Other options, from most to least, are `WARNING`, `ERROR` and `OFF`.

<u>REST SECURITY SECTION</u>

* `rest.administratorToken=`  -- **You need to set a valid password string here before you start using streammanager**. This is the password that you will use to execute API commands

<u>RED5PRO NODE DEFAULT APPLICATION</u>

* webapp which the stream manager uses for checking node cluster status. The default value is `live`

<u>WEBSOCKET PROXY SECTION</u>

* `proxy.enabled` -- set to `true` enables, or set to `false` disables the websocket proxy service.  You must set up SSL on the Stream Manager and use the proxy if you are streaming WebRTC with Red5 Pro autoscaling.

<u>DEBUGGING CONFIGURATION SECTION</u>

* `debug.logaccess` -- Set to true if you want to allow access to log files via REST API. This can be especially useful during development on cloud. With log access enabled you can use the Stream Manager REST API to download log files without using SSH. For more info on how to use the log access API refer to the [Stream Manager Rest API](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-logs/).

> **WARNING!** Please note that the log files may contain sensitive information such as your license key. If you enable log access for REST API, make sure that the administrator token is not accessible to unauthorized personnel.
> Please note that if you modify any of the above values after your initial deployment, you will need to restart the Red5 Pro service.

<u>ALARM THRESHOLD (no longer in the properties file)</u>

The autoscaling alarm threshold is no longer set in the `red5-web.properties` file. Instead, the default value is 60%. If you want to modify this value, do so directly after node group creation using the [Rest API for alarms calls](/docs/red5-pro/development/api/archive/rest-api-v-310/smapi-alarms/). You can set different thresholds for origins and edges via the rest API.

<u>**Sample red5-web.properties file content:**</u>

```properties
## RED5 APP CONFIGURATION SECTION - Do Not Tamper
webapp.contextPath=/streammanager
webapp.virtualHosts=localhost, 127.0.0.1

## DATABASE CONFIGURATION SECTION
config.dbHost=red5proautoscaling-streammanager-eastus-db.mysql.database.azure.com
config.dbPort=3306
config.dbUser=user@red5proautoscaling-streammanager-eastus-db
config.dbPass=xyz@123456

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

## CLOUD CONTROLLER CONFIGURATION SECTION  - MILLISECONDS

## AZURE CLOUD CONTROLLER CONFIGURATION ##
az.resourceGroupName=red5proautoscaling
az.resourceGroupRegion=eastus
az.resourceNamePrefix=red5proautoscaling
az.clientId=0abr72fc-d552-4a0e-8ecb-4712758560a5
az.clientKey=poaX/MiFmBpVWDpm4ywB1YYtsxcSptZQwgmiM4yciPM=
az.tenantId=25fb21dd-0bqf-4f16-8e26-3f1e6g30b2fc
az.subscriptionId=7c234f4e-6r34-45f4-9cf5-e8e8t87e9d70
az.vmUsername=ubuntu
az.vmPassword=xyz@123456789
az.defaultSubnetName=default
az.operationTimeoutMilliseconds=120000
az.quickOperationResponse=true
az.quickResponseCheckInitialDelay=20000
az.apiLogLevel=BASIC

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
rest.administratorToken=xyz123

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

## Configure Stream Manager Whip/Whep Proxy

To enable Whip and Whep proxying to the edge and origin nodes respectively, the Stream Manager needs to be configured properly.  Details on enabling this proxy can be found on the [Whip/Whep Configuration](/docs/red5-pro/users-guide/red5-pro-whip-and-whep-configuration/#StreamManagerConfiguration) page in the Stream Manager section.
