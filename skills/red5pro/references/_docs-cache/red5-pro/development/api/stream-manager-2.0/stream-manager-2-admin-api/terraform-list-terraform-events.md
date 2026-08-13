_From: Stream Manager 2.0 Admin API_

## Terraform: List Terraform Events

Return a list of events received from the AS-Terraform service.
Terraform events include errors reported by Terraform, among other information.

### Terraform: List Terraform Events Request

GET `https://<host>/as/v1/admin/terraform/node/events/<nodeGroupName>`

`nodeGroupName`: the name of the NodeGroup. **Note** The `nodeGroupName` is used as a filter; if no such NodeGroup exists, then the request will succeed and collect no events, and return an empty map.

No body.

### Terraform: List Events Response

**On success:**

HTTP 200: OK

```json
{
  "20dS7MKNV3": [
    {
      "commandId": "27895a0a-091c-4a3b-90f7-4b44da2d2e83",
      "nodeId": "20dS7MKNV3",
      "status": "NODE_CREATING",
      "details": "Terraform NODE_CREATING node id: 20dS7MKNV3",
      "timestamp": 1710366402778,
      "executionTime": 0,
      "cloudPlatform": "DOCKER"
    },
    {
      "commandId": "27895a0a-091c-4a3b-90f7-4b44da2d2e83",
      "nodeId": "20dS7MKNV3",
      "status": "NODE_CREATED",
      "details": "Terraform created node id: 20dS7MKNV3",
      "messages": [
        "{\"format_version\":\"1.0\",\"terraform_version\":\"1.7.2\"}"
      ],
      "timestamp": 1710366403507,
      "executionTime": 729,
      "cloudPlatform": "DOCKER"
    }
}
```

The response is a Map of String (Node ID, `20dS7MKNV3` in the example above) to an array of `TerraformEvent`. A `TerraformEvent` may contain the following fields:

`commandId`: an internal ID used to correlate automated Terraform commands

`nodeId`: the Node ID that the command is about

`status`: An `enum`. One of: `NODE_CREATING`, `NODE_CREATED`, `NODE_CREATION_FAILED`, `NODE_DESTROYING`, `NODE_DESTROYED`, `NODE_DESTRUCTION_FAILED`, or `INFO`.

`details`: contains free-form message details, including error messages.

`messages`: list of strings, each one is row of stdout of Terraform execution. Each string is actually serialized JSON. Contains details about the event, including errors Terraform encountered during execution.

`executionTime`: time taken to execute the Terraform command, in milliseconds.

`cloudPlatform`: the Cloud Platform being used.

`timestamp`: in epoch milliseconds

**On error:**

HTTP 401: Unauthorized | Missing or invalid JWT Authorization header
