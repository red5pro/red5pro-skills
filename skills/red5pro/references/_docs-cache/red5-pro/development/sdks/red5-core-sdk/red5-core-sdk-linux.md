---
title: Red5 Core SDK - Linux
description: ""
menu_order: 4
---

The Red5 Pro Linux Streaming SDK provides support for broadcasting a live stream with video on the following platforms:

* x86-64 _(e.g., Ubuntu 20.04 x86)_


This document will introduce you to the Red5 Pro Linux Streaming SDK API and instruct you in using the SDK to begin streaming on x86-64.

You will need the latest Red5 Pro Linux Streaming SDK before you begin.

> ARM _(e.g., Raspberry Pi)_ will be supported with the 1.5.0 release


# How to Build the Linux Examples

## Install prerequisites

* CMake
* GCC

You can use `apt-get` for Ubuntu/Debian-based systems; for other Linux distributions, you can use `dnf`. For other options, like shell script installation and binary distributions, see the instructions here [CMake.org](https://cmake.org/download/). Remember that you will still need to install GCC if you use an alternate installation method.

```shell
sudo apt-get install g++ make cmake unzip
```

## Make a local directory

```shell
mkdir ~/Red5Core
```

## Download & Unzip Red5 Pro Core SDK

[Download](https://account.red5.net/login) the Red5 Pro Core SDK distribution and save to `~/Red5Core`

```shell
cd ~/Red5Core
unzip <distribution>.zip
```

## Set the environment variable for CMake

```shell
export CMAKE_PREFIX_PATH=~Red5Core/<distribution>/cmake
```

## Create, compile and execute build files

While in the ~/Red5Core/$DISTRIBUTION/examples directory, execute the following commands

### Create build files

```shell
cmake .
```

### Build examples

```shell
make
```

# Execute the [basic example](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/)

*For each example, see the README for the expected behavior.*

```shell
./r5sdk_example_basic
```
