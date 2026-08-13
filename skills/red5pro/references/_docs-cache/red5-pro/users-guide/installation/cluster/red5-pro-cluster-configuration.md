---
title: Configuration
description: ""
menu_order: 4
---

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
