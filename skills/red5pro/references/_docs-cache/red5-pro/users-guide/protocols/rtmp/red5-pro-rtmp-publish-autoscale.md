---
title: Publishing RTMP and ERTMP in an Autoscale Environment
description: ""
menu_order: 4
---

With Red5 Pro autoscaling in place, WebRTC, via a browser, can be proxied directly through the Stream Manager through web socket connections.  Since Flash was deprecated from browsers, there are a few more steps required to publish a stream from an RTMP source.

# Publishing an RTMP Stream to an Origin

1. Make the [broadcast API call](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-streams/#Broadcaster)
2. Use the origin IP returned from that call as the target for your RMTP broadcaster.

# Publishing an RTMP Stream to a Transcoder

If you want to use Red5 Pro to transcode that stream, then the process is more complicated. See [this doc](/docs/red5-pro/users-guide/transcoder/red5-pro-publishing-with-rtmp-to-transcoder/) for the full process. The high-level steps are:

1. Submit a stream provision request for the ABR levels (GUID of the stream plus the stream levels)
2. Using the GUID, make the [broadcast - transcode API call](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-streams/)
3. Use the transcoder IP returned from that call to publish the high-level stream name from your provision.

# Publishing Multiple RTMP Profiles for ABR to an Origin

If you are publishing from an RTMP encoder that can deliver multiple stream levels, and prefer to use those instead of the Red5 Pro transcoder, then:

1. Submit a stream provision request; the ABR level names need to match your encoder's stream names.
2. Make a [broadcast API call](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-streams/#Broadcaster) using the GUID of the stream provisioned.
3. Publish all streams to the origin IP address returned in the above call.

---

*Publishing a single RTMP stream to an autoscale cluster:*

 ![rtmpauto](/_images/protocols/rtmppublishers/rtmp-autoscale.gif)
