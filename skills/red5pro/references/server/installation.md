# Installation

Source: live docs at [https://www.red5.net/docs/red5-pro/users-guide/installation/](https://www.red5.net/docs/red5-pro/users-guide/installation/)

## Stand-Alone

A single Red5 Pro server instance. Covers:

- Linux install, and running Red5 Pro as a Linux service
- macOS installation
- Windows installation
- License key activation
- Upgrade guides (general upgrade instructions, plus major-version guides such as v13→v15 and minor guides such as v14→v15)

## Static Cluster

For capacity beyond a single node. Unlike a typical stateless web tier, live streams are unicast (UDP/TCP) to a distribution server, so adding capacity means other servers must acquire and repeat the stream in real time rather than simply load-balancing requests. The Clustering Plugin supports:

- **Basic clustering** — multiple endpoints for subscribers to a broadcast stream.
- **Advanced clustering** — multiple endpoints for both publishers and subscribers.

See [clustering.md](clustering.md) for the node-role model. For larger deployments, static clustering gives way to autoscaling — see [../stream-manager/README.md](../stream-manager/README.md).

## Cloud (Terraform)

Red5 Pro clusters can be deployed on cloud platforms (e.g. AWS) using Red5's public Terraform modules, which automate provisioning of a scalable Red5 Pro environment. This is for users who want to run their own Red5 Pro cluster on cloud infrastructure they control — distinct from **Red5 Cloud**, which is Red5's own managed PaaS (see [../cloud/README.md](../cloud/README.md)).

## SSL

A valid SSL certificate and a secure WebSocket port are required for WebRTC publishing; Tomcat must run in secure mode. Documented certificate providers:

- Let's Encrypt (free, automated; certs must be renewed every 90 days) — the primary documented path, for Debian-based Linux (Ubuntu).
- GoDaddy, Sectigo, DigiCert — supported via standard Tomcat keystore/truststore setup.

A separate guide covers configuring SSL on Windows, and another covers using non-standard ports (i.e. something other than `443`/`5080`) with the bundled front end.

## When to Fetch More

Exact shell commands, package names, and file paths for each OS/version combination change between releases — pull the current install guide for the target OS and Red5 Pro version from the live docs at [https://www.red5.net/docs/red5-pro/users-guide/installation/](https://www.red5.net/docs/red5-pro/users-guide/installation/) rather than reconstructing commands from memory.
