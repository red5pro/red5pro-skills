---
title: Generate and Add an SSH key
description: ""
menu_order: 4
---

The SSH key will be used for connecting to the droplets as `root`.

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

## Add SSH Key

* From the right hand of the console, click on your profile.

![newsshkey](/_images/installation/server/linode/profile01.png)

* Now select SSH Keys from the list.
* Click on add SSH key.
* Add a label name for example – red5pro-autoscaling-ssh
* Copy the public key and paste the contents of the key in the SSH Public Key field.
* Click on Add key.

![newsshkey](/_images/installation/server/linode/addkey.png)

