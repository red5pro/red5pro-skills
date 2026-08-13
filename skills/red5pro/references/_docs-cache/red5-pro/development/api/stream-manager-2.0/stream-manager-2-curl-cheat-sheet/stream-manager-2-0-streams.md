_From: Stream Manager 2.0 Curl Cheat Sheet_

## Stream Manager 2.0 Streams

### `stream/`

#### List All Streams in NodeGroup

```
curl -s https://as-test2.example.org/as/v1/streams/stream/allinone-oci-1
```

#### Get Stream Stats

**Aggregated (to publishers)**

```
curl -s https://as-test2.example.org/as/v1/streams/stream/allinone-oci-1/stream/live/stream1
```

**All streams on all nodes**

```
curl -s https://as-test2.example.org/as/v1/streams/stream/allinone-oci-1/stream/live/stream1?aggregate=false
```

#### Get Server for Publish 
(should error if stream already exists)

```
curl -s https://as-test2.example.org/as/v1/streams/stream/allinone-oci-1/publish/live/stream1
```

#### Get Server for Subscribe 
(will 404 is stream doesn’t exist)

```
curl -s https://as-test2.example.org/as/v1/streams/stream/allinone-oci-1/subscribe/live/stream1
```

### `provision/`

#### List All Provisions in NodeGroup

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/allinone-oci-1 | json_pp
```

#### Get Provision Details

```
curl -s -H "Authorization: Bearer ${JWT}" https://as-test1.example.org/as/v1/streams/provision/allinone-oci-1/live/stream1 | json_pp
```

#### Create Provision

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @provision-request.json https://as-test1.example.org/as/v1/streams/provision/allinone-oci-1
```

where `provision-request.json` is:

```json
[
  {
    "streamGuid": "live/test",
    "streams": [
      {
        "streamGuid": "live/test_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/test_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/test_1",
        "abrLevel": 1,
        "videoParams": {
          "videoWidth": 1280,
          "videoHeight": 720,
          "videoBitRate": 2000000
        }
      }
    ]
  }
]
```

#### Update Provision

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X PUT --data @provision-request.json https://as-test1.example.org/as/v1/streams/provision/allinone-oci-1
```

where `provision-request.json` is:

```json
[
  {
    "streamGuid": "live/test",
    "streams": [
      {
        "streamGuid": "live/test_3",
        "abrLevel": 3,
        "videoParams": {
          "videoWidth": 320,
          "videoHeight": 180,
          "videoBitRate": 500000
        }
      },
      {
        "streamGuid": "live/test_2",
        "abrLevel": 2,
        "videoParams": {
          "videoWidth": 640,
          "videoHeight": 360,
          "videoBitRate": 1000000
        }
      },
      {
        "streamGuid": "live/test_1",
        "abrLevel": 1,
        "videoParams": {
          "videoWidth": 1280,
          "videoHeight": 720,
          "videoBitRate": 2000000
        }
      }
    ]
  }
]
```

#### Delete Provision

```
curl -s -H "Authorization: Bearer ${JWT}" -X DELETE https://as-test1.example.org/as/v1/streams/provision/allinone-oci-1/myprovisionGuid
```
