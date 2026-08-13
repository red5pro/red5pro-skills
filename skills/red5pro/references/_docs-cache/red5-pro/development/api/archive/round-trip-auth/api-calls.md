---
title: Round Trip Authentication API Calls
description: ""
menu_order: 1
---

## API Calls and Responses for Remote Authentication Server

The following API calls should be able to be run against your remote authentication server, as their logic is used by the Round Trip Authentication Validator process.

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

**Where `type` is `publisher` or `subscriber`**, and `streamID` is the stream name.

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "result": "<boolean>",
    "url": "<optional-arbitrary-url>"
}
```

**For example**, you can make the following POST request to your mock authentication back-end to make sure that it is validating publisher credentials:

POST: `http://192.168.1.1:3000/validateCredentials`

DATA:

```json
{
    "username": "username",
    "password": "password",
    "token": "token",
    "type": "publisher",
    "streamID": "stream1"
}
```

And you should get the following **Response:**

`{"result":true,"url":""}`

NOTES: 

* `result` contains a boolean value of `true` or `false` indicating whether client action is permitted or denied
* `url` can be used to pass back an arbitrary URL to the authenticated client. The value of the `url` attribute is stored on the `IConnection` object by the property name `signedURL`. The parameter can be accessed by the server-side code using the [getStringAttribute method](/docs_static/red5/org/red5/server/AttributeStore.html#getStringAttribute-java.lang.String-) on the `IConnection` object.

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

# Data Formatting

Since the above requests need to be sent from a client-side application, the Content-Type must be `raw-body json`, and can be tested with postman