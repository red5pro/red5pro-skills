# Red5 Pro Server

Red5 Pro is proprietary software built on top of the open-source [Red5](https://github.com/red5) media server (launched 2005 as an open alternative to Adobe's Flash Media Server/RTMP). Red5 Pro is a standalone server distribution that adds WebRTC support, mobile SDKs, clustering, and the Stream Manager for large-scale, low-latency (sub-500ms) live streaming — deployable on-premise or in the cloud.

## Distributions / Deployment Modes

- **Stand-alone**: a single server instance — origin and edge in one. See [installation.md](installation.md#stand-alone). For quick deployment, Red5 also ships the [Red5 Pro Installer](https://github.com/red5pro/red5pro-installer), a menu-driven script that handles install/license/SSL/service management on Ubuntu.
- **Static cluster**: multiple interconnected server nodes (origins, edges, relays) configured by hand for a fixed capacity. See [installation.md](installation.md#static-cluster) and [clustering.md](clustering.md). **Requires a paid license** — clustering is not supported on Trial or Developer license types.
- **Cloud installation (Terraform)**: Red5 Pro clusters deployed on cloud providers (e.g. AWS) using Red5's public Terraform modules — automates provisioning of a scalable cluster. See [installation.md](installation.md#cloud-terraform).
- **Autoscaling cluster (Stream Manager)**: dynamic scaling of nodes based on load, orchestrated by the Stream Manager. See [../stream-manager/README.md](../stream-manager/README.md).
- **Red5 Cloud**: Red5's own fully managed PaaS that runs Red5 Pro + Stream Manager 2.0 for you. See [../cloud/README.md](../cloud/README.md).

## Requirements

- Java version is server-version-dependent: **Java 21** for server **14.0.0+**, **Java 11** for server 9.0.0–13.x, **Java 8** for versions before 9.0.0. Check the target server version before assuming a Java version.
- A valid SSL certificate for WebRTC publishing on any non-localhost host (Red5 Pro WebRTC runs on the standard HTTPS port 443). See [installation.md](installation.md#ssl).
- **macOS**: no native install — run Red5 Pro via [Docker](https://hub.docker.com/r/red5pro/server) on macOS.
- **Firewall/security-group ports**: `22` (SSH), `5080` (HTTP/WS), `443` (HTTPS/WSS), `1935` (RTMP), `8554` (RTSP), `40000–65535` UDP (TURN/STUN/ICE media).

## Critical Rules

1. **WebRTC requires HTTPS.** Without a valid SSL cert, you can only publish/subscribe locally between browsers on the same machine, or subscribe (not publish) from devices on the same LAN pointed at the machine's IP. Some browsers block insecure WebRTC entirely, even on `localhost`.
2. **A stand-alone server is both an origin and an edge.** Once you move to clustering, those roles split across nodes — see [clustering.md](clustering.md) for the origin/edge/relay/transcoder/mixer node model.
3. **Non-standard ports**: if you need ports other than `443` (HTTPS) and `5080` (HTTP), the port values must be edited in the server config — see the SSL non-standard-ports guidance referenced in [installation.md](installation.md#ssl).
4. **Clustering needs a paid license.** Trial and Developer license types cannot run a cluster (static or autoscaling) — confirm license type before scoping a clustering task.

## When to Fetch More

Detailed OS-specific install steps (Linux/macOS/Windows package commands, service configuration, license-key activation, version upgrade procedures) change per release — check the live docs at [https://www.red5.net/docs/red5-pro/users-guide/installation/](https://www.red5.net/docs/red5-pro/users-guide/installation/) rather than relying on memorized command sequences.
