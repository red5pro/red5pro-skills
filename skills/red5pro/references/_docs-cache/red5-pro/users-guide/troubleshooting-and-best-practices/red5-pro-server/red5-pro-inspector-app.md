---
title: Inspector Webapp
description: ""
menu_order: 1
---

Included with the Red5 Pro Server release is a webapp named `inspector`. You can access the **Red5 Pro Inspector** from your Red5 Pro Server installation at `/inspector`.

![inspector](/_images/troubleshooting/inspector-webapp/red5pro_inspector.png)

---

## ABOUT

The inspector evaluates the latency of a publisher.

The server measures how early or late the media packets are. Ideally Video Time and Audio Time would be flat lines at zero, with a drift of zero.

It also graphs the packet size. Placing the packet size and the clock latency on the same display reduces usefulness.

> Clicking the color legends at the top will toggle their display in the graph.

### VIDEO TIME AND AUDIO TIME

* Value = (Session Age) - (Packet Timestamp)
* Positive numbers indicate latency.
* Negative numbers indicate early arrival.

### PACKET BYTE SIZE

* Value = Total Byte Count of a Media Packet
  * Not including UDP/TCP chunking and formatting for subscribers.
  * This is strictly an AMF media packet size.
  * All subscriber types and FLV recordings will have additional container bytes added for transmission.
* Positive numbers indicate latency.
* Negative numbers indicate early arrival.
* Move the slider to scale down the byte size graph by division. Sliding full to the left graphs raw sizes.

### OVERALL AUDIO DRIFT

* The latency of the first Audio Time is stored until Clear Data is pressed.
* This value is used to determine how far current Audio Time measurements have changed after several minutes or hours.
* All other data points are released as the inspector polls the server.

### A - V

* Value = (Last Audio Timestamp) - (Last Video Timestamp)

### RAW DATA

The inspector gets a list of JSON objects from the server at regular intervals. The graph is made up of just a few useful models.

The complete list of JSON values per packet is:

* `time`: Java UTC this packet was seen on the server.
* `type`: Audio or Video
* `amv`: Audio minus Video
* `lastAudio`: Last Audio timestamp processed.
* `timestamp`: Current timestamp from publish start (in milliseconds) set by the client.
* `age`: Publish session age in milliseconds.
* `delta`: Latency measurement.
* `size`: AMF packet size; structure defined by Adobe video file format.

> The polling cache at the server only holds 149 packets. Video frame rates from 10 to 60 may see a shorter but more dense graph as they get higher.

---

## USAGE

1. Edit the Path/Name value to the stream you want to inspect.
  * This must include the app name and stream name separated with a slash.
2. Click Clear Data.

### NOTES

* Click Clear Data if the stream is republished, or any time you want a reset.
* The Graph may have gaps if the browser page loses focus due to reduced polling.
* If you wish to remove the webapp, you must also delete the `{red5pro}/plugins/inspector.jar` file