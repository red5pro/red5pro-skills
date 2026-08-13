---
title: Create a Static IP, VPC and Firewalls for Stream Manager Instance
menu_order: 6
---

## Creating a Static IP for Stream Manager Instance in GCP

* Go to the [VPC network](https://console.cloud.google.com/networking/addresses) page in the Google Cloud Console.

* In the **VPC Network** section, click on IP Addresses in the left-hand menu &rarr; click on **Reserve External Static IP address**.

* Enter a name for the static IP address, such as `red5pro-static-ip`.

* Under **Network tier**, select **Standard**.

* Select the appropriate **IP version** Click checkbox `IPv4 and IPV6` is typically used for Stream Manager).

* Choose the **Regional** type, Where the Stream Manager instance will be deployed. In `region` field select a location, For Example `us-central1`

* Click **Reserve** to create the static IP address.

![Reserve Static IP](/_images/red5-pro/users-guide/stream-manager-2.0/installation/gcp/static-ip.png)

After the static IP is reserved, it will be listed under **External IP addresses**. This IP can now be associated while the usage of Stream Manager instance.

### Creating a Network for Stream Manager Instance

* Go to the [VPC networks](https://console.cloud.google.com/networking/networks/list) page in the Google Cloud Console.

* Click the **Create VPC network** button.

* Enter a name for the network, such as `red5pro-autoscaling`and MTU value as `1460`.

* Under **Subnet creation Mode** &rarr; select **Automatic**.
    
    > ⚠️ Stream Manager 2.0 currently requires **Automatic** subnet mode for proper operation.
    ![VPC Automatic Mode Screenshot](/_images/red5-pro/users-guide/stream-manager-2.0/installation/gcp/GCPautomatic.png)

* At the bottom, Click on **Create** button.

Please record VPC name and Region to your checklist for the `NODE_VPC_NAME`, `NODE_GCP_REGION` parameters, it will be using in API calls to Stream Manager to create node group config.

The new network is now ready to be associated with the Stream Manager instance and the reserved static IP.


## Create Firewalls for GCP

We need to create 2 firewall rules:

1. Firewall rule for Stream Manager instance
2. Firewall rule for Red5 Pro nodes

### Firewall Rule for Stream Manager

Go to **Google Cloud Console** &rarr; **VPC network** &rarr;**Firewall rules**.

1. Click on **Create firewall rule**.
2. Name: `red5pro-autoscaling-sm-sg`
3. Network: Select the VPC you created (e.g., `red5pro-autoscaling`).
4. Set Direction of traffic to **Ingress**.
5. Set Action on match to **Allow**.
6. Under Targets, choose `All instances in the network` or select the specific instance tags if you are using them.
7. Set Source filter to **IP ranges**, and set the Source IP ranges as `0.0.0.0/0` for IPv4 and `::/0` for IPv6 for the desired rules.
8. Add **Protocols and ports** to allow the required traffic:

| Name              | Protocol  | Port Range    | Source IPs | Description   |
| ----------------- | --------- | ------------- | ---------- | ------------- |
| HTTP Rule (IPV4)        | TCP       | 80            | 0.0.0.0/0  | HTTP          |
| HTTPS Rule (IPV4)        | TCP       | 443           | 0.0.0.0/0  | HTTPS         |
| Kafka Rule (IPV4)       | TCP       | 9092          | 0.0.0.0/0  | Kafka         |
| HTTP Rule (IPv6)  | TCP       | 80            | ::/0       | HTTP (IPv6)   |
| HTTPS Rule (IPv6) | TCP       | 443           | ::/0       | HTTPS (IPv6)  |
| Kafka Rule (IPv6) | TCP       | 9092          | ::/0       | Kafka (IPv6)  |

9. Click on **Create**.



---

### Firewall Rule for Red5 Pro Nodes

Go to **Google Cloud Console** &rarr; **VPC network** &rarr; **Firewall rules**.

1. Click on **Create firewall rule**.
2. Name: `red5pro-autoscaling-node-sg`
3. Network: Select the same VPC you created (e.g., `red5pro-autoscaling`).
4. Set Direction of traffic to **Ingress**.
5. Set Action on match to **Allow**.
6. Under Targets, choose `All instances in the network` or select the specific instance tags if you are using them.
7. Set Source filter to **IP ranges**, and set the Source IP ranges as `0.0.0.0/0` for IPv4 and `::/0` for IPv6 for the desired rules.
8. Add **Protocols and ports** to allow the required traffic:

| Name               | Protocol  | Port Range    | Source IPs | Description      |
| ------------------ | --------- | ------------- | ---------- | ---------------- |
| HTTP Rule (Port 5080) | TCP       | 5080          | 0.0.0.0/0  | HTTP (IPV4, Port 5080) |
| HTTP Rule (Port 1935) | TCP       | 1935          | 0.0.0.0/0  | HTTP (IPV4, Port 1935) |
| TURN/STUN/ICE (IPV4)      | UDP       | 40000-65535   | 0.0.0.0/0  | TURN/STUN/ICE    |
| HTTP Rule (Port 5080, IPv6) | TCP   | 5080          | ::/0       | HTTP (IPv6, Port 5080) |
| HTTP Rule (Port 1935, IPv6) | TCP   | 1935          | ::/0       | HTTP (IPv6, Port 1935) |
| TURN/STUN/ICE (IPv6) | UDP       | 40000-65535   | ::/0       | TURN/STUN/ICE (IPv6) |

9. Click on **Create**.


---

### Outbound Rules for Both Stream Manager and Red5 Pro Nodes

In GCP, Firewall rules are typically used for inbound traffic (ingress). Outbound traffic (egress) is allowed by default. However, you can customize outbound rules if necessary.

To allow all outbound traffic:

1. **Outbound Rule for All Traffic**:
   - Name: `red5pro-all-outbound`
   - Network: Select your existing VPC from previous steps.i.e;`red5pro-autoscaling`
   - Direction of traffic: **Egress**
   - Action on match: **Allow**
   - Destination filter: `0.0.0.0/0` for IPv4 and `::/0` for IPv6.
   - Protocols and ports: Select **All traffic**.

2. Click on **Create**.

---

> Please record the **Firewall Rule** name for Red5 Pro nodes in your checklist for the `NODE_SECURITY_GROUP` parameter, as it will be used in API calls to Stream Manager to create node group configurations.





