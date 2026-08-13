---
title: Round Trip Time API
menu_order: 70
---

## Round trip API

The round trip api provides a means for RTSP subscribers and publishers to calculate RTT without managing senders reports. An invoke is sent to the server with a single param of the current time. The server echos it back and the sender is able to compare the sending time with the current time to determine the total round trip time.

### The Legacy Desktop SDK

When sending rtt to the server with the legacy desktop SDK, the core will insert the current time automatically. The core will calculate round trip time internally and pass the results back to the sender.

Sending:

```c++
            r5invoke inv = { 0 };
            inv.method_name = "rtt";
            r5connection* r5conn = session_ptr->session_pointer ->get_r5connection(session_ptr->session_pointer->mem_ptr);
            r5conn->invoke(r5conn->mem_ptr, &inv);


```

Receiving round trip time results is handled on the session configuration remote callback.

When method is "rtt", the timestamp will equal the number of milliseconds round trip time is.

```c++
				config->remoteCallback = [](const char* method, char* params, int timestamp) {
					 if (strcmp(method, "rtt") == 0){
                    	//timestamp equals round trip time in milliseconds.
                    	int32_t roundTripTime = timestamp;
                    }
				}

```

### Legacy Android SDK

With the legacy SDK, send an invoke with a string representation of the current time.

```java

			String val = String.valueOf(getTime());
			BMInvoke returnableInvoke = new BMInvoke("rtt");
			returnableInvoke.setReturnMethodName("rtt");
			returnableInvoke.addParameter(new BMParameter(val));
			BMStream d = new BMStream();
			d.writeObject(returnableInvoke);
			d.close();
			//Send invoke.


```
When receiving the invoke callback, convert the String parameter into a numeric value and compute the delta to determine total round trip time.


```java

            BMInvoke payload = calbackObject;
            if ("rtt".equals(payload.getMethodName())) {
                if (payload.getParams() != null && payload.getParams().length > 0) {
                    String val = (String) payload.getParams()[0].getValue();
                    long rttTime = getTime() -  Long.valueOf(val);
                }
            }

```

### Core SDK (Update coming soon)

The new Core SDK which replaces the legacy desktop sdk does not automatically insert the current time. Set the param of the r5invoke to current time.

```c++

            r5invoke inv = { 0 };
            inv.method_name = "rtt";
            milliseconds ms = duration_cast<milliseconds>(system_clock::now().time_since_epoch());
            inv.return_handler = "rtt";
            char time_now[32] = { 0 };
            sprintf_s(time_now, "%llu", ms.count());
            inv.param = time_now;
            r5connection* r5conn = session_ptr->session_pointer ->get_r5connection(session_ptr->session_pointer->mem_ptr);
            r5conn->invoke(r5conn->mem_ptr, &inv);
```

On the RPC callback, parse the long value from the char* pointer and compute clock delta.

```c++
			config->remoteCallback = [](const char* method, char* params, int timestamp) {

					if (strcmp(rpc->method, "rtt") == 0)
					{
						char* ret;
						milliseconds ms = duration_cast<milliseconds>(system_clock::now().time_since_epoch());
						uint64_t val = std::strtoull(params, &ret, 10);
						int32_t roundTripTime = (ms.count() - val) & 0xFFFFFFFF;
					}
			}
```
