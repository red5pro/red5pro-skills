_From: Stream Manager 2.0 Admin API_

## Terraform: List Instance Types

Return a list of available images per Cloud Platform.

### Terraform: List Instance Types Request

GET `https://<host>/as/v1/admin/terraform/instanceType`

### Terraform: List Instance Types Response

**On success:**

HTTP 200: OK

```json
{
  "DOCKER": [
    "1cpu_2gb",
    "2cpu_4gb",
    "4cpu_8gb",
    "8cpu_16gb"
  ]
}
```

Details are a map of Cloud Platform, to Instance Type name.
In this example, `DOCKER` is a Cloud Platform.

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
