_From: Stream Manager 2.0 Explicit Provisioning_

## Overview

This guide explains how to use **explicit provisioning** with Red5 Pro Stream Manager 2.0 autoscaling. Explicit provisioning gives you fine-grained control over where and how provisions are distributed to servers based on **capabilities**.

For more information about provisions in Stream Manager 2.0:
- [ABR and Transcoding Migration Guide](/docs/red5-pro/users-guide/stream-manager-2.0/migration-guide/stream-manager-2-migration-abr/) - ABR provision format and workflows
- [Restreamer Migration Guide](/docs/red5-pro/users-guide/stream-manager-2.0/migration-guide/stream-manager-2-migration-restreamer/) - Restreamer provision format and parameters
- [Transcoder and ABR Overview](/docs/red5-pro/users-guide/transcoder/) - General transcoding concepts
- [Stream Manager 2.0 Streams Provision API](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-streams-provision-api/) - Complete API reference

### What's New: Explicit Distribution

Previously, provisions were distributed automatically when calling **Get Server for Publish** with specific flags (`transcode=true`, `restream=true`). The new workflow introduces:

1. **Separate `/distribute` endpoint** - Explicitly distribute provisions to servers based on capabilities
2. **Capability-based selection** - Control exactly which node types receive provisions
3. **Flexible workflows** - Create provision → Distribute → Publish, or combine steps
4. **Egress restreaming** - Push restreamers to edge nodes instead of origin nodes

### Key Concepts

**Provision**: A configuration that defines additional parameters for a stream (transcoding settings, ingest credentials, cloud storage, etc.)

**Distribution**: The act of sending a provision to one or more nodes so they can apply the configuration

**Capabilities**: Node role attributes that determine what functions a node can perform:
- `PUBLISH` - Origin nodes that accept published streams
- `TRANSCODE` - Transcoder nodes that create ABR variants
- `SUBSCRIBE` - Edge nodes that serve subscribers
- `MIX` - Mixer nodes for conferencing

For more information about node roles and capabilities, see:
- [NodeGroupConfig Examples Overview](/docs/red5-pro/development/api/stream-manager-2.0/examples/stream-manager-2-examples-overview/) - Cluster topology examples showing different role configurations
- [Stream Manager 2.0 Admin API](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-admin-api/) - Complete NodeGroupConfig and NodeRole specification

---
