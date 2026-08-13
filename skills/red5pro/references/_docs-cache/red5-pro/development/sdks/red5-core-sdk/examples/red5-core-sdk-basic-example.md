---
title: Red5 Core SDK Examples - Basic integration
description: ""
menu_order: 2
---

The Basic Integration example shows how to set up a project with Red5 Pro Core SDK.

Core SDK uses the CMake build system to generate platform-dependent build files. But it provides a set of API headers and libraries that can be integrated using any suitable build system depending on the project. The main part of this example is the `CMakeLists.txt` file that describes instructions for CMake on how to generate project files. 

In most cases it's enough for the setup to include the path of your project with the `include/r5core` and `include/r5common` folders from the SDK package, and to add the dependencies for `r5core` and `r5common` (the full name depends on platform). After that, it's possible to include API header files as `r5core/red5pro.h` and call the SDK methods.