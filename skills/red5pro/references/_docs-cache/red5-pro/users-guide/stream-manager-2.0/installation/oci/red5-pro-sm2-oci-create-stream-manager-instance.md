---
title: Create Stream Manager 2.0 instance
menu_order: 6
---

The Stream Manager 2.0 instance is the cornerstone of Red5 Pro’s architecture, providing a comprehensive solution for managing, orchestrating, and scaling your streaming infrastructure.

Stream Manager 2.0 instance consists of multiple Docker containers (microservices) and runs using Docker Compose.

## Create Stream Manager 2.0 instance

Go to Compute &rarr; Instances

* Push button `Create instance`
* Name: `red5pro-autoscaling-sm-instance` (This is just an example name; you can choose any name that suits your needs.)
* Create in compartment: `<choose the correct Compartment>`
* Availability domain: `<choose any>`
* Image and shape &rarr; Image: `Canonical Ubuntu 22.04`
* Image and shape &rarr; Shape: `VM.Standard.E4.Flex`
* Image and shape &rarr; Shape &rarr; Number of OCPUs: `2` (The minimum required OCPUs is 2, but you can allocate more if needed.)
* Image and shape &rarr; Shape &rarr; Amount of memory (GB): `16` (The minimum required memory is 16GB, but you can allocate more if needed.)
* Primary VNIC information &rarr; Primary network: `Select existing virtual cloud network`
* Primary VNIC information &rarr; Primary network &rarr; VCN: `<choose VCN which you created in previous steps>`
* Primary VNIC information &rarr; Primary network &rarr; Subnet: `<choose Subnet which you created in previous steps>`
* Add SSH keys: `Upload public key files (.pub)` (You should have the public key file from the previous step when you created the Red5 Pro node image.)
* Hide advanced options &rarr; Use network security groups to control traffic &rarr; Network security group: `<choose Security group for Stream Manager which you created in previous steps>`
* Push button `Create`

## Create new DNS record for Stream Manager 2.0 instance

The default configuration requires creating a DNS record and using an SSL certificate on the Stream Manager 2.0 to allow clients to publish and subscribe to WebRTC streams using a browser.

1. Find the public IP address of your Stream Manager 2.0 instance.
2. Create an A record in your DNS provider to point the DNS name to the public IP address.

```bash
red5pro-sm2.example.com - 1.2.3.4
```

> If you choose not to install a domain name and SSL certificate, you will not be able to publish WebRTC streams. However, you will still be able to publish RTMP and RTSP streams and subscribe to WebRTC, RTMP, and RTSP streams. In this case, you will need to use the docker-compose.yml file that does not include SSL certificate configuration. Example: [autoscaling-without-ssl](https://github.com/red5pro/red5pro-stream-manager-2-examples/tree/main/autoscaling-without-ssl)

## Install Stream Manager 2.0 instance

1. Connect to your instance over ssh as the ubuntu account. Example: `ssh -i ssh_private_key.pem ubuntu@1.2.3.4`
2. Disable default firewall on Ubuntu instance (Ubuntu images in OCI have installed iptables by default and block all inbound traffic exept 22 port)

```bash
sudo iptables -F
sudo netfilter-persistent save
```

3. Install `docker` with `docker-compose-plugin`, follow the public [documentation](https://docs.docker.com/engine/install/ubuntu/).
4. Create folder for Stream Manager 2.0 files.

```bash
sudo mkdir /usr/local/stream-manager
```

5. Pull Stream Manager 2.0 docker-compose examples from our public repository [red5pro-stream-manager-2-examples](https://github.com/red5pro/red5pro-stream-manager-2-examples).

```bash
git clone https://github.com/red5pro/red5pro-stream-manager-2-examples.git
```

6. Choose one deployment type from examples. Example with SSL ceritificate: `autoscaling-with-ssl`
7. Copy files from folder `autoscaling-with-ssl` to the folder `/usr/local/stream-manager`

```bash
sudo cp -r ./red5pro-stream-manager-2-examples/autoscaling-with-ssl/. /usr/local/stream-manager/
```

8. Go to the Stream Manager folder

```bash
cd /usr/local/stream-manager/
```

9. Create folder for SSH keys

```bash
sudo mkdir /usr/local/stream-manager/keys
```

Put Oracle API private key and SSH public keys to the the folder `/usr/local/stream-manager/keys`
> These keys will be mounted to the as-terraform service defined in the docker-compose.yml file.
> So you can use the same names and paths or you will need to change names and paths in the docker-compose.yml file.

Example from docker-compose.yml file:

```yaml
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./keys/oracle_private_api_key.pem:/home/ubuntu/.ssh/oracle_private_api_key.pem
      - ./keys/red5pro_ssh_public_key.pub:/home/ubuntu/.ssh/red5pro_ssh_public_key.pub
```

* `/usr/local/stream-manager/keys/oracle_private_api_key.pem` - Oracle API private key file. That will be used to create new node instances in OCI. You should have it from previos steps. Follow the [docs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#two) to generate new API SSH key if you do not have it.
* `/usr/local/stream-manager/keys/red5pro_ssh_public_key.pub` - Public SSH key that will be used to connect to the Red5 Pro nodes. You can generate SSH key pair using `ssh-keygen` in Linux or MacOS command line. Or you can use the same `*.pub` key which you used to deploy Stream Manager 2.0 instance.

10. Create folder for SSL certificate

```bash
sudo mkdir /usr/local/stream-manager/letsencrypt
```

11. Rename docker compose variables file

```bash
sudo mv /usr/local/stream-manager/.example.env /usr/local/stream-manager/.env
```

12. Make the script `update_run.sh` executable

```bash
sudo chmod +x /usr/local/stream-manager/update_run.sh
```

13. Set main Stream Manager 2.0 variables in the file `/usr/local/stream-manager/.env`

```conf
R5AS_AUTH_SECRET=<SECRET_KEY>
R5AS_AUTH_USER=<USER_NAME>
R5AS_AUTH_PASS=<PASSWORD>
R5AS_PROXY_USER=<PROXY_USER>
R5AS_PROXY_PASS=<PROXY_PASSWORD>
R5AS_CLOUD_PLATFORM_TYPE=<PLATFORM_TYPE>
KAFKA_HOST=<PRIVATE_IP>
TRAEFIK_HOST=<DNS_NAME>
TRAEFIK_SSL_EMAIL=<EMAIL>
R5P_LICENSE_KEY=<LICENSE_KEY>
```

* `R5AS_AUTH_SECRET` - Authentication secret used to create and authenticate JWTs. Example: `12345abcd`
* `R5AS_AUTH_USER` - Authentication user name used to get JWT token. Example: `admin`
* `R5AS_AUTH_PASS` - Authentication user password used to get JWT token. Example: `password`
* `R5AS_PROXY_USER` - Authentication user name used for proxy settings. Example: `proxy_user`
* `R5AS_PROXY_PASS` - Authentication user password used for proxy settings. Example: `proxy_password`
* `R5AS_CLOUD_PLATFORM_TYPE` - Cloud platform type (OCI,AWS,LINODE). Example: `OCI`
* `KAFKA_HOST` - Kafka server IP address. In this deployment Kafka server on the Stream Manager 2.0 instance so you will need to set Private IP address of this instance. Example: `10.0.0.10`
* `TRAEFIK_HOST` - Stream Manager 2.0 domain name: This should be the same domain name you used to create the DNS record. Example: `red5pro-sm2.example.com`
* `TRAEFIK_SSL_EMAIL` - The email address that will be used for the SSL certificate. Example:`email@example.com`
* `R5P_LICENSE_KEY` - Red5 Pro license key which will be using on the Red5 Pro nodes. It should be active [Red5 Pro license key](https://account.red5.net/overview), Startup Pro level or higher.

14. Set Oracle Cloud specific variables in the `/usr/local/stream-manager/.env` file.

```conf
OCI_TENANCY_OCID=<TENANCY_OCID>
OCI_USER_OCID=<USER_OCID>
OCI_COMPARTMENT_ID=<COMPARTMENT_ID>
OCI_FINGERPRINT=<FINGERPRINT>
```

> You should have these variables from the previous steps.

* `OCI_TENANCY_OCID` -  Oracle cloud tenancy OCID. Follow the [docs](https://docs.oracle.com/en-us/iaas/Content/Identity/tenancy/managingtenancy.htm) to get tenancy OCID
* `OCI_COMPARTMENT_ID` - Oracle cloud compartment OCID. Follow the [docs](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport_topic-Locating_Oracle_Cloud_Infrastructure_IDs.htm#Finding_the_OCID_of_a_Compartment) to get compartment OCID
* `OCI_USER_OCID` - Oracle cloud user OCID. You can get user OCID details in the Profile &rarr; User information
* `OCI_FINGERPRINT` - Fingerprint of Oracle cloud API ssh key. Follow the [docs](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm#two) to get Fingerprint

---
Example `.env` file configuration for OCI

```conf
R5AS_AUTH_SECRET=12345abcd
R5AS_AUTH_USER=admin
R5AS_AUTH_PASS=password
R5AS_PROXY_USER=proxy_user
R5AS_PROXY_PASS=proxy_password
R5AS_CLOUD_PLATFORM_TYPE=OCI
KAFKA_HOST=10.0.0.1
TRAEFIK_HOST=red5pro-sm2.example.com
TRAEFIK_SSL_EMAIL=email@example.com
R5P_LICENSE_KEY=1111-2222-3333-4444
OCI_TENANCY_OCID=ocid1.tenancy.oc1..aaaaaaaaxxxxxxxxyyyyyyyyyzzzzzzzz
OCI_USER_OCID=ocid1.user.oc1..aaaaaaaaxxxxxxxxyyyyyyyyyzzzzzzzz
OCI_COMPARTMENT_ID=ocid1.compartment.oc1..aaaaaaaaxxxxxxxxyyyyyyyyyzzzzzzzz
OCI_FINGERPRINT=00:11:22:33:44:55:66:77:88:99:aa:bb:cc:dd:ee:ff
```

---

15. Start/Stop Stream Manager 2.0 - docker compose

* `sudo docker compose up -d` - Start the Docker Compose services defined in the docker-compose.yml file in detached mode.
* `sudo docker compose up` - Start the Docker Compose services defined in the docker-compose.yml file.
* `sudo docker compose logs -f` - Follow the logs of all running services in real-time.
* `sudo docker compose down` - Stop and remove all the services defined in the `docker-compose.yml` file.

> To run Docker Compose commands, you should be in the directory containing the docker-compose.yml file. In this case, it is the /usr/local/stream-manager directory.

16. Create service to 

To allow for ease of startup/shutdown of Stream Manager 2.0, in addition to automatically starting the service on server reboot, you will want to add a systemd unit file for Stream Manager 2.0.

* Create a service file:

```bash
sudo nano /lib/systemd/system/sm.service
```

* Add the following content to the service file:

```bash
[Unit]
Description=Stream Manager 2.0
Requires=docker.service
After=docker.service
StartLimitIntervalSec=60

[Service]
WorkingDirectory=/usr/local/stream-manager
ExecStart=/usr/bin/docker compose up
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0
Restart=on-failure
StartLimitBurst=3

[Install]
WantedBy=multi-user.target 
```

* Start the service:

```bash
sudo systemctl start sm.service
```

* Stop the service:

```bash
sudo systemctl stop sm.service
```

* Restart the service:

```bash
sudo systemctl restart sm.service
```

* Enable the service to start on boot:

```bash
sudo systemctl enable sm.service
```

* Check the status of the service:

```bash
sudo systemctl status sm.service
```

17. Verify Stream Manager 2.0

To verify that the Stream Manager 2.0 is running correctly, open your web browser and navigate to the following URL: `https://<STREAM_MANAGER_DOMAIN_NAME>`. If you are using the Stream Manager 2.0 without an SSL certificate and domain name, use `http://<STREAM_MANAGER_IP_ADDRESS>` instead.

You should see the Stream Manager 2.0 interface if everything is set up correctly.
