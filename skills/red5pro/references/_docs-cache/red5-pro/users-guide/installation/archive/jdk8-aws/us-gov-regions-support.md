---
title: US Gov Regions Support
description: ""
menu_order: 18
---



Us Govt Regions are special regions that are isolated from other regions and made available to Us residents/citizens only. This region cannot be accessed from the standard AWS console page. These regions have their own console. At the time of writing this section the only region available is `us-gov-west-1` which can be accessed from `https://console.amazonaws-us-gov.com/`.

The important thing to know is that you **cannot** use your standard aws credentials with the gov regions (not even if they are root credentials). Thus the usage of the gov regions and the standard regions via the `aws-cloud-controller` is mutually exclusive and you cannot support gov region(s) as well as standard region(s) at the same time using the same streammanager setup.

The controller by default supports standard regions for operations.To configure the controller for us gove region(s), set the controller property `aws.forUsGovRegions` to `true` in the streammanager `red5-web.properties` file. When you configure the controller for `Us Gov` regions, make sure to use the correct credentials (`accessKey` and `accessSecret`).

References:

* [https://docs.aws.amazon.com/govcloud-us/latest/UserGuide/govcloud-console.html](https://docs.aws.amazon.com/govcloud-us/latest/UserGuide/govcloud-console.html)
* [https://docs.aws.amazon.com/pdfs/govcloud-us/latest/UserGuide/govcloud-us.pdf](https://docs.aws.amazon.com/pdfs/govcloud-us/latest/UserGuide/govcloud-us.pdf)
