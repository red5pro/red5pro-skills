---
title: Get Security Credentials (IAM)
description: ""
---

<u>**Obtain security credentials for stream manager AWS account access:**</u>

* Go to the [Amazon Identity and Access Management Dashboard](https://console.aws.amazon.com/iam/home#home)
* From left-hand navigation, click on **Users**
* Click on “Add User”
* Set user details: enter the username "streammanager"; Select AWS access type: choose **Programmatic access**. Click on **Next: Permissions**    ![setuserdetails](/_images/installation/server/autoscaleaws/setuserdetails.png)
* Select **Attach existing policies directly**. In the Filter: Policy type, type in `EC2FullAccess`. Place a check beside this choice, and click on **Next: Review**  ![ec2full](/_images/installation/server/autoscaleaws/ec2full.png)
* Review, and click on **Create user**
* Download the `.csv` file and/or click on `Show` to reveal the access and secret keys generated. **It is critical that you make a note of these, as you will not be able to retrieve them from the AWS console if you happen to lose them.** ![downloadcsv](/_images/installation/server/autoscaleaws/downloadcsv.png)
* Click “close” to close the window and return to IAM Users screen.
* You should be able to see the user you recently created - “streammanager” in the list on the page.
