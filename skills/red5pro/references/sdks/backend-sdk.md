# Backend SDK (Token Generation)

Source: local cache [`../_docs-cache/red5-cloud/development/sdks/backend-sdk/`](../_docs-cache/red5-cloud/development/sdks/backend-sdk/){node,java,go-golang}/, mirrors [https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/){node,java,go-golang}/

Server-side SDKs for generating short-lived, role-scoped access tokens for **video conferences** and **chat messaging**, so clients never see your master credentials. Available for **Node**, **Java**, and **Go** — all three expose the same conceptual API (conference token generation, chat token generation, role-based permissions, expiration control).

> **Package status**: as documented, none of the three packages (`red5-bcs-node`, `red5-bcs-java` / Maven `net.red5:red5-bcs-java`, `github.com/red5pro/red5-bcs-go`) are published yet — contact Red5 support to obtain them.

## Client Setup

All three follow the same shape: construct a client from a master key + master secret (obtained from the Red5 Cloud panel).

**Node:**
```js
import Red5Client from 'red5-bcs-node';
const client = new Red5Client(masterKey, masterSecret);
```

**Java:**
```java
Red5Client client = new Red5Client(masterKey, masterSecret);
```

**Go:**
```go
client, err := red5bcs.NewRed5Client(masterKey, masterSecret)
```

## Conference Tokens

Generate a token for joining a video conference room. Node signature: `getConferenceToken(userId, roomId, role, expirationMinutes)`. Go: `GetConferenceToken(userId, roomId, role string, expirationMinutes int) (string, error)`.

Parameters:

| Parameter | Description |
|---|---|
| `userId` | Unique user ID |
| `roomId` | Conference room ID |
| `role` | `admin` (full access + management), `publisher` (can publish A/V), or `subscriber` (view-only) |
| `expirationMinutes` | Token validity duration |

```js
const conferenceToken = await client.getConferenceToken("someUser", "someRoom", "publisher", 60);
```

## Chat Tokens

Generate a token for secure real-time chat. Node signature: `getChatToken(userId, channelId, read, write, ttlMinutes)`.

| Parameter | Description |
|---|---|
| `userId` | Unique user identity |
| `channelId` | Chat channel/room ID |
| `read` / `write` | Boolean permission flags |
| `ttlMinutes` | Token validity duration |

## Security Best Practices (as documented)

- Store master credentials in environment variables, never in client code.
- Never generate tokens on the client — only on your backend.
- Serve everything over HTTPS.
- Keep token lifetimes short.
- Validate the user server-side before issuing a token.

## When to Fetch More

Full Java/Go method signatures beyond `getConferenceToken`/token-role tables, and any batch/refresh/revoke token APIs, should be confirmed against the local cache at [`../_docs-cache/red5-cloud/development/sdks/backend-sdk/`](../_docs-cache/red5-cloud/development/sdks/backend-sdk/){java,go-golang}/ (or [https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/](https://www.red5.net/docs/red5-cloud/development/sdks/backend-sdk/){java,go-golang}/ for the current version) — package availability in particular should be re-checked with Red5 support since it was unpublished at time of writing.
