---
title: Red5 Cloud Architecture
menu_order: 2
---

Red5 Cloud is built to handle the complexities of modern streaming demands, offering a scalable and resilient environment that ensures high performance and reliability. The architecture relies heavily on the Red5 Pro and the integrated Stream Manager 2.0. This document provides details on how the various Red5 components work together to create the Red5 Cloud.

## Red5 Cloud Management Console

The Red5 Cloud Management Console is the primary way to interact with Red5 Cloud. From the Management Console, you can create and manage deployments, regions, node groups, and more. This web-based interface provides a centralized platform for overseeing your entire streaming infrastructure, allowing you to monitor performance metrics, configure settings, and deploy new instances with ease.

Key Features:
- Deployments: Easily set up and manage your streaming environments. The console allows you to initiate new deployments, monitor their status, and make adjustments as needed to ensure optimal performance and scale.
- Dev Resources: Access a range of resources, including information about using your deployment, support services, and documentation to help you get the most out of Red5 Cloud.
- Monitoring and Analytics: The console provides real-time analytics and monitoring tools, giving you insights into your streaming performance. Track key metrics such as latency, bandwidth usage, and viewer engagement to optimize your streaming strategy.
- Account Management: Manage your Red5 Cloud account settings, billing information, and access through the Management Console.

## Red5 Cloud Default Region

When signing up for Red5 Cloud, you select a default region for your account. This region serves as the primary location where the Red5 Pro Stream Manager is deployed. The selection of a default region is crucial as it determines the initial geographic location of your streaming infrastructure which houses the Stream Manager.

Importance of Default Region Selection:
- Latency and Performance: The proximity of the default region to your primary audience plays in reducing the connection time it takes to establish a stream. By selecting a region closer to your user base, you can minimize initial connection times.
- Scalability and Redundancy: The default region acts as the central hub for your streaming operations. However, you can expand to additional regions to enhance scalability and redundancy and to reduce latency. This multi-region approach ensures that your streaming service remains robust and reliable, and helps reduce latencies by providing infrastructure that is geographically close to the users.
- Regulatory Compliance: Different regions may have varying regulatory requirements concerning data privacy and content delivery. Selecting an appropriate default region helps ensure compliance with local laws and regulations, avoiding potential legal issues. 

## Red5 Cloud Regions

Red5 Cloud is available across the globe with 10 strategically located regions:

**Asia/Pacific:**
- Australia East - Sydney, New South Wales
- Singapore - Singapore

**Europe:**
- Europe Central - Frankfurt, Germany
- Europe West - London, United Kingdom

**Middle East:**
- Middle East West - Jeddah, Saudi Arabia

**North America:**
- Canada East - Toronto, Ontario
- Mexico Central - Querétaro, Mexico
- United States East - Ashburn, Virginia
- United States West - San Jose, California

**South America:**
Brazil South - São Paulo, Brazil

## Red5 Pro

Red5 Cloud deploys and manages Red5 Pro for you, providing a seamless and scalable Software-as-a-Service (SaaS) offering that leverages the robust capabilities of the Red5 Pro software package. This integration allows users to benefit from the advanced streaming features of Red5 Pro without the complexities associated with infrastructure setup and maintenance.

### Red5 Pro Stream Manager

The Red5 Pro Stream Manager is a critical component of the Red5 Cloud architecture, providing centralized control and orchestration of streaming infrastructure. Designed to ensure optimal performance and scalability, the Stream Manager automates many of the complex tasks involved in managing a live streaming environment, allowing users to focus on content creation and delivery rather than infrastructure management.

Key Features:
- Node Management: The Stream Manager oversees the deployment and management of streaming nodes. It can dynamically allocate resources based on current demand, ensuring that your streaming service remains responsive and high-performing, even during peak usage times.
- Load Balancing: To maintain streaming quality, the Stream Manager incorporates load balancing mechanisms. These mechanisms distribute incoming traffic across multiple regions and nodes to prevent any single node from becoming a bottleneck, ensuring a consistent viewer experience.
- Auto-Scaling: Stream Manager automatically scales the streaming infrastructure. As viewer numbers fluctuate, the Stream Manager can add or remove nodes to match demand, optimizing resource usage and controlling costs while maintaining performance.
- Failover Support: To enhance reliability, the Stream Manager includes failover capabilities. In the event of a node failure, the Stream Manager routes traffic to healthy nodes and replaces the nodes ensuring continuous streaming availability.
- Geographical Distribution: The Stream Manager supports multi-region deployments, allowing you to distribute your streaming nodes geographically. This capability reduces latency by bringing content closer to your viewers, providing a smoother and more responsive streaming experience.

The Red5 Pro Stream Manager acts as the central hub for managing all aspects of your streaming deployment. When a stream is initiated, the Stream Manager determines the optimal node or set of nodes to handle the stream, based on factors like current load, geographic location, and network conditions. It then directs traffic accordingly, ensuring that viewers receive the best possible streaming experience.

In addition to managing live traffic, the Stream Manager provides analytics and monitoring tools. These tools offer insights into viewer behavior, node performance, and overall system health, enabling you to make informed decisions about scaling, resource allocation, and content delivery strategies.

### Red5 Pro Nodes

Red5 Pro Nodes are the building blocks of the Red5 Cloud streaming architecture, enabling the delivery of live and on-demand video content. Each node within the Red5 Pro ecosystem plays a specific role, contributing to the overall functionality and performance of the streaming service. These nodes can be deployed across various regions to optimize latency, enhance redundancy, and ensure high availability for users around the globe.

#### Origin

Origin Nodes are responsible for ingesting live streams from broadcasters. They handle the initial reception and processing of video and audio data, ensuring that the content is encoded and prepared for distribution. Origin Nodes are crucial for maintaining the quality and integrity of the incoming streams, making them a foundational element of the streaming infrastructure.

#### Edge

Edge Nodes serve as the distribution points for streaming content to end users. They receive streams from Origin Nodes and deliver them to viewers, ensuring minimal latency and high performance. By deploying Edge Nodes closer to the user base, Red5 Pro can significantly reduce buffering times and enhance the overall viewing experience. These nodes also balance the load by distributing the streaming traffic across multiple points.

#### Relay

Relay Nodes act as intermediaries that facilitate the efficient routing of streams between Origin and Edge Nodes. They help in scenarios where direct connections are impractical due to distance or network constraints. Relay Nodes ensure that the streaming path is optimized, maintaining a seamless flow of data across the network.

#### Transcoder

Transcoder Nodes are essential for adapting streams to different formats and bitrates to meet the diverse needs of viewers and devices. They convert the incoming video and audio streams into multiple resolutions and formats, ensuring compatibility and optimal performance across various network conditions and device capabilities. By deploying Transcoder Nodes, Red5 Cloud can deliver adaptive bitrate streaming (ABR), which dynamically adjusts the stream quality in real-time based on the viewer’s bandwidth and device performance. This ensures a smooth and uninterrupted viewing experience, even in varying network conditions.

#### Mixer

Mixer Nodes are designed to handle the complex task of combining multiple video and audio sources into a single stream. This functionality is particularly useful for live events, video conferencing, and other interactive streaming applications where multiple inputs need to be merged and synchronized in real-time. Mixer Nodes can incorporate various sources such as different camera angles, audio tracks, and overlays, creating a cohesive and professional-quality output stream.
