---
title: Create SSH2-RSA Keypair
menu_order: 3
---

Amazon EC2 key pairs are region-specific, so you will need to manually create an SSH2-RSA key pair to be used by the stream manager across all regions.

This Keypair will be used for Instance Authorizing Operations Across All Regions

## Generate Your SSH2-RSA Key Pair

### On Mac/Linux

* Open Terminal
* Type:   `ssh-keygen -t rsa`
* Accept the default path and modify the file name if you wish (`Enter file in which to save the key (~/.ssh/id_dsa`)
* Enter a passphrase and confirm (make sure this is SECURE, and noted somewhere for future reference)
* Private and public keys will be generated

### On Windows

* Download and run [PuTTYgen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* Click on the “Generate” button and follow the instructions displayed to help PuTTYgen generate your private-public key pair.
* Once PuTTYgen finishes generating keys it will display the public key and other details in the application window.
* Enter a passphrase and confirm. (make sure this is SECURE, and noted somewhere for future reference)
* Click “Save public key” and save the key with a filename (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .pub to the file (public key).
* Click “Save private key” and save the key with the same filename as the public key (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .ppk to the file (private key).

## Import Public Key to AWS regions in EC2

**Note: you will need to repeat this process in every region you wish to include in your autoscaling solution.**

### To Import your public key

* Navigate to  the [EC2 Dashboard](https://console.aws.amazon.com/ec2/v2/home)
* Copy your public key to a non-hidden directory (you will not be able to find the .ssh directory in the browse to import step)
* In the left-side navigation, under NETWORK & SECURITY click on **Key Pairs**
* Click on the **Import Key Pair** button to open an import window. Browse and select the public key (.pub) you just created.
* Click the **import** button to finish importing the key pair into your current region.
* Add a name for example &rarr; `red5pro-ssh-key`
* Navigate to each other region that you wish to include in autoscaling and repeat steps

![importkey](/_images/red5-pro/users-guide/stream-manager-2.0/installation/aws/importkey.png)
