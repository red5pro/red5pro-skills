---
title: API Basics
description: API Basics, to get you started
menu_order: 10
---

(for full API, see [Red5 Pro Stream Manager API](/docs/red5-pro/development/api/archive/rest-api-v-400/))

For the POST calls, we recommend using a tool like [Postman](https://www.postman.com/).

## Verify Stream Manager is Using the Correct Controller

GET call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/debug/cloudcontroller?accessToken=<rest.administratorToken>
```

should return:  `Google Compute`

## Create a Scale Policy (post)

* Make sure to include a `role` section for each node type you want to include (origin, edge, relay, transcoder):

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
   {
  "policy": {
          "name": "<policy-name>",
          "description": "<policy-description>>",
          "type": "<policy-type>",
          "version": "<policy-version>",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "target": [
        {
          "role": "<role>",
          "minLimit": "<min-node-count>",
          "maxLimit": "<max-node-count>",
          "scaleAdjustment": "<node-scale-adjustment>"
        }
      ]
    }
    }}
```

## Create a Launch Policy (post)

For ease of administration, we recommend naming the policy something easily identifiable and descriptive, such as `<imagename>-<nodetypes>` (e.g., `red5pro6.4.0-allnodetypes`)

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
   {
    "launchconfig": {
      "name": "<configuration-name>",
      "description": "<configuration-descrption>",
      "image": "<red5pro-image>",
      "version": "0.0.3",

    "targets": {
        "target": [
      {
        "role": "<role>",
        "instanceType": "<instance-type>",
        "connectionCapacity": "<instance-capacity>"
      }
      ]
      },

      "properties": {
        "property": [
          {
            "name": "<property-name>",
            "value": "<property-value>"
          }
        ]
      },
      "metadata": {
        "meta": [
          {
            "key": "<meta-name>",
            "value": "<meta-value>"
          }
        ]
      }
    }}
```

## Create a New Node Group (post)

POST call: 
```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken>
```

Data (make sure to select **JSON** as the body type):

```json
{
 "regions": [
   "<region, eg: us-west2>"
 ],
 "launchConfig": "<launchconfig-created-above>",
 "scalePolicy": "<scaleconfig-created-above>"
}
```

**Note the cluster “name” that is returned by the above call. It will be used to create a new Origin server.**

## Launch New Origin (post)

After you create a node group, create the origin server.  *Creating an origin server will also generate at least one edge, per scaling policy min limit.*

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup/<cluster-name>/node/origin?accessToken=<rest.administratorToken from red5-web.properties file>
```

**NOTE:** If you wish to launch more than one origin, you can repeat the call. The maximum origins allowed will depend on the maxLimit attribute of the 'origin' object described in scale policy. If 'origin' is omitted from the scale policy then the default value for maximum origins is 1.

## Set Alarm Threshold (POST)

By default, the alarm threshold (the capacity percentage at which the cluster will scale up any given node type) is set to 60%. To modify this, POST the following:

**FOR EDGE:**

```https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=edge&threshold=<threshold>&accessToken=<rest.administratorToken>
```

**FOR ORIGIN:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=origin&threshold=<threshold>&accessToken=<rest.administratorToken>
```

**FOR RELAY:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=relay&threshold=<threshold>&accessToken=<rest.administratorToken>
```

**FOR TRANSCODER:**

```
https://<streammanager_URL>/streammanager/api/4.0/admin/alarm/scaleout/default?type=transcoder&threshold=<threshold>&accessToken=<rest.administratorToken>
```

## LIST GROUPS (get)

```
https://<streammanager_URL>/streammanager/api/4.0/admin/nodegroup?accessToken=<rest.administratorToken from red5-web.properties file>
```

* * *

# Stream Manager Publish and Subscribe Examples

*Stream Manager Proxy Publish and Subscribe Examples*

With the latest release, the `live` webapp includes two examples: `proxy-publisher.html` and `proxy-subscriber.html`. These examples will take the following query parameters:

| Name | Description | Default Value |
| --- | --- | ---|
| host | hostname or IP | window.location.hostname |
| protocol | protocol which Stream Manager is served over (http or https) | window.location.protocol |
| port | port number that Stream Maager is served on | window.location.port |
| app | webapp name to stream to on the server | live |
| streamName | The unique stream name to broadcast with or subscribe to | **None. Required** |
| verbose | Flag to enable verbose logging in Dev Console | None. optional |
| view | Target broadcast tech (rtc, rtmp or hls) | None. Optional |

> Example URI: 
```
https://streammanager.test.com/live/proxy-publisher.html?streamName=stream1&verbose=1
```

*Red5 Pro HTML5 SDK Examples:*

[Stream Manager examples](https://github.com/red5pro/streaming-html5/tree/master/src/page/sm-test)

Note: the `streaming-html5` examples testbed is included with the Red5 Pro server distribution, and can be accessed via your stream manager at `https://your.server.url/webrtcexamples/`.

*Red5 Pro iOS SDK Examples:*

[Publish - Stream Manager](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/PublishStreamManager)

[Subscribe - Stream Manager](https://github.com/red5pro/streaming-ios/tree/master/R5ProTestbed/Tests/SubscribeStreamManager)

*Red5 Pro Android SDK Examples:*

[Publish - Stream Manager](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/PublishStreamManagerTest)

[Subscribe - Stream Manager](https://github.com/red5pro/streaming-android/tree/master/app/src/main/java/red5pro/org/testandroidproject/tests/SubscribeStreamManagerTest)

## Compute VM Startup Scripts for Automation

Google compute allows the provisioning of shell scripts that can be executed on a VM as soon as it is initialized. This can be very useful in automating configuration tasks for dynamically scaled compute instances.

**Sample Use Cases:**

* Use a shell script to update the cloudwatch url property in the `autoscale.xml` during instance launch.
* Use a shell script to configure the various Red5 Pro attributes on the fly dynamically as the instance is being started.
* Install NFS, mount your file share and set access permissions on an autoscaled node.

While these are just samples of use cases, you can have your shell script do almost any kind of changes on the instance.

### Providing Startup Script to Autoscaled Nodes

Since its the Stream Manager which is responsible for launching Red5 Pro instances on the GCP,  we need to configure Stream Manager to initialize `Startup Script` on nodes.

The way this is done is by using the launch configuration schema. The launch configuration allows us to specify a list of `MetaData` items. These items are added to the instance as a part of its metadata. Google cloud compute, uses special metadata by name `startup-script-url` to attach a shell script to the VM.

The URL points to a publically accessible shell script resource. During the VM startup, the script will be downloaded from the location and run on the instance. A common usage pattern is to place the script in your Google storage bucket by your project ID. Example: `gs://" + PROJECT_ID + "/vm-startup.sh`.

For more information on startup scripts checkout the [official GCP documentation](https://cloud.google.com/compute/docs/startupscript).
