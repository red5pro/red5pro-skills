_From: Migrating from `3.5.0` to `4.0.0`_

## Using VideoJS for Playback

Playback of a stream being broadcast to a Red5 Pro Server is possible using [VideoJS](https://videojs.com/). All that is required is knowledge of the stream endpoint URL to provide:

```html
<!doctype html>
<html>
  <head>
    <title>Red5 Pro WebRTC SDK - Playback</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <link href="//vjs.zencdn.net/5.19/video-js.min.css" rel="stylesheet">
    <script src="https://unpkg.com/video.js/dist/video.js"></script>
    <script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
    <script src="https://unpkg.com/videojs-flash/dist/videojs-flash.js"></script>
    <style>
      #my-player {
        width: 640px;
        height: 480px;
      }
    </style>
  </head>
  <body>
        <video
            id="my-player"
            class="video-js"
            controls
            data-setup='{}'>
          <!--FLV files. -->
          <source src="http://localhost:5080/live/mystream.flv" type="video/flv"></source>
          <!-- HLS (m3u8) files. -->
          <source src="http://localhost:5080/live/mystream.m3u8" type="application/x-mpegURL"></source>
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a
            web browser that
            <a href="https://videojs.com/html5-video-support/" target="_blank">
              supports HTML5 video
            </a>
          </p>
        </video>
        <script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
        <script>
          (function (window, VideoJS) {
            'use strict';
            var videoElement = document.getElementById('my-player');
            var v;
            function getVJS() {
              return v;
            }
            v = new VideoJS(videoElement, {
              techOrder: ['html5', 'flash']
            }, function () {
              // success.
            });
          })(window, window.videojs);
        </script>
  </body>
</html>
```

In this example, if you are broadcasting a stream called `mystream` on a Red5 Pro Server served from `localhost`, the base URI for the stream endpoint would be:

```text
http://localhost:5080/live/mystream
```

The file extension will change for each `source` based on the container mime type you want to display: either HLS (`m3u8`) or Flash (`flv`). The required *VideoJS* library dependencies are loaded and a new `VideoJS` object created to start request of stream and playback.

This example demonstrates the use of [VideoJS](https://videojs.com/) for live and VOD stream playback from Red5 Pro Server. Please note that the Red5 Pro WebRTC SDK is not used at all in this example. As such, WebRTC playback is not supported and various other features provided by the SDK are not available; the purpose of this example was to demonstrate how to still use *VideoJS* for playback if that is your current requirement, as it has been removed from the Red5 Pro WebRTC SDK.
