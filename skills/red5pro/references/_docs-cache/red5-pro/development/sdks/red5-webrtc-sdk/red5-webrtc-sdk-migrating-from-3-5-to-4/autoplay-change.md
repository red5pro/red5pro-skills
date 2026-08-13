_From: Migrating from `3.5.0` to `4.0.0`_

## Autoplay Change

In the `3.5.0` version of the Red5 Pro WebRTC SDK, playback started automatically in the bundle of subscription request and playback from the `play` method incocation. Essentially, a request to connect and subscribe to a stream was a request to start playback immediately once the stream is received.

In the `4.0.0` version, the separation of subscription request and playback od stream has been introduced. Instead, the auto-playback feature can be turned on by defining the `autoplay` attribute on the target [HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement).

### Autoplay capability in 3.5.0 SDK

In the `3.5.0` version of the SDK, subscription request and playback where bundled together in the `play()` invocation on a **Subscriber**, which resulted in auto-playback of the stream upon successful subscription:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var subscriber = new red5prosdk.Red5ProSubscriber();
          var view = new red5prosdk.PlaybackView('red5pro-subscriber');
          view.attachSubscriber(subscriber);

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Autoplay capability in 4.0.0 SDK

In the `4.0.0` version of the SDK, a separation of subscription and playback is introduced. Auto-playback is possible through defining the `autoplay` attribute on the target **HTMLMediaElement**:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls autoplay></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var subscriber = new red5prosdk.Red5ProSubscriber();

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.subscribe();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

# Removal of VideoJS

In the `3.5.0` version of the Red5 Pro WebRTC SDK, the option to utilize the [VideoJS](https://videojs.com/) as a HLS/Flash failover was provided.

Additionally, if **VideoJS** was used, it provided custom playback controls.  With the release of version `4.0.0`, we have provided the ability to display and customize playback controls. _[Refer to section: Red5 Pro WebRTC SDK Playback Controls](#red5-pro-webrtc-sdk-playback-controls)_.

For these reasons, the inclusion of [VideoJS](https://videojs.com/) as a dependency in HLS failover and playback controls has been removed.

However, it does not mean that you are not permitted to use *VideoJS* for playback. It is entirely possible and detailed in the following example. Do note that if you use *VideoJS* for playback, you are not encorporating the Red5 Pro WebRTC SDK and will not benefit from all that brings - such as: stream message communication, Shared Objects, etc.
