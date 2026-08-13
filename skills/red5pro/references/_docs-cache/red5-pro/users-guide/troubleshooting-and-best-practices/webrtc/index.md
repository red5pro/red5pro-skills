---
title: WebRTC Troubleshooting
description: ""
menu_order: 7
---

## Test Supported Resolutions for your WebCam

Here's a **very** handly link to test what resolutions your webcam supports: [webrtchacks.github.io/WebRTC-Camera-Resolution/](https://webrtchacks.github.io/WebRTC-Camera-Resolution/)

## WebRTC Internals - browser diagnostics

* Chrome, go to `chrome://webrtc-internals/`
* Firefox, go to `about:webrtc`
* Edge, go to `edge://webrtc-internals/`
* Safari, if available in menu bar, go to Develop -> Show Javascript Console

This will show you more details on your WebRTC connection and can help to troubleshoot any issues.

## STUN/TURN/ICE

[Here's a pretty good explanation of STUN, TURN and ICE](https://community.cisco.com/t5/collaboration-knowledge-base/demystifying-nat-traversal-with-stun-turn-and-ice/ta-p/4766853).

## Multiple NICs or Non-standard NAT

Some hosting facilities' virtual servers may not be able to transmit their public/private IP addresses to Red5 Pro server. This information is necessary for the [ICE negotiation in WebRTC](https://community.cisco.com/t5/collaboration-knowledge-base/demystifying-nat-traversal-with-stun-turn-and-ice/ta-p/4766853). In some cases you may need to give the Red5 Pro server a little help by "forcing" these IP assignments. To do so, modify the `{red5pro}/conf/webrtc-plugin.properties` file. Uncomment the following lines and modify them with your server's public and private IP addresses.

Modify `red5pro/conf/webrtc-plugin.properties`, replacing `yourpublic.ip.address.here` and `local.private.ip.address.here` with the server's public and private IP addresses, respectively.

```aconf
 # Forcing a public IP address
 #force.public.ip=yourpublic.ip.address.here

 # Forcing a private IP address
 #force.local.ip=local.private.ip.address.here
```

If you are still having ICE failures, you may also need to enable port availability checking by uncommenting:

```xml
# Configure port availability checking
```

## Publishing without an SSL Certificate

Safari browser develop, WebRTC options include `Allow Media Capture on Insecure Sites` which will enable publish/subscribe testing without SSL.

![safari-allow](/_images/troubleshooting/webrtc/safariallowinsecure.png)
