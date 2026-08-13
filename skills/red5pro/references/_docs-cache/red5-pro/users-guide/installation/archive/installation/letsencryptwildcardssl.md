---
title: Letsencrypt
description: ""
---

# Letsencrypt wildcard certificates for Red5 Pro

When you have a large number of instances that you need to install SSL certificates on, it is virtually unfeasible or less desired to generate a SSL cert for each subdomain separately.This is where `wildcard`certificates save the day.

You can get a request single certificate for the `master` domain (ex: `example.com`) and use it for each `subdomain` created for the parent domain.(ex: `ssltester.example.com`)

Wildcard certificates can be very useful for various Red5 Pro streaming use cases such as:

* When you have a large number of Red5 Pro instances that you wish to use for streaming as a manual cluster.
* When you have a large number of Red5 Pro instances that you wish to use for streaming with Red5 Pro autoscaling via `Simulated Cloud`.

This document covers the use of `wildcard` SSL from [Let’s Encrypt](https://letsencrypt.org/) on a Debian-based operating system (Ubuntu).

Most other ssl certificate providers will provide documentation on how to use their `wildcard` certs to create the necessary keystore and truststore files; look for guides which specify Tomcat or other JEE container servers.

__Let’s Encrypt__ has recently [announced wildcard cert support](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579) as a part of their commitment to popularize SSL adoption over the internet.Please note that Let's Encrypt certificates need to be renewed every 90 days.

---

## Prerequisites

These prerequisites are only for the examples provided below, they are not meant to be the only platform on which Red5 Pro will work using SSL.

* Debian based OS
* Java
* Git client
* Access to the Domain management control panel

__The last item is very important and can prevent certificate creation.You need to prove the domain ownership by creating a DNS `TXT` type record when you try to request a certificate.__

## Examples

In the examples below, the following values are used and should be replaced with your own values to match your installation configuration:

* Fully qualified domain name: `example.com`
* Email address: `yourname@example.com`

The `alias` for your domain certificate, specified below as `tomcat` should remain as-is or you will need to modify the steps and server configuration to recognize your selected alternate alias value.

---

# Let's Encrypt

For this exercise we will be using the latest letsencrypt client - `certbot` which is the most popular letsencrypt client and supports `ACMEV2` protocol, required for wildcard cert request. To know about other `ACMEV2` clients that would support wildcard certificate request check out the [official list](https://letsencrypt.org/docs/client-options/).

## Installing

To create our certificate and chain, we first clone the letsencrypt project repository:

```sh
git clone https://github.com/letsencrypt/letsencrypt
cd letsencrypt
```

To prepare our environment and see the available options, execute the following command:

```sh
./letsencrypt-auto --help
```

System dependencies will be downloaded and installed.It is important to know that the main dependency that will be installed is `python`.

__A wildcard cert request can be made from any machine.It does not necessarily have to be a server where the cert will installed.You can also use a cloud instance for this and terminate it after everything is done.__

---

## Check certbot version

It is necessary to verify your certbot before proceeding to avoid a common pitfall. Older versions of `certbot` are not capable of handling the `wildcard` request.

To check certbot version, execute the following command:

```sh
./certbot-auto --version
```

The response gives you the certbot version. It should be greater than `0.22` for wildcard cert request to work.

---

## Get the Certificate

To obtain a CA signed certificate from Let’s Encrypt, substitute the `yourname@example.com` with your email address and `example.com` with the fully qualified domain name for your Red5 Pro server in the command below (_multiple hostnames may be supplied with additional “-d” options_):

```sh
./certbot-auto certonly --manual --preferred-challenges=dns --email yourname@example.com --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d *.example.com
```

__It is important to note the `*.example.com` for a wildcard request that covers all subdomains of the master domain `example.com`.__

Certbot will now prompt you for allowing the requesting system's IP to be logged to record who requested certificate for what domain.

```aconf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

(Y)es/(N)o:
```

Press `y` and accept to continue.If you do not want your own IP to be logged, we recommend you use a different machine or a cloud virtual machine for requesting the certificate.

The next prompt will ask you verify your domain ownership by creating a dns record of type `TXT` and verify the same.

```aconf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.example.com with the following value:

qChEJ8PrVvhUEouNd3sypGuDYdMa63Dw8jy2cxJyKCs

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

### DNS type `TXT` record creation

A dns type `TXT`record is a text record that usually specifies a valid hostname (`record name`) along with a arbitrary text as the `record value`. So in the above case the Record name is: `_acme-challenge.example.com` and the record value is `qChEJ8PrVvhUEouNd3sypGuDYdMa63Dw8jy2cxJyKCs`.

Navigate to your domain management control panel and create the record as explained above. Different control panel softwares have a different way of creating / managing records. You might need to look at your domain host's guide to creating a `TXT` record successfully.

In another word, you need to create records that respond to the following dig queries.

```sh
dig -t txt _acme-challenge.example.com
```

__A very useful & recommended tool to check for DNS records remotely is the [Google suite toolbox](https://toolbox.googleapps.com/apps/dig/)__

#### Example of creating DNS type `TXT` record

__Creating DNS type `TXT` record using namecheap management interface__

To create a type `TXT` dns at `Namecheap` domain management interface, follow the [official guide](https://www.namecheap.com/support/knowledgebase/article.aspx/317/2237/how-do-i-add-txtspfdkimdmarc-records-for-my-domain) and make sure to enter `_acme-challenge` for the `Host` field. Internally this will automatically imply `_acme-challenge.example.com`. For value specify the challenge hash presented `certbot`.ie:`qChEJ8PrVvhUEouNd3sypGuDYdMa63Dw8jy2cxJyKCs`


__Creating DNS type `TXT` record at cpanel management interface__

To create a type `TXT` dns at `Cpanel` domain management interface, navigate to the [`Advanced DNS zone editor`](https://api.docs.cpanel.net/) and add a `TXT` record. When you enter `_acme-challenge` for valid domain name it will automatically append the parent domain, making it `_acme-challenge.example.com`.

---

Once you have created the DNS record allow it some time to propagate.On an average this is can be very fast or can take upto 15-20 minutes. You can use the [Google gsuite](https://toolbox.googleapps.com/apps/dig) to track when the record becomes available.

After you have confirmed that the `TXT` record is available, you can press `Enter` at the `certbot` prompt to start DNS verification. If the process completes successfully, you will see a message similar to this:

```aconf
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/example.com/fullchain.pem. Your keyfile has been saved at:/etc/letsencrypt/live/example.com/privkey.pem Your cert will
   expire on YYYY-MM-DD. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot-auto
   again.To non-interactively renew 'all' of your certificates, run
   "certbot-auto renew"
- Your account credentials has been saved in your Certbot
   configuration directory at /etc/letsencrypt.You should make a
   secure backup of this folder now.This configuration directory will
   also contain certificates and private keys obtained by Certbot so
   making regular backups of this folder is ideal.
   /etc/letsencrypt/live/example.com/fullchain.pem. Your keyfile has been saved at:/etc/letsencrypt/live/example.com/privkey.pem Your cert will
   expire on YYYY-MM-DD. To obtain a new version of the certificate in
   the future, simply run Let's Encrypt again.
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

__Please note that there no recommended technique or direct command for renewing wildcard certificates automatically, due to the fact that they use `dns` verification (creating `TXT` records).__

If the TXT record is improperly configured or is not found or some other issue occurs, you may see this message:

```aconf
Failed authorization procedure. example.com (dns-01): urn:ietf:params:acme:error:dns :: DNS problem: NXDOMAIN looking up TXT for _acme-challenge.example.com

IMPORTANT NOTES:
 - The following errors were reported by the server:

   Domain: example.com
   Type:   None
   Detail: DNS problem: NXDOMAIN looking up TXT for
   _acme-challenge.example.com

```

---

## Backup your certificate

Once the certificate has been generated you should copy it to a safe place for future use, since this is your wildcard certificate, you will need this whenever you need to install SSL on a subdomain of this domain.

__Create a archive of all the necessary files__:

Before trying to move the files out of the server we need to create an archive that will contain all our ssl files together.

Install `zip` utility on your system using the following command, if you do not already have it.

```sh
sudo apt-get install zip
```

Next create change directory to your `home` and create archive called `example_com_cert.zip` by executing the following command(s):

```sh
cd ~
sudo zip -r ./example_com_cert.zip /etc/letsencrypt/
```

This will create archive of the entire letsencrypt folder (containing all necessary files) and place it in your home directory.

__Download the archive__:

To download the archive you can do one of the following:

* `Using scp`: Use `scp` to download the `archive` file from the remote server to your local machine.
* `Using python`: Since we already have `python` installed on the current system, we can take advantage of it to download a file faster. To download the archive:
  * Navigate to the home directory
  * Start a python http server using : `sudo python -m SimpleHTTPServer 80`. This makes your home directory accessible over the web. Port `80` should be open and not in use for this to work.
  * Once server is running download the archive by visiting the url : `http://<serverip>:80/example_com_cert.zip`.
  * You can kill the server by using `CTRL + C`

> From here on you can move the archive to a cloud bucket or keep it somewhere else for quick and safe access.

---

## Using the wildcard certificate

Whenever you need to setup a SSL certificate for a new Red5 Pro instance for WebRTC in future, you can make use of the wildcard certificate that you backed-up earlier.You no longer have to request SSL certificate for each machine individually.

To use the wildcard certificate created earlier on a new Red5 Pro instance:

* Create a subdomain DNS type `A` record for your master domain (`ie: example.com`) in your domain management interface that points to the `IP address` of the Red5 Pro instance.
* Copy the `archive` (ie: `example_com_cert.zip`) containing `wildcard` cert files to the `home` directory of the instance.
* Switch to the `home` directory and extract the `archive` using the command:

```sh
sudo unzip ./example_com_cert.zip -d ./example_com_cert
```

This will extract the letsencrypt folder in the archive as `example_com_cert/letsencrypt`.

* Move the `letsencrypt` folder from the extracted location to the `/etc` location, by issuing the following command:

```sh
sudo mv letsencrypt /etc
```

The destination should now have the letsencrypt folder as : `/etc/letsencrypt`.

From here onwards you need to [create the keystore](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-create-keystore/), [create the truststore](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-create-truststore/), import the cert and finally [configure Red5Pro to use the cert](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-configure-to-run-with-ssl/).

__You can locate nnecessary SSL files such as `fullchain.pem`, `privkey.pem` using the following path pattern: `/etc/letsencrypt/live/example.com/<file-name>` on the filesystem.__
