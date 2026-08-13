---
title: Red5 Core SDK - MacOS
description: ""
menu_order: 5
---

The Red5 Pro MacOS Streaming SDK provides support for broadcasting a live stream with video on the following platforms:

* MacOSX Intel
* MacOSX M-Series


This document will introduce you to the Red5 Pro MacOS Streaming SDK API and instruct you in using the SDK to begin streaming on macOS devices.

You will need the latest Red5 Pro MacOS Streaming SDK before you begin.




# How to Build the MacOS Examples

## Install prerequisites

* Homebrew
* GCC
* CMake

## Install Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Install GCC

```shell
brew install gcc
```

## Install CMake

You can install CMake from Homebrew or [Download from CMake.org](https://cmake.org/download/)

```shell
brew install cmake
```

## Make a local directory

Create a directory through the Finder or via the Terminal

```shell
mkdir ~/Red5Core
```

## Download & Unzip Red5 Pro Core SDK

[Download](https://account.red5.net/login) the Red5 Pro Core SDK distribution and save to `~/Red5Core`

```shell
cd ~/Red5Core
unzip $DISTRIBUTION.zip
```

## Set the environment variable for CMake

```shell
export CMAKE_PREFIX_PATH=~Red5Core/$DISTRIBUTION/cmake
```

## Create, compile and execute build files

While in the ~/Red5Core/$DISTRIBUTION/examples directory, execute the following commands

#### Create build files

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

