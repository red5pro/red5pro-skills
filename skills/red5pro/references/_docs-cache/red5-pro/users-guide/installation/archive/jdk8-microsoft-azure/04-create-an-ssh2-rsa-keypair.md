---
title: 2. Create an SSH2-RSA Keypair
description: Create an SSH2-RSA Keypair for instances
menu_order: 5
---

**This Keypair will be used for Instance Authorizing Operations Across All Regions**

The public key is used to start manual instances, such as for Red5 Pro node image creation and Stream Manager instance setup. The dynamic instances will use a `username` and a `password` for securing the instances.

<u>**Generate Your SSH2-RSA Key Pair:**</u>

<u>**On Mac/Linux:**</u>

* Open Terminal
* Type:   `ssh-keygen -t rsa`
* Accept the default path and modify the file name if you wish (`Enter file in which to save the key (~/.ssh/id_dsa`)
* Enter a passphrase and confirm (make sure this is SECURE, and noted somewhere for future reference)
* Private and public keys will be generated

<u>**On Windows:**</u>

* Download and run [PuTTYgen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* Click on “Generate” button and follow instructions displayed to help PuTTYgen generate your private public key-pair.
* Once PuTTYgen finishes generating keys it will display the public key and other details in the application window.
* Enter a passphrase and confirm. (make sure this is SECURE, and noted somewhere for future reference)
* Click “Save public key” and save the key with a filename (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .pub to the file (public key).
* Click “Save private key” and save the key with the same filename as the public key (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .ppk to the file (private key).
