_From: Brew Mixer API_

## Delete Mixers

Stop all sub-mixers for a given event.

### Delete Mixers Request

DELETE `${scheme}://${mixerHost}/brewmixer/1.0/${eventName}`
DELETE `${scheme}://${mixerHost}/brewmixer/2.0/mixers/${eventName}`

No body.

### Delete Mixers Response

**On success:**
HTTP 200: OK

**On error:**
HTTP 404: Not found | The event `eventName` is not found.
