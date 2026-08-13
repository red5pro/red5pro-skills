_From: Upgrading from Red5 Pro v14 to v15_

## Post-Upgrade Tasks

### 8.1 Monitor Performance

Watch your server for the first 24-48 hours:

```bash
# Monitor resource usage
htop

# Watch logs for issues
sudo tail -f /usr/local/red5pro/log/red5.log

# Check systemd journal
sudo journalctl -u red5pro -f
```

### 8.2 Update Client Applications

Notify your development team about v15 features:
- **JWT authentication** available in SimpleAuth
- **Conference API** if using Stream Manager 2.0
- **Improved reliability** for Facebook social pusher
- **Automatic S3 retry** for recordings

### 8.3 Test Facebook Social Pusher (if applicable)

If you had issues with Facebook streaming in v14:

```bash
# Test Facebook push functionality
# This was fixed in v15
grep -i "facebook" /usr/local/red5pro/log/red5.log
```

### 8.4 Verify S3 Recording Reliability

If you use S3 for recordings:

```bash
# Record several test streams
# v15 now automatically retries failed uploads
grep -i "s3.*retry\|s3.*failed\|cloudstorage" /usr/local/red5pro/log/red5.log
```

### 8.5 Clean Up Old Installation (After 7+ Days)

Once you've confirmed v15 is stable:

```bash
# Remove old v14 directory
sudo rm -rf /usr/local/red5pro-v14-old

# Keep backup for historical purposes
ls -lh /opt/red5pro-backups/
```

---
