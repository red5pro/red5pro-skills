_From: Mixer APIs_

## List Compositions

**DESCRIPTION**:

Lists compositions that are provisioned through the Stream Manager.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/composition?accessToken=<accessToken>`

**METHOD**: GET

**RESPONSE**

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

* **SUCCESS**: HTTP CODE 200
* **Data**:

```json
[
    "<composition1>",
    "<composition2>",
    "<composition3>"
]
```

**Example**: Lists the provisioned compositions.

**REQUEST URI**: `https://streammanager.url.com/streammanager/api/4.0/composition?accessToken=xyz123`

**Method**: GET

**RESPONSE**

* **Success**: HTTP CODE 201
* **Data**:

```json
[
    "test9",
    "test8",
    "test1"
]
```
