// Red5 Cloud + PubNub — Image/File Sharing (HTML5 Conference SDK)
//
// Verified against actual `red5pro-conference-sdk-core` TypeScript source
// (ConferenceClient.ts) and production usage in the TrueTime Meetings app's
// useChat.ts. High confidence.
//
// Conceptually replaces whatever your Agora integration currently uses to
// send/receive image or file attachments in a channel — confirm your
// current Agora method names against Agora's own docs; not asserted here.
//
// The Conference SDK wraps PubNub's File Sharing API directly, so uploading
// and broadcasting an attachment is a two-call flow: upload the file(s),
// then publish a chat message that references the uploaded file(s).
//
// Assumes `client` is an already-configured, joined `ConferenceClient` (see
// chat-messaging-html5.js and ../../red5pro/references/sdks/conference-sdk.md).

// --- Sending ---
async function sendImageMessage(client, userName, messageText, imageFile) {
  // Upload one or more files. sendFiles() accepts an array, so batch
  // multiple attachments in a single call if needed.
  const fileResults = await client.sendFiles([imageFile]);

  // Broadcast a chat message that references the uploaded file(s). This is
  // the same underlying event shape as a plain text message
  // (chat-messaging-html5.js) — files just travel alongside it.
  client.sendMessageWithFiles(messageText, userName, fileResults);
}

// --- Receiving ---
function listenForImageMessages(client, onImageMessage) {
  client.addEventListener(ConferenceEvents.CHAT_MESSAGE, (e) => {
    const { message } = e.detail.messageEvent;

    if (message.eventType === ChatEventTypes.MESSAGE_RECEIVED && message.files?.length) {
      const images = message.files.map((file) => ({
        id: file.id,
        name: file.name,
        // Resolve a URL to display the image directly.
        url: client.getFileUrl(file.id, file.name),
      }));

      onImageMessage({ text: message.message, senderName: message.name, images });
    }
  });
}

// --- Other file operations ---

// Fetch the raw file bytes instead of just a URL (e.g. to save locally).
async function downloadSharedFile(client, fileId, fileName) {
  return client.downloadFile(fileId, fileName);
}

// Page through files already shared in the current room.
async function listSharedFiles(client, limit = 100) {
  return client.listFiles(limit);
}

// Remove a shared file.
async function deleteSharedFile(client, fileId, fileName) {
  return client.deleteFile(fileId, fileName);
}

// Example wiring:
//
// listenForImageMessages(client, ({ text, senderName, images }) => {
//   console.log(`${senderName}: ${text}`, images);
// });
//
// const fileInput = document.querySelector('input[type="file"]');
// fileInput.addEventListener('change', () => {
//   sendImageMessage(client, myUserName, 'Check out this screenshot!', fileInput.files[0]);
// });
