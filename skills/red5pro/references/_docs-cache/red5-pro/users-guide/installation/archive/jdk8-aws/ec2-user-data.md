---
title: EC2 `User Data` property support
description: EC2 `User Data` property support via launch configuration
menu_order: 17
---



### About `User Data` property

The `User Data` is a special property in your AWS EC2 console which allows you to specify shell level instructions to you EC2 instance. These instructiosn are automatically executed when the instance starts up.This can be used to configure your Red5 Pro node on the fly when it is being initialized on the cloud platform.

**Sample Use Cases :**

* Use a shell script to update the cloudwatch url property in the `autoscale.xml` during a instance launch.
* Use shell script to configure the `api` web app `accessToken` dynamically as the instance is being started.
* Auto-mounting the EFS when the instance initializes.

While these are just samples of use cases, you can have your shell script do almost any kind of changes on the instance.

> For manual configuration the `User Data`  property is present in your EC2 console during the `Configure Instance Details` step of launching a new instance.

### Providing 'User Data' via launch configuration

Since its the Stream Manager which is responsible for launching Red5 Pro instances on the AWS platform,  we need to configure Stream Manager to make use fo the `User Data`.

The way this is done is by using the launch configuration schema. In the launch configuration we add a special property called `UserData` (without any space in between) with appropriate `value`for it.

**We can provide the value in two distinct ways:**

* Provide the absolute path of a file which contains your script. When the data is long or easier to manage in files you should prefer to use this method.  The property value will start with `file:` to indicate that a path of a file is to be expected. Ex: `file:/path/to/shellscript.sh`.

**Example:**

```json

{
  "launchconfig": {
    "name": "default-v2",
    "description": "This is a sample launch configuration for demonstrating the aws user data property",
    "image": "{red5pro-ami}",
    "version": "0.0.2",

  "targets": {
      "target": [
    {
      "role": "origin",
      "instanceType": "t2.micro",
      "connectionCapacity": "2000"
    },
    {
      "role": "edge",
      "instanceType": "t2.micro",
      "connectionCapacity": "2000"
    }
     ]
    },

    "properties": {
      "property": [
        {
          "name": "UserData",
          "value": "file:/path/to/shellscript.sh"
        }
      ]
    },
    "metadata": {
      "meta": [
        {
          "key": "meta-name",
          "value": "meta-value"
        }
      ]
    }
  }
}

```

* Provide the base-64 encoded version of the script in the launch configuration directly. If the script is small you can just embed it in the launch configuration schema directly using a base64 encoded version of it.

**Example:**

```json

{
  "launchconfig": {
    "name": "default-v2",
    "description": "This is a sample version launch configuration for development",
    "image": "{red5pro-ami}",
  "version": "0.0.2",

  "targets": {
      "target": [
    {
      "role": "origin",
      "instanceType": "t2.micro",
      "connectionCapacity": "2000"
    },
    {
      "role": "edge",
      "instanceType": "t2.micro",
      "connectionCapacity": "2000"
    }
     ]
    },

    "properties": {
      "property": [
        {
          "name": "UserData",
          "value": "base64:I2Nsb3VkLWNvbmZpZw0KcmVwb191cGRhdGU6IHRydWUNCnJlcG9fdXBncmFkZTogYWxsDQoNCnBhY2thZ2VzOg0KLSBhbWF6b24tZWZzLXV0aWxzDQoNCnJ1bmNtZDoNCi0gZmlsZV9zeXN0ZW1fZG5zPWZzLWRlNThmYTg2LmVmcy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbQ0KLSBlZnNfZGlyZWN0b3J5PS91c3IvbG9jYWwvcmVkNXByby93ZWJhcHBzL2xpdmUvc3RyZWFtcw0KDQotIG1rZGlyIC1wICRlZnNfZGlyZWN0b3J5DQotIHN1ZG8gbW91bnQgLXQgbmZzIC1vIG5mc3ZlcnM9NC4xLHJzaXplPTEwNDg1NzYsd3NpemU9MTA0ODU3NixoYXJkLHRpbWVvPTYwMCxyZXRyYW5zPTIgJGZpbGVfc3lzdGVtX2RuczovICRlZnNfZGlyZWN0b3J5"
        }
      ]
    },
    "metadata": {
      "meta": [
        {
          "key": "meta-name",
          "value": "meta-value"
        }
      ]
    }
  }
}

```

AWS `User Data` property can be used to integrate amazon EFS with autoscaling by mounting the EFS on your EC2 instances. To know more about EFS integration check out the [Autoscaling EFS Integration Documentation](/docs/red5-pro/users-guide/installation/archive/auto-aws/autoscaleawsefssupport/)

**You can use free online services to encode base64 strings.**

* [https://codebeautify.org/base64-encode](https://codebeautify.org/base64-encode)
* [https://www.base64encode.org](https://www.base64encode.org/)
