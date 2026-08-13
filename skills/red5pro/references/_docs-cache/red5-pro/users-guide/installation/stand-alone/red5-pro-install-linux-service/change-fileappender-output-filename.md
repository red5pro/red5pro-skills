_From: Defining Red5 Pro as a Service on Linux_

### Change FileAppender output filename

The rolling logfile needs to use a different output than the default, so you should change the default (**note:** this will result in an empty placeholder `red5_blank.log` file).

change from

```xml
  <appender class="ch.qos.logback.core.FileAppender" name="FILE">
    <file>log/red5.log</file>
    <append>true</append>
    <encoder>
      <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>
```

to:

```xml
  <appender class="ch.qos.logback.core.FileAppender" name="FILE">
    <file>log/red5_blank.log</file>
    <append>true</append>
    <encoder>
      <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
  </appender>
```
