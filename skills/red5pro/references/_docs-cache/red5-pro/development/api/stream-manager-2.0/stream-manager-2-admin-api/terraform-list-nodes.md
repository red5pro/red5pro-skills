_From: Stream Manager 2.0 Admin API_

## Terraform: List Nodes

Return a list of available images per Cloud Platform.

### Terraform: List Nodes Request

GET `https://<host>/as/v1/admin/terraform/node`

### Terraform: List Nodes Response

**On success:**

HTTP 200: OK

```json
{
  "DOCKER": {
    "nyc3": [
      "origin-OPd2EOh0nX",
      "edge-Pgy8OzcMzM",
      "edge-PeoSHDWuZY"
    ]
  }
}
```

Details are a map of Cloud Platform, to Region, to Node ID.
In this example, `DOCKER` is a Cloud Platform, and `nyc3` is a region.

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
