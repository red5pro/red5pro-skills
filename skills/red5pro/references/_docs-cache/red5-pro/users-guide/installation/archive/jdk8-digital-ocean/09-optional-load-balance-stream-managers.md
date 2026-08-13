---
title: Optional - Load Balance Stream Managers
description: Optional - Load Balance Multiple DO Stream Managers
menu_order: 10
---

* Create the first Stream Manager per the instructions, then create an image from that instance. Build subsequent stream managers from that image. It is essential that the config files be identical between the two stream managers with one exception:
* Edit `red5pro/webapps/streammanager/WEB-INF/red5-web.properties` and modify `## LOADBALANCING CONFIGURATION streammanager.ip=`, adding the Assigned IP address of the individual Stream Manager instance you are modifying.
* **IMPORTANT** make sure to give any stream manager instances access to the PostGres database before you start the Red5 Pro service on them. Then you can add them to the load balancer.

## Add Wildcard Certificate

If you can download a wildcard certificate from your DNS provider, then that is recommended. If you can't, then you can generate one through Let's Encrypt as long as you have access to your DNS management, as it requires adding a TXT record.

* Navigate to Account, Settings, Security tab.
* Under **Certificates** click on **Add Certificate**
* If you are hosting your domain on Digital Ocean, you can "Search for a domain on Digital Ocean", otherwise, click on the "Bring your own certificate" tab. You will need the `cert.pem`, `privkey.pem`, and `chain.pem` files from Let's Encrypt.
* Name the SSL certificate (for example *.mydomain.com)
* In the **Certificate** field, copy & paste the full text from the `cert.pem`
* In the **Private key** field, copy & paste the full text from the `privkey.pem`
* In the **Certificate chain** field, copy & paste the full text from the `chain.pem`
* Save the certificate to use below

## Create Load Balancer

* From the left-hand navigation, go to Networking, then choose Load Balancers
* Click on **Create Load Balancer**
* *Choose a size* - Small size is only recommended for development environment. Large size is required for any production environment. **Note:** while you can't change the load balancer type, you can create a second load balancer with the same target resources and then delete the first one, if you want to migrate to a different size.
* Choose the region where your stream managers will be ![dolb01](/_images/installation/server/autoscaledigitalocean/dolb01.png)
* Accept the default VPC assignment
* Create Forwarding rules

| Load Balancer Protocol | Load Balancer Port | Droplet Protocol | Droplet Port |
|---|---|---|---|
| HTTP | port 5080 | HTTP | port 5080 |
| HTTPS | port 443 | HTTP | port 5080 |

*You will need to choose the wildcard certificate created above when you add the HTTPS rule.* ![dolbfwd](/_images/installation/server/autoscaledigitalocean/dolbfwd.png)

* Advanced Settings (choose default except where noted):
  * Algorithm: choose **Least Connections**
  * Health checks: modify port from `80` to `5080` ![dolbadv](/_images/installation/server/autoscaledigitalocean/dolbadv.png)
* Choose a name for your load balancer, then click on **Create Load Balancer**
