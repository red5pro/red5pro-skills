---
title: Stream Manager 2.0 Services
menu_order: 2
---

The Stream Manager microservices are at the core of the Stream Manager 2.0 design. Each service has a particular function and are designed to be scalable and fault-tolerant. The services are:

- **Admin Service** (as-admin): deploys and manages the Red5 Pro nodes. It scales the nodes in and out based on the scaling expressions, capacity expressions and the current load of the nodes in the node group.
- **Auth Service** (as-auth): authenticates clients and providing JW Tokens for use with the other Stream Manager services.
- **Autoscale Service** (as-autoscale): makes autoscaling decisions based on the scaling expressions, capacity expressions and the current load of the nodes in the node group and then sending scaling events to the Terraform Service.
- **Proxy Service** (as-proxy): securely routes client requests to an appropriate Red5 Pro node based on the capacity ranking expressions, limit expressions and the current load of the nodes in the node group.
- **Streams Service** (as-streams): handles publishing and subscribing requests from clients and for understanding the current load of the nodes in the node group. Also provisions streams for publishing and subscribing based on the parameters passed in the provision request.
- **Terraform Service** (as-terraform): sends Terraform commands to the controlled environment to scale the nodes in and out based on the scaling events received from the Autoscale Service.
- **Testbeds** (as-testbeds): web pages to help test the various functions of Red5 Pro Node Groups.
- **Kafka** (kafka): Kafka is a distributed event streaming platform that is used to store and forward events between the Stream Manager services.
- **Kafka UI** (kafka-ui): a web-based user interface for the Kafka event streaming platform.
- **Reverse Proxy** (reverse-proxy): a Traefik reverse proxy that forwards client requests to the appropriate Stream Manager service.

Stream Manager Services:
![Diagram of the Stream Manager Services](/_images/red5-pro/users-guide/architecture/SMServicesSimplified.png)
