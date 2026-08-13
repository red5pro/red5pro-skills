---
title: User's Guide
menu_order: 3
---

Understanding the core concepts of Red5 Cloud is crucial for maximizing the potential of your streaming infrastructure. You will learn about the architecture that underpins Red5 Cloud, including how various components interact to deliver low-latency, high-quality streams globally. We will also delve into the scalability features that allow your deployment to handle varying loads efficiently, ensuring seamless performance regardless of audience size.

## Red5 Cloud Management Console

The Red5 Cloud Management Console is a web-based interface that allows you to manage and configure your Red5 Cloud deployments. It provides a centralized platform for monitoring the health and performance of your streaming infrastructure, adjusting settings, and scaling resources as needed. The Management Console offers a user-friendly interface with intuitive controls, making it easy to customize your deployment and optimize your streaming services.

To log into the management console, visit [Red5 Cloud](https://cloud.red5.net/signup)

## Deployments

Deployments are a fundamental concept in Red5 Cloud, defining how your streaming infrastructure is set up, managed, and scaled. A deployment refers to the arrangement of various Red5 Pro nodes, including Origin, Edge, Relay, Transcoder, and Mixer nodes, which work together to deliver seamless and high-quality streaming experiences. Understanding deployments is crucial for optimizing performance, ensuring reliability, and managing resources effectively.

### Baseline Deployment

The baseline deployment is created at account startup. This deployment is created in the default region and includes the Red5 Pro Stream Manager, which serves as the central management hub for your streaming infrastructure. The baseline deployment provides a starting point for further customization and expansion, allowing you to add additional nodes, configure settings, and scale your deployment as needed.

### Deployment Nodes Types

Deployments consist of Red5 Pro nodes that perform specific functions to deliver live streaming services.

#### Origin Nodes

Origin Nodes ingest live streams from broadcasters. They are responsible for the initial reception and processing of video and audio data, ensuring that the streams are ready for distribution. In a deployment, Origin Nodes serve as the primary entry points for all incoming streams.

#### Edge Nodes

Edge Nodes distribute the processed streams to end users. They receive data from Origin Nodes and deliver it to viewers with minimal latency. Deploying Edge Nodes close to your audience is essential for reducing buffering times and improving the overall viewing experience.

#### Relay Nodes

Relay Nodes facilitate the efficient transfer of streams between Origin and Edge Nodes. They are particularly useful in scenarios where direct connections are impractical due to distance or network constraints, ensuring an optimized streaming path.

#### Transcoder Nodes

Transcoder Nodes convert streams into multiple formats and bitrates, enabling adaptive bitrate streaming (ABR). This ensures compatibility across various devices and network conditions, providing a consistent viewing experience for all users.

#### Mixer Nodes

Mixer Nodes combine multiple video and audio sources into a single cohesive stream. This functionality is essential for applications such as live events and video conferencing, where multiple inputs need to be synchronized and merged in real-time.

## Regions

In Red5 Cloud, regions play a crucial role in determining the geographic distribution of your streaming infrastructure. Deploying nodes in different regions allows you to minimize latency, improve performance, and ensure a seamless viewing experience for your global audience. Each region represents a specific geographic location where Red5 Cloud nodes are deployed, and strategic region selection can significantly impact the efficiency and reliability of your streaming services.

Benefits of Multi-Region Deployments:
- Reduced Latency: By deploying nodes closer to your viewers, you can significantly reduce latency, ensuring that streams are delivered quickly and smoothly. This is particularly important for live events and interactive applications where real-time communication is essential.
- Enhanced Performance: Distributing your infrastructure across multiple regions helps balance the load and prevents any single region from becoming a bottleneck. This improves the overall performance and stability of your streaming service.
- Increased Reliability: Multi-region deployments offer redundancy, ensuring that your service remains available even if one region experiences issues. Traffic can be rerouted to other regions, minimizing downtime and maintaining a consistent user experience.
- Scalability: As your audience grows, multi-region deployments allow you to scale your infrastructure seamlessly. You can add more nodes in different regions to handle increased demand without compromising performance.

### Default Region

When signing up for Red5 Cloud, you are required to select a default region for your account. The default region serves as the primary location for deploying the Red5 Pro Stream Manager and other initial infrastructure components. This region plays a foundational role in your streaming setup, and its selection should be based on strategic considerations to ensure optimal performance and user satisfaction.

Importance of Default Region Selection:
- Primary Deployment Location: The default region is where your Red5 Pro Stream Manager is initially deployed. This centralizes the management and orchestration of your streaming nodes, providing a starting point for further regional expansion.
- Proximity to Main Audience: Choosing a default region close to your primary audience reduces initial connection latency.
- Compliance and Regulations: Different regions have specific regulatory requirements concerning data privacy and content delivery. Selecting a default region that aligns with your compliance needs helps avoid potential legal issues and ensures adherence to local laws.

## Scaling

Scaling of Red5 Cloud deployments is a critical aspect of ensuring optimal performance, reliability, and cost-effectiveness. By dynamically adjusting the number of nodes based on traffic patterns and resource utilization, you can handle varying loads efficiently and maintain a seamless streaming experience for your audience. Red5 Cloud scales based on the minimum and maximum values configured for the publishers and subscribers of a deployment. Within this range Red5 Cloud and the Red5 Pro Stream Manager 2.0 scales the number of nodes based on the current load.

## Stream Manager

The Red5 Pro Stream Manager is a central component of Red5 Cloud that provides intelligent orchestration and management of your streaming infrastructure. It serves as a control plane for your deployments and scales resources dynamically. The Stream Manager leverages algorithmic expressions optimize node allocation, load balancing, and failover, ensuring that your streaming services run smoothly and efficiently.

## Preprocessing

Preprocessing can be applied to published streams to normalize the stream for WebRTC delivery. It is imperitive that WebRTC streams be delivered using the Baseline profile which ensures that there are not B frames (Forward Error Correction) in the stream. This is because WebRTC does not support B frames. The preprocessing step will remove B frames from the stream and ensure that the stream is delivered using the Baseline profile. The preprocessor can also be used to adjust the streaming bitrate or resolution.  Preprocesing is applied to all incoming streams at the origin nodes and will cause additional CPU and memory usage.

## Transcoding

Transcoding is the process of converting a live stream into multiple formats and bitrates to ensure compatibility with a wide range of devices and network conditions. Red5 Cloud supports transcoding allowing for Adaptive Bitrate Streaming (ABR) which provides a seamless viewing experience for users with varying bandwidth and device capabilities. Transcoding is performed on dedicated transcoder nodes which are deployed when transcoding is enabled. The Stream Manager is used to configure the transcoder and publishers make a special call to determine which transcoder to use when publishing.

### Adaptive Bitrate Streaming (ABR)

Adaptive Bitrate Streaming (ABR) is a technique used to deliver video content at the highest quality possible based on the viewer's network conditions. By dynamically adjusting the bitrate and resolution of the stream, ABR ensures a smooth viewing experience without buffering or interruptions. Red5 Cloud's transcoding feature enables ABR by converting the stream into multiple renditions, allowing viewers to switch between different bitrates seamlessly.

## TrueTime Meetings

TrueTime Meetings is a built-in application within Red5 Cloud that provides a high-performance, real-time video conferencing solution. It leverages the global Red5 Cloud infrastructure to deliver ultra-low latency communication for participants worldwide. Through the TrueTime Apps section, users can quickly deploy and manage their own conferencing instances, customized to their specific needs.
