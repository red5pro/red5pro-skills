---
title: VOD
description: ""
menu_order: 11
---

The VOD API requires [cloud storage for VOD](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/) to be configured on your server nodes. Use the `useCloud=true` query parameter to ensure that the stream manager lists recordings that are in your cloudstorage buckets.

> NOTE: the Stream Manager uses the cloudstorage information configured on your origin servers.

* [List cloud storage HLS content](#list-cloud-storage-hls-content)
* [List cloud storage media files content](#list-cloud-storage-media-files-content)

## List cloud storage HLS content

**Description**

Returns list of HLS playlists (m3u8) available on cloud bucket (S3 etc) for playback. These media files are created when a live stream is recorded on Red5 Pro with the 'record' parameter and then moved to cloud storage by Red5 Pro's cloud-storage plugin.

**REQUEST**

* **URI**: `http://{host}:{port}/streammanager/api/4.0/media/{scopeName}/playlists?useCloud=true`

    The `scopeName` list will include subscope recordings.

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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/media/live/playlists?useCloud=true`
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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/media/{scopeName}/mediafiles?useCloud=true`

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

* **URI**: `http://{host}:{port}/streammanager/api/4.0/media/live/mediafiles?useCloud=true`
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