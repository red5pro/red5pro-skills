---
title: Configure Terraform Server
description: ""
menu_order: 8
---

<u>**Install Red5 Pro Terraform Software on the Instance:**</u>

1. Copy the `terraform-service.zip` file up to the `/usr/local` directory on your server.
2. SSH into the server, then run `apt-get update`.
3. Install Java 11 and NTP (to ensure that the terraform server is in sync with your stream manager(s). Run: `apt-get install -y openjdk-11-jdk unzip ntp` `*`
4. Unzip `terraform-service.zip` in the `/usr/local/` directory (new directory added will be called `red5service`)
5. Delete any **tf** files associated with other platforms (for example `cloud_controller_azure.tf`) file from the `red5service` directory
6. Make `red5terra.sh` and `terraform` executable (`chmod +x red5terra.sh terraform`)
7. Copy `red5proterraform.service` to `/lib/systemd/system/`
8. Modify service properties, `chmod 644 /lib/systemd/system/red5proterraform.service`, then reload the daemon: `systemctl daemon-reload`, and enable the service `systemctl enable red5proterraform.service`

`*`  (*note: for Red5 Pro Server versions* earlier *than 9.0.0, run `apt-get install -y default-jre unzip ntp`*)

## Update application.properties

Modify the following values in the `application.properties` file:

* `server.port` - the port you will be running this service on (default = 8083)
* `api.accessToken` - the passphrase to use for making API calls to this service (to be used in the stream manager configuration)
* `terra.operationTimeoutMilliseconds` - default timeout is set to 3 minutes (180000 milliseconds). Make this value higher if you will be initiating more than 20 nodes concurrently
* `terra.token` - the Digital Ocean API token created above
* `terra.sshkey` - the SSH key created above
* `terra.parallelism` - the default, 10, should work well. If you are creating very large groups, you can set this to 30, but we don't recommend going much higher
* `cloud.do_api_token={}` -- this is the Digital Ocean API token that you created; it is used by Terraform to create and destroy droplets
* `cloud.do_ssh_key_name={}` -- the name of the ssh key that you created an copied up to Digital Ocean; the key will be copied to the droplets so you can ssh to them
* `config.dbHost` -- the DB Endpoint URL of your PostgreSQL server instance
* `config.dbPort` -- the default MySQL port is `3306`
* `config.dbUser` -- Database Master Username
* `config.dbPass` -- Database Master Password
* `config.dbDriver` -- `com.mysql.cj.jdbc.Driver` - indicates MySQL
* `config.dbSSL` -- should be set to `false` for Digital Ocean

The `Settings to maintain application health` should be left to the default settings. These are used in conjunction with the Stream Manager to ensure that the Terraform service is functional.

<u>**sample application.properties file:**</u>

```xml
#Server port configurations
server.port=8083

#Log level
logging.pattern.console=%d{yyyy-MM-dd} | %d{HH:mm:ss.SSS} | %5p | %-40.40logger{40} | %m%n
logging.level.com.red5pro.services.terraform.client.TerraformService=DEBUG


#Terraform Service Rest API token to be used by stream manager to connect to this service
api.accessToken=Kyj9aqLtLi6T

#Terraform configurations
terra.location=/usr/local/red5service

#set to 180000 for small groups; higher for larger groups
terra.operationTimeoutMilliseconds=720000
terra.parallelism=10

#Cloud specific params must start with cloud.
# Azure
#cloud.az_subscription_id={}
#cloud.az_client_id={}
#cloud.az_client_secret={}
#cloud.az_tenant_id={}
#cloud.az_resource_group_name={}
#cloud.az_ssh_user_name={}
#cloud.az_ssh_user_password={}

# DigitalOcean
cloud.do_api_token=912258d5db5d13a8e3xxxxxxxxxxxfdba334d4d13xxxxxxxxx85924d
cloud.do_ssh_key_name=id_autoscale

#DataBase configurations
config.dbHost=qa-db01-do-user-1234567-0.a.db.ondigitalocean.com
config.dbPort=3306
config.dbUser=dbadmin
config.dbPass=ledtdjk9123niud5h
config.dbDriver=com.mysql.cj.jdbc.Driver
config.dbName=cluster
config.dbSSL=false

#Setting to maintaine application health
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

## Test terraform service

Navigate in a browser to `http://{host}:8083/terraform/test?accessToken={api.accessToken}` - the response should be: `Red5Pro Terraform Service is working`