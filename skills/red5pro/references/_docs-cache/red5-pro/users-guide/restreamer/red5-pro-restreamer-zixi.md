---
title: Zixi Restreaming
description: ""
menu_order: 8
---

[Zixi](https://zixi.com) integration is supported on Ubuntu for 11.x and later distributions. Please see [Ubuntu setup document](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/ubuntuinstall/) for requirements.

Both push and pull are supported.


## API Calls

The Restreamer API documentation can be found in the [development section](/docs/red5-cloud/development/api/).

## Test Zixi Pull

For Zixi pull, the source stream is or will be published via Zixi Broadcaster (an Output in Zixi terms). Publishing a stream via Zixi Broadcaster is beyond the scope of this document. Red5 Pro Server will then use Zixi protocol to pull the stream (as a subscriber), and restream its packets locally (creating a new local live stream).

> NOTE: You will have 2 minutes (120000 milliseconds) from when you post the API call to start the stream; if you wait longer then you will need to re-create the stream via the API
 
1 - Create the Zixi Pull Restreamer by POSTing the create request:

`POST: https://(server)/live/restream`

```json
{
    "guid": "zixi1",
    "context": "live",
    "name": "cam1",
    "level": 0,
    "parameters": {
        "type": "zixi",
        "action": "create",
        "zixiUri": "zixi://remoteId@10.1.1.1:2077/live/cam1",
        "latency": 100,
        "sessionId": "",
        "ignoreDTLSErrors": "true",
        "dtlsOnly": "false",
        "ciphers": ""
    }
}
```

Where in Zixi Broadcaster, the Output is defined as

`Stream ID`: `live/cam1`

`Remote ID`: `remoteId`


2 - Go to the subscribe page (`https://your-red5.example.org/live/subscribe.jsp`) and refresh. You should see the stream `cam1` listed.

## Test Zixi Push

For Zixi push, the source stream is a live stream currently streaming on the Red5 Pro server. 

1 - In Zixi Broadcaster, a Push Input is defined for `stream1` (defining a Zixi input is beyond the scope of this document).

2 - Using Red5 Pro server, publish `live/stream1`.

3 - While publishing `live/stream1` to Red5 Pro, create the Zixi Pull Restreamer by POSTing the create request:

`POST: https://(server)/live/restream`

```json
{
    "guid": "zixi2",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "zixi-push",
        "action": "create",
        "host": "my-zixi.example.org",
        "latency": 500,
        "streamId": "stream1"
    }
}
```

4 - In Zixi Broadcaster, observe `stream1` is now live.



