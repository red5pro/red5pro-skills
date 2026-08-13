---
title: Mixer APIs
description: ""
--- 



---

# Mixer Composition API

The Stream Manager creates a provision object using the data included in the [create-composition](#create-composition) API request. When a provision is posted, the mixer starts its composition and publishes the *composite* stream. When provisioning the composition, the Stream Manager appends `&type=cef&cef-id=<sm-generated-id>` to the end of the `mixingPage` URL. In this way, the page can process the `cef-id` URL parameter to determine on what mixer instance it was loaded. This is useful for remotely controlling the compositions in multiple mixer nodes. A mixer composition can use any HTTP/S page as the `mixingPage` URL.

> Note 2: The existing implementation does not support creating new mixer instances on the fly. Therefore, if a composition requires *n* mixers, then there must be a node group with at least *n* mixers that are `inservice` before making the create composition call. If there are fewer mixers than requested, unpredictable behavior may be observed. 

## Contents

- [Create Composition](create-composition.md)
- [List Compositions](list-compositions.md)
- [Read Composition](read-composition.md)
- [Delete Composition](delete-composition.md)
- [Create Conference](create-conference.md)
- [List Conferences](list-conferences.md)
- [Read Conference Provision](read-conference-provision.md)
- [Join Conference](join-conference.md)
- [Delete Conference Provision](delete-conference-provision.md)
