_From: Stream Manager 2.0 Streams Provision API_

## Distribute Provision

Explicitly distribute an existing provision to servers based on capabilities.

Capability Precedence (highest to lowest priority): API `capabilities` parameter, Provision's own `capabilities` field, Implicit capabilities based on provision type (videoParams → TRANSCODE, camParams → PUBLISH, otherwise → PUBLISH).

If `capabilities` includes TRANSCODE, provisions are distributed to both transcoder and origin nodes.

For a complete guide on explicit provisioning workflows, see [Explicit Provisioning Guide](/docs/red5-pro/users-guide/stream-manager-2.0/stream-manager-2-explicit-provisioning/).

### Distribute Provision Request

POST `https://<host>/as/v1/streams/provision/<nodeGroupName>/distribute/<provisionGuid>`

`strict`: Optional, default `false`. Boolean. Enforce strict subgroup filtering.

`subgroup`: Optional. String. Target subgroup for server selection.

`endpoints`: Optional, default `1`. Integer. Number of endpoints to select.

`capabilities`: Optional. Comma-separated String. Required capabilities. Valid values: `PUBLISH`, `TRANSCODE`, `SUBSCRIBE`, `MIX`, `XILINX`.

`transcode`: Optional. Boolean. Request transcoder node. Used for implicit capability determination if `capabilities` not specified.

`restream`: Optional. Boolean. Request restreamer provision. Used for implicit capability determination if `capabilities` not specified.

`blocking`: Optional, default `true`. Boolean. Whether distribution should block until the target server has returned a response.

No body required.

### Distribute Provision Response

**On success:**

HTTP 200: OK

```json
[
  {
    "streamGuid": "live/test",
    "serverAddress": "10.0.0.100",
    "nodeRole": "origin",
    "nodeState": "INSERVICE",
    "subGroup": "us-east",
    "subscribers": 0
  }
]
```

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header

HTTP 404: Not Found | No NodeGroup found with `nodeGroupName`, or no provision found for `provisionGuid`.

HTTP 422: Validation Error | Invalid parameters or no servers available with required capabilities.
