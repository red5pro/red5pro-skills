_From: Stream Manager 2.0 Explicit Provisioning_

## Troubleshooting

### Provision Not Distributing

**Symptom:** `/distribute` returns success but nodes don't show the provision.

**Check:**
1. Verify node roles have the requested capabilities in nodegroup config
2. Check node capacity - nodes over capacity are skipped
3. Verify nodes are in `INSERVICE` state: `GET /as/v1/streams/stream/debug/nodes`
4. Check Stream Manager logs for errors

### Restreamer Not Starting

**Symptom:** Provision distributed but restreamer doesn't activate.

**Check:**
1. Check node logs at `/usr/local/red5pro/log/red5.log`
2. For ingest: verify source is reachable from node
3. For egress: verify source stream is LIVE before restreamer attempts

### Stream State is WAIT Instead of LIVE

When a restreamer is provisioned but the source stream doesn't exist yet, the state shows `WAIT`. This is expected - once the source appears or restarts, the restreamer will activate and state becomes `LIVE`.

### Capability Confusion

**Symptom:** Wrong nodes selected for distribution.

**Remember the precedence:**
1. API `?capabilities=` parameter (overrides everything)
2. Provision `"capabilities": [...]` field
3. Implicit (inferred from `videoParams`/`camParams`)

Use explicit API parameter to override: `?capabilities=SUBSCRIBE`

---
