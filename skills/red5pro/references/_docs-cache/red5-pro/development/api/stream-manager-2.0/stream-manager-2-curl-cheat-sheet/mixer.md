_From: Stream Manager 2.0 Curl Cheat Sheet_

## `mixer/`

### Create Mixer Event

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X POST --data @mixer-request.json https://nate376-sm2.red5pro.net/as/v1/streams/mixer/nate1
```

where `mixer-request.json` contains:

```
{
	"eventId": "event1",
	"streamGuid": "live/mix1",
	"width": 1920,
	"height": 1080,
	"frameRate": 30,
	"bitRate": 4000000,
	"maxBitRate": 7000000,
	"qpMin": 28,
	"qpMax": 48,
	"audioSampleRate": 48000,
	"audioChannels": 2,
	"subMixes": 1
}
```

### Get All Mixer Events

```
curl -s -H "Authorization: Bearer ${JWT}" https://nate376-sm2.red5pro.net/as/v1/streams/mixer/nate1
```

### Get RenderTrees for Mixer Event

```
curl -s -H "Authorization: Bearer ${JWT}" https://nate376-sm2.red5pro.net/as/v1/streams/mixer/nate1/event1
```


### Update RenderTrees

```
curl -s -H "Content-Type: application/json" -H "Authorization: Bearer ${JWT}" -X PUT --data @rendertrees.json https://nate376-sm2.red5pro.net/as/v1/streams/mixer/nate1/event1
```

where `rendertrees.json` contains:

```
[
    {
        "rootVideoNode": {
            "red": 0,
            "green": 0,
            "blue": 1,
            "alpha": 1,
            "node": "SolidColorNode"
        },
        "rootAudioNode": {
            "nodes": [
                {
                    "streamGuid": "live/stream1",
                    "pan": 0,
                    "gain": 0,
                    "node": "AudioSourceNode"
                }
            ],
            "node": "SumNode"
        }
    }
]
```


### Delete Mixer Event

```
curl -s -H "Authorization: Bearer ${JWT}" -X DELETE https://nate376-sm2.red5pro.net/as/v1/streams/mixer/nate1/event1
```
### Mixer Image REST API Curl Examples
