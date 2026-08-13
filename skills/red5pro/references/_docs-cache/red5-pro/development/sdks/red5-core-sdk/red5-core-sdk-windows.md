---
title: Red5 Core SDK - Windows
description: ""
menu_order: 6
---

The Red5 Pro Windows Streaming SDK provides support for broadcasting a live stream with video on the following platforms:

* x86-64

This document will introduce you to the Red5 Pro Windows Streaming SDK API and instruct you in using the SDK to begin streaming on Windows devices.

You will need the latest Red5 Pro Windows Streaming SDK before you begin.

# How to Build the Windows Examples

> **Note:** substitute your Windows username for `$USER`

## Install preresiquites

* Visual Studio - Visit [https://visualstudio.microsoft.com/vs/community/](https://visualstudio.microsoft.com/vs/community/) to download and install the latest version for Windows.
* CMake - Visit [https://cmake.org/download/](https://cmake.org/download/) to download and install the latest release.

## Make a local directory

```shell
   mkdir c:\\Users\\$USER\\Red5Core
```

## Download & Unzip Red5 Pro Core SDK

[Download](https://account.red5.net/login) the Red5 Pro Core SDK distribution and save to `C:\\Users\\$USER\\Red5Core\\$DISTRIBUTION.zip`.

Unzip the distribution. This will create `C:\\Users\\$USER\\Red5Core\\$DISTRIBUTION\\cmake`, `docs`, and other directories.

## Make a binary directory

```shell
   mkdir c:\\Users\\$USER\\Red5Core\\$DISTRIBUTION\\build
```

## Compile and run examples

Run `cmake-gui` or open the app from the desktop.

**Once in the CMake app**

* Set **Where is the source code** to `C:\\Users\\$USER\\Red5Core\\$DISTRIBUTION\\examples`
* Set **Where to build the binaries** to `C:\\Users\\$USER\\Red5Core\\$DISTRIBUTION\\build`
* Click **Configure**
* Click **Generate**
* Click **Open Project** and select the Visual Studio distribution you installed earlier; this should open the project

**Inside the Visual Studio project**

* Select **Release** from the **Solution Configurations** dropdown
* Right-click inside **Search Solution Explorer** on **ALL_BUILD** and select **Build**
* Right-click inside **Search Solution Explorer** on **INSTALL** and select **Build**
* Execute the [basic example](../examples/red5-core-sdk-basic-example) from `C:\\Users\\$USER\\Red5Core\\$DISTRIBUTION\\build\\r5core_example_basic`
