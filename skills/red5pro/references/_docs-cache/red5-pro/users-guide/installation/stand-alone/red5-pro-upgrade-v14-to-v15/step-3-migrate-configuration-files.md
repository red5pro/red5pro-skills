_From: Upgrading from Red5 Pro v14 to v15_

## Step 3: Migrate Configuration Files

Since v14 and v15 share the same infrastructure, configuration migration is straightforward.

**RULE:** Manually update configuration files. Do NOT copy directly (some defaults may have improved).

### 3.1 Migrate Core Configuration

#### red5.properties

```bash
# Compare the two files
diff /usr/local/red5pro/conf/red5.properties \
     /usr/local/red5pro-server-15.0.0/conf/red5.properties
```

**Migrate these common customizations:**

```properties
# Ports (if customized)
http.port=5080
https.port=443
rtmp.port=1935
rtmps.port=8443

# SSL Configuration (same as v14)
secure.enabled=true
websocket.enabled=true
rtmps.keystorepass=yourpassword
rtmps.keystorefile=/path/to/keystore.jks
rtmps.truststorepass=yourpassword
rtmps.truststorefile=/path/to/truststore.jks

# Performance settings (if customized)
http.max_threads=20
http.acceptor_thread_count=10
http.processor_cache=20
```

**Copy your customizations to the new file:**

```bash
sudo nano /usr/local/red5pro-server-15.0.0/conf/red5.properties
# Manually apply your settings
```

### 3.2 Migrate Plugin Configurations

#### WebRTC Plugin

```bash
# If you customized WebRTC settings
sudo diff /usr/local/red5pro/conf/webrtc-plugin.properties \
           /usr/local/red5pro-server-15.0.0/conf/webrtc-plugin.properties

# If differences exist, manually apply your customizations
sudo nano /usr/local/red5pro-server-15.0.0/conf/webrtc-plugin.properties
```

#### Network Configuration

```bash
# If using forced IPs or custom ICE settings
sudo diff /usr/local/red5pro/conf/network.properties \
           /usr/local/red5pro-server-15.0.0/conf/network.properties

# Manually apply customizations
sudo nano /usr/local/red5pro-server-15.0.0/conf/network.properties
```

Common network settings:
```properties
force.public.ip=your-public-ip
force.local.ip=your-private-ip
check.port.availability=true
```

#### SimpleAuth Plugin (NEW: JWT Support in v15!)

```bash
# Copy existing auth configuration
sudo cp /usr/local/red5pro/conf/simple-auth-plugin.properties \
        /usr/local/red5pro-server-15.0.0/conf/simple-auth-plugin.properties

sudo cp /usr/local/red5pro/conf/simple-auth-plugin.credentials \
        /usr/local/red5pro-server-15.0.0/conf/simple-auth-plugin.credentials
```

**NEW in v15:** JWT token support is now available. To enable JWT authentication, add to `simple-auth-plugin.properties`:

```properties
# Enable JWT support (new in v15)
jwt.enabled=true
jwt.secret=your-secret-key-here
jwt.algorithm=HS256
jwt.expiration=3600
```

See [JWT Authentication Guide](/docs/red5-pro/users-guide/authentication/) for details.

#### Cloud Storage Plugin

```bash
# If using cloud storage
sudo cp /usr/local/red5pro/conf/cloudstorage-plugin.properties \
        /usr/local/red5pro-server-15.0.0/conf/cloudstorage-plugin.properties
```

**Good news:** v15 includes automatic retry for S3 upload failures, making your recordings more reliable.

### 3.3 Migrate Cluster Configuration (if applicable)

```bash
# If using static clustering
sudo cp /usr/local/red5pro/conf/cluster.xml \
        /usr/local/red5pro-server-15.0.0/conf/cluster.xml
```

### 3.4 Migrate HLS Configuration (if customized)

```bash
# If you customized HLS settings
sudo diff /usr/local/red5pro/conf/hlsconfig.xml \
           /usr/local/red5pro-server-15.0.0/conf/hlsconfig.xml

# Apply customizations if needed
sudo nano /usr/local/red5pro-server-15.0.0/conf/hlsconfig.xml
```

### 3.5 Migrate Restreamer/SRT Configuration (if applicable)

```bash
# If using SRT restreamer
sudo cp /usr/local/red5pro/conf/restreamer-plugin.properties \
        /usr/local/red5pro-server-15.0.0/conf/restreamer-plugin.properties
```

**NEW in v15:** SRT egress support is now available for advanced streaming workflows.

### 3.6 Migrate API Configuration (if applicable)

```bash
# If using the Server API
sudo cp /usr/local/red5pro/webapps/api/WEB-INF/red5-web.properties \
        /usr/local/red5pro-server-15.0.0/webapps/api/WEB-INF/red5-web.properties

sudo cp /usr/local/red5pro/webapps/api/WEB-INF/security/hosts.txt \
        /usr/local/red5pro-server-15.0.0/webapps/api/WEB-INF/security/hosts.txt
```

### 3.7 Copy Custom Webapps

```bash
# List your custom webapps (excluding built-in ones)
ls -1 /usr/local/red5pro/webapps/ | grep -v "^live$\|^root$\|^webrtcexamples$\|^streammanager$\|^inspector$\|^api$"

# Copy each custom webapp
# Example:
sudo cp -r /usr/local/red5pro/webapps/myapp \
           /usr/local/red5pro-server-15.0.0/webapps/myapp
```

---
