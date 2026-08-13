---
title: Zixi output
description: ""
menu_order: 11
---

## Zixi Output

The re-stream API supports pushing streams from red5pro to remote hosts over zixi protocol. The re-stream request can be made before or after the red5pro broadcast is started. The re-stream intent will persist until the API is called to remove it. This allows the broadcaster to stop and restart at-will without having to re-initiate the zixi output.


### Testing Zixi Output

Using a zixi compatible framework such as 'zixi broadcaster', create an input of type 'push', making note of the stream id, optional username/password, and optional encryption. 


Example with AES128. For non encrypted push, omit 'aesType' and 'decryptKey' parameters.

```json

{
"guid":"myguid",
"context":"live",
"name":"stream1",
"level":0,
"isRestricted":false,
"restrictions":[],
"primaries":[],
"secondaries":[],
"parameters":{
	"type":"zixi-push",
	"action":"create",
	"host":"zixi.red5.net",
	"latency":500,
	"streamId":"stream1",
   "aesType":0,
   "decryptKey":"f80459404547664469ef3fafa4a3e80b"
	}
}


```

The above parameters will begin forwarding broadcast 'live/stream1' as soon as the stream is published and the 'zixi broadcaster' software should show the input stream as 'active' and ready for use. When 'live/stream1' is unpublished, the 'zixi broadcaster' should then show the input as inactive. 

To utilize the optional user/password, configure the 'zixi broadcaster' input stream and then add 'username' and 'password' parameters to the json API call. 

#### List of Parameters

type - zixi-push

action - create | kill | list

context - red5pro stream context name/scope.

name	- red5pro stream name.

guid	 	- A unique to zixi-api identifier within the server node. Must be unique.

Required Parameters

host - receiver host.

streamId - stream id at receiver.

Optional Parameters

username - 

password - 

port - Default port is 2088 for zixi pushers.

latency - Milliseconds. Default latency is 500ms.

aesType - Omit for non-encrypted. 0 = AES_128, 1 = AES_192, 2 = AES_256, 3 = CHACHA20

decryptKey - AES key.

Reserved parameters.

isRestricted - reserved, set to false.

restrictions - reserved, set to empty array.

primaries - reserved, set to empty array.

secondaries - reserved, set to empty array.


### Zixi Push Kill

To remove the red5pro pushing intent, call the API with the kill command. This will immediately stop an active pushing session. 

```json

{
"guid":"myguid",
"context":"live",
"name":"stream1",
"level":0,
"isRestricted":false,
"restrictions":[],
"primaries":[],
"secondaries":[],
"parameters":{
	"type":"zixi-push",
	"action":"kill"
	}
}


```


### Zixi Push List

To list existing zixi outputs, use the zixi-push list commands. The results will be in json format. Each output listed will show the remote host, if its connected, and if the  broadcast is currently live.

```json
{
"guid":"",
"context":"",
"name":"",
"level":0,
"isRestricted":false,
"restrictions":[],
"primaries":[],
"secondaries":[],
"parameters":{
	"type":"zixi-push",
	"action":"list"
	}
}

```

Response:

```json
{
    "message": "Endpoints",
    "endpoints": []
}
```
