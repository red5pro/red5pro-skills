---
title: Open Broadcaster Software (OBS)
description: ""
menu_order: 2
---

There are a few different versions of [OBS Studio](https://obsproject.com/). For simplicity, the following covers the MacOS version.

Please note that the following are some basic examples. OBS has a lot of different tuning options, and depending on your use case, you may need to adjust some or all variables. The only absolute requirements are to use x264 and **baseline** profile for your stream.

## Latency with OBS

For the lowest latency, we recommend (on the Output tab):

* Rate Controler: VBR
* Un-check "Use Custom Buffer Size"
* Tune: `zerolatency`.

> Buffer time of half the bitrate is generally recommended by OBS for higher definition streams to reduce the stress on your source device and network, but it does add some latency. So depending on your source machine's CPU/memory and your network bandwidth, you may want to set a higher or lower buffer.

## CBR versus VBR

In our testing (with OBS version 27), for most use cases we have found that VBR (variable bitrate) streaming from OBS has more stable results than CBR (constant bitrate).


## Live Broadcast from Camera Source

### OBS Dashboard

On the initial screen, select your preferred camera **Source** from *Video Capture Device*. Your default camera and microphone should be automatically selected, so you may want to change that if you wish to use different input devices. Click on Settings.

![obs dash](/_images/protocols/rtmppublishers/obs01.png)

### OBS Stream Settings for Live

**Stream Type:** Custom Streaming Server

**URL:** rtmp://your-server-ip:1935/live

**Stream key:** your-stream-name

![obs dash](/_images/protocols/rtmppublishers/obsstream1.png)

### OBS Output Settings

**Output Mode:** Advanced

<u>Streaming Tab</u>

**Encoder:** x264, place check in *Enforce streaming service encoder settings* box

**Rescale Output:**  640x480

**Rate Control:** VBR

**Bitrate:** 750 Kbps

**CRF:** 23 (default)

**Keyframe Interval (seconds, 0=auto):** 3

**CPU Usage Preset:** veryfast

**Profile:** baseline

**Tune:** zerolatency

![obs dash](/_images/protocols/rtmppublishers/obsoutput01a.png)

### OBS Audio Settings

Defaults are OK (Sample Rate 48Khz; Channels Stereo)

### OBS Video Settings

**Base (Canvas) Resolution:** 640x480

**Output (Scaled) Resolution:** 640x480

**Downscale Filter:** Bicubic (Sharpened scaling, 16 samples)

**Integer FPS Value:** 30

### Publishing with OBS

Click **OK** to exit out of Settings. Then click on **Start Streaming** to broadcast.

## Screen Sharing via OBS

A common use for OBS publishing is game screen sharing (as with Twitch). The following settings are recommended for streaming your screen using Display Capture on OBS via the Red5 Pro server. **NOTE:** if you are on MacOSX, you will first need to go into *Security and Privacy* settings and give OBS **Screen Recording** access. from the main screen, under **Sources**,  click on the **+** button, select "Display Capture" and save the new source. If you have mutliple monitors/screens, you can then choose which screen you want to share by right-clicking and selecting Properties for the new source. You can also choose to manually crop the window.

Whenever you add a new source, it is recommended to right-click and choose "Resize output (source size)" to capture the resolution.

> **NOTE:** Higher resolution and bandwidth publishing will use more CPU on your server

### OBS Output Settings for Screen Share

**Output Mode:** Advanced

<u>Streaming Tab</u>

**Encoder:** x264

**Rescale Output:**  (optional)

**Rate Control:** VBR

**Bitrate:** 6000 Kbps (depending on your screen size you may want to make this higher or lower; for this case the screen is 1080p, so we're using 6000 Kbps); place check in *Use Custom Buffer Size*

**Buffer Size:** 3000 (half of your Kbps value is recommended)

**CRF:** 23 (default)

**Keyframe Interval (seconds, 0=auto):** 3

**CPU Usage Preset:** veryfast

**Profile:** baseline

**Tune:** fastdecode (or zerolatency)

![obs dash](/_images/protocols/rtmppublishers/screenshare01a.png)

### OBS Audio Settings for Screen Share

Defaults are OK (Sample Rate 48Khz; Channels Stereo)

### OBS Video Settings for Screen Share

**Base (Canvas) Resolution:** 1920x1200 (this is set by the resize output done from the source menu)

**Output (Scaled) Resolution:** 1920x1200

**Downscale Filter:** Bicubic (Sharpening scaling, 16 samples)

**Integer FPS Value:** 30

## Sending Authentication Parameters via OBS

To send parameters via an OBS publisher, enter the server URI as: `rtmp://{server}/{webapp}?username={username}&password={password}&token={token}`

![obs auth](/_images/protocols/rtmppublishers/obsauth.png)