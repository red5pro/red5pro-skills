_From: iOS SDK_

## Chat Support

The SDK includes built-in chat support via PubNub.

### Step 1: Configure Chat

Use `Red5WebrtcClientBuilder` to set your PubNub keys:

```swift
let webrtcClient = Red5WebrtcClientBuilder()
    .setPubnubPublishKey("your_publish_key")
    .setPubnubSubscribeKey("your_subscribe_key")
    // ... other config
    .build()
```

### Step 2: Join and Send Messages

```swift
// Subscribe to a channel
webrtcClient.subscribeChatChannel(channelName: "main-chat")

// Send a text message
webrtcClient.sendChatTextMessage(channelName: "main-chat", message: "Hello World!", metaData: nil)
```

### Step 3: Receive Messages

Implement `onChatMessageReceived` in your `Red5ProWebrtcEventDelegate`:

```swift
func onChatMessageReceived(channel: String, message: JSONCodable) {
    print("Received message in \(channel): \(message)")
}
```

### Chat Events

| Event | Description |
|---|---|
| `onChatConnected()` | Successfully connected to chat service |
| `onChatDisconnected()` | Disconnected from chat service |
| `onChatMessageReceived(channel:message:)` | New chat message received |
| `onChatSendSuccess(channel:timetoken:)` | Message sent successfully |
| `onChatSendError(channel:errorMessage:)` | Failed to send message |
