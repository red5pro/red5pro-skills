---
title: 3. Reserve Elastic IP
description: Reserve Elastic (Static) IP for Stream Manager
menu_order: 4
---

It is critical that the Stream Manager have a static IP address, so that in the event that the instance is rebooted, it will retain the same public IP address.

<u>**To reserve an elastic IP address:**</u>

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* Ensure that you are in the region where you wish to setup Stream Manager (you can change region from the region selector located in top right section of your AWS console).
* In the left-side navigation, under NETWORK & SECURITY, click on **Elastic IPs**
* Click on **Allocate New Address** to bring up confirmation dialog box. Choose **EIP used in: VPC**
* Click “Yes, Allocate” to reserve an IP address.
* After an IP is reserved the confirmation dialog will display it. **Make a note of this IP address, to be used by the stream manager**.
    ![eipinvpc](/_images/installation/server/autoscaleaws/eipinvpc.png)
