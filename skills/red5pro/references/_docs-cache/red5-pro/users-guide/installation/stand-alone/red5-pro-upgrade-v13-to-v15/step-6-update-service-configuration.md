_From: Upgrading from Red5 Pro v13 to v15_

## Step 6: Update Service Configuration

The systemd service file must be updated for Java 21.

### 6.1 Update red5pro.service File

```bash
# Copy the new service file from the v15 distribution
sudo cp /usr/local/red5pro-server-15.0.0/red5pro.service /tmp/red5pro.service.v15

# Edit it to ensure correct paths
sudo nano /tmp/red5pro.service.v15
```

**Verify these settings in the service file:**

```ini
[Unit]
Description=Red5 Pro
Wants=network-online.target
After=network.target network-online.target

[Service]
Type=forking
User=root
LimitNOFILE=1000000

# CRITICAL: Update JAVA_HOME for Java 21
# For Ubuntu:
Environment=JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
# For CentOS:
# Environment=JAVA_HOME=/usr/lib/jvm/jre-21

# Update RED5_HOME to point to the NEW directory (initially)
Environment=RED5_HOME=/usr/local/red5pro-server-15.0.0

# Kill any orphaned CefRenderer processes
ExecStartPre=-/usr/bin/killall -q CefRenderer

# Use full paths
WorkingDirectory=/usr/local/red5pro-server-15.0.0
ExecStart=/usr/local/red5pro-server-15.0.0/red5pro.sh start
ExecStop=/usr/local/red5pro-server-15.0.0/red5pro.sh stop
ExecReload=/usr/local/red5pro-server-15.0.0/red5pro.sh restart

[Install]
WantedBy=multi-user.target
```

### 6.2 Install the Updated Service File

```bash
# Copy to systemd directory
sudo cp /tmp/red5pro.service.v15 /lib/systemd/system/red5pro.service

# Set permissions
sudo chmod 644 /lib/systemd/system/red5pro.service

# Reload systemd daemon
sudo systemctl daemon-reload
```

---
