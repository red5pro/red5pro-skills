_From: Red5 Pro WebSockets_

## Configuration

Update the `conf/jee-container.xml` file to suit your needs.

*Non-secure* - http and ws:

```xml
   <bean id="tomcat.server" class="org.red5.server.tomcat.TomcatLoader" depends-on="context.loader,warDeployer" lazy-init="true">
        <property name="websocketEnabled" value="true" />
        <property name="webappFolder" value="${red5.root}/webapps" />
        <property name="connectors">
            <list>
                <bean name="httpConnector" class="org.red5.server.tomcat.TomcatConnector">
                    <property name="protocol" value="org.apache.coyote.http11.Http11Nio2Protocol" />
                    <property name="address" value="${http.host}:${http.port}" />
                    <property name="redirectPort" value="${https.port}" />
                    <property name="connectionProperties">
                        <map>
                            <entry key="maxHttpHeaderSize" value="${http.max_headers_size}"/>
                            <entry key="maxKeepAliveRequests" value="${http.max_keep_alive_requests}"/>
                            <entry key="keepAliveTimout" value="-1"/>
                        </map>
                    </property>
                </bean>
            </list>
        </property>
        <property name="baseHost">
           <bean class="org.apache.catalina.core.StandardHost">
               <property name="name" value="${http.host}" />
           </bean>
        </property>
    </bean>
```

*Secure* - https and wss:

```xml
   <bean id="tomcat.server" class="org.red5.server.tomcat.TomcatLoader" depends-on="context.loader" lazy-init="true">
        <property name="websocketEnabled" value="true" />
        <property name="webappFolder" value="${red5.root}/webapps" />
        <property name="connectors">
            <list>
                <bean name="httpConnector" class="org.red5.server.tomcat.TomcatConnector">
                    <property name="protocol" value="org.apache.coyote.http11.Http11Nio2Protocol" />
                    <property name="address" value="${http.host}:${http.port}" />
                    <property name="redirectPort" value="${https.port}" />
                </bean>
                <bean name="httpsConnector" class="org.red5.server.tomcat.TomcatConnector">
                    <property name="secure" value="true" />
                    <property name="protocol" value="org.apache.coyote.http11.Http11Nio2Protocol" />
                    <property name="address" value="${http.host}:${https.port}" />
                    <property name="redirectPort" value="${http.port}" />
                    <property name="connectionProperties">
                        <map>
                            <entry key="port" value="${https.port}" />
                            <entry key="redirectPort" value="${http.port}" />
                            <entry key="SSLEnabled" value="true" />
                            <entry key="sslProtocol" value="TLSv1.2" />
                            <entry key="ciphers" value="TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_128_GCM_SHA256,TLS_RSA_WITH_AES_128_CBC_SHA256,TLS_RSA_WITH_AES_128_CBC_SHA" />
                            <entry key="useServerCipherSuitesOrder" value="true" />
                            <entry key="keystoreFile" value="${rtmps.keystorefile}" />
                            <entry key="keystorePass" value="${rtmps.keystorepass}" />
                            <entry key="truststoreFile" value="${rtmps.truststorefile}" />
                            <entry key="truststorePass" value="${rtmps.truststorepass}" />
                            <entry key="clientAuth" value="false" />
                            <entry key="allowUnsafeLegacyRenegotiation" value="false" />
                            <entry key="maxHttpHeaderSize" value="${http.max_headers_size}"/>
                            <entry key="maxKeepAliveRequests" value="${http.max_keep_alive_requests}"/>
                            <entry key="keepAliveTimout" value="-1"/>
                            <entry key="useExecutor" value="true"/>
                            <entry key="maxThreads" value="${http.max_threads}"/>
                            <entry key="acceptorThreadCount" value="${http.acceptor_thread_count}"/>
                            <entry key="processorCache" value="${http.processor_cache}"/>
                        </map>
                    </property>
                </bean>
            </list>
        </property>
        <property name="baseHost">
            <bean class="org.apache.catalina.core.StandardHost">
                <property name="name" value="${http.host}" />
            </bean>
        </property>
    </bean>
```

To bind to more than one IP address / port, add additional `httpConnector` or `httpsConnector` entries:

```xml
    <property name="connectors">
        <list>
        <bean name="httpConnector" class="org.red5.server.tomcat.TomcatConnector">
            <property name="protocol" value="org.apache.coyote.http11.Http11Nio2Protocol" />
            <property name="address" value="${http.host}:${http.port}" />
            <property name="redirectPort" value="${https.port}" />
        </bean>
        <bean name="httpConnector1" class="org.red5.server.tomcat.TomcatConnector">
            <property name="protocol" value="org.apache.coyote.http11.Http11Nio2Protocol" />
            <property name="address" value="192.168.1.1:5080" />
            <property name="redirectPort" value="${https.port}" />
        </bean>
        <bean name="httpConnector2" class="org.red5.server.tomcat.TomcatConnector">
            <property name="protocol" value="org.apache.coyote.http11.Http11Nio2Protocol" />
            <property name="address" value="10.10.10.1:5080" />
            <property name="redirectPort" value="${https.port}" />
        </bean>
    </list>
    </property>
```

*Note*

If you are not using unlimited strength JCE (ex. you are outside the USA), your cipher suite selections will fail if any containing `AES_256` are specified.
