---
title: Recording ABR Variants with HLS
description: ""
menu_order: 14
---

## Record Multiple Variants and Create HLS Master Playlist for VOD

If you are using the transcoder to publish multiple variants of a stream, you can record all of the variants by modifying `red5pro/conf/hlsconfig.xml`, setting `<property name="forceVODRecord" value="true"/>`. You will also need to set up cloudstorage (per [this document](/docs/red5-pro/users-guide/recording-and-vod/cloud-storage/)). 

In order for the master playlist to be created, modify `red5pro/conf/cloudstorage-plugin.properties`, setting the streams directory property to `streams.dir=/usr/local/red5pro/webapps/` (assuming your Red5 Pro server is installed in the `/usr/local` directory), and then modifying the other properties as outlined in the cloudstorage plugin document.
