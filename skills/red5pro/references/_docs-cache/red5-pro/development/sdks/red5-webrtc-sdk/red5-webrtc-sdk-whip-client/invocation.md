_From: WHIP Client_

## Invocation

To start statistics monitoring, you have a couple of options:

- You can provide a `stats` attribute with the [stats configuration object](#stats-configuration) to the [init configuration](#webrtc-configuration-parameters).
- You can call `monitorStats` on the publisher client with the optional [stats configuration object](#stats-configuration) parameter.

> Additionally, you can stop monitoring by calling `unmonitorStats` on the publisher client.
