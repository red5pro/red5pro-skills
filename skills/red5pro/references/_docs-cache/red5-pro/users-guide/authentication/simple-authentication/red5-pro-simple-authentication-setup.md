---
title: Plugin Configuration
description: ""
menu_order: 3
---

The simple-authentication plugin configuration is handled in the `RED5_HOME/conf/simple-auth-plugin.properties` file. The default settings for this file are as follows:

```properties
# Simple-auth Plugin Properties
#

# Default state of server wide security
simpleauth.default.active=false

# Default data source filename [ Default authentication validator is file based ]
simpleauth.default.defaultAuthValidatorDataSource=simple-auth-plugin.credentials

# Default state of rtmp security offered by the plugin
simpleauth.default.rtmp=true

# Default state of rtsp security offered by the plugin
simpleauth.default.rtsp=true

# Default state of rtc security offered by the plugin
simpleauth.default.rtc=true

# Global state of rtmp security allowing authentication via query parameters
simpleauth.default.rtmp.queryparams=true

# Allowed rtmp agents
simpleauth.default.rtmp.agents=*
```

## Plugin Configuration Properties

| Property  |  Type  | Description  | Default value  |
|---|---|---|---|
| simpleauth.default.active  | Boolean  | Defines whether the plugin applies security to all applications by default or not.  | false  |
| simpleauth.default.defaultAuthValidatorDataSource  | String  | Defines the name of the default properties file (in RED5-HOME/conf) used for authentication  |  simple-auth-plugin.credentials |
| simpleauth.default.rtmp  | Boolean  | Defines the state of RTMP security when security is applies to all applications by default  | true  |
| simpleauth.default.rtsp  | Boolean  | Defines the state of RTSP security when security is applies to all applications by default  | true  |
| simpleauth.default.rtc  | Boolean  | Defines the state of RTC security when security is applies to all applications by default  | true  |
| simpleauth.default.rtmp.queryparams  | Boolean  | Defines whether RTMP authentication parameters can be provided in the query string or not  |  true |
 simpleauth.default.rtmp.agents  | String  | Describes the list of RTMP client types (agents) allowed to connect. This value is extracted from the RTMP client's handshake. By default, all client types are allowed. It can be used to block certain types of RTMP clients from connecting. The list can be a semicolon-separated list of agent strings or * | *  |

### Note on RTMP Agents

The RTMP agent string is obtained by Red5 Pro during the handshake with the RTMP client. Each specific type of RTMP client provides an agent string to identify its type. This parameter is popularly addressed as the __flashVer__ string. There are various types of RTMP clients such as flash player for Windows / Mac / Linux, Adobe Flash Media Live Encoder (FMLE), Wirecast encoder, etc. Each client type can be identified by the value provided in the __flashVer__ string. For more information see __[Real-Time Messaging Protocol](https://en.wikipedia.org/wiki/Real-Time_Messaging_Protocol#Connect)__

The auth module is designed to look for the client's __flashVer__ in the list of permissible agent strings specified. * defines that all agent types are allowed. The check does not look for an exact match, but rather whether the __flashVer__ is contained in any one of the agent strings.

