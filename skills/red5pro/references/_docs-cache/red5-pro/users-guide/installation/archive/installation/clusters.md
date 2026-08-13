---
title: Red5 Pro Clustering
description: ""
---

With a typical high capacity web site which serves static files and scripts, load balancing is used and every client facing server is a mirror image of a master with a shared database.

Live streams are almost always unicast over UDP or TCP to a distribution server. The subscribers are also TCP or UDP unicast receivers. When it is time to add more capacity for live content, it is not practical to have the broadcaster publish to additional servers. As such, other servers must be able to acquire and repeat the streams in real time.

The Clustering Plugin available from Red5 Pro allows for:

* Basic Clustering that provides more than one endpoint of a broadcast stream to subscribers
* Advanced Clustering that provides more than one endpoint for publishers to broadcast to as well as multiple endpoints for subscribers

---

Clustering is available with [Startup Pro, Growth Pro, or Enterprise Pro Licenses](https://www.red5.net/#price). It is not enabled for Trial or Developer Licenses.

To enable clustering, you will need to have at minimum, a __Startup Pro License__ associated with your [Red5 Pro Account](https://account.red5.net/login).

To purchase a license that supports clustering, visit the [Overview Section](https://account.red5.net/overview) of your account and fill in the required information under _Upgrade to Professional Server License_.

---

## Terminology

The follow terms will be used throughout this document.

### Cluster

One or more active servers which are expected to make real-time data streams available for consumption. These are usually audio and video streams but can also be other forms of data.

### Server Node

A server instance that is part of an active cluster.

### Broadcaster

The source of a live data stream, usually a webcam and microphone or smart phone. It can encompass the user, network session, or function of stream generation.

### Origin

An Origin accepts broadcasters.
Origins can also be configured to accept subscribers. The server can be in a hybrid mode where it repeats streams from another Origin. A stand-alone server is an Origin and an Edge.

### Edge

An Edge accepts subscribers.
An Edge is configured to have at least one origin to repeat content from. It can be configured to communicate with more than one Origin.

### Clustering

Clustering is how we configure multiple servers to be Edges and Origins interconnected in order to distribute real time data to all receiving clients.

---

# Enabling Clustering

Clustering is enabled by default for Pro, Startup and Growth Pro licenses. It is not supported for Trial or Developer licenses.

---

# Configuration

Included in the __conf/__ directory of your Red5 Pro Server install is a file named __cluster.xml__. The __cluster.xml__ file is a Spring Bean resource definition used to configure the cluster.

The properties defined on the resource will differ based on whether the deployed server is an Origin or an Edge. Thye are:

* __origins__ - The list of Origin IPs (and optional ports) for an Edge server to connect to.
* __password__ - The unique password for Edges to use in connection requests to Origin(s). **NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**
* __publicIp__ - The IP of the server on which the options are currently being configured
* __publicPort__ - The RTMP port that the current Red5 Pro Server is exposed on (default Red5Pro RTMP port is 1935)
* __privateInstance__ - Flag to include or exclude the current Red5 Pro Server from the Round Robin scenario of Edge subscribing. The default `false` value includes it in Round Robin.
* __retryDuration__ - The amount, in seconds, for an Edge to wait and retry a lost connection to an Origin

## Configuration of Origin

Most of the properties defined in the __cluster.xml__ file will have no effect on the inner-workings of a Red5 Pro Server designated as an Origin. However, it is a requirement that the `password` attribute is defined set as the same value for each Edge and Origin associated within a cluster.

Any modifications to cluster.xml will necessitate restarting the Red5 Pro server.

To configure an Origin,

1. Modify the __changeme__ value assigned to the `password` attribute in the __cluster.xml__ file. **NOTE: The `cluster` password can not contain any CAPITAL LETTERS at this time**
2. Modify THIS SERVER's public ip from 0.0.0.0
3. If you do not want the Origin to be part of the round-robin subscribers, the change the "privateInstance" value to "true"

_conf/cluster.xml_

```xml
<bean name="clusterConfig" class="com.red5pro.cluster.ClusterConfiguration">
  <property name="origins">
    <list>
      <!-- Add origin ips and optionally the port if its not default 1935. Uncomment origin entries-->
      <!-- <value>0.0.0.1</value> -->
      <!-- <value>0.0.0.2:1935</value> -->
    </list>
  </property>

  <!-- edge/origin link cluster password -->
  <property name="password" value="changeme" />

  <!-- THIS SERVER'S public ip used for round-robin at the origin server. -->
  <property name="publicIp" value="0.0.0.0" />

  <!-- THIS SERVER'S public RTMP port.-->
  <property name="publicPort" value="1935" />

  <!-- edges and origin can be excluded from round robin queries. -->
  <!-- set PrivateInstance to true to exclude this instance in round robin subscriber queries. -->
  <property name="privateInstance" value="false" />

  <!-- For an edge, it is the interval in seconds to retry to connect to origin if the origin becomes unavailable. -->
  <property name="retryDuration" value="30" />
</bean>
```

Additionally, there is a __web.xml__ file included in the _webapps/root/WEB-INF/__ directory of the Red5 Pro Server install that defines the Round Robin servlet (note: this file does not need to be modified). This is the service from which subscribers will request playback IP of the clustered stream:

_webapps/root/WEB-INF/web.xml_

```xml
<servlet>
  <servlet-name>cluster</servlet-name>
  <servlet-class>
    com.red5pro.cluster.plugin.agent.ClusterWebService
  </servlet-class>
  <load-on-startup>-1</load-on-startup>
</servlet>

<servlet-mapping>
  <servlet-name>cluster</servlet-name>
  <url-pattern>/cluster</url-pattern>
</servlet-mapping>
```

This will return the IP that subscribers will use to consume the stream with the following structure. The GET request will be made on a URI with the following structure:

* `http://<origin-ip>:5080/cluster`

## Configuration of Edge

When setting up an Edge server to be part of the Cluster, you will need to:

1. Modify the __changeme__ value assigned to the `password` attribute in the __cluster.xml__ file to be the same as the one set for the Origin.
2. Modify THIS SERVER's public ip from 0.0.0.0
3. Define a list of Origins in the `origin` attribute (one entry for each origin that the edge will be connecting to)
4. If you do not want the Edge to be part of the round-robin subscribers, the change the "privateInstance" value to "true"

Any modifications to cluster.xml will necessitate restarting the Red5 Pro server.  You can add Edges to an active cluster without restarting the Origin.

_conf/cluster.xml_

```xml
<bean name="clusterConfig" class="com.red5pro.cluster.ClusterConfiguration">
  <property name="origins">
    <list>
      <!-- Add origin ips and optionally the port if its not default 1935. Uncomment origin entries-->
      <!-- <value>0.0.0.1</value> -->
      <!-- <value>0.0.0.2:1935</value> -->
    </list>
  </property>

  <!-- edge/origin link cluster password -->
  <property name="password" value="changeme" />

  <!-- THIS SERVER'S public ip used for round-robin at the origin server. -->
  <property name="publicIp" value="0.0.0.0" />

  <!-- THIS SERVER'S public RTMP port.-->
  <property name="publicPort" value="1935" />

  <!-- edges and origin can be excluded from round robin queries. -->
  <!-- set PrivateInstance to true to exclude this instance in round robin subscriber queries. -->
  <property name="privateInstance" value="false" />

  <!-- For an edge, it is the interval in seconds to retry to connect to origin if the origin becomes unavailable. -->
  <property name="retryDuration" value="30" />
</bean>
```

# Red5 Pro Default Clustering Functions

The main purpose of clustering is content distribution.

## Usage

The following capabilities provided by the Red5 Pro Server can benefit from clustering:

### &bull; Streaming

Every live stream published at the Origin is repeated by the Edges. There are no configurations to specify specific stream names eligible for repeating.

### &bull; Second Screen

Second Screen functions are treated as live content so local pairing works with hosts and clients using different Edges.

### &bull; Applications

The __ApplicationAdapter__ events - other than those mentioned above - are not broadcast between edges and origins. App joins, room starts, and other often used server events are not distributed.

---

## Extending

There is an API to send service calls through the clustered instances. You can specify handlers at runtime, and call those handlers from your application. This is the same API that the Second Screen SDK uses to operate in the clustered environment.

If you need to broadcast session events for your clients - such as room join - each instance sets the business handler locally and at runtime calls it remotely.

The application adapter can query the instance to find if it is an edge or an origin. The application adapter can optionally broadcast user messages to all other clustered instances, all edges, all origins, a specific instance, or all instances excluding one or more.

---

# Use cases

The following sections describe several use cases for utilizing clusters.

## Two Servers

A most common use case for small productions and events is to have one Origin and one Edge. The Origin is included in the round robin and because of that, both servers receive subscribers.

Both the Origin and Edge __cluster.xml__ files are edited to show `privateInstance` is `false`.

The Edge is also configured with the Origin IP. The Edge initiates the connection and reconnection if the Origin becomes unavailable.

### Publishers for Two Servers

Stream providers use the Origin IP as the server to connect to. The streams are then repeated at the Edge.

### Subscribers for Two Servers

Subscribing clients use the Origin IP to call the round robin service and receive either the edge or the Origin IP. They then subscribe to the stream at the provided host IP.

![Two Server Clustering](/_images/installation/server/clusters/cluster-docs.png)

---

## One Origin and Three Edges

Another common use case is to have multiple Edges and one Origin where subscribers are given only the Edge IP.

The Origin __cluster.xml__ file is edited to show `privateInstance` is `true`. This removes it from round robin sequencing. Edges are all set so `privateInstance` is `false`.

The Edges are configured with the Origins IP, and they will initiate the connection to the Origin and reconnection if the Origin becomes unavailable.

### Publishers for One Origin and Three Edges

Stream providers use the Origin IP as the server to connect to. The streams are then repeated at the Edges.

### Subscribers for One Origin and Three Edges

Stream consumers use the Origin IP for calling the round robin servlet. They then subscribe to the stream at the provided host IP.

![One Origin and Three Edges](/_images/installation/server/clusters/cluster-docs-3-2e.png)

---

## Multiple Origins

After setting up three Edges and One origin as described, you can add another Origin. All Edges are given two Origin IPs in the __cluster.xml configuration file__.

Restart the Edges and the new Origin.

### Publishers for Multiple Origins

Publishers can use either origin and all streams will be received by all edges.

### Subscribers for Multiple Origins

Subscribers can use the round robin service at either Origin and receive an active Edge IP.

![One Origin and Three Edges](/_images/installation/server/clusters/cluster-docs-4-202e.png)

---

## Daisy Chain

If the broadcasters are in one geographic region and subscribers in another one very far removed, then one might want to set up a server cluster with intermediary servers between the Edge and Origin servers. In this case, the first intermediary server would be set up as an Edge server referencing the Origin server in its __cluster.xml configuration file__. The next intermediary server would reference the previous intermediary as an Origin server in its __cluster.xml configuration file__; and the final link in the chain would reference the previous intermediary server as its Origin in its __cluster.xml configuration file__.

![Daisy Chain](/_images/installation/server/clusters/R5PIntermediaryFlow.png)
