_From: Stream Manager 2.0 Explicit Provisioning_

## Three-Level Capability Precedence

When selecting servers for provision distribution, capabilities are determined using a **three-level precedence system**. This applies to both:
- The new `/distribute` endpoint
- The traditional Get Server for Publish endpoint, when `distribute=true` (or unspecified; `true` by default)

This gives you flexible control over where provisions are distributed.

### 1. API Parameter Capabilities (Highest Priority)

If the API call includes an explicit `capabilities` parameter, those capabilities are used exclusively.

**Example:**
```
POST /as/v1/streams/provision/default/distribute/my-provision?capabilities=SUBSCRIBE
```

**Use case:** Override provision settings to push a restreamer to edge nodes instead of origin.

### 2. Provision Capabilities (Medium Priority)

If no API capabilities are provided, check if the provision itself has a `capabilities` field. If present and non-empty, use those capabilities.

**Example provision:**
```json
{
  "provisionGuid": "my-provision",
  "capabilities": ["TRANSCODE","PUBLISH"],
  "streams": [...]
}
```

**Use case:** Provision declares it requires transcoding capability and an ingress ("PUBLISH") node.

### 3. Implicit Capabilities (Lowest Priority/Fallback)

If neither API nor provision specify capabilities, derive them implicitly:

- If provision has `videoParams` → Implicit `TRANSCODE` capability
- If provision has `camParams` → Implicit `PUBLISH` capability
- Otherwise → Default `PUBLISH` capability

**Example:**

```json
{
  "provisionGuid": "abr-provision",
  "streams": [
    {
      "streamGuid": "live/test_1",
      "videoParams": {"videoWidth": 1280, ...}
    }
  ]
}
```

This implicitly requires `TRANSCODE` capability because of `videoParams`.

### Why This Matters

**Flexibility:** The precedence system allows you to:
- Create a provision with default capabilities
- Override them per-distribution using the API parameter
- Enable new use cases (like egress restreaming) without modifying existing provisions

**Example - Egress Restreaming:**

A restreamer provision normally goes to origin nodes (implicit `PUBLISH`). But you can override with `?capabilities=SUBSCRIBE` to push it to edge nodes instead:

```
POST /as/v1/streams/provision/default/distribute/rtmp-push?capabilities=SUBSCRIBE
```

This is how egress restreaming works - the API parameter overrides the implicit behavior.

---
