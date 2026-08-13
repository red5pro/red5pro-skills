---
title: Using mediaConstraints And onGetUserMedia
description: ""
menu_order: 9
---

# WHIPClient Media Access

The Red5 Pro WebRTC SDK will handle the `getUserMedia` requirements internally to set up your Camera and/or Microphone for a broadcast. As such, you can provide the [Media Constraint](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints) object to be used on the `init` configuration:

```js
const config = {
  host: "mycloud.red5",
  streamName: "mystream",
  mediaConstraints: {
    audio: true,
    video: {
      width: {
        min: 640,
        max: 1280,
      },
      height: {
        min: 360,
        max: 720,
      },
      frameRate: {
        min: 15,
        max: 60,
      },
    },
  },
};

const publisher = new WHIPClient();
await publisher.init(config);
await publisher.publish();
```

Internally, the Red5 Pro WebRTC SDK will use the provided _Media Constraint_ to test if the resolutions requested are supported by the browser. If not, it will find the nearest supported lower neighbor based on the originally provided area dimension(s) of the resolutions.

> If you would like to bypass the internal determination of resolution, you can use the `onGetUserMedia` override of the configuration properties.

If you know exactly the proper configurations needed for your requirements and would like to fine-tune the generated `MediaStream` to be used in the broadcast, you can also optionally return that using the `onGetUserMedia` init configuration:

```js
const config = {
  host: "mycloud.red5",
  streamName: "mystream",
  onGetUserMedia: () => {
    return navigator.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 640,
          max: 1280,
        },
        height: {
          min: 360,
          max: 720,
        },
        frameRate: {
          min: 15,
          max: 60,
        },
      },
    });
  },
};

const publisher = new WHIPClient();
await publisher.init(config);
await publisher.publish();
```

The `onGetUserMedia` method - when defined on the configuration provide to a WebRTC-based Publisher - will override the internal call to `getUserMedia` in the Red5 Pro WebRTC SDK.

You can provide your own logic on how `getUserMedia` is invoked and a [Media Stream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) attained by setting the `onGetUserMedia` attribute to a method that conforms to the following guidelines:

- No input arguments are provided to `onGetUserMedia`.
- It is _expected_ that a `Promise` object is returned.
- A `MediaStream` object must be provided in the resolve of the `Promise`.
- The error provided in the reject of the `Promise` is optional, but recommended as a `String`.

Be aware that overriding `onGetUserMedia` you are losing the logic from the Red5 Pro WebRTC SDK that attempts to pick the optimal resolution supported by your browser. **Use with descretion.**

> To read more about `getUserMedia` please read the following document from Mozilla Developer Network: [https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)

## initWithStream

In addition to these `init` attributes for media access, you can also supply a `MediaStream` object to the `WHIPClient` on initialization if you have already established a `MediaStream`:

```
const mediaStream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: {
    deviceId: 'xxx'
  }
})

const publisher = new WHIPClient()
await publisher.initWithStream(configuration, mediaStream)
await publisher.publish()
```

Common scenarios in which you would prefer to use `initWithStream` with an already established `MediaStream` are:

- Camera setup in lobby before joining a conference
- Screenshare using `getDisplayMedia`
