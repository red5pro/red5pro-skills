// Red5 Cloud + PubNub — Text Chat (HTML5 Conference SDK)
//
// Verified against actual `red5pro-conference-sdk-core` TypeScript source
// (ConferenceClient.ts) and production usage in the TrueTime Meetings app's
// useChat.ts. High confidence.
//
// Conceptually replaces whatever your Agora integration currently uses to
// send/receive text messages in a channel (Agora's RTM or Chat product) —
// confirm your current Agora method names against Agora's own docs; not
// asserted here.
//
// Assumes `client` is an already-configured, joined `ConferenceClient`
// (pubnubPublishKey / pubnubSubscribeKey set, `client.join(...)` resolved).
// See ../../red5pro/references/sdks/conference-sdk.md for setup.

// --- Sending ---
//
// Use sendEvent(), not the simpler sendChatMessage() helper. sendChatMessage()
// sends over the active publisher's WebRTC data channel, which only works
// while you're publishing and produces a different message shape than what's
// used below. sendEvent() goes over PubNub and is what the production app
// actually uses, so it works the same way for publishers and subscribers and
// is consistent with the file-sharing flow (image-file-sharing-html5.js).
function sendChatMessage(client, userName, text) {
  client.sendEvent(ChatEventTypes.MESSAGE_RECEIVED, {
    message: text,
    name: userName,
    date: new Date().toString(),
  });
}

// --- Receiving ---
//
// CHAT_MESSAGE also fires for reactions, raised-hand, and mute-request
// events (they share the same PubNub channel with different eventType
// values), so filter on eventType to isolate plain text chat.
function listenForChatMessages(client, onTextMessage) {
  client.addEventListener(ConferenceEvents.CHAT_MESSAGE, (e) => {
    const { message, publisher, timetoken } = e.detail.messageEvent;

    if (message.eventType === ChatEventTypes.MESSAGE_RECEIVED) {
      onTextMessage({
        text: message.message,
        senderName: message.name,
        publisher,
        timetoken,
      });
    }
  });
}

// Example wiring:
//
// listenForChatMessages(client, ({ text, senderName }) => {
//   console.log(`${senderName}: ${text}`);
// });
//
// sendChatMessage(client, myUserName, 'Hello everyone!');
