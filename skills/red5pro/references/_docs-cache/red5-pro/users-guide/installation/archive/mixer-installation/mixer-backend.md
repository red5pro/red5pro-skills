---
title: Deploying the Mock Mixer Backend
description: ""
menu_order: 2
---

The [Node.js-based WebSocket server](https://github.com/red5pro/nodejs-mixer-backend) provides the communication between the Red5 Pro Mixer testbeds, used to create compositions, and the [HTML5 sample pages](https://github.com/red5pro/streaming-html5/tree/master/src/page/sample-mixer-pages) used for defining the layout of the composite streams when loaded into Red5 Pro Mixer nodes. This allows for creating dynamic compositions or video conferences where a Manager or Host can add or remove live streams in real-time. In addition, the Node.js server can act as the endpoint for [round-trip authentication](/docs/special/round-trip-auth/overview/), if used.

> NOTE: The [mixer back end](https://github.com/red5pro/nodejs-mixer-backend) referenced in this document is intended as a mock/placeholder and must be replaced by your own back-end WebSocket server.

# Deploying The Node.js Backend Server

The Node.js Backend For Mixer Testbeds must be deployed on a dedicated instance.  

Update the instance and install prerequisites:

```sh
$ sudo apt-get update
$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
$ sudo bash nodesource_setup.sh
$ sudo apt-get install -y nodejs
$ sudo apt-get install build-essential
$ sudo npm install forever -g
```

Clone the [mixer back end](https://github.com/red5pro/nodejs-mixer-backend):

```sh
git clone https://github.com/red5pro/nodejs-mixer-backend
```

Change directories into `nodejs-mixer-backend`, and install the node dependencies as follows:

```sh
npm install
```

## Generate an SSL certificate for the server to use.

### Using Let's Encrypt

The following can be run to install Let's Encrypt Certbot on Ubuntu (`snap` is included with most Ubuntu distributions by default)

1.	sudo snap install core; sudo snap refresh core
2.	sudo snap install --classic certbot
3.	sudo ln -s /snap/bin/certbot /usr/bin/certbot

To generate the cert, run `sudo certbot certonly --standalone --email <your-email> --agree-tos -d <server-fqdn>`  (for example: `sudo certbot certonly --standalone --email myname@my-email.com --agree-tos -d test01.red5pro.com`)

You will then need to copy the fullchain and privatekey to the cert directory of your application

```sh
sudo cp /etc/letsencrypt/live/<server-fqdn>/fullchain.pem ~/<nodejs-server>/cert/certificate.crt
sudo cp /etc/letsencrypt/live/<server-fqdn>/privkey.pem ~/<nodejs-server>/cert/privateKey.key
sudo chmod +r ~/<nodejs-server>/cert/*
```

Your index.js file then needs to be modified with the full path to the `certificate` and `privateKey` files (replace with the appropriate paths):

```js
if (useSSL) {
  cert = fs.readFileSync('/home/ubuntu/serverapp/cert/certificate.crt')
  key = fs.readFileSync('/home/ubuntu/serverapp/cert/privateKey.key')
  port = 443
```

# Launch Command

Start the Node.js server with the following command:

```sh
sudo PORT=443 SM_TOKEN=<SM-API_token> SM_HOST=https://<Hostname-of-Stream-Manager> CERT=<path-to-fullchain.pem> KEY=<path-to-private-key.pem> forever start index.js 
```

> By default, if `PORT` is not specified, the WebSocket server will run on `localhost:8001`.