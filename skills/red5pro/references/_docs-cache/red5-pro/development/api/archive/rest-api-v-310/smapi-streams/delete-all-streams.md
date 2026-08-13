_From: Streams_

## Delete All Streams

**Description**

Deletes/Clears all **inactive** stream *entries* from the system. The call is meant for administration/maintenance use. It can be used to forcefully clear stream entries that are "stuck" in the system. Using the optional query param `includeActive` in the api request, you can also force it to remove `active` stream entries (entried for healthy live streams). **NOTE: If you delete `active` streams, although it does not actually change the state of the live stream, it will make it imposssible for any new subscribers to be added to that stream going through Stream Manager, and additionally that stream will not be listed under the `event/list`.**

_CLEAR INACTIVE STREAM ENTRIES_

`http://{host}:{port}/streammanager/api/3.1/admin/event?accessToken=<accessToken>`

_CLEAR ALL STREAM ENTRIES_

`http://{host}:{port}/streammanager/api/3.1/admin/event?includeActive=true&accessToken=<accessToken>`

### For Removing Inactive Stream Entries (default behaviour)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event?accessToken=<accessToken>`
* **Method**: DELETE

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data**:

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "count": <deleted-stream--count>,
      "timestamp": <timestamp>
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event?accessToken=xyz123`
* **Method** : DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "count": 0,
      "timestamp": 1476193803551
    }
```

### For Removing All Stream Entries (`?includeActive=true`)

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event?includeActive=true&accessToken=<accessToken>`
* **Method**: DELETE

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data**:

```json
    {
      "errorMessage": "<error-message-string>",
      "timestamp": <error-timestamp>
    }
```

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "count": <deleted-stream--count>,
      "timestamp": <timestamp>
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/admin/event?includeActive=true&accessToken=xyz123`
* **Method** : DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "count": 1,
      "timestamp": 1476193803551
    }
```
