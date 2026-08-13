---
title: Brew Mixer Installation
menu_order: 3
---

## Installing the Brew Mixer

Install on a standalone RedPro server using Ubuntu 22.04.

Navigate to the brewmixer directory inside the red5pro/extras/ folder and run the standalone deployment script:

`cd /usr/local/red5pro/extras/brewmixer/`

`sudo node-mixer-standalone-deploy.sh` 

This script installs the Brew Mixer components and also performs some basic configuration steps. When the script has finished, restart your Red5Pro server (e.g., with `sudo systemctl restart red5pro`).

Installation is complete.

## Steps Performed

The install script performed several steps, explained here. If you just wish to try out the mixer, skip ahead to Testing below.

## Plugin Deployed

The plugin JAR is copied to `red5pro/plugins/`, and the native components are unzipped into `red5pro/plugins/nodemixer/`.

## Webapp Deployed

The `red5pro/brewmixer/brewmixer/` folder (an exploded WAR) is copied into `red5pro/webapps/`.

## Standalone Configuration Applied

The script configures the cluster node type to off, disabling the Cluster Plugin. This prevents irrelevant cluster-related errors. Using the off cluster node type rather than auto also prevents certain cluster-only operations from occurring and disables digest security in the BrewMixer API.

## Testing

Navigate to:

`https://<host>/brewmixer/renderTreeController.html`

or, if you do not have SSL configured:

`http://<host>:5080/brewmixer/renderTreeController.html`

