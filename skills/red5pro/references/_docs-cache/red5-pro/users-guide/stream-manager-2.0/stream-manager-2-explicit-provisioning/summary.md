_From: Stream Manager 2.0 Explicit Provisioning_

## Summary

**Explicit provisioning** gives you:

✅ **Separation of concerns** - Create, distribute, and publish as independent steps
✅ **Capability-based control** - Choose exactly which node types receive provisions
✅ **Egress restreaming** - Offload RTMP push to edge nodes using `SUBSCRIBE` capability
✅ **Easier testing** - Test distribution separately from publishing
✅ **Backward compatibility** - Old implicit workflow still works

**Key Takeaways:**

- Use `POST /as/v1/streams/provision/{nodeGroup}/distribute/{provisionGuid}` for explicit distribution
- Set `?capabilities=SUBSCRIBE` for egress restreaming (RTMP push to social media)
- Use `?distribute=false` in Get Server for Publish to skip redistribution
- Always use `"persist": "true"` for production restreamers
- API capabilities parameter overrides provision capabilities

For more details on provision schemas, see [Stream Manager 2.0 Streams Provision API](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-streams-provision-api/).
