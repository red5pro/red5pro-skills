---
title: Configure Your Own TURN/STUN Server
description: ""
---

**Traversal Using Relays around NAT (TURN)** is a protocol that assists in the traversal of network address translators (NAT) or firewalls for multimedia applications. It may be used with the Transmission Control Protocol (TCP) and User Datagram Protocol (UDP). It is most useful for clients on networks masqueraded by symmetric NAT devices. TURN does not aid in running servers on well-known ports in the private network through a NAT; it supports the connection of a user behind a NAT to only a single peer, as in telephony, for example.

Herein we will cover using [CoTURN](https://github.com/coturn/coturn), a free open-source server that provides an option for those wanting control over their own TURN/STUN server.

Red5 Pro WebRTC uses STUN over UDP as our default implementation.

## Step-by-step Install on an Ubuntu Linux Server

(process based on [this doc](https://gabrieltanner.org/blog/turn-server))

> Recommended running on Ubuntu 18.04 or newer.

1 - Update the apt-get libraries

```sh
sudo apt-get update
```

2 - install coturn

```sh
sudo apt-get install coturn
```

3 - Configure the server

Make a backup of the original configuration file ( `sudo cp /etc/turnserver.conf /etc/turnserver.conf.backup`) then edit the `/etc/turnserver.conf` file. Add or modify the following lines:

* `listening-ip=` set this `0.0.0.0` to listen on all IP-addresses.
* `external-ip=` set this to the public IP of the server
* `realm=` set to your domain (e.g., realm=company.com)
* uncomment `no-loopback-peers` (note: newer versions disable this by default)
* uncomment `listening-port=3478`

If you want logging enabled, then modify the lines (by default logs are sent to `/var/log/turnserver.log`):

```xml
# Enable verbose logging
verbose
```

4 - Start the server

f you want Coturn to autostart whenever you turn on your server, you have to modify the `/etc/default/coturn` file. Find the following line and uncomment it to run Coturn as an automatic system service daemon `TURNSERVER_ENABLED=1` Once you’re done, save and exit the file.

You should now be able to start the coturn service using the following command.

`systemctl start coturn`


Click links for additional details on the [turnserver](https://github.com/coturn/coturn/wiki/turnserver) and its [configuration](https://github.com/coturn/coturn/wiki/CoturnConfig) options.

## Test TURN/STUN

Open a browser to [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) and add the server in the `ICE servers` box, remove the `google` entry and then click `Gather candidates`; if everything is working you'll see output like this:

<pre>
Time    Component    Type    Foundation    Protocol    Address        Port    Priority
0.001 1          host    89435858      udp         10.0.0.5       35948   126 | 32542 | 255
0.037 1            srflx   976374523     udp         71.222.38.190  35948   100 | 32542 | 255
0.101 1            host    1272402466    tcp         10.0.0.5 9   9         0 | 32542 | 255
0.101 Done
</pre>

## Using your TURN/STUN Server with Red5 Pro

No modifications are required in the Red5 Pro server since it has an internal harvester for ICE connectivity. Utilization of your TURN/STUN server will require modification of the html-sdk or your own javascript to include the URI for your TURN/STUN server. The URI will be `stun:<turn server's IP address>:3478`.

If you are using the default, `live`, webapp, you will want to modify the following files in `webapps/live/script/`:

* `r5pro-publisher-failover.js`
* `r5pro-subscriber-failover.js`
* `r5pro-viewer-failover.js`

change the line `var iceServers = window.r5proIce;` to `var iceServers = [{ urls: "stun:yourstunserver.yourdomain.com:3478"  }];` (or `var iceServers = [{ urls: "stun:y<your.ip.address>:3478"  }];`)

If you are using the webrtcexamples, you can set the `stun` server address directly on the index.html page.

For further details about configuring the [html-sdk](/docs/red5-pro/users-guide/protocols/webrtc/) see the *Configure & Publish* section at the link.

> Note: the `conf/network.properties` has a `stun.address=` entry, but this is only used to verify the IP address of the server itself and does not affect the client validation process

## Troubleshooting

If you want to try testing with a specific TURN/STUN server that is not the default Google, you can find a list of STUN servers here: [STUN + TURN servers list](https://gist.github.com/yetithefoot/7592580). For example, `http://numb.viagenie.ca` allows you to create a free account and use their TURN server.

# Coturn Installer

You can also run the [Red5 Pro Coturn Installer script](https://github.com/red5pro/red5pro-coturn-installer) for a quick coturn server deployment with default settings.
