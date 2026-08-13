_From: Upgrading from Red5 Pro v14 to v15_

## Step 1: Backup Your Current Installation

**IMPORTANT:** Always create a backup before upgrading, even for minor updates.

### 1.1 Stop the Red5 Pro Service

```bash
# Stop the service
sudo systemctl stop red5pro

# Wait for graceful shutdown (30 seconds)
sleep 30

# Verify Red5 Pro is stopped
netstat -an | grep ':5080'
# Should return nothing
```

### 1.2 Create Backup

```bash
# Create backup directory if it doesn't exist
sudo mkdir -p /opt/red5pro-backups

# Create compressed backup with timestamp
cd /usr/local
sudo tar -czf /opt/red5pro-backups/red5pro-v14-backup-$(date +%Y%m%d-%H%M%S).tar.gz red5pro/

# Verify backup
ls -lh /opt/red5pro-backups/
```

### 1.3 Document Current Configuration (Optional)

For reference, snapshot your key settings:

```bash
cat > /tmp/red5pro-v14-config.txt <<EOF
Red5 Pro v14 Configuration - $(date)
====================================

Current Version: $(grep -i "version" /usr/local/red5pro/log/red5.log | head -1)
Java Version: $(java -version 2>&1 | head -1)
Red5 Directory: /usr/local/red5pro

Custom Webapps:
$(ls -1 /usr/local/red5pro/webapps/ | grep -v "^live$\|^root$\|^webrtcexamples$\|^streammanager$\|^inspector$\|^api$")

Service Status:
$(systemctl status red5pro | head -5)
EOF

cat /tmp/red5pro-v14-config.txt
```

---
