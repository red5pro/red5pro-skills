---
title: JWT Authentication Use Cases
description: ""
menu_order: 18
---

## Effective Use Case Scenarios

JWT authentication is ideal for the following scenarios:

### Microservices Architecture
When JWTs are issued by a separate authentication service that handles user login and token generation. Red5 Pro validates tokens locally without needing to contact the authentication service during streaming operations.

### Single Sign-On (SSO)
Integration with existing JWT-based authentication systems where users authenticate once and receive a token that works across multiple services, including Red5 Pro streaming.

### API Gateway Integration
When using API gateways that issue JWTs for authenticated requests. The same tokens can be used for both API access and streaming authentication.

### Third-party Identity Providers
Integration with OAuth2/OpenID Connect providers (Auth0, Okta, AWS Cognito, Azure AD, etc.) that issue standard JWTs. Red5 Pro can validate these tokens directly.

### Stateless Authentication
When you need authentication without server-side session storage. JWTs are self-contained with all necessary claims, making them ideal for distributed and scaled environments.

### Multi-tenant Applications
Using issuer and room claims for tenant isolation. Different tenants can have tokens restricted to their specific rooms/scopes.

### Transport Restrictions
Limiting users to specific protocols (RTMP, RTSP, WebRTC WHIP/WHEP) based on their subscription level or client capabilities.

### Short-Lived Tokens
Scenarios requiring near-one-time authentication with tokens that expire quickly (e.g., 60-second TTL for secure, temporary access).

### Role-Based Access Control
Applications requiring distinct publisher and subscriber roles, where some users can only publish, some can only subscribe, and others can do both.

## Ineffective Use Case Scenarios

JWT authentication may not be the best choice in the following scenarios:

### Simple Username/Password
When you only need basic username/password authentication without the complexity of JWT token generation and management. Consider using the File Authentication Validator instead.

### No External Identity Provider
When you don't have a JWT issuing service or identity provider. JWT authentication requires a separate service to generate tokens with the shared secret.

### Legacy RTMP-only Clients
When clients cannot pass custom connection parameters or have limitations in how authentication credentials can be provided.

## Comparison with Other Authentication Methods

### JWT vs Round-Trip Authentication

**JWT Authentication:**
- Validation happens locally on Red5 Pro server
- No network calls during stream operations (low latency)
- Requires JWT issuing service
- Stateless (no session storage needed)
- Token-based with expiration times

**Round-Trip Authentication:**
- Validation requires calling external service for each operation
- Network latency for each validation
- More flexible (can implement any custom logic)
- Can integrate with existing authentication APIs
- Real-time validation against current user state

**Choose JWT when:** You need low-latency validation and can issue tokens from your authentication service.

**Choose Round-Trip when:** You need real-time validation against current user state or complex business logic.

### JWT vs File Authentication

**JWT Authentication:**
- Suitable for large user bases
- Tokens expire automatically
- Integrates with identity providers
- Supports advanced features (roles, transport/room restrictions)
- Requires token generation infrastructure

**File Authentication:**
- Simple username/password in a file
- Easy to set up for small deployments
- No token generation needed
- Limited access control features
- Manual credential management

**Choose JWT when:** You have many users, need integration with identity providers, or require advanced access control.

**Choose File Authentication when:** You have a small number of users and simple authentication requirements.
