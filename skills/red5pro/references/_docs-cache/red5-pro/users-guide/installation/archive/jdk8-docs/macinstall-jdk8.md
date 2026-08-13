---
title: Mac Installation - JDK 8
description: ""
menu_order: 2
---

<h4>The following document is to be used for installing Red5 Pro server versions prior to <u>9.0.0</u>. Release 9.0.0 and subsequent releases will require Java version 11 </h4>

[Download the latest Red5 Pro Server!](https://account.red5.net/login)

## Register for a Trial or Pro License

If you have not done so already, register an account at [https://account.red5.net/login](https://account.red5.net/login).

__* The 30 day trial allows for up to 10 concurrent connections, while the Professional license has no connection limit.__

---

## Requirements

The following are required to setup the Red5 Pro Server:

* [Java JDK v1.8](https://java.com/en/download/)
* For Mac OSX,  you may need to install sdl_image. From a terminal window: `brew install sdl_image`.
* [Red5 Pro Server](https://account.red5.net/login)

---

## Installation

The following __Inbound__ ports need to be open on your server/firewall for Red5 Pro features to work:

| Port | Description |
|---|---|
| 22 | SSH |
| 5080 | default web access of Red5 Pro |
| 1935 | default Red5 Pro RTMP port |
| 8554 | default RTSP port |
| 6262 | websockets (for second screen and HLS)  |
| 40000-65535 | TURN/STUN/ICE port range | UDP |

Note that if you are running Red5 Pro on a hosted server, then you will need to install an SSL certificate to publish via WebRTC - however this is not necessary for localhost publishing.

_Please refer to the Operating System's documentation on opening ports. If developing and testing locally, most likely you will not have to expose these ports for remote subcription of streams._

1. Download the Red5 Pro server from [the downloads section](https://account.red5.net/login) of the Red5 Pro Accounts site.
2. Unzip into a location on your local system. For the purposes of this tutorial, we will unzip the Red5 Pro server to: _/Users/red5pro-user/red5pro_ on OSX or _/home/red5pro-user/red5pro_ on Linux.
3. Start the Red5 Pro server:
    * On OSX & Linux: Open Terminal, `cd` into your Red5 Pro install directory and issue this command: `./red5.sh`
    * On Windows: Navigate to the Red5 Pro install directory in a File Browser and double-click on `red5.bat`
4. After the server has started, open a web browser and navigate to `http://localhost:5080`
5. If the server has started successfully, you should see the default landing page for the Red5 Pro server install
    * The landing page can be found at _/webapps/root/index.jsp_ of your Red5 Pro installation. You can modify or remove it as desired. For now, we will use it to navigate around and demonstrate what the Red5 Pro server can do!
6. Note: to stop the server on a local machine, you can either close the terminal window, or open a second terminal window, navigate to the same location and run `./red5-shutdown.sh` (`./red5-shutdown.bat` on Windows)

__Congratulations!__ You have successfully setup and run the Red5 Pro Server. The following sections get you started with testing the Streaming and Second Screen solutions the Red5 Pro Server provides.