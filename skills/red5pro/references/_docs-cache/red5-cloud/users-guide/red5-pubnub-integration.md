---
title: Red5 Cloud + PubNub Integration
menu_order: 7
---

## Overview

The collaboration between **Red5** and **PubNub** delivers a fully composable real-time technology stack. This partnership combines Red5's ultra-low latency (sub-250ms) video streaming via the Experience Delivery Network (XDN) with PubNub's global real-time application infrastructure for messaging, chat, presence, reactions, synchronized state, AI interactions, and immersive interactive experiences (sub-100ms).

This integration allows developers to build immersive applications where live video and real-time interaction (chat, reactions, metadata) are perfectly synchronized, scalable, and easy to implement. Learn how the solution works and how it compares with Agora, Stream, and Amazon IVS in [this study](https://www.red5.net/case-studies/red5-cloud-integrates-pubnub-to-deliver-interactivity-intelligence-and-global-scalability-for-real-time-streaming-experiences/#how-the-solution-works). See how different [use cases can benefit](https://www.red5.net/blog/red5-cloud-integrates-pubnub-to-deliver-interactivity-intelligence-global-scalability-for-real-time-streaming/#who-will-benefit-from-this-joint-solution) from it.

### Key Benefits

- **Unified Developer Experience:** Access both video and chat credentials directly from the Red5 Cloud dashboard.
- **Synchronized Interactivity:** Video and data streams operate in parallel, enabling features like "frame-accurate" chat and overlays.
- **Cross-Platform Support:** Seamless integration across HTML5, iOS, and Android WebRTC SDKs.
- **Faster Development With Pre-Built Modules:** Start with production-ready Red5 modules for multi-camera views, synchronized metadata, watch parties, and more, then enrich them with PubNub-powered chat, presence, notifications, real-time triggers, and decision intelligence.
- **Global Scale Without Operational Overhead:** Red5 Cloud manages video routing, transcoding, protocols, autoscaling, and infrastructure, while PubNub handles global data routing, message fan-out, presence, and serverless functions.
- **Built-In Real-Time Optimization:** Use PubNub Illuminate to analyze live engagement data and apply no-code rules that trigger personalization, moderation, UI changes, overlays, and other adaptive video experiences in real time.
- **Compliance, Safety, and Security:** Maintain greater control over data residency, access permissions, encryption, moderation, and auditability to support regional privacy requirements and safer interactive experiences.

## Getting Started

### Access Your Account and Choose How to Build

1. [Create a Red5 Cloud account](https://cloud.red5.net/signup) or [log in](https://cloud.red5.net/login) to your existing account. When you create an account, Red5 Cloud automatically provisions the PubNub API keys required for the integration. You do not need to create a separate PubNub account.

2. Choose your implementation path:

- Build PubNub capabilities into your own application. Go to [Plans & Billing](https://cloud.red5.net/account/subscriptions) and start a one-month Red5 SDK trial or purchase an SDK subscription. Choose the HTML5, iOS, or Android SDK based on your application.

- Deploy a ready-to-use application. Go to [TrueTime Apps](https://cloud.red5.net/truetime-apps), select TrueTime Meetings™, click Deploy, customize your application, and click Go. For additional customization, [download the source code](https://github.com/red5pro/red5-truetime-meetings) and adapt the application to your requirements

### Retrieving Your Keys

<div>
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/JatKzjQCJmE"
    title="How to use Red5cloud with PubNub"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>

To access your specific PubNub keysets for integration:

1. Log in to your **Red5 Cloud Console**.
2. Navigate to the **[Dev Resources](https://cloud.red5.net/resources)** page in the main dashboard.
3. Locate the **PubNub Chat Integration** section.
4. Copy your unique **Publish Key** and **Subscribe Key**.

> **Note:** These keys are pre-configured to work with the sample code and SDK integrations provided by Red5.

## SDK Integration Guide

Red5's SDKs (HTML5, iOS, and Android) are designed to work harmoniously with PubNub. While Red5 handles the heavy lifting of audio/video packets via WebRTC/RTMP, PubNub manages the signaling, chat messages, and user presence.

### HTML5 SDK Integration

The HTML5 SDK integration involves initializing the Red5 `WHIPClient` (or `RTCSubscriber`) for video alongside the PubNub JavaScript SDK for chat.

### iOS WebRTC SDK Integration

For iOS development (Swift/Obj-C), the integration follows a similar pattern using the Red5 Pro iOS SDK and the PubNub Swift SDK.

- **Video:** The `R5Configuration` object configures the stream connection.
- **Chat:** The `PubNub` client is instantiated using the keys from the Red5 resources page.
- **Sync:** It is best practice to use the `streamName` as the PubNub channel name to ensure users watching a specific stream are automatically in the correct chat room.

```swift
Red5WebrtcClientBuilder()
    .setPubnubPublishKey(config.pubnubPublishKey ?? "")
    .setPubnubSubscribeKey(config.pubnubSubscribeKey ?? "")
    .setLicenseKey(config.licenseKey ?? "")
    .setEventListener(ChatEventListener(chatView: self))
    .build()
```

### Android WebRTC SDK Integration

The Android integration utilizes the Red5 Pro Android SDK for the video surface and the PubNub Java/Kotlin SDK for messaging.

- **Setup:** Add both dependencies to your `build.gradle`.
- **Workflow:**
  1. Start the Red5 `R5Stream` to publish or subscribe to video.
  2. In the same Activity, initialize the `PubNub` instance.
  3. Use PubNub `Messages` to trigger UI updates overlaid on the Red5 `SurfaceView`.

```java
IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    // A unique chat user id.
    // If auth is enabled for chat, you must send this userId to your application backend for token generation.
    .setChatUserId(USER_ID)
    // If chat authentication is enabled, set the token received from your backend server.
    // Use Red5 backend SDKs to generate chat tokens: https://github.com/red5pro/red5-bcs-node
    // Chat tokens can also be updated after the client is initialized.
    // .setChatToken("")
    .setPubnubPublishKey(YOUR_PUBNUB_PUBLISH_KEY)
    .setPubnubSubscribeKey(YOUR_PUBNUB_SUBSCRIBE_KEY)
    .setEventListener(this)
    .build();
```

## TrueTime Meetings™ App

**TrueTime Meetings™** is Red5's flagship application demonstrating the power of this collaboration. It is a ready-to-deploy conferencing solution that features **built-in PubNub integration**.

### How it Works

Unlike raw SDK implementations where you write the glue code, TrueTime Meetings™ comes pre-wired:

- **Zero-Config Chat:** The app automatically uses the PubNub keys associated with your Red5 Cloud account.
- **Features:**
  - **Live Chat:** Real-time text messaging alongside the video grid.
  - **Presence:** Automatically detects who is "online" in the meeting room.
  - **Signaling:** Uses PubNub to handle meeting logic, such as "raise hand" features or muting participants.

Users simply launch a TrueTime Meeting instance from their Red5 Cloud dashboard, and the chat functionality is immediately active and scalable, backed by PubNub's global network.
