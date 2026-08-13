---
title: Scale Policy Management
description: ""
menu_order: 3
---


**NOTES ON SCALE POLICIES:**

* The scale policy v3 ensures that if you have nodes across multiple regions, the stream manager will scale up and down to maintain viable nodes in each designated region.
* The policy supports two *optional* attributes per `role` target - `scaleInWaitTime` & `scaleOutWaitTime`. These parameters denote delayed scale-in/scale-out time in milliseconds. The attributes require positive values (>=0). If the attribute is omitted, the value defaults to `0`.

## Contents

- [Create Scale Policy](create-scale-policy.md)
- [Read Scale Policy](read-scale-policy.md)
- [Delete Scale Policy](delete-scale-policy.md)
- [Update Scale Policy](update-scale-policy.md)
- [List Scale Policies](list-scale-policies.md)
- [Clone Scale Policy](clone-scale-policy.md)
