---
title: RTMP Encoding with Red5 Cloud
menu_order: 2
---

Real Time Messaging Protocol was designed by Adobe for use with Flash in the early 2000s. It is still one of the most common protocols used by encoders to stream video content to a server. RTMP is a TCP-based protocol which maintains persistent connections and allows low-latency communication. It is widely used for live streaming and video-on-demand (VOD) applications.

When configuring an RTMP encoder to stream to Red5 Cloud, you will need to specify the following settings:

## Video

### H.264 Video Codec

The video codec is the algorithm used to compress and decompress video data. The most common video codec is H.264, which is supported by most browsers and devices, including hardware encoding and decoding support. Red5 Cloud uses the H.264 codec for video streaming.

### H.264 Profile or B-Frames

When streaming low latency video, and specifically when delivering to WebRTC clients, the stream needs to be free of B-Frames (forward error correction). Typically this is accomplished by setting the H.264 profile to baseline. Sometimes encoders allow you to disable B-Frames directly. If the video appears to be jumping back and forth, it is likely that B-Frames are enabled.

### Keyframe Interval

The keyframe interval is the frequency at which keyframes are inserted into the video stream. Keyframes include the entire frame, instead of just parts of it as you would find in I-frames, and are used to start the video properly, to seek within the video, and to ensure quality streams.  The keyframe interval of 2 seconds is suggested for low latency streaming.

### Video Bitrate

The bitrate is the amount of data that is transmitted per second. The higher the bitrate, the better the quality of the video. However, higher bitrates require more bandwidth. The recommended bitrate depends on the resolution and frame rate of the video. Red5 Cloud uses the following as a guide:

- 360p at 30fps: 500-800 kbps
- 480p at 30fps: 800-1200 kbps
- 720p at 30fps: 2000-2500 kbps
- 720p at 60fps: 2500-3050 kbps
- 1080p at 30fps: 3500-4500 kbps
- 1080p at 60fps: 4500-6000 kbps
- 4K at 30fps: 10000-12000 kbps
- 4K at 60fps: 12000-14000 kbps

## Audio

### AAC Audio Codec

The audio codec is the algorithm used to compress and decompress audio data. The most common audio codec is AAC, which is supported by most browsers and devices. Red5 Cloud recommends using the AAC codec for audio streaming.

### MP3 Audio Codec

The MP3 audio codec is also supported by Red5 Cloud. It is only recommended for use when there is no option to use the AAC codec.

### Audio Bitrate

The audio bitrate is the amount of data that is transmitted per second for audio. The higher the bitrate, the better the quality of the audio. However, higher bitrates require more bandwidth. Red5 Cloud recommends at least 64 kbps per channel for AAC streaming mean that a typical stereo stream would be 128 kbps. If higher quality audio is desired, 192 kbps for stereo is recommended.

## Publishing RTMP

To publish RTMP to the Red5 Cloud you can either use the [RTMP Proxy](/docs/red5-cloud/users-guide/red5-cloud-rtmp-proxy) or you can use the Stream Manager to [request a server for publishing](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-streams-api/#GetServerforPublishRequest) if you are using a multi-region or multi-deployment configuration.


