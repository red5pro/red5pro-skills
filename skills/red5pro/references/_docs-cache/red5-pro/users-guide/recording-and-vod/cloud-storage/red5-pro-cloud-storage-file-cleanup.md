---
title: File Cleanup
description: ""
menu_order: 9
---

## Cleanup Cron Job

When using Cloud Storage, the recorded files are also stored locally on the server. It is recommended that you use a cron job to periodically clean up the local files. For example, this cron job would delete recordings that are over 2 days old:

```cron
0 2 * * * /usr/bin/find /tmp/live/streams/ -type f -mtime +2 -exec rm -rf {} \\;
0 2 * * * /usr/bin/find /usr/local/red5pro/webapps/live/streams/ -type f -mtime +2 -exec rm -rf {} \\;
```

## Auto-Delete Recordings

```xml
# Automatically delete recordings upon upload success (true|false)
delete.recordings=false
```

When set to `true` the recordings are automatically deleted from disk upon a successful upload with no delay. In the case of a failure, the recordings are preserved on disk. If the property is not configured or is set to any other value, the recordings are preserved on disk.

**NOTE**: If you are using `append` functionality, then you must set the above to `false`, and should use the above cron job.