_From: Defining Red5 Pro as a Service on Linux_

### Time-based rolling policy

As configured below, the log will roll over daily for a maximum of 30 days.

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
