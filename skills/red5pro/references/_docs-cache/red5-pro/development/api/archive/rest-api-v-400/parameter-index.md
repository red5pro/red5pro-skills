---
title: Parameters Index
description: ""
menu_order: 16
---

| Parameter | Description | Value Type |
|---|---|---|
| streamName | The name of the stream for which the data is being provisioned | Alphabetic string |
| scopeName | The scope name of the stream for which the data is being provisioned | Alphabetic string |
| meta | Top-level object for provisioning data | NA |
| authentication | Global object containing publisher credentials information for the stream | NA |
| username | Username for publisher | Alphanumeric string |
| password | Password for publisher | Alphanumeric string |
| stream | Master object array with a description of stream variants | NA |
| stream=> name | Stream variant name | Alphabetic string |
| stream=> bandwidth | Stream variant bitrate | Numeric value representing bitrate in bytes per second. This property is optional but can be useful if we need to provide bitrate information to a client, that is unable to guess the stream ‘level’. (Optional) |
| stream=> level | Specifies the level for this variant. Higher bitrate streams must have a lower level number. Numbering starts from 1 onwards. This is used for abr switching. For a single stream, the level should be 0. | Numeric positive integer |
| stream=> properties | Additional stream properties holder object for a variant stream. You can override the Global‘authentication’, ‘georule’and‘qos’settings by providing an alternate copy of the appropriate object that you need to override inside the `properties` object. | NA |
| georules | Master object containing geo-restriction information | NA |
| georules => regions | An array of region / location identifiers | Alphanumeric String (supports hyphens) |
| georules => restricted | Indicates whether the location identifiers are inclusive or exclusive | Boolean true/false |
| qos | Network QOS value for the Stream | Qos value should represent the index of the QOS content intended. (See below) |

**QOS Constants Index:**

| QOS Content | Index | Java Value |
|---|---|---|
| IPTOS_LOWCOST | 0 | 0x02 |
| IPTOS_RELIABILITY | 0x04 |
| IPTOS_THROUGHPUT | 0x08 |
| IPTOS_LOWDELAY | 0x10 |

**Additional Notes**

* `meta` is the top-level object for a stream provision. Stream properties such as `authentication`, `georules` or `qos` which exist at this level are treated as `global`. Ie, they are automatically copied over to each stream variant unless an override exists.
* Individual `stream` objects can include additional custom properties. The JSON is not validated for custom property names, thus making it flexible for new properties to be added.
* `bandwidth` property is optional. Streams are validated by the value of their  `level` attribute. The higher quality stream variant should specify a lower value for the `level` attribute. Level values start from 1.
* Stream `properties` is an optional placeholder to help the provisioner to specify any optional data for a variant. It may also contain its own `authentication`, `georules` or `qos` object. This can be used to override the `master authentication`, `georules`, and  `qos` object definitions specified at the top level, directly under the `meta` object.