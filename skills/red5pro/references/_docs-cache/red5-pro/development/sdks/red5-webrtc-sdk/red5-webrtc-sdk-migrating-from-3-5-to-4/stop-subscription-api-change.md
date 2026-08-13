_From: Migrating from `3.5.0` to `4.0.0`_

## Stop Subscription API Change

In the `3.5.0` version of the Red5 Pro WebRTC SDK, the requests to stop subscription and playback were made by invoking the API call of `stop()`. The `4.0.0` version of the SDK introduces the custom [Playback Controls](#red5-pro-webrtc-sdk-playback-controls), and with it, an API to control the playback of a stream. As such, the request to stop playback was moved to the `stop` method of the Playback Controls API, and the request to stop subscription was changed to `unsubscribe`.

### Subscription stop in 3.5.0 SDK

In the `3.5.0` version of the SDK, unsubscription request and stop of playback where bundled together in the `stop()` invocation on a **Subscriber**:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <button id="unsubscribe-button">unsubscribe</button>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var targetSubscriber;  // holds reference to determined subscriber instance.

          var subscriber = new red5prosdk.Red5ProSubscriber();
          var view = new red5prosdk.PlaybackView('red5pro-subscriber');
          view.attachSubscriber(subscriber);

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              targetSubscriber = selectedSubscriber;
              targetSubscriber.play();
            });

          var stopSubscription = function () {
            targetSubscriber.stop()
              .then(function () {
                // successful stop and unsubscribe of playback.
              });
          }
          document.getElementById('unsubscribe-button')
            .addEventListener('click', stopSubscription);

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Subscription stop in 4.0.0 SDK

In the `4.0.0` version of the SDK, unsubscription request is made by invoking `unsubscribe()` and request to stop playback is delegated to the Red5 Pro WebRTC SDK Playback Controls API:

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-subscriber" controls></video>
    <button id="unsubscribe-button">unsubscribe</button>
    <script>
        (function (red5prosdk) {
          'use strict';

          var configuration = {}; // not defined for clarity in this example.

          var targetSubscriber;  // holds reference to determined subscriber instance.

          var subscriber = new red5prosdk.Red5ProSubscriber();

          subscriber.init(configuration)
            .then(function (selectedSubscriber) {
              targetSubscriber = selectedSubscriber;
              targetSubscriber.play();
            });

          var stopSubscription = function () {
            targetSubscriber.stop()
              .then(targetSubscriber.unsubscribe)
              .then(function () {
                // successful stop and unsubscribe of playback.
              });
          }
          document.getElementById('unsubscribe-button')
            .addEventListener('click', stopSubscription);

        })(window.red5prosdk);
    </script>
  </body>
</html>
```
