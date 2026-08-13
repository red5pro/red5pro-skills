---
title: Character limits and Naming Recommendations
description: ""
menu_order: 5
---

# Character Limits for Red5 Pro Autoscaling Variables

Because Red5 Pro autoscaling is database-driven, there are some character limits for the various components.

> note: Stream Manager uses **UTF-8** encoding 

## Main limitations in API usage are determined by TomCat (jee-container.xml)

`maxPostSize` - The maximum size in bytes of the POST which will be handled by the container FORM URL parameter parsing. The limit can be disabled by setting this attribute to a value less than or equal to 0. If not specified, this attribute is set to 2097152 (2 megabytes).

`maxHttpHeaderSize` - The maximum size of the request and response HTTP header, specified in bytes. If not specified, this attribute is set to 4096 (4 KB).

## Secondary limitations are caused by DataBase fields' max allowed size

* `ids` - limited to __bigint(20)__ which guaratees max of __20__ digits
* `namings` - limited to __varchar(255)__ which guaratees max of __254__ characters
* `timestamp` - limited to __bigint(20)__ which guaratees max of __20__ digits; all timestamps stored in milliseconds
* `counts` - all current statistic counts limited to __bigint(11)__ which guaratees max of __11__ digits
* `total_counts` - all collective statistics counts limited to __bigint(20)__ which guaratee max of __20__ digits
* `memory` - fields used to evaluate states of the instances. Limited to __bigint(20)__ which guaratees max of __20__ digits 
* `property` - fields used to store __json__ text limited to __text__ which guaratee max of __65535__ characters

## In summary

* URLs length is limited per TomCat settings.
* All path variables limited to __254__ character length
* Requests body field: `text` - __254__ character length, `digits` - __20__ digits number

# Scale Policy and Launch Configuration Recommendations

To more easily manage your autoscale environment, it is recommended to name your disk image, scale policies, and launch configurations in a manner that makes them easily identifiable and deployable.

## Disk Image

The following information makes it easier to identify an image configured for Red5 Pro Autoscaling:

* Red5 Pro Build Version
* Date of creation
* Instance type
* Autoscaling environment (necessary if you have multiple environments, such as development, QA and production)

> If you have different images created for different node types (e.g., transcoder, origin, relay, edge), then include that detail as well.

For example: `DEV-transcoder-8.0.0.b520-c5large-17june`

## Launch configurations

Similarly to the Disk Image, including details about the contents of a policy make it easier to identify. Recommendations:

* Node types defined (important for matching launch configurations with scale policies. (Recommended to use **o**rigin, **e**dge, **r**elay, **t**ranscoder, or **m**ixer to identify in policy)
* Red5 Pro Build version
* Date of creation
* Instance type defined

For example: `oe-8.0.0.b520-c-4-15june` or `oet-8.0.0.b520-c5large-16july`

## Scale policies

We recommend that scale policies simply relect the minimum number of each node type defined in said policy (Recommended to use **o**rigin, **e**dge, **r**elay, **t**ranscoder to identify in the policy). If you have different max numbers defined in different policies, then including that as well is useful.

For example: `1o-1e` or `min2o-max20o-min5e-max30e`


