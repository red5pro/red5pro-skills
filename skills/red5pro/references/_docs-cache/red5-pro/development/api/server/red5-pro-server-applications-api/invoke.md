_From: Applications API_

## invoke

**Description**

Invokes a custom method on the application's ApplicationAdapter class. Note: HTTP to java RMI has limitations. Use String, Double (for numerics).

The invoke API is applicable only to custom-developed Red5Pro applications and is used for invoking custom methods on the ApplicationAdapter. These custom methods may carry a business logic that is specific to the given application.

**REQUEST**

* **URI**: 
```
http://{host}:5080/api/v1/applications/{appname}/invoke?accessToken={security-token}
```
* **Method**: POST
* **Parameters**:

|  Property | Type | Description | Required | Default |
|---|---|---|---|---|
| appname |  Path Param | Application name | Required |  |
| `Custom Method Invoke Object` |  Post Param | Json Complex Object | Required |  |
| accessToken |  Query Param | Security token | Required if token security is enabled |

`Custom Method Invoke Object`

```json
{
  "method": "",
  "parameters": [ ]
}
```

**RESPONSE**

* **Failure**: HTTP CODE `400` or `404` or `500` or `401`
  See failure [status code table](/docs/red5-pro/development/api/server/red5-pro-server-api-failure-status-codes/) for more information on error cause.
* **Data**:

```json
{
  "status": "error",
  "code": <http-status-code>,
  "message": <error-message>",
  "timestamp": <server-timestamp>
}
```

* **Success**: HTTP CODE `200 - OK`
* **Data**: Custom JSON serialized object as per developer's return type in the invoked method.

```json
{
  "status": "success",
  "code": 200,
  "data": {CustomResponseObject},
  "timestamp": 1467060941836
}
```

---

**Example** 1

Below is a sample of the ApplicationAdapter of a custom Red5 Pro application with a custom method called sayHello. The objective of the method is to receive a `clientname` parameter and return a welcome message.

```java
public class Application extends MultiThreadedApplicationAdapter
{
    private static Logger log = Red5LoggerFactory.getLogger(Application.class, "Application");
    public String sayHello(String name)
    {
        return "Welcome " + name;
    }
}
```

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/api/invoke?accessToken=xyz123
```
* **Method**: POST
* **Data**:  JSON

```json
{
  "method": "sayHello",
  "parameters": [
    "Tony"
  ]
}
```

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": "Welcome Tony",
  "timestamp": 1467193076102
}
```

**Example** 2

In this example, we have a custom-made application with a method to accept two integers and print the sum. Below is a sample of the ApplicationAdapter of a custom Red5 Pro application with a custom method called getSum. The objective of the method is to receive two parameters and return the sum.

```java
public class Application extends MultiThreadedApplicationAdapter
{
    private static Logger log = Red5LoggerFactory.getLogger(Application.class, "Application");

    public Integer add(Double  a, Double  b)
    {
        return a.intValue() + b.intValue();
    }
}
```

Note that the parameter type is declared as Double. This is because any number in JSON is a float (contains a decimal place). So if you pass 1 it is treated as 1.0. However, when returning a result, you may return any data type which can be serialized into JSON.

**REQUEST**

* **URI**: 
```
http://localhost:5080/api/v1/applications/api/invoke?accessToken=xyz123
```
* **Method**: POST
* **Data**:  JSON

```json
{
  "method": "getSum",
  "parameters": [
    1,
    2
  ]
}
```

**RESPONSE**

* **Success**: HTTP CODE `200 - OK`
* **Data**:

```json
{
  "status": "success",
  "code": 200,
  "data": 3,
  "timestamp": 1467193610836
}
```
