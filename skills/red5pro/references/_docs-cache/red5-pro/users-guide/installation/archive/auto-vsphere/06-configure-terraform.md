---
title: Configure Terraform Service
description: ""
menu_order: 7
---

## Install Red5 Pro Terraform Software on the Instance

* Copy the `terraform-service.zip` file up to the `/usr/local` directory on your server.
* Within that directory, delete all `.tf` files in the `red5service` folder except for `cloud_controller_vsphere_dhcp.tf`
* Make `red5terra.sh` and `terraform` executable (`chmod +x red5terra.sh terraform`)

## Update red5service/application.properties

Modify the following values in the `application.properties` file:

* `server.port` - the port you will be running this service on (default = 8083; make sure that this port is open in your network security group)
* `api.accessToken` - the passphrase to use for making API calls to this service (to be used in the stream manager configuration)
* `terra.operationTimeoutMilliseconds` - recommended to set to 360000 (6 minutes) or higher
* `terra.parallelism` - the default, 10, should work well. If you are creating very large groups, you can set this to 30, but we don't recommend going much higher

* `cloud.vsphere_user` - vSphere user name
* `cloud.vsphere_password` - vSphere user password
* `cloud.vsphere_server` - vSphere (vCenter) server IP address or domain name
* `cloud.vsphere_datacenter` - vSphere datacenter name
* `cloud.vsphere_datastore` - vSphere datastore name
* `cloud.vsphere_resource_pool` - vSphere resource pool
* `cloud.vsphere_network` - vSphere network name
* `cloud.vsphere_domain`  - Domain name, to be used inside of new VMs (nodes)

* `config.dbHost` -- the DB Endpoint URL of your MySQL server instance, for a single SM, Terraform, DB instance this will be `localhost`
* `config.dbPort` -- the default MySQL port is `3306`
* `config.dbUser` -- Database Master Username
* `config.dbPass` -- Database Master Password
* `config.dbDriver` -- `com.mysql.cj.jdbc.Driver` - indicates MySQL
* `config.dbSSL` -- should be set to `false`

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
# cloud.oracle_tenancy_ocid={}
# cloud.oracle_user_ocid={}
# cloud.oracle_fingerprint={}
# cloud.oracle_private_key_path={}
# cloud.oracle_ssh_pub_path={}
# cloud.oracle_compartment_id={}
# cloud.oracle_subnet_name={}
# cloud.oracle_network_security_group={}

# vSphere
# if running on vSphere, be sure to remove the cloud_controller_azure.tf, cloud_controller_do.tf and cloud_controller_linode.tf files
cloud.vsphere_user=Administrator@vsphere.local
cloud.vsphere_password=$3cureP@ssw0rd
cloud.vsphere_server=192.168.1.100
cloud.vsphere_datacenter=dc1
cloud.vsphere_datastore=datastore1
cloud.vsphere_resource_pool=esxi1/Resources
cloud.vsphere_network=Private
cloud.vsphere_domain=sm.autoscaling

#DataBase configurations
config.dbHost=localhost
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

From  `/usr/local/red5service` directory, run: 

`terraform init` 

then 

`red5terra.sh start`

(or, you can use the `START.sh` script that is in the `red5services` directory)

## Test terraform service

Navigate in a browser to `http://{host}:8083/terraform/test?accessToken={api.accessToken}` - the response should be: `Red5Pro Terraform Service is working`