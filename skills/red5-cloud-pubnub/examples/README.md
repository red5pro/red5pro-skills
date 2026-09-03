# Chat & File-Sharing Migration Examples

Real, working code for the two things a user migrating off Agora RTM/Chat most often needs first: sending/receiving text chat, and sending/receiving image/file attachments, on Red5 Cloud + PubNub. These are conceptually what replaces Agora's separate RTM/Chat product once video/audio has moved to Red5's WHIP/WHEP client SDKs (see [../references/migration-guide.md](../references/migration-guide.md) for the full concept mapping).

Unlike the conceptual mapping table in the migration guide, these files are meant to be copy-pasteable starting points — but keep the verification level below in mind before shipping them as-is.

## Verification Level

Per file, how each example was checked (see this skill's own [Guardrails](../SKILL.md#guardrails) and the parent `red5pro` skill's source-of-truth discipline):

| File | Platform | Verified against |
|---|---|---|
| [chat-messaging-html5.js](chat-messaging-html5.js) | HTML5 (Conference SDK) | Actual `red5pro-conference-sdk-core` TypeScript source + production usage in the TrueTime Meetings app. High confidence. |
| [image-file-sharing-html5.js](image-file-sharing-html5.js) | HTML5 (Conference SDK) | Same as above. High confidence. |
| [chat-messaging-ios.swift](chat-messaging-ios.swift) | iOS | Actual `red5pro-ios-sdk` Swift source (`Red5PubNubClient.swift`, `Red5WebrtcClient.swift`). Note: this corrects method names (`subscribeChannel`/`sendTextMessage`, not `subscribeChatChannel`/`sendChatTextMessage`) that appear in Red5's own published `ios-sdk` docs but don't exist in the actual SDK source — see the note at the top of the file. |
| [chat-messaging-android.java](chat-messaging-android.java) | Android | Actual `red5pro-android-sdk` Java source (`IRed5WebrtcClient.java`, `Red5WebrtcClient.java`, `PubnubClient.java`). High confidence. Unlike iOS, Android's published docs turned out to be accurate — chat methods really do live directly on `IRed5WebrtcClient`, which internally wraps a `PubnubClient` and delegates to it. |
| [image-file-sharing-mobile.md](image-file-sharing-mobile.md) | iOS + Android | Documents a real gap: neither mobile SDK wraps PubNub's File Sharing API today. Verified by absence against actual source on both platforms — grepped the iOS SDK and the Android SDK source for a file/image send method and found none on either. |

## What These Replace (Conceptual, Agora Side)

Per this skill's guardrails, no specific Agora class/method name is asserted as current fact. Conceptually, these examples replace whatever your Agora integration currently uses for:

- Sending/receiving text messages in a channel (Agora's RTM or Chat product, in whichever generation your app uses).
- Sending/receiving image or file attachments in a channel.

Confirm your current Agora SDK's exact method names against Agora's own docs before diffing your migration against these examples — this skill doesn't have Agora source to verify against.

## Files

- **[chat-messaging-html5.js](chat-messaging-html5.js)** — send/receive text chat, Conference SDK.
- **[chat-messaging-ios.swift](chat-messaging-ios.swift)** — send/receive text chat, iOS.
- **[chat-messaging-android.java](chat-messaging-android.java)** — send/receive text chat, Android.
- **[image-file-sharing-html5.js](image-file-sharing-html5.js)** — send/receive image/file attachments, Conference SDK.
- **[image-file-sharing-mobile.md](image-file-sharing-mobile.md)** — image/file attachment workarounds for iOS and Android (no native SDK support yet).

Full platform reference docs (broader than chat): [../../red5pro/references/sdks/README.md](../../red5pro/references/sdks/README.md).
