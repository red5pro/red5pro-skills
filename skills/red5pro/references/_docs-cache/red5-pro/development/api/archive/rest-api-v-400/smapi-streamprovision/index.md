---
title: Stream Provisioning
description: ""
menu_order: 8
--- 

  
<!-- FIXME* [Parameters Index](#parameters-index) -->
<!--FIXME * [Overriding Properties](#overriding-properties)  -->
Please note the following:

- *authentication*: specifies the username and password that have been configured for the video stream if required (for round-trip authentication, for example)
- *georules*: based on the restricted boolean value, this specifies which regions should be allowed or restricted to subscribe to a video stream. Note that restricting by region requires some additional programming to determine what region your clients are trying to connect from, so it is recommended that you set the `restricted` value to `false` for base installations.
- *qos*: is an integer that indicates the quality of service that needs to be provided (currently 3 is the only valid level).

Note: See [this document](/docs/red5-pro/users-guide/transcoder/red5-pro-webrtc-abr-settings/#AdditionalParameters/) for some additional parameters that can be sent with a stream provision.

## Contents

- [Create Stream Provision](create-stream-provision.md)
- [List Stream Provisions](list-stream-provisions.md)
- [Read Stream Provision](read-stream-provision.md)
- [Read Stream Provision Fragment](read-stream-provision-fragment.md)
- [Update Stream Provision](update-stream-provision.md)
- [Delete Stream Provision](delete-stream-provision.md)
