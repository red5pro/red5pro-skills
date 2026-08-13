_From: Upgrading from Red5 Pro v13 to v15_

## Step 8: Finalize the Upgrade

Once testing is successful, finalize the upgrade.

### 8.1 Stop the v15 Service

```bash
sudo systemctl stop red5pro
```

### 8.2 Switch to the Final Directory Structure

```bash
# Rename the old v13 directory
sudo mv /usr/local/red5pro /usr/local/red5pro-v13-old

# Rename the new v15 directory to the standard name
sudo mv /usr/local/red5pro-server-15.0.0 /usr/local/red5pro
```

### 8.3 Update Service File Paths

```bash
# Edit the service file to use the standard /usr/local/red5pro path
sudo nano /lib/systemd/system/red5pro.service
```

Change:
```ini
Environment=RED5_HOME=/usr/local/red5pro-server-15.0.0
WorkingDirectory=/usr/local/red5pro-server-15.0.0
ExecStart=/usr/local/red5pro-server-15.0.0/red5pro.sh start
ExecStop=/usr/local/red5pro-server-15.0.0/red5pro.sh stop
ExecReload=/usr/local/red5pro-server-15.0.0/red5pro.sh restart
```

To:
```ini
Environment=RED5_HOME=/usr/local/red5pro
WorkingDirectory=/usr/local/red5pro
ExecStart=/usr/local/red5pro/red5pro.sh start
ExecStop=/usr/local/red5pro/red5pro.sh stop
ExecReload=/usr/local/red5pro/red5pro.sh restart
```

### 8.4 Reload and Enable Service

```bash
# Reload systemd daemon
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable red5pro.service

# Start the service
sudo systemctl start red5pro

# Verify it's running
sudo systemctl status red5pro
```

### 8.5 Final Verification

```bash
# Verify version
curl -s http://localhost:5080 | grep -i "version" || echo "Check in browser"

# Check service is enabled
sudo systemctl is-enabled red5pro

# Verify it survives a reboot (optional)
sudo reboot
# After reboot:
sudo systemctl status red5pro
```

---
