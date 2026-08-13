_From: Stream Manager 2.0 Admin API_

## Terraform: List Images

Return a list of available images per Cloud Platform.

### Terraform: List Images Request

GET `https://<host>/as/v1/admin/terraform/image`

### Terraform: List Images Response

**On success:**

HTTP 200: OK

```json
{
  "DOCKER": {
    "default": [
      "red5pro-docker.jfrog.io/red5pro-server-public:12.2.3",
      "as-mock-node"
    ]
  }
}
```

Details are a map of Cloud Platform, to Region, to Image name.
In this example, `DOCKER` is a Cloud Platform, and `default` is a region.

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
