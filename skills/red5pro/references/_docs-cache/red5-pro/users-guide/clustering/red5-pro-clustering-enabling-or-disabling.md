---
title: Enabling or Disabling Clustering
description: ""
menu_order: 3
---

Clustering is enabled by default.

If you wish to disable clustering, you may do the following:

1 - Edit `{red5pro}/conf/cluster.xml`, changing `<property name="nodeType" value="auto" />` to `<property name="nodeType" value="off" />`

2 - Edit `{red5pro}/webapps/red5-default.xml`, commenting out the following lines:

`<bean id="clusterServiceResolver" class="com.red5pro.cluster.plugin.ClusterServiceResolver"/>`

and

`<bean id="applicationEventListener" class="com.red5pro.cluster.plugin.event.ApplicationEventListener" />`

3 - Remove the `{red5pro}/plugins/red5pro-cluster-plugin-*.jar` and `{red5pro}/plugins/red5pro-autoscale-plugin-*.jar` files.

> NOTE: clustering is not supported with Trial or Developer license types.
