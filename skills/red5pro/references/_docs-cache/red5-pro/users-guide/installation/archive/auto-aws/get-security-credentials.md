---
title: 1. Get Security Credentials (IAM)
description: ""
menu_order: 2
---

<u>**Obtain security credentials for stream manager AWS account access:**</u>

* Go to the [Amazon Identity and Access Management Dashboard](https://console.aws.amazon.com/iam/home#home) to create a custom security policy and account for your stream manager.

## Create New Policy

In adhering to [least-privilege permissions](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege), you need to create a new custom policy stream manager programmatic access.

* From the IAM dashboard, choose [properties](https://us-east-1.console.aws.amazon.com/iamv2/home#/policies) from the left-hand navigation.
* Click on **create policy**
* Click on the **JSON** tab, and paste in the following (replace the entire placeholder text):

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:DescribeInstances",
                "ec2:UnmonitorInstances",
                "ec2:GetIpamResourceCidrs",
                "ec2:GetIpamPoolCidrs",
                "ec2:MonitorInstances",
                "ec2:DescribeVolumesModifications",
                "ec2:DescribeExportImageTasks",
                "ec2:DescribeVolumeStatus",
                "ec2:StartInstances",
                "ec2:ReleaseIpamPoolAllocation",
                "ec2:DescribeVolumes",
                "ec2:UnassignPrivateIpAddresses",
                "ec2:DescribeKeyPairs",
                "ec2:DescribeRouteTables",
                "ec2:DetachVolume",
                "ec2:DescribeCapacityReservations",
                "ec2:ModifyVolume",
                "ec2:ImportKeyPair",
                "ec2:CreateTags",
                "ec2:DescribeVpnConnections",
                "ec2:ModifyNetworkInterfaceAttribute",
                "ec2:DeleteNetworkInterface",
                "ec2:RunInstances",
                "ec2:StopInstances",
                "ec2:AssignPrivateIpAddresses",
                "ec2:CreateVolume",
                "ec2:CreateNetworkInterface",
                "ec2:DescribeSecurityGroupRules",
                "ec2:DescribeInstanceTypes",
                "ec2:AssociateAddress",
                "ec2:DescribeSubnets",
                "ec2:DescribeVpnGateways",
                "ec2:ExportImage",
                "ec2:AttachVolume",
                "ec2:DisassociateAddress",
                "ec2:DescribeAddresses",
                "ec2:RequestSpotInstances",
                "ec2:DeleteTags",
                "ec2:DescribeInstanceAttribute",
                "ec2:DescribeRegions",
                "ec2:DescribeDhcpOptions",
                "ec2:GetSubnetCidrReservations",
                "ec2:ModifyAvailabilityZoneGroup",
                "ec2:DescribeInstanceTypeOfferings",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeNetworkInterfaceAttribute",
                "ec2:ModifyInstanceAttribute",
                "ec2:DescribeInstanceStatus",
                "ec2:GetIpamPoolAllocations",
                "ec2:RebootInstances",
                "ec2:ModifyInstanceMetadataOptions",
                "ec2:AuthorizeSecurityGroupEgress",
                "ec2:ModifyInstancePlacement",
                "ec2:TerminateInstances",
                "ec2:DetachNetworkInterface",
                "ec2:DescribeTags",
                "ec2:DescribeImportImageTasks",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeImages",
                "ec2:DescribeVpcs",
                "ec2:AttachNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
}

```

* Click on **Next: Tags** (optionally, add tag), the **Next: Review**
* Give your policy a name (for example "stream manager programmatic access", then click on **Create policy**

## Create the Stream Manager user account

* From the left-hand navigation, click on **Users**
* Click on **Add Users**
* Set user details: enter the username (for example: "production-streammanager"). Do NOT select "enable console access". Click **Next**.
* Select **Attach existing policies directly**. In the Filter, type in the name of the policy you created above, and place a checkmark to select it. Click **Next**.
* Review, and click on **Create user**
* Click on **view user** at the top (or find your new user in the list), and click the **Security credentials** tab.
* Under the **Access keys** section, click on **Create access key**. Choose **Other** from the bottom of the list, then click **Next**
* Set description tag - optional; click **Create access key**
* Download the `.csv` file and/or click on `Show` to reveal the access and secret keys generated. **It is critical that you make a note of these, as you will not be able to retrieve them from the AWS console if you happen to lose them.**
* Click **Done** to close the window and return to the IAM Users screen.
* You should be able to see the user you recently created in the list on the page.

## Best Practices - Secret/Key Rotation

For security best practices, it is recommended that you update your access security credentials regularly.


