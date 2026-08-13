---
title: JEE Container Properties
description: ""
---

The `jee-container.xml` file is also located in the conf directory along with the `red5.properties` file.

1. Comment out the `<!-- Non-secured transports for HTTP and WS -->` section (Tomcat without SSL enabled).
2. Uncomment the `<!-- Secure transports for HTTPS and WSS -->` section.
3. Start or restart Red5 Pro.