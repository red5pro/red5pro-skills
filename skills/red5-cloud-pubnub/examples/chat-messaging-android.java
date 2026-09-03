// Red5 Cloud + PubNub — Text Chat (Android)
//
// Verified against actual `red5pro-android-sdk` source
// (IRed5WebrtcClient.java, Red5WebrtcClient.java, PubnubClient.java).
// High confidence. Unlike iOS — where chat lives on a separate
// Red5PubNubClient object and the published docs had wrong method names —
// Android's chat methods really do live directly on IRed5WebrtcClient
// exactly as Red5's published android-sdk docs describe; Red5WebrtcClient
// internally wraps a PubnubClient instance and delegates to it.
//
// Conceptually replaces whatever your Agora integration currently uses to
// send/receive text messages in a channel (Agora's RTM or Chat product) —
// confirm your current Agora method names against Agora's own docs; not
// asserted here.

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import net.red5.android.api.IRed5WebrtcClient;

public class ChatManager implements IRed5WebrtcClient.Red5EventListener {

    private final IRed5WebrtcClient webrtcClient;
    private final String channelName;

    public ChatManager(IRed5WebrtcClient webrtcClient, String channelName) {
        this.webrtcClient = webrtcClient;
        this.channelName = channelName;
    }

    // --- Sending ---
    //
    // webrtcClient must have been built with setChatUserId(...),
    // setPubnubPublishKey(...), and setPubnubSubscribeKey(...) via
    // Red5WebrtcClientBuilder for chat to be initialized at all.

    public void subscribeAndConnect() {
        webrtcClient.subscribeChatChannel(channelName);
    }

    public void sendChatMessage(String text) {
        webrtcClient.sendChatTextMessage(channelName, text, null);
    }

    // For structured payloads instead of plain text:
    public void sendChatJsonMessage(String text, String userName) {
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.addProperty("text", text);
        jsonMessage.addProperty("userName", userName);
        webrtcClient.sendChatJsonMessage(channelName, jsonMessage, null);
    }

    public void teardown() {
        webrtcClient.unsubscribeChatChannel(channelName);
        webrtcClient.disconnectChat();
        webrtcClient.destroyChat();
    }

    // --- Receiving (Red5EventListener chat callbacks) ---
    //
    // Red5EventListener is a plain interface (no default methods), so a real
    // implementation must also provide the non-chat callbacks (publish,
    // subscribe, connection state, onRtcStats, etc.) — omitted below for
    // brevity since they're unrelated to chat.

    @Override
    public void onChatConnected() {
        // Connected to the PubNub chat service.
    }

    @Override
    public void onChatDisconnected() {
        // Disconnected from the PubNub chat service.
    }

    @Override
    public void onChatMessageReceived(String channel, JsonElement message) {
        if (message != null && message.isJsonObject()) {
            JsonObject jsonObject = message.asJsonObject();
            String text = jsonObject.has("text") ? jsonObject.get("text").getAsString() : null;
            String userName = jsonObject.has("userName") ? jsonObject.get("userName").getAsString() : null;
            // Handle the incoming message (update UI, etc).
        }
    }

    @Override
    public void onChatSendSuccess(String channel, Long timetoken) {
        // Message delivered successfully.
    }

    @Override
    public void onChatSendError(String channel, String errorMessage) {
        // Message failed to send.
    }

    @Override
    public void onChatError(String error) {
        // General chat error (e.g. PubNub dependency missing from build.gradle).
    }

    // ... other Red5EventListener callbacks (publish/subscribe/lifecycle) omitted for brevity.
}
