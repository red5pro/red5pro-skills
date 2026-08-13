---
title: Restreamer API - Zixi Push/Pull
menu_order: 4
---

Restreamer supports zixi protocol and enables pulling or pushing zixi streams to/from remote hosts. The red5pro server can pull or push a zixi stream. It does not support receiving a push or pull request client.

### Zixi Pull Create

Request:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "zixi",
        "action": "create",
        "zixiUri": "zixi://stream1:password@localhost:2077/stream1",
        "latency": 300,
        "sessionId": "",
        "ignoreDTLSErrors": "true",
        "dtlsOnly": "false",
        "ciphers": "",
        "aesType": 0,
        "decryptKey": "ccf7b3e04618e0cc153f7492e6d81763"
    }
}
```

`type`: zixi

`action`: create | kill | list

`context`: red5pro stream context name/scope.

`name`: red5pro stream name.

`guid`: A unique to zixi-api identifier within the server node.

`zixiUri`: URL format: zixi://[user[:password]@]server[:port]/channel

`sessionId`: Optional. A session identifier that will be used for authorization.

`latency`: Optional. maximum latency, higher values allow more time for error correction.

`ignoreDTLSErrors`: Optional. ignore certificate error on dtls connection. default is true.

`dtlsOnly: Optional. connect only using DTLS protocol, never fallback to unencrypted. default is false.

`ciphers`: Optional. list of zero of more ciphers for DTLS handshake, in OpenSSL format but comma separated. Not specifying any will use defaults.

`aesType`: Optional. Encryption mode integer.-1=none,  0 = AES_128, 1 = AES_192, 2 = AES_256, 3 = CHACHA20

`decryptKey`: Optional. Decryption key for aes/chacha20 

`level` - ABR priority level. Zero for single non-ABR stream.


#### Zixi supported ciphers 

```
ECDHE-ECDSA-AES256-GCM-SHA384, ECDHE-RSA-AES256-GCM-SHA384, ECDHE-ECDSA-CHACHA20-POLY1305, ECDHE-RSA-CHACHA20-POLY1305, ECDHE-ECDSA-AES128-GCM-SHA256, ECDHE-RSA-AES128-GCM-SHA256, ECDHE-ECDSA-AES256-SHA384, ECDHE-RSA-AES256-SHA384, ECDHE-ECDSA-AES128-SHA256, ECDHE-RSA-AES128-SHA256
```

### Zixi Pull Stop
Change action to 'kill'

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "zixi",
        "action": "kill"
    }
}
```

### Zixi pull List

Change action to 'list'

```json
{
    "guid": "",
    "context": "",
    "name": "",
    "level": 0,
    "parameters": {
        "type": "zixi",
        "action": "list"
    }
}
```

### Zixi Push Create

Creates intent to push a stream to remote host. The push-create action can be called before or after the publish stream is created. The push-create intent persists after stream is stopped.


Example with AES128. For non encrypted push, omit aesType and decryptKey.

```json
{
    "guid": "myguid",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "zixi-push",
        "action": "create",
        "host": "zixi.red5.net",
        "latency": 500,
        "streamId": "stream1",
        "aesType": 0,
        "decryptKey": "f80459404547664469ef3fafa4a3e80b"
    }
}
```

`type`: zixi-push

`action`: create | kill | list

`context`: red5pro stream context name/scope.

`name`: red5pro stream name.

`guid`: A unique to zixi-api identifier within the server node. Must be unique.

Required Parameters

`host`: receiver host.

`streamId`: stream id at receiver.

Optional Parameters

`username`: 

`password`: 

`port`: Default port is 2088 for zixi pushers.

`latency`: Milliseconds. Default latency is 500ms.

`aesType`: Omit for non-encrypted. 0 = AES_128, 1 = AES_192, 2 = AES_256, 3 = CHACHA20

`decryptKey`: AES key.


### Zixi Push Kill

```json
{
    "guid": "myguid",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "zixi-push",
        "action": "kill"
    }
}
```

### Zixi Push List


```json
{
    "guid": "",
    "context": "",
    "name": "",
    "level": 0,
    "parameters": {
        "type": "zixi-push",
        "action": "list"
    }
}
```

