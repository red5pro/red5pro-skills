---
title: JWT Claims Specification
description: ""
menu_order: 15
---

## Overview

The JWT authenticator validates both standard JWT claims and Red5 Pro-specific claims to control access to streaming resources. This page documents all supported claims and their validation rules.

## Standard JWT Claims

| Claim | Required | Description |
|---|---|---|
| `sub` | Recommended | Subject (username) - stored as connection attribute for use by the application |
| `iss` | Conditional | Issuer - required only if Red5 Pro is configured with `expectedIssuer` |
| `exp` | Yes | Expiration time - JWT must not be expired |
| `name` | Optional | Full name of the user - stored as connection attribute if present |

### Subject Claim (`sub`)
The subject claim identifies the user. This value is stored as a connection attribute and can be used by your application for logging, analytics, or other purposes. It is not otherwise used for JWT validation.

### Issuer Claim (`iss`)
The issuer claim identifies who issued the JWT. If your Red5 Pro configuration specifies an `expectedIssuer`, the JWT's issuer must match exactly or the token will be rejected.

**Note:** Issuer matching is case-sensitive per the JWT specification (RFC 7519).

### Expiration Claim (`exp`)
The expiration timestamp must be in the future (token not expired) and must not exceed the server's configured `jwtTtlMinutes` limit.

## Red5 Pro Specific Claims

| Claim | Required | Description |
|---|---|---|
| `roles` | Optional | Comma-separated list of roles: `red5-publisher`, `red5-subscriber` -- any other existing roles will be ignored |
| `red5-transport` | Optional | Comma-separated list of allowed transport protocols: `RTMP`, `RTSP`, `WHIP`, `WHEP` (case-insensitive) |
| `red5-room` | Optional | Comma-separated list of allowed room names. Rooms are Red5 scopes beneath the application level - e.g., for stream path `live/room1/stream1`, the room is `room1` |

### Name Claim (`name`)
Optional claim containing the user's full name. If present, this is stored as a connection attribute and can be accessed by your application. It is not otherwise used for JWT validation.

### Roles Claim (`roles`)
The `roles` claim is a commonly-used JWT claim that many identity providers already include in their tokens. Red5 Pro examines this comma-separated list and looks for specific role values to control streaming permissions.

Red5 Pro recognizes the following role values (case-sensitive, must be lowercase):
- `red5-publisher` - Allows publishing streams
- `red5-subscriber` - Allows subscribing to streams
- `red5-publisher,red5-subscriber` - Allows both publishing and subscribing

**Important:** If the `roles` claim is empty or not present, role enforcement is disabled and users can both publish and subscribe. If the claim is present with any values, it must contain at least one Red5 role (`red5-publisher` and/or `red5-subscriber`) or the user will be denied access.

Other roles in the list (e.g., `admin`, `editor`, `user`) are ignored by Red5 Pro but can be used by your application or other services. If your identity provider already adds roles to tokens, you must include the appropriate Red5 roles alongside them.

**Note:** Role matching is case-sensitive. `Red5-Publisher` or `RED5-PUBLISHER` will not be recognized.

Example:
```json
{
  "roles": "admin,editor,red5-publisher,red5-subscriber"
}
```
In this example, Red5 Pro will recognize the user as both a publisher and subscriber, while ignoring the `admin` and `editor` roles.

### Transport Claim (`red5-transport`)
Restricts which protocols the token can be used with. Valid values:
- `RTMP` - Real-Time Messaging Protocol
- `RTSP` - Real-Time Streaming Protocol
- `WHIP` - WebRTC-HTTP Ingestion Protocol (for publishing)
- `WHEP` - WebRTC-HTTP Egress Protocol (for subscribing)

Multiple transports can be specified as a comma-separated list (e.g., `WHIP,WHEP`). Transport matching is NOT case-sensitive; `whip`, `wHIp`, etc are valid.

If this claim is empty or not present, the token can be used with any protocol.

### Room Claim (`red5-room`)
Restricts which rooms (scopes) the token can access. Rooms in Red5 Pro are sub-scopes beneath the application level.

For example:
- Stream path `live/room1/stream1` - the room is `room1`
- Stream path `live/conference/stream2` - the room is `conference`
- Stream path `live/stream3` - no room (application-level stream)

Multiple rooms can be specified as a comma-separated list (e.g., `room1,room2,conference`).

If this claim is empty or not present, the token can be used with any room or no room (application-level streams). If the claim is present, users cannot access application-level streams (streams without a room prefix).

**Note:** Room matching is case-sensitive. The room name in the JWT must exactly match the room name in the stream path.

## Claim Validation Rules

The following validation rules are enforced by the Red5 Pro server:

### Expiration Validation
- JWT must not be expired (current time must be before `exp` timestamp)
- JWT expiration time must not exceed the server's configured `jwtTtlMinutes` limit
- Example: If server is configured with `jwtTtlMinutes=60`, tokens with expiration more than 60 minutes in the future will be rejected

### Issuer Validation
- If `expectedIssuer` is configured on the server, JWT `iss` claim must match exactly
- If `expectedIssuer` is not configured, issuer validation is skipped

### Role Validation
- For publish operations: JWT must contain `red5-publisher` role
- For playback operations: JWT must contain `red5-subscriber` role
- Role validation is skipped during initial connection (only enforced when actual publish/subscribe is attempted)

### Transport Validation
- If `red5-transport` claim is present, connection protocol must be in the allowed list
- Comparison is case-insensitive (e.g., `whip` matches `WHIP`)
- If claim is empty or not present, any transport is allowed

### Room Validation
- If `red5-room` claim is present, the target room must be in the allowed list
- If JWT specifies room restrictions, accessing root-level streams (no room) will be denied
- If claim is empty or not present, any room (including root-level) is allowed

## Example JWT Payload

```json
{
  "sub": "user123",
  "iss": "your-auth-service",
  "name": "John Doe",
  "roles": "red5-publisher,red5-subscriber",
  "red5-transport": "WHIP,WHEP",
  "red5-room": "room1,room2",
  "exp": 1234567890
}
```

This token allows user "user123" to both publish and subscribe using WebRTC (WHIP/WHEP) protocols in rooms "room1" and "room2".
