---
title: Digial Ocean (D.O.) Spaces
description: ""
menu_order: 5
---

# Create Digital Ocean Space Access Key

From the left-hand menu, navigate to MANAGE, API and the [Spaces access keys](https://cloud.digitalocean.com/account/api/tokens) section.

* Click on `Generate New Key`
* Give the key a name, and click on the check mark
* Copy the `Key` and `Secret` values. **NOTE:** the `Secret` will not be  visible after you navigate away from the page

## D.O. Create New Space

From the left-hand menu, navigate to MANAGE, [Spaces](https://cloud.digitalocean.com/spaces)

* Click on the green Create button at the top, and select **Spaces**
* Choose a datacenter region
* Under *Allow file listing?* choose **Restrict File Listing**
* Choose a unique name
* Select the project where your server is hosted, and click on *Create a Space* ![createdospace01](/_images/special/cloudstoragevod/createdospace01.png) ![createdospace02](/_images/special/cloudstoragevod/createdospace02.png)
* From the Spaces menu, click on the *More* pulldown button, and select *Settings*
* Next to **CORS Configuration**, click on the *Add* button
* In the *Origin* box, type in `*` to allow all
* Under **Allowed Methods** check `GET` and `HEAD`, then click on **Save Options** ![CORSconfig](/_images/special/cloudstoragevod/CORSconfig.png)
* Make a note of the **Endpoint**, and of the the space URL that is listed at the top under your space name