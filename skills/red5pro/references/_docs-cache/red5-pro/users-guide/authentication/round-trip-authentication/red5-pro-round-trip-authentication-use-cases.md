---
title: Round-Trip Authentication Use Cases
description: ""
menu_order: 6
---

While there are some best-suited conditions for using the `RoundTripAuthValidator` implementation, it is possible to adapt or extend it to meet almost any kind of security requirement.

The primary difference in usage and extensibility of this validator depends on what type of traffic you expect for the application. You will need to consider, whether your traffic consists of registered users having an account with the business or anonymous users or a mix of both. Owing to its implementation, the `RoundTripAuthValidator` can be flexibly used in `one-to-one`, `one-to-many` & `many-to-many` streaming patterns involving both `registered` and `anonymous` users.

**Perfect Fits**

* When you have users holding an account on your business server.
* When you need to know who is using it. (hence the username/password parameters)
* One - many applications (1 broadcaster => N subscribers), where you need to distinguish between publishers and subscribers.
* Two-way chat where every user is both publisher and subscriber.

**Adaptable Fits**

* When you need anonymous usage of your application (no fixed credentials for users).
* When you have custom authentication parameters to pass along with standard credentials.

## Understanding different types of user access

### Registered Users

Registered users are clients having an account with the business system and hence having a set of standard credentials to validate against. Authenticating registered users works out of the box since the simple auth plugin expects a `minimum of two` parameters - `username` & `password`. For business systems that implement credentials using these parameters, round trip authentication will work out of the box, apart from standard plugin configurations.

### Anonymous Users

Some times a system might not have the ideal `username`, `password` pair for client authentication or might want to use the `username` parameters with a password `alias` or a set of completely `custom parameters` to identify the client session. In the context of this document & consuming services, a client that does not require strict identification using the `username` & `password` parameters is termed as an `anonymous` user.

Anonymous usage is more flexible and desirable than strict account-based access because of its universal acceptance and widespread application possibilities. Systems can support and implement complete or partial anonymous access in different ways.

* Some of these systems will want to support the `username` parameter while substituting the `password` with a custom `hash` that acts as an `alias` for the actual password.
* Some systems may want to support the `username` parameter coupled with other `custom` parameters while skipping the `password` parameter altogether.
* Some systems might want to skip both `username` and `password` and use other `custom` parameters that suit their business requirements better.

### Custom parameter support

If you have a need to support `custom` parameters in the roundtrip authentication mechanism  other than the supported parameters (`username`, `password` & `token`) such as a `hash` or a collection of multiple parameters to identify the user access or session, you can use the `token` parameter to pass in a `complex string` which can contain multiple parameters formatted together.

The roundtrip authentication mechanism is built on top of the simple auth plugin core which requires that the client **must** pass `username` and `password` parameters. If these params are not provided the connection to the server will be rejected. Therefore if you wish to pass custom parameters you will also need to pass in `dummy` values for the `required` parameters.

**WebRTC Parameters Example:**

```javascript

  var baseConfiguration = {
    host: window.targetHost,
    app: 'live',
    iceServers: iceServers,  // will override the rtcConfiguration.iceServers
    bandwidth: desiredBandwidth,
    mediaConstraints: forceQuality,
    connectionParams: {username: "anonymous", password: "anonymous", token: "token=mytoken&param1=value1&param2=value2"}
  };

```

In the above snippet, we pass `username` & `password` parameters with a value of `anonymous`. This ensures that the min required parameters are fulfilled. Then we overload the `token` parameter to carry multiple parameters as a query string. This will ensure that the server accepts out parameters.

On the server side, the `username`, `password` & `token` are extracted in a standard manner. On subsequent `publish` or `subscribe` request the parameters are sent to the configured remote endpoint for authentication. The `/validateCredentials` handler on the remote endpoint logic should then extract the necessary parameters and decode the content of the `token` parameter to unload the additional custom parameters.

> You can create a complex string of parameters for the `token` parameter in any suitable format such as simple query string, stringified JSON, etc. Your validation endpoint should accordingly know how to decode and extract custom parameters from the complex string.

## Usage in different application patterns

### One-to-one Streaming

`One-to-one` pattern-based applications such as **live video chats**, often require both parties to have equal level access to the application. In this pattern, each participant is a publisher as well as a subscriber. Thus is there no need for differentiation by roles.  In such a use case you can either have the users use system with their `username` & `password` credentials or using `username` and a temporary `hash token` as an alias to the password.

* If you have registered users on your system, you can either have them use their existing `username` & `password`  or the `username` with a `password` alias for authentication.

* In case you want to implement a public conference system without binding users to account creation, you can capture the `username` parameter from the user's unique identifier (such as email Id) or generate an identifier for the intended session and then generate a custom value to be used as an `password alias` or an `one time password`. To prevent hotlinking/leeching a custom parameter containing a special signature `hash` can be relayed to the remote validation service.

> It is important to note that, for such patterns, the `RoundTripAuthValidator` will be authenticating the client **twice** per session. First as a publisher (publishing own stream) and then as a subscriber (viewing the other participant's stream).

If you wish to authenticate only **once** then you can use `IConnection->setAttribute` to store track the state of authentication. After the `publish` request has been authenticated, you can skip authenticating again on `subscribe` request.

### Many-to-many Streaming

**Many to many** streaming, commonly seen in conference applications, is a variation of the `one-to-one` pattern and thus will follow the same principles for implementation of security.

### One-to-many Streaming

The `one-to-many` streaming pattern is common in applications like `live auctions`, `sports broadcasts` etc. Here the publisher client requires access authorization while the subscribers may or may not require it.

`One-to-many` streaming usually requires identification & authorization on the publisher side and either complete partial anonymous access on the subscriber side. Identity of the subscriber is not of utter importance.

* **Complete anonymous access**: For complete anonymous access to stream playback, `username` & `password` can be anything and actual subscriber authorization can be skipped at the remote application server. A good example of such systems is a `public video streaming channel`.

Such systems can include a special signature or secure hash to prevent hotlinking/leeching. Signature/secure hash can be generated using basic client info, session expiry information, etc.

* **Session-based access**: Session-based access lies between `anonymous` & `identity-driven` access. In such a system we grant access to users based on their relationship with the system, but without directly involving any credentials. That is to state that only business customers have access to the stream but without having to provide actual credentials (`username` & `password`) as parameters.

For such an access, the `username` & `password` parameters can hold dummy values (to satisfy the `required parameters` constraint) and additional custom parameters can be introduced to represent the user's identity and access permissions indirectly such as a `signed access token`, `token creation time`, `token expiry time` and other relevant information. The remote service should be able to decrypt the access token and validate the access by identifying the user and relevant permissions as necessary.

> NOTE: It is also possible to mix `anonymous` access with `session`-based access to provide free and premium type services depending on the requirements of the system being designed.