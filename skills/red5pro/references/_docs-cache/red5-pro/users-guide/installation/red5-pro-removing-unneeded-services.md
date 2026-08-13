---
title: Removing Unneeded Services
menu_order: 70
---

When installing Red5 Pro the operating system may have default services that are not needed for Red5 Pro to run. These services can be disabled to improve performance and security. What these services are depends on the operating system you are using.

## Ubuntu/Debian

The following are services can likely be stopped and disabled on Ubuntu or Debian based systems; ensure that there are no special requirements for your systems before doing so:

* unattended-upgrades
* fwupd-refresh.timer
* apt-daily.timer
* apt-daily-upgrade.timer
* snapd.snap-repair.timer
* apport-autoreport.timer
* motd-news.timer
* update-notifier-download.timer
* update-notifier-motd.timer
* ua-timer.timer
* snapd
