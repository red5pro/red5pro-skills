_From: Migrating from `3.5.0` to `4.0.0`_

## Defining mediaConstraints

The following sections show the code required to start a broadcast session between `3.5.0` and `4.0.0` using media constraints:

### MediaConstraints in 3.5.0 SDK

The `getUserMedia` request was required as an intermediary step prior to broadcasting:

```js
(function (red5prosdk) {
  'use strict';

  var configuration = {}; // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher();
  var view = new red5prosdk.PublisherView();
  view.attachPublisher(publisher);

  publisher.init(configuration)
    .then(function (selectedPublisher) {
      // externalized request for MediaStream using gUM.
      if (selectedPublisher.getType().toLowerCase() === 'rtc') {
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            width: 640,
            height: 480
          }
        }).then(function (mediaStream) {
          view.preview(mediaStream);
          selectedPublisher.attachStream(mediaStream);
          selectedPublisher.publish();
        });
      }
      else {
        selectedPublisher.publish();
      }
    })

})(window.red5prosdk);
```

### MediaConstraints in 4.0.0 SDK

The `getUserMedia` request is internalized and executed using the `mediaConstraints` property of the initialization configuration.

```js
(function (red5prosdk) {
  'use strict';

  var configuration = {}; // not defined for clarity in this example.

  var publisher = new red5prosdk.Red5ProPublisher();
  // Using the new init config attribute.
  configuration.mediaContraints = {
    audio: true,
    video: {
      width: 640,
      height: 480
    }
  };

  publisher.init(configuration)
    .then(function (selectedPublisher) {
      selectedPublisher.publish();
    });

})(window.red5prosdk);
```
