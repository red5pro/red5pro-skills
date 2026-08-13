_From: Upgrading from Red5 Pro v13 to v15_

## Troubleshooting

### Issue: Service Fails to Start

**Symptoms:**
```bash
sudo systemctl status red5pro
# Shows "failed" or "inactive"
```

**Solution:**
```bash
# Check detailed error messages
sudo journalctl -u red5pro -n 100 --no-pager

# Common issues:
# 1. Wrong JAVA_HOME path
# 2. Permission issues
# 3. Port already in use
# 4. Configuration syntax errors

# Verify JAVA_HOME
echo $JAVA_HOME
ls -la $JAVA_HOME/bin/java

# Check port availability
sudo netstat -tulpn | grep ':5080\|:1935'

# Test configuration files
grep -i "error" /usr/local/red5pro/log/red5.log
```

### Issue: WebRTC Not Working After Upgrade

**Symptoms:** Publishing/subscribing fails with ICE errors

**Solution:**
```bash
# 1. Verify SSL configuration (WebRTC requires SSL)
grep -i "secure.enabled\|websocket.enabled" /usr/local/red5pro/conf/red5.properties
# Should show:
# secure.enabled=true
# websocket.enabled=true

# 2. Verify keystore/truststore paths
ls -la /etc/letsencrypt/live/your-domain/keystore.jks
ls -la /etc/letsencrypt/live/your-domain/truststore.jks

# 3. Check WebRTC plugin is loaded
grep -i "webrtc" /usr/local/red5pro/log/red5.log | grep -i "loaded\|started"

# 4. Verify forced IPs if needed
grep -i "force\." /usr/local/red5pro/conf/network.properties
```

### Issue: Custom Webapp Not Loading

**Symptoms:** Custom webapp shows 404 or fails to load

**Solution:**
```bash
# Check if webapp was copied
ls -la /usr/local/red5pro/webapps/your-custom-app/

# Check for Tomcat 11 compatibility issues
grep -i "servlet" /usr/local/red5pro/log/red5.log

# Your webapp may need updates for Tomcat 11
# See: https://tomcat.apache.org/migration.html
```

### Issue: High CPU/Memory Usage

**Symptoms:** Server performance degraded after upgrade

**Solution:**
```bash
# 1. Check Java heap settings
ps aux | grep red5 | grep Xmx

# 2. Review optimization guide
# See: /docs/red5-pro/users-guide/optimization/red5-pro-server-optimization/

# 3. Ensure file limits are set correctly
ulimit -n
# Should show 1000000

# 4. Check for memory leaks
# Monitor for 24 hours and check if memory grows continuously
```

### Issue: RTMPS Connections Failing

**Symptoms:** RTMPS streams fail after upgrade (if you migrated from RTMPE)

**Solution:**
```bash
# 1. Verify RTMPS is enabled in red5-core.xml
grep -A 10 "rtmpsMinaIoHandler" /usr/local/red5pro/conf/red5-core.xml
# Should be uncommented

# 2. Verify RTMPS port in red5.properties
grep "rtmps.port" /usr/local/red5pro/conf/red5.properties

# 3. Test RTMPS connection
# Use SSL-enabled RTMP client to connect to rtmps://your-server:8443/live/test
```

---
