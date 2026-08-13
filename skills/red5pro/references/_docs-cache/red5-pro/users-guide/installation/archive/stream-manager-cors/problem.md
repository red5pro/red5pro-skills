---
title: Problem
description: ""
---

When Stream Manager is deployed online and is running on a remote server, the HTTP REST api is inaccessible to javascript running on a different system (for example, `localhost`).  Attempting to access the REST api from localhost results in a CORS (HTTP access control) error in the browser console.

Cross origin access may be required to use the Red5 Pro testbed from localhost, for testing or developing while using the remote Stream Manager instance as a data source.

WebConsole error:

```
Cross-Origin Request Blocked: the Same Origin Policy disallows reading the remote ersource at http://192.168.0.1:5080/streammanager/api/4.0/event/list. (Reason: CORS header 'Access-Control-Origin' missing).
```
