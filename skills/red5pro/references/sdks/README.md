# Client & Backend SDKs

Source: live docs at [https://www.red5.net/docs/red5-cloud/development/sdks/](https://www.red5.net/docs/red5-cloud/development/sdks/), [https://www.red5.net/docs/red5-pro/development/sdks/](https://www.red5.net/docs/red5-pro/development/sdks/)

All Red5 client SDKs work against **both** a standalone Red5 Pro server (host/IP + port) and **Red5 Cloud** (Stream Manager host + node group) — the same client classes and publish/subscribe calls apply; only the connection config differs. See each platform file for the exact config shape.

## Platform Reference Files

- **[web-webrtc-sdk.md](web-webrtc-sdk.md)** — `red5pro-webrtc-sdk` (JS/TS, browser): `WHIPClient`/`WHEPClient` for publish/subscribe.
- **[android-sdk.md](android-sdk.md)** — Red5 Android SDK: `IRed5WebrtcClient` builder pattern; publish, subscribe, chat (PubNub), conferencing, stats.
- **[ios-sdk.md](ios-sdk.md)** — Red5 iOS SDK: `Red5WebrtcClientBuilder`/`Red5WebrtcClient`; publish, subscribe, chat, conferencing, SwiftUI-compatible.
- **[conference-sdk.md](conference-sdk.md)** — `red5pro-conference-sdk` (JS/npm): room-based multi-party conferencing client for web, with PubNub-powered chat/interactivity.
- **[backend-sdk.md](backend-sdk.md)** — Node / Java / Go server SDKs for generating conference and chat tokens without exposing master credentials to clients.
- **[core-sdk.md](core-sdk.md)** — Red5 Pro Core SDK: native C++ API for Linux/Windows/macOS clients (modular: r5core, r5common, r5device, r5ffmpeg, r5net, r5webrtc).

## Choosing a Route

- Browser app → [web-webrtc-sdk.md](web-webrtc-sdk.md).
- Native Android app → [android-sdk.md](android-sdk.md).
- Native iOS/SwiftUI app → [ios-sdk.md](ios-sdk.md).
- Multi-party video conferencing in the browser → [conference-sdk.md](conference-sdk.md) (or the conferencing sections of the Android/iOS SDKs for native apps).
- Server needs to mint short-lived, role-scoped tokens for conference/chat access → [backend-sdk.md](backend-sdk.md).
- Desktop/native (Linux/Windows/macOS) client outside a browser, or embedding Red5 connectivity into an existing C++ application → [core-sdk.md](core-sdk.md).

## Cross-Cutting Notes

- **License keys**: the native SDKs (Core, Android, iOS) perform a license check on client creation and will fail publish/subscribe without a valid Red5 Pro SDK license key.
- **Chat/interactivity**: Android, iOS, and the Conference SDK all use **PubNub** (publish/subscribe keys) for chat and signaling, layered on top of the WebRTC media path.
- **Conferencing platform support is inconsistent across the source docs.** The Android SDK docs explicitly state conferencing requires Red5 Cloud (Stream Manager) and does not work with standalone servers. The iOS and web Conference SDK docs don't state that restriction — the Conference SDK's `nodeGroup` config is documented as optional ("for autoscaling"), which reads as if standalone might work. Until this is confirmed with Red5 support, treat conferencing as **Red5 Cloud-only for all platforms** (the documented, tested claim) and flag the discrepancy rather than asserting standalone conferencing works.
