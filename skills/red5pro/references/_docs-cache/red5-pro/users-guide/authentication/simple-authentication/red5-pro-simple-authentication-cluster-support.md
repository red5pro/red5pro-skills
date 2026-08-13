---
title: Cluster Support
description: ""
menu_order: 7
---

This authentication plugin can also be used with [Red5 pro clusters](/docs/red5-pro/users-guide/clustering/) built manually or using [streammanager](docs/red5-pro/users-guide/).

Clustering involves a group of interconnected nodes (origins and edges). A publisher stream is streamed from an origin to one or more edges by the Red5 pro `cluster-restreamer`. In the context of a Red5 pro ecosystem, the cluster-restreamer itself is a connection. Hence when the simple auth plugin is turned on, the authentication restriction applies to the `cluster-restreamer` as well. The `red5pro-simple-auth-plugin` treats a `cluster-restreamer`connection as a special client with the following credentials.

```xml
username : cluster-restreamer
password: <cluster-password>
```

The username for the `cluster-restreamer` is always `cluster-restreamer` and the password is the clustering password configured in the cluster configuration file `cluster.xml` located at `RED5_HOME/conf/cluster.xml`.

You can choose to authenticate the restreamer in one of the following ways:

* Add the special `cluster-restreamer` credentials to your authentication data source.
* Implement your own `IAuthenticationValidator` as described earlier and have the implementation verify the `cluster-restreamer` username and the `cluster` password locally (on the server) without connecting to the data source.
