# Authentication

Source: live docs at [https://www.red5.net/docs/red5-pro/users-guide/authentication/](https://www.red5.net/docs/red5-pro/users-guide/authentication/), [https://www.red5.net/docs/red5-cloud/users-guide/authentication/](https://www.red5.net/docs/red5-cloud/users-guide/authentication/)

**Red5 Pro (standalone/self-hosted) ships three mechanisms; Red5 Cloud ships two different ones, configured per node group in the Cloud UI instead of server config files.** They apply to RTMP, RTSP, and WebRTC/WHIP/WHEP clients alike — see [WebRTC/WHIP/WHEP Clients](#webrtcwhipwhep-clients) below for how the credentials get passed on that transport specifically.

## Red5 Pro (Standalone)

Three distinct mechanisms for controlling `publish`/`subscribe` access. They are not mutually exclusive layers of one system — pick the one that matches your architecture.

## Round Trip Authentication

Class: `RoundTripAuthValidator`. A remote-server authorization mediator: the Red5 Pro webapp asks a **remote service** (your own auth server) to validate a `publish` or `subscribe` request, using Red5 Pro's security hooks to detect the requested action type. Your remote service applies whatever business logic it wants and returns a JSON result.

- A client missing the `username`/`password`/`token` connection parameters entirely is rejected immediately at connect time. The **remote round-trip** to your validation server, specifically, only fires when the client requests `publish` or `subscribe` — a connect-time credential-presence check happens before that, so don't rule out connect-time auth when debugging a rejected connection.
- Clients are authenticated **distinctly by role** (publisher vs. subscriber), so you can allow a client to subscribe but deny it the ability to publish (or vice versa).
- Best fit: you already have a backend that owns user/session state and want Red5 Pro to defer authorization decisions to it.

## JWT Authentication

Class: `JwtAuthenticator`. Validates JSON Web Tokens ([RFC 7519](https://tools.ietf.org/html/rfc7519)) **locally**, using standard JWT libraries and cryptographic signatures — no round trip to a remote server per request. Validates claims including expiration, issuer, roles, transport restrictions, and room restrictions.

- Best fit: modern architectures where tokens are already issued by an external identity provider / auth service, and you want stateless validation without a round-trip call on every stream operation.
- This is a standalone Red5 Pro mechanism — the Red5 Cloud Backend SDKs' (Node/Java/Go, see [../sdks/backend-sdk.md](../sdks/backend-sdk.md)) conference/chat tokens are a separate, undocumented-internals mechanism; don't assume they use this same `JwtAuthenticator` path without confirming.

## Simple Authentication

Plugin: `red5pro-simple-auth-plugin`. Connection-level (not action-level) authentication for RTMP, RTSP, and WebRTC clients, checked against username/password pairs.

- Can be applied per-webapp (add a security config to that app's `red5-web.xml`) or automatically to every deployed webapp, reading `simple-auth-plugin.credentials` from `RED5_HOME/conf`.
- Security can be fine-tuned independently per connection type (RTMP / RTSP / RTC).
- Custom security configuration at the application level overrides the automatic/global config.
- Best fit: quick connection-level gating without building a token service.

### WebRTC/WHIP/WHEP Clients

Any of the three mechanisms above applies to a WebRTC/WHIP/WHEP publisher or subscriber the same way it applies to RTMP/RTSP — the client passes `username`/`password`/`token` via the SDK's `connectionParams` init property instead of a query string:

```js
await publisher.init({
  ...config,
  connectionParams: { username: "jwt", password: "jwt", token: "<jwt-or-credential>" },
});
```

See [../sdks/web-webrtc-sdk.md](../sdks/web-webrtc-sdk.md) for the full `WHIPClient`/`WHEPClient` init shape, and [Connection URLs](../protocols/README.md#connection-urls) for the endpoint construction this pairs with.

## Stream-Bombing Prevention

For any of the above, in production issue subscriber-role credentials/tokens to audience-only clients so they cannot open unauthorized publish connections ("stream bombing" — informal/generic terminology, not an official Red5 term; don't expect to find it by that name in the source docs).

## Red5 Cloud

Two different mechanisms from the standalone ones above, each configured **per node group** in the Red5 Cloud UI rather than a server config file.

### Round Trip Authentication (Cloud)

Same concept as standalone Round Trip Auth — Red5 forwards each publish/subscribe request to your validation server (`validateCredentials`/`invalidateCredentials` HTTP POST endpoints) and enforces its decision — but it requires a node image built with the Simple Auth plugin, and is wired up by pointing the node group at your validation server URL in the Cloud UI instead of `red5-web.xml`.

### Digest Token Authentication (Cloud-only, no equivalent in standalone Red5 Pro)

A self-contained, cryptographically signed token scheme — no callback to an external server. You hold a shared secret, mint tokens yourself, and Red5 validates them locally.

- **Token format**, seven colon-separated fields: `stream:user:role:key1=value1:app:expiration:digest`
  - `stream` — the short stream ID (`stream1`, not `live/stream1`).
  - `role` — `streamer` for publishers, `viewer` for subscribers.
  - `expiration` — Unix timestamp.
  - `digest` — `sha256(payload + ":" + secret)` as a 64-char lowercase hex string, where `payload` is the first six colon-separated fields.
- Configured in the Cloud UI per node group: Node Groups → Add/Edit → Authentication → **Digest Token** → set the Digest Algorithm (SHA-256) and paste the same secret your backend signs with. A secret mismatch between the UI and your token generator is the most common cause of every connection being rejected.
- The token is passed the same way as any other WHIP/WHEP credential — as the `token` in `connectionParams` (see [WebRTC/WHIP/WHEP Clients](#webrtcwhipwhep-clients) above). The WHIP/WHEP endpoint uses the **full** stream path (e.g. `/live/stream1`); the token's `stream` field uses only the short ID (`stream1`) — don't confuse the two.
- Choose Digest Token when a pre-signed token minted ahead of time is enough; choose Round Trip Authentication when the allow/deny decision must be made live by your own server.

## When to Fetch More

Exact request/response JSON shapes for the Round Trip validator, JWT claim schema specifics, and simple-auth `.properties`/`red5-web.xml` snippets are implementation details best pulled fresh from [https://www.red5.net/docs/red5-pro/development/api/authentication/](https://www.red5.net/docs/red5-pro/development/api/authentication/) when writing the actual integration code.

The full Digest Token generation script (bash, `sha256sum`-based) and Cloud UI walkthrough with screenshots are at [https://www.red5.net/docs/red5-cloud/users-guide/authentication/red5-cloud-digest-token-authentication/](https://www.red5.net/docs/red5-cloud/users-guide/authentication/red5-cloud-digest-token-authentication/); the Round Trip (Cloud) request/response body shapes are at [https://www.red5.net/docs/red5-cloud/users-guide/authentication/red5-cloud-round-trip-authentication/](https://www.red5.net/docs/red5-cloud/users-guide/authentication/red5-cloud-round-trip-authentication/).
