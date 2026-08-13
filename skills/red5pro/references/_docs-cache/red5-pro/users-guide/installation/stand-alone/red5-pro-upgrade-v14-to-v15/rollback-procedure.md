_From: Upgrading from Red5 Pro v14 to v15_

## Rollback Procedure

If you encounter critical issues with v15, you can rollback to v14.

### Quick Rollback Steps

```bash
# 1. Stop v15
sudo systemctl stop red5pro

# 2. Restore v14 from backup
cd /usr/local
sudo rm -rf red5pro
sudo tar -xzf /opt/red5pro-backups/red5pro-v14-backup-*.tar.gz

# 3. Update service file (if needed)
sudo nano /lib/systemd/system/red5pro.service
# Ensure paths point to /usr/local/red5pro

# 4. Reload and start
sudo systemctl daemon-reload
sudo systemctl start red5pro

# 5. Verify
sudo systemctl status red5pro
curl http://localhost:5080
```

---
