_From: Stream Manager 2.0 Streams Provision API_

## Example Provisions

### Pre-Processing

```json

```

### Restreamer

```json
{
  "provisionGuid": "restreamer1",
  "streams": [
	{
	  "streamGuid": "live/test1",
	  "abrLevel": 0,
	  "camParams": {
		"properties": {
			"type": "ipcam",
			"action": "create",
			"remoteContextPath": "axis-media",
			"remoteStreamName": "media.amp",
			"host": "192.168.1.10",
			"port": 5443
		}
	  }
	}
  ]
}
```

### Transcode ABR Variants

```json
{
  "provisionGuid": "live/test",
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
```
