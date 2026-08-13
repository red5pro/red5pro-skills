_From: Upgrading from Red5 Pro v14 to v15_

## Troubleshooting

### Issue: Service Fails to Start

```bash
# Check detailed errors
sudo journalctl -u red5pro -n 50 --no-pager

# Common causes:
# - Configuration syntax error
# - Port already in use
# - Missing dependency

# Verify ports are free
sudo netstat -tulpn | grep ':5080\|:1935\|:443'

# Check configuration syntax
grep -i "error" /usr/local/red5pro/log/red5.log
```

### Issue: WebRTC Not Working

```bash
# Verify SSL configuration
grep -i "secure.enabled\|websocket.enabled" /usr/local/red5pro/conf/red5.properties
# Should show both as true

# Check keystore/truststore
ls -la $(grep "keystorefile" /usr/local/red5pro/conf/red5.properties | cut -d= -f2)

# Verify WebRTC plugin loaded
grep -i "webrtc.*loaded" /usr/local/red5pro/log/red5.log
```

### Issue: Cluster Not Connecting

```bash
# Check cluster.xml configuration
sudo nano /usr/local/red5pro/conf/cluster.xml

# Verify network connectivity between nodes
ping origin-ip

# Check logs for cluster errors
grep -i "cluster" /usr/local/red5pro/log/red5.log | tail -20
```

### Issue: Social Pusher Still Failing

```bash
# Check social pusher configuration
grep -i "social" /usr/local/red5pro/log/red5.log

# Verify credentials are correct
sudo nano /usr/local/red5pro/webapps/live/WEB-INF/red5-web.xml

# Test Facebook API connectivity
curl -I https://graph.facebook.com/
```

### Issue: S3 Uploads Failing

```bash
# Check cloud storage configuration
cat /usr/local/red5pro/conf/cloudstorage-plugin.properties

# Verify credentials and bucket access
# Test AWS credentials manually
aws s3 ls s3://your-bucket-name/

# Check logs for retry attempts (new in v15)
grep -i "s3.*retry\|cloudstorage.*retry" /usr/local/red5pro/log/red5.log
```

---
