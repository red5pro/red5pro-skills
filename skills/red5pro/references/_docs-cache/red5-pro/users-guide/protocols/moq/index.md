---
title: Media over QUIC (MOQ)
description: Overview of the MOQ streaming protocol in Red5 Pro
menu_order: 8
---

Media over QUIC (MOQ) is an IETF draft protocol for low-latency media streaming built on top of QUIC and WebTransport. Red5 Pro supports MoQ through the `moq-plugin`, which embeds a full MoQ relay server directly into the Red5 Pro Server runtime.

## Why MOQ

- **Sub-second latency**: QUIC's connection establishment and stream multiplexing eliminate the head-of-line blocking that affects TCP-based protocols
- **WebTransport support**: Browser clients connect via the WebTransport API without plugins, using the same QUIC connection as native MoQ clients
- **Congestion-aware delivery**: QUIC's built-in congestion control handles packet loss without stream stalls
- **Firewall traversal**: WebTransport over HTTP/3 passes through firewalls that block UDP, with a WebSocket tunnel fallback for restricted environments
- **Pub/sub architecture**: Publishers push named tracks; subscribers request tracks by name — no SDP negotiation required

## Supported Protocol Versions

| Protocol | Versions | Use Case |
|----------|----------|----------|
| MoQ Transport | drafts 14–16 | Full-featured streaming, VOD, FETCH, catalog discovery |
| MoQ Lite | drafts 1–4 | Real-time conferencing, low-complexity clients |

The relay auto-negotiates the highest mutually supported draft version. MoQ Transport and MoQ Lite clients can interoperate through the relay's cross-protocol relay capability.

## Media Packaging Formats

| Format | Specification | Description |
|--------|---------------|-------------|
| LOC | draft-mzanaty-moq-loc | Low Overhead Container — capture timestamps and frame marking (default) |
| MOQMI | draft-cenzano-moq-media-interop | Media Interoperability — H.264/Opus metadata via extension headers |
| Hang | draft-lcurley-moq-hang | Simple container: `[varint timestamp][codec payload]` |
| CMAF | ISO/IEC 23000-19 | Common Media Application Format (fMP4 fragments) |

## Getting Started

See the [MOQ User's Guide](/docs/red5-pro/users-guide/moq/) for installation, configuration, and deployment instructions.
