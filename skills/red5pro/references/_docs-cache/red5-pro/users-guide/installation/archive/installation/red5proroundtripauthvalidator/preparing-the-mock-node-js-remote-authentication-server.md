_From: Round-Trip Authentication Validator_

## PREPARING THE MOCK NODE.JS REMOTE AUTHENTICATION SERVER

As mentioned earlier, you can set up your validation server in any technology as long as you keep the `endpoints` and `response JSON` format the same. You can use the provided code as a starting point for your own auth server as a `Node.js` service.

The steps below explain the various components of the Node.js mock server and how to set it up to work with the `RoundTripAuthenticator`.

This Node.js service simulates the business application server's API. It has some exposed endpoints to validate and invalidate the username and password supplied. The *mock* service does not do any actual validation on the *inputs* that it receives, just that it is receiving something. This means, for example, that username/passwords validity are not checked.

### Prerequisites

Copy and unzip the zipped file `nodejs-mock-service.zip` onto the server where you want to run the mock service. You will need to install Node.js on the server:

`sudo apt-get install nodejs-legacy`

### Configuration

In the nodejs-mock-service directory, edit the `index.js` file. In the top rows of the file, locate the comment `BEGINNING OF CONFIGURATION`. After that, there will be two variables which need to be updated with your custom values:

* `host`: The host where the Node.js service is deployed. Replace "localhost" with the private IP address of the Node.js server.
* `port`: The port that you opened for the service. Default example: `3000` (make sure this port is opened on your inbound firewall rules).

There is also an optional value, `optionalURLResource`, which can be used to pass in a URL to a connecting client.

### How to run

Start the server with the command:

`node index.js`

If you open in a browser `http://<host>:<port>` you will get a few forms to test the API. The server's console will output the values received. The browser will show you the responses from the node server.

### What to expect

The console will show you three possible outputs:

* Validate credentials: called by the webapp to verify the username/password supplied by a publisher or subscriber

```xml
validate credentials called
type: publisher
username: testuser
password: testpass
streamID: stream1
```

* Invalidate credentials: called by the webapp after a publisher stops publishing. It will invalidate the credentials that the publisher used to publish.

```xml
invalidate credentials called
username: testuser
streamID: stream1
```
