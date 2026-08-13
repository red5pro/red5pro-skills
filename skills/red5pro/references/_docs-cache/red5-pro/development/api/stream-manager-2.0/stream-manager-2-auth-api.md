---
title: Stream Manager 2.0 Auth API
menu_order: 3
---

**Auth** is the Authentication service. Authorized users provide credentials to "log in", and a JWT is created in response. The JWT is then presented when performing authenticated tasks (in other services -- as-admin and as-streams specifically).

## Usage Information

Give credentials and expect a JWT:
```
curl -H "Content-Type: application/json" -X PUT https://admin:xyz123@as-test1.example.org/auth/login
```
(where username is `foo` and password is `bar`)
(returns `<token>`)

then, assuming `as-streams` is running and that `DebugVerifyController` is built/deployed, verify token with HTTP GET:
```
curl -H "Content-Type: application/json" https://as-test1.example.org/streams/verify/<token>
```

Or (even without `DebugVerifyController`) supply as bearer token to a Provision request (all of which require authentication and will return 200 if authenticated correctly):
```
curl -v -H "Content-Type: application/json" -H "Authorization: Bearer <token>" https://as-test1.example.org/streams/provision/foo
``` 
(All one line)

## JavaScript

```
	/**
	 * Given Basic Auth params, request JWT
	 * curl -v -H "Content-Type: application/json" -X PUT https://admin:xyz123@as-test1.example.org/as/v1/auth/login
	 */
	const authenticate = async (smHost, smUser, smPassword) => {
		console.log("Request Authentication");

		try {
			const url = `https://${smHost}/as/v1/auth/login`
			const token = "Basic " + btoa(smUser + ":" + smPassword);
			const response = await fetch(url, {
					method: 'PUT',
					withCredentials: true,
					credentials: 'include',
					headers: {
						'Authorization': token,
						'Content-Type': 'application/json'
					}
				})

			console.log("Authenticate response: " + response.status);
			
			var json = await response.json()
			if (json.errorMessage) {
				throw new Error(json.errorMessage)
			}
			
			return json.token;
		} catch (e) {
			console.log("authenticate() fail: " + e)
			throw e
		}
	}

```
