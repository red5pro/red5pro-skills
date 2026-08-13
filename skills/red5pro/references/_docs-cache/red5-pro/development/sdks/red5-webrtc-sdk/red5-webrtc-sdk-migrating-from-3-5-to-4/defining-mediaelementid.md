_From: Migrating from `3.5.0` to `4.0.0`_

## Defining mediaElementId

The following sections show the code required to have a DOM element display the broadcast and subscription streams:

### Element `id` usage in 3.5.0 SDK

In the `3.5.0` version of the Red5 Pro WebRTC SDK, a view was required in order to display the broadcast and subscription streams.

```html
<!doctype html>
<html>
  <head>
    <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
    <script src="lib/red5pro/red5pro-sdk.min.js"></script>
  <head>
  <body>
    <video id="red5pro-publisher" muted></video>
    <video id="red5pro-subscriber" controls></video>
    <script>
        (function (red5prosdk) {
          'use strict';

          var pubConfiguration = {}; // not defined for clarity in this example.
          var subConfiguration = {}; // not defined for clarity in this example.

          var publisher = new red5prosdk.Red5ProPublisher();
          var subscriber = new red5prosdk.Red5ProSubscriber();

          var publisherView = new red5prosdk.PublisherView('red5pro-publisher');
          var subscriberView = new red5prosdk.PlaybackView('red5pro-publisher');

          publisherView.attachPublisher(publisherView);
          subsceiberView.attachSubscriber(subscriberView);

          publisher.init(pubConfiguration)
            .then(function (selectedPublisher) {
              publisher.publish();
            });

          subscriber.init(subConfiguration)
            .then(function (selectedSubscriber) {
              subscriber.play();
            });

        })(window.red5prosdk);
    </script>
  </body>
</html>
```

### Element `id` usage in 4.0.0 SDK

The requirement for creating a view and attaching either the **Publisher** or **Subscriber** instance has been removed. Instead, a `mediaElementId` property on the initialization configuration is recognized and used in establishing playback in a DOM element:

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

          publisher.mediaElementId = 'red5pro-publisher';
          subscriber.mediaElementId = 'red5pro-subscriber';

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
