_From: Android SDK_

## Chat Integration

The Red5 Android SDK includes built-in chat functionality using a channel-based architecture.

### Chat Setup

When building your `Red5WebrtcClient`, include your PubNub publish and subscribe keys.

```java
IRed5WebrtcClient webrtcClient = IRed5WebrtcClient.builder()
    .setActivity(this)
    .setLicenseKey(YOUR_SDK_LICENSE_KEY)
    .setChatUserId(USER_ID)
    // .setChatToken("") // Optional: Set chat token if auth is enabled
    .setPubnubPublishKey(YOUR_PUBNUB_PUBLISH_KEY)
    .setPubnubSubscribeKey(YOUR_PUBNUB_SUBSCRIBE_KEY)
    .setEventListener(this)
    .build();
```

#### Subscribe to a Channel

```java
@Override
public void onLicenseValidated(boolean validated, String message) {
    if (validated) {
        String channelName = "my-chat-room";
        webrtcClient.subscribeChatChannel(channelName);
    }
}
```

### Chat Operations

#### Send Text Messages

```java
String channelName = "my-chat-room";
String message = "Hello, everyone!";
Object metadata = null; // Optional metadata

webrtcClient.sendChatTextMessage(channelName, message, metadata);
```

#### Send JSON Messages

```java
JsonObject jsonMessage = new JsonObject();
jsonMessage.addProperty("text", "Hello!");
jsonMessage.addProperty("userName", "John");
jsonMessage.addProperty("timestamp", System.currentTimeMillis());

Object metadata = Map.of("sender", "John", "type", "greeting");

webrtcClient.sendChatJsonMessage(channelName, jsonMessage, metadata);
```

#### Other Operations

```java
// Unsubscribe
webrtcClient.unsubscribeChatChannel(channelName);

// Get Subscribed Channels
List<String> channels = webrtcClient.getSubscribedChatChannels();

// Disconnect
webrtcClient.disconnectChat();

// Destroy
webrtcClient.destroyChat();
```

### Listening for Chat Events

```java
@Override
public void onChatConnected() {
    Toast.makeText(this, "Chat connected", Toast.LENGTH_SHORT).show();
}

@Override
public void onChatDisconnected() {
    Toast.makeText(this, "Chat disconnected", Toast.LENGTH_SHORT).show();
}

@Override
public void onChatMessageReceived(String channel, JsonElement message) {
    if (message != null && message.isJsonObject()) {
        JsonObject jsonObject = message.asJsonObject();
        String text = jsonObject.get("text").getAsString();
        String userName = jsonObject.get("userName").getAsString();

        Log.d("Chat", "Message from " + userName + ": " + text);
    }
}

@Override
public void onChatSendSuccess(String channel, Long timetoken) {
    Log.d("Chat", "Message sent successfully with timetoken: " + timetoken);
}

@Override
public void onChatSendError(String channel, String errorMessage) {
    Toast.makeText(this, "Failed to send message: " + errorMessage, Toast.LENGTH_SHORT).show();
}
```
