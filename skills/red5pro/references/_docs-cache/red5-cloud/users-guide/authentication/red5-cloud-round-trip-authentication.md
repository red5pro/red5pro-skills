---
title: Red5 Cloud Round Trip Authentication
menu_order: 1
---

Round Trip Authentication (RTA) lets your own server decide who is allowed to publish or subscribe to a stream. Instead of Red5 checking a static username and password, every publish and subscribe request is forwarded to an authentication endpoint that you control. Your endpoint approves or denies the request and Red5 enforces the decision.

This guide shows how to enable Round Trip Authentication on a Red5 Cloud deployment, point it at your validation server and verify it with the built-in testbeds. A companion video walks through the same steps end to end.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cQkraOpTtd0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Before you start

You need:

- A Red5 Cloud account with a deployed node group that uses a node image built with the authentication plugin. Round Trip Authentication relies on the Simple Auth plugin being present in the image.
- A running validation server reachable over HTTP or HTTPS from your Red5 nodes. It must expose two endpoints, `validateCredentials` and `invalidateCredentials`, described below.
- The Cloud UI open, with access to your node group's configuration.

> If you do not have a validation server yet, read the [Your validation server](#your-validation-server) section first. Nothing else will work until that server is answering correctly.

## How Round Trip Authentication works

The name describes the flow. A request makes a round trip from the viewer or publisher, through Red5, out to your server and back.

1. A client connects to publish or subscribe, sending a username, password and an optional token.
2. Red5 does not decide locally. It forwards those credentials to your validation server's `validateCredentials` endpoint as an HTTP POST.
3. Your server runs whatever logic you want (check a database, verify a JWT, call another service) and returns a JSON response that either permits or denies the request.
4. Red5 enforces that decision. On permit, the stream proceeds. On deny, the connection is rejected.
5. When a session needs to be revoked or a token expired, Red5 calls your `invalidateCredentials` endpoint so you can release or blacklist it.

The important idea: Red5 is the enforcement point, your server is the decision point. This keeps your authentication logic in your own systems and out of the streaming layer, which is what makes RTA flexible enough for per user tokens, time limited access and separate rules for publishers versus subscribers.

## Your validation server

Red5 calls two endpoints on the server you configure. Both are HTTP POST and both receive the same JSON body.

**Request body Red5 sends:**

```json
{
  "username": "<username>",
  "password": "<password>",
  "token": "<token>",
  "type": "<publisher|subscriber>",
  "streamID": "<stream-id>"
}
```

The `token` field is a free-form string. You can pack extra data into it (a signed JWT, a query string, stringified JSON) and decode it inside your endpoint. This is how you carry custom claims such as an account ID, an expiry or a role without changing the request shape.

### validateCredentials

Invoked to validate a client of a given type (publisher or subscriber) for a stream. Your logic decides whether to allow the action.

- Endpoint: `validateCredentials`
- Method: `POST`
- Success response: HTTP 200 with a JSON body

```json
{
  "result": true
}
```

`result` is a boolean. `true` permits the action, `false` denies it.

### invalidateCredentials

Invoked to invalidate a client, for example to revoke a permission or expire a token. Same request shape, same response shape.

- Endpoint: `invalidateCredentials`
- Method: `POST`
- Success response: HTTP 200 with `{ "result": <boolean> }`

### Test your server first

Before you touch the Cloud UI, confirm both endpoints answer correctly. A quick check from any machine that can reach the server:

```
curl -i -X POST https://<YOUR_AUTH_SERVER>/validateCredentials \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test","token":"","type":"publisher","streamID":"stream1"}'
```

You should get back HTTP 200 and a JSON body containing `result`. If this call fails, fix it before continuing. Most Round Trip Authentication problems trace back to a validation server that is unreachable, returns a non-200 status or returns a body Red5 cannot parse.

## Configure Round Trip Authentication in the Cloud UI

Round Trip Authentication is enabled per node group, through your deployment's authentication settings in the Cloud UI.

1. Open the Cloud UI and go to your node group's configuration.
2. Enable authentication for the node group.
3. In the authentication endpoint field, enter the base URL of your validation server only. For example:

   ```
   https://<YOUR_AUTH_SERVER>:443
   ```

4. Save the configuration and let the node group apply it.

> Enter the base URL only. Do not include `/validateCredentials` in the endpoint field.

## Verify with the testbeds

Red5 ships HTML testbeds that exercise the full flow. For a Red5 Cloud autoscale deployment, use the Stream Manager Proxy variants, since they route through the Stream Manager the way real clients do.

1. Open the testbed page on your Stream Manager host.
2. In Settings, set your Host, the live web app, a stream name, your node group and API level v1. In the Authentication section, enter the username and password your validation server expects.
3. Choose **Publish - Stream Manager Proxy RoundTrip Authentication** and start publishing.
4. In a second tab, choose **Subscribe - Stream Manager Proxy RoundTrip Authentication** and subscribe to the same stream.

What you should see:

- With valid credentials, the publish and subscribe both succeed and your validation server logs an incoming POST to `validateCredentials` for each.
- With invalid credentials, the connection is rejected before the stream starts.

If the testbed hangs or fails with valid credentials, the problem is almost always the endpoint configuration or the validation server, not the testbed.