# Red5 Pro Core SDK (Native / C++)

Source: live docs at [https://www.red5.net/docs/red5-pro/development/sdks/red5-core-sdk/](https://www.red5.net/docs/red5-pro/development/sdks/red5-core-sdk/)

For native applications on **Linux, Windows, and macOS**. Provides a unified C++ API to connect to the Red5 Pro Server and build media applications, with a modular structure so you only link what you need.

## Modules

- **r5core** — the main module: server connection control and media processing. Exposes the `Client` object (via the `IClient` interface), which controls one server connection and sets up subscriber or publisher dataflow for video, audio, and metadata. Also performs SDK license validation. **Currently supports RTSP and WebRTC connections.**
- **r5common** — shared objects/utilities used across modules: the `ILogger` interface and default logger implementations, media descriptions/structures, codec descriptions, and utilities (circular buffer, text drawing). Required by every other module.
- **r5device** — enumerates and accesses Camera, Microphone, and Speakers, with per-platform device implementations. Device objects implement the corresponding source/renderer interfaces for use with `IClient`.
- **r5ffmpeg** — an FFmpeg-based universal encoder/decoder covering all supported formats, kept as a separate module to isolate the FFmpeg link dependency from `r5core`.
- **r5net** — unified HTTP and WebSocket connection service library.
- **r5webrtc** — WebRTC signaling and full connection implementation for publisher and subscriber roles. Usable either to complete signaling for an external WebRTC implementation (e.g. LibWebRTC) or to directly publish/subscribe streams against a Red5 Pro Server.

`r5core` links most of the above together for convenience, but each module can be used independently (all require `r5common`).

## When to Use This vs. a Client SDK

Use the Core SDK when building a **native desktop/embedded** client (Linux/Windows/macOS) or integrating Red5 connectivity into an existing native C++ codebase. For browser, Android, or iOS apps, use the platform-specific SDK instead — see [README.md](README.md).

## When to Fetch More

Concrete `IClient`/module API signatures, build instructions per platform, and example projects are at [https://www.red5.net/docs/red5-pro/development/sdks/red5-core-sdk/examples/](https://www.red5.net/docs/red5-pro/development/sdks/red5-core-sdk/examples/) — pull those before writing integration code, since class/method-level detail was out of scope for what was reviewed here.
