---
title: ABR - Subscribing ABR Requirements
description: ""
menu_order: 45
---

## Integrating with a Red5 Cloud Deployment

- [Red5 Cloud](https://cloud.red5.net)
- [Red5 Pro WebRTC SDK](https://github.com/red5pro/red5pro-webrtc-sdk)
- A [stream provision](#stream-provisioning) submitted via the Red5 Pro Stream Manager API

## Usage a Red5 Pro Server + Autoscaling

- [Red5 Pro Server](https://account.red5.net/download)
- [Red5 Pro WebRTC SDK](https://github.com/red5pro/red5pro-webrtc-sdk)
- A Red5 Pro Autoscale environment
- A [stream provision](#stream-provisioning) submitted via the Red5 Pro Stream Manager API

## Stream Provisioning

In order to establish an Adaptive Bitrate publishing session, you will first need to provide a [Provision](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-provision-api/) of stream variants to the Stream Manager.
