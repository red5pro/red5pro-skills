---
title: Red5 Cloud Digest Token Authentication
menu_order: 2
---

Digest Token Authentication lets you control who can publish to and subscribe from your streams using cryptographically signed tokens that you generate yourself. You hold a shared secret, mint a token for each authorized publisher or subscriber and Red5 validates that token locally against the same secret. No external authentication server is involved, which makes this a self-contained, low latency option.

This guide shows how to enable Digest Token Authentication on a Red5 Cloud deployment, generate valid tokens and verify the flow with the built-in testbed. A companion video walks through the same steps end to end.

<iframe width="560" height="315" src="https://www.youtube.com/embed/LjmMxQBX-fM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Before you start

You need:

- A Red5 Cloud account with access to create a node group.
- A shared secret. Generate a strong one, for example with `openssl rand -hex 32`, which produces a 64 character hex string.
- A terminal for generating tokens and the Red5 Pro HTML SDK testbed for the publish and subscribe demo.

> The secret is the root of trust for this scheme. Anyone who holds it can mint valid tokens for your streams, so keep it on your server, never send it to clients and store it in a secrets manager for production.

## How Digest Token Authentication works

A digest token is a single colon separated string with seven fields. The first six fields are the payload. The seventh is a SHA-256 digest of that payload combined with your secret.

```
stream : user : role : key1=value1 : myapp : expiration : digest
```

| Field | Meaning |
| --- | --- |
| `stream` | The stream ID (for example `stream1`). This is the short ID, not the full stream path. |
| `user` | A user identifier of your choice. Used to identify or revoke a client. |
| `role` | `streamer` for publishers, `viewer` for subscribers. |
| `key1=value1` | A custom key value pair you can use to carry extra data. |
| `myapp` | An application name. |
| `expiration` | A Unix timestamp after which the token is no longer valid. |
| `digest` | `sha256(payload + ":" + secret)`, a 64 character lowercase hex string. |

The flow at connection time:

1. Your backend generates a token for an authorized user, signing the payload with your secret.
2. The client presents that token when it publishes or subscribes.
3. Red5 takes the payload from the token, recomputes the digest using its own copy of the secret and compares it against the digest in the token.
4. If the two digests match and the token has not expired, the connection is allowed. Otherwise it is rejected.

Because Red5 recomputes the digest locally, there is no callback to an external service. The secret never leaves the server side and a token cannot be forged without it.

## Generate tokens

A short script produces both a publisher token (`streamer` role) and a subscriber token (`viewer` role) from a stream ID, a user identifier and your secret.

```bash
#!/bin/bash
stream=$1   # streamId, for example "stream1", not "live/stream1"
user=$2     # any identifier
secret=$3   # the same secret you set in the Cloud UI

if [ "$#" -ne 3 ]; then
    echo "Usage: ./token-generation.sh <stream> <user> <secret>"
    exit
fi

# Publisher token (streamer role)
role=streamer
expiration=$(($(date +%s) + 86400 * 365))   # 1 year from now
payload="$stream:$user:$role:key1=value1:myapp:$expiration"
digest=$(echo -n "$payload:$secret" | sha256sum | awk '{print $1}')
echo "PUBLISHER TOKEN: $payload:$digest"

# Subscriber token (viewer role)
role=viewer
payload="$stream:$user:$role:key1=value1:myapp:$expiration"
digest=$(echo -n "$payload:$secret" | sha256sum | awk '{print $1}')
echo "SUBSCRIBER TOKEN: $payload:$digest"
```

Make it executable and run it:

```
chmod +x token-generation.sh
./token-generation.sh stream1 user <YOUR_SECRET>
```

You get two lines. Each full colon separated string is a token:

```
PUBLISHER TOKEN: stream1:user:streamer:key1=value1:myapp:1234567891:<64-char-hex-digest>
SUBSCRIBER TOKEN: stream1:user:viewer:key1=value1:myapp:1234567891:<64-char-hex-digest>
```

In a real application your backend generates these on demand for authenticated users. Never expose the secret to clients.

## Configure Digest Token Authentication in the Cloud UI

Digest Token Authentication is enabled per node group.

1. Open the Cloud UI and go to Node Groups, then Add New Node Group.
2. Give the node group a name.
3. In the Authentication dropdown, select **Digest Token**.
4. In the Digest Algorithm dropdown, leave **SHA-256** selected. This is the standard and the most widely supported.
5. In the Secret field, paste the same secret you use to sign tokens. This must match exactly, character for character.
6. Complete the remaining node group settings as needed, then review and deploy.
7. Wait for the node group state to become Active.

> The secret in the Cloud UI and the secret passed to your token generator must be identical. A mismatch is the most common cause of tokens being rejected, because the digest Red5 computes will never match a digest signed with a different secret.

## Verify with the testbed

Once the node group is Active, expand it and copy its publish and subscribe endpoints (the WHIP and WHEP endpoints). Note that the endpoint path contains the full stream path such as `/live/stream1`, while the token uses only the short stream ID `stream1`. Do not confuse the two.

1. Open the Red5 Pro HTML SDK testbed publisher page.
2. Set the stream name to `stream1`, paste the WHIP endpoint and paste the publisher token into the token field.
3. Start publishing. The stream should go live and you can confirm it in the Cloud UI Streams tab.
4. Open the testbed subscriber page. Set the stream name to `stream1`, paste the WHEP endpoint and paste the subscriber token.
5. Subscribe. The stream should play.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Every connection rejected | Using a JWT instead of a digest token | Use the colon separated digest format shown here. A JWT will not validate against Digest Token auth. |
| Publisher works, subscriber does not or vice versa | Wrong role in the token | Use `streamer` for publishing and `viewer` for subscribing. |
| Token rejected after working earlier | Token expired | Check the `expiration` field. Generate a new token with a later timestamp. |
| Stream connects but to the wrong stream or not at all | Stream ID mismatch | The token must use the short stream ID (`stream1`), not the full path (`live/stream1`). The stream name in the testbed must match the token. |


## Digest Token versus Round Trip Authentication

Red5 Cloud offers two authentication options and they suit different needs:

- **Digest Token** validates a self contained signed token locally against a shared secret, with no callback to your server. Best when you can mint tokens ahead of time and want a low latency, self contained setup.
- **[Round Trip Authentication](/docs/red5-cloud/users-guide/authentication/red5-cloud-round-trip-authentication/)** forwards each request to your own server for a live decision. Best when authorization logic lives in your own systems or when you need to check something at request time.

Pick Digest Token when a pre signed token is enough. Pick Round Trip Authentication when the decision must be made by your server for each connection.
