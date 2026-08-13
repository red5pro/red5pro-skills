---
title: DRM with Castlabs
menu_order: 25
---

## Encrypting

This example demonstrates integrating with a 3rd Party library provided from `Castlabs` to encrypt live video utilizing the `DRMtoday` platform.

> This example requires a version of the Red5Pro WebRTC SDK that has supported for [Insertable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API).

### Requirements

This example uses the 3rd Party library provided from `Castlabs`: [encrypt-worker.js](https://github.com/red5pro/streaming-html5/blob/master/src/page/test/castlabsPublish/encrypt-worker.js). The library provides transform functions to be used in encrypted live stream that have been encrypted using `merchant` keys.

> As such - though some polyfills are included - it is advised to run this example in browsers that support `Insertable Streams`.

### Settings

This example displays the encrypted stream along with the ability to playback decrypted. In order to playback the decrypted stream, integration with `Castlabs' DRMtoday` is required.

In particular, you will need to know the following that is provided as User Input settings on the interface for this example:

- `environment`: The environment on Castlabs DRMtoday account that your encrypted stream resides.
- `merchant`: The merchant account within DRMtoday where the stream resides.
- `encryption mode`: The type of AES (Advanced Encryption Standard) mode used on the stream.
- `key / key id / iv`: The key, key id and iv id values to be used in decryption. These should be provided to you by the `merchant`. _Currently this is a `base64` stream._

> It is not the intent of this document to describe the `DRMtoday` platform. Please refer to their documentation for more information.

## Decrypting

This example demonstrates integrating with a 3rd Party library provided from `Castlabs` to playback decrypted live video from the `DRMtoday` platform.

> This example requires a version of the Red5Pro WebRTC SDK that has supported for [Insertable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API).

### Requirements

This example uses the 3rd Party library provided from `Castlabs`: `rtc-drm-transform`. The library provides transform functions to be used in decrypting live stream that have been encrypted using `merchant` keys.

#### Transforms

The transform utilities are imported from the `Castlabs` library for use as such:

```js
import {
  getRtcDrmTransformVersion,
  setDrm,
  videoTransformFunction,
  audioTransformFunction,
  Environments,
} from "../../lib/castlabs/rtc-drm-transform/rtc-drm-transform.min.js";
```

And then provided to a Red5Pro `WHEPClient` during initialization:

```js
const transforms = {
  video: videoTransformFunction,
  audio: audioTransformFunction,
  worker: worker,
};
subscriber = await new red5prosdk.WHEPClient().init(config, transforms);
```

This will inform the Red5Pro WebRTC SDK to use the transform functions for decryption.


### Settings

This example displays the encrypted stream along with the ability to playback decrypted. In order to playback the decrypted stream, integration with `Castlabs' DRMtoday` is required.

In particular, you will need to know the following that is provided as User Input settings on the interface for this example:

- `environment`: The environment on Castlabs DRMtoday account that your encrypted stream resides.
- `merchant`: The merchant account within DRMtoday where the stream resides.
- `encryption scheme`: The type of DRM encryption used on the stream (such as `WideVine`, `FairPlay`, etc.).
- `key id / iv`: The key id and iv id values to be used in decryption. These should be provided to you by the `merchant`. _Currently this is a `base64` stream._

> It is not the intent of this document to describe the `DRMtoday` platform. Please refer to their documentation for more information.

### Code Example

After providing the transforms and/or web worker to the `WHEPClient` and started a subscribe session, you provide the settings defined in the previous section along with a reference to the `video` element to the `setDRM` function from the `rtc-drm-transform` library:

```js
const transforms = {
  video: videoTransformFunction,
  audio: audioTransformFunction,
  worker: worker,
};

subscriber = await new red5prosdk.WHEPClient().init(config, transforms);
await subscriber.subscribe();

const element = document.querySelector(`#${baseConfig.mediaElementId}`);
const keyIdOrIV = encryptKeyValue(getValueFromId("key-input"));

const drmConfig = {
  environment: Environments.Staging,
  merchant: `red5`,
  audioEncrypted: false,
  encryption: `cbcs`,
  keyId,
  iv,
};
// Castlabs.
setDrm(element, drmConfig);
```
