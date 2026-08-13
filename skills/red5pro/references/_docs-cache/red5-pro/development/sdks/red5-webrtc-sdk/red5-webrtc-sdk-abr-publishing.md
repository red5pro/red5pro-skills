---
title: ABR - Publishing for Transcoding
description: ""
menu_order: 47
---

With a provision provided to the Stream Manager, there are two available scenarios to start publishing the variant streams to be consumed:

- Publishing each variant using your favorite Media Encoder (such as Wirecast of Flash Live Media Encoder).
- Publishing to the Transcoder on your Red5 Pro Server.

The former solution requires you to broadcast a single stream for each of the variants listed in your **Provision**. The latter solution requires you to access the Transcoder endpoint using the Stream Manager API and broadcasting a single variant, from which the server will transcode the other variants.

**You must broadcast using the highest variant**, as the current transcoding solution can only provide lesser-quality streams.
