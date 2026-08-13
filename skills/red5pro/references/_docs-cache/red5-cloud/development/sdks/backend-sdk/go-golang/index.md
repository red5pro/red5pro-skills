---
title: Go SDK
menu_order: 3
---

The Red5 Go Backend SDK allows your backend server to generate secure tokens for:

- Video conferences
- Real-time chat messaging

Use these tokens in your Red5 frontend applications to authenticate users without exposing your master credentials.

## Installation

> **Package Status:** The SDK package is not published yet. In the meantime, please reach out to our support team to obtain the package.

```sh
go get github.com/red5pro/red5-bcs-go
```

## Client Setup

Import the package and create a new client using your master credentials.

```go
package main

import (
    "fmt"
    "log"
    "github.com/red5pro/red5-bcs-go"
)

func main() {
    masterKey := "YOUR_MASTER_KEY"
    masterSecret := "YOUR_MASTER_SECRET"

    client, err := red5bcs.NewRed5Client(masterKey, masterSecret)
    if err != nil {
        log.Fatal(err)
    }
}
```

## Conference Tokens

Generate a token for joining a video conference room.

**Function:**

```
GetConferenceToken(userId, roomId, role string, expirationMinutes int) (string, error)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | Unique user ID |
| `roomId` | `string` | Conference room ID |
| `role` | `string` | `admin`, `publisher`, or `subscriber` |
| `expirationMinutes` | `int` | Token validity duration in minutes |

**Example:**

```go
conferenceToken, err := client.GetConferenceToken(
    "someUser",
    "someRoom",
    "publisher",
    60,
)

fmt.Println(conferenceToken)
```

## Roles

| Role | Permissions |
|---|---|
| `admin` | Full access and conference management |
| `publisher` | Can publish audio/video streams |
| `subscriber` | View-only permissions |

## Chat Tokens

Generate a token for secure chat messaging.

**Function:**

```
GetChatToken(userId, channelId string, read, write bool, ttlMinutes int) (string, error)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | Unique user identity |
| `channelId` | `string` | Chat room ID |
| `read` | `bool` | Grant message read permission |
| `write` | `bool` | Grant message send permission |
| `ttlMinutes` | `int` | Token validity duration in minutes |

**Example:**

```go
chatToken, err := client.GetChatToken(
    "user123",
    "channel-global",
    true,
    true,
    30,
)

fmt.Println(chatToken)
```

## Full Application Example

```go
package main

import (
    "fmt"
    "log"
    "github.com/red5pro/red5-bcs-go"
)

func main() {
    masterKey := "MASTER_KEY"
    masterSecret := "MASTER_SECRET"

    client, err := red5bcs.NewRed5Client(masterKey, masterSecret)
    if err != nil {
        log.Fatal(err)
    }

    // Admin conference token (2 hours)
    adminToken, err := client.GetConferenceToken(
        "userA",
        "room1",
        "admin",
        120,
    )
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(adminToken)

    // Chat token (read/write, 1 hour)
    chatToken, err := client.GetChatToken(
        "userA",
        "channel1",
        true,
        true,
        60,
    )
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(chatToken)
}
```
