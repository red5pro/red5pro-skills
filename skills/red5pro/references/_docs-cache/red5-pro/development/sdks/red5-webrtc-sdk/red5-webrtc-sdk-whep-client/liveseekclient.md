_From: WHEP Client_

## LiveSeekClient

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
