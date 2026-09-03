# Streaming Protocols

Source: live docs at [https://www.red5.net/docs/red5-pro/users-guide/protocols/](https://www.red5.net/docs/red5-pro/users-guide/protocols/)

Red5 Pro supports several ingest/playback protocols simultaneously on the same server. Which one you use depends on the client.

## WebRTC (incl. WHIP/WHEP)

Runs on the standard HTTPS port (443). Publishing via WebRTC **requires a valid SSL certificate** for a registered domain — see [../server/installation.md#ssl](../server/installation.md#ssl). Without SSL you can only do local (same-machine or same-LAN, subscribe-only) testing; some browsers block insecure WebRTC even on `localhost`.

Since the `11.0.0` Red5 Pro WebRTC SDK release, the server and SDK support **WHIP** (WebRTC-HTTP Ingest Protocol) for publishing and **WHEP** (WebRTC-HTTP Egress Protocol) for playback — HTTP/S-negotiated WebRTC that removes the need for a WebSocket round trip for signaling, giving faster connection times. `WHIPClient`/`WHEPClient` were introduced in `11.0.0` as extensions of the older WebSocket-based `RTCPublisher`/`RTCSubscriber` — but as of the `15.0.0` full TypeScript rewrite, `RTCPublisher`/`RTCSubscriber` were **removed as a breaking change**; `WHIPClient`/`WHEPClient` are now the only clients (see [../sdks/web-webrtc-sdk.md](../sdks/web-webrtc-sdk.md)). Enabling WHIP/WHEP on a self-hosted server requires adding a filter (ahead of the WebSocket filter, but after any CORS filter) to the webapp's `web.xml` — see [https://www.red5.net/docs/red5-pro/users-guide/red5-pro-whip-and-whep-configuration/](https://www.red5.net/docs/red5-pro/users-guide/red5-pro-whip-and-whep-configuration/).

Common WebRTC terms you'll encounter in configuration/debugging: **ICE** (connectivity establishment / NAT traversal), **STUN**/**TURN** (NAT traversal helpers), **DTLS** (UDP + security), **SDP** (session description), **NACK**/**PLI** (loss-recovery signaling).

### Debugging a Failed WebRTC Connection

Most "won't connect" reports come down to one of these — check in order:

1. **No/invalid SSL certificate on a non-localhost host.** WebRTC publish requires HTTPS on a registered domain (see [../server/installation.md#ssl](../server/installation.md#ssl)); some browsers silently refuse insecure WebRTC even on `localhost`.
2. **Firewall/NAT blocking the media path.** ICE negotiates a peer connection over UDP; a restrictive corporate firewall or symmetric NAT on either end can block it even though the HTTPS/signaling request succeeds. A TURN server (relaying media instead of a direct peer path) is usually the fix — see [https://www.red5.net/docs/red5-pro/users-guide/protocols/webrtc/red5-pro-turnstun/](https://www.red5.net/docs/red5-pro/users-guide/protocols/webrtc/red5-pro-turnstun/) for running your own.
3. **Wrong endpoint/app/stream-name construction** — see Connection URLs below; a WHIP/WHEP endpoint pointed at the wrong app scope or node group fails at the signaling step, before ICE even starts.
4. **Auth rejecting the connection silently as a "failed to connect"** rather than a clear 401/403 in application logs — see [../authentication/README.md](../authentication/README.md).

For live diagnosis in Chrome, `chrome://webrtc-internals` shows the ICE candidate exchange and connection state transitions for the active session — the fastest way to tell "never got a candidate pair" (NAT/firewall) apart from "connected then dropped" (media/bandwidth) apart from "never started negotiating" (signaling/auth failed before ICE).

## Connection URLs

What to hand a third-party publisher (OBS, FFmpeg, an IP camera) or construct in a client SDK, by protocol. `<app>` defaults to `live` unless your deployment uses a different webapp name.

| Protocol | Standalone Red5 Pro | Red5 Cloud (Stream Manager) |
|---|---|---|
| RTMP publish | `rtmp://<host>:1935/<app>/<streamName>` | Red5 Cloud has an RTMP proxy feature (see [../cloud/README.md](../cloud/README.md#other-documented-capabilities)) but the exact connection-URL pattern isn't covered by what's cached here — get it from the node group's connection info in the Cloud UI rather than guessing. |
| RTSP publish | `rtsp://<host>:8554/<app>/<streamName>` (`8554` is Red5 Pro's default RTSP port) | Not documented in what's cached here — verify with Red5 support before relying on a specific port/path. |
| WHIP publish | `https://<host>/<app>/whip/endpoint/<streamName>` | `https://<deployment>.cloud.red5.net/as/v1/proxy/whip/<app>/<streamName>` |
| WHEP subscribe | `https://<host>/<app>/whep/endpoint/<streamName>` | `https://<deployment>.cloud.red5.net/as/v1/proxy/whep/<app>/<streamName>` |

**Auth over RTMP** (e.g. from FFmpeg, or OBS's "Custom Streaming Server" URL field): append credentials as a query string on the connection URL, *before* the stream name segment — `rtmp://<host>:1935/<app>?username=<u>&password=<p>&token=<t>/<streamName>`. See [../authentication/README.md](../authentication/README.md) for what populates `username`/`password`/`token` under each auth mechanism.

**OBS quick config**: Stream Type "Custom Streaming Server", URL `rtmp://<host>:1935/<app>`, Stream Key `<streamName>` (OBS appends the key to the URL itself — don't include the stream name in the URL field).

**FFmpeg quick example** (publish a file over RTMP):
```bash
ffmpeg -re -i input.mp4 -c:v libx264 -profile:v baseline -c:a aac -f flv rtmp://<host>:1935/live/<streamName>
```

## RTMP / ERTMP

RTMP (Real-Time Messaging Protocol) is the original TCP-based protocol Red5 (open source) was built around, originally for Flash. As of Red5 Pro **v14.0**, **ERTMP v2** (Enhanced RTMP) was introduced: backwards-compatible with RTMP, adding support for additional codecs such as H.265. Red5 Pro also supports **RTMPS** (RTMP over SSL, default port `8443`) for encrypted RTMP; the older RTMPE has been deprecated and removed.

## RTSP

RTSP (Real Time Streaming Protocol) is a network control protocol for streaming media servers, typically paired with RTP/RTCP for media delivery. **The Red5 Pro iOS and Android Mobile SDKs use RTSP** as their streaming transport (distinct from the WebRTC-based Web SDK). RTSP is also a documented **pull-ingest** path via the IP Camera Restreamer (RTP/RTCP over interleaved TCP, H.264/H.265 video, AAC/PCMU/PCMA audio) — see [../streaming-features/README.md#restreamer](../streaming-features/README.md#restreamer).

## HLS

The HLS plugin (`red5pro-mpegts-plugin-*.jar`) converts live streams into an MPEG-TS transport stream with an `.m3u8` playlist — a sliding window of short media segments played as one continuous stream. Supports H.264/AAC only, and passes media through as-is (no re-encode, no multi-bitrate variants). Expect **12–30 seconds of latency** — not suitable for real-time use cases. If you don't need HLS, removing the plugin improves server performance.

## Third-Party Publishers

Documented, recommended settings exist for pushing into Red5 Pro via RTMP/RTSP from: **OBS** (Open Broadcaster Software), **Wirecast**, and **FFmpeg** (Flash Media Live Encoder is also documented but deprecated — don't recommend it). For OBS and Wirecast specifically, the docs call out **x264 codec + baseline profile as an absolute requirement** for the stream to work, not just a tuning suggestion.

## Converting Recordings to MP4

Recordings are captured in Red5 Pro's native format; a documented pipeline (post-process file conversion, FFmpeg-based, plus an HLS-append-recording path) converts them to MP4 for browser-based VOD playback, since Flash-based FLV playback is no longer viable. See [../streaming-features/README.md#recording--vod](../streaming-features/README.md#recording--vod).

## When to Fetch More

Codec-level details, FFmpeg build/server-configuration flags, and third-party publisher software version specifics change independently of Red5 Pro — verify against the live docs at [https://www.red5.net/docs/red5-pro/users-guide/protocols/](https://www.red5.net/docs/red5-pro/users-guide/protocols/) for the protocol in question before giving exact command-line flags.
