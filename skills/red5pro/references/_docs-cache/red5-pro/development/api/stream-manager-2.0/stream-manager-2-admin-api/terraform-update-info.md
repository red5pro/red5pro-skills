_From: Stream Manager 2.0 Admin API_

## Terraform: Update Info

Prompt the server to query Terraform for updated information from each cloud platform about: instance types, images, nodes, and regions. This request proceeds in the background and when responses arrive, the internal stores serving the above Terraform requests are updated.

Optionally, you may specify `which` to restrict the update to one kind of data (a single query completes faster -- if you just need to update IMAGE names, for instance).

### Terraform: Update Info Request

GET `https://<host>/as/v1/admin/terraform/updateInfo?which=<queryType>`

`which`: String. Optional. If included, must be one of: `IMAGE`, `INSTANCE_TYPE`, `NODE`, or `REGION`.


### Terraform: Update Info Response

**On success:**
HTTP 200: OK

Body: N/A

This request immediately and supplies no information of its own.

**On error:**
HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
