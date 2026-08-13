---
title: Getting Started
description: ""
---

Red5 Pro Stream Manager REST API calls can be executed using any standard REST client.

For this section we will be using Google Chrome Add-On: [Postman REST client](https://postman.com).
__You need to have the latest [Chrome Browser](https://www.google.com/chrome/) installed on your computer to install the Add-On.__

---

Given below are examples on using `POST`, `GET` and `DELETE` type REST operations using the [Postman REST client](https://postman.com). These are the three type of operations that you will come across while using the Stream Manager REST API.

- [Making POST API Calls](#making-post-api-calls)
- [Making GET API Calls](#making-get-api-calls)
- [Making DELETE API Calls](#making-delete-api-calls)

__Note__: In examples, the URL pattern of `{host}` will refer to the Stream Manager IP/hostname and `{port}` will be __5080__, the default port for Red5.

### Making POST API Calls

To make a `POST` REST call using the [Postman REST client](https://postman.com):

1. Enter your URL in the **URL** text field
2. Select `POST` from methods list on the left-hand side of URL text field
3. If you have any accompanying data:
    * Select **Body** tab and select `raw` option
    * Select `JSON` (_application/json_) in the drop down selector next to the `raw` option
    * Paste the desired JSON data into the text area exposed on selecting `raw`
4. Click **Send** to execute your API call

![REST API POST Exmaple](/_images/development/streammanagerapi/post-example.jpg)

---

### Making GET API Calls

To make a `GET` REST call using the [Postman REST client](https://postman.com):

1. Enter your URL in the **URL** text field
2. Select `GET` from methods list on the left-hand side of URL text field
3. Click **Send** to execute your API call

![REST API GET Exmaple](/_images/development/streammanagerapi/get-example.jpg)

---

### Making DELETE API Calls

To make a `DELETE` REST call using the [Postman REST client](https://postman.com):

* Enter your URL in the **URL** text field
* Select `DELETE` from methods list on the left-hand side of URL text field
* Click **Send** to execute your api call

![REST API DELETE Exmaple](/_images/development/streammanagerapi/delete-example.jpg)
