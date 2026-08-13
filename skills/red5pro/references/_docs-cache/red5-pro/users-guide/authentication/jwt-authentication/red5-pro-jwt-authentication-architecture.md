---
title: JWT Authentication Architecture
description: ""
menu_order: 13
---

## Overview

JWT (JSON Web Token) authentication provides a stateless, secure authentication mechanism for Red5 Pro streaming applications. Unlike round-trip authentication which validates credentials with a remote server for each stream operation, JWT authentication validates tokens locally using cryptographic signatures.

## Authentication Flow

![JwtAuthenticatorFlow](/_images/special/authplugin/red5projwtauthenticator.png)

The JWT authentication flow consists of three main components:

1. **Third-Party Authentication Provider** - External identity service or authentication server that issues JWTs to authenticated users
2. **Client Application** - Receives JWT from auth provider and includes it in connection parameters when connecting to Red5 Pro
3. **Red5 Pro Server** - Validates JWT locally using shared secret, without contacting external services

## Validation Process

When a client attempts to connect and publish or subscribe:

1. Client obtains JWT from your authentication provider/identity service
2. Client passes JWT as a connection parameter to Red5 Pro
3. Red5 Pro extracts and validates the JWT:
   - Verifies cryptographic signature using shared secret
   - Checks expiration timestamp
   - Validates issuer claim (if configured)
   - Validates role restrictions (publisher/subscriber, if specified)
   - Validates transport restrictions (if specified)
   - Validates room/scope restrictions (if specified)
4. If valid, connection is allowed; otherwise, it is rejected

## Key Features

### Local Validation
All validation occurs locally on the Red5 Pro server using the shared secret. No external service calls are made during stream operations, ensuring low latency and high performance.

### Stateless Authentication
JWTs are self-contained with all necessary claims. The server does not maintain session state, making it ideal for distributed and scaled environments.

### Role-Based Access Control
JWTs can specify distinct roles for publishers and subscribers, allowing fine-grained control over who can publish versus who can only subscribe.

### Transport and Room Restrictions
Optional claims allow restricting tokens to specific protocols (RTMP, RTSP, WHIP, WHEP) and specific rooms/scopes within your application.

## Security Model

The security of JWT authentication relies on:

- **Shared Secret** - A cryptographic secret shared between your JWT issuer and Red5 Pro server
- **Token Expiration** - Time-limited tokens that expire automatically
- **Signature Verification** - Cryptographic validation ensuring tokens haven't been tampered with
- **Claim Validation** - Server-side enforcement of role, transport, and room restrictions

The shared secret must be kept secure and should be the same secret used by your JWT issuing service to sign tokens.
