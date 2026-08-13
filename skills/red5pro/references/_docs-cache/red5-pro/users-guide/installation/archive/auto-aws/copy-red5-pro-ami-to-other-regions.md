---
title: 8. Copy Red5 Pro AMI to Other Regions
description: ""
menu_order: 9
---

**You will need to repeat the following steps in each region where you wish to run Red5 Pro autoscaling node groups.**

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From the left-hand navigation, under IMAGES, click on AMIs. You should be able to see your image with the status set to “available” (by the name you specified).
* Select your AMI and click on Actions, Copy AMI
* Select the Destination Region from the drop-down.
* By default, the backing snapshot of an AMI will be copied with its original encryption status, so leave that box unselected
* Click on Copy AMI
* Choose the Destination Region to copy to
* Accept the other defaults
* Click on Copy AMI
    ![copyAMI](/_images/installation/server/autoscaleaws/copyAMI.png)
