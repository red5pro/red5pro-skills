---
title: Red5 Cloud Deployments
menu_order: 3
---

## Deployments Overview

Deployments are a fundamental concept in Red5 Cloud, defining how your streaming infrastructure is set up, managed, and scaled. A deployment refers to the arrangement of various Red5 Pro nodes, including Origin, Edge, Relay, Transcoder, and Mixer nodes, which work together to deliver seamless and high-quality streaming experiences. Understanding deployments is crucial for optimizing performance, ensuring reliability, and managing resources effectively.

From the Deployments page you can see information about your deployments, add new deployments, and manage existing deployments.

![Deployments](/_images/red5-cloud/users-guide/deployments-1.png)

**Deployment Page Components:**
1. **Add New Deployment:** Add a new deployment to your account. This deployment could service various regions, be specific for a particular event, serve as a backup deployment, or be isolated for testing purposes and other reasons.
2. **Deployment Name (nodeGroup Name):** The name that was assigned to the deployment when on creation. Also known as the `nodeGroup name` when working with the Stream Manager.
3. **Publishers:** The number of publishers currently connected to the deployment.
4. **Subscribers:** The number of subscribers currently connected to the deployment.
5. **State:** The current state of the deployment. The states are `Starting`, `Active`, or `Stopped`.
6. **Regions:** The regions where the deployment is located.
7. **Start Date Time:** The date and time when the deployment will start if it is scheduled
8. **End Date Time:** The date and time when the deployment will end if it is scheduled
9. **Context Menu:** The context menu allows you to manage the deployment. You can start, stop, edit, delete, or view details about the deployment. NOTE: you cannot delete or edit the Baseline deployment.

### Key components of Deployments

Deployments consist of various interconnected components that work together to deliver high-quality streaming experiences. These components include Origin Nodes for ingesting live streams, Edge Nodes for distributing content to viewers, Relay Nodes for optimizing data routing, Transcoder Nodes for adaptive bitrate streaming, and Mixer Nodes for combining multiple video and audio sources. Each type of node plays a specific role in the deployment, ensuring that your streaming infrastructure operates smoothly and efficiently.

## Add New Deployment

To add a new deployment, use the Add New Deployment button.  From here you configure a new deployment.

![Add New Deployment](/_images/red5-cloud/users-guide/deployments-2.png)

On the Add New Deployment page you can configure the Deployment Name (1). This is useful to help you remember the purpose of the deployment. If you are using [Round Trip Authentication](/docs/development/round-trip-auth/api-calls/), configure the endpoint (2). If using [Webhooks](/docs/special/webhooks/overview/), configure the endpoint (3). To configure the deployment for the default region, select the "Settings" button (4). To add new region to the deployment, click the "+" button (5) and then use the "Settings" button next to the region to configure the specifics for that region.

### Add a Region to a New Deployment

![Add a Region to a New Deployment](/_images/red5-cloud/users-guide/deployments-3.png)

When adding a new region, select the region from the list (1) and then "Confirm" your selection (2).  You can then configure the specifics for that region by clicking the "Settings" button next to the region on the Add New Deployment page.

#### Region Settings for Ingress and Egress Configuration

The size of your deployment is determined by the resolution, bitrate, and fps of the stream and the number of publishers and subscribers in each region. The deployment will scale from the minimum number to the maximum, optimizing the number of instances running based on the current load. The minimum and maximum number of instances can be configured for each region. The minimum number of publishers or subscribers is the number defines the base scale that will always be running in the region. The maximum number of publishers and subscribers is the maximum number that determined the highest level a region will be allowed to scale to. The deployment will scale between these two numbers based on the current load. Settings these numbers too low can result in failed streams. Setting these numbers too high can result in unnecessary costs.

![Deployment Region Ingress and Egress Configuration](/_images/red5-cloud/users-guide/deployments-4.png)

Configure the settings for publishers by selecting the minimum (1) and maximum (2) number of publishers for ingest. Configure the resolution (3), bitrate (4), and FPS (5) of the highest quality stream that will be ingested. Configure the settings for subscribers by selecting the minimum (6) and maximum (7) number of subscribers for egress.

#### Region Settings for Preprocessing and Transcoding Configuration

![Deployment Region Preprocessing and Transcoding Configuration](/_images/red5-cloud/users-guide/deployments-5.png)

If you are using Preprocessing to normalize incoming streams, enable it (1) and configure the average (1) and maximum bitrates (2) (typically you set them the same). Configure the MinQP (4) and MaxQP (5) (typical settings are 12 and 48 respectively).

#### Save Region Settings

![Deployment Region Save Configuration](/_images/red5-cloud/users-guide/deployments-6.png)

When you have completed your Ingress, Egress, Preprocessing, and Transcoding settings, click the "Save Region Configuration" button (1) to save the settings for the region.

## Storage

![Storage](/_images/red5-cloud/users-guide/deployments-storage-1.png)

To configure storage which will receive recordings of published streams, select the "Storage" tab (1).

![Storage Configuration](/_images/red5-cloud/users-guide/deployments-storage-2.png)

Configure the storage settings for the deployment by first selecting the Storage vendor from the dropdown (1). Add the storage Access Key (2) and Secret (3). Configure the Bucket Name (4) and the Region (5) for the storage. Test your configuration by clicking the "Test" button (6). Click "Next" (7)

## Deployment Schedule

![Deployment Schedule](/_images/red5-cloud/users-guide/deployments-schedule-1.png)

To configure the Deployment Schedule. If the deployment should always be available select the "Always On" Switch (5). If the deployment runs on a schedule, enter the Start Date (1), End Date (2), Start Time (3), End Time (4) and Time Zone (6) for the deployment. Complete your work by clicking the "Next" button (7).

## Deployment Review

![Deployment Review](/_images/red5-cloud/users-guide/deployments-review-1.png)

Review the deployment Settings (1). If you need to make changes, click the "Back" button (2). If everything is correct, click the "Deploy" button (3) to start the deployment process which can take up to 15 minutes.

## Deployment Context Menu

![Deployment Context Menu](/_images/red5-cloud/users-guide/deployments-context-1.png)

The Deployments context menu allows you to manage the deployment. You can see the Pub/Sub details (1), Restart Deployment (2), Edit deployment (3) to change settings, and Delete Deployment (4) to remove it from your account. NOTE: you cannot delete or edit the Baseline deployment.

### Restart Deployment

![Restart Deployment](/_images/red5-cloud/users-guide/deployments-context-restart-1.png)

If you restart a deployment from the context menu, you will be required to confirm or reject the action (1).

### Delete Deployment

![Delete Deployment](/_images/red5-cloud/users-guide/deployments-context-delete-1.png)

If you delete a deployment from the context menu, you will be required to confirm or reject the action (1).

### Pub/Sub Details

![Pub/Sub Details](/_images/red5-cloud/users-guide/deployments-context-pubsub-1.png)

The Pub/Sub Details shows information you need to configure external encoders including wht WHIP Publishing Endpoint (1) and the RTMP Publishing Endpoint (2).  To play the video back, a WHEP Endpoint (3) is provided in addition to Embedded Player code (4) you can place on your website to get started streaming quickly.

### Edit Deployment

Editing a deployment takes you back into the deployment where you can change settings as you could when you first created the deployment, being able modify regional settings.
