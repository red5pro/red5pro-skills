---
title: Brew Mixer Overview
menu_order: 2
---

## Design

The Brew Mixer consists of three parts. The Brew Mixer WebApp serves a RESTful front end to create, modify, and destroy mixers. This is backed by the Node Mixer Plugin which makes up the service layer, interacting with the Red5Pro server to create and route stream data. And finally, the native layer where low-level data operations occur.

User applications control the mixer using a graph-based "RenderTree", which allows modular video positioning and sizing as well as an audio mixing graph controlling the volume and panning of various sources.

## WebApp

The Brew Mixer webapp exposes the RESTful Brew Mixer API and includes several example controller pages. These examples demonstrate how to construct RenderTrees and interact with the mixer using JavaScript and REST calls.

In typical deployments, customers use these examples as reference implementations for integrating mixer control into their own applications. Most integrations are based on direct API calls or by adapting the provided example controllers.

The following example pages are included:

* renderTreeController.html
* renderTreeControllerWithAuth.html
* renderTreeControllerImageSource.html
* renderTreeControllerSideBySide.html
* metrics-dashboard.html
* metrics-dashboard-sm2.html

These examples demonstrate common mixer workflows, including:

* Creating and updating RenderTrees
* Controlling layouts and audio mixing
* Working with authenticated requests
* Using image sources
* Monitoring mixer metrics

## Plugin

The NodeMixer Plugin is a Red5Pro Plugin making up the service layer. It handles the interaction with Red5Pro internals to begin Brew decoding of incoming streams and to coordinate the native layer with the outbound encoder, providing raw video and audio data.

## Native

The native layer performs the low-level tasks of compositing video and mixing audio. It uses OpenCV for CPU-based image compositing.

