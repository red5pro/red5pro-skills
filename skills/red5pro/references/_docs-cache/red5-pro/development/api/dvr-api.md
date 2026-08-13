---
title: DVR API
menu_order: 30
---

## Client Configurations

The WebRTC SDK can be configured to enable Live DVR capabilities for `LiveSeekClient` through an initialization configuration property named `liveSeek`.

The schema for the `liveSeek` configuration is as follows:

```js
{
  enabled: <boolean>,
  baseURL: <string | undefinde>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  options: <object | undefined>,
  usePlaybackControlsUI: <boolean>
}
```

- `enabled` : a boolean flag of whether live seek is enabled or disabled.
- `baseURL` : (optional) the base URL to access the HLS files that are generated for live seek streams.
- `fullURL` : (optional) the full URL to access the HLS files that are generated for live seek streams.
- `hlsjsRef` : (optional) the [HLS.JS](https://github.com/video-dev/hls.js/) reference. If you load HLS.js in a script tag, the SDK will check the `window` global for `Hls`, otherwise provide a reference to the loaded HLS.js.
- `hlsElement` : (optional) the target `video` element to attach the HLS Media to. If left undefined, the SDK will create and maintain the target element (recommended).
- `options` : (optional) the configuration options for [HLS.JS](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning). Default is: `{debug: false, backBufferLength: 0}`.
- `usePlaybackControlsUI` : (optional) flag to use the custom controls provided by the SDK. Default is `true`. **If setting this to `false`, you must provide your own UI controls and interface with the API to control playback.**

### Detailed Configuration Property Information

**baseURL**

The `baseURL` is the base endpoint URL from which the SDK will access the recorded HLS files. By default, the SDK will assume the base URL is the `host` of the initialization configuration, but when utilizing autoscale, the HLS files will not be accessible from the edge. As such, the server should be configured to upload the HLS files to a remote location - such as a CDN.

The storage of the HLS files should follow the convention of `<baseURL>/<app scope>`, where `app scope` is where the live broadcast stream is streaming to and the bucket name within the CDN; do not include the `app scope` in the `baseURL` property.

> For example, if your live broadcast is streaming to the `live` app scope under the name of `stream1`, and your CDN resides at `https://yourcdn/company`, then just provide `https://yourcdn/company` as the `baseURL` and the SDK will attempt to access the HLS files at `https://yourcdn/company/live/stream1.m3u8`.

**fullURL**

The `fullURL` could be provided that will be the full URL path to the HLS file used in live seek. If this is provided, it will use this _untouched_ and load the file directly.

> For example, if you provide `https://yourcdn/company/live/stream1.m3u8` as the `fullURL`, that file will be requested.

**hlsjsRef**

The SDK requires the dependency of [HLS.JS](https://github.com/video-dev/hls.js/) 3rd-party library in order to achieve live seek of a stream.

If you include it as a `script` tag source in your page, you do not have to set the `hlsjsRef` property, as the SDK will check the `window` global for the existance of `Hls`. In the chance that you did not include the UMD distribution of the library and instead are using it modularly, you need to provide a reference to the `Hls` import.

**hlsElement**

The optional target `video` element to load the HLS files into. If left `undefined` (the default), the SDK with generate and maintain the backing video element. By providing a target `hlsElement` you may need to maintain its own lifecycle.

**options**

Provide an optional `options` configuration that will be assigned untouched to the underlying [HLS.JS](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning) use.

**usePlaybackControlsUI**

Flag to use the default playback controls of the SDK to play, pause, live scrub, and additional actions. If setting this to `false`, you will need to create and manage your own controls to interact with the live and VOD content.

### Additional Dependencies

The Live Seek capabilities were developed with the [HLS.js](https://github.com/video-dev/hls.js/) API in mind. As such, it is a requirement to have the [HLS.js](https://github.com/video-dev/hls.js/) library as a dependency for browsers that do not support native HLS playback. Browsers that do support native HLS playback (such as Mobile and Desktop Safari) do not have such a requirement.

You will need to include the [HLS.js](https://github.com/video-dev/hls.js/) library either explicitly declared in source or as an imported module.

Declared source in HTML page:

```xml
<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
```

To use as a module:

1. First install it

```sh
npm install hls.js
```

2. Then import it into your script

```js
import Hls from "hls.js";
```

3. And specify `HLS` as the `hlsjsRef` for the `liveSeek` init config for the `LiveSeekClient`:

```js
liveSeek: {
  hlsjsRef: HLS,
}
```

## Conclusion

With the Live DVR and seek capabilities of the Red5 Server and WebRTC SDK, you can provide richer engagement and experiences for viewers of a live broadcast which is demonstrated by our [TrueTime™ MultiView for Fans](/truetime/multiview-for-fans/) web application.

## Installation Information

Information on how to enable the DVR [DVR User's Guide Section](/docs/red5-pro/users-guide/dvr).
