_From: Round-Trip Authentication Validator_

## MECHANISM

As the application starts up, the validator is initialized with the configuration parameters and validation/invalidation endpoint hooks.

The client needs to directly login into the business application server to receive a unique secure `token`. The token can be seen as a mark of identity (as a session) which indicates that the client is `authentic` and can access services.

When a client attempts to connect to the application, it must provide the username, password, and optional `token` parameters during the connection attempt. The simple auth checks to see if the parameters have been provided or not. If one or more parameters are missing the client is immediately rejected.

If credentials are provided, the validator allows connection to the client and waits for a stream action. When the client attempts to publish or subscribe to a stream, the validator determines the intent (`publish or subscribe`) and the stream name for which the action is requested. The validator sends the credentials, the stream name, the client type (`publisher/subscriber`) and the optional token parameter.

The remote server (typically a business application server), validates the credentials along with validating whether the client type has permission for the intended stream action or not. the server then returns its answer back to the validator, which then determines whether to allow or deny the stream action request based on the response data from the remote server.

The `token` parameter is added for additional security alongside the `username` and `password`. The passing of the parameter can be made mandatory using the validator configuration `boolean` param `clientTokenRequired`.
