---
title: Whip and Whep Configuration
description: ""
menu_order: 210
---

## Enabling WHIP / WHEP

Update the webapp wherein WHIP/WHEP will be enabled within its `web.xml` file (typically `red5pro/webapps/live/WEB-INF/web.xml`); there are few sections to add to the webapp.

First, is the filter to prevent processing by other filters in the chain, especially the WebSocket filter; so this one
must be placed ahead of the others (Exception is any CORS filter):

```xml
    <!-- WHIP/WHEP filter -->
    <filter>
        <filter-name>WHRequestFilter</filter-name>
        <filter-class>com.red5pro.whip.servlet.WHFilter</filter-class>
        <async-supported>false</async-supported>
    </filter>
    <filter-mapping>
        <filter-name>WHRequestFilter</filter-name>
        <url-pattern>/*</url-pattern>
        <dispatcher>REQUEST</dispatcher>
    </filter-mapping>
```

__Note: Do not include `FORWARD` in the filter mapping section__

Secondly, the WHIP/WHEP request handlers must be added:

```xml
    <!-- WHIP (publisher) endpoint -->
    <servlet>
        <servlet-name>whip</servlet-name>
        <servlet-class>com.red5pro.whip.servlet.WhipEndpoint</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>whip</servlet-name>
        <url-pattern>/whip/endpoint/*</url-pattern>
        <url-pattern>/whip/resource/*</url-pattern>
    </servlet-mapping>
    <!-- WHEP (subscriber) endpoint -->
    <servlet>
        <servlet-name>whep</servlet-name>
        <servlet-class>com.red5pro.whip.servlet.WhepEndpoint</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>whep</servlet-name>
        <url-pattern>/whep/endpoint/*</url-pattern>
        <url-pattern>/whep/resource/*</url-pattern>
    </servlet-mapping>
```

A reason for WHIP and WHEP using two different servlets, would be separation of functional areas (publish and playback); it also allows a node to support one or both.

Lastly, if using TURN vs STUN, context parameters are required and they reside near the top of the file below `display-name` or any other `context-param` nodes:

```xml
    <!-- Context level parameters for use in the servlets -->
    <!-- Stun server defaults to enabled with a google stun value
    <context-param>
        <param-name>stun-server</param-name>
        <param-value>stun3.l.google.com:19302</param-value>
    </context-param>
    -->
    <context-param>
        <param-name>turn-server</param-name>
        <param-value>coturn.example.com:3478?transport=udp</param-value>
    </context-param>
```

Additional details are below for TURN credentials.

Testing may be accomplished with the WHIP/WHEP testbed examples for the plugin, or any other implementations such as simple-whip-client or simple-whep-client (both use GStreamers webrtcbin) which follow the published draft specifications.

## Stream Manager Configuration

Update the webapp wherein WHIP/WHEP will be enabled within its `web.xml` file (typically `red5pro/webapps/live/WEB-INF/web.xml`)

Replace both `servlet-class` entries `WhipEndpoint` and `WhepEndpoint` with `com.red5pro.whip.servlet.WHProxy`;

Example:

```xml
    <!-- WHIP (publisher) endpoint -->
    <servlet>
        <servlet-name>whip</servlet-name>
        <servlet-class>com.red5pro.whip.servlet.WHProxy</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>whip</servlet-name>
        <url-pattern>/whip/endpoint/*</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>whip</servlet-name>
        <url-pattern>/whip/resource/*</url-pattern>
    </servlet-mapping>
    <!-- WHEP (subscriber) endpoint -->
    <servlet>
        <servlet-name>whep</servlet-name>
        <servlet-class>com.red5pro.whip.servlet.WHProxy</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>whep</servlet-name>
        <url-pattern>/whep/endpoint/*</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
        <servlet-name>whep</servlet-name>
        <url-pattern>/whep/resource/*</url-pattern>
    </servlet-mapping>
```

In addition to the removal of the webrtc-plugin jar, the inspector plugin jar and webapp should also be removed.

For WebRTC in Stream Manager 2.0, see the [Proxy API doc](/docs/red5-pro/development/api/stream-manager-2-0/stream-manager-2-proxy-api/#red5-pro-webrtc)

## Requests

The initial request for publish or playback would be in this form: `http://<host>/[app]/[whip|whep]/endpoint/[stream name]?[querystring entries]`. Follow-up or `PATCH` requests would use `resource` like so: `http://<host>/[app]/[whip|whep]/resource/[stream name]`; when resource is used, depending on the type of request, there may be headers present useful for lookup such as: `If-Match`.

Room scopes are supported within the application scope and may be specified in the URL pattern just after `[app]` in the example above for the `POST` requests. Example publishing `mystream` using a room and subscope: `https://<host>/live/myroom/desk/whip/endpoint/mystream`. In the example `live` is the application, `myroom` is the room scope within `live` and `desk` is a subscope within `myroom`.

To provide the fastest negotation and response, TCP candidates are excluded and require the `tcp` request param as an indication that the server should process TCP candidates along with UDP. The UDP candidate processing alone is the quickest and the default.

In addition, we have a means to request a signaling channel via param in the request keyed as `signal`; values allow for `signal=[0|1]` or `signal=[false|true]` (default value is `false`).

## Publisher Feedback Behavior

When a WHIP publisher is identified as an Apple-platform publisher by its HTTP `User-Agent` header, Red5 Pro applies a stricter publisher-bound PLI/FIR suppression window. This reduces repeated keyframe requests sent to iOS and macOS encoders during subscriber joins or short recovery periods. Non-Apple publishers retain the standard feedback behavior.

Red5 Pro also supports a recovery window for loss-driven PLI handling. If retransmission or a natural keyframe arrives during the configured window, the delayed PLI is skipped; otherwise, the PLI is sent after the window expires. This reduces unnecessary keyframe requests while preserving recovery behavior when a refresh is still needed.

Audio-only WHIP publishers that start muted can become available after a short deferred availability check. This avoids treating a temporarily muted audio-only publisher as unavailable during the initial connection window.

### Simple WHEP Client

Uses mode 1, empty offer SDP.

### Cloudflare JS SDK

The WebRTC Hacks crew has a great write-up here: https://webrtchacks.com/how-cloudflare-glares-at-webrtc-with-whip-and-whep/

#### WHIP

Draft standard WHIP requests, sometimes reording the audio and video m-lines.

#### WHEP

Uses mode 2, full offer SDP.

The html pages must be updated to reflect the endpoint urls in-use; in addition, the browser must include the matching IP or fqdn used in the endpoint to avoid CORS errors. So an endpoint of `http://<host>/live/whep/endpoint/stream1?requestId=cloudflare` will need this in the browsers navbar: `http://<host>/live/cloudflare/whep.html`. The examples use `stream1` and the request id need only be unique per scope/stream.

First test throws this because we provide the `actpass`.

```js
negotiateConnectionWithClientOffer.js:59 Uncaught (in promise) DOMException: Failed to execute 'setRemoteDescription' on 'RTCPeerConnection': Failed to set remote answer sdp: Failed to apply the description for m= section with mid='0': Answerer must use either active or passive value for setup attribute.
```

## Credentials for TURN servers

Credentials are configured in the applications `web.xml` or via request parameters in the `OPTIONS` fetch; include this section to configure them for the entire webapp:

```xml
<context-param>
    <param-name>username</param-name>
    <param-value>testuser</param-value>
</context-param>
<context-param>
    <param-name>credential</param-name>
    <param-value>testpass</param-value>
</context-param>
<context-param>
    <param-name>credential-type</param-name>
    <param-value>password</param-value>
</context-param>
```

__Note for HTTP/S request parameters, use the same names, but with `ice-` prefixes; such as `ice-username=testuser&ice-credential=foo`__

The STUN and TURN server url entries are not "currently" supported for override via request parameters; they are expected at `init` via the context param configuration.

```xml
<context-param>
    <param-name>stun-server</param-name>
    <param-value>stun2.l.google.com:19302</param-value>
</context-param>
<context-param>
    <param-name>turn-server</param-name>
    <param-value>coturn.example.net:3478?transport=udp</param-value>
</context-param>
```

__Note one, both, or neither may be provided; the defaults are shown in the example__

## Status Codes

Since WHIP and WHEP are HTTP-based, the HTTP status code system is used; below are the codes used for each situation.

### WHIP

* 200 - Ice fragment on PATCH is okay
* 201 - Successful request to publish
* 400 - Invalid offer SDP
* 400 - Publish failed due to an exception during creation
* 401 - Not authorized
* 404 - Scope resolver failed for the publish name and / or scope
* 406 - Scope connection rejected
* 409 - Stream is not available to publish
* 409 - Session already initialized
* 412 - Invalid request body
* 417 - Session lookup or creation failure

### WHEP

* 201 - Successful request to playback
* 204 - Answer SDP or ICE fragment on PATCH is okay
* 400 - Offer already sent, double POST assumed
* 401 - Not authorized
* 404 - Scope resolver failed for the playback name and / or scope
* 404 - Session not found for PATCH
* 406 - Scope connection rejected
* 406 - Playback failed due to an exception during creation
* 409 - Stream is not available to playback
