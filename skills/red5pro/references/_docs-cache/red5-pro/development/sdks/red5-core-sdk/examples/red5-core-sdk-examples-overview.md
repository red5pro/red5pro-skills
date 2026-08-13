---
title: Red5 Core SDK Examples - Overview
description: ""
menu_order: 1
---

The Red5 Pro Core SDK can be used to develop native desktop applications for MacOS, Windows, and Linux.

The following documents contain details about the public examples of how to integrate various supported features into your application.
# Building the Examples
## For Linux/MacOS

1. Install dependencies

   ```shell
   sudo apt-get install g++ make cmake unzip
   ```
2. Make local directory

   ```shell
   mkdir ~/Red5Core
   ```
3. [Download](https://account.red5.net/login) the Red5 Pro Core SDK distribution and save to `~/Red5Core`
4. Unzip

   ```shell
   cd ~/Red5Core
   unzip <distribution>.zip
   ```
5. Set the environment variable for CMake

   ```shell
   export CMAKE_PREFIX_PATH=~Red5Core/<distribution>/cmake
   ```
6. Create build files

   ```shell
   cd ~/Red5Core/<distribution>/examples
   cmake .
   ```
7. Build examples

   ```shell
   cd ~/Red5Core/<distribution>/examples
   make
   ```
8. Execute the [basic example](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/)

   ```shell
   cd ~/Red5Core/<distribution>/examples/basic   ./r5sdk_example_basic
   ```
## For Windows
> substitute your username for `<user>`.

1. Install dependencies:
  * *Visual Studio* - Visit [https://visualstudio.microsoft.com/vs/community/](https://visualstudio.microsoft.com/vs/community/) to download and install the latest version for Windows.
  * *cmake* - Visit [https://cmake.org/download/](https://cmake.org/download/) to download and install the latest release
3. Make a local directory

   ```shell
   mkdir c:\Users\<user>\Red5Core
   ```
4. [Download](https://account.red5.net/login) the Red5 Pro Core SDK distribution and save to `C:\\Users\\<user>\\Red5Core\\<distribution>.zip`
5. Unzip the distribution. This will create `C:\\Users\\<user>\\Red5Core\\<distribution>\\cmake`, `docs`, and other directories.
6. Make a binary directory

   ```shell
   mkdir c:\Users\<user>\Red5Core\<distribution>\build
   ```
7. Run `cmake-gui`
8. Set **Where is the source code** to `C:\\Users\\<user>\\Red5Core\\<distribution>\\examples`
9. Set **Where to build the binaries** to `C:\\Users\\<user>\\Red5Core\\<distribution>\\build`
10. Click **Configure**
11. Click **Generate**
12. Click **Open Project** and select the Visual Studio distribution you installed earlier.
13. Inside the Visual Studio project, select **Release** from the **Solution Configurations** dropdown.
14. Right-click inside **Search Solution Explorer** on **ALL_BUILD** and select **Build**
15. Right-click inside **Search Solution Explorer** on **INSTALL** and select **Build**
16. Execute the [basic example](/docs/red5-pro/development/sdks/red5-core-sdk/examples/red5-core-sdk-basic-example/) from `C:\\Users\\<user>\\Red5Core\\<distribution>\\build\\r5core_example_basic`
