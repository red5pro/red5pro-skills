---
title: Red5 Core SDK
description: ""
menu_order: 10
---

The Red5 Pro Core SDK was developed to support native applications on Linux, Windows, and macOS clients. The SDK provides an API to access the Red5 Pro Server and simplify the creation of media applications in a unified way on any platform. The SDK has a modular structure and can be integrated depending on development needs. The modules provide a C++ API that can be used with most platforms.

* **r5core** - The main module that handles Server connection control and media processing. It provides an API to implement and control audio/video sources/renderers, interact with the Red5 Pro Stream Manager, and set up and control connections. The main part of **r5core** is the Client object that is accessible through the **IClient** interface. This object can control one server connection and allows for the setup of subscriber or publisher dataflow for video, audio, and metadata. In addition, the Client object checks for a valid SDK license.

> Currently, the Client object supports RTSP and WebRTC connections.

* **r5common** - A set of objects and methods that are shared between modules. It includes the **Ilogger** interface and default Logger implementations, media descriptions and structures, codec descriptions, and utilities like a circular buffer and text drawing tools.

* **r5device** - This provides the API to enumerate and access the Camera, Microphone, and Speakers. Also, it contains an implementation of device objects for different platforms. Devices are implemented with the corresponding source or renderer interfaces and can be used with **IClient** to set up connections.

* **r5ffmpeg** - This provides an implementation of an FFmpeg universal encoder and decoder that can process all supported formats. This module was mostly created to separate link dependency to FFmpeg from the r5core library.

* **r5net** - The service library that provides a unified API for HTTP and WebSocket connections.

* **r5webrtc** - This contains the API and implementations of objects for WebRTC signaling and full WebRTC connection for publisher and subscriber. The module can be used to complete signaling for external webrtc implementations, like LibWebRTC, or it can be used to publish and subscribe streams from the Red5 Pro Server.

* **r5core** - This links most required modules, but each module can be used separately. Note that all modules also require `r5common` to define internal structures and interfaces.

