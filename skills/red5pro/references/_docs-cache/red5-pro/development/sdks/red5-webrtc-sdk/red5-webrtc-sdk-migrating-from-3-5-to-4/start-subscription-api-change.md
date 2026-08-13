_From: Migrating from `3.5.0` to `4.0.0`_

## Start Subscription API Change

In the `3.5.0` version of the Red5 Pro WebRTC SDK, the request to start subscription and playback was made by invoking the API call of `play()`. The `4.0.0` version of the SDK introduces the custom [Playback Controls](#red5-pro-webrtc-sdk-playback-controls), and with it, an API to control the playback of a stream. As such, the request to start playback was moved to the `play` method of the Playback Controls API, and the request to start subscription was changed to `subscribe`.

### Subscription start in 3.5.0 SDK

In the `3.5.0` version of the SDK, subscription request and playback where bundled together in the `play()` invocation on a **Subscriber**:

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

### Subscription start in 4.0.0 SDK

In the `4.0.0` version of the SDK, subscription request is made by invoking `subscribe()` and playback is delegated to the Red5 Pro WebRTC SDK Playback Controls and element attributes:

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

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              selectedSubscriber.subscribe();
            })
            .then(function (selectedSubscriber) {
              selectedSubscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```
