---
title: RTMP Restreaming
description: ""
menu_order: 9
---

The RTMP Restreaming feature simplifies live streaming by enabling both push and pull capabilities, making it easy to stream to and from external servers.

Pull Streams: Fetch streams (subscribe) from external sources and redistribute them with Red5Pro, perfect for integrating third-party content or dynamic media.

Push Streams: Forward (publish) an incoming RTMP stream to other platforms or servers, expanding your audience without added complexity.

This dual functionality provides a flexible and reliable solution for any live streaming workflow.

## API Calls

The Restreamer API documentation can be found in the [development section](/docs/red5-pro/development/api/restreamer/).

## Supported Use Cases

### Pull

Subscribe to a remote RTMP stream and create a local stream within the Red5Pro server.

RTMP Puller will try repeatedly, indefinitely, to subscribe to the remote stream until the restreamer is killed.

If persistent, it will endure server restarts.

### Push

Push a stream from Red5Pro to some remote RTMP server, such as another Red5Pro instance or a social media platform.

#### Push (Immediate)

In `immediate` mode, the restream attempt will occur immediately and any error or problem will be reported to the caller.

#### Push (Delayed)

In delayed mode (`immediate=false`), the restreamer will make the specified number of attempts at the specified interval. Returns immediately to the caller before the attempts begin. The outcome (success or failure) can be determined with `list`.

#### Push (Persistent)

When persistent, the restreamer will try repeatedly, indefinitely, and it will endure server restarts.


