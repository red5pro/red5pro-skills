_From: Round-Trip Authentication Validator_

## API CALLS AND RESPONSES FOR REMOTE AUTHENTICATION SERVER

The following API calls should be able to be run agains your remote authentication server, as their logic is used by the Round Trip Authentication Validator process.

### Validate Credentials

**Description**

Invoked by the `RoundTripValidator` to `validate` a client of a given type (`publisher/subscriber`) for a specified stream name.

**REQUEST**

* **ENDPOINT**: `validateCredentials`
* **METHOD**:  `POST`
* **DATA**:

```json
{
    "username": "<username>",
    "password": "<password>",
    "token": "<token>",
    "type": "<type>",
    "streamID": "<stream-id>"
}
```

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "result": "<boolean>",
    "url": "<optional-arbitrary-url>"
}
```

* `result` contains a boolean value indicating whether client action is permitted or denied
* `url` can be used to pass back an arbitrary URL to the authenticated client. The value fo the `url` attribute is stored on the `IConnection` object by property name `signedURL`. The parameter can be accessed by the server-side code using the `getStringAttribute method` on the `IConnection` object.

```java
IConnection conn = Red5.getConnectionLocal();
String url = conn.getStringAttribute("signedURL");
```

### Invalidate Credentials

**Description**

Invoked by the `RoundTripValidator` to `invalidate` a client of a given type (`publisher/subscriber`) for a specified stream name. Invalidate can be used to revoke a user `permission` or expire a `token`.

**REQUEST**

* **ENDPOINT**: `invalidateCredentials`
* **METHOD**:  `POST`
* **DATA**:

```json
{
    "username": "<username>",
    "password": "<password>",
    "token": "<token>",
    "type": "<type>",
    "streamID": "<stream-id>"
}
```

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "result": "<boolean>"
}
```

* `result` contains a boolean value indicating whether client action is permitted or denied
