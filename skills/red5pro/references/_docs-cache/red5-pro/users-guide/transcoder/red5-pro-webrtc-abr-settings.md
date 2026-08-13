---
title: WebRTC ABR - Settings
description: ""
menu_order: 16
---

Starting with Red5 Pro Server v10.2.0, thresholds were introduced to calculate whether a client’s network can support higher or lower variants. All the values are set relative to the bitrate.

## Upgrade & Downgrade Configs & Defaults

The subscriber periodically alerts the server of its estimated bitrate, via REMB (Receiver Estimated Maximum Bitrate), which is calculated by current throughput. This is what the server uses when determining whether a client should upgrade or downgrade.

These configurations can be adjusted in: `red5pro/conf/webrtc-plugin.properties` file on your nodes.

### ABR Upgrade Option 1 config: relative to target bitrate

* `abr.bitrateThresholdUpgrade=0.35`

RTC Estimated client bandwidth. Subscriber periodically tells the server its estimated bitrate. This value is calculated by current throughput. When determining if the subscriber should receive a higher quality, the higher bitrate stream value is compared to the client value.

This first setting determines how close to the next bitrate the subscriber must be. Default is within 35%. The client must post 65kb/s capability to upgrade to the 100kb/s version. Acceptable range is 0.0 to 0.5; 0.0=strict floating-point number.

This threshold is used to determine whether we should upgrade the variant (if there is a higher one)

The default for this is set to 0.35

When determining if the subscriber should receive a higher quality, the higher bitrate stream value is compared to the client value. bitratethresholdUpgrade determines how close to the next bitrate the subscriber must be.

Calculation: target bitrate - (target bitrate * threshold) < REMB

Example: if the bitrateThreasholdUpgrade is set to 0.25: 

Client must post 75kb/s capability to upgrade to 100kb/s version.

An acceptable range for this threshold would be between 0.0 to 0.5, 0.5 being very permissive.

###  ABR Upgrade Option 2 config: relative to current bitrate. OPTIONAL

* `abr.bitrateThresholdUpgradeTrial=1.5`

This config value is *optional*. Because the estimated bitrate is based on the current stream and bitrate variants may be very far apart, it may never reflect a value to qualify for the option 1 upgrade. So we compare the estimated bitrate against the current stream. If set to `0.5` (50%), and the estimated bitrate is more than 50% of the current, the client will be switched and given a chance. This works well if bitrates are doubled between provisions. This should be set higher if your provisions are further apart. Set to zero to DISABLE.

This threshold is used to test if a higher variant can be achieved by the client. Helpful in a jittery network so we don’t constantly go up and down between variants

The default for this is set to 1.5. Set to 0 to DISABLE

Because the estimated bitrate is based on the current stream and bitrate variants may be very far apart, it may never reflect a value to qualify for the upgrade. So we compare the estimated bitrate against the current stream.

Calculation: current variant bitrate * threshold < REMB

Example: If bitrateThreasholdUpgradeTrial set to 0.5

Then we check whether the estimated bitrate is 50% of the current stream’s bitrate, if so the client is switched and given a chance.

Note: This works well if bitrates are doubled between provisions and should be set higher if your provisions are further apart.

The acceptable range for this threshold would be between 1.5 to 0.5,  .5 being very permissive.

### ABR Downgrade Variable

* `abr.bitrateThresholdDowngrade=0.5`

If REMB is not at least `bitrateThresholdDowngrade` of the target stream bitrate, the client will not qualify for the upgrade. If REMB is less than `bitrateThresholdDowngrade` of the current stream bitrate, the client will be downgraded.bitrateThresholdDowngrade

This threshold is used to determine whether we should downgrade the variant

The default for this is set to 0.5

Calculation: current variant bitrate * threshold > REMB

If REMB is not at least 50% of the target stream bitrate, the client will not qualify for the upgrade. If REMB is less than 50% of the current stream bitrate, the client will be downgraded.

The acceptable range for this threshold would be between 0.66 and .33,  .66 being more strict.

## Additional Parameters

There are two values that determine if (1) the target bitrate is achieved, (2) is wildly variable or (3) is too low across the board: `videoQpMin` and `videoQpMax`. These can be configured in `red5pro/conf/cluster.xml`

```xml
        <!-- Transcoder video quality defaults. Range 1-62; 1=lossless. -->
        <property name="videoQpMin" value="28" />
        <property name="videoQpMax" value="48" /
```

 or can be passed in with the stream provision per level variant:
 
```json
          {
          "name": "<variant1_name>",
          "level": "1",
          "properties": {
          "videoHeight": 720,
          "videoWidth": 1280,
          "videoBR:" 2500000,
          "videoFPS": 30,
          "videoQpMin": 28,
          "videoQpMax": 48
          }
          }
```

The Qp (Quantization Parameter) values help when there is high or little-to-no motion in the streams.

If you would like a variant to use more bitrate during high motion, then set the `videoQpMin` and `videoQpMax` to a lower range than 28 & 48 respectively. Qp is universal to all codecs so the ranges can differ. For H264 the range is between 1-62.

If you have a stream with very little motion, then the range should be on the higher side.
