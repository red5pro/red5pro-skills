---
title: Optional - Load Balance Stream Managers
description: ""
menu_order: 10
---

Adding a Load Balancer for your Stream Managers

1. From the Networking section, select **Load Balancers**
2. Click on **Create Load Balancer** and select the "Load Balancer" (non-network) type
3. **Add Details**: 
  * Give your load balancer a name for easier management.
  * Choose **Public** visibility
  * Select **Reserved IP Address** and **Create new reserved IP address** so you can create a DNS record for your load balancer
  * Enter the DNS name to be assigned to the load balancer
  * Choose the compartment where your autoscale environment will be configured
  * Choose the minimum and maximum bandwidth range that you require, using the sliders
  * Under "Choose Networking", select the stream manager subnet and stream manager security group
  * Optional: under Advanced Options, Use a [Web Application Firewall Policy](https://docs.oracle.com/en-us/iaas/Content/WAF/Policies/waf-policy_management.htm) to protect against layer 7 attacks.
  * Click on **Next**
4. **Choose Backends**
  * Specify a Load Balancing Policy: we recommend selecting the "Least Connections" option to best distribute traffic
  * Select Backend Servers (Optional). Click **Add Backends** to select resources from a list of available Compute instances. You can choose instances from one compartment at a time. After you add instances from one compartment, you can choose **Add More Backends to add instances from another compartment**. You can also add backend servers after you create the load balancer. If you want to add your existing Stream Manager to the backend, click on **Add Backend** and select your stream manager VM.
  * Specify Health Check Policy: modify the default HTTP port from 80 to 5080. The other defaults can remain.
  * Use SSL; choose the Load Balancer Managed Certificate, and load your SSL certificate, CA Certificate and Private Key pem files.
5. **Configure Listener**
  * Create a listener for HTTPS traffic, port 443, and choose Load Balancer Managed Certificate as above.

  