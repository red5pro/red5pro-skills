_From: Linux Install - JDK 8_

## Verifying Red5 Pro is Running

Once you have started the Red5 Pro Server, you can verify that it is running and available by visiting your instance at port __5080__.

Open a web browser and navigate to `http://__your server ip__:5080` (like `http://127.0.0.0:5080`)

>To not publicly expose the default web access at port __5080__, you can do either of the following:

* Don't expose the port 5080 in your Inbound security for the instance.
* Redefine the default port as the `http.port` value in the _conf/red5.properties_ file of your Red5 Pro Server install.
