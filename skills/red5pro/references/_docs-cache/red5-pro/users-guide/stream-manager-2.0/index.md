---
title: Stream Manager 2.0
menu_order: 150
---

The Stream Manager is the cornerstone of Red5 Pro's architecture, providing a comprehensive solution for managing, orchestrating, and scaling your streaming infrastructure. Designed to handle the complexities of live and on-demand video streaming, the Stream Manager ensures that all components of the Red5 Pro ecosystem work together to deliver high-quality, low-latency streams to viewers around the world.

## Centralized Management

At the heart of the Stream Manager's functionality is its ability to centralize the management of your entire streaming network. It oversees the deployment and configuration of various nodes, including Origin, Edge, Relay, Transcoder, and Mixer nodes, ensuring that each one operates optimally and in harmony with the others. This centralized control simplifies the administration of large-scale streaming services, reducing the complexity and overhead typically associated with managing multiple servers and data centers.

## Dynamic Scaling and Load Balancing

One of the Stream Manager's most powerful features is its capability to dynamically scale resources based on real-time demand. By monitoring viewer traffic and node performance, the Stream Manager can automatically adjust the number of active nodes, adding more during peak times and scaling back during periods of low demand. This ensures that your streaming service remains responsive and cost-effective, avoiding both over-provisioning and under-provisioning of resources. Additionally, the Stream Manager employs load balancing algorithms to distribute traffic evenly across nodes, preventing any single node from becoming a bottleneck and maintaining a smooth streaming experience for all viewers.

## Monitoring and Analytics

The Stream Manager provides monitoring and analytics tools that give you insights into the performance and health of your streaming infrastructure. You can track key metrics such as latency, bandwidth usage, viewer engagement, and node performance in real time. These analytics help you identify and address potential issues before they impact the user experience, optimize resource allocation, and make informed decisions about scaling and deployment strategies.

## Integration and Flexibility

Built with flexibility in mind, the Stream Manager integrates with various streaming protocols and technologies. This allows you to deploy a wide range of streaming applications, from live sports broadcasts and interactive events to remote education and telehealth services. The Stream Manager also supports multi-region deployments, enabling you to deliver content closer to your audience and reduce latency, regardless of their geographic location.

## Security and Reliability

Security and reliability are paramount in streaming services, and the Stream Manager excels in these areas. It offers features such as secure token authentication, encryption, and access controls to protect your streams and data. Furthermore, its failover mechanisms ensure high availability, automatically rerouting traffic to healthy nodes and replacing them in the event of a failure, minimizing downtime and ensuring a continuous streaming experience.

## Key Stream Manager Concepts

The following are key concepts for understanding the Stream Manager 2.0:

### NodeGroups

NodeGroups in Red5 Cloud are collections of nodes that are grouped together based on their function, geographic location, or other operational criteria. Managing nodes in groups allows for more efficient administration, scaling, and optimization of streaming resources. NodeGroups help in organizing your infrastructure, making it easier to implement specific configurations and manage the distribution of traffic and workloads across your streaming environment.

### NodeGroup Schedules

NodeGroup Schedules are an essential feature for managing the availability and performance of nodes within a NodeGroup. By defining schedules, you can control when nodes are active or inactive, which helps in optimizing resource usage and ensuring that your infrastructure meets the demands of your audience at different times.

Key Features of NodeGroup Schedules:
- Automated Management: Schedules can be set to automatically activate or deactivate nodes based on predefined times. This automation reduces manual intervention and ensures that nodes are only running when needed, saving costs and resources.
- Performance Optimization: By aligning node availability with peak usage times, NodeGroup Schedules help maintain optimal performance during high-demand periods while conserving resources during off-peak times.
- Flexibility: Schedules can be customized to fit various operational needs, allowing you to adapt to different scenarios such as regular programming schedules, special events, or maintenance windows.

### NodeGroup Schedule Overlays

NodeGroup Schedule Overlays provide an additional layer of control over NodeGroup Schedules, allowing for temporary changes to the regular schedule without altering the underlying configuration. This feature is particularly useful for handling unexpected changes in demand or special events that require adjustments to the standard node availability.

Benefits of NodeGroup Schedule Overlays:
- Temporary Adjustments: Schedule Overlays enable you to make temporary adjustments to the NodeGroup Schedules without permanently changing the regular configuration. This is ideal for short-term events or sudden changes in traffic.
- Quick Response: With Schedule Overlays, you can quickly respond to unexpected increases in demand by activating additional nodes or extending the active hours of existing nodes, ensuring that your streaming service remains robust and responsive.
- Maintenance and Upgrades: Schedule Overlays can also be used to temporarily deactivate nodes for maintenance or upgrades, minimizing disruption to your service while ensuring that necessary updates are performed efficiently.

### SubGroups

Subgroups in Red5 Cloud are a further organizational tool that allows for more granular management of nodes within a NodeGroup. By creating Subgroups, you can apply specific configurations, schedules, and operational rules to a subset of nodes, enhancing flexibility and control over your streaming infrastructure.

### Node Images

Node images are used to deploy the various node types in Red5 Cloud, including Origin, Edge, Relay, Transcoder and Mixer. Node Images are specific to Red5 Pro releases and contain a particular version. By choosing a node image you select the version of Red5 Pro you want to use and any additional features or configurations that are included in that image such as Round Trip Authentication and/or Cloud Storage.
