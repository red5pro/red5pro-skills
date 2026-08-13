_From: Linux Install - JDK 8_

## Rolling Log Files

There are a number of options for rolling logs, utilizing the Logback [RollingFileAppender](https://logback.qos.ch/manual/appenders.html#RollingFileAppender). To implement logging rollover, add the options that you want in your `{red5pro}\conf\logback.xml` files after the `<appender class="ch.qos.logback.core.FileAppender" name="FILE">` section. Displayed below are two of the rolling styles available:

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

### Size-based rolling policy

As configured below, the log will roll-over at or just over 200 Mb with a maximum log file count of 20.

```xml
<appender class="ch.qos.logback.core.rolling.RollingFileAppender" name="ROLLING_LOG">
    <File>log/red5.log</File>
    <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
        <fileNamePattern>log/red5.%i.log</fileNamePattern>
        <minIndex>1</minIndex>
        <maxIndex>20</maxIndex>
    </rollingPolicy>
    <triggeringPolicy
        class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
        <maxFileSize>200MB</maxFileSize>
    </triggeringPolicy>
    <encoder>
        <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
```

### Time-based rolling policy

As configured below, the log will roll-over daily for a maximum of 30 days.

```xml
<appender class="ch.qos.logback.core.rolling.RollingFileAppender" name="ROLLING_LOG">
    <File>log/red5.log</File>
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
      <fileNamePattern>log/red5.%d{yyyy-MM-dd}.log</fileNamePattern>
      <maxHistory>30</maxHistory>
    </rollingPolicy>
    <encoder>
        <pattern>%d{ISO8601} [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
```

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
