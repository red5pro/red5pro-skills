---
title: 5. Create Red5 Pro Disk Image
description: ""
menu_order: 6
---

* From Compute Engine, VM, create an Ubuntu (recommended for the small footprint of the OS) virtual machine instance, using the network you created in your default zone.

![vmiimage](/_images/installation/server/autoscalgooglecloud/ubuntu16vm.png)

> It is recommended that you select a machine type with a minimum of 2 vcpu and 4 GiB Memory for acceptable performance.

* When selecting the `Boot Disk`, make sure to set the size to at least **16 GB**

![boot disk](/_images/installation/server/autoscalgooglecloud/boot-disk-select.png)

* Once the instance has spun up, use the Google Cloud SDK to copy the latest version of Red5 Pro server to the instance:

  * `gcloud compute scp red5pro-server*.zip red5pro-image-01:/tmp/`

> The google cloud SDK will help you generate SSH keys that are required to access the compute instances for your project. Usually, the keys are associated with your log-in account when generated using the cloud SDK. Also check out [Connecting to Instance](https://cloud.google.com/compute/docs/connect/standard-ssh).

* SSH into the server (`gcloud compute ssh red5pro-image-01`) and [follow directions for installing Red5 Pro server on linux](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-linux/):

> You can also use the [Red5 Pro installer](https://github.com/red5pro/red5pro-installer) to automate your installation. The installer will install all the necessary dependencies using your Red5 Pro account credentials.

Also, make sure that the server time zone is UTC (this should be the default on Google Cloud instances). Type `date` at the prompt. This will return the date, time, and zone (*eg:Tue Dec 13 20:21:49* **UTC** *2016*). If you need to switch to UTC, execute `sudo dpkg-reconfigure tzdata`, scroll to the bottom of the Continents list and select `None of the above`; in the second list, select `UTC`.

<u>**Configure Autoscaling on the Instance:**</u>

Navigate to the location where you extracted the red5pro files, and edit the file `{red5prohome}/conf/autoscale.xml`

```xml
    <bean name="config" class="com.red5pro.clustering.autoscale.Configuration" >
        <property name="active" value="false"/>

        <!--Stream manager hosted uri. use the host of your stream manager.  -->
                <property name="cloudWatchHost" value="http://0.0.0.0:5080/streammanager/cloudwatch"/>
```

* Change the active value from “false” to “*true*”
* Replace 0.0.0.0 with the static IP (elastic IP) you reserved for the stream manager previously or the hostname associated with the IP address.

> NOTE: if you are going to be using a secure URL for pointing to a load balancer or for standard WebRTC usage, then you should use that (for example: `<property name="cloudWatchHost" value="https://my.streammanager.com/streammanager/cloudwatch"/>`)

* Save and close the file

<u>**Set a Unique Cluster Password:**</u>

Edit the file `{red5prohome}/conf/cluster.xml` and replace the default `<!-- edge/origin link cluster password -->` password from `changeme` to sometime unique. Make a note of this password, to be used in the Stream Manager `red5.properties` file.

>**NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**

<u>**Remove Unnecessary Webapps:**</u>

To ensure a faster startup time for your server, we suggest deleting any webapps that you will not be using from the `{red5pro}/webapps` directory (for example: secondscreen, template, vod, streammanager; **do not remove root**). For ease of setup for the Stream Manager, leave a zipped copy of the server distribution on the server.

<u>**Verifying Red5 Pro on Instance:**</u>

Start Red5 Pro service
`sudo systemctl start red5pro`

Once you have started the Red5 Pro Server, you can verify that it is running and available by opening a web browser and navigating to `http://xxx.<instance-ip>.com:5080`, where `<instance-ip>` is the Public IP address of your instance.

After you've verified, stop the Red5 Pro service
`sudo systemctl stop red5pro`

## Create Disk Image

To create a disk image, you will need to delete the instance you just created, while retaining the boot disk. From the Google Cloud Dashboard, edit the VM instance and deselect “Delete boot disk when the instance is deleted," then click on **Save** to save this new configuration.

![bootdisk](/_images/installation/server/autoscalgooglecloud/keepdisk.png)

Now, delete the instance and **confirm that you are not deleting the boot disk - leave the checkbox empty.**

![bootdisk2](/_images/installation/server/autoscalgooglecloud/keepdisk2.png)

From Compute Engine, Images:

* Click on **[+] CREATE IMAGE**
* Give the image a name and make a note of it in your Google Cloud Compute AutoScaling Checklist. This will be used in the launchconfig default.json. We suggest naming it per the build version number for easy reference. Note that the name can only contain letters, numbers, and hyphens.
* Source = Disk.
* Source disk: use the pull-down to select the disk from the instance you just configured and deleted.
* Click on **Create**
* **NOTE**: with Server Release 7.0 (Stream Manager API 4.0) you can use different images for different node types. This can be especially handy if, for example, you want to support HLS recording but not live streams. In this case, you could remove the `mpegts` plugin on the `EDGE` or `RELAY` server image. You could also, for example, create an image on a larger instance type and allocate more memory.

![10acreateimage](/_images/installation/server/autoscalgooglecloud/createimage.png)