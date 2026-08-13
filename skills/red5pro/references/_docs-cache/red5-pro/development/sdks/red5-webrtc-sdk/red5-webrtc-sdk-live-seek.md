---
title: WebRTC Live Seek
description: ""
menu_order: 20
---

# LiveSeekClient

To enable live seek capabilities for a live stream on the client-side, the SDK provides a `LiveSeekClient`. It is an extension of the `WHEPClient`, providing its familiar API and additional logic to be able to playback historical segments of a live stream by using playback controls and events.

This example demonstrates using the `LiveSeekClient` with its default configuration attributes:

```js
try {
    const subscriber = new LiveSeekClient()
    // Events related to live seek start with type: `WebRTC.LiveSeek`
    subscriber.on('*', , (event) => console.log(event))

    await subscriber.init({
      ...configuration,
      liveSeek: {
        baseURL: undefined, // Base endpoint URL to locate the associated m3u8 manifest. Undefined, will look for files on the `host`
        fullURL: undefined, // Full endpoint URL to locate the assocated m3u8 manifest. Undefined, will look for files on the `host`
        hlsjsRef: undefined, // Explicit reference to HLS.JS dependency. Undefined, the SDK will look for window.HLS
        hlsElement: undefined, // Explicit reference to the target video element to load the HLS stream. Undefined, the SDK will autogenerate one
        usePlaybackControlsUI: true, // Flag to use custom player controls from the SDK for scrubbing. False requires that you provide your own controls and interactive with the Playback API
        options: { debug: false, backBufferLength: 0 } // Options to provide to HLS.JS instance directly
      }
    })
    await subscriber.subscribe()
} catch (error) {
    // Something went wrong...
}
```

## LiveSeek Configuration

The `liveSeek` configuration object has the following signature:

```js
  baseURL: <string | undefinde>,
  fullURL: <string | undefined>,
  hlsjsRef: <hls.js reference | undefined>,
  hlsElement: <HTMLVideoElement | undefined>,
  usePlaybackControlsUI: <boolean>,
  options: <object | undefined>
```

### baseURL

- Base endpoint URL to locate the associated m3u8 manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://myserver.cloud/streams`

### fullURL

- Full endpoint URL to locate the assocated `m3u8` manifest. If `undefined`, will look for files on the `host`.
- Default: `undefined`
- Example: `https://mycdn.cloud/streams/mystream.m3u8`

### hlsjsRef

- Explicit reference to HLS.JS dependency. If `undefined`, the SDK will look for `window.HLS`.
- Default: `undefined`

### hlsElement

- Explicit reference to the target `video` element to load the HLS stream. If `undefined`, the SDK will autogenerate one.
- Default: `undefined`

### usePlaybackControlsUI

- Flag to use custom player controls UI from the SDK for scrubbing.
- Setting to `false` requires that you provide your own controls and interactive with the Playback API.
- Default: `true`

### options

- Options to provide to HLS.JS instance directly. _Please refer to [their documentation](https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning)_.
- Example: `{ debug: false, backBufferLength: 0 }`

## Server Requirements

To enable live seek capability, the following configuration properties are required on the server in order to allow HLS recording to support `FMP4` playback:

_File:_

**conf/hlsconfig.xml**

_Edits:_

```xml
<property name="outputFormat" value="TS"/>
<property name="dvrPlaylist" value="true"/>
```
