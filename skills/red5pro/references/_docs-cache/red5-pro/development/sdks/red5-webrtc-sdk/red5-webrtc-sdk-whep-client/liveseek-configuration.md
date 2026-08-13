_From: WHEP Client_

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

# Stream Manager 2.0

> This section provides information that relate to the release of Stream Manager 2.0 and its integration with WHIP/WHEP clients.

The Stream Manager 2.0 simplifies the proxying of web clients to Origin and Edge nodes. As such, an initialization configuration property called `endpoint` was added to the WebRTC SDK. This `endpoint` value should be the full URL path to the proxy endpoint on the Stream Manager as is used as such:
