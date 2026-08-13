---
title: Troubleshooting Red5 Pro Autoscaling Issues
description: ""
menu_order: 16
---

## Order of Operations for Environment Troubleshooting

**NOTE** if you reboot a node that is part of a nodegroup, the stream manager will most likely replace it before it restarts, which may cause nodegroup instability. If a node is unresponsive the best course of action is to terminate the node via the [stream manager API call](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-nodes/#TerminateNode) or manually stop/terminate the instance from the hosting platform dashboard, allowing the stream manager to replace the node per your nodegroup's scaling policy.

If there are problems with stream quality for all subscribers, then check the CPU/memory health of the origin instance where the stream was originally broadcast to. If there are no problems there, then try subscribing to the stream directly on the origin server.

If there are problems with stream quality for some subscribers, then try subscribing to the stream directly on each edge server in your nodegroup.

If you are experiencing delays in API response, then check the CPU/memory on your Stream Manager and autoscale database.

> NOTE: you can automatically monitor and replace nodes using one or both of Red5 Pro corrupted node management solutions.

## Cluster Communication

* If your streams are publishing but not showing on the edge servers, check the following:
  * Run the [node relations map API call](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-groups/#NodeRelationsMap) to verify origins and edges are connected
  * Make sure that the cluster password is the same for nodes and in the stream manager `red5-web.properties` file
  * Ensure that the nodes can communicate with each other over ports 5080 and 1935
  * Ensure that the `red5pro-rtsp` jar file has not been removed from `/usr/local/red5pro/plugins` on the nodes' image.
* If you have origins and edges across multiple regions, you may want to increase the edge reporting frequency to improve communication. On the edge/origin disk image, modify the `{red5pro}/conf/cluster.xml` file, changing the `proxyPingInterval` from the default 10000 (10 seconds) to as low as 4000 (4 seconds) (`<property name="proxyPingInterval" value="4000" />`)

# Log Settings and Collection

The following describes log settings that can be modified on your instances to troubleshoot different problems.

**NOTE:** if you modify `<configuration>` at the top of the `red5pro/conf/logback.xml` file to `<configuration scan="true" scanPeriod="60 seconds">` that setting allows you to edit logging levels without restarting the server. Debug logging **will** add overhead to your servers.

## Stream Manager

The following loggers can be modified or added to your `red5pro/conf/logback.xml` file to troubleshoot autoscaling issues from the Stream Manager side:

* `<logger name="com.red5pro.services.streammanager"` - logging for all stream manager operations, including broadcast/subscribe requests, API calls, scale out/in operations, and WebSocket proxy. It is recommended to change the setting to `level="INFO"` first, and then to ` level="DEBUG"` if INFO doesn't return the information you are looking for.

Troubleshooting specific cloud platforms:

* AWS cloud controller: `<logger name="com.red5pro.services.cloud.aws.component.AWSInstanceController"`
* AWS cloud API: `<logger name="com.amazonaws"`
* Google Cloud controller: `<logger name="com.red5pro.services.cloud.google.component.ComputeInstanceController"`
* Azure cloud controller: `<logger name="com.red5pro.services.cloud.microsoft.component.AzureComputeController"`
* Simulated cloud controller: `<logger name="com.red5pro.services.simulatedcloud.generic.component.GenericSimulatedCloudController"`

## Terraform

Terraform is only involved in the deployment and removal of nodes. Terraform Service logging is written to the `/usr/local/red5service/red5.log` file (or whatever the path is to your terraform service), and should include useful information about any problems that terraform encounters while trying to deploy (or terminate) and instance (e.g., if you created a disk image for a lower instance type than you specified in your launch configuration policy).

A single terraform server can only perform one action at a time - so it is important to make sure that one action is completed before initiating a second action. For this reason, when replacing a nodegroup it is best to:

1. Create the new nodegroup
2. Check the nodegroup nodes' statuses, and wait until they all come back as `inservice`
3. Delete the original nodegroup

## Logging on Nodes

It is recommended that during your development phase setting the `conf/logback.xml` file to use `<configuration scan="true" scanPeriod="60 seconds">` - this will allow you to modify logging levels on individual nodes without having to create a new disk image.

To troubleshoot node-to-streammanger or intra-node communication, modify/add the following logging entries:

```xml
<logger name="com.red5pro.cluster.plugin" level="DEBUG"/>
<logger name="com.red5pro.cluster.plugin.ClusterPlugin" level="DEBUG"/>
<logger name="com.red5pro.clustering.autoscale" level="DEBUG"/>
```

For troubleshooting transcoding and ABR subscribing, modify the following entries as well:

for WebRTC ABR:

```xml
<logger name="com.red5pro.webrtc.stream.FlashToRTCTransformerStream" level="DEBUG"/>
<logger name="com.red5pro.webrtc.stream.RTCBroadcastStream" level="DEBUG"/>
```

and for RTSP ABR:

```xml
<logger name="com.red5pro.rtsp.RTSPMinaConnection" level="DEBUG"/>
```

# Other Tips

## Nodegroup Log Collection

Copy the following into a file, then make that file executable.

> NOTE: *this script will not work for Google Cloud installations unless you include an ssh key on your nodes*

```sh
#!/bin/bash
SM_DOMAIN='<your-streammanager-url>'
API_VERSION='4.0'
NODE_GROUP='<nodegroup-id>'
API_PASS='<streammanager-api-token>'
PATH_TO_SSH_KEY='<full/path/to.ssh-key>'
SSH_USER='<username-for-ssh-into-nodes>'

log_i() {
    log
    echo "[INFO] ${@}"
}
log() {
    echo -n "[$(date '+%Y-%m-%d %H:%M:%S')]"
}

array=()
current_time=$(date '+%m%d_%H%M%S')
log_i "Create log folder ./logs_${current_time}"
mkdir ./logs_${current_time}

result=$(curl --silent "https://${SM_DOMAIN}/streammanager/api/${API_VERSION}/admin/nodegroup/${NODE_GROUP}/node?accessToken=${API_PASS}")

resp=$(echo $result |jq -r '.[] | [.role, .address] | join(" ")' | awk '{print $2}')

for resp_index in $resp
do
    role=$(echo $result |jq -r '.[] | [.role, .address] | join(" ")' | grep $resp_index | awk '{print $1}')
    log_i "Start download logs from $role with IP: $resp_index"
    mkdir ./logs_${current_time}/${role}_${resp_index}
    scp -o StrictHostKeyChecking=no -C -r -i $PATH_TO_SSH_KEY $SSH_USER@$resp_index:/usr/local/red5pro/log/* ./logs_${current_time}/${role}_${resp_index}/ &
    array+=($!)
    sleep 0.2
done

for pid in ${array[*]}
do
    while true;
    do
        if ps -p $pid > /dev/null
        then
            sleep 0.5
        else
        break
        fi
    done
done
```

This bash shell script can be run from a terminal session and will copy the logs from all of the nodes in whichever nodegroup you specify. You will need to modify the following values to run the script:

* `SM_DOMAIN` - the domain URL of the stream manager
* `API_VERSION` - stream manager API version (currently default is 4.0)
* `NODE_GROUP` - the id of the nodegroup from which to pull the logs; to get the active nodegroups run the [list nodegroups API call](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-groups/#ListGroups)
* `API_PASS` - stream manager access token
* `PATH_TO_SSH_KEY` - full path to the SSH key used to access the nodes
* `SSH_USER` - in general this is `root` for Digital Ocean and `ubuntu` for AWS and Azure

System requirements - will need to install jq (`brew install jq`) if you don't have it already.

## Rolling Logs

It is strongly recommended that your servers are configured to use [rolling logs](/docs/installation/installation/red5proservice/#rolling-log-files) so you don't run the risk of filling up a server with huge log files.

## Retrieving logs from nodes removed from nodegroups

The `instancecontroller.deleteDeadGroupNodesOnCleanUp` setting in `stream manager/WEB-INF/red5-web.properties` is set to true by default. If you set this to `false` then the stream manager should stop your VMs but not terminate them (*This is not supported by the Terraform cloud controller.*). This allows you to grab the logs from nodes that have been removed from a nodegroup - with the caveat that you need to configure the logback append settings on the node images to `true` (that is set to false by default, which means that the logs get overwritten when the instance is started).

```xml
<appender class="ch.qos.logback.core.FileAppender" name="FILE">
    <file>log/red5.log</file>
    <append>true</append>
    <encoder>
      <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>
```