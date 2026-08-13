_From: Linux Install - JDK 8_

## Red5 Pro Installation

To install the Red5 Pro Server:

1. Download the server .zip distribution to your local machine. Make sure to login with your account on [https://account.red5.net/login](https://account.red5.net/login) and download the server from [https://account.red5.net/login](https://account.red5.net/login).
2. SFTP the server .zip distribution into the _/tmp_ directory of your server
3. Choose a location to run your instance and navigate to that directory. For this example, we’re running from _/usr/local_
    ```sh
    cd /usr/local
    ```
4. Copy the server distribution to this directory:
    ```sh
    sudo cp /tmp/red5pro-server-xxx.zip .
    ```
5. Unzip the Red5 Pro distribution in the directory:
    ```sh
    sudo unzip red5pro-server-xxx.zip
    ```
6. For ease of use, rename the Red5 Pro distribution directory to red5pro:
    ```sh
    sudo mv red5-server-xxx-release red5pro
    ```

### Your Red5 Pro Server License Key

Red5 Pro server will not function without a valid license key. As of release **3.0.0**, your `LICENSE.KEY` file will be included in your server download in the root of the Red5 Pro server directory. You can find your license key listed on your [Red5 Pro Professional account overview page](https://account.red5.net/overview).
