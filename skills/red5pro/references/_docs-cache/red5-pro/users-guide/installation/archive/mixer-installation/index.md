---
title: StreamManager - Mixer Requirements
description: ""
menu_order: 15
---

# Red5 Pro Mixer Solution Requirements

The current mixer implementation uses CEF to push a targeted HTTP/S page to an origin or transcoder node. The solution requires a management system for creating a webpage that contains your live streams. For testing only, we have built a [node.js mock back end](https://github.com/red5pro/nodejs-mixer-backend) that can be used with the [grid manager example](https://github.com/red5pro/streaming-html5/tree/master/src/page/sm-mixer/gridMixerCompositionStreamManagerProxy).

## Testing with the Mock Back End

If you want to use mixer nodes in your autoscale cluster, that will involve a few additional steps beyond the standard autoscale setup. The CEF (Chrome Extension Framework) mixer requires the following additional components:

1. A mixer server back-end (a [node.js mock back end](https://github.com/red5pro/nodejs-mixer-backend) has been provided for testing)
2. Special configuration of the Non-mixer node images
3. A custom mixer node image with `mixer` webapp and CEF libraries

The Red5 Pro mixer testbed examples use the `live` webapp on the non-mixer nodes, which is used for publishing all live streams (including composite ones), and a Node.js server that helps with the management of compositions. The `live` webapp has been extended to call a configurable webhook endpoint every time a stream is published or unpublished. The webhook endpoint targets the backend webhook server to manage an active streams list. This streams list is provided to a grid moderator through a WebSocket connection between the Node.js server and the mixer testbeds used by the moderator. In this way, the moderator can see which streams are live and add any of those to a composition.

*The basic flow of communication in an autoscale cluster which includes the mixer node type:*

![mixer](/_images/installation/mixer/mixer-with-nodes.png)