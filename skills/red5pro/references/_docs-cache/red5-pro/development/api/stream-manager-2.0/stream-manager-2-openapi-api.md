---
title: Stream Manager 2.0 OpenAPI/Swagger UI
menu_order: 9
---

Stream Manager 2.0 includes an OpenAPI/Swagger UI integration that enhances the way users interact with the Stream Manager API. This user-friendly interface provides an interactive documentation layout. Users can read about each API endpoint and interact with them directly from the browser. The Swagger UI makes it possible to execute API calls allowing for real-time testing and immediate feedback on the API’s behavior and responses.

![Stream Manager 2.0 OpenAPI/Swagger UI](/_images/red5-pro/development/api/stream-manager-2.0/openapi-1.png)

The Swagger UI includes features that aid in the development of client applications. For instance, it provides options to generate client libraries automatically, which can be used in various programming environments. This simplifies the integration process, as developers can download tailored SDKs for languages such as Java, Python, or Node.js, aligning closely with their development needs. Additionally, for tools like Postman, which are commonly used for API testing and exploration, Swagger UI allows for the easy export of API definitions. This makes it possible to import the entire API into Postman with just a few clicks, facilitating more detailed testing and interaction in a tool familiar to many developers.

## Accessing the Swagger UI

The Swagger UI is available on your Stream Manager 2.0 url at `/swagger-ui.html`. For example, if your Stream Manager 2.0 is running on `https://sm2.example.org`, you can access the Swagger UI at `https://sm2.example.org/swagger-ui.html`.

## Importing into Postman

To create a Postman collection from the Stream Manager 2.0 OpenAPI/Swagger UI, follow [these instructions](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-from-swagger/)

## Using the Swagger UI

![Stream Manager 2.0 authenticate to OpenAPI/Swagger UI](/_images/red5-pro/development/api/stream-manager-2.0/openapi-2.png)

To use the Swagger UI, you must first authenticate with your Stream Manager 2.0 instance. You can do this by clicking the "Authorize" (1) button.

![Stream Manager 2.0 authenticate to OpenAPI/Swagger UI enter un/pw](/_images/red5-pro/development/api/stream-manager-2.0/openapi-3.png)

Then enter your Stream Manager 2.0 username (1), password (2) and click the "Authorize" button (3).

![Stream Manager 2.0 authenticate to OpenAPI/Swagger UI authorized and close](/_images/red5-pro/development/api/stream-manager-2.0/openapi-4.png)

Once authorized, click the "Close" button (1).

![Stream Manager 2.0 OpenAPI/Swagger UI](/_images/red5-pro/development/api/stream-manager-2.0/openapi-5.png)

Once authenticated, you can interact with the API by selecting a definition and then interacting with the various API endpoints
