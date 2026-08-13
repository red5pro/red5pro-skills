---
title: Create Stream Manager 2.0 Instance
menu_order: 6
---

The Stream Manager 2.0 instance is the cornerstone of Red5 Pro’s architecture, providing a comprehensive solution for managing, orchestrating, and scaling your streaming infrastructure.

Stream Manager 2.0 instance consists of multiple Docker containers (microservices) and runs using Docker Compose.

## Create Stream Manager 2.0 Instance

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* From the left-hand navigation, under INSTANCES, click on Instances, then **Launch Instance**
* Specify name to the instance. Eg: `red5pro-stream-manager-instance`.
* Choose an Amazon Machine Image (AMI) - Select the `Ubuntu Server 22.04 LTS`.
* Choose an Instance Type - Recommended minimum `c5.2xlarge` for price and performance.
* Configure Key Pair - Select the existing key pair created in the previous step.
* Configure Instance Details - Network Settings: choose the VPC created for autoscaling in that region. Ensure that `Auto-assign Public IP` is set to Enable, accept all other defaults.
  * **Important:** Under **IAM instance profile**, select the IAM instance profile created in the previous step (e.g., `stream-manager-terraform-profile`). This allows the Stream Manager instance to run Terraform operations without static AWS credentials.
* Click on Next: Add storage - Increase from the default 8G to 16G or more.
* Configure Security Group - Select an existing node security group. Eg: `red5pro-autoscaling-sm-sg`
* Click **Launch Instance**

> **Note:** If you didn't attach the IAM instance profile during instance creation, you can attach it later by stopping the instance, modifying the IAM role attribute, and starting the instance again. See [Create IAM Role and Instance Profile for Stream Manager](red5-pro-sm2-aws-create-iam-role-instance-profile/) for instructions.

## Create new DNS record for Stream Manager 2.0 Instance

The default configuration requires creating a DNS record and using an SSL certificate on the Stream Manager 2.0 to allow clients to publish and subscribe to WebRTC streams using a browser.

1. Find the public IP address of your Stream Manager 2.0 instance.
2. Create an A record in your DNS provider to point the DNS name to the public IP address.

```bash
red5pro-sm2.example.com - 1.2.3.4
```

> If you choose not to install a domain name and SSL certificate, you will not be able to publish WebRTC streams. However, you will still be able to publish RTMP and RTSP streams and subscribe to WebRTC, RTMP, and RTSP streams. In this case, you will need to use the docker-compose.yml file that does not include SSL certificate configuration. Example: [autoscaling-without-ssl](https://github.com/red5pro/red5pro-stream-manager-2-examples/tree/main/autoscaling-without-ssl)

## Install Stream Manager 2.0 Instance

1. Connect to your instance over ssh as ubuntu user. Example: `ssh -i ssh_private_key.pem ubuntu@1.2.3.4`

2. Install `docker` with `docker-compose-plugin`, follow the public [documentation](https://docs.docker.com/engine/install/ubuntu/).
3. Create folder for Stream Manager 2.0 files.

```bash
sudo mkdir /usr/local/stream-manager
```

4. Pull Stream Manager 2.0 docker-compose examples from our public repository [red5pro-stream-manager-2-examples](https://github.com/red5pro/red5pro-stream-manager-2-examples).

```bash
git clone https://github.com/red5pro/red5pro-stream-manager-2-examples.git
```

5. Choose one deployment type from examples. Example with SSL ceritificate: `autoscaling-with-ssl`
6. Copy files from folder `autoscaling-with-ssl` to the folder `/usr/local/stream-manager`

```bash
sudo cp -r ./red5pro-stream-manager-2-examples/autoscaling-with-ssl/. /usr/local/stream-manager/
```

7. Go to the Stream Manager folder

```bash
cd /usr/local/stream-manager/
```

8. Create folder for SSL certificate

```bash
sudo mkdir /usr/local/stream-manager/letsencrypt
```

9. Rename docker compose variables file

```bash
sudo mv /usr/local/stream-manager/.example.env /usr/local/stream-manager/.env
```

10. Make the script `update_run.sh` executable

```bash
sudo chmod +x /usr/local/stream-manager/update_run.sh
```

11. Set main Stream Manager 2.0 variables in the file `/usr/local/stream-manager/.env`

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
* `R5AS_CLOUD_PLATFORM_TYPE` - Cloud platform type (OCI,AWS,LINODE). Example: `AWS`
* `KAFKA_HOST` - Kafka server IP address. In this deployment Kafka server on the Stream Manager 2.0 instance so you will need to set Private IP address of this instance. Example: `10.0.0.10`
* `TRAEFIK_HOST` - Stream Manager 2.0 domain name: This should be the same domain name you used to create the DNS record. Example: `red5pro-sm2.example.com`
* `TRAEFIK_SSL_EMAIL` - The email address that will be used for the SSL certificate. Example:`email@example.com`
* `R5P_LICENSE_KEY` - Red5 Pro license key which will be using on the Red5 Pro nodes. It should be active [Red5 Pro license key](https://account.red5.net/overview), Startup Pro level or higher.

12. Set AWS Cloud specific variables in the `/usr/local/stream-manager/.env` file.
```conf
AWS_SSH_KEY_PAIR=<SSH_KEY_PAIR>
AWS_ENABLE_ROOT_VOLUME_BLOCK_ENCRYPTION=<true or false>
```

> You should have these variables from the previous steps.

> **Note:** Stream Manager 2.0 uses IAM role-based authentication via instance profiles. No static AWS access keys or secret keys are required. Ensure the IAM instance profile is attached to the Stream Manager EC2 instance (see the "Configure Instance Details" step in the "Create Stream Manager 2.0 Instance" section above, or follow the instructions in [Create IAM Role and Instance Profile for Stream Manager](red5-pro-sm2-aws-create-iam-role-instance-profile/) to attach it later).

* `AWS_SSH_KEY_PAIR` - SSH key name. It will be using for SSH connect to Red5 Pro nodes. Follow the [docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html) to create SSH key pair in AWS.
* `AWS_ENABLE_ROOT_VOLUME_BLOCK_ENCRYPTION` - Enable or disable root block volume encryption for node instance. Defaults to true.

---
Example `.env` file configuration for AWS

```conf
R5AS_AUTH_SECRET=12345abcd
R5AS_AUTH_USER=admin
R5AS_AUTH_PASS=password
R5AS_PROXY_USER=proxy_user
R5AS_PROXY_PASS=proxy_password
R5AS_CLOUD_PLATFORM_TYPE=AWS
KAFKA_HOST=10.0.0.1
TRAEFIK_HOST=red5pro-sm2.example.com
TRAEFIK_SSL_EMAIL=email@example.com
R5P_LICENSE_KEY=1111-2222-3333-4444
AWS_SSH_KEY_PAIR=example-ssh-key-name
AWS_ENABLE_ROOT_VOLUME_BLOCK_ENCRYPTION=true
```

> **Note:** No `AWS_ACCESS_KEY` or `AWS_SECRET_KEY` variables are required. The Stream Manager instance uses IAM role-based authentication via the instance profile attached to the EC2 instance.

---

13. Start/Stop Stream Manager 2.0 - docker compose

* `sudo docker compose up -d` - Start the Docker Compose services defined in the docker-compose.yml file in detached mode.
* `sudo docker compose up` - Start the Docker Compose services defined in the docker-compose.yml file.
* `sudo docker compose logs -f` - Follow the logs of all running services in real-time.
* `sudo docker compose down` - Stop and remove all the services defined in the `docker-compose.yml` file.

> To run Docker Compose commands, you should be in the directory containing the docker-compose.yml file. In this case, it is the /usr/local/stream-manager directory.

14. Create service to allow for ease of startup/shutdown of Stream Manager 2.0, in addition to automatically starting the service on server reboot, you will want to add a systemd unit file for Stream Manager 2.0.

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

15. Verify Stream Manager 2.0

To verify that the Stream Manager 2.0 is running correctly, open your web browser and navigate to the following URL: `https://<STREAM_MANAGER_DOMAIN_NAME>`. If you are using the Stream Manager 2.0 without an SSL certificate and domain name, use `http://<STREAM_MANAGER_IP_ADDRESS>` instead.

You should see the Stream Manager 2.0 interface if everything is set up correctly.
