_From: Stream Manager 2.0 Migration Guide - iOS SDK_

## General Overview

The architecture of an autoscale environment under a Stream Manager deployment is such that Origin and Edge nodes are dynamically spun up and torn down in response to publisher and subscriber amounts within respect to their node configuration settings. It is too much for this document to cover such a topic, but is important to note that the Stream Manager API provides the ability to request which Origin or Edge node to publish or subscriber on, respectively, for mobile clients over RTSP.

The following information in this document describes how this was achieved previously in the Stream Manager 1.0 release and how to migrate your code to integration with the Stream Manager 2.0 release.
