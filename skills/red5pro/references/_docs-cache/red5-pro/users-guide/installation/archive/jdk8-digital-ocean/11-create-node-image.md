---
title: Create Node Image
description: ""
menu_order: 12
---

1. From the left-hand navigation of the Digital Ocean dashboard, under the Manage section, choose [Images, Snapshots](https://cloud.digitalocean.com/images/snapshots/droplets)
2. Under *Take a Snapshot* select the node droplet you just configured from the drop-down; either use the assigned image name, or rename it to something more descriptive
3. Then click on Take Snapshot. It will take a few minutes to create the image. ![image01](/_images/installation/server/autoscaledigitalocean/image01.png)
4. Make a note of the *Node Image Name*
5. **NOTE**: as of Server Release 7.0 (Stream Manager API 4.0) you can use different images for different node types. This can be especially handy if, for example, you want to support HLS recording but not live streams. In this case, you could remove the `mpegts` plugin on the `EDGE` or `RELAY` server image. You could also, for example, create an image on a larger instance type and allocate more memory.


## Copy Image to Regions

If you wish to autoscale across multiple regions, then you will need to copy the image created to all of the regions that you will be using.

1. Once the snapshot has been created it will be listed under Snapshots, Droplets. Choose the snapshot and click on More, then choose *Add to region*. ![region01](/_images/installation/server/autoscaledigitalocean/region01.png)
2. Click on each region to which you would like to copy the image. ![region02](/_images/installation/server/autoscaledigitalocean/region02.png)
3. Make a note of the *Regions* which contain the image.


