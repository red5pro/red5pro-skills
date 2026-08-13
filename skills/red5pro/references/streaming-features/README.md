# Streaming Features

Source: local cache [`../_docs-cache/red5-pro/users-guide/`](../_docs-cache/red5-pro/users-guide/){restreamer,transcoder,mixer,recording-and-vod,social-pusher,red5-pro-stream-aliasing-overview.md,red5-pro-single-port-muxing.md,red5-pro-webhooks-overview.md,red5-pro-thumbnails.md,red5-pro-castlabs-drm.md,red5-pro-castlabs-watermarking.md}, mirrors [https://www.red5.net/docs/red5-pro/users-guide/](https://www.red5.net/docs/red5-pro/users-guide/) same paths.

## Restreamer

The Restreamer Plugin integrates disparate video sources/services with Red5 Pro. It is enabled by default (servlet + all restreamer types), configured via `conf/restreamer-plugin.properties`. Supported source/target types:

- **File** — publish a video file as a live stream.
- **IP Cam** — pull from an internet camera.
- **MPEG-TS** — from video encoders, routers, etc.
- **SRT** — SRT-enabled devices.
- **RTMP** — pull from or push to other RTMP servers, including other Red5 Pro instances and social media platforms.
- **Zixi** — integrates directly with a Zixi Broadcaster, both push and pull.
- **WHIP** (Push mode) — enabled via `enable.whip=true`; thinly documented compared to the other types (no dedicated REST API page), verify against the restreamer server-configuration doc before relying on it.

Control is via REST: `POST` a JSON "provision" describing the restream (shape varies by restreamer type and mode). Actions are `create`, `kill` (stop/remove a running restream — default `persist` behavior means it reappears on server restart unless `persist=true` is set), and `list` (the default); `update` is additionally supported by a subset of restreamer types (e.g. File, RTMP). See [../api/README.md#restreamer](../api/README.md#restreamer).

> **Social Pusher is deprecated** (as of 14.1.0) in favor of the RTMP Push Restreamer, which serves the same purpose (forwarding a published stream to an RTMP/RTMPS endpoint such as Facebook or YouTube).

## Transcoder & ABR

The Transcoder converts a live stream into multiple formats/resolutions for **Adaptive Bitrate (ABR)** delivery, so playback quality can adjust to each viewer's device and network conditions. Configured via provisioning (REST); see [../api/README.md#transcoder](../api/README.md#transcoder). In a cluster, a dedicated **Transcoder node** (running Cauldron) sits in front of an origin — see [../server/clustering.md](../server/clustering.md).

## Mixer (Brew Mixer)

**Brew Mixer** is Red5 Pro's server-side Multipoint Control Unit (MCU), powered by the Cauldron media engine, for combining multiple live audio/video streams into one output (panel discussions, picture-in-picture layouts, live events). Controlled via a REST API supporting layout composition (`RenderTree`) and audio pan/volume control. In a cluster, a dedicated **Mixer node** sits in front of an origin. See [../api/README.md#mixer](../api/README.md#mixer) and, for autoscaled deployments, the Stream Manager 2.0 Streams Mixer API in [../stream-manager/README.md](../stream-manager/README.md).

## Recording & VOD

Two separate things: **recording** (getting a live stream saved to a file in the first place) and **VOD playback** (serving an existing media file on demand). Neither requires special *server* configuration, but recording is **opt-in per publish session** — a stream is not recorded automatically just because it's live.

### Recording a Live Stream

The **publishing client** must explicitly request record mode instead of the default live-only mode:

- WebRTC (`WHIPClient`): set `streamMode: 'record'` (or `'append'` to continue an existing recording) instead of `'live'` in the init config.
- iOS SDK: `publish(streamName, type: R5RecordTypeRecord)` instead of the default live type.
- Android SDK: `publish.publish(streamName, R5Stream.RecordType.Record)`.

Server-side, this creates a `.flv` file (Red5's native recording format) under `webapps/<app>/streams/<streamName>.flv` once the publisher stops; `.info`/`.ser` placeholder files exist while recording is in progress. If the HLS plugin is enabled, an HLS recording (`.ts` segments + `.m3u8`) is produced alongside it automatically. Convert the `.flv` to `.mp4` for browser playback — see [../protocols/README.md#converting-recordings-to-mp4](../protocols/README.md#converting-recordings-to-mp4). For autoscale/cloud deployments, recordings should target [cloud storage](../cloud/README.md) rather than local disk.

### VOD Playback

Given a compatible media file already sitting on the server (from a recording above, or uploaded directly), playback works with no special server config — just a Red5 Pro server instance and a player matching the protocol: **RTMP** (desktop), **RTSP** (mobile), or **HLS**. Since Flash is gone, browser-based VOD needs either an HLS player or an MP4-converted recording (same conversion step as above).

Note: VOD (playback of a completed recording) is distinct from **DVR** (rewind/seek within an in-progress live stream) — don't conflate the two when scoping a feature request.

## Other Notable Features

- **Stream Name Aliasing** — publish/play back a stream under a different name than it was published as; configured in `red5-common.xml` (`streamService` bean, `stripTypePrefix` property, etc.).
- **Single Port Muxing** — route multiple service endpoints (protocols) through a single externally-visible port, useful behind restrictive firewalls/NAT. Configured via `portMux`/`muxPortTCP` in `conf/red5pro-activation.xml` (current implementation still uses separate TCP and UDP ports internally).
- **Webhooks** — the `live` webapp can call a custom REST endpoint on stream lifecycle events, grouped into categories: `CONNECT`, `PUBLISH`, `SUBSCRIBE`, `WEBSOCKET`, `USER`, and `MEDIA` (`video-started`, `video-saved` — fired when the CloudStorage plugin finishes an upload, and `thumb-created` — fired when thumbnails are enabled; ties into Recording & VOD and Thumbnails below). Custom webapps can implement additional user-defined webhooks.
- **Thumbnails** — generate preview thumbnails for live streams; enable via `thumbnail.enabled=true` in `red5.properties`. When the CloudStorage plugin is enabled, thumbnails are pushed to cloud storage automatically.
- **DRM (Castlabs)** — encrypting live video via a third-party Castlabs library against the DRMtoday platform; requires a WebRTC SDK build with [Insertable Streams](https://developer.mozilla.org/en-US/docs/Web/API/Insertable_Streams_for_MediaStreamTrack_API) support.
- **Watermarking (Castlabs)** — single-frame forensic watermarking embedded during live broadcast playback; requires a separate Castlabs watermarking account.

## When to Fetch More

Exact REST provision JSON schemas (restreamer/transcoder/mixer), the full webhook event/payload catalog, and the Castlabs DRM/watermarking integration code are release-specific — pull them from the local cache at [`../_docs-cache/red5-pro/development/api/`](../_docs-cache/red5-pro/development/api/) or the corresponding page under [https://www.red5.net/docs/red5-pro/development/api/](https://www.red5.net/docs/red5-pro/development/api/) (or the specific feature's users-guide page) before writing integration code.
