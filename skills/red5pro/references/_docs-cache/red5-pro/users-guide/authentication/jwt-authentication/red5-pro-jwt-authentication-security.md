---
title: Security Considerations
description: ""
menu_order: 19
---

## Overview

JWT authentication provides strong security when implemented correctly. This page outlines best practices and security considerations for deploying JWT authentication with Red5 Pro.

## Secret Key Security

### Keep the Secret Secure
The JWT secret is the foundation of your authentication security. Anyone with access to this secret can generate valid tokens for your Red5 Pro server.

**Best Practices:**
- Store the secret in secure configuration management systems (e.g., HashiCorp Vault, AWS Secrets Manager)
- Never commit secrets to version control
- Use environment variables or secure configuration files with restricted permissions
- Limit access to the secret on a need-to-know basis

### Secret Key Strength
Use a strong secret key that is difficult to guess or brute-force.

**Recommendations:**
- Minimum length: 32 bytes (256 bits)
- Use cryptographically random generation
- Avoid dictionary words or predictable patterns

Example of generating a strong secret:
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Secret Rotation
Periodically rotate your JWT secret to limit the impact of potential compromise.

**Rotation Strategy:**
- Plan rotation schedule (e.g., quarterly, annually)
- Coordinate rotation between Red5 Pro server and JWT issuing service
- Consider overlap periods where both old and new secrets are valid during transition

## Token Expiration

### Appropriate Expiration Times
Set token expiration times based on your security requirements and use case.

**Recommendations:**
- **Standard sessions:** 15-60 minutes
- **Long sessions:** Up to the configured `jwtTtlMinutes` limit
- **Near one-time use:** 60 seconds (1 minute minimum)
- **High security:** Shorter expirations with token refresh mechanism

### TTL Enforcement
Red5 Pro enforces the configured `jwtTtlMinutes` limit as a maximum. Even if a token is signed with a longer expiration, it will be rejected.

**Example:**
```properties
# Server configuration
jwt.ttl.minutes=60

# Token with 2-hour expiration will be REJECTED
# Token with 30-minute expiration will be ACCEPTED
```

This provides defense-in-depth by preventing long-lived tokens even if your token generation service is misconfigured.

## Transport Security

### Always Use Encrypted Connections
JWTs should only be transmitted over encrypted connections to prevent token interception.

**Requirements:**
- **WebRTC:** Uses encryption by default (DTLS-SRTP)
- **RTMP:** Use RTMPS (RTMP over TLS) when available
- **RTSP:** Use RTSPS (RTSP over TLS) when available
- **Token Distribution:** Always use HTTPS when sending tokens from your auth service to clients

### Token Storage on Clients
Minimize the risk of token theft on client devices.

**Best Practices:**
- Don't store tokens longer than necessary
- Use secure storage mechanisms (iOS Keychain, Android Keystore, secure cookies for web)
- Clear tokens when users log out
- Avoid logging tokens in debug output

## Claim Validation

### Validate All Relevant Claims
Configure Red5 Pro to validate all claims that are relevant to your security model.

**Recommendations:**
- **Always validate:** `exp` (expiration)
- **Recommended:** `iss` (issuer) - set `expectedIssuer` to prevent token reuse from other services
- **As needed:** `roles`, `red5-transport`, `red5-room` - use these for fine-grained access control

### Role-Based Access Control
Use the `roles` claim to implement least-privilege access.

**Example:**
- Viewers/subscribers: `red5-subscriber` only
- Broadcasters: `red5-publisher` only
- Moderators: `red5-publisher,red5-subscriber`

### Transport and Room Restrictions
Use transport and room claims to limit token scope and reduce impact of token compromise.

**Example:**
```javascript
// Token limited to WebRTC viewing in specific room
{
    sub: "viewer123",
    roles: "red5-subscriber",
    "red5-transport": "WHEP",
    "red5-room": "public-event",
    exp: ...
}
```

## Token Generation Security

### Server-Side Generation Only
Never generate tokens on the client side or expose your JWT secret to clients.

**Secure Architecture:**
1. User authenticates to your backend service
2. Backend validates credentials
3. Backend generates JWT with appropriate claims
4. Backend sends JWT to client over HTTPS
5. Client uses JWT to connect to Red5 Pro

### Avoid Token Reuse Across Services
If you use JWTs for multiple services, ensure tokens are scoped appropriately.

**Recommendations:**
- Use different secrets for different services
- Use the `iss` claim to identify the intended service
- Use service-specific claims (like `red5-room`) to limit scope

## Monitoring and Logging

### Track Authentication Failures
Monitor failed authentication attempts to detect potential attacks.

**Enable Debug Logging:**
```xml
<logger name="com.red5pro.server.plugin.simpleauth.datasource.impl.jwt" level="DEBUG"/>
```

**Watch for:**
- Expired tokens (may indicate clock skew or token theft)
- Invalid signatures (may indicate tampering or wrong secret)
- Missing required claims
- Excessive failures from specific IPs or users

### Audit Token Usage
Maintain audit logs of token generation and usage for security analysis.

**Log Information:**
- Token generation: user, timestamp, claims
- Token validation: success/failure, user, reason for failure
- Streaming activity: user, stream, duration

## Common Security Pitfalls

### Don't Use Weak Secrets
**Problem:** Short or predictable secrets can be brute-forced.
**Solution:** Use cryptographically random secrets of at least 32 bytes.

### Don't Skip Expiration Validation
**Problem:** Without expiration, compromised tokens are valid forever.
**Solution:** Always set appropriate `exp` claim and configure `jwtTtlMinutes`.

### Don't Transmit Tokens Insecurely
**Problem:** Tokens sent over unencrypted connections can be intercepted.
**Solution:** Always use HTTPS/TLS for token distribution and streaming when possible.

### Don't Trust Client-Provided Claims Without Validation
**Problem:** Clients might try to modify tokens or claims.
**Solution:** Red5 Pro validates the cryptographic signature - never accept unsigned tokens.

### Don't Log Tokens
**Problem:** Tokens in logs can be stolen and used by attackers.
**Solution:** Ensure tokens are not included in application logs or error messages.

## Compliance Considerations

### Data Privacy
JWTs may contain personally identifiable information (PII) in claims like `sub` and `name`.

**Recommendations:**
- Minimize PII in tokens when possible
- Understand data privacy regulations (GDPR, CCPA) applicable to your use case
- Implement token cleanup/expiration policies

### Security Standards
Follow industry security standards for JWT usage.

**Reference Standards:**
- [RFC 7519](https://tools.ietf.org/html/rfc7519) - JSON Web Token (JWT)
- [RFC 8725](https://tools.ietf.org/html/rfc8725) - JSON Web Token Best Current Practices
