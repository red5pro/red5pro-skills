---
title: Lets Encrypt
description: ""
menu_order: 3
---


_If not using Let’s Encrypt, this section may be skipped._

## Installing Lets Encrypt via Snap

New Lets Encrypt Dependency - [snap](https://snapcraft.io/docs/installing-snapd)

### Ubuntu

Ubuntu distributions should include `snapd`. This is used to install certbot.

```sh
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### CentOS

If you are running Red5 Pro on Centos, you will need to install EPEL and snapd per the following

* For CentOS 7 - `sudo yum install epel-release`
* For CentOS 8 - `sudo dnf install epel-release` then `sudo dnf upgrade`

And then install and enable snapd

```sh
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
```

You will then need to restart or log out and back into your system to ensure the paths are updated

Then use snap to install `certbot`:

```sh
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

__If Red5 Pro is running at this point, shut it down.__

## Get The Certificate

To obtain a CA signed certificate from Let’s Encrypt, substitute the `yourname@example.com` with your email address and `ssl.example.com` with the fully qualified domain name for your Red5 Pro server in the command below (_multiple hostnames may be supplied with additional “-d” options_):

```sh
sudo certbot certonly --standalone --email yourname@example.com --agree-tos -d ssl.example.com
```

**Note:** Let's Encrypt uses ports `80` and `443` to validate that the registered domain name is associated with the IP address of the server from which you are running this command, so make sure that inbound access for those ports is enabled when you make this call.

If the process completes successfully, you will see a message similar to this:

```aconf
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/ssl.example.com/fullchain.pem. Your cert will
   expire on 2018-03-20. To obtain a new version of the certificate in
   the future, simply run Let's Encrypt again.
 - If you like Let's Encrypt, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

__Please note that these particular certificates expire after 90 days and must be renewed.__

> To renew, run the `certbot certonly...` command. You will also need to create a new Keystore and Trustore after you renew the certificate.

If the hostname is improperly configured in DNS or some other issue occurs, you may see this message:

```aconf
Failed authorization procedure. ssl.example.com (tls-sni-01): urn:acme:error:connection :: The server could not connect to the client to verify the domain :: Server failure at resolver

IMPORTANT NOTES:
 - If you lose your account credentials, you can recover through
   e-mails sent to yourname@example.com.
 - The following 'urn:acme:error:connection' errors were reported by
   the server:

   Domains: ssl.example.com
   Error: The server could not connect to the client to verify the
   domain
 - Your account credentials have been saved in your Let's Encrypt
   configuration directory at /etc/letsencrypt. You should make a
   secure backup of this folder now. This configuration directory will
   also contain certificates and private keys obtained by Let's
   Encrypt so making regular backups of this folder is ideal.
```
