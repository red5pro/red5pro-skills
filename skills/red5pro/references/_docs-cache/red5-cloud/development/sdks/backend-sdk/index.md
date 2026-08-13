---
title: Backend SDK
menu_order: 5
---

The Red5 Backend SDKs allow your server to generate secure access tokens for:

- Video conferences
- Chat messaging

Tokens let users join live video rooms, stream audio/video, and communicate in chat without exposing your master credentials on the client.

## Supported SDK Languages

- [Node](node/)
- [Java](java/)
- [Go](go-golang/)

All SDKs provide:

- Conference token generation
- Chat token generation
- Role-based permissions
- Token expiration control
- Server-side security

## Token Types

**Conference Token**

Contains user identity, room ID, role (`admin` / `publisher` / `subscriber`), and expiration. Used for joining video meetings.

**Chat Token**

Contains user identity, channel ID, read/write permissions, and expiration. Used for secure real-time messaging.

## Security Best Practices

- Use environment variables for master credentials
- Never generate tokens on the client
- Use HTTPS
- Keep token lifetimes short
- Validate users before issuing tokens
