// Red5 Cloud + PubNub — Text Chat (iOS)
//
// Verified against actual `red5pro-ios-sdk` Swift source
// (Red5PubNubClient.swift, Red5PubNubClientListener.swift,
// Red5WebrtcClient.swift). High confidence.
//
// IMPORTANT CORRECTION: Red5's own published ios-sdk docs show chat methods
// called directly on `webrtcClient` (e.g. `webrtcClient.subscribeChatChannel(...)`,
// `webrtcClient.sendChatTextMessage(...)`) and a delegate signature of
// `onChatMessageReceived(channel:message: JSONCodable)`. Neither matches the
// actual SDK source: chat lives on a separate `Red5PubNubClient` object with
// different method names, and the real delegate signature takes `message: Any`.
// This file reflects the verified source, not the (currently inaccurate)
// published docs.
//
// Conceptually replaces whatever your Agora integration currently uses to
// send/receive text messages in a channel (Agora's RTM or Chat product) —
// confirm your current Agora method names against Agora's own docs; not
// asserted here.

import Foundation
import Red5WebRTCKit
// Red5PubNubClient is a separate Swift Package product from Red5WebRTCKit
// (see Red5WebRTCKit/Package.swift) — add it explicitly in Package.swift /
// Xcode Package Dependencies alongside Red5WebRTCKit to get chat support.
import Red5PubNubClient

class ChatManager: Red5ProWebrtcEventDelegate {

    private var pubNubClient: Red5PubNubClient?
    private let channelName: String

    init(webrtcClient: Red5WebrtcClient, channelName: String) {
        self.channelName = channelName

        // Chat runs through a dedicated Red5PubNubClient, built from the
        // Red5WebrtcClient's config and a delegate conforming to
        // Red5ProWebrtcEventDelegate (this class, in this example).
        pubNubClient = Red5PubNubClient(
            config: webrtcClient.getConfig(),
            webrtcClientListener: self
        )
    }

    // --- Sending ---

    func subscribeAndConnect() {
        pubNubClient?.subscribeChannel(channelName: channelName)
    }

    func sendChatMessage(_ text: String) {
        pubNubClient?.sendTextMessage(channelName: channelName, message: text, metaData: nil)
    }

    // For structured payloads instead of plain text:
    // pubNubClient?.sendJsonMessage(channelName: channelName, jsonObject: jsonObject, metaData: nil)

    // --- Receiving (Red5ProWebrtcEventDelegate) ---

    func onChatConnected() {
        print("Chat connected")
    }

    func onChatDisconnected() {
        print("Chat disconnected")
    }

    // Note the real protocol signature takes `message: Any`, not `JSONCodable`.
    func onChatMessageReceived(channel: String, message: Any) {
        print("Received message in \(channel): \(message)")
    }

    func onChatSendSuccess(channel: String, timetoken: NSNumber) {
        print("Message delivered at \(timetoken)")
    }

    func onChatSendError(channel: String, errorMessage: String) {
        print("Failed to send message: \(errorMessage)")
    }
}
