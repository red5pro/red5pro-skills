_From: Stream Manager 2.0 Explicit Provisioning_

## Authentication

All provision API calls require a valid JWT presented in the `Authorization` header as a bearer token:

```bash
export JWT="your-jwt-token-here"
curl -H "Authorization: Bearer ${JWT}" ...
```

See the Stream Manager 2.0 Auth API documentation for obtaining tokens.

---
