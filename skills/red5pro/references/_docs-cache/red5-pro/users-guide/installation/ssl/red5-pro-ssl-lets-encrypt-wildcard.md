---
title: Letsencrypt wildcard certificates
description: ""
menu_order: 6
---

As an alternative, you may want to generate a wildcard certificate, which could be used on multiple instances in your domain.

To obtain a CA signed certificate from Let’s Encrypt, substitute the `yourname@example.com` with your email address and `example.com` with the domain name in the command below:

```sh
./certbot-auto certonly --manual --preferred-challenges=dns --email yourname@example.com --server https://acme-v02.api.letsencrypt.org/directory --agree-tos -d *.example.com
```

Certbot will prompt you to allow the requesting system's IP to be logged to record who requested certificate for what domain.

```aconf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

(Y)es/(N)o:
```

Press `y` and accept to continue.

The next prompt will ask you verify your domain ownership by creating a dns record of type `TXT`.

```aconf
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.example.com with the following value:

qChEJ8PrVvhUEouNd3sypGuDYdMa63Dw8jy2cxJyKCs

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

<u>**DNS type TXT record creation**</u>

Navigate to your domain management control panel and create the TXT record. A DNS type `TXT`record is a text record that usually specifies a valid hostname (`record name`) along with a arbitrary text as the `record value`. So in the above case the Record name is: `_acme-challenge.example.com` and the record value is `qChEJ8PrVvhUEouNd3sypGuDYdMa63Dw8jy2cxJyKCs`.

Once you have created the DNS record allow it some time to propagate. **Make a note of the TTL (time to live) value of your entry, as you can't complete the next step until the TXT entry has been propagated.** On an average this is can be very fast or can take upto 15-20 minutes. You can use the [Google gsuite](https://toolbox.googleapps.com/apps/dig) to track when the record becomes available.

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
