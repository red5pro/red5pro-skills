---
title: Flash Media Live Encoder (FMLE)
description: ""
---

## (deprecated)

If you are running FMLE from a Mac you will have different options than if you run it from a PC. Specifically, Mac includes `AAC` as an Audio format, where Windows does not. Please note that FMLE does not detect the Mac Facetime camera, so you will need to use a USB camera to stream video with FMLE.

Our recommended FMLE settings are as follows:

### FMLE Video Settings

**Format:** H.264

* click on the wrench for *Advanced Encoder Settings* and choose **Profile:** Baseline, **Level:** 3.0, and **Keyframe Frequency:** 3 Seconds

**Frame Rate:** 15.00 fps

**Input Size:** 640x480

**Bit Rate:** 500 Kbps, **Output Size:** 640x480

![advanced encoder](/_images/protocols/rtmppublishers/advancedencodersettings.png)

### FMLE Audio Settings

**Format:** AAC (*NOTE: at this time, Mp3 is supported for WebRTC subscribers, but not by RTSP or HLS*)

**Channels:** Stereo

**Sample Rate:** 48,000 Hz (if you are using Mp3, then 44,100 Hz)

**Bit Rate:** 96 Kbps

### FMLE Streaming Settings

Place a checkmark in the box next to *Stream to Flash Media Server*

**FMS URL:** rtmp://your-server-ip:1935/live

**Stream:** your-stream-name

![fmle settings](/_images/protocols/rtmppublishers/fmlesetup1.png)

### Publishing with FMLE

Click on **Start** to begin streaming.

---

# RTMP Encoder Broadcasting with Red5 Pro Autoscaling

If you are using Red5 Pro [Stream Manager and Autoscaling](/docs/red5-pro/development/api/archive/autoscale-client-api/) and want to broadcast with an RTMP encoder, you need to make the [Read Stream - Broadcast](/docs/autoscale/rest-api-v-400/smapi-streams/#read-stream) API call to get the IP address of the most available origin server to set as your RTMP server target.

> **It is important to make this call before each broadcast, because autoscaling clusters are <u>not</u> static, and the best origin server IP address may change.**