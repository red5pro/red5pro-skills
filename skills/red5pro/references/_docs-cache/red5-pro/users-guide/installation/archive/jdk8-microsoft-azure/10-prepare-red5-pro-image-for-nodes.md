---
title: 8. Prepare Red5 Pro Image for Nodes
description: ""
menu_order: 11
---

**Make sure to follow the recommended naming convention for `image` resources as mentioned earlier.**

## Launch an Instance and Install Red5 Pro

<u>**Start a Basic Instance:**</u>

* Navigate to [Virtual Machines](https://portal.azure.com/#blade/HubsExtension/Resources/resourceType/Microsoft.Compute%2FVirtualMachines). Click on **+Add**
* From the list of displayed Image options, click on **Ubuntu Server** and select **Ubuntu Server 16.04 LTS**. Make sure **Resource Manager** is selected, then click the **Create** button to start the VM creation wizard.

![New Ubuntu VM](/_images/installation/server/autoscaleazure/image-selection.png)

* **Basics**: Fill in the basic information to configure the VM as mentioned below:
  * **Name**: The instance name. e.g.: `red5pronode`
  * **VM Disk type**: **HDD** (the default SSD type seems to limit the machine types available across regions)
  * **Authentication type**: Select **SSH Public Key**.
  * **Username**: ubuntu
  * **SSH Public Key**: Paste the content of your public key (From the RSA key pair created earlier) here.
  * **Subscription**: Your subscription account
  * **Resource Group**: Select **Use existing** then select your resource group created previously.
  * **Location**: Select the region where the VM will be created.

Click **Ok** to move to next step in the wizard.

![New VM Wizard - Basic ](/_images/installation/server/autoscaleazure/create-vm-wizard-1.png)

**NOTE: Do not create a separate resource group for the instance. The VM should exist in the `master` resource group for the final image to exist in the same resource group.**

* **Size**: Select a instance type for the VM. Instance types on Azure come with different configuration and pricing policy. Since we are going to simply create an image, the **A1 Standard** VM configuration is sufficient to get started.
  * Change the **Supported disks type** drop down to select **HDD**.
  * Click on the **A1 Standard** size type.
  * Click **Select** to save selection and continue.

![New VM Wizard - Size ](/_images/installation/server/autoscaleazure/create-vm-wizard-2.png)

* **Settings** : This is the last step of the wizard. Here we configure the launch specific configuration such as network, security etc. Set the option as mentioned below.
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

<u>**Install Red5Pro on the Instance:**</u>

* Connect to your instance using the private key from the key-pair that you createdL `ssh -i ~/.ssh/keys/red5prokey ubuntu@<server_ip_address>`
* Follow the [Installing Red5Pro on a Linux Server instructions](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/)
* Make sure that Red5 Pro service is set to auto-start on launch.
* **Red5 Pro Clustering does not work without a license.**  You will need to purchase a Red5 Pro Professional license from [https://account.red5.net/login](https://account.red5.net/login). Add a file named LICENSE.KEY with your Pro license key (16 characters, plus dashes, like: YOUR-LIC-ENSE-KEY1) to the root of the Red5 Pro Server installation (`{red5prohome}/LICENSE.KEY`)

<u>**Install NTP (network time protocol)**</u>

NTP is necessary to ensure that the Stream Manager and all nodes are in sync.

`sudo apt-get install ntp`

The service should start automatically once installed.

Also, make sure that the server time zone is UTC. Type `date` at the prompt. This will return the date, time, and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

<u>**Configure Autoscaling on the Instance:**</u>

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="false"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="http://0.0.0.0:5080/streammanager/cloudwatch"/>
```

* Change the active value from “false” to “*true*”
* Replace 0.0.0.0 with the static IP (elastic IP) you reserved for the stream manager previously

>NOTE: If you plan on supporting WebRTC, you will need to install an SSL certificate on the Stream Manager instance. Thus you will have a `hostname` associated with the SSL cert instead of an IP address. Make sure to use the hostname instead of the IP address in the autoscale configuration shown above.

* Save and close the file

<u>**Set a Unique Cluster Password:**</u>

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

>**NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**

<u>**Remove Unnecessary Webapps:**</u>

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5pro}/webapps` directory (for example: secondscreen, template, vod, streammanager; **do not remove root**). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server.

<u>**Verifying Red5 Pro on Instance:**</u>

Start Red5 Pro service
`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://{instance-IP}}:5080`, where `{instance-ip}` is the Public IP address of your VM.

After you've verified, stop the Red5 Pro service:
`sudo systemctl stop red5pro`

## Create Image from Instance

After you have created the VM, select it from the list and click on Overview. Stop the instance, then click on **Capture** to create an image.

![Capture](/_images/installation/server/autoscaleazure/capture.png)

* **Name**: It is *essential* to name the image according to the conventions referenced in the [Resource Naming Convention grid](https://www.red5.net/docs/red5-pro/users-guide/installation/archive/auto-microsoft-azure/02-autoscaleazureoverview/#resource-naming-convention). For the server image, use `<imagename>-<serverversion>-<region>-img` (for example: autoscalenode01-red5pro430-eastus-img). If you don't include the `region-img` then the Stream Manager will not be able to find the image to create nodes.
* **Resource Group**: Choose *Use existing* and select the group that you set up.
* Do not select *Automatically delete this virtual machine after creating the image*; doing so will add a lot of extra time to the image creation.
  * You will want to delete the VM after you've created the image, as doing so `generalizes` the VM and it won't be useable.
* Click on **Create**

* **NOTE**: with Server Release 7.0 (Stream Manager API 4.0) you can use different images for different node types. This can be especially handy if, for example, you want to support HLS recording but not live streams. In this case, you could remove the `mpegts` plugin on the `EDGE` or `RELAY` server image. You could also, for example, create an image on a larger instance type and allocate more memory.

![Create Image](/_images/installation/server/autoscaleazure/createimage01.png)

## Copy Red5 Pro Image to Other Regions

There does not seem to be a simple way to copy **images** or even **snapshots** to other regions using the Azure portal. There is however a method to copy the snapshot to another region, create a managed disk from it,  create a VM from the managed disk and then finally => create an image from the VM. The process is not discussed here because of its scope. If you are an Azure administrator, you can always create automation scripts using CLI for this.

The fastest recommended way of making a Red5 Pro image available for another region would be to create an image using a new **Ubuntu Server 16.04 LTS** image as described earlier. You may use your own standard shell script automation for installing Red5 Pro and configuring the instance for autoscaling.
