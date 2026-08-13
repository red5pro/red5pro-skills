_From: iOS SDK_

## Conferencing (Multi-user Rooms)

Join multi-user conference rooms to publish and subscribe to multiple participants.

### Step 1: Join a Room

```swift
let roomId = "myConferenceRoom"
let userId = "user123"
let role = "publisher" // or "subscriber"
let metadata = "{\"displayName\": \"John Doe\"}"

webrtcClient.join(roomId: roomId, streamName: userId, role: role, metadata: metadata)
```

### Step 2: Handle Room Events

Implement `ConferenceDelegate` to be notified when participants join or leave:

| Event | Description | Parameters |
|---|---|---|
| `onJoinRoomSuccess` | Successfully joined room | `roomId: String, participants: [Red5ConferenceParticipant]` |
| `onJoinRoomFailed` | Failed to join room | `statusCode: Int, message: String` |
| `onParticipantJoined` | New participant joined | `uid: String, role: String, metaData: String, videoEnabled: Bool, audioEnabled: Bool, renderer: RTCVideoRenderer?` |
| `onParticipantLeft` | Participant left room | `uid: String` |
| `onParticipantMediaUpdate` | Participant's media state changed | `uid: String, videoEnabled: Bool, audioEnabled: Bool, timestamp: Int64` |
| `onParticipantRendererUpdate` | Participant's video renderer updated | `uid: String, renderer: RTCVideoRenderer` |

```swift
extension YourManager: ConferenceDelegate {
    func onJoinRoomSuccess(roomId: String, participants: [Red5ConferenceParticipant]) {
        print("Joined room: \(roomId)")
    }

    func onParticipantJoined(uid: String, role: String, metaData: String,
                             videoEnabled: Bool, audioEnabled: Bool,
                             renderer: RTCVideoRenderer?) {
        print("Participant joined: \(uid)")
        // Attach renderer if available
    }
}
```

### Step 3: Leave Room

```swift
webrtcClient.leave()
```
