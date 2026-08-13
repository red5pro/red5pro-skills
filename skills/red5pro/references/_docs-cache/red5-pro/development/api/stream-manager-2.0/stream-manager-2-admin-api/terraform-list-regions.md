_From: Stream Manager 2.0 Admin API_

## Terraform: List Regions

Return a list of available images per Cloud Platform.

### Terraform: List Regions Request

GET `https://<host>/as/v1/admin/terraform/region`

### Terraform: List Regions Response

**On success:**
HTTP 200: OK

```json
{
  "DOCKER": [
    "default"
  ]
}
```

Details are a map of Cloud Platform, to Region name.
In this example, `DOCKER` is a Cloud Platform.

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
