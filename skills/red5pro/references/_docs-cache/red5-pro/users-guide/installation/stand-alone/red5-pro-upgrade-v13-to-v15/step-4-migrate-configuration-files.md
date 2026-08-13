_From: Upgrading from Red5 Pro v13 to v15_

## Step 4: Migrate Configuration Files

**IMPORTANT:** Do NOT copy configuration files directly from v13 to v15. The structure has changed, especially for SSL configuration. Manually update the new configuration files.

### 4.1 Migrate red5.properties

The most important configuration file changes between v13 and v15.

```bash
# Open both files side-by-side for comparison
# OLD: /usr/local/red5pro/conf/red5.properties
# NEW: /usr/local/red5pro-server-15.0.0/conf/red5.properties
```

**Common settings to migrate:**

#### Ports Configuration
```properties
# HTTP
http.host=0.0.0.0
http.port=5080
https.port=443

# RTMP
rtmp.host=0.0.0.0
rtmp.port=1935

# RTMPS (if using)
rtmps.host=0.0.0.0
rtmps.port=8443
```

#### SSL Configuration (MAJOR CHANGE in v14+)

**v13 SSL Configuration (OLD METHOD - DO NOT USE):**
```properties
# v13 required editing both red5.properties AND jee-container.xml
rtmps.keystorepass=yourpassword
rtmps.keystorefile=/path/to/keystore.jks
rtmps.truststorepass=yourpassword
rtmps.truststorefile=/path/to/truststore.jks
```

**v15 SSL Configuration (NEW METHOD):**
```properties
# In red5.properties, add these NEW properties:
secure.enabled=true
websocket.enabled=true

# Keep the existing SSL paths:
rtmps.keystorepass=yourpassword
rtmps.keystorefile=/path/to/keystore.jks
rtmps.truststorepass=yourpassword
rtmps.truststorefile=/path/to/truststore.jks
```

**Note:** In v15, you do NOT need to modify `jee-container.xml` for SSL. The `secure.enabled=true` property handles this automatically.

#### Tomcat/HTTP Settings (if customized)
```properties
# If you customized these for performance:
http.max_threads=20
http.acceptor_thread_count=10
http.processor_cache=20
http.max_headers_size=8192
http.max_keep_alive_requests=100
```

### 4.2 Migrate webrtc-plugin.properties

```bash
# Compare and migrate WebRTC settings
sudo diff /usr/local/red5pro/conf/webrtc-plugin.properties \
           /usr/local/red5pro-server-15.0.0/conf/webrtc-plugin.properties

# Common settings to check:
# - ICE server configurations
# - STUN/TURN settings
# - Port ranges
# - Codec preferences
```

### 4.3 Migrate network.properties

```bash
# If you have forced IP addresses or custom ICE settings
sudo cp /usr/local/red5pro/conf/network.properties /tmp/network.properties.v13

# Manually update the new file:
sudo nano /usr/local/red5pro-server-15.0.0/conf/network.properties
```

Common settings:
```properties
# Forced IP addresses (if needed)
force.public.ip=your-public-ip
force.local.ip=your-private-ip

# Port availability checking (if enabled)
check.port.availability=true

# OpenSSL workaround (if needed)
#crypto.override=SUNJCE
```

### 4.4 Migrate cluster.xml (if using clustering)

```bash
# If you're using static clustering
sudo cp /usr/local/red5pro/conf/cluster.xml /tmp/cluster.xml.v13

# Manually update the new file:
sudo nano /usr/local/red5pro-server-15.0.0/conf/cluster.xml
```

**Remember:** Cluster password cannot contain capital letters.

### 4.5 Migrate Authentication Configuration

```bash
# If using Simple Auth Plugin
sudo cp /usr/local/red5pro/conf/simple-auth-plugin.properties \
        /usr/local/red5pro-server-15.0.0/conf/simple-auth-plugin.properties

sudo cp /usr/local/red5pro/conf/simple-auth-plugin.credentials \
        /usr/local/red5pro-server-15.0.0/conf/simple-auth-plugin.credentials
```

**New in v15:** JWT support is now available in SimpleAuth plugin. See [JWT documentation](/docs/red5-pro/users-guide/authentication/) for details.

### 4.6 Migrate HLS Configuration

```bash
# If you customized HLS settings
sudo diff /usr/local/red5pro/conf/hlsconfig.xml \
           /usr/local/red5pro-server-15.0.0/conf/hlsconfig.xml

# Manually apply your customizations to the new file
```

### 4.7 Migrate Cloud Storage Settings

```bash
# If using cloud storage (S3, Azure, etc.)
sudo cp /usr/local/red5pro/conf/cloudstorage-plugin.properties \
        /usr/local/red5pro-server-15.0.0/conf/cloudstorage-plugin.properties
```

**Improvement in v15:** S3 uploads for recordings now retry on failures automatically.

### 4.8 Migrate API Configuration

```bash
# If using the Red5 Pro API
sudo cp /usr/local/red5pro/webapps/api/WEB-INF/red5-web.properties \
        /usr/local/red5pro-server-15.0.0/webapps/api/WEB-INF/red5-web.properties

sudo cp /usr/local/red5pro/webapps/api/WEB-INF/security/hosts.txt \
        /usr/local/red5pro-server-15.0.0/webapps/api/WEB-INF/security/hosts.txt
```

### 4.9 Migrate Custom Webapps

```bash
# Copy any custom webapps (NOT live, root, api, inspector, streammanager, webrtcexamples)
# Example for a custom webapp named "myapp":
sudo cp -r /usr/local/red5pro/webapps/myapp \
           /usr/local/red5pro-server-15.0.0/webapps/myapp
```

**WARNING:** If your custom webapp uses Tomcat-specific features, it may need updates for Tomcat 11 compatibility. See [Tomcat Migration Guide](https://tomcat.apache.org/migration.html).

---
