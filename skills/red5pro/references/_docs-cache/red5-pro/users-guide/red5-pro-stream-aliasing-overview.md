---
title: Stream Name Aliasing
description: ""
menu_order: 140
---

Stream aliasing is a feature that allows a stream to be published and played back using a different name.

## Configuration

To configure Red5 Pro to perform aliasing for stream names, modify the `red5-common.xml` file and this bean:

```xml
    <bean id="streamService" class="com.red5pro.server.stream.ProStreamService">
        <property name="stripTypePrefix" value="true"/>
    </bean>
```

Aliasing is enabled by default in `ProStreamService` as the `stripTypePrefix` which is important to RTMP-based ingest as it ensures that the Adobe media prefixes (`mp4:` and `f4v:`) are stripped from the stream name. If the prefix persists, WebRTC subscribers will fail since the `:` has a special use in JavaScript manipulation of media elements.

## Alias Provider

Control of aliasing is placed at the web applicaton level via the `IAliasProvider` interface. A base implementation adapter is provided via  `AliasProviderAdapter`. The default implementation set in `live` uses pattern matchers; its named `PatternAliasProvider` and it will accept alias patterns like `pub_stream1_123` for publishing or `play_stream1_323` for playback. Another provider named `ProvisionAliasProvider` uses the `ProvisionResolverService` to provide aliasing via our `Provision` system, which configures streams via JSON.

## Aliasing via RTMP

To supply play aliases without using a Provision, they need only be passed as parameters on the RTMP URI:

```sh
ffmpeg -stream_loop -1 -re -i test.mp4 -c:v libx264 -b:v 2M -vprofile baseline -level 3.2 -x264-params keyint=30:min-keyint=20:scenecut=0:bframes=0:intra-refresh=0 -c:a aac -b:a 128k -ar 48000 -f flv "rtmp://127.0.0.1:1935/live/stream1?playAliases=stream2,stream3,stream4"
```

Play aliases are passed as a comma-separated list of names via the `playAliases` parameter. The example above allows subscribers to request `stream2`, `stream3`, or `stream4` instead of the published stream name of `stream1`.

To implement a publish alias, add `streamAlias` on the RTMP URI, however, this isn't useful if a publisher is meant to publish with the alias:

```sh
ffmpeg -stream_loop -1 -re -i test.mp4 -c:v libx264 -b:v 2M -vprofile baseline -level 3.2 -x264-params keyint=30:min-keyint=20:scenecut=0:bframes=0:intra-refresh=0 -c:a aac -b:a 128k -ar 48000 -f flv "rtmp://127.0.0.1:1935/live/stream1?streamAlias=streamP&playAliases=stream2,stream3,stream4"
```

A stream alias is passed via the `streamAlias` parameter. The example above allows publishers to use an alias instead of the published stream name of `stream1`.

### Aliasing via PatternAliasProvider

This example provider uses regex patterns to match against a given name. The patterns are as follows:

```java
    // published name pattern (stream alias) ie: pub_streamA_1
    private static final Pattern PUBLISH_PATTERN = Pattern.compile("^(pub)_([a-zA-Z0-9]+)_\\\\d{1,3}");

    // play name pattern (play alias) ie: play_streamA_42
    private static final Pattern PLAY_PATTERN = Pattern.compile("^(play)_([a-zA-Z0-9]+)_\\\\d{1,3}");
```

### Aliasing via ProvisionAliasProvider

Using an extension of the `AliasProviderAdapter` prevents the need for posting a `Provision` when internal or custom developed applications are preferred. A demo in the `live` webapp includes a servlet to prove-out simple `GET` requests from a browser. The `Alias` servlet serves as an example of how to access the webapp and make calls needed from outside the webapp itself.

To avoid confusion with the examples below, the published ProStream's name is `paul1`; aliases are anything else shown. The `alias` parameter is used for both play and publish aliasing; the type is determined by the method called in the servlet.

Play aliases may be added, resolved, and removed with the following:

* `http://localhost:5080/live/alias/addPlayAlias?streamName=paul1&alias=paul2`
* `http://localhost:5080/live/alias/resolvePlayAlias?alias=paul2`
* `http://localhost:5080/live/alias/removePlayAlias?alias=paul2`

Stream aliasing (publish) may be added, resolved, and removed with the following:

* `http://localhost:5080/live/alias/addStreamAlias?streamName=paul1&alias=paul2`
* `http://localhost:5080/live/alias/resolveStreamAlias?alias=paul2`
* `http://localhost:5080/live/alias/removeStreamAlias?alias=paul2`

To add a provider implementation, add the following entry in `appStart` method:

```java
    import com.red5pro.server.stream.IAliasProvider;
    import com.infrared5.red5pro.live.ProvisionAliasProvider;

    // local alias provider instance within application scope
    private static IAliasProvider streamNameAliasProvider;

    public boolean appStart(IScope scope) {
        // add our provision-based alias provider
        streamNameAliasProvider = new ProvisionAliasProvider(scope);
        return true;
    }
```

Example `IAliasProvider` implementation using the `ProvisionResolverService`:

```java
package com.infrared5.red5pro.live;

import java.util.HashSet;
import java.util.Set;

import org.red5.net.websocket.WebSocketConnection;
import org.red5.server.api.IConnection;
import org.red5.server.api.scope.IScope;

import com.red5pro.cluster.streams.Provision;
import com.red5pro.override.internal.ProvisionResolverService;
import com.red5pro.server.stream.AliasProviderAdapter;

/**
 * Utilizes our Provision system to provide alias support.
 *
 * @author Paul Gregoire
 */
public class ProvisionAliasProvider extends AliasProviderAdapter {

    // for provision access, we need the scope associated with this instance
    private final IScope scope;

    public ProvisionAliasProvider(IScope scope) {
        this.scope = scope;
    }

    @Override
    public boolean addPlayAlias(String alias, String streamName) {
        boolean result = false;
        Provision prov = ProvisionResolverService.INSTANCE.resolveProvision(scope.getName(), streamName);
        // add to existing provision
        if (prov != null) {
            Set<String> aliases = prov.getAliases();
            if (aliases != null) {
                result = aliases.add(alias);
            } else {
                aliases = new HashSet<>();
                result = aliases.add(alias);
                prov.setAliases(aliases);
            }
        } else {
            prov = Provision.build(scope.getContextPath(), streamName, 0, null, null);
            ProvisionResolverService.insert(prov);
            Set<String> aliases = new HashSet<>();
            result = aliases.add(alias);
            prov.setAliases(aliases);
        }
        return result;
    }

    @Override
    public boolean addStreamAlias(String alias, String streamName) {
        boolean result = false;
        Provision prov = ProvisionResolverService.INSTANCE.resolveProvision(scope.getName(), streamName);
        // add to existing provision
        if (prov != null) {
            prov.setStreamNameAlias(alias);
            result = true;
        } else {
            prov = Provision.build(scope.getContextPath(), streamName, 0, null, null);
            ProvisionResolverService.insert(prov);
            result = true;
        }
        return result;
    }

    @Override
    public boolean isAlias(String alias) {
        Provision prov = ProvisionResolverService.resolveStreamAlias(alias);
        if (prov != null) {
            return true;
        }
        prov = ProvisionResolverService.resolvePlayAlias(alias);
        if (prov != null) {
            return true;
        }
        return false;
    }

    @Override
    public boolean removeAllAliases(String streamName) {
        Provision prov = ProvisionResolverService.INSTANCE.resolveProvision(scope.getName(), streamName);
        if (prov != null) {
            prov.setStreamNameAlias(null);
            prov.setAliases(null);
            return true;
        }
        return false;
    }

    @Override
    public boolean removePlayAlias(String alias) {
        Provision prov = ProvisionResolverService.resolvePlayAlias(alias);
        if (prov != null) {
            return prov.getAliases().remove(alias);
        }
        return false;
    }

    @Override
    public boolean removeStreamAlias(String alias) {
        Provision prov = ProvisionResolverService.resolveStreamAlias(alias);
        if (prov != null) {
            prov.setStreamNameAlias(null);
            return true;
        }
        return false;
    }

    @Override
    public String resolvePlayAlias(String alias, IConnection conn) {
        Provision prov = ProvisionResolverService.resolvePlayAlias(alias);
        if (prov != null) {
            return prov.getStreamName();
        }
        return null;
    }

    @Override
    public String resolvePlayAlias(String alias, WebSocketConnection webSocket) {
        Provision prov = ProvisionResolverService.resolvePlayAlias(alias);
        if (prov != null) {
            return prov.getStreamName();
        }
        return null;
    }

    @Override
    public String resolveStreamAlias(String alias, IConnection conn) {
        Provision prov = ProvisionResolverService.resolveStreamAlias(alias);
        if (prov != null) {
            return prov.getStreamName();
        }
        return null;
    }

    @Override
    public String resolveStreamAlias(String alias, WebSocketConnection webSocket) {
        Provision prov = ProvisionResolverService.resolveStreamAlias(alias);
        if (prov != null) {
            return prov.getStreamName();
        }
        return null;
    }

}
```

#### Aliasing via Provision

Using a provision to configure aliasing looks like this:

```json
{
  "provisions":
    [
      {
        "guid":"live/stream1",
        "context":"live",
        "name":"stream1",
        "streamAlias":"streamA",
        "level":0,
        "isRestricted":false,
        "parameters":{},
        "restrictions":[],
        "primaries":[],
        "secondaries":[],
        "playAliases":[
          "streamB","streamC","streamD"
        ]
      }
    ]
}
```

Using the same key names as with RTMP ingest - `streamAlias` and `playAliases`.

The `ProvisionResolverService` has been modified with the following methods to allow lookup for publish and subscribe aliases:

```java
    public static Provision resolveStreamAlias(String streamAlias) {
        log.debug("resolveStreamAlias for: {}", streamAlias);
        Provision ret = null;
        for (Provision prov : model.values()) {
            if (publishAlias.equals(prov.getStreamNameAlias())) {
                ret = prov;
                break;
            }
        }
        return ret;
    }

    public static Provision resolvePlayAlias(String playAlias) {
        log.debug("resolvePlayAlias for: {}", playAlias);
        Provision ret = null;
        for (Provision prov : model.values()) {
            Set<String> aliases = prov.getAliases();
            if (aliases != null && aliases.contains(playAlias)) {
                ret = prov;
                break;
            }
        }
        return ret;
    }
```