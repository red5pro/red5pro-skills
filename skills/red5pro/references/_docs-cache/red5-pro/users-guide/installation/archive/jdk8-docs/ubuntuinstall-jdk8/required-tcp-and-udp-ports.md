_From: Linux Install - JDK 8_

## Required TCP and UDP Ports

The following __Inbound__ ports need to be open on your server/firewall for Red5 Pro features to work:

| Port | Description |
|---|---|
| 22 | SSH | TCP |
| 5080 | default web access of Red5 Pro/Websockets for WebRTC | TCP |
| 443 | modified https access of Red5 Pro; secure websockets for WebRTC | TCP |
| 1935 | default Red5 Pro RTMP port | TCP |
| 8554 | default RTSP port | TCP |
| 6262 | websockets for HLS  | TCP |
| *8081* | *websockets for WebRTC (severs earlier than 5.4.0)* | TCP |
| *8083* | *secure websockets for WebRTC (severs earlier than 5.4.0)* | TCP |
| 40000-65535 | TURN/STUN/ICE port range for WebRTC | UDP |

`*` **If you are running a version of Red5 Pro earlier than 5.4.0, then you must add the websocket ports (8081/8083).**

`*` **As of release 5.4.0, `websockets` automatically use the same ports as http/https as defined in `red5.properties`.**

---
