---
title: Event Scheduling
description: ""
menu_order: 6
---


Use the Event Scheduling API to schedule a scale-up of an existing nodegroup, or create a new nodegroup at a precise time. *Use a tool like [this date-to-millisecond-calculator](https://codechi.com/dev-tools/date-to-millisecond-calculators/#.W0OprNhKjqY) to generate the `date in miliseconds` required.* Note that this is universal timestamp, so it doesn't matter what timezone you use to calculate the event time. The `eventName` value is for your records only, and should be descriptive of the event that you are scheduling (for example, `big-event-saturday-night`).

## Contents

- [GUIDE ON GROUP SETUP TIME PLANNING](guide-on-group-setup-time-planning.md)
- [Create Scheduled Event](create-scheduled-event.md)
- [Get Scheduled Event](get-scheduled-event.md)
- [Get all Scheduled Events](get-all-scheduled-events.md)
- [Update Scheduled Event](update-scheduled-event.md)
- [Update a scheduled nodegroup resize request](update-a-scheduled-nodegroup-resize-request.md)
- [Delete Scheduled Event](delete-scheduled-event.md)
