---
title: Restreamer API - File Restreamer
menu_order: 3
---

## File Restreamer

The restreamer plugin enables creating a pseudo live stream from FLV or MP4 files containing H264 and AAC audio. While MP4 files are supported, FLV files are more efficient. Each MP4 file may create a small pause while opening.

The File stream supports looping, jumping and updating a list of files. You may update the file list dynamically, change the index of the next file to be played, and optionally force a new file index to start immediately.

### Format limitations

The Audio must be uniform for all files regarding number of channels and sample rate.

The video should also be uniform regarding resolution and profile. Variations of framerate are ok and some variation of resolutions may work. For best results, all files should be normalized or recorded with uniform properties. 

Files must be placed in the 'streams' folder of the live(or custom) webapp. 

### Create a file stream

The following POST creates a live stream 'live/stream1' ( context + name )

Example URI would be: 'rtmp://host/live/stream1'   

Post body properties:

guid - unique guid of file stream.

context - Must be top level path of webapp.  'live' or custom. 

name - unique stream name.  

action - create

type - file

files - comma delineated list of files to stream.

loop - Loop list of files or stop stream after last file. (optional).

index - starting index of list. First file index is zero.(optional)

```json
{
    "guid":"live/stream1",
    "context":"live",
    "name":"stream1",
    "level":0,
    "isRestricted":false,

    "restrictions":
    [
    ],

    "parameters":
    {
        "action":"create",
        "type":"file",
        "files":"stream1.flv,stream2.flv,stream3.flv,stream4.flv",
        "loop":true,
        "index":0
    },

"primaries":
    [
    
    ],

"secondaries":
    [
    ]

}
```

### Kill a file stream

Stops an existing file stream.

guid - unique guid of file stream.

action - kill

type - file

```json
{
    "guid":"live/stream1",
    "context":"live",
    "name":"stream1",
    "level":0,
    "isRestricted":false,

    "restrictions":
    [
    ],

    "parameters":
    {
        "action":"kill",
        "type":"file"
    },

"primaries":
    [
    
    ],

"secondaries":
    [
    ]

}
```

### Update a file stream

Optionally updates the list of files or index of the next file to play, and whether to force an immediate change.

guid - unique guid of file stream.

action - update

type - file

files - New list of files, comma delineated. (optional)

loop - update loop status. (optional)

index - update next index to play. (optional)

force - Stop current file and begin next file. (optional)

```json
{
    "guid":"live/stream1",
    "context":"live",
    "name":"stream1",
    "level":0,
    "isRestricted":false,

    "restrictions":
    [
    ],

    "parameters":
    {
        "action":"update",
        "type":"file",
        "files":"newFile.mp4,stream2.flv,stream3.flv,stream4.flv",
        "loop":true,
        "index":0,
        "force":true
    },

"primaries":
    [
    
    ],

"secondaries":
    [
    ]

}
```

## List

List all existing file streamers. Change action to 'list' with type 'file'. All other params are ignored. 

Result properties:

endpoints - Array of file streams.

guid - unique identifier for file stream.

context - Context path of stream.

name - name of live stream.

loop - whether file stream is looping.

index - current index playing.

currentfile - name of current file playing.

nextIndex - Next index of file to be played.

files - Current array of file names. This will not reflect a pending updated file list.



Results:

```json
{
    "message": "Endpoints",
    "endpoints": [
        {
            "guid": "live/stream1",
            "context":"live"
            "name": "stream1",
            "loop": true,
            "index": 0,
            "currentFile": "stream1.flv",
            "nextIndex": 1,
            "files": "[stream1.flv, stream2.flv, stream3.flv, stream4.flv]"
        }
    ]
}
```