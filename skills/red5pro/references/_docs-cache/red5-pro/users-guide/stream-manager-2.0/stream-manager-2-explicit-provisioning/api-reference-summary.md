_From: Stream Manager 2.0 Explicit Provisioning_

## API Reference Summary

### Create Provision

**Endpoint:** `POST /as/v1/streams/provision/{nodeGroupName}`

**Request Body:** Array of `ProvisionRequest` objects

**Response:** `201 Created`

See [Stream Manager 2.0 Streams Provision API](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-streams-provision-api/) for complete schema.

---

### Distribute Provision

**Endpoint:** `POST /as/v1/streams/provision/{nodeGroupName}/distribute/{provisionGuid}`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `capabilities` | `Set<String>` | No | (inferred) | Comma-separated capabilities: `PUBLISH`, `TRANSCODE`, `SUBSCRIBE`, `MIX`, `ZIXI`, `XILINX` |
| `strict` | Boolean | No | `false` | If true, require exact subgroup match |
| `subgroup` | String | No | null | Preferred subgroup/region |
| `endpoints` | Integer | No | `1` | Number of nodes to select |
| `blocking` | Boolean | No | `true` | Wait for distribution to complete |

**Capability Precedence:**

1. **API parameter** (highest priority) - `?capabilities=SUBSCRIBE`
2. **Provision capabilities** - `"capabilities": ["TRANSCODE"]` in provision JSON
3. **Implicit capabilities** (lowest priority):
   - If provision has `videoParams` → `TRANSCODE`
   - If provision has `camParams` → `PUBLISH`
   - Otherwise → `PUBLISH`

**Response:** `200 OK` with array of `StreamLocation` objects

**Example:**
```bash
curl -H "Authorization: Bearer ${JWT}" -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/my-provision?capabilities=PUBLISH,TRANSCODE&endpoints=1&blocking=true"
```

---

### Get Server for Publish (Enhanced)

**Endpoint:** `GET /as/v1/streams/stream/{nodeGroupName}/publish/{streamGuid}`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `distribute` | Boolean | No | `true` | **New!** Set to `false` to skip provision distribution |
| `transcode` | Boolean | No | `false` | Request transcoder node (implies distribution) |
| `restream` | Boolean | No | `false` | Request restreamer provision (implies distribution) |
| `strict` | Boolean | No | `false` | Require exact subgroup match |
| `subgroup` | String | No | null | Preferred subgroup/region |
| `endpoints` | Integer | No | `1` | Number of origin nodes |

**New Behavior:**

- `distribute=false` - Only selects servers, does not distribute provision. Use this after calling `/distribute` explicitly.
- `distribute=true` (default) - Selects servers AND distributes provision (old behavior, still supported).

**Example (Skip Distribution):**
```bash
# 1. Distribute explicitly
curl -H "Authorization: Bearer ${JWT}" -X POST \
     "https://streammanager.example.com/as/v1/streams/provision/default/distribute/my-provision?capabilities=PUBLISH"

# 2. Get server without redistributing
curl "https://streammanager.example.com/as/v1/streams/stream/default/publish/live/mystream?distribute=false"
```

---

### Delete Provision

**Endpoint:** `DELETE /as/v1/streams/provision/{nodeGroupName}/{provisionGuid}`

Deletes the provision and kills any active restreamers on nodes.

**Example:**
```bash
curl -H "Authorization: Bearer ${JWT}" -X DELETE \
     "https://streammanager.example.com/as/v1/streams/provision/default/my-provision"
```

---
