---
title: Streams
description: ""
---


# Red5 Pro Streams

* [1 About Red5 Pro streams](#1-about-red5-pro-streams)
* [2 Red5 Pro stream action callbacks in application adapter](#2-red5-pro-stream-action-callbacks-in-application-adapter)
* [3 Fetching all the live stream names in an application](#3-fetching-all-the-live-stream-names-in-an-application)
* [4 Access a live stream object in a red5pro scope](#4-access-a-live-stream-object-in-a-red5-pro-scope)
* [5. Record a live stream](#5-record-a-live-stream)
  * [5.1 Start Record](#51-start-record)
  * [5.2 Stop Record](#52-stop-record)
* [6 Stream Statistics](#6-stream-statistics)
* [7 Terminate a stream](#7-terminate-a-stream)
* [8 Securing publish & playback](#8-securing-publish--playback)

## 1. About Red5 Pro streams

Streams are the core objects in Red5 Pro that represent audio/video operations in the context of the media server. Red5 Pro stream objects encapsulate information about client/server streams for live/video-on-demand content.

At its core, every Red5 Pro stream is a `IStream` object.

* A generic broadcaster stream extends from an `IStream` and is represented by a `IBroadcastStream`.

* A generic subscriber stream extends from the `IStream` object and is represented by a `ISubscriberStream`

You can explore the APIs in details by inspecting each `IStream` interface and its implementation individually, starting at the `IStream interface`.

## 2. Red5 Pro stream action callbacks in application adapter

Every Red5 Pro application extends the [MultiThreadedApplicationAdapter](/docs_static/red5/org/red5/server/adapter/MultiThreadedApplicationAdapter.html) and has access to specific callback methods for stream events. We can override these methods in our own application class to handle the callbacks ourselves.

Following is a snippet from a sample application adapter class that extends the MultiThreadedApplicationAdapter:

 ```java
 @Override
public void streamBroadcastClose(IBroadcastStream stream) {
    log.info("Stream broadcast close {}", stream);
}

@Override
public void streamBroadcastStart(IBroadcastStream stream) {
    log.info("Stream broadcast start {}", stream);
}

@Override
public void streamRecordStart(IBroadcastStream stream) {
    log.info("Stream record start {}", stream);
}

@Override
public void streamRecordStop(IBroadcastStream stream) {
    log.info("Stream record stop {}", stream);
}

@Override
public void streamSubscriberStart(ISubscriberStream stream) {
    log.info("Stream subscribe start {}", stream);
}

@Override
public void streamSubscriberClose(ISubscriberStream stream) {
    log.info("Stream subscribe close {}", stream);
}

 ```

`streamBroadcastStart`: Invoked when a broadcast starts

`streamBroadcastClose`: Invoked when a broadcast stops

`streamRecordStart`: Invoked when the recording of a broadcast stream starts

`streamRecordStop`: Invoked when the recording of a broadcast stream stops

`streamSubscriberStart`: Invoked when a subscriber requests a stream

`streamSubscriberClose`: Invoked when a subscriber stops subscribing

> For detailed information on these callbacks and more, check out the [MultiThreadedApplicationAdapter documentation](/docs_static/red5/org/red5/server/adapter/MultiThreadedApplicationAdapter.html) You can access the complete source code of the snippet shown above [on GitHub here](https://github.com/rajdeeprath/red5-development-series/tree/master/code-examples/server-side/red5-stream-examples/stream-callbacks-demo).

## 3. Fetching all the live stream names in an application

Often when developing a live streaming application you may want to fetch the list of active live streams in your application. The [MultiThreadedApplicationAdapter documentation](/docs_static/red5/org/red5/server/adapter/MultiThreadedApplicationAdapter.html) provides a method specifically for this. The snippet below shows how you can use the `getBroadcastStreamNames` method to list out live streams.

```java
public List<String> getLiveStreams(String appname, IScope scope) throws Exception {
    List<String> streams = null;

    try
    {
        MultiThreadedApplicationAdapter adapter = (MultiThreadedApplicationAdapter) application.getHandler();
        Set<String> broadcastStreams = adapter.getBroadcastStreamNames(scope);

        Iterator<String> iter = broadcastStreams.iterator();
        streams = new ArrayList<String>();

        while (iter.hasNext()) {
            String name = iter.next();
            IProStream  stream = (IProStream ) adapter.getBroadcastStream(application, name);
            IConnection conn = stream.getConnection();
            if (conn != null && conn.isConnected())
                streams.add(name);
        }

        return streams;
    }
    catch (Exception e)
    {
        log.error("An unexpected error occurred." + e.getMessage());
        throw e;
    }
}
```

__The important line to notice above is this one:__

```java
Set<String> broadcastStreams = adapter.getBroadcastStreamNames(scope);
```

If you are looking for live streams at the application level then `scope` would be your `APPLICATION` scope or if you are looking for streams in a sub-scope, `scope` should refer to a `ROOM` scope.

> `Exception` will be thrown if the `scope` is not found on the server.
It is recommended that you read through [Red5 Pro scopes](/docs/red5-pro/development/red5-pro-plugin/red5-pro-scopes/) document for more information on scopes.

## 4. Access a live stream object in a Red5 Pro scope

Once you have a list of live stream names, you may want to reference the stream object itself to operate on it using the Red5 Pro API. Similar to the stream list look up, the use of scopes applies here as well. Following is a snippet showing how to fetch a reference to a stream as a broadcast stream.

If you look back at our `getLiveStreams` method earlier, you will see how we resolve a `ClientBroadcastStream` using the stream name. The [MultiThreadedApplicationAdapter documentation](/docs_static/red5/org/red5/server/adapter/MultiThreadedApplicationAdapter.html) provides a method called `getBroadcastStream` to resolve the reference object of a live stream.

__Example:__

```java
IProStream stream = (IProStream) adapter.getBroadcastStream(scope, name);
```

The method requires the stream name and the `scope`,  where to look for the stream. If your stream is at the application level, then `scope` should refer to your `APPLICATION` scope else if your stream exists in a subscope then `scope` should refer to the appropriate `ROOM` scope.

> The `getBroadcastStream` returns a `IBroadcastStream` object, which can be casted to a [`IProStream`](https://github.com/red5pro/red5pro-common/blob/master/src/main/java/com/red5pro/override/IProStream.java). It is recommended that you read through [Red5 Pro scopes](/docs/red5-pro/development/red5-pro-plugin/red5-pro-scopes/) document for more information on scopes.

## 5. Record a live stream

Having reference of the stream object means we can now operate on it. You can take a look at the `IClientBroadcastStream` class to see the various method available to us. The [`IProStream`](https://github.com/red5pro/red5pro-common/blob/master/src/main/java/com/red5pro/override/IProStream.java) interface extends `IClientBroadcastStream` and a few other interfaces from Red5 open source allowing us to use the same methods by name but referencing the Red5 pro implementation of streams at runtime.

> NOTE: The `ClientBroadcastStream` class or `IClientBroadcastStream` (from Red5 open source) should not be used with Red5 pro streams. The `IProStream` interface, which is an extension of Red5 open source interfaces specifically for Red5 pro streams provides access to Red5 pro implementation of the stream methods. To use the `IProStream` interface, make sure to add the [red5pro-commons](https://github.com/red5pro/red5pro-common) dependency to your project.

### 5.1. Start Record

One of the most common operations on broadcast streams is `live recording`, capturing the broadcast stream to a file.  In the previous section, we type-casted the `IBroadcastStream` object to `IProStream`.

To record a live stream we use the `saveas` method through the [IProStream](https://github.com/red5pro/red5pro-common/blob/master/src/main/java/com/red5pro/override/IProStream.java) interface.

Following is a code snippet showing how to record a live broadcast stream to disk when the broadcast starts.

```java
@Override
public void streamBroadcastStart(IBroadcastStream stream)
{
    try
    {
       IProStream bStream = (IProStream ) stream;
       if(!bStream.isRecording()) {
          bStream.saveAs(bStream.getPublishedName(), false);
       }
    }
    catch (Exception e) {
        log.error("Error starting stream recording {} ", e);
    }
}
```

The `streamBroadcastStart` callback method is invoked when the broadcast starts. At this point, the callback receives a reference to the stream as an `IBroadcastStream` object. We then explicitly cast it to an `IProStream` object. Once the object is cast to an `IProStream`,  we get access to a range of stream methods through the `IProStream` interface.

We use the `isRecording()` method to check whether the stream is already recording or not. If not then we start recording the stream using the `saveas` method.

The `saveas` method accepts two parameters, the `filename` to use for recording and a `Boolean` parameters indicating whether the recording is to be `appended` or `overwritten` if the file already exists.

### 5.2 Stop Record

Normally recording automatically terminates when the stream is closed (client closes connection/stream). However, if you wish to stop the recording manually, you can use the `stopRecording` method through the `IProStream` interface.

```java
public void stopRecording(IBroadcastStream stream)
{
    try
    {
       IProStream bStream = (IProStream ) stream;
       if(bStream.isRecording()) {
          bStream.stopRecording();
       }
    }
    catch (Exception e) {
        log.error("Error stopping stream recording {} ", e);
    }

}

```

## 6. Stream Statistics

A Red5 Pro broadcast stream object provides statistics information through the `getStatistics()` method of the `IClientBroadcastStream` interface which returns a `IClientBroadcastStreamStatistics`. Use the extended `IProStream` interface instead of `IClientBroadcastStream` to access the `getStatistics` method.

__Example :__

```java
IProStream bStream = (IProStream ) stream;
IClientBroadcastStreamStatistics stats = broadcastStream.getStatistics();
```

> To obtain the `IClientBroadcastStreamStatistics` object from a broadcast stream it should be cast to an `IProStream` object.

Check out the [stream-statistics-demo example](https://github.com/rajdeeprath/red5-development-series/tree/master/code-examples/server-side/red5-stream-examples/stream-statistics-demo) on GitHub for more information on how to fetch live stream statistics.

## 7. Terminate a stream

If you wish to close a Red5 Pro stream from the server side, you can use the `close()` method of the `IStream` interface. Every stream object in Red5 is an `IStream` object and hence implements the `close` method.

__Example:__

```java
@Override
public void streamBroadcastStart(IBroadcastStream stream) {
 stream.close();
}
```

In the above snippet, we close a broadcast stream as soon as the publisher starts publishing. The `streamBroadcastStart` is invoked when the broadcast starts. then we call the `close` method on the `IBroadcastStream` object received through the `streamBroadcastStart` method to close it.

## 8. Securing publish & playback

The Red5 Pro framework provides a simple yet sturdy security mechanism for protection of publish & playback streams. In this section, we shall see how we can prevent illegal access to Red5 pro streams using the stream security features of Red5.

Red5 provides two security interfaces - `IStreamPublishSecurity` & `IStreamPlaybackSecurity` in its API, which simplify the process of controlling access to streams. The `IStreamPublishSecurity` is used to secure access to stream publishing whereas `IStreamPlaybackSecurity` is used to secure stream subscription.

### Publisher security

To add publisher security, you need to create a implementation of `IStreamPublishSecurity` and register it with your application adapter using the [registerStreamPublishSecurity](/docs_static/red5/org/red5/server/adapter/MultiThreadedApplicationAdapter.html#registerStreamPublishSecurity(org.red5.server.api.stream.IStreamPublishSecurity)) method.

An application adapter can have multiple [IStreamPublishSecurity](/docs_static/red5/org/red5/server/api/stream/IStreamPublishSecurity.html) implementations registered with it. When you have multiple [IStreamPublishSecurity](/docs_static/red5/org/red5/server/api/stream/IStreamPublishSecurity.html) implementations, even a single rejection (returning false) will override the results of other implementations.

__Let us see how the `IStreamPublishSecurity` implementation works.__

When you create an implementation of the `IStreamPublishSecurity` interface you must also implement the [isPublishAllowed](/docs_static/red5/org/red5/server/api/stream/IStreamPublishSecurity.html#isPublishAllowed-org.red5.server.api.scope.IScope-java.lang.String-java.lang.String-) method.

```java
@Override
public boolean isPublishAllowed(IScope scope, String name, String mode)
{
    return true;
}
```

This method hooks us to the flow of the publisher session initialization event chain. Whenever a client tries to `publish` a stream, this method gets invoked. The method returns a boolean value. Returning a `true` allows the session initialization chain to continue whereas returning a `false` breaks the chain and causes the publish request to be rejected.

The method provides three parameters which can be used for authorizing/rejecting the publish request:

* `scope`:  The scope (location) in the application where the stream is going to be published to.
* `name`: Name of the stream
* `mode`: The publish mode of the stream. Publish mode can be `'live` or `record` or `append`.

You can check out the [complete example demonstrating publish security on github](https://github.com/rajdeeprath/red5-development-series/blob/master/code-examples/server-side/red5-stream-examples/stream-security-demo/src/main/java/org/red5/streams/examples/security/PublishSecurity.java).

### Subscriber security

 To add subscriber security, you need to create an implementation of [IStreamPlaybackSecurity](/docs_static/red5/org/red5/server/api/stream/IStreamPlaybackSecurity.html) and register it with your application adapter using the [registerStreamPlaybackSecurity](/docs_static/red5/org/red5/server/adapter/MultiThreadedApplicationAdapter.html#registerStreamPlaybackSecurity(org.red5.server.api.stream.IStreamPlaybackSecurity)) method.

When you have multiple [IStreamPlaybackSecurity](/docs_static/red5/org/red5/server/api/stream/IStreamPlaybackSecurity.html) implementations, even a single rejection (returning false) will override the results of other implementations.

__Let us see how the `IStreamPlaybackSecurity` implementation works.__

When you create an implementation of the `IStreamPlaybackSecurity` interface you must implement the [isPlaybackAllowed](/docs_static/red5/org/red5/server/api/stream/IStreamPlaybackSecurity.html#isPlaybackAllowed-org.red5.server.api.scope.IScope-java.lang.String-int-int-boolean-) method.

```java
@Override
public boolean isPlaybackAllowed(IScope scope, String name, int start, int length, boolean flushPlaylist)
{
    return false;
}
```

This method hooks us to the flow of the subscribe session initialization event chain. Whenever a client tries to `subscribe` to a stream, this method gets invoked. The method returns a boolean value. Returning a `true` allows the session initialization chain to continue whereas returning a `false` breaks the chain and causes the subscribe request to be rejected.

The method provides five  parameters which can be used for authorizing/rejecting the subscribe request:

* `scope`:  The scope (location) in the application where the stream is going to be subscribed from.
* `name`: Name of the stream
* `start`: Requested start position for playback (not applicable to live streams)*
* `length`: Requested stream duration for playback (not applicable to live streams)
* `flushPlaylist`:  Flush the playlist

You can check out the [complete example demonstrating playback security on github](https://github.com/rajdeeprath/red5-development-series/blob/master/code-examples/server-side/red5-stream-examples/stream-security-demo/src/main/java/org/red5/streams/examples/security/PlaybackSecurity.java).
