---
title: 8. Prepare Red5 Pro Image for Nodes
description: ""
menu_order: 11
---

**Make sure to follow the recommended naming convention for `image` resources as mentioned earlier.**

## Launch an Instance and Install Red5 Pro

<u>**Start a Basic Instance:**</u>

* Navigate to [Virtual Machines](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.Compute%2FVirtualMachines). Click on **+Add**
* From the list of displayed Image options, click on **Ubuntu Server** and select **Ubuntu Server 20.04 LTS**. Make sure **Resource Manager** is selected, then click the **Create** button to start the VM creation wizard.

* **Basics**: Fill in the basic information to configure the VM as mentioned below:
  * **Name**: The instance name. e.g.: `red5pronode`
  * **VM Disk type**: **HDD** (the default SSD type seems to limit the machine types available across regions)
  * **Authentication type**: Select **SSH Public Key**.
  * **Username**: ubuntu
  * **SSH Public Key**: Paste the content of your public key (From the RSA key pair created earlier) here.
  * **Subscription**: Your subscription account
  * **Resource Group**: Select **Use existing** then select your resource group created previously.
  * **Location**: Select the region where the VM will be created.

Click **Ok** to move to the next step in the wizard.

**NOTE: Do not create a separate resource group for the instance. The VM should exist in the `master` resource group for the final image to exist in the same resource group.**

* **Size**: Select an instance type for the VM. Instance types on Azure come with different configuration and pricing policies. Recommended: `StandardF2s_v2` (`F2s_v2` in launch configuration)
* **Settings**: This is the last step of the wizard. Here we configure the launch-specific configuration such as network, security, etc. Set the option as mentioned below.
  * **Availability Set**: None
  * **Use Managed Disks**: Yes
  * **Virtual Network**: Select the virtual network created for the target region Ex: `<prefix>-<region>-vnet`.
  * **Subnet**: `default`
  * **Public IP Address**: Leave settings to default `(new)` as the resource is auto-generated. But keep note of the resource name as we will be deleting it after we are done creating the image.
  * **Network Security Group**: Select the Network Security Group that you created for the target region e.g. `<prefix>-<region>-nsg`
  * **Extensions**: No extensions.
  * **Auto-shutdown**: Off.
  * Disable **Boot diagnostics** and **Guest OS diagnostics** under the `Monitoring` option.
  * Once you are done, click **ok** to move to the final step.

* **Summary**: The final step checks your parameters and validates them for VM parameters. Click on **Create** to start creating the VM.

>This operation can take a couple of minutes. If you navigate to the “Virtual Machines” menu you can see the VM being created.

* After a few minutes the VM switches state from “creating” to “Running”. The instance is now ready for Red5 Pro installation.

## Install Red5Pro on the Instance

* Connect to your instance using the private key from the key-pair that you createdL `ssh -i ~/.ssh/keys/red5prokey ubuntu@<server_ip_address>`
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [https://account.red5.net/login](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`)

If you haven't already, <u>**Install NTP (network time protocol)**</u>. NTP is necessary to ensure that the Stream Manager and all nodes are in sync. `sudo apt-get install ntp` The service should start automatically once installed.

## Configure Autoscaling on the Instance

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

* Change the active value from “false” to “*true*”
* Replace `http://0.0.0.0:5080` with `https://your-streammanager-url`
* Save and close the file

example:

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="true"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="https://red5autoscale.red5pro.com/streammanager/cloudwatch"/>
```

## Set a Unique Cluster Password

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to a unique value. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

## Remove Unnecessary Webapps

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5pro}/webapps` directory (for example: template, streammanager; **do not remove root**). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server.

In addition, it is recommended that you remove any plugins (found in the `red5pro/plugins` directory) which you will not be using, from the following list:

* red5pro-mpegts* -- HLS
* red5pro-restreamer* -- restreamer
* red5pro-socialpusher* -- social media restreaming

## Verifying Red5 Pro on Instance

Start Red5 Pro service

`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://<server-ip>:5080`, where `<server-ip>` is the Public address value of your Red5 Pro server.

After you've verified, stop the Red5 Pro service

`sudo systemctl stop red5pro`

## Create Image from Instance

After you have created the VM, select it from the list and click on Overview. Stop the instance, then click on **Capture** to create an image.

* **Name**: It is *essential* to name the image according to the conventions referenced in the [Resource Naming Convention grid](/docs/red5-pro/users-guide/installation/archive/auto-microsoft-azure/02-autoscaleazureoverview/#resource-naming-convention). For the server image, use `<imagename>-<serverversion>-<region>-img` (for example: autoscalenode01-red5pro430-eastus-img). If you don't include the `region-img` then the Stream Manager will not be able to find the image to create nodes.
* **Resource Group**: Choose *Use existing* and select the group that you set up.
* you will want to delete the VM after you've created the image, as doing so `generalizes` the VM and it won't be useable. Selecting *Automatically delete this virtual machine after creating the image* will add extra time to the image creation, but it is also cleaner than deleting the instance yourself.

* Click on **Create**

* **NOTE**: as of Server Release 7.0 (Stream Manager API 4.0) you can use different images for different node types. This can be especially handy if, for example, you want to support HLS recording but not live streams. In this case, you could remove the `mpegts` plugin on the `EDGE` or `RELAY` server image. You could also, for example, create an image on a larger instance type and allocate more memory.

![Create Image](/_images/installation/server/autoscaleazure/createimage01.png)

## Copying Red5 Pro Node Image to Other Regions

There does not seem to be a simple way to copy **images** or even **snapshots** to other regions using the Azure portal. There is however a method to copy the snapshot to another region, create a managed disk from it,  create a VM from the managed disk nd then finally => create a image from the VM. The process is not discussed here because of its scope. If you are an Azure administrator, you can create automation scripts using CLI for this.

The fastest recommended way of making a Red5 Pro image available for another region would be to repeat the [Prepare Red5 Pro Image for Nodes](/docs/red5-pro/users-guide/installation/archive/auto-microsoft-azure/10-prepare-red5-pro-image-for-nodes/) process for each region.
