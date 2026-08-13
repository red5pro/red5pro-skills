---
title: Restreamer Modes
description: ""
menu_order: 2
---

There are three modes that streaming servers use to ingest incoming connections: **push**, **pull**, and **listen**. 

**Push** mode publishes a local stream's data to some remote server. 

**Pull** mode subscribes to a remote stream and rebroadcasts its data as a local stream. 

**Listen** mode creates and open socket and waits for a connection (for a period of time; see API docs for a specific restreamer for further details). 

## Push Mode

Using **Push** mode, Red5 Pro acts as a publisher, connecting to a remote server and sending (restreaming) packets from a local live stream. This includes RTMP Push, WHIP Push, and Zixi Push.

![push](/_images/special/restream/restreamer-modes-push.png)

---

## Caller Mode / Pull

Using **Pull** mode, Red5 Pro acts as a subscriber, connecting to a remote server and subscribing to a stream (or reading a local video file), then mirroring that stream's packets as a new local live stream (restreaming). This includes IP Cam, File Restreamer, RTMP Pull, and Zixi Pull.

![pull](/_images/special/restream/restreamer-modes-pull.png)

---

## Listen Mode 

Using **Listen** mode, Red5 Pro opens a server socket and waits for a client to connect and provide stream data. This includes MPEG-TS and SRT. 

That is, you set up the restreamer provision via the API call which causes the Red5 Pro server to open a listening socket for a limited time, and then publish the SRT or MPEG-TS stream to the Red5 Pro server via the port designated in your parameters. The stream is pushed to the Red5Pro server which is then restreamed as a live stream.

![listen](/_images/special/restream/restreamer-modes-listen.png)
