_From: Event Scheduling_

## Guide on Group Setup Time Planning

It is important to note that autoscaling startup times vary based on platform type and instance type. For example, instances on AWS usually take between 70 to 90 seconds whereas Azure VMs can take up to 140 seconds for startup. Startup time includes VM initialization and Red5 Pro service startup. Use this to estimate the total time needed for all your instances to be ready prior to scheduling. And finally make sure to add a buffer time for your cluster spinup.

Scheduling a new nodegroup to be created for a event will require you to initialize your cluster before the actual event time. The function to define the average cluster prepration time can be defined as:

```sh
(TOTAL NODES X AVERAGE STARTUP TIME PER NODE) + SETUP BUFFER TIME
```

So if you require a minimum of 1 origin & 10 edges and your average startup time is assumed to be 120 seconds per node, then you should schedule the event using the Stream Manager Event Scheduler API for, `(11 X 120) + 100 = 1320 seconds (22 minutes)` (where 100 is the additional total buffer time for you setup to account for unexpected delay in operations).

Very similarly when you plan to resize (scale-up) an existing nodegroup, you should know that it will take the autoscaling mechanism a minimum of `(ADDITIONAL NODES TO SCALE-UP X AVERAGE STARTUP TIME PER NODE)` seconds for the group to reach desired capacity.

>**NOTE:** Currently this feature is only available for use with "simple" clusters (containing origin and edge nodes only).
