_From: Round-Trip Authentication Validator_

## PREREQUISITES FOR SETTING UP AUTHENTICATION

The round trip authentication consists of three components mainly:

1. the `simple-auth-plugin` jar,
2. the `validator instantiation` in the webapp's `red5-web.xml` file, and
3. the `remote authentication` service.

You need to have the authentication service running for the system to work. A sample of the authentication server implementation, <!--[mock Node.js service, can be downloaded here]FIXME-DOM(nodejs-mock-service.zip)-->. Once the server is available you can configure necessary endpoint parameters as explained in the next section.

Make sure to double-check your server endpoints for errors and expected responses before you configure it on your instance.
