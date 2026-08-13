_From: Stream Manager 2.0 Admin API_

## NodeGroupConfig

The NodeGroupConfig defines how a NodeGroup (a cluster) will be automatically scaled.

### Data Model
![NodeGroupConfig Data Model](/_images/red5-pro/users-guide/architecture/NodeGroupConfig.png)


### NodeGroupConfig
The main class for NodeGroup configuration.

`name`: Required. String. Min 1 char, max 16 chars. Alphanumeric, plus `-`, `_`, and `.`. Must be GLOBALLY unique (no two Node Groups can share the same name). Additionally, the name `default` is reserved (see usage in AS-Streams documentation, Get Server For Publish/Subscribe).

`description`: Optional. String. Max 4096 chars.

`isScalingPaused`: Optional. Boolean. Default `false`. If `true`, no autoscaling will occur. (Use with Update NodeGroupConfig to enable or disable autoscaling.)

`cloudPlatform`: Required. String. One of: `AWS`, `AZURE`, `DO`, `DOCKER`, `GCP`, `KUBERNETES`, `LINODE`, `OCI`, or `VSPHERE`.

`initScripts`: Optional. `List<String>`. Each string max 4096 chars. Each string is the fully-qualified path to an executable file in the node image. Each specified script will be run once when the node is first deployed before Red5Pro server is started for the first time.

`cloudProperties`: Optional. String. Max 4096 chars. NodeGroup-level `cloudProperties`. See **About CloudProperties** below. This is a good place for cloud properties that are common to all servers in the NodeGroup.

`tags`: Optional. `Map<String, String>`. Key: Max 64 chars, alphanumeric, plus `-` and `_`. Value: Max 128 chars, any Unicode. A map of name-value pairs used to tag resources created in the cloud platform. The joined tags map can contain no more than ten key-value pairs. See **About Tags** below.

`clusterPassword`: Optional. String. Max 255 chars. The cluster password is mostly used for inter-node communication. If no cluster password is set when creating a NodeGroup, a new `clusterPassword` will be generated.

`maxPublishers`: Optional. Integer. If specified, AS-Streams service will limit the maximum number of publishers. Get Server for Publish will return 503: Service Unavailable when overloaded.

`maxSubscribers`: Optional. Integer. If specified, AS-Streams service will limit the maximum number of subscribers. Get Server for Subscribe will return 503: Service Unavailable when overloaded.

`baseNodeGroupName`: Optional. String. Min 1 char, max 16 chars. The base config name to overlay if this NodeGroupConfig is scheduled (see `schedules` below). An overlay becomes active at the specified time(s) according to `schedules` and replaces the designated base NodeGroupConfig. During overlay, this NodeGroupConfig masquerades as the base config by assuming its name and replacing it. 

`shuffleSizeExpression`: Required. String. Max 4096 chars. An expression that governs how many of the available nodes will be shuffled before returning a server for publish or subscribe (see below).

`propertyOverrides`: Optional. A list of `NodePropertyOverrides` (see below).

`schedules`: Optional. A map of `NodeGroupSchedule` by `NodeGroupSchedule.name` (see below).

`images`: Required. A map of `NodeImage` by `NodeImage.name` (see below).

`roles`: Required. A map of `NodeRole` by `NodeRole.name` (see below).

`subGroups`: Required. A map of `SubGroupConfig` by `SubGroup.name` (see below).


### NodeGroupSchedule

A schedule definition. Schedules can operate in two ways:

In the first case, `baseNodeGroupName` is not specified (or is `null`). In this case, the schedule governs when this NodeGroupConfig will take effect. At `startAt`, the NodeGroup will be created and scaled out, after `durationS` seconds have elapsed, the NodeGroup will be destroyed. Multiple `NocdeGroupSchedule` can be assinged to a single NodeGroupConfig to scale it out at different times.

In the second case, `baseNodeGroupName` specifies a base NodeGroupConfig. In this case, the schedule governs when this NodeGroupConfig will "overlay" the base NodeGroup: during overlay, this NodeGroupConfig masquerades as the base config by assuming its name and replacing it.

`name`: Required. String. Min 1 char, max 255 chars. Alphanumeric, plus `-`, `_`, and `.`. The name of the schedule. Must be unique within this `NodeGroupConfig`. 

`startAt`: Required. String. Min 1 char, max 999 chars. Cron expression for event start. For assistance with cron expressions, see http://www.cronmaker.com

`durationS`: Required. Integer. Min 60 (one minute), max 31536000 (365 * 24 * 60 * 60, one year). Cron expression for event end.


### NodeImage

A NodeImage represents a disk image within the NodeGroup's cloud platform. Multiple roles can share a single image, or special disk images can be prepared for a given role or set or roles.

`name`: Required. String. Min 1 char, max 255 chars. Alphanumeric, plus `-`, `_`, and `.`. Must be unique within this `NodeGroupConfig`. 

`image`: Required. String. Min 2 chars, max 255 chars. Alphanumeric, plus `-`, `_`, and `.`. The identifier of the disk image within the cloud platform. Terraform Service must be aware of this image. See **Terraform: Update Info** above.

`cloudProperties`: Optional. String. Max 4096 chars. NodeImage-level `cloudProperties`. See **About CloudProperties** below. This is a good place for cloud properties about the instance type (to define how much hardware is required for a node with this image).

`tags`: Optional. `Map<String, String>`. Key: Max 64 chars, alphanumeric, plus `-` and `_`. Value: Max 128 chars, any Unicode. A map of name-value pairs used to tag resources created in the cloud platform. The joined tags map can contain no more than ten key-value pairs. See **About Tags** below.


### NodeRole

A NodeRole represents a server role, based on a given disk image, having a certain set of capabilities, and given cluster parenting rules. Commonly defined roles might be "origin", "edge", "transcoder", etc.

`name`: Required. String. Min 1 char, max 16 chars. Alphanumeric, plus `_`, and `.` (**Note** that this does NOT include `-` which is specifically reserved for `NodeRole.name`). Must be unique within this `NodeGroupConfig`.

`imageName`: Required. String. Min 1 char, max 255 chars. The name of the disk image to use when scaling out servers of this role. A `NodeImage` with matching `NodeImage.namge` must be defined within this `NodeGroupConfig`.

`lifecycle`: Optional. Default `AUTO`. Enum value, either `MANUAL` or `AUTO`. Automatic or manual scaling for nodes of this NodeRole.

`capabilities`: Optional. Set of zero or more Capability. A Capability is a String, one of `SUBSCRIBE`, `PUBLISH`, `TRANSCODE`, `MIX`, `XILINX`, or `ZIXI`. This represents what kinds of tasks server nodes of this role are capable of. Publish requests will find servers belonging to roles that can `PUBLISH`. Subscribe requests will find servers belonging to roles that can `SUBSCRIBE`, and transcoding provisions will go to transcoders that can `TRANSCODE` and may optionally have special hardware, `XILINX` or `ZIXI`. See Streams service documentation for pub/sub requests and provisioning. A "relay" type node is an example of a node with empty `capabilities`.

`parentRoleName`: Optional. String. Min 1 char, max 16 chars. Alphanumeric, plus `_`, and `.`. The name of the parent role. A `NodeRole` with matching `NodeRole.name` must be defined within this `NodeGroupConfig`. When cluster nodes of this role are scaled out, they will be assigned parents (or not) according to the `parentRoleName` and `parentCardinality`. Cycles are forbidden: a node cannot be its own ancestor.

`propertyOverrides`: Optional. A list of `NodePropertyOverrides` (see below).

`initScripts`: Optional. `List<String>`. Each string max 4096 chars. Each string is the fully-qualified path to an executable file in the node image. Each specified script will be run once (one at a time, in order) when the node is first deployed before Red5Pro server is started for the first time.

`cloudProperties`: Optional. String. Max 4096 chars. NodeRole-level `cloudProperties`. See **About CloudProperties** below. 

`tags`: Optional. `Map<String, String>`. Key: Max 64 chars, alphanumeric, plus `-` and `_`. Value: Max 128 chars, any Unicode. A map of name-value pairs used to tag resources created in the cloud platform. The joined tags map can contain no more than ten key-value pairs. See **About Tags** below.

### SubGroupConfig

A "SubGroup" is an abstract hierarchical container may hold a set of ScaleRules for one or more NodeRoles and may have one or more child SubGroupConfigs defining child SubGroups. A SubGroup can be used to model various cloud platform topologies, such as organizing nodes into regions, or a hierarchy, such as geozones that contain regions that contain nodes.

`subGroupName`: Required. String. Min 1 char, max 16 chars. The name of this SubGroup. Must be unique within this `NodeGroupConfig`.

`nodeGroupName`: Required. String. Min 1 char, max 16 chars. The name of the parent NodeGroup. This must match the containing `NodeGroupConfig.name`.

`groupType`: Required. String. Min 1 char, max 255 chars. A label for this type of SubGroup, such as `region`, or `geoZone`. 

`rulesByRole`: Optional. Map of `ScaleRule` by `NodeRole.name`. Only leaf `SubGroupConfigs` may contain `ScaleRules` -- therefore, any given `SubGroupConfig` must define either `rulesByRole` or `childGroups`. Leaf `SubGroupConfigs` must define one `ScaleRule` for each `NodeRole` defined in the parent `NodeGroupConfig`. If you do not want a certain type of node to scale out in a certain region, set that `NodeRole`'s `ScaleRule`'s `min` and `max` fields to 0.

`childGroups`: Optional. A set of one or more child `SubGroupConfig`.

`cloudProperties`: Optional. String. Max 4096 chars. NodeRole-level `cloudProperties`. See **About CloudProperties** below. This is a good place for cloud properties relevant to the cloud platform container that you are modeling, such are role or geoZone.

`tags`: Optional. `Map<String, String>`. Key: Max 64 chars, alphanumeric, plus `-` and `_`. Value: Max 128 chars, any Unicode. A map of name-value pairs used to tag resources created in the cloud platform. The joined tags map can contain no more than ten key-value pairs. See **About Tags** below.


### ScaleRule

A `ScaleRule` governs how nodes of a given `NodeRole` will be automatically scaled in and out within a given `SubGroup`.

`subGroupName`: Required. String. Min 1 char, max 16 chars. The name of the parent SubGroup. This must match the containing `SubGroupConfig.name`.

`nodeGroupName`: Required. String. Min 1 char, max 16 chars. The name of the NodeGroup. This must match the containing `NodeGroupConfig.name`.

`nodeRoleName`: Required. String. Min 1 char, max 16 chars. Alphanumeric, plus `-`, `_`, and `.`. The name of the role. A `NodeRole` with matching `NodeRole.name` must be defined within this `NodeGroupConfig`.

`min`: Required. Integer. Min 0, max 1024. Must be less than or equal to `ScaleRule.max`. The minimum number of nodes belonging to this role required for this SubGroup. The Autoscaling service will never create more than `max` nodes of this `NodeRole` within the parent `SubGroup`.

`max`: Required. Integer. Min 0, max 1024. Must be greater than or equal to `ScaleRule.min`. The maximum number of nodes belonging to this role required for this SubGroup. The Autoscaling service will never create more than `max` nodes of this `NodeRole` within the parent `SubGroup`.

`increment`: Required. Integer. Min 1, max 1024. When the Autoscaling service determines that new nodes must be scaled out (or in) by this `ScaleRule`, it will scale out (or in) `increment` nodes at a time.

`inExpression`: Required (Note: OPTIONAL if `max` is 0). String. Max 4096 chars.  A Scale Expression (evaluates to Boolean). When this expression is true, `increment` nodes will be scaled in (down to `min`). See **Scale Expressions** below.

`outExpression`: Required (Note: OPTIONAL if `max` is 0). String. Max 4096 chars. A Scale Expression (evaluates to Boolean). When this expression is true, `increment` nodes will be scaled out (up to `min`). See **Scale Expressions** below.

`capacityRankingExpression`: Required. String. Max 4096 chars.  A Capacity Expression (evaluates to Integer). This expression is used when nodes must be sorted by capacity (for example to decide which running node(s) to scale in, or when finding a server for a publisher, etc). See **Capacity Expressions** below.

`capacityLimitExpression`: Required. String. Max 4096 chars.   A Capacity Expression (evaluates to Integer). When this expression is true for a given node, that node is at its capacity limit. The AS-Streams service will not return the node for publish or subscribe if the node is at or beyond its capacity limit. See **Capacity Expressions** below.


### NodePropertyOverrides

A single `NodePropertyOverrides` object specifies the name of a properties file (which must be located under `red5pro` in the `conf/`, `plugins/`, or `webapps/` directories, and must end with `.properties`), and a list of properties to modify. Property overrides can be specified globablly (for all nodes) in `NodeGroupConfig.propertyOverrides` or else per role in `NodeRole.propertyOverrides`. When a new node is created, it receives a concatenated list of overrides, `NodeGroupConfig` overrides first, followed by `NodeRole` overrides. All overrides are applied in order. It is valid to override the same properties file multiple times, or to modify the same property multiple times. In this case, the last change "wins". Comments are preserved. Properties can be modified and created but not removed.

`fileName`: Required. Max 2048 chars. The properties file to modify. If the file is not a valid target or no such file is found, no changes will be made.

`properties`: Optional (one and only one of `properties` or `blocks` should be supplied). A map of name value pairs. Key max 1024 chars. Value max 4096 chars. Where the key matches an existing property found in the file, the property's value will be modified. If no existing property is found, a new property will be appended to the end of the file.

`blocks`: Optional (one and only one of `properties` or `blocks` should be supplied). String. Max 255 chars.  A list of specially commented "block" names within an XML config file.


### About CloudProperties

At various levels in the data model you can specify `cloudPropeties`. When the Autoscaling service prepares to create a new node, it concatenates the relevant `cloudProperties` fields (adding `;` delimeter) and passes the resulting String to the Terraform Service.

This allows you to specify Terraform parameters at various levels as makes sense. For example, the `NodeGroupConfig` could contain `security_group` (all nodes share), each `SubGroup` can define its own `region` (to model regions), and each `NodeImage` can specify the `instance_type`, allowing role-based instance types.


### About Tags

At various levels in the data model you can specify `tags`. Tags allow you to supply metadata to resources; ie, a list of key-value pairs on nodes created by the Terraform Service.

When the Autoscaling service prepares to create a new node, it joins the relevant `tags` fields, in order: `NodeGroupConfig`, `SubGroupConfig`, `NodeImage`, and finally `NodeRole`. Therefore, if the same tag is specified at multiple levels in the hierarchy, the lowest level is the effective value. The joined tags are then given to the Terraform service to tag the resources within the cloud platform.

The joined tags map can contain no more than ten key-value pairs.
