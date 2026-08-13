---
title: Webrtc-Plugin Properties File
description: ""
menu_order: 2
---

For most use cases, you can just "set it and forget it" with Red5 Pro WebRTC, but you may want to modify some default behaviors by editing the properties file. Follows are some of the most common settings you may want to modify.

> Note: unless otherwise specified, all time values are set in MILLISECONDS.

# Datachannel options

* **datachannel.enabled** - default = `true`; datachannel on/off switch.
* **datachannel.thread.priority** - default = `3`; thread priority for the datachannels internal processor; range is 1-10 with 5 being "normal".
* **datachannel.max.message.size** - default=`262144`; maximum message size for datachannel.
* **datachannel.max.message.gap** default =`16`; maximum gap (chunk loss) allowed before sending a forward-TSN (Transmission Sequence Number) message to reset TSN's.
* **datachannel.nonblocking** default = `true`; whether or not to use a non-blocking datachannel.
* **datachannel.inputqueue.delay** default = `10`; delay between checking the queue for incoming data to process.
* **datachannel.resend.delay.t3** default = `true`; whether or not to use T3 for resend delay or 10ms


# WebRTC Video and Audio Codec Support

Red5 Pro is configured to use H264 for video and Opus audio by default for WebRTC, but you can modify the following lines to change those:

* `rtc.audio.codecs=OPUS` - Can modify this to test other audio codecs
* `rtc.video.codecs=H264_PMODE1` - you can include VP8 (`rtc.video.codecs=H264_PMODE1,VP8`) to offer both options. You can also set this to VP8 only if you prefer (`rtc.video.codecs=VP8`). **Keep in mind that VP8 uses more CPU than H264, and if you include both then the server will also be transcoding, which will use even more CPU**

>Note that these settings only impact WebRTC, not RTMP or RTSP

# WebRTC Stream Regulating

* `aggressive.connection.cleanup=true` - You can configure the level of action to perform when the WebSocket is destroyed. To close and clean up the connection and streams when a ws is destroyed, set to true (default and **recommended**). To allow idle checks to clean up the connection, set to false (**NOTE:** setting this value to false may result in "zombie" streams).
* `forced.keyframe.interval=3000` -  desired publisher rtc key frame interval, (3000 milliseconds = 3 seconds).
* `keepalive.interval=15000` Keep-alive task interval (used to check all RTC connections for idle-ness). 500 is the minimum interval accepted. '0' disables rtc keep alive pings. Default 15,000 = 15 seconds.
* `idle.check.enabled=true` - Idle checking for transport layer
* `allow.idle.muted=true` - Determination if a connection will be kicked on idle while it's muted. When true (default), idle is allowed when the stream is muted. When false, an idle connection is closed whether or not it's muted

# NACK

As defined in the [WebRTC Glossary](https://webrtcglossary.com/nack/): *NACK stands for Negative Acknowledgement. It is one of the error resiliency mechanisms in WebRTC. <br/>
NACK is a way for the receiving end to indicate it hasn’t received a specific packet. A NACK message is sent over RTCP to the sender of the media, which in turn needs to decide if it will retransmit the lost packet based on its availability in its cache and its estimate to the usefulness of the retransmission (will it be possible to use it once received).*

In the `{red5pro}/conf/webrtc-plugin.properties` file, publisher and subscriber NACKs are enabled by default:

```config
# enable nack support for subscribers
subscriber.nacks=true

# enable nack support for publisher
publisher.nacks=true
```

**NOTE:** With a very lossy publisher, NACKing can introduce a lot of packet dropping, which is especially problematic if you are broadcasting to a transcoder node for ABR. If you anticipate your broadcast source to be from a sub-optimal network, then you may want to disable publisher nacks.

# WebRTC ABR Settings

Used in conjunction with Red5 Pro transcoding, these settings can be modified to accommodate greater or lesser steps between [stream provision levels](/docs/red5-pro/users-guide/transcoder/red5-pro-transcoding-and-abr-provision-suggestions/)

* `abr.enabled=true` - Webrtc Adaptable Bitrate (ABR) configuration for controlling subscriber upgrade. Enabled by default. If you want to transcode multiple variants without ABR then you can set this to `false`.
* `mbr.test.delay=8000` - checks are performed every keyframe or 8 seconds; this value can be modified as desired.

In addition, the upgrade and downgrade thresholds are exposed in `red5pro/conf/webrtc-plugin.properties`. The 3 configs to look for are:

* `abr.bitrateThresholdUpgrade`
* `abr.bitrateThresholdUpgradeTrial`
* `abr.bitrateThresholdDowngrade`

See [this section](/docs/red5-pro/users-guide/transcoder/) for more details.

# IPv6 Support

If you wish to include support for WebRTC over IPv6, you must modify the `ice.enable.ipv6=` value from the default `false` to `true`.

# Other Configuration File Settings

There are other settings that are only recommended to be modified for very specific troubleshooting as directed by Red5 Pro support. If you have questions on any of the additional settings in the `webrtc-plugin.properties` file, please contact [Red5 Pro Support](https://customer.support.red5.net/servicedesk/customer/portals)


# Settings moved to network.properties File

With the 10.3 server release, the following configurations have been moved from `red5pro/conf/webrtc-plugin.properties` file to `red5pro/conf/network.properties`:

## Forcing Public or Private IP Address

For WebRTC and other protocols, you may need to manually set your public and/or private IP for Red5 Pro usage. This may need to be done for testing on a local instance, or on a machine with multiple NICs.

## Port range for UDP and TCP

```properties
port.min=49152
port.max=65535
```

Red5 Pro needs a dedicated port for each WebRTC connection (publisher or subscriber). The port range that the server uses is defined in this section. You can set this to a smaller range if you want to minimize open ports on your firewall.

## ice4j Settings

Server-side configuration of `ice.default.transport` and `stun.address`

