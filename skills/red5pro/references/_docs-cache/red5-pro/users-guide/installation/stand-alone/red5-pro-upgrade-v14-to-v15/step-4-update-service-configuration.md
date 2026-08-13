_From: Upgrading from Red5 Pro v14 to v15_

## Step 4: Update Service Configuration

The service file is compatible between v14 and v15, but it's good practice to use the new one.

### 4.1 Update red5pro.service

```bash
# Copy new service file
sudo cp /usr/local/red5pro-server-15.0.0/red5pro.service /lib/systemd/system/red5pro.service

# Ensure correct permissions
sudo chmod 644 /lib/systemd/system/red5pro.service

# Edit to verify/update paths
sudo nano /lib/systemd/system/red5pro.service
```

**Verify these settings:**

```ini
[Unit]
Description=Red5 Pro
Wants=network-online.target
After=network.target network-online.target

[Service]
Type=forking
User=root
LimitNOFILE=1000000

# Verify JAVA_HOME is correct for Java 21
# Ubuntu:
Environment=JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
# CentOS:
# Environment=JAVA_HOME=/usr/lib/jvm/jre-21

# Point to NEW v15 directory (temporarily)
Environment=RED5_HOME=/usr/local/red5pro-server-15.0.0

ExecStartPre=-/usr/bin/killall -q CefRenderer
WorkingDirectory=/usr/local/red5pro-server-15.0.0
ExecStart=/usr/local/red5pro-server-15.0.0/red5pro.sh start
ExecStop=/usr/local/red5pro-server-15.0.0/red5pro.sh stop
ExecReload=/usr/local/red5pro-server-15.0.0/red5pro.sh restart

[Install]
WantedBy=multi-user.target
```

### 4.2 Reload Systemd

```bash
sudo systemctl daemon-reload
```

---
