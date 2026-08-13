---
title: Transcoding/ABR Provision Suggestions
description: ""
menu_order: 5
---

The following are some suggested tiered provisions based on ingest quality. When creating your ABR provisions, keep in mind the following:

* The highest level provision needs to match the resolution, bitrate and framerate of your incoming stream. The transcoder does not modify the `level 1` stream.

* For the smoothest ABR experience, comparative bitrates of adjacent levels should be within 50% or less.
  * For example, if your incoming bitrate is 2,000 kbps, then the 2nd level should be 1,000 kbps or higher.

* For HD-quality streams, we suggest 4 or more tiers, depending on your subscriber targets.

* Transcoding is very CPU-heavy, so you'll want to use a larger VM size for:
  * High resolution ingest
  * High framerate ingest
  * High bitrate ingest
  * More provision tiers
  
For example, a 4K 10,000 kbps, 60fps stream transcoded into 5 additional levels will use significantly more CPU than a 720p 2,500kbps 30fps stream transcoded into 2 additional levels. We suggest at least 8 CPUs for the 4K transcoding, and one transcoder per incoming stream if you have multiple 4K ingests. For 720p, a 4-CPU VM should support several streams.

The following provision examples have been added to the [Stream Manager Postman API](https://www.postman.com/red5-streaming/red5-pro/collection/h499eow/red5pro-stream-manager-2-0)

# Provision Suggestions by Quality

## 720p Publisher

### 720p Three Levels

Source stream:  

* videoHeight: 720
* videoWidth: 1280
* videoBR: 3,000 kbps
* videoFPS: 30 fps

Level 2:

* videoHeight: 540
* videoWidth: 960
* videoBR: 2,0000 kbps
* videoFPS: 30 fps

Level 3:

* videoHeight: 360
* videoWidth: 640
* videoBR: 1,000 kbps
* videoFPS: 30 fps

### 720p Four Levels

Source stream:  

* videoHeight: 720
* videoWidth: 1280
* videoBR: 4,000 kbps
* videoFPS: 30 fps

Level 2:

* videoHeight: 540
* videoWidth: 960
* videoBR: 2,000 kbps
* videoFPS: 30 fps

Level 3:

* videoHeight: 360
* videoWidth: 640
* videoBR: 1,000 kbps
* videoFPS: 30 fps

Level 4:

* videoHeight: 180
* videoWidth: 320
* videoBR: 600 kbps
* videoFPS: 15 fps


## 1080p Publisher

### 1080p Three Levels

Source stream:  

* videoHeight: 1080
* videoWidth: 1920
* videoBR: 4,000 kbps
* videoFPS: 30 fps

Level 2:

* videoHeight: 720 
* videoWidth: 1280
* videoBR: 2,000 kbps
* videoFPS: 30 fps

Level 3:

* videoHeight: 360
* videoWidth: 640
* videoBR: 1,000 kbps
* videoFPS: 30 fps

### 1080p Four Levels

Source stream:  

* videoHeight: 1080
* videoWidth: 1920
* videoBR: 5,0000 kbps
* videoFPS: 30 fps

Level 2:

* videoHeight: 720
* videoWidth: 1280
* videoBR: 3,000 kbps
* videoFPS: 30 fps

Level 3:

* videoHeight: 540
* videoWidth: 960
* videoBR: 2,000 kbps
* videoFPS: 30 fps

Level 4:

* videoHeight: 360
* videoWidth: 640
* videoBR: 1,000
* videoFPS: 30 fps


## 1440p Publisher

### 1440p Five Levels

Source stream:  

* videoHeight: 1440
* videoWidth: 2048
* videoBR: 6,000 kbps
* videoFPS: 30 fps

Level 2:

* videoHeight: 1080
* videoWidth: 1920
* videoBR: 4,000 kbps
* videoFPS: 30 fps

Level 3:

* videoHeight: 720
* videoWidth: 1280
* videoBR: 3,000 kbps
* videoFPS: 30 fps

Level 4:

* videoHeight: 540
* videoWidth: 960
* videoBR: 2,000
* videoFPS: 30 fps

Level 5:

* videoHeight: 360
* videoWidth: 640
* videoBR: 1,000
* videoFPS: 30 fps


## 4K Publisher

### 4K Five Levels

Source stream:  

* videoHeight: 2160
* videoWidth: 3840
* videoBR: 10,000 kbps
* videoFPS: 60 fps

Level 2:

* videoHeight: 1440
* videoWidth: 2048
* videoBR: 6,000 kbps
* videoFPS: 60 fps

Level 3:

* videoHeight: 1080
* videoWidth: 1920
* videoBR: 4,000 kbps
* videoFPS: 30 fps

Level 4:

* videoHeight: 720
* videoWidth: 1280
* videoBR: 2,500 kbps
* videoFPS: 30 fps

Level 5:

* videoHeight: 540
* videoWidth: 960
* videoBR: 1,500 kbps
* videoFPS: 30 fps

### 4K Six Levels

Source stream:  

* videoHeight: 2160
* videoWidth: 3840
* videoBR: 10,000 kbps
* videoFPS: 60 fps

Level 2:

* videoHeight: 1440
* videoWidth: 2048
* videoBR: 6,000 kbps
* videoFPS: 60 fps

Level 3:

* videoHeight: 1080
* videoWidth: 1920
* videoBR: 4,000 kbps
* videoFPS: 30 fps

Level 4:

* videoHeight: 720
* videoWidth: 1280
* videoBR: 2,500 kbps
* videoFPS: 30 fps

Level 5:

* videoHeight: 540
* videoWidth: 960
* videoBR: 1,500 kbps
* videoFPS: 30 fps

Level 6:

* videoHeight: 360
* videoWidth: 640
* videoBR: 1,000 kbps
* videoFPS: 30 fps

# Additional Considerations

Most of the above suggestions are geared towards **high-motion streams** (like a sports event).  Mostly static streams (like a lecture) will not maintain the higher bitrates. If the incoming stream's bitrate doesn't match, or come close, to the level set for that provision, then the lower-tiered provisions may not be able to be sustained. This will affect any ABR potential.

For example, if you were to use the [720p publisher 3-level suggested provisions](#720pThreeLevels), but your incoming stream was only coming in at 1,500kbps instead of 3,000 kbps, then the second and third levels cannot match the provisioned 2,000 kbps and 1,000 kbps, and you will not see adaptive bitrate working as you expect.
