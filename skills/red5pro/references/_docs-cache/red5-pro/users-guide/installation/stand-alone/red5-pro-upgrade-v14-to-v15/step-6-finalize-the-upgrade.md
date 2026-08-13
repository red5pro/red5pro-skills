_From: Upgrading from Red5 Pro v14 to v15_

## Step 6: Finalize the Upgrade

Once testing confirms everything works correctly.

### 6.1 Stop the Service

```bash
sudo systemctl stop red5pro
```

### 6.2 Switch Directories

```bash
# Rename old v14 directory
sudo mv /usr/local/red5pro /usr/local/red5pro-v14-old

# Rename new v15 directory to standard name
sudo mv /usr/local/red5pro-server-15.0.0 /usr/local/red5pro
```

### 6.3 Update Service File Paths

```bash
# Edit service file
sudo nano /lib/systemd/system/red5pro.service
```

Change all paths from `/usr/local/red5pro-server-15.0.0` to `/usr/local/red5pro`:

```ini
Environment=RED5_HOME=/usr/local/red5pro
WorkingDirectory=/usr/local/red5pro
ExecStart=/usr/local/red5pro/red5pro.sh start
ExecStop=/usr/local/red5pro/red5pro.sh stop
ExecReload=/usr/local/red5pro/red5pro.sh restart
```

### 6.4 Reload and Start

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service on boot (should already be enabled)
sudo systemctl enable red5pro

# Start the service
sudo systemctl start red5pro

# Verify status
sudo systemctl status red5pro
```

### 6.5 Final Verification

```bash
# Check version via HTTP
curl -s http://localhost:5080 | grep "15.0" || echo "Check browser"

# Verify in browser
# Navigate to http://your-server-ip:5080
# Version should show 15.0.0

# Test reboot persistence (optional)
sudo reboot
# After reboot:
sudo systemctl status red5pro
```

---
