---
title: Generate DigitalOcean Personal Access Token
menu_order: 3
---

## Generate a DigitalOcean Personal Access Token

A DigitalOcean Personal Access Token is required for Stream Manager 2.0 autoscaling operations.  
It allows Stream Manager to create Droplets, assign firewalls, attach VPC networks, and manage scaling events.

---

### Steps to Generate the Token

* On the left side of the DigitalOcean console, From the list, click on **API**.

  ![do-token-menu](/_images/red5-pro/users-guide/stream-manager-2.0/installation/digitalocean/do-token-menu.png)

* Under the **Tokens/Keys** tab, click **Generate New Token**.

* Fill in the details:
  - **Token Name:** Example → `red5pro-autoscaling-token`
  - **Permissions:** Select **Read & Write**
  - **Expiration:** Choose an appropriate expiry or set **No Expiration** for production environments

  ![do-token-create](/_images/red5-pro/users-guide/stream-manager-2.0/installation/digitalocean/do-token-create.png)

* Click **Generate Token**.

* Copy and **securely store** the generated token.  
  This value will be used in Stream Manager's `.env` file as:

  ```conf
  DIGITAL_OCEAN_API_TOKEN=<YOUR_DIGITALOCEAN_TOKEN>
  ```