---
title: Wirecast
description: ""
menu_order: 3
---

You can download [Wirecast here](https://www.telestream.net/controls/wirecast/download-wirecast.htm). Wirecast offers a free trial, but it includes a watermark, so you will want to purchase the full license if you intend to use this for broadcasting. The following assumes that you have some basic knowledge of Wirecast, and includes only basic settings necessary for a Red5 Pro compatible stream.

In Wirecast studio, navigate to **Output; Output Settings.** Choose RTMP server. The Address will be: `rtmp://your-server-url:1935/live`.

![rtmpserver](/_images/protocols/rtmppublishers/rtmpserver.png)

Click on the pull down to the right of the Encoding field, and choose **New Preset**. Give the preset a descriptive name (this example will be `red5pro-360p-stream` and click **OK**.

![preset](/_images/protocols/rtmppublishers/preset.png)

For example, to broadast a `360p` stream, use the following settings:

Video Encoding:

* Encoder: `x264`  (**required**)
* Width: `640`
* Height: `360`
* Frames per second: `15`
* Average bit rate: `750` kbits/sec
* Quality: `Fast encoding`
* Profile: `Baseline` (**required**)
* Key frame every: `30` frames - *To ensure a keyframe every 2 seconds, this number must be twice the* Frames per second *value (for example, if you are broadasting at 30fps, then you want a keyframe every 60 frames)*
* IMPORTANT: do **not** check `Keyframe Aligned`.

Audio Encoding:

* Channels: `Stereo`
* Targe bit rate: `96` kbits/sec
* Sample rate: `48,000` kHz

![encoder](/_images/protocols/rtmppublishers/encoder.png)

Click **Save**. Then, click **OK** to close the Output Settings dialog box.

To stream via your FaceTime Camera, for example, click on the `+` sign to next to the first Layer to attach a video source. Choose Capture Devices > Facetime HD Camera Video.

![capturedevice](/_images/protocols/rtmppublishers/capturedevice.png)

You will need to add the audio on a different Layer: `+` > Capture Devices > Built-in Microphone Audio.

![audioinput](/_images/protocols/rtmppublishers/audioinput.png)

Click on ![streamicon](/_images/protocols/rtmppublishers/streamicon.png) to start broadcasting.
