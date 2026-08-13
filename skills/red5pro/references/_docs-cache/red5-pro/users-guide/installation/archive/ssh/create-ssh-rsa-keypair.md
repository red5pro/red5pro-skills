---
title: How to Create an SSH2-RSA Keypair
description: ""
---

# On Mac/Linux

* Open Terminal
* Type:   `ssh-keygen -t rsa`
* Accept the default path and modify the file name if you wish (`Enter file in which to save the key (~/.ssh/id_dsa`)
* Enter a passphrase and confirm (make sure this is SECURE, and noted somewhere for future reference)
* Private and public keys will be generated

# On Windows

* Download and run [PuTTYgen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* Click on the “Generate” button and follow the instructions displayed to help PuTTYgen generate your private-public key pair.
* Once PuTTYgen finishes generating keys it will display the public key and other details in the application window.
* Enter a passphrase and confirm. (make sure this is SECURE, and noted somewhere for future reference)
* Click “Save public key” and save the key with a filename (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .pub to the file (public key).
* Click “Save private key” and save the key with the same filename as the public key (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .ppk to the file (private key).
