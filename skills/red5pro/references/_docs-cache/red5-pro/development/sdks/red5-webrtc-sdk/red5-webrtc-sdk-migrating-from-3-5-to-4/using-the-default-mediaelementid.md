_From: Migrating from `3.5.0` to `4.0.0`_

## Using the default mediaElementId

By defining the `id` attribute of the target [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) with the default values for **Publishers** and **Subscribers** - `red5pro-publisher` and `red5pro-subscriber`, respectively - then, the `mediaElementId` property does not have to be provided on the initialization configuration object:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-publisher" muted></video>
    <video id="red5pro-subscriber" controls autoplay></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var pubConfiguration = {}; // not defined for clarity in this example.
          var subConfiguration = {}; // not defined for clarity in this example.

          var publisher = new red5prosdk.Red5ProPublisher();
          var subscriber = new red5prosdk.Red5ProSubscriber();

          publisher.init(pubConfiguration)
            .then(function (selectedPublisher) {
              publisher.publish();
            });

          subscriber.init(subConfiguration)
            .then(function (selectedSubscriber) {
              subscriber.subscribe();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

# Red5 Pro WebRTC SDK Playback Controls

> This change affects all **Subscriber** types.

In response to numerous requests, we have unified the playback controls of the various **Subscriber** types - WebRTC, Flash and HLS.

This feature provides consistent cross-browser, cross-player UI and functionality and is customizable to allow for branding.

The Playback Controls are "turned on" by declaring a `controls` property and the class assignment of `red5pro-media` on the target [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement). If either of these are not present on the element, the default behaviour of the browser is utilized.

> Please refer to the [Playback Controls Document](/docs/red5-pro/development/sdks/red5-webrtc-sdk/red5-webrtc-sdk-playback-controls/) for more information on this feature.

# Subscriber API Changes

> This change affects all **Subscriber** types.

Several API changes have been made for **Subscribers** in the `4.0.0` version of the Red5 Pro WebRTC SDK. In particular, the method names for requesting to start and stop a subscription have been changed in accordance to the nomenclature of the API for [Red5 Pro WebRTC SDK Playback Controls](#red5-pro-webrtc-sdk-playback-controls) and the automatic playback of streams has been removed and made dependent on DOM element attributes.

You can find more information about these changes in the following sections:

* [Start Subscription API Change](#start-subscription-api-change)
* [Stop Subscription API Change](#stop-subscription-api-change)
* [Autoplay Change](#autoplay-change)
