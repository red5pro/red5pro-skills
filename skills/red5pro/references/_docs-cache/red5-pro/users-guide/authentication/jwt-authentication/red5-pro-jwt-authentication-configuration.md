---
title: JWT Authentication Configuration
description: ""
menu_order: 14
---

## Prerequisites

Before configuring JWT authentication, ensure you have:

1. The `red5pro-simple-auth-plugin` installed in your Red5 Pro server (present by default)
2. A JWT issuing service or identity provider that can generate JWTs
3. A shared secret key (minimum 32 bytes) used by both your JWT issuer and Red5 Pro

## Enabling WebApp Security

To enable security on your web application, you need to add and configure the `Simple Auth Plugin` security bean along with the `JWT authenticator` bean to your web application's context file - `red5-web.xml` as explained below.

## Application-Level Configuration

To attach simple auth plugin to a webapp (typically the `live` webapp) using the `JwtAuthenticator`, you need to specify the core plugin configuration bean along with the authenticator bean to use for authentication, in the application's context (`red5-web.xml`) file.

**Example:** Attaching plugin security to the `live` webapp using `JwtAuthenticator` for authentication with standard configuration settings.

**STEP 1**

To apply security to the `live` application, you can add the security configuration to `RED5_HOME/webapps/live/WEB-INF/red5-web.xml` as shown below (this is already present in the file but commented out):

```xml
<bean id="jwtAuthenticator" class="com.red5pro.server.plugin.simpleauth.datasource.impl.jwt.JwtAuthenticator" init-method="initialize">
    <property name="adapter" ref="web.handler" />
    <property name="context" ref="web.context" />
    <property name="jwtSecret" value="${jwt.secret}" />
    <property name="jwtTtlMinutes" value="${jwt.ttl.minutes}" />
    <property name="expectedIssuer" value="${jwt.issuer}" />
</bean>

<bean id="simpleAuthSecurity" class="com.red5pro.server.plugin.simpleauth.Configuration" depends-on="jwtAuthenticator">
    <property name="active" value="${auth.active}" />
    <property name="rtmp" value="${auth.rtmp}" />
    <property name="rtsp" value="${auth.rtsp}" />
    <property name="rtc" value="${auth.rtc}" />
    <property name="srt" value="${auth.srt}" />
    <property name="mpegts" value="${auth.mpegts}" />
    <property name="rtmpAllowQueryParamsEnabled" value="${auth.rtmpAllowQueryParamsEnabled}" />
    <property name="rtmpAuthRoomScopeEnabled" value="${auth.rtmpAuthRoomScopeEnabled}" />
    <property name="rtmpAuthRoomScopeName" value="${auth.rtmpAuthRoomScopeName}" />
    <property name="streamNameAuth" value="${auth.streamNameAuth}" />
    <property name="allowedRtmpAgents" value="*" />
    <property name="validator" ref="jwtAuthenticator" />
</bean>
```

**STEP 2**

In your webapp's `red5-web.properties` file, add the following section:

```properties
# Authentication configuration
auth.active=true
auth.rtmp=true
auth.rtsp=true
auth.rtc=true
auth.srt=false
auth.mpegts=false
auth.rtmpAllowQueryParamsEnabled=true
auth.rtmpAuthRoomScopeEnabled=false
auth.rtmpAuthRoomScopeName=
auth.streamNameAuth=false

# JWT authentication properties
jwt.secret=changeme-to-a-strong-32-byte-secret-key
jwt.ttl.minutes=60
# Issuer validation: if set, JWTs must have matching iss claim (leave empty to skip issuer validation)
jwt.issuer=
```

The property values are substituted from the `red5-web.properties` file into the `red5-web.xml` file at runtime.

> **IMPORTANT:** Change `jwt.secret` to a strong, unique secret key that matches the secret used by your JWT issuing service. This secret must be kept secure and should be at least 32 bytes long.

## Application-Level Configuration Bean Properties

Following parameters are allowed in a bean configuration at the application level (configured in application's red5-web.xml).

**CORE**

| Property  | Type  | Description  |
|---|---|---|
| active  | Boolean  | Enables or disables authentication for the application. When `false`, all connections are allowed without authentication  |
| rtmp  | Boolean  | Enables or disables authentication enforcement for RTMP connections. When `true`, RTMP clients must provide valid JWTs  |
| rtsp  | Boolean  | Enables or disables authentication enforcement for RTSP connections. When `true`, RTSP clients must provide valid JWTs  |
| rtc  | Boolean  | Enables or disables authentication enforcement for WebRTC connections. When `true`, WebRTC clients must provide valid JWTs  |
| srt  | Boolean  | Enables or disables authentication enforcement for SRT connections. When `true`, SRT clients must provide valid JWTs  |
| mpegts  | Boolean  | Enables or disables authentication enforcement for MPEG-TS connections. When `true`, MPEG-TS clients must provide valid JWTs  |
| rtmpAllowQueryParamsEnabled  | Boolean  | Allows RTMP clients to pass authentication parameters via query string instead of connection arguments  |
| allowedRtmpAgents  | String  | Sets the list of allowed RTMP agent strings separated by semicolons. By default, all agent strings are allowed.  |

**AUTHENTICATOR**

| Property | Type | Description |
|---|---|---|
| context | Reference | The reference to the `web.context` bean |
| adapter | Reference | The reference to the `web.handler` bean, which indicates the Application |
| jwtSecret | String | The secret key used to validate JWT signatures. Must match the secret used to generate the JWTs |
| jwtTtlMinutes | Long | Maximum allowed time-to-live for JWTs in minutes. The server will reject JWTs with expiration times exceeding this limit |
| expectedIssuer | String | Optional issuer claim validation. If set, JWTs must have matching `iss` claim |

## Configuration Notes

### Protocol-Level vs Token-Level Restrictions

The configuration properties work in conjunction with JWT claims to control access:

**Protocol-Level Enforcement** (Configuration Properties):
- `auth.rtmp`, `auth.rtsp`, `auth.rtc`, etc. control whether authentication is **required** for each protocol
- When set to `true`, clients using that protocol must provide a valid JWT
- When set to `false`, that protocol allows unauthenticated access (JWT validator is not invoked)

**Token-Level Restrictions** (JWT Claims):
- The `red5-transport` claim provides **additional** fine-grained restrictions within the JWT itself
- Example: Even if `auth.rtmp=true` and `auth.rtc=true`, a JWT with `red5-transport: "WHIP,WHEP"` can only be used for WebRTC, not RTMP
- This allows you to issue different tokens with different protocol permissions to different users

**Combined Behavior:**
1. Configuration property must enable authentication for the protocol (`auth.rtmp=true`)
2. Client must provide valid JWT
3. If JWT contains `red5-transport` claim, the protocol must be in the allowed list

### JWT Secret
The `jwtSecret` must be the same secret key used by your JWT issuing service. This shared secret is used to cryptographically verify that tokens were issued by a trusted source and have not been tampered with.

### JWT TTL (Time-to-Live)
The `jwtTtlMinutes` property defines the maximum expiration time allowed for JWTs. The server will reject any JWT with an expiration timestamp that exceeds this limit, even if the token is validly signed. This provides an additional layer of security by preventing long-lived tokens.

For example, if `jwtTtlMinutes=60`, tokens can have a maximum lifespan of 60 minutes. Tokens generated with a 2-hour expiration will be rejected.

The minimum practical TTL is 1 minute (60 seconds), which can be used for near-one-time authentication scenarios. Set `jwtTtlMinutes` slightly higher than your auth provider's TTL to avoid race conditions from clock drift. For example, if your auth provider issues 60-second tokens, set `jwtTtlMinutes=2` to reject overly generous tokens while tolerating clock discrepancies up to 60 seconds between servers.

### Expected Issuer
The `expectedIssuer` property is optional. If set, the server will validate that the JWT's `iss` (issuer) claim matches this value. This is useful when integrating with specific identity providers to ensure tokens come from the expected source. Leave empty to skip issuer validation.
