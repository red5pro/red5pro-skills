---
title: Migrating from `3.5.0` to `4.0.0`
description: ""
menu_order: 58
---

# Migrating from `3.5.0` to `4.0.0`

The `4.0.0` release of the Red5 Pro WebRTC SDK saw some major changes in the following features:

* Internalizing the `getUserMedia` request in order to simplify the intialization-to-broadcast sequence of **Publishers**.
  * While the default process of accessing a stream through the `getUserMedia` API of the browser has been internalized to the SDK, we have also exposed a way to override this default to allow developers to specifically handle this process as per requirements.
* Removal of explicitly defining and assigning views for **Publishers** and **Subscribers**.
  * The process of associating a view display to either a **Publisher** or a **Subscriber** has been internalized with access to DOM elements using a default `mediaElementId` configuration property.
  * This change simplifies the creation and initialization process for both **Publishers** and **Subscribers**.
  * While the default process of associating a view to a broadcast or subscriber session is based on a `mediaElementId` configuration property, developers are able to define which `video` or `audio` DOM element they prefer to use as the display by providing its `id` attribute value.
* Introduction of Red5 Pro WebRTC SDK Playback Controls.
  * In response to numerous requests regarding playback controls across the several **Subscriber** platforms we support, we have exposed an API for playback control and provide default UI elements and styles.
  * This allows for consistent cross-browser look-and-feel of playback controls across all playback formats: WebRTC, Flash, and HLS.
  * The Red5 Pro WebRTC SDK Playback Controls UI is completely customizable in styling to meet the branding requirements for developers.
  * By exposing a playback API, we allow developers to create their own custom controls - not relying on the Red5 Pro WebRTC SDK Playback Controls UI - to meet their own product requirements.
* Change in **Subscriber** API from `play()` to `subscribe()` as request to start playback.
  * This change is in keeping the Red5 PRo WebRTC SDK Playback Controls API in-line with consistent method names that properly describe their intent - e.g., `play`, `pause`, `resume`, etc.
  * The method change to `subscribe` also keeps consistent method naming convention for **Publishers** and **Subscribers**, as the method name to request publishing for **Publishers** is `publish`.
* Change in **Subscriber** API from `stop()` to `unsubscribe()` as request to cancel current playback.
  * This change is in keeping the Red5 PRo WebRTC SDK Playback Controls API in-line with consistent method names that properly describe their intent - e.g., `play`, `pause`, `resume`, etc.
  * The method change to `unsubscribe` also keeps consistent method naming convention for **Publishers** and **Subscribers**, as the method name to request cancel of publishing for **Publishers** is `unpublish`.
* Removal of auto-play from **Subscriber** functionality.
  * In previous versions of the Red5 Pro WebRTC SDK, all **Subscriber** types (WebRTC, Flash, and HLS) would begin playback automatically upon successful connection and subscription to a broadcast stream. This functionality has been removed.
  * Instead, the node properties of the [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) (e.g., `<video>` and `<audio>`) should be used to dictate that `autoplay` is requested.
  * The three [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) node properties that the Red5 Pro WebRTC SDK recognizes in establishing a subscription session are:
    * `muted` - in order to mute the audio upon initial playback.
    * `autoplay` - in order to automatically start playing the stream upon successful subscription.
    * `controls` - as discusses in [Red5 Pro WebRTC SDK Playback Controls](#red5-pro-webrtc-sdk-playback-controls).
* Removal of [VideoJS](https://videojs.com/) support in Flash/RTMP and HLS clients.
  * The integration with [VideoJS](https://videojs.com/) was originally intended to allow for easy failover to Flash if HLS was not supported. As the Red5 Pro WebRTC SDK started to support its own failover logic, the integration became unnecessary.

# Internalizing gUM Requests

> This change affects the WebRTC-based Publisher instances.


The `getUserMedia` (a.k.a. `gUM`) requests in pre-`4.0.0` versions of the SDK were externalized for WebRTC-based **Publishers**. This meant that developers had an intermediary step between initializing a **Publisher** and requesting to start publishing that involved requesting the `MediaStream` from the browser by invoking `getUserMedia`.

While this step allowed developers to specify the desired `MediaConstraints`, the requirement of fulfilling the request and handing the resulting `MediaStream` over to the preview display and **Publisher** seemed an unnecessary and cumbersome step in starting a broadcast session.

Starting in the `4.0.0` version of the Red5 Pro WebRTC SDK, the `gUM` request is internalized and uses the `mediaConstraint` property of the initialization configuration. It is suggested that the structure of this property - provided by developers upon initialization request of a **Publisher** instance - follow the structure of [MediaStreamConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia).

The default `MediaConstraint` used - if not provided on the `mediaConstraint` initialization configuration - is:

```js
{
  "audio": true,
  "video": {
    "width": {
      "exact": 640
    },
    "height": {
      "exact": 480
    }
  }
}
```

## Contents

- [Defining mediaConstraints](defining-mediaconstraints.md)
- [Override Default Request](override-default-request.md)
- [Defining mediaElementId](defining-mediaelementid.md)
- [Using the default mediaElementId](using-the-default-mediaelementid.md)
- [Start Subscription API Change](start-subscription-api-change.md)
- [Stop Subscription API Change](stop-subscription-api-change.md)
- [Autoplay Change](autoplay-change.md)
- [Using VideoJS for Playback](using-videojs-for-playback.md)
- [More Information](more-information.md)
