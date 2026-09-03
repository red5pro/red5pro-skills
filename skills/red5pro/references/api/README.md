# Server & Management REST APIs

Source: live docs at [https://www.red5.net/docs/red5-pro/development/api/](https://www.red5.net/docs/red5-pro/development/api/)

These are the HTTP REST APIs for controlling and inspecting a Red5 Pro deployment — distinct from the client SDKs (which handle publish/subscribe media). All are callable from any standard REST client (Red5 provides a Postman collection for the Server API).

## Server

Gather statistics for the server, its applications, connected clients, and streams over simple HTTP REST calls.

## Authentication

- **Round Trip Authentication API** — the request/response contract your remote validation service must implement. See [../authentication/README.md#round-trip-authentication](../authentication/README.md#round-trip-authentication).
- **Simple Authentication — Extending the Plugin** — how to override/extend the default `red5pro-simple-auth-plugin` behavior.

## Mixer

Standalone Brew Mixer API: create and control server-side A/V mixes (layouts via `RenderTree`, pan/volume control). See [../streaming-features/README.md#mixer-brew-mixer](../streaming-features/README.md#mixer-brew-mixer). For autoscaled deployments, use the Stream Manager 2.0 Streams Mixer API instead — see [../stream-manager/README.md](../stream-manager/README.md).

## Restreamer

`POST` a JSON "provision" to the Restreamer servlet (typically registered under the `live` webapp) to create/list/kill restream integrations (File, IP Cam, MPEG-TS, SRT, RTMP, Zixi). The provision body's `action` field is `create`, `list` (default), or `kill` (stops the restream; it reappears on server restart unless `persist=true` was set on create); `update` is additionally supported by a subset of restreamer types (e.g. File, RTMP). Body shape varies by restreamer type. In Stream Manager 2.0 deployments, use the Stream Manager 2.0 Restreamer examples/migration path instead of the standalone servlet directly. See [../streaming-features/README.md#restreamer](../streaming-features/README.md#restreamer).

## Transcoder

Provisioning API for the ABR Transcoder, plus documented code examples. See [../streaming-features/README.md#transcoder--abr](../streaming-features/README.md#transcoder--abr).

## Stream Manager 2.0

The full set of Admin / Auth / Proxy / Scheduling NodeGroups / Streams / Streams Provision / Streams Mixer APIs, plus an OpenAPI/Swagger UI and a CURL cheat-sheet. See [../stream-manager/README.md](../stream-manager/README.md) for the conceptual breakdown.

## Other APIs

Smaller, standalone REST APIs not covered above — named here so they're discoverable, detail deferred to the cache:

- **Bitrate API** — current bitrate/byterate of a live stream.
- **DVR API** (`LiveSeekClient`) — rewind/seek within an in-progress live stream; see [../streaming-features/README.md#recording--vod](../streaming-features/README.md#recording--vod) for how this differs from VOD.
- **Interstitial API** — ad/interstitial insertion, with separate standalone and Stream Manager (`/admin/interstitial`) variants.
- **Round Trip Time (RTT) API** — RTT calculation for RTSP/legacy SDK clients.

## Archive

Older/superseded API versions (Stream Manager REST API 1.0 through 4.0, the legacy Autoscale Client API, and the legacy Round Trip Auth doc) are documented at [https://www.red5.net/docs/red5-pro/development/api/archive/](https://www.red5.net/docs/red5-pro/development/api/archive/) for reference on legacy deployments — do not use these for new integrations; use Stream Manager 2.0 instead.

## When to Fetch More

This is a REST-API surface — exact endpoint paths, request/response JSON schemas, and auth headers are exactly the kind of fast-moving detail that should be pulled live from [https://www.red5.net/docs/red5-pro/development/api/](https://www.red5.net/docs/red5-pro/development/api/){server,mixer,restreamer,transcoder,authentication,stream-manager-2.0}/ (or the bundled Postman collection) rather than reconstructed from memory. Never fabricate a field name or endpoint.
