_From: Upgrading from Red5 Pro v14 to v15_

## Performance Comparison: v14 vs v15

You may notice these improvements in v15:

### Stability Improvements
- **Mixer A/V sync**: More reliable audio/video synchronization
- **Kafka stability**: Better long-term stability for Stream Manager deployments
- **AutoscalePlugin**: More reliable Kafka producer recreation

### Bug Fixes
- **Facebook Social Pusher**: Now works reliably (was broken in some v14 scenarios)
- **S3 Recordings**: Automatic retry on failures (was manual in v14)
- **WHIP/WHEP reporting**: Correct connection type reporting
- **Data Channel**: Properly triggers NetStream.Publish.IsAvailable

---
