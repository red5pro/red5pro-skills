---
title: Proxy
description: ""
menu_order: 14
---

* [Get Proxy Clients](#get-proxy-clients)
* [Get Proxy Client](#get-proxy-client)
* [Remove Proxy Client](#remove-proxy-client)
* [Remove All Proxy Clients](#remove-all-proxy-clients)

## Get Proxy Clients

**Description**

Fetches the list of registered proxy client sessions in the system. This includes active and possibly `unhealthy` connections. You can also provide a `filter` as a query parameter in the request to filter out `healthy` and `unhealthy` connections selectively.

A Proxy connection consists of two parts - a browser client and a proxy client. Ideally when one is closed the other should also close in case of a normal scenario. If this does not happen the connection is called an `unhealthy` connection. Unhealthy connections are scanned and removed by the proxy connection manager periodically under normal conditions.

Therefore based on the states of connection, the query parameter `filter` can take three values:

* `healthy`: Implies collecting connections that have both browser client and proxy client connected
* `unhealthy`: Implies collecting connections that either browser client or proxy client disconnected
* `any`: Implies collecting all connections unconditionally (default)

By default, if the filter is not specified it implies `any`.

Optionally you can also use the query parameter `count=true` to request a quick count of total connections, instead of fetching the details of each connection as a list.

**REQUEST**

* **URL**:

_GET ALL PROXY CONNECTIONS_

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>`

OR

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&filter=any`

_ALL PROXY CONNECTIONS TOTAL COUNT_

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&count=true`

OR

_GET UNHEALTHY PROXY CONNECTIONS_

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&filter=unhealthy`

_GET UNHEALTHY PROXY CONNECTIONS TOTAL COUNT_

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&filter=unhealthy&count=true`

OR

_GET HEALTHY PROXY CONNECTIONS_

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&filter=healthy`

_GET HEALTHY PROXY CONNECTIONS TOTAL COUNT_

`http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&filter=healthy&count=true`

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>&filter=<filter>`
* **Method**: GET

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
[
    {
        "id": "<proxy-client-id>",
        "targetHost": "<proxy-target-host>",
        "targetApp": "<proxy-target-app>",
        "clientConnected": <proxy-client-state>,
        "proxyConnected": <proxy-state>,
        "clientUserAgent": "<proxy-client-useragent>",
        "clientAddress": "<proxy-client-address>",
        "secureClient": <proxy-client-secure-access>,
        "creationTime": <proxy-client-creationtime>
    }
]

```

**Example: Get all proxy connections**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[
    {
        "id": "412A3BEAC78F67FBB7C6-0",
        "targetPort": 50875,
        "targetHost": "192.168.1.46",
        "targetApp": "live",
        "clientConnected": true,
        "proxyConnected": true,
        "clientUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3684.003 Safari/537.36",
        "clientAddress": "127.0.0.1",
        "secureClient": false,
        "creationTime": 1555593827183
    }
]
```

**Example: Get all unhealthy connections**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=xyz123&filter=unhealthy`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[]
```

**Example: Count all proxy connections**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=xyz123&count=true`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
{
    "count": 1,
    "timestamp": 1555598320106
}
```

**Example: Count unhealthy connections**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=xyz123&filter=unhealthy&count=true`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
[]
```

## Get Proxy Client

**Description**

Fetches proxy connection information by ID. Returns an error response if no connection is found by the provided ID.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients/{clientId}?accessToken=<accessToken>`
* **Method**: GET

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
    "id": "<proxy-client-id>",
    "targetHost": "<proxy-target-host>",
    "targetApp": "<proxy-target-app>",
    "clientConnected": <proxy-client-state>,
    "proxyConnected": <proxy-state>,
    "clientUserAgent": "<proxy-client-useragent>",
    "clientAddress": "<proxy-client-address>",
    "secureClient": <proxy-client-secure-access>,
    "creationTime": <proxy-client-creationtime>
}
```

**Example:**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients/412A3BEAC78F67FBB7C6-0?accessToken=xyz123`
* **Method**: GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
 {
    "id": "412A3BEAC78F67FBB7C6-0",
    "targetPort": 50875,
    "targetHost": "192.168.1.46",
    "targetApp": "live",
    "clientConnected": true,
    "proxyConnected": true,
    "clientUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3684.003 Safari/537.36",
    "clientAddress": "127.0.0.1",
    "secureClient": false,
    "creationTime": 1555593827183
}
```

## Remove Proxy Client

**Description**

Terminates proxy client by requested client id. Returns an error response, if the client is not found.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients/{clientId}?accessToken=<accessToken>`
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
* **Data**: NA

**Example:**

**REQUEST**

* **URI**: `http://localhost:5080/streammanager/api/4.0/admin/proxy/clients/773F0F7B002C38CE5329-1?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**: NA

## Remove All Proxy Clients

**Description**

Terminates all proxy clients in the system.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/admin/proxy/clients?accessToken=<accessToken>`
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
* **Data**: NA

**Example:**

**REQUEST**

* **URI**: `http://localhost:5080/streammanager/api/4.0/admin/proxy/clients?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**: NA