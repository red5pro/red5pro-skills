_From: Defining Red5 Pro as a Service on Linux_

### Size-based rolling policy

As configured below, the log will roll over at or just over 200 Mb with a maximum log file count of 20.

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
