_From: Round-Trip Authentication Validator_

## ABOUT

The Red5 Pro RoundTrip Authentication validator implemented by the class `RoundTripAuthValidator`, is a remote server authorization mediator. As the name suggests, it implements a secure and robust authentication mechanism using the server to server validation.

A Red5 pro webapp seeks validation for `publish` and `subscribe` actions requested on a stream from a remote service through the `RoundTripAuthValidator` implementation. The authentication is carried out on the remote server using the appropriate business logic implemented and the result is returned as a `JSON` object back to the `RoundTripAuthValidator` implementation.

One of the main feature of this validator implementation is being able to authenticate clients distinctively by their `role` (`publishers` and `subscribers`). Authentication does not occur when a client merely connects to the server. It is triggered when the client clarifies its intent through an actual `publish` or `subscribe` request for a stream. The validator uses Red5 pro's security hooks to determine the requested stream action type (`publish` or `subscribe`).
