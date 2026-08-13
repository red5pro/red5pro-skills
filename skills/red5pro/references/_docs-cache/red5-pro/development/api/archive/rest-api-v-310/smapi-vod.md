---
title: VOD
description: ""
menu_order: 12
---

The VOD API requires [cloud storage for VOD](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/) to be configured on your server nodes.

* [List cloud storage HLS content](#list-cloud-storage-hls-content)
* [List cloud storage media files content](#list-cloud-storage-media-files-content)
* [Cloud storage VOD subscribe](#cloud-storage-vod-subscribe)
* [List active VOD](#list-active-vod)
* [List active VOD with stats](#list-active-vod-with-stats)

## List cloud storage HLS content

**Description**

Returns list of HLS playlists (m3u8) available on cloud bucket (S3 etc) for playback. These media files are created when a live stream is recorded on Red5 Pro with the 'record' parameter and then moved to cloud storage by Red5 Pro's cloud-storage plugin.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/{scopeName}/playlists`
    OR

    `http://{host}:{port}/streammanager/api/3.1/media/{scopeName}/playlists/{subscope}`

    If your content was recorded at a sub-scope level of an application, you will need to specify the sub-scope path at the `{subscope}` placeholder.

* **Method**: GET

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data** :

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
      "playlists": [
        {
          "name": "<playlist-name>",
          "lastModified": <last-modified>,
          "length": <vod-duration>,
          "url": "<playlist-url>"
        }
      ]
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/live/playlists`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "playlists": [
        {
          "name": "stream1.m3u8",
          "lastModified": 1475674784000,
          "length": 210,
          "url": "https://red5vodpro.s3.amazonaws.com/live/stream1/stream1.m3u8"
        }
      ]
    }
```

## List cloud storage media files content

**Description**

Returns list of FLV and MP4 media files available on cloud storage bucket (S3 etc) for playback. These media files are created when a live stream is recorded on Red5 Pro with the `record` parameter and then is moved to cloud storage by the Red5 Pro cloud-storage writer Post-Processor.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/{scopeName}/mediafiles`
    OR

    `http://{host}:{port}/streammanager/api/3.1/media/{scopeName}/mediafiles/{subscope}`

    If your content was recorded at a sub-scope level of an application, you will need to specify the sub-scope path at the `{subscope}` placeholder.

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
      "mediafiles": [
        {
          "name": "<media-name>",
          "lastModified": <last-modified>,
          "length": <duration>,
          "url": "<media-url>"
        }
      ]
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/live/mediafiles`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "mediafiles": [
        {
          "name": "stream1.flv",
          "lastModified": 1475674784000,
          "length": 1519198,
          "url": "https://red5vodpro.s3.amazonaws.com/live/streams/stream1.flv"
        }
      ]
    }
```

## Cloud storage VOD subscribe

**Description**

Requests stream-manager for a suitable edge server for media subscription. This is valid for FLV and MP4 media files only and is applicable when using the cloud-storage plugin. The media files are stored on cloud bucket and played back through Red5 Pro.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/{scopeName}/{streamname}.{extension}`
* **Method**: GET

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404`
* **Data** :

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
      "name": "<media-name>",
      "scope": "<scope>",
      "serverAddress": "<edge-server-addess>",
      "region": "<region-code>"
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/live/mystream.flv`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
      "name": "mystream.flv",
      "scope": "live",
      "serverAddress": "104.199.230.92",
      "region": "asia-east1"
    }
```

## List active VOD

**Description**

Lists all VOD streams which have active subscribers.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/list`
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
      [
      {
        "serverAddress": "<edge-server-addess>",
        "name": "<media-name>",
        "type": "<media-type>",
        "scope": "<scope>"
      }
    ]
    }
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/1.0/media/list`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    {
    [
      {
        "serverAddress": "104.199.230.92",
        "name": "sample.flv",
        "type": "flv",
        "scope": "live"
      }
    ]
    }
```

## List active VOD with stats

**Description**

Lists all VOD streams which have active subscribers along with the subscriber count.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/list/stats`
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
        "currentSubscribers": <current-subscribers>,
        "serverAddress": "<edge-server-addess>",
        "name": <media-name>,
        "type": <media-type>,
        "scope": <scope>
      }
    ]
```

**Example**

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/3.1/media/list/stats`
* **Method** : GET

**RESPONSE**

* **Success**: HTTP CODE `200`
* **Data**:

```json
    [
      {
        "currentSubscribers": 1,
        "serverAddress": "104.199.230.92",
        "name": "sample.mp4",
        "type": "mp4",
        "scope": "live"
      }
    ]
```