---
title: Red5pro Installer
menu_order: 85
---

# Red5 Pro Installer Script

The Red5 Pro Installer provides an automated way to install and manage a single Red5 Pro Server instance on Ubuntu. It simplifies the installation process by guiding you through a menu-driven interface for common setup and maintenance tasks.

## Features

The installer supports the following operations:

- Install the latest Red5 Pro release
- Install Red5 Pro from a custom archive URL
- Configure SSL using Let's Encrypt
- Manage Red5 Pro as a system service
- Add or update the Red5 Pro license
- Start, stop, and restart the Red5 Pro service

## Requirements

Before using the installer, ensure your system meets the following requirements:

- Ubuntu 22.04 (for Red5 Pro 12.0 and later)
- Git
- `sudo` privileges

## Quick Start

Clone the installer repository:

```bash
git clone https://github.com/red5pro/red5pro-installer
```

Navigate to the installer directory:

```bash
cd red5pro-installer
```

Make the installer scripts executable:

```bash
sudo chmod +x *.sh
```

Run the installer:

```bash
sudo ./red5proInstaller.sh
```

The installer will launch an interactive menu that guides you through installing and managing your Red5 Pro Server instance.

> For detailed usage instructions, advanced options, and maintenance tasks, refer to the `README.md` in the [red5pro-installer](https://github.com/red5pro/red5pro-installer/tree/master) repository.


Note: The Red5 Pro Installer can also be used to deploy Red5 Pro Server on a Proxmox Virtual Environment.
