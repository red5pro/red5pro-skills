---
title: Interstitial Media Insertion API
description: ""
menu_order: 40
---

See [this doc](/docs/red5-pro/users-guide/interstitial/red5-pro-interstitial-server-configuration/) for server configuration requirements to support Interstitial Media Insertion. **NOTE:** autoscale environments require **relay** node for the interstitial to work as designed.

# Standalone Server URI

In a standalone environment, forwarding requests are **POST**ed directly to the InterstitialREST servlet.

**Example URI**

`http://localhost:5080/live/interstitial`

# Stream Manager URI

In an autoscale environment, Interstitial Media Insertion requests are **POST**ed to the Stream Manager, which then delegates them to the correct relay node.

**Example URI**

The Stream Manager URI requires the **access token**. `https://<stream-manager-URL>/streammanager/api/4.0/admin/interstitial?accessToken=<access-token>`


## Request Body

In both the Stream Manager and Standalone cases, the body of the request is the same. It contains JSON data describing an `com.red5pro.interstitial.api.InterstitialRequest` with zero, one, or more `com.red5pro.interstitial.api.InterstitialInserts`, each of which specifies a target live stream and a second "interstitial" live stream to be inserted into the target.

When an `InterstitialSession` is already active, the insert can be removed (returning to the target stream) by specifying the target stream in the optional `resume` field.

Note that if both `resume` and `inserts` parameters are present, then **`inserts` is ignored** and `resume` takes precedence.

### Example: Inserts

```json
{
  "user": "any",
  "digest": "any",
  "inserts": [
    {
      "id": 3,
      "target": "live/stream1",
      "interstitial": "live/stream2",
      "loop": true,
      "type": "INDEFINITE",
      "isInterstitialVideo": true,
      "isInterstitialAudio": true,
      "start": 0,
      "duration": 30000
    }
  ]
}
```

The above example defines an array with a single `InterstitialInsert`. These are its fields:

* **`user`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler.
* **`digest`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler.
* **`inserts`** This is the array of `InterstitialInsert`.
* **`id`** Integer insert ID, unused by the server. It is passed through to the IInterstitialRequestHandler.
* **`target`** The target live stream, including both context path and stream name.
* **`interstitial`** The new stream to insert into the live stream, including both context path and stream name. Or, for static content, the name of an FLV file found in `webapps/live/streams`.
* **`loop`** For FLV streams, this boolean indicates whether the clip should loop when it ends.
* **`isInterstitialAudio`** Boolean value defines if the Audio channel should be inserted. Optional. Defaults to true.
* **`isInterstitialVideo`** Boolean value defines if the Video channel should be inserted. Optional. Defaults to true.
* **`type`** This is `InterstitialDurationControlType`, an enum which can have the values `INDEFINITE`, `STREAM_CLOCK`, or `WALL_CLOCK`. This determines how (or if) the `start` and `duration` parameters are interpreted.
  * **`INDEFINITE`** starts immediately. `start` and `duration` are unused. <br/>
  * **`STREAM_CLOCK`** starts `start` milliseconds after publish-start and ends after `duration`. <br/>
  * **`WALL_CLOCK`** starts at `start` UTC milliseconds and ends after `duration`.
* **`start`** milliseconds.
* **`duration`** milliseconds.

The interstitial replaces the target video either for a specified duration or indefinitely.

### Example: Resume

```json
{
	"user":"any",
	"digest":"any",
	"resume":"live/stream1"
}
```

* **`user`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler.
* **`digest`** This string is required but unused by the InterstitialREST servlet. It is passed through to the IInterstitialRequestHandler.
* **`resume`** This is the context path and name of the target stream to resume.