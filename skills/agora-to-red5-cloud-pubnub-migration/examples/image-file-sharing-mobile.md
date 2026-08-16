# Image/File Sharing on iOS and Android — Known Gap

Unlike the HTML5 Conference SDK ([image-file-sharing-html5.js](image-file-sharing-html5.js)), **neither the iOS nor the Android Red5 SDK currently wraps PubNub's File Sharing API.** They only expose text and JSON chat messages natively:

- iOS: `sendTextMessage` / `sendJsonMessage` on `Red5PubNubClient` — verified against actual SDK source, see [chat-messaging-ios.swift](chat-messaging-ios.swift).
- Android: `sendChatTextMessage` / `sendChatJsonMessage` on `IRed5WebrtcClient` — verified against actual SDK source, see [chat-messaging-android.java](chat-messaging-android.java).

This was checked by grepping the actual `red5pro-ios-sdk` and `red5pro-android-sdk` source for a file/image send method on both platforms — none found on either. If migrating an Agora app that sends image/file attachments from a native mobile client, plan for one of these two workarounds:

## Option 1 — Upload to your own storage, send the URL as a chat message

Upload the image/file to your own backend or object storage (S3, a Red5 Backend SDK endpoint, etc.), then send a JSON chat message referencing the resulting URL:

- iOS: `pubNubClient.sendJsonMessage(channelName:jsonObject:metaData:)`
- Android: `webrtcClient.sendChatJsonMessage(channelName, jsonObject, metaData)`

This is the lower-risk option since it only relies on the already-verified JSON messaging methods, not on any file-specific API.

## Option 2 — Call PubNub's native File Sharing API directly

Both platforms can talk to PubNub's File Sharing feature directly, bypassing Red5's wrapper entirely, using the same publish/subscribe keys from the Red5 Cloud [Dev Resources](https://cloud.red5.net/resources) page:

- **iOS**: `Red5PubNubClient` (the separate Swift Package product you already added for chat — see [chat-messaging-ios.swift](chat-messaging-ios.swift)) declares `PubNubSDK` as a dependency in `Package.swift`, so once that product is in your target, PubNub's Swift SDK is already resolvable — no extra package to add. Use PubNub's own Swift SDK file-sharing calls (`sendFile`, `listFiles`, `downloadFile`, etc.) against the same channel you're already using for chat.
- **Android**: the Red5 Android SDK's `build.gradle` already declares `com.pubnub:pubnub-gson:11.0.0` as an `api` dependency (not `implementation`), so it's already transitively exposed to your app module — no extra dependency to add. Use PubNub's own Java/Kotlin SDK file-sharing calls against the same channel you're already using for chat.

This gives you the full PubNub File Sharing feature set (matching what the HTML5 Conference SDK already wraps), at the cost of maintaining a second, parallel PubNub integration alongside Red5's chat wrapper — the Red5 SDK's own `PubnubClient`/`Red5PubNubClient` classes don't expose file methods, so you'd be calling the underlying PubNub client object directly for that piece.

## Recommendation

If the Agora migration only needs simple "here's a link to an image" behavior, Option 1 is simpler and stays inside Red5's already-verified chat API. If it needs full parity with the HTML5 flow (upload progress, PubNub-hosted storage, `listFiles`/`deleteFile` history), Option 2 is closer on both platforms now that the PubNub dependency is confirmed already present — but confirm current PubNub Swift/Kotlin SDK method names against PubNub's own docs before writing migration code, since only the dependency presence was verified here, not the file-sharing method signatures themselves.
