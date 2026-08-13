---
title: Godaddy
description: ""
menu_order: 7
---

Using [GoDaddy](https://www.godaddy.com/) as your provider requires these steps:

1. Create your private key and keystore.jks file
    _When asked for first and last name, this is NOT your first and last name, but rather it is your Fully Qualified Domain Name for the site you are securing (example: ssl.example.com). If you are using a Wildcard Certificate the FQDN must begin with the \\\\\\* character. (example: \\\\\\*.example.com)_

    ```sh
    keytool -keysize 2048 -genkey -alias tomcat -keyalg RSA -keystore keystore.jks -storepass changeit
    ```

    This will bring you questions like those that follow:

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
3. <a href="https://certs.godaddy.com/cert" rel="external" target="_blank">Submit your CSR to GoDaddy via their online form</a>.
4. Once available, download your SSL cert files (server type = Tomcat). The zip file from GoDaddy will contain three files:
    * A root and cross-chain bundle certificate file: `gd_bundle-g2-g1.crt`
    * An intermediate certificate file: `gdig2.crt`
    * The issued site certificate file, which begins with serial number (e.g. `123abc678901def.crt`)
5. Import the root and cross-chain bundle certificates
    _Ensure that you use the exact keystore.jks file that the csr was generated from_

    ```sh
    keytool -import -alias root -keystore keystore.jks -trustcacerts -file gd_bundle-g2-g1.crt -storepass changeit -noprompt
    ```
6. Import the intermediate certificate
    ```sh
    keytool -import -alias intermed -keystore keystore.jks -trustcacerts -file gdig2.crt -storepass changeit -noprompt
    ```
7. Import your issued site certificate
    ```sh
    keytool -import -alias tomcat -keystore keystore.jks -trustcacerts -file 123abc678901def.crt -storepass changeit -noprompt
    ```
8. Export the certificate so that it can be added as the trusted certificate:
    ```sh
    keytool -export -alias tomcat -file tomcat.cer -keystore keystore.jks -storepass changeit -noprompt
    ```
9. The exported certificate file, will now be used to populate the truststore. The password for the truststore must be provided. It can be the same, or different, to the one for the keystore. You will need this password for the `red5.properties` file.
    ```sh
    keytool -import -trustcacerts -alias tomcat -file tomcat.cer -keystore truststore.jks -storepass changeit -noprompt
    ```
