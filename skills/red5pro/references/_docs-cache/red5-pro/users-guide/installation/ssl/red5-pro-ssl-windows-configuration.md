---
title: Configure SSL on Windows
description: ""
menu_order: 13
---

This document covers the installation of SSL in Red5 Pro on a Windows-based operating system, primarily focused on free certificates from [Let’s Encrypt](https://letsencrypt.org/) via [zerossl](https://zerossl.com/).

[Zerossl](https://zerossl.com/) is a free to use online service that uses Letsencrypt certificate authority to issue free certificates.At the time of writing this guide, there were no official letsencrypt binaries for Windows. There are some community offerings which did not meet our requirements.

Zerossl offers a web based GUI and a downloadable Windows binary which can be used for certificate generation and is nearly the equivalent of the linux letsencrypt client.

**Installing SSL certificates From Other Providers**

Installation of certificates from Comodo or Godaddy are are already documented in the [Red5 Pro with with SSL document](/docs/red5-pro/users-guide/installation/ssl/). The comands remain the same for Windows. Simply make sure to [setup openssl](#installing-openssl) for Windows and [configure java keytool](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-windows-configuration/#CreatetheKeystore) before proceeding with the certificate import & instalaltion commands.

---

## Prerequisites

Following prerequisites are required to perform a SSL installation on a Windows based system.

* Windows server (Windows server 2012 R2 was the test candidate, but the mechanism should work on all versions.)
* Administrator account
* Java (see the [Windows installation document](/docs/red5-pro/users-guide/installation/stand-alone/red5-pro-install-windows/) for instructions on adding Java to your environment variables.
* [OpenSSL](https://github.com/openssl/openssl/wiki/Binaries)
* [Red5 Pro Server](https://account.red5.net/login)
* DNS resolvable hostname
* Letsencrypt 64 bit Windows client from [zerossl](https://github.com/do-know/Crypt-LE/releases)

__The `DNS hostname` is very important and can prevent certificate creation, if not configured properly.__

**Additional tips on prerequisites:**

* The guide assumes you know how to access and use Windows `remote desktop` to connect to a remote machine running Windows using proper credentials.
* You should be logged in as an administrator, before attempting to use the command prompt / powershell.
* There are different variants of OpenSSL. Make sure to select the appropriate one for your system needs.
* Ensure that OpenSSL binary is added to Windows path (In environment variables).
* You should have access to the hosting control panel to be able to additional create/edit DNS records required for [DNS verification](https://zerossl.com/usage.html#DNS_verification).

## About Examples

In the examples below, the values used should be replaced with your own values to match your installation:

* Fully qualified domain name: `ssl.example.com`
* Password: `changeit`
* Email address: `yourname@example.com`
* Server path : `C:\\red5pro`

The `alias` for your domain certificate, specified below as `tomcat` should remain as-is or you will need to modify the steps and server configuration to recognize your selected alternate alias value.

## Values that will be added to Windows path

The following variables will need to be added to the Windows path (assuming default locations; the actual directory paths may vary with your system):

* For OpenSSL: `C:\\Program Files\\OpenSSL-Win64\\bin`
* For Let's Encrypt: `C:\\le64` (assumes you moved the extracted LE download to the `C:\\` root directory)
* For running `keytool`: The JRE/JDK bin directory path - e.g. `C:\\Program Files\\Java\\jdk-11.0.11-x64\\bin`

---

## Installing OpenSSL

OpenSSL is the prime component of SSL. It is used to generate a RSA keys which is then used in CSR generation.This is the first prerequisite to install on the system.

There are different builds of OpenSSL available for Windows. For our example we used the 64bit build `Win64 OpenSSL v1.1.0h Light`, located at [https://slproweb.com/products/Win32OpenSSL.html](https://slproweb.com/products/Win32OpenSSL.html). *Note that Red5 Pro is not supported on 32-bit operating systems*.

Accept the default install path, and the default option to "Copy OpenSSL DLLs to: The Windows system directory." The installation summary will show the `destination location` of this program. Copy that to add to your `path` envirionment variable (adding the `bin` subfolder):

> Go to System Properties, Advanced System Settings, Environment Variables. Under System variables, find the `Path`. Edit this by adding a semi-colon to the end of the existing path, and pasting in the destination location shown (default location is `C:\\Program Files\\OpenSSL-Win64\\bin`). Click on OK to save.

Verify the OpenSSL binary is configured properly by opening a command prompt (or powershell) and typing `openssl`. If it is installed correctly, then you will see the OpenSSL prompt returned:

```text
C:\\Users\\Adminnistrator> openssl
OpenSSL>
```

[Watch Screencast](https://www.youtube.com/watch?v=QMyiwbMvJe0&index=8&list=PLJeeGomdU9L4UJpDDio0Q3ABcTynyfvDo&vq=hd720)

# Installing Letsencrypt Windows Client

The next critical component is letsencrypt client (unofficial) for Windows.This little utility helps os requesting and generating a free SSL certificate using the letsencrypt CA.

Download and extract `le64.zip` from [64 bit letsencrypt windows client](https://github.com/do-know/Crypt-LE/releases). Then extract to an accessible location on the Windows system (for example, `C:\\le64`.

> To make the executable accessible at command prompt / powershell, add the folder path of the file `le64.exe` to the Windows `path` environment variable as above for openssl. Type `le64` into a command prompt to verify. This should return a list of available parameters for the ZeroSSL client.

[Watch Screencast](https://www.youtube.com/watch?v=KYkVjb6kBew&list=PLJeeGomdU9L4UJpDDio0Q3ABcTynyfvDo&index=9&vq=hd720)

# Preparing location to store certificate related files

It is a good practice to store certs and all related files into a folder that can be identified with the domain for which they are intended. Since the Windows letsencrypt client is different from the official linux client, we need to manually create the location where the files will be stored.

Your folder structure should look resemble this : `C:\\Users\\letsencrypt\\live\\ssl.example.com`

**Note** : You cannot create folder names with dot in the name using the GUI. But you can create such folder names using command line. To create the folder use the following command in command prompt or powershell.

```sh
mkdir C:\\Users\\letsencrypt\\live\\ssl.example.com
```

Navigate to the folder `C:\\Users\\letsencrypt\\live\\ssl.example.com` using the following command :

```sh
cd C:\\Users\\letsencrypt\\live\\ssl.example.com
```

# Generating account key and csr

Before you can request a certificate you need to generate an account key and a csr which are used for identifying your request. The account key is an identity whereas the domain key is the private key.

**Generate the account key**

```sh
openssl genrsa -out account.key 4096
```

**Generate the domain key**

```sh
openssl genrsa -out ssl.example.com.key 2048
```

# Getting the Certificate

Letsencrypt uses two types of domain validation methods to validate ownership of the domain name before generating the certificate.

* `HTTP verification` : Requires web server to run on port `80`. The command line utility generates some arbitrary data that need to be copied to domain root from where they are verified.This method is recommended over the Dns verification method.

* `DNS verification` : DNS records of type `TXT` need to be created and registered for the domain  with generated text content and that will be used to verify the domain ownership.

> In the remainder of this document will only discuss the HTTP verification` method.

To start certificate generation from Let’s Encrypt, substitute the `ssl.example.com` with the fully qualified domain name for your Red5 Pro server in the command below (_multiple hostnames can be supplied separated by commas_):

## Get Certificate Using HTTP Verification

**This method assumes that you have administrative access to the actual server where Red5 pro has been installed**

Edit the Red5 Pro properties file located at `{RED5_HOME}/conf/red5.properties` in notepad and change the http port from the default `5080` to `80`. This is necessary because unlike the linux installation of letsencrypt, we need to have the server running when we request the certificate. Additionally the server should be running on port `80`.

Make the following changes to your `red5.properties` file :

__Before:__

```properties
http.host=0.0.0.0
http.port=5080
```

__After:__

```properties
http.host=0.0.0.0
http.port=80
```

Now we create the letsencrypt challenge verification folder on the server. This is where the letsencrypt client will create its challenge text and the authority will verify it over http to acknowledge domain ownership. The challenge folder is created in the root of the domain such that the letsencrypt CA challenge verification can easily locate the challenge data,

While in the command prompt / powershellS, make sure you you are in the domain directory created earlier, eg: `C:\\Users\\letsencrypt\\live\\ssl.example.com`.

Create the folder path required for letsencrypt challenge data storage on the web server by executing the following command:

```sh
mkdir C:\\red5pro\\webapps\\root\\.well-known\\acme-challenge
```

Confirm that the folder was indeed created, before initiating the certificate request, using the following command.

```sh
dir C:\\red5pro\\webapps\\root\\.well-known\\acme-challenge
```

> In the above commands, replace `C:\\red5pro` with the path to your Red5 Pro installation.However for Windows running Red5 Pro from the path `C:\\red5pro` is recommended, since this avoids any potential startup problems due to unintentional long file paths on Windows.

Now we are ready to request the certificate. Start the server if it was in a stopped state, otherwise stop it and then start it if it was already running.The server will now be binding itself to port `80` for http requests.

While still in the letsencrypt domain directory - `C:\\Users\\letsencrypt\\live\\ssl.example.com`, execute the following command to make a certificate request:

```sh
le64.exe --key account.key --csr ssl.example.com.csr --csr-key ssl.example.com.key --crt ssl.example.com.crt --domains "ssl.example.com" --path C:/red5pro/webapps/root/.well-known/acme-challenge --generate-missing --unlink --live
```

At this point, the letsencrypt Windows client will generate arbitrary data at the `acme-challenge` folder and then have it verified over `http` (port `80`). If verification is successful you will see following kind of message in the console:

```aconf
2018/07/15 09:42:42 Requesting issuer's certificate.
2018/07/15 09:42:42 Saving the full certificate chain to ssl.example.in.crt
```

You should now have the following files in the destination folder `C:\\Users\\letsencrypt\\live\\ssl.example.com`:
`account.key, ssl.example.com.crt, ssl.example.com.csr and ssl.example.com.key`.

> for information: The `ssl.example.com.key` is the `privkey.pem` and the `ssl.example.com.crt` is the `fullchain.pem` file respectively when compared with the letsencrypt linux generated files.

[Watch Screencast](https://www.youtube.com/watch?v=c3Y3Bi_KMnY&index=10&list=PLJeeGomdU9L4UJpDDio0Q3ABcTynyfvDo&vq=hd720)

__Please note that these particular certificates expire after 90 days and must be renewed.__

> Alternatively, you can use ZeroSSL's web UI to obtain the certificate. See [Obtaining Certificate Through Web UI](https://zerossl.com/)

### Renewing Certificates

Official certificate [renewal instructions](https://zerossl.com/usage.html#Certificate_renewal) are provided on [zerossl.com](https://zerossl.com/).

It is important to note that, certificate renewal automation will work over `HTTP verification` only and not using `DNS verification`.

The sample command for certificate renewal:

```sh
le64.exe --key account.key --csr ssl.example.com.csr --csr-key ssl.example.com.key --crt ssl.example.com.crt --domains "ssl.example.com" --path C:\\red5pro\\webapps\\root\\.well-known\\acme-challenge --generate-missing --unlink --renew 10 --live
```

You can create your own Windows batch file and use the Windows scheduler to run the script periodically.It is important to note that while batch script make sure to specify the paths correctly. Specially when the command is run from a different directory.

## Create the Keystore

### Preparing Keytool

A keystore contains private keys and certificates with their corresponding public keys. To create a keystore & truststore, we require the java executable `keytool.exe`. The executable is already bundled with JRE/JDK installed on the system. You can locate `keytool.exe` at `C:\\Program Files\\Java\\{JRE}\\bin` (if it was installed at default path).

To make `keytool.exe` accessible at command prompt / powershell, make sure to add its folder path to the Windows `path` environment variable (as above).

### Processing certificate files

**As mentioned before**: `ssl.example.com.key` is the `privkey.pem` and the `ssl.example.com.crt` is the `fullchain.pem` file respectively when compared with the letsencrypt linux generated files. So rename them accordingly:

```cmd
mv ssl.example.com.crt fullchain.pem
mv ssl.example.com.key privkey.pem
```

> To create a keystore for [Red5 Pro](https://red5pro.net)’s embedded Tomcat, we expect to have our full certificate chain in PEM format; if you have your certificate, root, and intermediate certificates in some other format or in separate files, you’ll need to convert and consolidate them per your certificate authorities instructions.

The first step is to export our keys and certs into a PKCS12 formatted file:

> When prompted for a password, enter one and make note of it since it will be needed throughout this process.

```sh
openssl pkcs12 -export
-in C:\\Users\\letsencrypt\\live\\ssl.example.com\\fullchain.pem
-inkey C:\\Users\\letsencrypt\\live\\ssl.example.com\\privkey.pem
-out C:\\Users\\letsencrypt\\live\\ssl.example.com\\fullchain_and_key.p12
-name tomcat -password pass:changeit
```

_The command has been separated by carriage returns for clarity._

__It is important to note that the `tomcat` alias must be provided as-is.__

Now we create the Java Keystore (don’t forget to substitute your password and domain name):

```sh
keytool -importkeystore
-deststorepass changeit
-destkeypass changeit
-destkeystore C:\\Users\\letsencrypt\\live\\ssl.example.com\\keystore.jks
-srckeystore C:\\Users\\letsencrypt\\live\\ssl.example.com\\fullchain_and_key.p12
-srcstoretype PKCS12
-srcstorepass changeit
-alias tomcat
```

__You might see a PKCS12 warning in the console which can be ignored__

```aconf
Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS
12 which is an industry standard format using "keytool -importkeystore -srckeyst
ore C:\\Users\\letsencrypt\\live\\ssl.example.com\\keystore.jks -destkeystore C:\\Users
\\letsencrypt\\live\\ssl.example.com\\keystore.jks -deststoretype pkcs12".
```

## Create the Truststore

A truststore contains certificates from other parties that you expect to communicate with, or from Certificate Authorities that you trust to identify other parties.

The first step is to export the certificate that we’ll be trusting (don’t forget to substitute your password and domain name):

```sh
keytool -export -alias tomcat
-file C:\\Users\\letsencrypt\\live\\ssl.example.com\\tomcat.cer
-keystore C:\\Users\\letsencrypt\\live\\ssl.example.com\\keystore.jks
-storepass changeit -noprompt
```

_The command has been separated by carriage returns for clarity._

After we have the exported certificate, import it into the truststore:

```sh
keytool -import -trustcacerts -alias tomcat
-file C:\\Users\\letsencrypt\\live\\ssl.example.com\\tomcat.cer
-keystore C:\\Users\\letsencrypt\\live\\ssl.example.com\\truststore.jks
-storepass changeit -noprompt
```

A successful response will be: `Certificate was added to keystore.`

As a verification step, your __letsencrypt__ directory (`C:\Users\letsencrypt\live\ssl.example.com`) should contain these files:

```sh
account.key  fullchain_and_key.p12  keystore.jks  tomcat.cer
fullchain.pem  privkey.pem   truststore.jks  ssl.example.com.csr privkey.pem
```

**the `keystore.jks` and `truststore.jks` are used by Red5 Pro.**

[Watch Screencast](https://www.youtube.com/watch?v=Vix0JjeHtBY&list=PLJeeGomdU9L4UJpDDio0Q3ABcTynyfvDo&index=11&vq=hd720)

## Configure And Test Red5 Pro to run with SSL

You will next need to [configure Red5 Pro to run with SSL](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-configure-to-run-with-ssl/). Please note, for Windows, you must still use the linux path syntax, so the configuration should look like this:

```aconf
rtmps.keystorepass=changeit
rtmps.keystorefile=C:/Users/letsencrypt/live/ssl.example.com/keystore.jks
rtmps.truststorepass=changeit
rtmps.truststorefile=C:/Users/letsencrypt/live/ssl.example.com/truststore.jks
```

[Watch Screencast](https://www.youtube.com/watch?v=33wilsH61qM&list=PLJeeGomdU9L4UJpDDio0Q3ABcTynyfvDo&index=12&vq=hd720)

---

### Alternative - Obtaining Certificate Through Web UI

Alternatively you can also use the Web UI provided at [zerossl.com](https://zerossl.com/) to obtain SSL certificates.

**It is important to note that certificate generation through the webtool can be done for Windows/mac/linux without depending on a letsencrypt command line tool.**

To use the Web UI for SSL certificate generation:

* Navigate to [https://zerossl.com/](https://zerossl.com/)
* Select `Online Tools`
* Click `Start` under the `FREE SSL Certificate Wizard`
 heading.
* In the first screen enter an email address (used for renewal reminder) and the domain name for which ssl cert is required. Leave the text areas for LetsEncrypt account key and CSR empty (they will be auto generated).
* Select the ZeroSSL TOS and Let's Encrypt SA (pdf) checkboxes.
* Click `Next` to generate the `CSR`
* Click `Next` again to generate the `account key`
* Copy/download the content to your hard drive using the copy/download icons on the text area.

From here on we have two ways to verify the domain for which license is required (as mentioned earlier). The http verification method and the Dns verification method.As specified earlier we shall be discussing the `HTTP verification` method only.

* Click to select `HTTP verification` option.
* Click `Next` to proceed to the verification page.
* The HTTP verification page shows a challenge data file with specific text. You need to download the file and copy it to `{RED5_HOME}/webapps/root/.well-known/acme-challenge/` directory location.You may need to manually create the folders `.well-known` and `acme-challenge`. Refer to [Get Certificate Using HTTP Verification](#get-certificate-using-http-verification) for help on creating the directories from command line.
* Once you have placed the challenge file in the correct path, press `Next` to start the Http verification.If your verification is successful you can download the `domain key` and the `domain certificate`.

Once the certificate is generated, you can download the generated files.

> When generating certificate using the web UI, you get a total of 4 files: `account.key.txt  domain-csr.txt  domain-crt.txt  domain-key.txt`. The files `account.key.txt`, `domain-csr.txt`, `domain-crt.txt` and `domain-key.txt` should be renamed to `account.key`, `ssl.example.com.csr`, `fullchain.pem` and `privkey.pem` respectively.

* Create an accessible directory for the domain files to reside such as: `C:\\Users\\letsencrypt\\live\\ssl.example.com` (as mentioned before) and copy all the files into it.

* From here on you can proceed along the [Create the Keystore](/docs/red5-pro/users-guide/installation/ssl/red5-pro-ssl-create-keystore/) and following steps to create your keystore, truststore, import certificate into truststore and finally setup Red5 Pro to use the cert.
