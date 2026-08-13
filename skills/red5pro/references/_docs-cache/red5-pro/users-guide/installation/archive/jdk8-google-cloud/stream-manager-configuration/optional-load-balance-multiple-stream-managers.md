_From: 6. Stream Manager Configuration_

## Optional: Load-Balance Multiple Stream Managers

<u>**Prerequisites:**</u>

* One reserved elastic IP address for *each* Stream Manager.
* A registered Domain Name to associate with the reserved Load Balancer IP address.
* Create the first Stream Manager per the above instructions, then create a snapshot from that instance. Build the second stream manager from that snapshot. **It is essential that the config files be identical between the two stream managers with one exception:**
* Edit `red5pro/webapps/streammanager/WEB-INF/red5-web.properties` and modify `## LOADBALANCING CONFIGURATION streammanager.ip=`, adding the Assigned IP address of the individual Stream Manager instance you are modifying.
* Add all Stream Manager public IP addresses to the Database security group.

<u>Under Networking tab choose **Load balancing**.</u>

![loadbalancer01](/_images/installation/server/autoscalgooglecloud/loadbalancer01.png)

Click on `+` CREATE LOAD BALANCER

Choose **TCP Load Balancing**, click on **Start configuration**.

![loadbalancer02](/_images/installation/server/autoscalgooglecloud/loadbalancer02.png)

**Internet facing or internal only** - choose **From internet to my VMs**; Connection termination - *Do you want to offload SSL processing to the Load Balancer?* - choose Yes (SSL Proxy) if you have an SSL cert; otherwise choose No (TCP). Click on **Continue**

![loadbalancer03](/_images/installation/server/autoscalgooglecloud/loadbalancer03.png)

Name your load balancer (eg, `streammanager-loadbalancer`), then click on **Backend configuration**.

![loadbalancer04](/_images/installation/server/autoscalgooglecloud/loadbalancer04.png)

**Backend configuration:** Choose the region where your stream managers are from the pull-down. Click on **Select existing instances**  tab and add your two stream managers.

![loadbalancer06](/_images/installation/server/autoscalgooglecloud/loadbalancer06.png)

**Create a health check:** name your health check, and modify HTTP to use port 5080 (Red5 Pro default). You can make the healthy/unhealty threshold (to remove/re-add servers in the pool accordingly) as aggressive as you like.

![loadbalancer05](/_images/installation/server/autoscalgooglecloud/loadbalancer05.png)

**Frontend configuration:** click on Create IP address to Reserve a new static IP for the Load Balancer

![loadbalancer07](/_images/installation/server/autoscalgooglecloud/loadbalancer07.png)

**Review and finalize:** look over the details, then click on **Create**

**IMPORTANT** You will need to create a new disk image - create a new VM from the original disk image, and modify `{red5prohome}/conf/autoscale.xml` to point to the **Load Balancer** IP address, then create a new disk image from this VM to use for your nodes.
