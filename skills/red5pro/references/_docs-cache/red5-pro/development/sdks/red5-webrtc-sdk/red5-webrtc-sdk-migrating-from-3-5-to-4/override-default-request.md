_From: Migrating from `3.5.0` to `4.0.0`_

## Override Default Request

While the `getUserMedia` request has been internalized by default, the Red5 Pro WebRTC SDK also allows developers to override that default behavior if they wish to explicitly access and provide the `MediaSteam` instance for WebRTC-based publishers to use.

The `4.0.0` SDK release exposes a `onGetUserMedia` initialization configuration property that can be used to override the internalized `gUM` request.

If the `onGetUserMedia` initialization configuration property is set, that method will be invoked and the initialization sequence will be halted until its expected return `Promise` is resolved or rejected.

> The `onGetUserMedia` property expects no arguments and requires a `Promise` to be returned. The `resolve` payload of the `Promise` is expected to be a `MediaStream` instance.

The following example utilizes the `onGetUserMedia` override to request the `MediaStream` directly from the `MediaDevices` of `navigator`:

```js
(function (red5prosdk) {
  'use strict';

  var configuration = {}; // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher();
  // Using the onGetUserMedia override.
  configuration.onGetUserMedia = function() {
    // navigator.mediaDevices.getUserMedia returns a Promise.
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480
      }
    });
  };

  publisher.init(configuration)
    .then(function (selectedPublisher) {
      selectedPublisher.publish();
    });

})(window.red5prosdk);
```

# Removal of View Attachment

> This change affects all **Publisher** and **Subscriber** types.

* [Defining mediaElementId](#defining-mediaelementid)
* [Using the default mediaElementId](#using-the-default-mediaelementid)

In the `3.5.0` version of the Red5 Pro WebRTC SDK, developers were required to define a `PublisherView` or a `PlaybackView` for **Publishers** and **Subscribers**, respectively, if the stream was to be shown in a target DOM element. This requirement has been removed.

In its replacement is a new initialization configuration property: `mediaElementId`. This property is the `id` attribute value of the target DOM element that should display the broadcast preview or playback stream for **Publishers** and **Subscribers**, respectively.

A default value is used in the SDK, if one is not provided on the initialization configuration. The default `mediaElementId` for **Publishers** and **Subscribers** is:

| Type | mediaElementId |
| :--- | :--- |
| Publisher | `red5pro-publisher` |
| Subscriber | `red5pro-subscriber` |
