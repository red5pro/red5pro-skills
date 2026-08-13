---
title: Streaming Glossary
menu_order: 3
---

## Red5 Pro Product Terms

**Red5** - Open source media server for live streaming solutions that our team started in 2005. It was the first implementation of an RTMP server other than Flash Communication Server owned by Adobe.

**Red5 Cloud** - A managed service that provides autoscaling, clustering, and stream management for Red5 Pro. It is a cloud-based solution that allows you to deploy and manage Red5 Pro servers across multiple regions.

**Red5 Pro** -  Proprietary software built on top of the open source Red5. It features support for WebRTC streaming, mobile SDKs, and Stream Manager which allows for automatic ([autoscale](/docs/red5-pro/development/api/archive/autoscale-client-api/)) large scale, real-time (less than 500 ms) live streaming on cloud networks.

**Cluster** -  A set of multiple active servers which make real-time data streams available for consumption. Typically streams consist of audio or video data, and clusters of servers are used to handle more connections/streams than a single server could do on its own.

* **Origin (cluster)** - An Origin accepts publishers (or encoders). In a non-autoscaling cluster application, origins can also be configured to accept subscribers. The server can be in a hybrid mode where it repeats streams from another origin. A stand-alone server is an origin and an edge all in one.
* **Edge (cluster)** - An Edge delivers streams to subscribers who want to view/listen to the streams. An Edge is required to have at least one origin in which to repeat content. Edge nodes can be configured to communicate with more than one Origin.

**Clustering** - [Clustering](/docs/installation/cluster-plugin/overview/) is how we configure interconnected server nodes to be edges, origins, relays, and transcoders in order to distribute real-time video, audio, and data to all receiving (Subscriber) clients.

**HTML5 SDK** - Integrates live streaming video into your desktop and mobile browser. By default, uses WebRTC where possible and falls back to RTMP/Flash and HLS as needed. The HTML5 SDK abstracts much of the complexity of building a live streaming app from scratch.

**Mobile Streaming SDK** - Integrates live streaming video into your native app. Uses RTSP as the protocol and features a low latency (real-time) player and broadcaster. The Mobile SDK abstracts much of the complexity of building a live streaming app from scratch.

**Publisher** - Senders of the broadcast, also known as the ingest client.

**Publisher Buffer Time** - A setting in the Red5 Pro Mobile SDK that allows you to set how long you want to hold on to the packets in the queue. The larger the value, the more time it will keep them around and the lower the value, the less time it will keep them around.

**Server Node** - A server instance that is part of an active cluster.

**Stream Manager** - Red5 Pro's streaming architecture management and information service which helps automate the process of creating and deleting Red5 Pro server instances. Stream Manager also coordinates between broadcasters and subscribers to help find the right server nodes for their broadcast and subscribe actions respectively.

**Stream Provisioning** - Refers to the setup of a stream by a broadcaster client via the Stream Manager using its API.

**Subscriber** - Everyone that receives the messages sent by publishers, also known as the egress client.

**Subscriber Buffer Time** - A setting in the Red5 Pro Mobile SDK that allows you to set the amount of time you allow video packets to build-up on the server side before delivering to the client. In the case of receiving video, the higher the buffer_time the more you allow for backup in network congestion. The lower the number, the less time you allow for this queued video to get through.

## Autoscaling Components

**Stream Manager** - Manages streaming load efficiently by adding/removing Red5 Pro servers in real-time to meet dynamic traffic demands on cloud networks. Using the Cloud Controller it handles automatic scaling operations to expand and contract your server instances. The Stream Manager configures a cluster dynamically using a cloud network's APIs via a Cloud Controller.

**Nodes** - The autoscaling nodes are server instances that perform specific defined roles (origin, edge, relay, transcoder).

**Nodegroups** - An autoscaling nodegroup is a cluster of any number of origin/edge, origin/relay/edge, or transcoder/origin/edge nodes. The nodegroup is created based on a scale-policy and launch-configuration.

* **Origin** - An Origin accepts publishers (or encoders).
* **Edge** - An Edge delivers streams to subscribers who want to view/listen to the streams. An Edge is required to have at least one origin in which to repeat content. Edge nodes can be configured to communicate with more than one Origin.
* **Relay** - An intermediary node that connects an Origin to an Edge. The use of Relays allows a cluster to run large stream deployments into the tens of  millions of subscribers.
* **Transcoder Node** - A node in a cluster that runs Cauldron that is dedicated to transcoding streams. The Transcoder node always sits in front of an Origin and pushes data to it.
* **Mixer Node** - A node in a cluster that runs Cauldron that is dedicated to mixing streams. The Mixer node always sits in front of an Origin and pushes data to it.

## General Video Streaming Tech Terms

**API (Application Programming Interface)** - An interface that allows software programs or components to interact with each other.

**Bandwidth**  - The total amount of data that can be transferred or processed at any one time (also, usually one second). As such, both bandwidth and bitrate are usually measured in Kilobits or Megabits per second.

**Bitrate** - The number of bits (0 and 1s) that can be transferred or processed from one point to another in a set amount of time (usually one second). Measured in kbps, and Mbps.

**CDN (Content Delivery Network)** - A system that employs a distributed network of servers to transport data and media files across the internet. Most CDNs operate over an HTTP connection which caches data into different servers to facilitate packet requests. For more on Red5 Pro and CDN's please refer to this [article](/blog/what-is-a-cdn-and-how-does-it-work/).

**DNS (Domain Name System)** - The Domain Name System (DNS) is a hierarchical decentralized naming system for computers, services, or other resources connected to the Internet or a private network. It associates various information with domain names assigned to each of the participating entities.

**Edge** - A server that resides on the "edge" between two networks, typically between a private network and the internet. For Edge as it refers to autoscaling, please refer to the above reference under "Red5 Pro".

**End-to-End Latency** - The time it takes video or audio captured by a device to go from the publisher to the subscriber. Refer to this article for more information on [types of latency](/blog/latency/).

**Node** - A computer, container, or virtual instance that is identified by an IP address on the internet.

**Origin (Web Server)** - A Web server that contains the original Web page. The term is used to identify the Web server from the cache server. Since there is no physical difference between a digital original and a digital copy, the term implies that the origin server is the one that is maintained and updated by the enterprise. For Origin as it refers to autoscaling, please refer to the above reference under "Red5 Pro".

**Relay** - An intermediate node between the source and destination when they cannot communicate between each other directly due to distance.

**SDK (Software Development Kit)** - A set of tools that can be used to develop software applications targeting a specific platform.

**Transcoding** - Taking already-compressed content; decompressing it; and then altering and recompressing it.

**Web App** - A webapp is usually a browser based application. However in the context of Red5 Pro and J2EE or Tomcat it's actually a Java based server side application. Specific to Red5 Pro, it refers to  the creation of custom code to be run on the server side.

## Encoder Software

**FFMPEG (Fast Forward MPEG)** - Vast software suite of libraries and programs for handling video, audio, and other multimedia files and streams. FFMPEG is usually run as a command line tool, but it's also frequently used as a C library for doing many video and streaming related tasks. OBS for example utilizes FFMPEG under its covers.

**OBS (Open Broadcast Software)** - A free and open-source software suite for recording and live streaming.
Protocols

## Web and Networking Technologies

**CORS (Cross-Origin Resource Sharing)** - A standard that restricts resources from one website, sharing accessing data from another. It provides a mechanism in which a browser and server can interact to determine whether or not it is safe to allow the cross-origin request before transmitting data.

**DTLS (Datagram Transport Layer Security)** - Modified TLS that may be used with UDP. Exchanges keys used to encrypt and decrypt the stream at both peers. Used for the symmetric key exchange for WebRTC.

**HLS (HTTP Live Streaming)** - Media streaming communications protocol originally created by Apple that works by breaking the overall stream into a sequence of small HTTP-based file downloads (called chunks).

**ICE (Interactive Connectivity Establishment)** - A protocol that describes how to coordinate STUN and TURN to make a connection between hosts. WebRTC leverages ICE for setting up peer connections.

**NAT (Network Address Translator)** - A method of remapping one IP address space into another by modifying network address information in IP header of packets while they are in transit across a router. An essential tool in conserving global address space in the face of IPv4 address exhaustion. NAT Traversal or punch through is often needed in the case of setting up peer to peer systems like WebRTC in order to connect devices.

**RTC (Real-Time Communication)** - A category of software protocols and communication hardware that give real-time guarantees. RTC can often be an informal shortened name for WebRTC.

**RTMFP** - RTMP over UDP instead of TCP. It is also technically a peer to peer protocol that the Flash player can utilize.

**RTMP (Real-Time Messaging Protocol)** - TCP based protocol for streaming audio, video, and data over the Internet.  It was originally developed by Macromedia for the Flash player. It allows for low-latency communication. Today RTMP is most common protocol for publishing streams. Professional encoders, OBS, FFMPEG, etc. all support RTMP.

**RTMPS** - RTMP over a TLS/SSL connection.

**RTMPT** - RTMP which is encapsulated within HTTP requests to traverse firewalls. RTMPT is frequently found utilizing cleartext requests on TCP ports 80 and 443 to bypass most corporate firewalls and allows the Flash player to connect to a server. The encapsulated session may carry plain RTMP, RTMPS, or RTMPE packets within.

**RTP (Real-time Transport Protocol)** - Protocol for delivering audio and video over IP networks. Used extensively in streaming media.

**SRT (Secure Reliable Transport)** - An open-source video transport protocol and technology stack that optimizes streaming performance across unpredictable networks with secure streams and easy firewall traversal. It is used in the Red5 Pro Mobile SDK.

**RTSP (Real Time Streaming Protocol)** - A network control protocol designed for use in entertainment and communications systems to control streaming media servers. The protocol is used for establishing and controlling media sessions between end points. The payload of media is typically done over either RTP or SRTP. Most people when they say RTSP are referring to the combination of the RTSP and (S)RTP. The Red5 Pro Mobile SDK uses RTSP.

**SDP (Session Description Protocol)** - A format for describing streaming media communication sessions for the purposes of session announcements, session invitation, and parameter negotiation.

**SRTP (Secure Real-time Protocol)** - A transport protocol that WebRTC uses to send and receive encrypted video and audio.

**SSL - (Secure Socket Layer)** - Older version of TLS.

**STUN** _(Session Traversal of User Datagram Protocol [UDP] Through Network Address Translators [NATs])_ - Used by a host to discover its public IP address when it is located behind a NAT/Firewall. When this host wants to receive an incoming connection from another party, it provides the public IP address as a possible location where it can receive a connection. Red5 Pro examples all use the public Google STUN servers. We suggest however, that you install your own STUN server for your production apps. A good choice is CoTurn as it supports both STUN and TURN.

**TCP (Transmission Control Protocol)** - One of the main protocols on the Internet. TCP is a connection based protocol, once a connection is established data can be sent in both directions. It's used in applications that require high reliability when transmission time is not as important as guaranteed delivery. TCP typically is much easier to use than UDP in strict corporate firewalls.

**TLS (Transport Layer Security)** - Cryptographic protocol that provides communication security over a computer network via TCP.

**TURN (Traversal Using Relay around NATs)** - Makes a connection to the server through relaying media between the two parties if STUN fails.

**UDP (User Datagram Protocol)** - Connectionless protocol, multiple messages are sent as packets in chunks. One directional. Needed for fast, efficient transmission. Streaming or gaming. Manages the reordering of packets received by the clients and deals with dropped packets that never arrive. Most WebRTC traffic is done with SRTP over a UDP connection.

**WebRTC (Web Real-Time Communication)** - A universal, plugin-free browser-based communication protocol that enhances browsers with RTC (Real-Time Communication) capabilities via Javascript API's.

**Websocket** -  A computer communications protocol, providing [full-duplex](https://en.wikipedia.org/wiki/Duplex_%28telecommunications%29) (two-way) communication channels over a single TCP connection unlike HTTP. It allows you to open an interactive communication between the server and the client in HTML5 apps. You can make API calls without everything having to go through the server.

**WHIP (WebRTC HTTP Ingest Protocol)** - A protocol that allows for the creation of a WebRTC connection between a publisher and a server. It is used in the Red5 Cloud for WebRTC ingest.

**WHEP (WebRTC HTTP Egress Protocol)** - A protocol that allows for the creation of a WebRTC connection between a subscriber and a server. It is used in the Red5 Cloud for WebRTC egress.

## Codecs

**AAC (Advanced Audio Coding)** - An audio coding standard for lossy digital audio compression. Designed to be the successor of the MP3 format, AAC generally achieves better sound quality than MP3 at the same bit rate.

**H.264/MPEG-4 AVC (Advanced Video Coding)** - A [block](https://en.wikipedia.org/wiki/Macroblock) oriented motion compensation-based video compression codec. It is a standard capable of providing good video quality at substantially lower bit rates than previous standards. It can be implemented in a wide variety of networks and systems and is usable with many protocols.

**MP3 (MPEG-1 Audio Layer III)** - A coding format for digital audio. Originally defined as the third audio format of the MPEG-1 standard, it was retained and further extended—defining additional bit-rates and support for more audio channels—as the third audio format of the subsequent MPEG-2 standard.

**Opus** - A lossy audio codec designed to efficiently code speech and general audio in a single format, while remaining low-latency enough for real-time interactive communication and low-complexity enough for low-end embedded processors.

**Speex** - A free software speech codec that may be used on VoIP (Voice Over Internet Protocol) applications. Specifically it is a lossy audio compression format specifically tuned for the reproduction of human speech.

**VP8** - A block-based [transform coding](https://en.wikipedia.org/wiki/Transform_coding) format. Very similar to H.264.

### Which Codecs Each Protocol Uses

#### WebRTC

* Audio: Opus
* Video: H264 and VP8

#### RTMP

* Audio: AAC or MP3
* Video: H264

#### RTSP

* Audio: AAC
* Video: H264

## Video Streaming Issues

Set of terms used to describe common livestreaming issues:

* **Stuttering (Audio)** - Audio pausing for under 2 seconds
* **Stuttering (Video)** - Video pausing for under 2 seconds
* **Stuttering (Both Audio and Video)** - Audio and video pausing for under 2 seconds

* **Freezing (Audio)** - Audio pausing for longer than 2 seconds
* **Freezing (Video)** - Video pausing for longer than 2 seconds
* **Freezing (Both Audio and Video)** - Audio and video pausing for longer than 2 seconds

**Video Artifacts** - A noticeable distortion of the video. Ex: color changes that don't belong, images bleeding into each other, shadows of old images being superimposed on the current streaming image. Likely indicates missing keyframes.

**Audio Artifacts** - A noticeable distortion of the audio. Ex: Pops over the audio, breaks, static, garbled, repetitions, etc.

**Sync, A/V Sync Issues** - Audio not lining up with video on subscribe. Audio track ahead of video, or video ahead of audio.

**Pixelation** - Pixelated or bad quality video, but still obviously the video.

**No Video** - Black Screen, but has audio.

**Chipmunk Mode** - Video or audio freezes and then speeds up to catch up to real time.

**Reverse Time** -  Video reverses and the counter goes backward for at least a second worth of frames and then progresses as expected again.
