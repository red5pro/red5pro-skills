---
title: Autoscaling Stream Managers
description: Autoscaling Stream Managers On Google Cloud Platform
menu_order: 8
---

# Summary

The solution discussed in this document is based on Google Cloud Platform's Auto Scaling mechanism. Please note that GCP's Auto Scaling feature shouldn't be confused with [Red5 Pro's Autoscaling that is handled by Red5 Pro Stream Manager](https://www.red5pro.com/docs/autoscale/).

The aim is to use Google Cloud Platform's instance autoscaling in conjunction with Red5 pro autoscaling to implement a robust and self-managing autoscale setup for streaming. With this system in place, Red5 pro autoscaling takes care of adding/removing Red5 Pro nodes and GCP instance autoscaling helps add/remove Stream Manager instances dynamically as necessary. This helps achieve a robust and self-managing system that can guarantee high availability for expected services.

The GCP Auto Scaling mechanism requires us to define an instance template, that defines the detailed configuration that the Stream Manager instance should use. We will then create a instance group that uses the instance template to spin up Stream Manager instances.

GCP Autoscaling configuration will consist of one or more instance groups behind a load balancer.

`<TO CHECK>`
> Because we use the Red5 Pro Stream Manager as a WebSocket proxy for WebRTC clients, we recommend that you disable automatic scale-in if you are using WebRTC clients. Because the connections are persistent in nature, a scale-in would disconnect any connected clients. If you are not using WebRTC, you can take advantage of AWS's scale-in mechanism as well.

**Prerequisites**

* You should have completed setting up a standard Red5 Pro autoscaling deployment on AWS.
* You should have some basic understanding of the AWS console and EC2 related services.
* You should have basic Linux administration skills.

# 1. Prepare a Stream Manager Image

> This assumes that you have at least one Stream Manager instance configured and `running`.

To create a disk image from the Stream Manager instance:

To create a disk image, you will need to delete the instance you just created, while retaining the boot disk. From the Google Cloud Dashboard, edit the VM instance and deselect “Delete boot disk when instance is deleted," then click on **Save** to save this new configuration.

![bootdisk](/_images/installation/server/autoscalgooglecloud/keepdisk.png)

Now, delete the instance and **confirm that you are not deleting the boot disk - leave the checkbox empty.**

![bootdisk2](/_images/installation/server/autoscalgooglecloud/keepdisk2.png)

From Compute Engine, Images:

* Click on **[+] CREATE IMAGE**
* Give the image a name that distinguishes it from the `node` image. We also suggest naming it per the build version number for easy reference. Note that the name can only contain letters, numbers and hyphens.
* Source = Disk.
* Source disk: use the pull-down to select the disk from the instance you just configured and deleted.
* Click on **Create**

![10acreateimage](/_images/installation/server/autoscalgooglecloud/createimage.png)

# 2. Create an Instance Template

In this step, we will be creating the instance template for Stream Manager instances. The template will specify the standard configuration that a dynamically spun Stream Manager instance should posses.

From Compute Engine, Instance templates:

* Click on Create instance template
* Give the template a descriptive name (for example, sm-buildversion-template)
* Choose the same machine type that you used for the VM from which you created the image (recommended n1-standard-2)
* For **boot disk** click on *change* and select the custom disk image you created in step 1.
* Under **Identity and API access** either `Allow full access to all Cloud APIs` or `Set access for each API` and enable access to **Cloud SQL**, **Compute Engine** (read-write), and any other services that you might be using for your environment.
* Under **Firewall** allow HTTP and HTTPS traffic

![instancetemplate01](/_images/installation/server/smautoscalegoogle/instancetemplate01.png)

* **IMPORTANT**: Under **Management** tab, **Automation** section, add the following as a **startup script**:

```bash
#!/bin/bash

uid=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 16 | head -n 1 | tr '[:upper:]' '[:lower:]')
smhost=$(echo "$uid.com")

sed -i "s/\\(streammanager\\.ip=\\).*\\$/\\1${smhost}/" /usr/local/red5pro/webapps/streammanager/WEB-INF/red5-web.properties
```

> The above script will run automatically when a new instance is created using this template. It is programmed to edit the Stream Manager instance's configuration file - `red5-web.properties` and set a unique value for the property - `streammanager.ip` (it will be something like `streammanager.ip=z2go1nhorcpsxlxy.com`). This property needs to be set to a unique identifier string such as an IP address or a hostname when using multiple Stream Managers behind a load balancer.

![instancetemplate02](/_images/installation/server/smautoscalegoogle/instancetemplate02.png)

* Under **Networking** tab, select the Network (`default` is the default)

![instancetemplate03](/_images/installation/server/smautoscalegoogle/instancetemplate03.png)

* Click on **Create** to finish.

# 3. Create a Health Check

Next, you need to create a health check to use for the instance group (to identify if/when to upscale or replace a stream manager node).

* Navigate to [Compute Engine, Health Check](https://console.cloud.google.com/compute/healthChecks)
* Click on **Create a health check**
* Give the health check a name to identify it easily
* Choose protocol `HTTP` and change port to `5080`
* Leave other defaults, and click on **Create**

![instancetemplate01](/_images/installation/server/smautoscalegoogle/healthcheck.png)

# 4. Create an Instance Group

An instance group will hold our Stream Manager instances for a particular region spanning across zones.
If you plan to have multiple Stream Managers spread across regions, you should create one Instance Group for each regions.

* Navigate to [Compute Engine, Instance Groups](https://console.cloud.google.com/compute/instanceGroups/)
* Click on **Create instance group** (you will be seting up a *New managed instance group*).

![instancegroup01](/_images/installation/server/smautoscalegoogle/instancegroup01.png)

* Give the Instance Group a name to identify it (recommend including the region in your name)
* **Location**: select **Multiple zones**
* **Instance template**: select the stream manager template created in Step 2 above.
* **Autoscaling Mode**: Autoscale only up (required for websocket proxy support).
* **Autoscaling policy**: CPU usage.
* **Target CPU usage**: you can leave this as the default 60%, or adjust that up or down to scale more or less aggivessively.
* **Minimum number of instances**: we recommend setting this to at least 2 if you are only going to create one instance group. If you are planning on creating instance groups across multiple regions, you can make the minimum number 1. For high availability, Google recommends setting this to the number of zones in the region.
* **Maximum number of instances**: adjust accordingly, depending on your expected traffic. **NOTE:** be aware of your CPU quotas in each region so that you don't exceed that. Go to [IAM & admin, Quotas](https://console.cloud.google.com/iam-admin/quotas?metric=CPUs). Filter by **Metric** and choose **CPUs**.
* **Health check**: select the health check that you created in step 3 above. Leave the **Initial delay** at the default 300 seconds to allow instance to start up before checking.
* Click on **create** to finish (this may take a few minutes to complete).

![instancegroup02](/_images/installation/server/smautoscalegoogle/instancegroup02.png)

# 5. Set up Load Balancer

Now, we will set up a load balancer that uses the Instance Group(s) created in step 4 as the back end. In other words, the load balancer will route traffic to active instances in the instance groups.

* Navigate to [Network services, Load Balancing](https://console.cloud.google.com/net-services/loadbalancing).
* Click on **Create load balancer**
* Choose HTTP(S) Load Balancing, and click on **Start configuration**
* Give your load balancer a name to identify it

## Backend configuration

Stream Manager instances normally run at 5080. The backend configuration will help traffic from load balancer to the Stream Manager instances at the designated ports.

* Click on **Backend configuration** --> Create or select backend services & backend buckets --> Backend services --> Create a backend service
* Give the service a name to identify it
* Edit the `HTTP` protocol timeout, changing it from `30` seconds to `315,316,000` seconds (one year) or `86,400` (one day) - **NOTE**: you can make this shorter if you know the approximate length of your broadcasts. For example, if your broadcasts will definitely be under one hour, you could set this to `3,600` seconds. **IMPORTANT: If you leave this at 30 seconds, then WebRTC broadcasts will be cut off after 30 seconds.**

![backendtimeout](/_images/installation/server/smautoscalegoogle/backendtimeout.png)

* **Backend type**: choose **Instance groups**
* Under **New backend**, select one of the instance groups created; modify **Port numbers** to be 5080. Keep the default settings for CPU and Capacity. For **Health check**, select the health check you created above in step 3, then click on **Create** for this backend service.
* If you have additional Instance Groups, then add them to this same backend configuration (click on **+Add backend** and choose another instance group, one at a time.
* **Host and path rules** can be skipped.
* Click on **Done** when you are finished.

![createbackend](/_images/installation/server/smautoscalegoogle/createbackend.png)

## Frontend configuration

* **Frontend configuration**: give the load balancer a name
* **Protocol**: HTTPS (note: you must use the default port (443) for HTTPS)
* **IP version**: IP4; **IP address**: create a new IP address (to use for your domain)
* **Certificate**: Create a new certificate (managed by GCP - this will be a Let's Encrypt certificate managed by GCP)
* Accept other defaults, and click on **Done**

![createfrontend](/_images/installation/server/smautoscalegoogle/createfrontend.png)

![managedcert](/_images/installation/server/smautoscalegoogle/managedcert.png)

## Review and finalize

Look over the settings that you've configured, then click on **Create** to initialize the load balancer.

# DB ACCESS

In order for the stream managers to be able to write/read to/from the database, you will need to give the load balancer access to the database inbound mysql port (3306). Navigate to [SQL](https://console.cloud.google.com/sql/instances). Click on your DB instance, and then on the **Connections** tab. Under **Authorized networks** +Add network, and add in the IP address of your load balancer. Then click on **Save**.

You will need to log into any stream manager instances that have already started up and restart the Red5 Pro service, or cycle the instances via the Instance Group, choosing *Rolling restart*.

# Updating Stream Manager Image for Autoscaling

When you need to update the stream manager, if you are using GCP Autoscaling, you will need to follow this process:

1. Create a new VM instance using the current Stream Manager disk image
2. Create a new disk image from that VM
3. Create a new Instance Template from that image
4. Update your Instance Group(s) with the new instance template - you can either choose to do a `Rolling Update` (in which you enter the second template, and have GCP roll that out) or a `Rolling Restart/Replace` after you have changed the target template for the group.
