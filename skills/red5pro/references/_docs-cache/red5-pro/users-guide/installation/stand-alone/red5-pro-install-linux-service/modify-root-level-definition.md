_From: Defining Red5 Pro as a Service on Linux_

### Modify root level Definition

change from

```xml
<root level="INFO">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="FILE"/>
  </root>
```

to:

```xml
<root level="INFO">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="ROLLING_LOG"/>
  </root>
```

## How to modify default ports

Some firewalls or service providers may block some of the Red5 Pro default ports, so you may want to modify those. There are two files that allow you to define the ports that Red5 Pro uses: `{red5pro}/conf/red5.properties`, and `{red5pro}/conf/red5pro-activation.xml`
