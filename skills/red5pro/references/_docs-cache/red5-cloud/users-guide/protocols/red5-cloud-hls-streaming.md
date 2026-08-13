---
title: Red5 Cloud HLS Streaming
menu_order: 1
---

HLS (HTTP Live Streaming) delivers your stream as a series of small HTTP segments plus a playlist file, which any HLS capable player can request over standard HTTP. On Red5 Cloud, HLS gives you a broadly compatible, cacheable delivery path that works in players and devices where WebRTC is not available. The trade off is latency: HLS is a segmented protocol, so playback lags real time by more than WebRTC does. Use HLS when reach and compatibility matter more than sub second latency.

This guide shows how to enable HLS on a Red5 Cloud node group, publish a stream and play it back over HLS. A companion video walks through the same steps end to end.

<iframe width="560" height="315" src="https://www.youtube.com/embed/y8UpHIbiIV8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

> HLS delivery on Red5 Cloud writes segments to an object storage bucket. You configure an AWS compatible storage backend on the node group, and Red5 writes the HLS playlist and segments there for players to fetch.

## Before you start

You need:

- A Red5 Cloud account with access to create a node group.
- An AWS compatible object storage bucket (Amazon S3 or an S3 compatible service) that Red5 can write to, along with the credentials for it: an endpoint URI, an access key, a secret key, a bucket name and a region.
- A way to publish a stream (for example the Red5 Pro HTML SDK testbed or an encoder such as OBS), and an HLS capable player to view it (a browser based HLS player, VLC, or a native mobile player).

## How HLS works on Red5 Cloud

1. You enable HLS on a node group and attach an AWS compatible storage bucket to it.
2. A publisher sends a stream to the deployment as usual.
3. Red5 packages the incoming stream into HLS: a playlist file (`.m3u8`) that lists the current segments, and a sequence of media segment files.
4. Red5 writes the playlist and segments to the configured bucket.
5. A player requests the playlist over HTTP, then fetches the segments it references, and plays them in order. As the stream continues, the playlist updates and the player pulls new segments.

Because delivery is plain HTTP files in a bucket, HLS output is easy to cache and serve widely, including behind a CDN. The segmenting is also why HLS carries more latency than WebRTC: the player waits for whole segments to be written and fetched before it can play them.

## Configure HLS in the Cloud UI

HLS is enabled per node group, alongside its storage configuration.

1. Open the Cloud UI and go to Node Groups, then Add New Node Group.
2. Give the node group a name.
3. In the Storage section, select **AWS Compatible** and fill in the storage details for your bucket:
   - Endpoint URI
   - Access Key
   - Secret Key
   - Bucket Name
   - AWS Region
4. Turn the **HLS** toggle on.
5. Complete the remaining node group settings as needed, then review and deploy.
6. Wait for the node group state to become Active.

> The storage credentials are sensitive. Treat the access key and secret key like any other secret: do not expose them to clients, and prefer credentials scoped with least privilege, granting only what Red5 needs to write to the bucket.

## Publish and play back over HLS

1. Publish a stream to the deployment using your normal publish flow (the testbed or an encoder). Give the stream a name you will recognize, for example `stream1`.
2. Confirm the stream is live in the Cloud UI Streams tab.
3. Open your storage bucket. Red5 writes the HLS output there: a playlist file (`.m3u8`) named after the stream, plus the media segment files it references.
4. Play the stream from the playlist. The simplest check is to take the `.m3u8` file from the bucket and open it in an HLS capable player such as VLC.

What you should see:

- A `.m3u8` playlist and a set of segment files appear in the bucket once the stream is live.
- The player loads the playlist, fetches the segments, and plays them in order, running behind real time by roughly the length of a few segments, which is expected for HLS.

> For live playback served directly to viewers (rather than downloading the playlist), players fetch the `.m3u8` and its segments from the bucket over HTTP. That requires the bucket objects to be reachable by the player, for example through public read access or presigned URLs, and often a CDN in front for scale.