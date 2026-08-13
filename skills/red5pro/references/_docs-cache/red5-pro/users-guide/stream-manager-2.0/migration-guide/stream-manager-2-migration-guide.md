---
title: Stream Manager 2.0 Migration Guide
menu_order: 1
---

## Migration Overview

Migrating from Stream Manager 1.0 to 2.0 involves changes to the Stream Manager API, Terraform, and the way you deploy and manage your Red5 Pro deployments. This guide will help you understand the changes and how to migrate your deployments and applications. Stream Manager 2.0 also has new features that didn't exist in Stream Manager 1.0 that you will want to be aware of, these include the ability to manage the Restreamer from the Stream Manager API. Additionally other features that were typically something you would have called a node directly to configure, such as Cloud Storage and the Social Pusher are now part of the Stream Manger API.

## Stream Manager 2.0 Design

The Stream Manager is the backbone of Red5 Pro’s architecture, designed to orchestrate and streamline your streaming infrastructure for both live and on-demand services. It centralizes the management of all operational nodes—like Origin, Edge, and Transcoder—ensuring smooth, coordinated function across your network. By simplifying node deployment and configuration, it reduces the overhead and complexity of managing large-scale streaming services. 

Built to meet fluctuating demand, the Stream Manager dynamically scales resources by monitoring traffic and node performance in real-time. It adjusts the number of active nodes as needed, preventing over or under-provisioning and keeping costs efficient. Through smart load balancing, traffic is evenly distributed across nodes to avoid bottlenecks, ensuring a seamless viewing experience. 

With integrated monitoring and analytics tools, Stream Manager delivers real-time insights into infrastructure performance, helping you optimize resource allocation and address potential issues early. It also offers flexibility with support for multiple regions and streaming protocols, enabling diverse use cases like live sports, interactive events, and remote learning with reduced latency. 

Security and reliability are cornerstones of the system, with features like secure token authentication, encryption, and built-in failover mechanisms to ensure high availability. If a node fails, traffic is automatically rerouted to maintain uninterrupted streams, enhancing both security and uptime. 

## Difference between Stream Manager 2.0 and 1.0

Stream Manager 1.0 was a monolithic plugin designed to run on a Red5 Pro server. The plugin was responsible for managing the scaling of node groups as traffic patterns changed.  Stream Manager 2.0 is decoupled from the Red5 Pro server and is a set of microservices designed to run on their own, or on a container management system such as Kubernetes. Each microservice provides a specific set of functionality, such as managing node groups, scheduling events, and provisioning streams. The microservices communicate with each other through a REST API and via a Kakfa message bus. Stream Manager 2.0 is ready to scale with your infrastructure, providing a flexible and robust solution for managing your streaming network. The microservice design allows for rapid integration of new features as well as simplified maintenance and troubleshooting.

