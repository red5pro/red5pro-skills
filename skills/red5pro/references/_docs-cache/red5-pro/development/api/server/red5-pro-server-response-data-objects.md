---
title: Response Data Objects
description: ""
menu_order: 10
---

## ServerInfo

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `red5_pro_version` | String  | Red5 Pro version  |
| `fms_version` | String  |  FMS version string (passed in rtmp handshakes) |
| `capabilities` |  Number |  RTMP server capabilities identifier |
| `uptime` |  Number |  Server uptime |

## ServerStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `red5_pro_version` | String  | Red5 Pro version  |
| `fms_version` | String  |  FMS version string (passed in rtmp handshakes) |
| `capabilities` |  Number |  RTMP server capabilities identifier |
| `uptime` |  Number |  Server uptime |
| `os_name` | String  |  Server operating system name |
| `os_version` | String  |  Server operating system version identifier |
| `processors` | Number  | Total processor cores  |
| `architecture` | String  | CPU architecture  |
| `total_memory` | Number  | Total memory (in bytes) on server as reported by JVM  |
| `max_memory` | Number  | Maximum memory (in bytes) on server as reported by JVM  |
| `free_memory` | Number  |   Free memory (in bytes) on server as reported by JVM |
| `num_apps` | Number  | Number of applications on this instance  |
| `active_sub_scopes` | Number  | Total active sub scopes on this instance|
| `total_sub_scopes` | Number  |  Total sub scopes on this instance |
| `max_sub_scopes` | Number  |  Maximum sub scopes on this instance |
| `total_connections` | Number  | Total Connections count on this instance |
| `active_connections` | Number  |  Active connection count on this instance |
| `max_connections` | Number  | Maximum connection count on this instance  |
| `bytes_in` | Number  | Bytes received by server instance  |
| `bytes_out` | Number  | Bytes sent by server instance  |
| `messages_in` | Number  |  Messages received by server instance  |
| `messages_out` | Number  | Messages sent by server instance  |
| `data_unit` | String  | Data unit used to evaluate and present data transfer information  |

## Client

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `id | String`  | Server assigned ID of the client |
| `creation_time `| Number  | Client connection creation time |
| `last_ping` | Number  | Round-trip time of last ping command for this connection |
| `remote_address` | String  | Remote IP address the client is connected from |

## ClientStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `id` | String  | Server assigned ID of the client |
| `creation_time` | Number  | Client connection creation time |
| `last_ping` | Number  | Round-trip time of last ping command for this connection |
| `remote_address` | String  | Remote IP address the client is connected from |
| `path` | String | Connection path |
| `bytes_out` | Number | Total number of bytes read from the client |
| `bytes_in` | Number | Total number of bytes written to the client |
| `messages_written` | Number | Total number of messages written to the client. |
| `messages_read` | Number | Total number of messages read from the client |
| `messages_dropped` | Number | Total number of messages that have been dropped |
| `messages_pending` | Number | Total number of messages that are pending to be sent to the client |
| `remote_port` | Number | Remote port the client is connected from |
| `connection_protocol` | String | The protocol type for this connection. eg. rtmp, rtmpt, http |
| `host` | String | Host name / ip that the client used to connect to the application |

## StreamStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `id` | String | Server generated stream id |
| `name` | String | Server assigned stream name |
| `publish_name` | String | The actual published name for this stream |
| `creation_time` | String | Stream creation time |
| `scope_path` | String | The scope path for this stream |
| `is_recording` | Boolean | Whether this stream is currently recording or not |
| `state` | String | Server assigned state of the stream |

## BroadcastStreamStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `id` | String | Server generated stream id |
| `name` | String | Server assigned stream name |
| `publish_name` | String | The actual published name for this stream |
| `creation_time` | String | Stream creation time |
| `scope_path` | String | The scope path for this stream |
| `is_recording` | Boolean | Whether this stream is currently recording or not |
| `state` | String | Server assigned state of the stream |
| `bytes_received` | Number | Bytes received for the stream by server |
| `active_subscribers` | Number | Current active number of subscribers for the stream |
| `total_subscribers` | Number | Total number of subscribers for the stream since creation |
| `max_subscribers` | Number | Maximum number of subscribers for the stream |

## RecordStreamStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `id` | String | Server generated stream id |
| `name` | String | Server assigned stream name |
| `publish_name` | String | The actual published name for this stream |
| `creation_time` | String | Stream creation time |
| `scope_path` | String | The scope path for this stream |
| `is_recording` | Boolean | Whether this stream is currently recording or not |
| `state` | String | Server assigned state of the stream |
| `record_name` | String | File name by which the stream is recording |
| `append` | Boolean | Identifies whether recording is in append mode or overwrite mode |

## OnDemandMedia

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `name` | String |  Media file name |
| `last_modified` | Number | Last modified date (timestamp) of the media file |
| `file_size` | Number | Media file size in bytes |

## SoStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `name` | String |  Shared object name |
| `persistent` | Boolean | Shared object persistency |
| `version` | Number | Shared object version  |
| `active_listeners` | Number | Active listeners subscribed to this shared object  |
| `total_listeners` | Number | Total listeners subscribed to this shared object  |
| `max_listeners` | Number | Maximum listeners subscribed to this shared object  |
| `total_changes` | Number | Total number of attribute changes |
| `total_deletes` | Number | Total number of attribute deletes |
| `total_sends` | Number | Total number of times a message was sent over this shared object |

## ScopeStatistics

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `name` | String  | Scope name |
| `path` | String  | Scope path |
| `creation_time` | String | Scope creation time |
| `depth` | Number | Scope depth (for further explanation see scope paths [here](/docs/red5-pro/development/red5-pro-plugin/red5-pro-scopes/#3-scope-paths)) |
| `active_connections` | Number | Active connections on this scope |
| `total_connections` | Number | Total connections on this scope |
| `max_connections` | Number | Maximum connections on this scope |
| `active_subscopes` | Number | Active sub scopes count for this scope |
| `total_subscopes` | Number | Total sub scopes for this scope |
| `max_subscopes` | Number | Maximum sub scopes for this scope |
| `bytes_in` | Number | Total bytes received by this scope |
| `bytes_out` | Number | Total bytes sent by this scope |
| `messages_in` | Number | Total messages sent by this scope |
| `messages_out` | Number | Total messages received by this scope |
| `type` | String  | Scope type |
| `data_unit` | String  | Data unit used to evaluate and present data transfer information |

## LogFile

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `name` | String  | File name |
| `last_modified `| Number  | Last modified time of the file as per operating system |
| `size` | Number  | Size of the file in bytes |

## DownloadableLogFile

|  PROPERTY | TYPE   | DESCRIPTION  |
|---|---|---|
| `name` | String  | File name |
| `last_modified` | Number  | Last modified time of the file as per operating system |
| `size` | Number  | Size of the file in bytes |
| `path` | String  | Accessible system path of the file relative to the root |
| `comment` | String  | An optional comment about the downloadable file |