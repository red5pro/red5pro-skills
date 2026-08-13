_From: Upgrading from Red5 Pro v13 to v15_

## Rollback Procedure

If you encounter critical issues, you can rollback to v13.

### Rollback Steps

```bash
# 1. Stop the v15 service
sudo systemctl stop red5pro

# 2. Restore from backup
cd /usr/local
sudo rm -rf red5pro
sudo tar -xzf /opt/red5pro-backups/red5pro-v13-backup-*.tar.gz

# 3. Update service file to use Java 11
sudo nano /lib/systemd/system/red5pro.service
# Change JAVA_HOME back to Java 11 path:
# Environment=JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# 4. Reload and restart
sudo systemctl daemon-reload
sudo systemctl start red5pro

# 5. Verify
sudo systemctl status red5pro
curl http://localhost:5080
```

---
