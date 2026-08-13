---
title: Create IAM Role and Instance Profile for Stream Manager
menu_order: 2
---

## Overview

Stream Manager 2.0 uses IAM role-based authentication via instance profiles instead of static access keys. This document explains how to manually create the IAM role, policy, and instance profile required for Stream Manager to run Terraform operations.

> **Note:** If you're using the official [Red5 Pro Terraform module](https://registry.terraform.io/modules/red5pro/red5pro/aws/latest), the IAM role, policy, and instance profile are created automatically. This guide is only for manual deployments.

## Prerequisites

Before creating the IAM resources, ensure you have:

* AWS account with IAM permissions to create roles, policies, and instance profiles
* Permission to attach IAM roles to EC2 instances
* Basic knowledge of AWS IAM console or AWS CLI

## Step 1: Create IAM Role

The IAM role allows EC2 instances to assume permissions for Terraform operations. The trust policy allows EC2 instances to assume this role.

### Using AWS Console

1. Navigate to the [IAM Dashboard](https://console.aws.amazon.com/iam/home)
2. Click **Roles** from the left-hand navigation
3. Click **Create role**
4. Under **Use case**, select **EC2**, then click **Next**
5. Click **Next** on the permissions page (we'll attach a custom policy in the next step)
6. Enter a role name (e.g., `stream-manager-terraform-role`) and optionally add tags
7. Click **Create role**

The trust policy is automatically configured when you select **EC2** as the use case.

### Using AWS CLI

If you prefer using AWS CLI instead of the console:

1. Save the following trust policy as `trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      }
    }
  ]
}
```

2. Create the IAM role:

```bash
aws iam create-role \
  --role-name stream-manager-terraform-role \
  --assume-role-policy-document file://trust-policy.json \
  --tags Key=Name,Value=stream-manager-terraform-role
```

## Step 2: Create IAM Policy

The policy grants permissions for Terraform to manage EC2 instances.

1. In the IAM Dashboard, click **Policies** from the left-hand navigation
2. Click **Create policy**
3. Click the **JSON** tab and paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sts:GetCallerIdentity",
        "ec2:RunInstances",
        "ec2:TerminateInstances",
        "ec2:StartInstances",
        "ec2:StopInstances",
        "ec2:RebootInstances",
        "ec2:ModifyInstanceAttribute",
        "ec2:DescribeInstances",
        "ec2:DescribeImages",
        "ec2:DescribeInstanceTypes",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeInstanceAttribute",
        "ec2:DescribeVpcAttribute",
        "ec2:DescribeInstanceTypeOfferings",
        "ec2:DescribeInstanceCreditSpecifications",
        "ec2:DescribeRegions",
        "ec2:DescribeAccountAttributes",
        "ec2:CreateTags",
        "ec2:DeleteTags",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:AttachVolume",
        "ec2:DetachVolume",
        "ec2:CreateVolume",
        "ec2:DeleteVolume",
        "ec2:ModifyVolume",
        "ec2:DescribeSnapshots",
        "ec2:CreateSnapshot",
        "ec2:DeleteSnapshot",
        "ec2:DescribeNetworkInterfaces",
        "ec2:CreateNetworkInterface",
        "ec2:DeleteNetworkInterface",
        "ec2:AttachNetworkInterface",
        "ec2:DetachNetworkInterface",
        "ec2:ModifyNetworkInterfaceAttribute",
        "ec2:DescribePlacementGroups",
        "ec2:CreatePlacementGroup",
        "ec2:DeletePlacementGroup",
        "ec2:DescribeSpotInstanceRequests",
        "ec2:RequestSpotInstances",
        "ec2:CancelSpotInstanceRequests",
        "ec2:DescribeSpotPriceHistory",
        "ec2:DescribeReservedInstances",
        "ec2:DescribeReservedInstancesOfferings"
      ],
      "Resource": "*"
    }
  ]
}
```

4. Click **Next**, give your policy a name (e.g., `stream-manager-terraform-policy`), add an optional description
5. Click **Create policy**

Alternatively, using AWS CLI:

1. Save the following policy as `terraform-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sts:GetCallerIdentity",
        "ec2:RunInstances",
        "ec2:TerminateInstances",
        "ec2:StartInstances",
        "ec2:StopInstances",
        "ec2:RebootInstances",
        "ec2:ModifyInstanceAttribute",
        "ec2:DescribeInstances",
        "ec2:DescribeImages",
        "ec2:DescribeInstanceTypes",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeSubnets",
        "ec2:DescribeVpcs",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeInstanceAttribute",
        "ec2:DescribeVpcAttribute",
        "ec2:DescribeInstanceTypeOfferings",
        "ec2:DescribeInstanceCreditSpecifications",
        "ec2:DescribeRegions",
        "ec2:DescribeAccountAttributes",
        "ec2:CreateTags",
        "ec2:DeleteTags",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:AttachVolume",
        "ec2:DetachVolume",
        "ec2:CreateVolume",
        "ec2:DeleteVolume",
        "ec2:ModifyVolume",
        "ec2:DescribeSnapshots",
        "ec2:CreateSnapshot",
        "ec2:DeleteSnapshot",
        "ec2:DescribeNetworkInterfaces",
        "ec2:CreateNetworkInterface",
        "ec2:DeleteNetworkInterface",
        "ec2:AttachNetworkInterface",
        "ec2:DetachNetworkInterface",
        "ec2:ModifyNetworkInterfaceAttribute",
        "ec2:DescribePlacementGroups",
        "ec2:CreatePlacementGroup",
        "ec2:DeletePlacementGroup",
        "ec2:DescribeSpotInstanceRequests",
        "ec2:RequestSpotInstances",
        "ec2:CancelSpotInstanceRequests",
        "ec2:DescribeSpotPriceHistory",
        "ec2:DescribeReservedInstances",
        "ec2:DescribeReservedInstancesOfferings"
      ],
      "Resource": "*"
    }
  ]
}
```

2. Create the IAM policy:

```bash
aws iam create-policy \
  --policy-name stream-manager-terraform-policy \
  --policy-document file://terraform-policy.json \
  --tags Key=Name,Value=stream-manager-terraform-policy
```

## Step 3: Attach Policy to Role

1. In the IAM Dashboard, click **Roles** and select the role you created (e.g., `stream-manager-terraform-role`)
2. Click **Add permissions** → **Attach policies**
3. In the search box, type your policy name (e.g., `stream-manager-terraform-policy`)
4. Select the policy and click **Add permissions**

Alternatively, using AWS CLI:

```bash
aws iam attach-role-policy \
  --role-name stream-manager-terraform-role \
  --policy-arn arn:aws:iam::<account-id>:policy/stream-manager-terraform-policy
```

Replace `<account-id>` with your AWS account ID.

## Step 4: Create IAM Instance Profile

The instance profile attaches the IAM role to EC2 instances.

1. In the IAM Dashboard, click **Roles** from the left-hand navigation
2. Click on your role (e.g., `stream-manager-terraform-role`)
3. Click the **Trust relationships** tab
4. Scroll down to find the **Instance profile** section
5. Click **Create instance profile**
6. Enter a profile name (e.g., `stream-manager-terraform-profile`) and optionally add tags
7. Click **Create instance profile**
8. The role should automatically be attached to the profile

Alternatively, using AWS CLI:

```bash
aws iam create-instance-profile \
  --instance-profile-name stream-manager-terraform-profile \
  --tags Key=Name,Value=stream-manager-terraform-profile

aws iam add-role-to-instance-profile \
  --instance-profile-name stream-manager-terraform-profile \
  --role-name stream-manager-terraform-role
```

## Step 5: Attach Instance Profile to EC2 Instance

### Attach Using AWS Console

1. Navigate to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
2. Click **Instances** from the left-hand navigation
3. Select your Stream Manager instance
4. Click **Actions** → **Security** → **Modify IAM role**
5. Select your instance profile (e.g., `stream-manager-terraform-profile`)
6. Click **Update IAM role**

### Attach Using AWS CLI

```bash
# Stop the instance first (if running)
aws ec2 stop-instances --instance-ids <instance-id>

# Wait for instance to stop, then modify instance attribute
aws ec2 modify-instance-attribute \
  --instance-id <instance-id> \
  --iam-instance-profile Name=stream-manager-terraform-profile

# Start the instance
aws ec2 start-instances --instance-ids <instance-id>
```

> **Note:** After creating the instance profile, it may take a few seconds to propagate. Wait a moment before attaching it to the instance.

## Verify IAM Role Setup

To verify the IAM role is working correctly, connect to your Stream Manager instance and run:

```bash
# Check if the instance has a role attached
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/

# Test AWS CLI access (should work without any credentials)
aws sts get-caller-identity
```

The `aws sts get-caller-identity` command should return the IAM role ARN, confirming that the instance profile is working correctly.
