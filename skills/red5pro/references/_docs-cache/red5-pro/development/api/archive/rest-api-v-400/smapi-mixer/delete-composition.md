_From: Mixer APIs_

## Delete Composition

**DESCRIPTION**

Deletes a mixer composition from the Stream Manager data store by a given event name. It does not delete the mixer instances.

* **URI**: `http://{host}:{port}/streammanager/api/4.0/composition{composition-name}?accessToken=<accessToken>`
* **METHOD**: DELETE

**RESPONSE**

* **Failure**: HTTP CODE 400 or 404
* **Data**:

```json
{
  "errorMessage": "<error-message-string>",
  "timestamp": <error-timestamp>
}
```

**SUCCESS**

* **CODE**: 200
* **DATA**: (none)

**Example**: Deletes the composition created earlier

* **URI**: `https://streammanager.url.com/streammanager/composition/test1?accessToken=xyz123`
* **Method**: DELETE

**RESPONSE**

* **Success**: HTTP CODE 200
* **DATA**: (none)

---

# Mixer Conference API

- [Create Conference](#create-conference)
- [List Conferences](#list-conferences)
- [Read Conference Provision](#read-conference-provision)
- [Join Conference](#join-conference)
- [Delete Conference Provision](#delete-conference-provision)

Use the `Mixer Conference API` to create a WebRTC video conference, where participants are provided with a program feed and mix-minus audio of the conference. The `Conference API` is used with the [Mixer Composition API](/docs/red5-pro/development/api/archive/rest-api-v-400/smapi-mixer/) to create video conferences where participants watch a composite stream that includes all participants while listening to a mix-minus audio feed. 

> **Note:** The Conference API is currently limited to WebRTC publishers and subscribers. 
