---
title: Troubleshooting Autoscale Deployment - General
description: ""
menu_order: 15
---

General autoscale setup issues and solutions:

## Stream Manager Red5 Pro Service Failure

If the red5pro `jsvc` service is failing to start on your stream manager, verify that your LICENSE.KEY file is in the red5pro root directory, and the stream manager has access to the database.

## Multiple Autoscale Environments

**VERY IMPORTANT:** If you have more than one autoscaling environment running, it is essential that the `instancecontroller.instanceNamePrefix=` property *is set to a completely unique value for each environment*, or the first stream manager may terminate the nodes belonging to the second group. 

As an example, if you have one environment with `instancecontroller.instanceNamePrefix=node` and another one with `instancecontroller.instanceNamePrefix=node123`, the `node123` instances will be terminated by the first stream manager. This occurs because it identifies them as starting with `node` and therefore as instances it should be managing which are not present in its database. Find the `instancecontroller.instanceNamePrefix=` in the `{red5pro}/webapps/streammanager/WEB-INF/red5-web.properties`, and edit it accordingly.

## Instance Quotas

Most cloud platforms have regional and/or global quotas for VMs (especially with new accounts). Make sure that your account has sufficient allowance in the region(s) where you plan to depoloy your autoscaling solution to allow for growth.

## Nodegroup Doesn't Populate

If you have created a new nodegroup, but adding an Origin server doesn't automatically spin up an accompanying Edge server, check the following on your node image:

* Verify that **red5pro/conf/autoscale.xml** in your Red5Pro server image points to the IP address or URL of your stream manager
    ```
    replace 0.0.0.0 in <property name="cloudWatchHost" value="http://0.0.0.0:5080/streammanager/cloudwatch"/>
    ```
    And make sure that you have edited the active value from the default “false” to “true”  (`<property name="active" value="true"/>`)
* Check `{red5pro}/conf/cluster.xml` - make sure that the password set for `<!-- edge/origin link cluster password -->` matches the `cluster.password=` in the stream manager `red5-web.properties` file.
* Make sure that your have your `LICENSE.KEY` file in the `{red5pro}` root directory; clustering (and in turn, autoscaling) will not work without a valid license key.

If all of the above check out OK, then:

* On the Stream Manager: modify `conf/logback.xml`, setting ` <logger name="com.red5pro.services.streammanager" level="DEBUG" />`; restart the service on the stream manager to apply the new log level and tail `{red5pro}/log/red5.log` file.
* On the node VM, modify `conf/logback.xml`, setting `<logger name="com.red5pro.clustering.autoscale" level="DEBUG"/>` then start red5pro on your instance by changing to the red5pro home directory (default: `/usr/local/red5pro`) and running `sudo ./red5.sh`

You should see log messages about an instance pinging the Stream Manager and requesting a role assignment. If you don't, then check for inbound port access to your stream manager (or outbound port access from your node security group).


