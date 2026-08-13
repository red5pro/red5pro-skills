---
title: JWT Authentication
menu_order: 12
---

The Red5 Pro JWT Authentication validator, implemented by the class `JwtAuthenticator`, validates JSON Web Tokens (JWTs; [RFC 7519](https://tools.ietf.org/html/rfc7519)) locally using standard JWT libraries and cryptographic signatures.

The authenticator validates JWT claims including expiration, issuer, roles, transport restrictions, and room restrictions. It provides a modern, stateless authentication mechanism that integrates seamlessly with external identity providers and authentication services.

This validator is ideal for modern authentication architectures where JWTs are issued by external identity providers or authentication services, eliminating the need for round-trip validation during stream operations.
