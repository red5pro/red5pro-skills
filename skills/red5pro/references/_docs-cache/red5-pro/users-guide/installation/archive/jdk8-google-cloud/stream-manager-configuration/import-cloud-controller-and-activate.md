_From: 6. Stream Manager Configuration_

## Import Cloud Controller and Activate

Copy the google-cloud-controller.jar into `{red5prohome}/webapps/streammanager/WEB-INF/lib/`

Edit the applicationContext.xml file, located at `{red5prohome}/webapps/streammanager/WEB-INF/applicationContext.xml`,

Locate the google controller “bean” and uncomment it as shown below  (*IMPORTANT: do not modify the values (as they may change between releases), <u>only uncomment the bean configuration to make it active</u>*):

```xml
    <!-- GOOGLE COMPUTE CONTROLLER -->
        <bean id="apiBridge" class="com.red5pro.services.cloud.google.component.ComputeInstanceController"
                init-method="initialize"> <property name="project" value="${compute.project}"/>
                <property name="defaultZone" value="${compute.defaultzone}"/> <property name="defaultDiskType"
                value="${compute.defaultdisk}"/> <property name="operationTimeoutMilliseconds"
                value="${compute.operationTimeoutMilliseconds}"/> <property name="network"
                value="${compute.network}"/> </bean>
```

Comment out (or delete the entry for) the default controller as shown below to disable it:

```xml
<!-- Default CONTROLLER -->
<! --
<bean id="apiBridge" class="com.red5pro.services.cloud.sample.component.DummyCloudController" init-method="initialize">
</bean>
 -->
```
