---
title: Red5 Cloud Transcoding
menu_order: 7
---

Transcoding in Red5 Cloud requires that you use the Stream Manager to Provision the Transcoding before you start the stream. This is done by sending a request to the Stream Manager to create a Transcoding session. The Stream Manager will then return a session ID that you can use to start the stream with Transcoding. Information on the Stream Manager and the admin username/password combination can be found in the [Red5 Cloud Management Console](/docs/red5-cloud/users-guide/red5-cloud-dev-resources/#StreamManagerandAdminUser).

## Transcoder Deployment

For Transcoding to work, your deployment must have [Transcoding enabled](/docs/red5-cloud/users-guide/red5-cloud-deployments/#AddNewDeployment). Only Startup, Growth, and Enterprise accounts support Transcoding.

## Transcoding Provision

You need a [valid JWT](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-auth-api/#UsageInformation) to make a request to the Stream Manager. This [Provision Request](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-streams-provision-api/#CreateProvisionRequest) is sent as POST to the [Stream Manager](/docs/red5-pro/users-guide/stream-manager-2-0/). The nodeGroup name can be found on the [Deployments Page](docs/red5-cloud/users-guide/red5-cloud-deployments/#DeploymentOverview) in the [Red5 Cloud Management Console](https://cloud.red5.net) and is synonymous with the "Deployment Name" that is displayed.

## Transcoder Request

Once the Transcoder is Provisioned you can request the IP address of a Transcoder by calling the [get server for publish API](/docs/red5-pro/development/api/stream-manager-2.0/stream-manager-2-streams-api/#GetServerforPublish) with the `transcode=true` query string parameter. This will return the IP address of a Transcoder that you can use to start the stream. In the background, it will also choose an appropriate Origin server, and modify the Provision so that the Transcoder will forward the transcoded streams to the chosen Origin. Input this address into your encoder configuration and start your stream. If you are developing with a Red5 SDK, use the appropriate SDK call to start the stream with the Transcoder.

## Stream Name

When streaming to a Transcoder, you should use the first level stream name as the stream name that is input into the encoder. For example, if your stream is named `myStream`, you will want to use `myStream_1` as the stream name in the encoder. The Transcoder will create the other variant streams based on the data in the Provision.
