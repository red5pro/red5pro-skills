---
title: Configure Terraform Server
description: ""
menu_order: 8
---

## Install Red5 Pro Terraform Software on the Instance

* Copy the `terraform-service.zip` file up to the `/usr/local` directory on your server.
* SSH into the server, then run `apt-get update`.
* Install Java 11 and NTP (to ensure that the terraform server is in sync with your stream manager(s). Run: `apt-get install -y openjdk-11-jdk unzip ntp` `*`
* Unzip `terraform-service.zip` in the `/usr/local/` directory (new directory added will be called `red5service`)
* Delete all `.tf` files in the `red5service` folder
* Copy everything from the folder `cloud_controller_oracle` to red5service (all of the `.tf` files as well as the `modules` directory)

```shell
cd /usr/local/red5service
sudo rm *.tf
sudo cp -r cloud_controller_oracle/* .
```

* Make `red5terra.sh` and `terraform` executable (`chmod +x red5terra.sh terraform`) 
* Copy `red5proterraform.service` to `/lib/systemd/system/`
* Copy your **public** ssh key to folder `/usr/local/red5service/` (generated in [this step](/docs/red5-pro/users-guide/installation/archive/auto-digital-ocean/05-create-sm-and-terraform-instances/))
* Copy your **private** Oracle API key to folder `/usr/local/red5service/` (generated in [this step](/docs/red5-pro/users-guide/installation/archive/auto-oci/02-generate-api-key/#generate-oci-api-key))
* **IMPORTANT**: From the `/usr/local/red5service` directory, change the permissions of your Oracle private API key per SSH requirements (`sudo chmod 400 *.pem`).

## Update red5service/application.properties

Modify the following values in the `application.properties` file:

* `server.port` - the port you will be running this service on (default = 8083; make sure that this port is open in your network security group)
* `api.accessToken` - the passphrase to use for making API calls to this service (to be used in the stream manager configuration)
* `terra.operationTimeoutMilliseconds` - default timeout is set to 5 minutes (320000 milliseconds). Make this value higher if you will be initiating more than 20 nodes concurrently
* `terra.parallelism` - the default, 10, should work well. If you are creating very large groups, you can set this to 30, but we don't recommend going much higher

* `cloud.oracle_tenancy_ocid` -- Tenancy OCID from Orcale cloud. Example: `ocid1.tenancy.oc1..111222333`  
* `cloud.oracle_user_ocid` -- User OCID from Orcale cloud in User profile. Example: `ocid1.user.oc1..111222333`  
* `cloud.oracle_fingerprint` -- SSH key fingerprint from Orcale cloud. Example: `cb:af:a6:81:20:ff:21:47:eb:cc:b6:9a:a3:33:22:11`  
* `cloud.oracle_private_key_path` -- Path to Orcale SSH private key. Example: `/usr/local/red5service/oracle_red5pro_develop_2023-06-26T14_58_56.077Z.pem`  
* `cloud.oracle_compartment_id` -- Compartment OCID from Oracle cloud. This ID will be the same for all regions. Example: `ocid1.compartment.oc1..111222333`  
* `cloud.oracle_subnet_name` -- Subnet name from Oracle cloud. The name should be the same for all regions. Example: `red5pro-sandbox1`  
* `cloud.oracle_ssh_pub_path` -- Path to SSH public key for autoscaling nodes (Origin,Edge,Transcoder,Relay). Example: `/usr/local/red5service/ssh-key-2023-06-26.key.pub`  
* `cloud.oracle_network_security_group` -- Node network security group name. Example: `red5pro-nodes-sg`  

* `config.dbHost` -- the DB Endpoint URL of your MySQL server instance
* `config.dbPort` -- the default MySQL port is `3306`
* `config.dbUser` -- Database Master Username
* `config.dbPass` -- Database Master Password
* `config.dbDriver` -- `com.mysql.cj.jdbc.Driver` - indicates MySQL
* `config.dbSSL` -- should be set to `true` for OCI

The `Settings to maintain application health` should be left to the default settings. These are used in conjunction with the Stream Manager to ensure that the Terraform service is functional.

<u>**sample application.properties file:**</u>

```xml
#Server port configurations
server.port=8083

#Log level
logging.pattern.console=%d{yyyy-MM-dd} | %d{HH:mm:ss.SSS} | %5p | %-40.40logger{40} | %m%n
logging.level.com.red5pro.services.terraform.client.TerraformService=DEBUG


#Terraform Service Rest API token to be used by stream manager to connect to this service
api.accessToken=abc123

#Terraform configurations
terra.location=/usr/local/red5service

#set to 180000 for small groups; higher for larger groups (for Azure and vSphere recommended 320000)
terra.operationTimeoutMilliseconds=320000
terra.parallelism=10

# Cloud-specific params must start with cloud.

# Azure
# if running on Azure, be sure to remove the cloud_controller_do.tf, cloud_controller_linode.tf and cloud_controller_vsphere_dhcp.tf files
# cloud.az_subscription_id={}
# cloud.az_client_id={}
# cloud.az_client_secret={}
# cloud.az_tenant_id={}
# cloud.az_resource_group_name={}
# cloud.az_ssh_user_name={}
# cloud.az_ssh_user_password={}
# cloud.az_resource_prefix_name={}

# DigitalOcean
# if running on Digital Ocean, be sure to remove the cloud_controller_azure.tf, cloud_controller_linode.tf and cloud_controller_vsphere_dhcp.tf files
# cloud.do_api_token={}
# cloud.do_ssh_key_name={}

# Linode
# if running on Linode, be sure to remove the cloud_controller_azure.tf, cloud_controller_do.tf and cloud_controller_vsphere_dhcp.tf files
# cloud.linode_api_token={}
# cloud.linode_ssh_key_name={}
# cloud.linode_tag={}

# Oracle Cloud
# if running on OCI, be sure to remove the cloud_controller_azure.tf, cloud_controller_do.tf, and cloud_controller_vsphere_dhcp.tf
cloud.oracle_tenancy_ocid=ocid1.tenancy.oc1.....jvgpeqo2tqgsq
cloud.oracle_user_ocid=ocid1.user.oc1.....i7fuompa
cloud.oracle_fingerprint=01:ba:24:b5:b1:e9:52:fd:4d:6e:19:46:0a:2b:f5:b3
cloud.oracle_private_key_path=/usr/local/red5service/oracle_red5pro_develop_2023-06-26T14_58_56.077Z.pem
cloud.oracle_ssh_pub_path=/usr/local/red5service/ssh-key-2023-06-26.key.pub
cloud.oracle_compartment_id=ocid1.compartment.oc1.....333iyeiiccuzs6glupq
cloud.oracle_subnet_name=jes-auto-subnet1
cloud.oracle_network_security_group=red5pro-nodes

# vSphere
# if running on vSphere, be sure to remove the cloud_controller_azure.tf, cloud_controller_do.tf and cloud_controller_linode.tf files
# cloud.vsphere_user={}
# cloud.vsphere_password={}
# cloud.vsphere_server={}
# cloud.vsphere_datacenter={}
# cloud.vsphere_datastore={}
# cloud.vsphere_resource_pool={}
# cloud.vsphere_network={}
# cloud.vsphere_domain={}

#DataBase configurations
config.dbHost=10.0.0.1
config.dbPort=3306
config.dbUser=dbadmin
config.dbPass=ABC123&!#
config.dbDriver=com.mysql.cj.jdbc.Driver
config.dbName=cluster
config.dbSSL=false

#Settings to maintain application health
management.endpoints.web.base-path=/admin
management.endpoints.web.exposure.include=health,restart
management.endpoint.health.show-details=always
management.endpoint.restart.enabled=true
management.health.defaults.enabled=false
management.health.ping.enabled=true
management.health.database.enabled=true
```

## Start terraform service

* Reload the daemon: `systemctl daemon-reload`
* Start the service `systemctl start red5proterraform.service`
* Enable run the service on startup `systemctl enable red5proterraform.service`

## Test terraform service

Navigate in a browser to `http://{host}:8083/terraform/test?accessToken={api.accessToken}` - the response should be: `Red5Pro Terraform Service is working`
