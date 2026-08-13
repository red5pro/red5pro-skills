---
title: Java SDK
menu_order: 2
---

The Red5 Java Backend SDK enables your backend applications to securely generate:

- Conference tokens for joining video rooms
- Chat tokens with granular read/write permissions

These tokens authenticate users to Red5 Cloud without exposing your master credentials.

## Installation

> **Package Status:** The SDK package is not published yet. In the meantime, please reach out to our support team to obtain the package.

### Maven

```xml
<dependency>
    <groupId>net.red5</groupId>
    <artifactId>red5-bcs-java</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle

```gradle
implementation 'net.red5:red5-bcs-java:1.0.0'
```

## Client Setup

Import the SDK and initialize a client using master credentials from the Red5 Cloud panel.

```java
import net.red5.sdk.Red5Client;

public class Example {
    public static void main(String[] args) {
        String masterKey = "MASTER_KEY";
        String masterSecret = "MASTER_SECRET";

        Red5Client client = new Red5Client(masterKey, masterSecret);

        try {
            String token = client.getConferenceToken("user1", "roomA", "admin");
            System.out.println(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
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
| `userId` | `String` | Unique user ID |
| `roomId` | `String` | Conference room ID |
| `role` | `String` | `admin`, `publisher`, or `subscriber` |
| `expirationMinutes` | `int` | Token validity duration in minutes |

**Example:**

```java
String token = client.getConferenceToken(
    "user123",
    "room456",
    "publisher",
    60
);

System.out.println(token);
```

## Roles

| Role | Permissions |
|---|---|
| `admin` | Full access and conference management |
| `publisher` | Can publish audio/video streams |
| `subscriber` | View-only permissions |

## Chat Tokens

Generate a token for secure chat messaging with PubNub permissions.

**Function:**

```
getChatToken(userId, channelId, read, write, ttlMinutes)
```

**Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `userId` | `String` | Unique user identity |
| `channelId` | `String` | Chat room identifier |
| `read` | `boolean` | Grant message read permission |
| `write` | `boolean` | Grant message send permission |
| `ttlMinutes` | `int` | Token validity duration in minutes |

**Example:**

```java
String chatToken = client.getChatToken(
    "user123",
    "global-chat",
    true,
    true,
    30
);

System.out.println(chatToken);
```

## Full Application Example

```java
import net.red5.sdk.Red5Client;

public class Main {
    public static void main(String[] args) {
        String masterKey = "MASTER_KEY";
        String masterSecret = "MASTER_SECRET";

        Red5Client client = new Red5Client(masterKey, masterSecret);

        try {
            // Admin conference token (2 hours)
            String adminToken = client.getConferenceToken(
                "adminUser",
                "room1",
                "admin",
                120
            );
            System.out.println(adminToken);

            // Chat token (read/write, 1 hour)
            String chatToken = client.getChatToken(
                "user1",
                "channel1",
                true,
                true,
                60
            );
            System.out.println(chatToken);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
