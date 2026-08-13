---
title: HLS Configuration File
description: ""
menu_order: 3
---

The HLS Plugin included in the Red5 Pro Server distribution reads the configuration file at `red5pro/conf/hlsconfig.xml`.

## HLS Playlist Values

The following properties are defined to configure the HLS playlist:

* __itemCount__ - The number of segments in the sliding window
* __itemLength__ - The segment duration
* __itemThreshold__ - The HLS segmentation variance. It should be higher than 0.5 and less than 1
* __useDiskWrites__ - If you have a large duration and segment count, you may prefer to serve the HLS files from disk

# HLS Recording Options

The following settings can be modified for different recording options.

> NOTE: additional settings not documented may be for future functionality, and should be left to their default values.

### postProcessMode

Default value is `<property name="postProcessMode" value="0"/>`. Set this to `<property name="postProcessMode" value="1"/>` to enable OrientationPostProcessing for HLS, that will 

### forceVODRecord

Default value is `<property name="forceVODRecord" value="false"/>`. Set this to `<property name="forceVODRecord" value="true"/>` to only record HLS without generating an `.flv`. Additionally, if recording on a `transcoder` node, this will allow you to record all transcoded streams along with a `master.m3u8` record that will allow for ABR VOD playback.

### uploadOnTheFly

Default value is `<property name="uploadOnTheFly" value="false"/>`. Set this to `<property name="uploadOnTheFly" value="true"/>` if you want to start offloading the HLS segments to cloudstorage as soon as the stream starts. This can help reduce server diskspace usage when you have a long recording, or many streams recording simultaneously.

### writeJsonMetadata

Default value is `<property name="writeJsonMetadata" value="false"/>`. Set this to `<property name="writeJsonMetadata" value="true"/>` if you want to record the stream metadata along with the HLS recording.

## hlsconfig.xml

_Property defaults from conf/hlsconfig.xml as of server version 10.9.2_

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean name="hlsConfig" class="com.red5pro.stream.transform.mpegts.HLSConfig" >
		<!-- Number of items in the HLS playlist -->
	 	<property name="itemCount" value="5"/>	 	
	 	<!-- The segment duration in seconds for each item.  -->
	 	<property name="itemLength" value="6"/>
	 	<!-- The segment duration variance. The range should be higher than 0.5 and lower than 1.0.
	 	That is to configure segments generated more than half of the desired duration. 
	 	The effectiveness of segmentation is dependant on the keyframe interval -->
	 	<property name="itemThreshold" value="0.7"/>
        <!-- Maximum hls segment length in bytes. Forces segmentation when segment grows to this size. -->
        <property name="maxSegmentSize" value="8000000"/>
		<!--  -->
	 	<property name="useDiskWrites" value="true"/>
		<!-- Post processing mode: 
		      0 = Legacy, no append, no ffmpeg requirement (default)
		      1 = Uses the Orientation Post Processor requiring ffmpeg and also enables "append" handling
		-->
      
		<!-- Live format; options are: TS for transport stream, FMP4 for fragmented mp4 and SMP4 for single mp4. FMP4 Recordings saved to SMP4 -->
		<property name="outputFormat" value="TS"/>
		
		<!-- truncating audio while wait for video: 
		      true = the first output segment shoud contain video stream
		      false = output everything that comes as input
		-->
	 	<property name="waitForVideo" value="true"/>

	 	<property name="postProcessMode" value="0"/>
	 	
		<!-- Enable a live stream m3u8 playlist to show all segments instead of a moving window. 
		    Set true to support DVR rewind to the beginning with live streams -->
		<property name="dvrPlaylist" value="false"/>
		
        <!-- Provide post-processing for recorded HLS files -->
        <property name="writerPostProcessors">
            <set>
                <!-- Creates a VOD playlist with associated segments and moves it to vod app or cloud storage upload 
                     To use non-append mode, set `legacy` to `true`
                -->
                <value>com.red5pro.stream.transform.mpegts.processor.VODFilePostProcessor</value>
                <!-- Cleans up the .ts and .m3u8 files if they were written -->
                <value>com.red5pro.stream.transform.mpegts.processor.SegmentCleanupPostProcessor</value>
            </set>
        </property>
        <!-- Debug mode -->
        <property name="debug" value="false"/>
        <!-- Force VOD recording -->
        <property name="forceVODRecord" value="false"/>
        <!-- When recording, force saving file as a single mp4-->
		<property name="saveAsMP4" value="false"/>
        <!-- Cloud uploaders are queried in the post processor, no special configuration entry required here -->
        <!-- Automatically upload if the Cloudstorage plugin is configured -->
        <property name="doCloudstorageUpload" value="true"/>
        <!-- When true and cloudstorage is configured, HLS recordings are uploaded on the fly -->
        <property name="uploadOnTheFly" value="false"/>
        <!-- To write json metadata or not to write it to a file -->
        <property name="writeJsonMetadata" value="false"/>
        <!-- Time in seconds to sleep before invoking post processors, to allow HLS clients to watch a stream to the end -->
        <property name="sleepOnPlaylistClose" value="30"/>
    </bean>
     
</beans>
```