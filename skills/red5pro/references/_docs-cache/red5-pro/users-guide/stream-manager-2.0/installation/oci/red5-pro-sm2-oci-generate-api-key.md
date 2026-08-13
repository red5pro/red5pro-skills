---
title: Tenancy OCID, User OCID, and API Key
menu_order: 3
---

![profile](/_images/red5-pro/users-guide/stream-manager-2.0/installation/oci/profile-identity.png)

## Tenancy OCID

To begin, click on the profile image in the top right corner, and choose Tenancy. You will need to copy your tenancy OCID and add it to your checklist for the `TF_VAR_oci_tenancy_ocid` parameter.

## User OCID

* Go back to the pull-down menu from your profile, and choose **My profile**, in the section **User information** you can find **OCID**.
* Copy the **OCID** and record it to your checklist for the `TF_VAR_oci_user_ocid` parameter.

## Generate OCI API Key

* For authorization and programmatic control of resources inside of Oracle cloud you will need an RSA private key in PEM Format.
* From the *Resources* list on the left, select **API keys** 

![resources](/_images/red5-pro/users-guide/stream-manager-2.0/installation/oci/resources.png)

* Click on **Add API key**  
* Choose **Generate API key pair** and then **Download private key** (you must download the key at this stage).
* Now, click on **Add** (at the bottom of the Add API key dialog window).
* Copy the **SSH key fingerprint** and record it to your checklist for the `TF_VAR_oci_fingerprint` parameter.
* *We will copy the private key to the Stream Manager 2.0 server when we configure that.*

> **NOTE:** if you have multiple autoscaling environments (for example, develop and production), then you should create separate API keys for each environment, to ensure that they stay isolated.

The API key generated will look something like `yourname@yourcompany.com_2023-06-26T14_58_56.077Z.pem`. We recommend renaming this to include the environment that it will be used for (example: `oracle_api_key_red5pro_production.pem` or `oracle_api_key_red5pro_develop.pem`)