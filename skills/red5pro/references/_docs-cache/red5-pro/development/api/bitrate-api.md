---
title: Bitrate API
menu_order: 20
---

The Bitrate API can be used to get the current bitrate per second (bps) and byterate per second (Bps) of a stream. For this to work you need to have the webapps installed and running on your server. This API can be sent to any Red5 Pro server that is carrying the stream, Origin, Relay and Edge, but it will not be able to get the bitrate of a stream that is not being handled by that server, for example an Origin that the stream is not being published to.

## Bitrate API Request

GET `http://<host>:5080/live/bitrate.jsp?path=live&stream=<streamName>`

host = the IP address or domain of the server
streamName = the name of the stream

## Bitrate API Response

The response from the server will include the bitrate (bps) and byterate (Bps) of the stream in the following format:

```json
{
  "bitrate": 123456.0,
  "byterate": 15432.0
}
```
