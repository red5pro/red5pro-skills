_From: Stream Manager 2.0 Curl Cheat Sheet_

## Stream Manager 2.0 Auth

### Login – Request JWT

```
curl -s -X PUT https://admin:xyz123@as-test1.example.org/as/v1/auth/login
```

Where `admin` is the `R5AS_AUTH_USER` and `xyz123` is the `R5AS_AUTH_PASS`. 

A successful response contains a newly valid `token`. In the default configuration, a JWT is valid for 8 hours.

#### Store JWT as Environment Variable

Copy the `token` from the response to define an environment variable named `JWT` (the examples below use this variable):

```
export JWT="<token>"
```

for example,
```
export JWT="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiUk9MRV9BRE1JTiIsImV4cCI6MTcxMDQ1MjM0M30.LABa08Da-Op-LvqXz2cE1ZLaSwVkMhOUwryaEu-ulPg"
```

#### One-liner

```
export JWT=$(curl -s -X PUT https://admin:xyz123@as-test1.example.org/as/v1/auth/login  | jq -r .token)
```
