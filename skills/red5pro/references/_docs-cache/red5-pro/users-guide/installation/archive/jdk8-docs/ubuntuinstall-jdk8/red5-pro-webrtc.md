_From: Linux Install - JDK 8_

## Red5 Pro WebRTC

Red5 Pro Server Release 2.0.0 (WebRTC Beta2) includes WebRTC support and front-end integration of the Red5 Pro HTML5 SDK.

> [WebRTC](https://webrtc.org/) (Web Real-Time Communication) is supported by the **Chrome**, **Firefox** and **Opera** browsers on desktop. In addition, the Chrome browser on Android supports WebRTC. *Safari* and *Internet Explorer* do **not** support WebRTC (but reportedly, *Microsoft Edge* does).

Broadcasting/subscribing of WebRTC to WebRTC, WebRTC to HLS, WebRTC to Flash, and Flash to WebRTC are all supported.

Subscribing to a WebRTC publisher using the Red5 Pro Android or iOS SDK client is supported. In addition, subscribing with WebRTC to a stream published with Red5 Pro Android or iOS SDK client is supported.

> WebRTC Broadcaster/Subscriber combinations supported, in a nutshell:
>
> * WebRTC `<==>` WebRTC
> * WebRTC `<==>` Flash
> * WebRTC `<==>` Red5 Pro iOS SDK
> * WebRTC `<==>` Red5 Pro Android SDK
> * WebRTC  ==> HLS
