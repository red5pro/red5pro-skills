---
title: Generate and add SSH Key
menu_order: 5
---

## Generate Your SSH2-RSA Key Pair

The SSH key will be used for connecting to instances as `root` user.

### On Mac/Linux

* Open Terminal
* Type:   `ssh-keygen -t rsa`
* Accept the default path and modify the file name if you wish (`Enter file in which to save the key (~/.ssh/id_dsa`)     
* Enter a passphrase and confirm (make sure this is SECURE, and noted somewhere for future reference)
* Private and public keys will be generated

### On Windows

* Download and run [PuTTYgen](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
* Click on `Generate` button and follow instructions displayed to help PuTTYgen generate your private public key-pair.    
* Once PuTTYgen finishes generating keys it will display the public key and other details in the application window.      
* Enter a passphrase and confirm. (make sure this is SECURE, and noted somewhere for future reference)
* Click `Save public key` and save the key with a filename (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .pub to the file (public key).* Click `Save private key` and save the key with the same filename as the public key (ex: red5pro_node) on your file system in a secure location (or a common standard folder such as ~/.ssh/ under your user profile). Provide an extension of .ppk to the file (private key).


## Add SSH Key in GCP

* From the left-hand navigation menu in the Google Cloud Console, go to Compute Engine.

![newsshkey](/_images/red5-pro/users-guide/stream-manager-2.0/installation/gcp/profile01.png)

* In the **Compute Engine** section,Under Settings &rarr; click on **Metadata**.

* Select the **SSH Keys** tab and click on Edit.

* Click on **Add Item** to add a New Key.

* In the Public key field, Paste the contents of your SSH public key from above Generated Key.

* For the key, you can use a label,For example `gcp-ssh-key` for easier identification.

* Click Save to save the new SSH key.

![newsshkey](/_images/red5-pro/users-guide/stream-manager-2.0/installation/gcp/addkey.png)


