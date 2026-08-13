---
title: Optional - Load-Balance Multiple Stream Managers
description: ""
menu_order: 12
---

<u>Prerequisites:</u>

* One reserved elastic IP address for *each* Stream Manager.
* A registered Domain C-Name to associate with the Load Balancer DNS.
* Create the first Stream Manager per the above instructions, then create an AMI from that instance. Build the second stream manager from that image in a different subnet than the first one, for better redundancy. **It is essential that the config files be identical between the two stream managers with one exception:**
* Edit `red5pro/webapps/streammanager/WEB-INF/red5-web.properties` and modify `## LOADBALANCING CONFIGURATION streammanager.ip=`, adding the Assigned IP address of the individual Stream Manager instance you are modifying.
* Add all Stream Manager public and private IP addresses to the Database security group.
* [Request a new certificate from ACM](https://console.aws.amazon.com/acm/home?region=us-west-2#/wizard). This will send an email request to the domain owner to approve.

### SSL Certificate Served via AWS Certificate Manager

When you set up your load balancer, you will need an SSL cert for proxying the secure requests. To set this up on AWS, navigate to the Certificate Manager (ACM) in the region where you will be configuring the load balancer (for example, if it's in us-east-1, then you'll find ACM at [https://console.aws.amazon.com/acm/home](https://console.aws.amazon.com/acm/home).

Click on Provision Certificates, Get Started, then **Request a certificate**. We recommend requesting a wildcard certificate, as that can be used for multiple environments (staging and production, for example). Enter `*.yourdomain.com` and click on Next. If you are the email contact for your domain, then you can choose "Email validation". If you are not, but you can manage your DNS, choose "DNS Validation". (**NOTE:** if you don't have access to either, then you will need to work with whomever in your organization does have access). Click on **Review**, then **Create**.

Expanding the domain listed (`*.yourdomain.com`) will display a CNAME record that needs to be added to your DNS. It will look something like this: `_12e8aa0g98ae0493d7aa7b9549a3420d9.yourdomain.com. CNAME _fb123456a62f15c3a85d130a4df47cb.hkvuiqjoua.acm-validations.aws.`

When you add this to youurdomain.com DNS records, it should be added as:

`_12e8aa0g98ae0493d7aa7b9549a3420d9` CNAME `_fb123456a62f15c3a85d130a4df47cb.hkvuiqjoua.acm-validations.aws`

If you can control the TTL on your domain, set it to a low value (300 seconds/five minutes, for example). If you can't, then it can take up to 24 hours for new DNS entries to propagate from some providers. Once the request has propagated, the certificate status will change from *Pending validation* to *Issued*.

---

<u>Create Load Balancer</u>

* Navigate to the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home), in the region where you reserved the stream manager IP addresses.
* From the left-hand navigation, under LOAD BALANCING, click on Load Balancers
* Click on **Create Load Balancer** and choose **Application Load Balancer**, then click **Create**.

![portmaps](/_images/installation/server/autoscaleaws/applicationlb.png)

* Step 1: Define Load Balancer:
* * Give the load balancer a name (only alphanumeric characters and `-` are allowed).
* * Scheme: internet-facing
* * IP address type - ipv4
* Listener Configuration: add the following listener ports:

| Load Balancer Protocol | Load Balancer Port |
|---|---|---|---|
| HTTP | 5080 |
| HTTPS | 443 |

![portmaps](/_images/installation/server/autoscaleaws/portmaps03.png)

* Availability Zones:
* * Choose the VPC where your stream managers are, and select all of the available zones

* Step 2: Configure Security Settings, and Select a Certificate.
* * Select "Choose an **existing** certificate from AWS Certificate Manager (ACM), and select the certificate you created earlier, which should be in the drop-down menu next to **Certificate:**. This certificate will be used both for HTTPS and Secure Websockets.
* * Unless you have some specific security needs, accept the **Predefined Security Policy**, and click on **Next: Configure Health Check**.

![existingcert](/_images/installation/server/autoscaleaws/existingcert.png)

* Step 3: Configure Security Groups - choose the Stream Manager security group that you set up previously.
* Step 4: Configure Routing - Target Group: New Target Group (give it a name); target type: Instance. Protocol HTTP, port 5080.
* * Health checks: protocol: HTTP, path `/`.
* * Click on **Next: Register Targets**
* Step 5: Register targets
* * choose your stream manager instance(s), and click on **Add to registered**.
* * Click on **Next: Review**
* Step 6: Review. Make sure everything is set up as you wish, then click on **Create** to launch the load balancer.

**IMPORTANT** You will need to create a new disk image - create a new VM from the original AMI, and modify `{red5prohome}/conf/autoscale.xml` to point to the **Load Balancer** DNS name on port 5080, then create a new AMI from this VM to use for your nodes.

## Set Scaling Policy

With Stream Manager API v3.0, the Scaling and Launch policies are set via the API (see [scale policy management](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-scalepolicy/) and [launch policy management](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-launchconfig/)).

Using a tool like [Postman](https://www.postman.com/), you must set a scaling policy before creating any node groups. The policy supports two optional attributes per `role` target - `scaleInWaitTime` & `scaleOutWaitTime`. These are optional parameters denoting delayed scale-in/scale-out time in milliseconds. The attributes require positive values (>=0). If the attribute is omitted it defaults to `0`. For more information see scale policy description.

You will need to create a scaling policy that includes each node type that you want in your setup. If you want to take advantage of the new features (multi-bitrate streaming, adaptive bitrate subscribing, and dynamic clustering) you need to have a minimum of **two** each **origin, edge,** and **relay** nodes. If you want to include VP8 transcoding support, then you also need two **transcoder** nodes.

**POST call:** `https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=<accessToken>`

**Data** (make sure to select **JSON** as the body type):

```json
   {
    "policy": {
        "name": "<policy-name>",
        "description": "<policy-description>>",
        "version": "<policy-version>",
        "type": "<policy-type>",
    "targets": {
      "target": [
        {
          "role": "<role>",
          "minLimit": "<min-node-count>",
          "maxLimit": "<max-node-count>",
          "scaleAdjustment": "<node-scale-adjustmant>"
        }
      ]
    }
    }}

```

**Example:**

**REQUEST:** `https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/scalepolicy?accessToken=xyz123`

**Data:**

```json
   {
      "policy": {
          "name": "default-v3",
          "description": "Sample Scale Config policy with all node types",
          "type": "com.red5pro.services.autoscaling.model.ScalePolicyMaster",
          "version": "0.0.3",
          "targets": {
              "region": [
                  {
                      "name": "default",
                      "target": [
                          {
                              "role": "edge",
                              "maxLimit": 20,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "origin",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "relay",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          },
                          {
                              "role": "transcoder",
                              "maxLimit": 10,
                              "scaleAdjustment": 1,
                              "minLimit": 2
                          }
                      ]
                  }

```

## Set Launch Configuration Policy

You will need to create a launch policy that includes each node type that you want in your setup. If you want to take advantage of the new features (multi-bitrate streaming, adaptive bitrate subscribing, and dynamic clustering) you need to have a minimum of **two** each **origin, edge,** and **relay** nodes. If you want to include VP8 transcoding support, then you also need two **transcoder** nodes. You will need the name of the `ami` that you created in [step 7, preparing the AMI](/docs/red5-pro/users-guide/installation/archive/auto-aws-wav/prepare-red5-pro-ami-for-nodes/). You can choose different instance types and capacities for each node type if you wish.

**POST call:** `https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchconfig?accessToken=<accessToken>`

**Data** (make sure to select **JSON** as the body type):

```json
   {
    "launchconfig": {
      "name": "<configuration-name>",
      "description": "<configuration-descrption>",
      "image": "<red5pro-image>",
      "version": "0.0.2",

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

**Example:**

**REQUEST:** `https://<streammanager_URL>/streammanager/api/4.0/admin/configurations/launchpolicy?accessToken=xyz123`

**Data:**

```json
     {
    "launchconfig": {
      "name": "all-nodes-launch",
      "description": "Sample Launch Config with all four nodetypes",
      "image": "red5pro-image-name",
      "version": "0.0.3",

      "targets": {
          "target": [
        {
          "role": "origin",
          "instanceType": "c5.large",
          "connectionCapacity": "20"
        },
        {
          "role": "edge",
          "instanceType": "c5.large",
          "connectionCapacity": "200"
        },
        {
          "role": "relay",
          "instanceType": "c5.large",
          "connectionCapacity": "200"
        },
        {
          "role": "transcoder",
          "instanceType": "c5.xlarge",
          "connectionCapacity": "20"
        }
         ]
        },

        "properties": {
          "property": [
            {
              "name": "property-name",
              "value": "property-value"
            }
          ]
        },
        "metadata": {
          "meta": [
            {
              "key": "meta-name",
              "value": "meta-value"
            }
          ]
        }
      }}
```