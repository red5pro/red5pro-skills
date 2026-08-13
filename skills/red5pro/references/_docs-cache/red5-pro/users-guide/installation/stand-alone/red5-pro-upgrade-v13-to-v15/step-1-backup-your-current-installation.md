_From: Upgrading from Red5 Pro v13 to v15_

## Step 1: Backup Your Current Installation

**CRITICAL:** Always create a complete backup before upgrading.

### 1.1 Stop the Red5 Pro Service

```bash
# If running as systemd service
sudo systemctl stop red5pro

# If running as init.d service
sudo /etc/init.d/red5pro stop

# If running manually
cd /usr/local/red5pro && sudo ./red5-shutdown.sh
```

**Wait 30-60 seconds** for the server to fully shut down.

Verify Red5 Pro is stopped:
```bash
# Should show nothing
netstat -an | grep ':5080'
```

### 1.2 Create Backup

```bash
# Create backup directory
sudo mkdir -p /opt/red5pro-backups
cd /usr/local

# Create compressed backup with timestamp
sudo tar -czf /opt/red5pro-backups/red5pro-v13-backup-$(date +%Y%m%d-%H%M%S).tar.gz red5pro/

# Verify backup was created
ls -lh /opt/red5pro-backups/
```

### 1.3 Document Your Custom Configurations

Create a reference document of your current settings:

```bash
# Create a configuration snapshot
cat > /tmp/red5pro-v13-config-notes.txt <<EOF
Red5 Pro v13 Configuration Snapshot - $(date)
================================================

JAVA_HOME: $JAVA_HOME
Red5 Pro Directory: /usr/local/red5pro

Configuration Files to Review:
- conf/red5.properties (ports, SSL settings)
- conf/jee-container.xml (Tomcat SSL configuration)
- conf/cluster.xml (if using clustering)
- conf/webrtc-plugin.properties (WebRTC settings)
- conf/simple-auth-plugin.* (authentication)
- conf/network.properties (forced IPs, ICE settings)
- conf/hlsconfig.xml (HLS configuration)
- conf/cloudstorage-plugin.properties (cloud storage)
- webapps/api/WEB-INF/red5-web.properties (API settings)
- webapps/api/WEB-INF/security/hosts.txt (API security)
- webapps/live/WEB-INF/red5-web.xml (live app settings)
- LICENSE.KEY (license file)

Custom Webapps:
$(ls -1 /usr/local/red5pro/webapps/ | grep -v "^live$\|^root$\|^webrtcexamples$\|^streammanager$\|^inspector$\|^api$")

Service Configuration:
$(systemctl status red5pro 2>/dev/null || echo "Not running as systemd service")
EOF

cat /tmp/red5pro-v13-config-notes.txt
```

---
