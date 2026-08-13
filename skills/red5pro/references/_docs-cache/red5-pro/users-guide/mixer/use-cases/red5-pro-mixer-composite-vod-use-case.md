---
title: Composite Video On Demand (VOD) Recordings
description: ""
menu_order: 5
---

This use case employs the **Brew Mixer** to composite multiple live streams into a single output stream for use as VOD. If a Mixer is already in the pipeline (as in previous use cases), Red5 Pro can be configured to automatically record all live streams, including the composite output. If the pipeline does not yet include a Mixer, one is added to generate the composite stream for recording. Once the composite stream is published to the Cluster, a Red5 Pro server will automatically record it locally and/or upload it to configured cloud storage.

The Mixer publishes the composite stream to a Red5 Pro Origin node. If recording is enabled, the Origin will capture and store the stream, making it available for VOD.

> **Note:** The stream from the Mixer to the Origin uses RTMP. To enable recording, update the `red5pro/conf/red5.properties` file by setting `broadcaststream.auto.record=true` for your Origin node image.

