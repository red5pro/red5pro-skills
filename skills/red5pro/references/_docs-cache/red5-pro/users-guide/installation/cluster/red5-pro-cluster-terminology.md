---
title: Cluster Terminology
description: ""
menu_order: 2
---

The follow terms will be used throughout this document.

## Cluster

One or more active servers which are expected to make real-time data streams available for consumption. These are usually audio and video streams but can also be other forms of data.

## Server Node

A server instance that is part of an active cluster.

## Broadcaster

The source of a live data stream, usually a webcam and microphone or smart phone. It can encompass the user, network session, or function of stream generation.

## Origin

An Origin accepts broadcasters.
Origins can also be configured to accept subscribers. The server can be in a hybrid mode where it repeats streams from another Origin. A stand-alone server is an Origin and an Edge.

## Edge

An Edge accepts subscribers.
An Edge is configured to have at least one origin to repeat content from. It can be configured to communicate with more than one Origin.

## Clustering

Clustering is how we configure multiple servers to be Edges and Origins interconnected in order to distribute real time data to all receiving clients.