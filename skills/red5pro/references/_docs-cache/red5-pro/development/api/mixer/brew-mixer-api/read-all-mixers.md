_From: Brew Mixer API_

## Read All Mixers

Read the list of active events.

### Read All Mixers Request

GET `${scheme}://${mixerHost}/brewmixer/1.0/`
GET `${scheme}://${mixerHost}/brewmixer/2.0/mixers/`

No body.

### Read Mixers Response

**On success:**

The response is an array of Strings, one for each current event.

```json
[
    "live/mix1"
]
```

**On error:**  
While an empty list may be returned, there are no expected error conditions.
