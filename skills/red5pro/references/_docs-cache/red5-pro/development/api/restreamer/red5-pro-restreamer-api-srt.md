---
title: Restreamer API - SRT
menu_order: 5
---

## Supported parameters

* frameType - The type of encapsulation utilized for the data (audio, video, etc) traversing the network
  * 0 - MPEG-TS
  * 1 - EFP (Elastic Framework Protocol)
* latency - TsbPd receiver delay (mSec) to absorb burst of missed packet retransmission. The time that should elapse since the moment when the packet was sent and the moment when it’s delivered to the receiver application in the receiving function. This time should be a buffer time large enough to cover the time spent for sending, unexpectedly extended RTT time, and the time needed to retransmit the lost UDP packet.
* reorder - Maximum possible packet reorder tolerance (number of packets to receive after loss to send loss report)
* overhead - Recovery bandwidth overhead above input rate. A Maximum bandwidth ceiling based on % over input stream rate.
* keyLength - Cryptographic key length in bytes
  * 0 = PBKEYLEN not set, crypto disabled
  * 16 = AES-128
  * 24 = AES-192
  * 32 = AES-256
* passphrase - Crypto PBKDF2 Passphrase size [0,10..64] (0 = disable); *for 128-bit encryption the passphrase must be at least 16 characters*

Additional information about the parameters:

* [SRT in FFmpeg](https://ffmpeg.org//ffmpeg-protocols.html#srt)
* [Haivision SRT SocketOpts](https://github.com/Haivision/srt/blob/master/docs/API/API-socket-options.md)

#### SRT Stream Create

**Description**

Add SRT stream

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "srt",
        "action": "create",
        "ip": "0.0.0.0",
        "port": 8001,
        "frameType": 0,
        "latency": 100,
        "reorder": 16,
        "overhead": 100,
        "keyLength": 16,
        "passphrase": "samplePassphrase"
    }
}
```

#### SRT Stream Kill

**Description**

Stop the SRT stream

**REQUEST**

* **URI**: `https://{hostname}/live/restream`
* **Method**: POST
* **Parameters**:

```json
{
    "guid": "live/stream1",
    "context": "live",
    "name": "stream1",
    "level": 0,
    "parameters": {
        "type": "srt",
        "action": "kill"
    }
}
```
