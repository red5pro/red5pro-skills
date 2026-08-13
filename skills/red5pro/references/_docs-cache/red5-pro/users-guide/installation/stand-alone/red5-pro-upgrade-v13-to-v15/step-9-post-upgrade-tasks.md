_From: Upgrading from Red5 Pro v13 to v15_

## Step 9: Post-Upgrade Tasks

### 9.1 Monitor Performance

Monitor your server for the first 24-48 hours after upgrade:

```bash
# Watch resource usage
htop

# Monitor Red5 Pro logs
sudo tail -f /usr/local/red5pro/log/red5.log

# Check for any unusual errors
sudo journalctl -u red5pro -f
```

### 9.2 Update Monitoring/Alerts

If you have monitoring systems, update them to expect:
- Java 21 processes (not Java 11)
- New log patterns from v15
- Updated version strings in health checks

### 9.3 Update Client Applications

Inform your development team about new features in v15:
- **Conference API** in Stream Manager (if using SM 2.0)
- **SRT egress support** for new streaming workflows
- **JWT support in SimpleAuth** for enhanced security
- **Mixer image overlays** for advanced mixing scenarios
- **Improved Facebook Social Pusher** reliability

### 9.4 Test Custom Plugins (if applicable)

If you have custom Java plugins:

```bash
# Check plugin logs for compatibility issues
grep -i "plugin" /usr/local/red5pro/log/red5.log

# Look for ClassLoader or NoClassDefFoundError exceptions
grep -i "classloader\|noclassdef" /usr/local/red5pro/log/red5.log
```

If plugins fail, they may need to be recompiled for JDK 21. See [Detecting Compatibility Issues with JDK21](https://dzone.com/articles/the-pvs-studio-analyzer-detecting-potential-compat).

### 9.5 Clean Up Old Installation (Optional)

After confirming v15 is stable for 7+ days:

```bash
# Remove the old v13 installation
sudo rm -rf /usr/local/red5pro-v13-old

# Keep the backup for historical purposes
ls -lh /opt/red5pro-backups/
```

---
