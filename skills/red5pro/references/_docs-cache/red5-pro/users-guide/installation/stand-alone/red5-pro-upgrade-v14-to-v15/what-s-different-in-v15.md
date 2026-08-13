_From: Upgrading from Red5 Pro v14 to v15_

## What's Different in v15

v15 is a feature and stability release built on the same infrastructure as v14:

### New Features in v15
- **Conference API** included in Stream Manager 2.0
- **SRT egress support** for advanced streaming workflows
- **Hyper-V support** for virtualization environments
- **JWT support** in SimpleAuth plugin for token-based authentication
- **Mixer image overlays** for enhanced video composition

### Improvements in v15
- Stream Manager places nodes INSERVICE on ClusterNodeEvents
- Mixer A/V synchronization reliability improvements
- Configurable `group.instance.id` via environment variable
- Kafka topic retention periods adjusted for long-term stability
- AutoscalePlugin can reliably recreate Kafka producer
- Open Source core upgraded to 2.0.22
- Upgraded Node version in HTML5 SDK
- Predictable node type targeting in Stream Manager provisions

### Bug Fixes in v15
- Datachannel establishment now allows NetStream.Publish.IsAvailable
- **Social media push for Facebook now working properly** (critical fix)
- WHIP connections no longer momentarily report as WHEP
- **S3 uploads for recordings now retry on failures** (important for reliability)

### No Breaking Changes
✅ **Java 21** - Same as v14
✅ **Tomcat 11** - Same as v14
✅ **SSL Configuration** - Same as v14
✅ **Configuration Files** - Fully compatible

---
