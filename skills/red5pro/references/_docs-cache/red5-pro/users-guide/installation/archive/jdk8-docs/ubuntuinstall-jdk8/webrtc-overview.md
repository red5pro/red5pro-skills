_From: Linux Install - JDK 8_

## WebRTC Overview

WebRTC runs on the standard HTTPS port (443). **To publish via WebRTC on a Red5 Pro server you need to have a valid SSL Certificate for a registered URL**.

If you are running the server, without an SSL cert, on your local machine or on a server:

1. You will be able to publish/subscribe locally (between browsers).
2. You will be able to subscribe to a stream that is being published from localhost (e.g.: `http://localhost:5080/live/broadcast.jsp`) from a device within the same network (pointing to the IP address of your machine, not to localhost). To subscribe from a mobile device, either via a browser on Android or via SDK client on iOS or Android, the device must be on the same Wifi network as the desktop.
3. You will **not** be able to publish via a WebRTC client that is not local to the machine.
