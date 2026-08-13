---
title: Node SDK
menu_order: 1
---

The Red5 Node Backend SDK allows your backend server to generate secure tokens for:

- Video conferences
- Real-time chat messaging

Use these tokens in your Red5 frontend applications to authenticate users without exposing your master credentials.

## Installation

> **Package Status:** The SDK package is not published yet. In the meantime, please reach out to our support team to obtain the package.

```sh
npm install red5-bcs-node
```

## Client Setup

Import the package and create a new client using your master credentials.

```js
import Red5Client from 'red5-bcs-node';

const masterKey = 'YOUR_MASTER_KEY';
const masterSecret = 'YOUR_MASTER_SECRET';

const client = new Red5Client(masterKey, masterSecret);
```

## Conference Tokens

Generate a token for joining a video conference room.

**Function:**

```
getConferenceToken(userId, roomId, role, expirationMinutes)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | Unique user ID |
| `roomId` | `string` | Conference room ID |
| `role` | `string` | `admin`, `publisher`, or `subscriber` |
| `expirationMinutes` | `number` | Token validity duration in minutes |

**Example:**

```js
const conferenceToken = await client.getConferenceToken(
    "someUser",
    "someRoom",
    "publisher",
    60
);

console.log(conferenceToken);
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
getChatToken(userId, channelId, read, write, ttlMinutes)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `userId` | `string` | Unique user identity |
| `channelId` | `string` | Chat room ID |
| `read` | `boolean` | Grant message read permission |
| `write` | `boolean` | Grant message send permission |
| `ttlMinutes` | `number` | Token validity duration in minutes |

**Example:**

```js
const chatToken = await client.getChatToken(
    "user123",
    "channel-global",
    true,
    true,
    30
);

console.log(chatToken);
```

## Full Application Example

```js
import Red5Client from 'red5-bcs-node';

async function main() {
    const masterKey = "MASTER_KEY";
    const masterSecret = "MASTER_SECRET";

    const client = new Red5Client(masterKey, masterSecret);

    // Admin conference token (2 hours)
    const adminToken = await client.getConferenceToken(
        "userA",
        "room1",
        "admin",
        120
    );
    console.log(adminToken);

    // Chat token (read/write, 1 hour)
    const chatToken = await client.getChatToken(
        "userA",
        "channel1",
        true,
        true,
        60
    );
    console.log(chatToken);
}

main();
```
