---
title: Digicert
description: ""
menu_order: 9
---

Using [DigiCert](https://knowledge.digicert.com/tutorials/tomcat-install-your-ssl-certificate-on-a-tomcat-server) as your provider requires these steps:

1. Create your private key and keystore.jks file:
    __When asked for first and last name, this is NOT your first and last name, but rather it is your Fully Qualified Domain Name for the site you are securing (example: ssl.example.com). If you are using a Wildcard Certificate the FQDN must begin with the \\\\\\* character. (example: \\\\\\*.example.com)__

    ```sh
    keytool -keysize 2048 -genkey -alias tomcat -keyalg RSA -keystore keystore.jks -storepass changeit
    ```

    This will bring you through questions like those that follow:

    ```txt
    What is your first and last name?
      [Unknown]:  ssl.example.com
    What is the name of your organizational unit?
      [Unknown]:  Dev
    What is the name of your organization?
      [Unknown]:  Red5
    What is the name of your City or Locality?
      [Unknown]:  Boston
    What is the name of your State or Province?
      [Unknown]:  MA
    What is the two-letter country code for this unit?
      [Unknown]:  US
    Is CN=ssl.example.com, OU=Dev, O=Red5, L=Boston, ST=MA, C=US correct?
      [no]:  yes
    ```
2. Generate a CSR
    ```sh
    keytool -certreq -keyalg RSA -alias tomcat -file csr.txt -keystore keystore.jks
    ```
3. Open the CSR with a text editor, and copy and paste the text (including the BEGIN and END tags) into the DigiCert web order form.
4. Log into the DigiCert Management Console and download your SSL Certificate file (ssl_example_com.p7b) to the directory where you saved your keystore during the CSR creation process.
5. Install the SSL Certificate file to your keystore
    _Ensure that you use the exact keystore.jks file that the csr was generated from_

    ```sh
    keytool -import -trustcacerts -alias tomcat -file ssl_example_com.p7b -keystore keystore.jks
    ```
6. Export the certificate so that it can be added as the trusted certificate:
    ```sh
    keytool -export -alias tomcat -file tomcat.cer -keystore keystore.jks -storepass changeit -noprompt
    ```
7. The exported certificate file, will now be used to populate the truststore. The password for the truststore must be provided. It can be the same, or different, to the one for the keystore. You will need this password for the `red5.properties` file.
    ```sh
    keytool -import -trustcacerts -alias tomcat -file tomcat.cer -keystore truststore.jks -storepass changeit -noprompt
    ```

### Additional Information

* [Helpful SSL Commands](https://yasarayasawardhana.medium.com/beginners-guide-to-key-stores-and-trust-stores-f7fa6d70ca2e)
* [Information about Keystore/Truststore](https://www.freecodecamp.org/news/openssl-command-cheatsheet-b441be1e8c4a/)