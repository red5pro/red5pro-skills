_From: Upgrading from Red5 Pro v14 to v15_

## Step 5: Test the v15 Installation

Always test before finalizing the upgrade.

### 5.1 Start Red5 Pro v15

```bash
# Start the service
sudo systemctl start red5pro

# Monitor startup
sudo tail -f /usr/local/red5pro-server-15.0.0/log/red5.log
```

Watch for:
- `Server started` message
- No ERROR messages
- Plugins loaded successfully

### 5.2 Verify Service Status

```bash
# Check systemd status
sudo systemctl status red5pro

# Verify port 5080 is listening
netstat -an | grep ':5080'

# Check Java process
ps aux | grep java | grep red5
```

### 5.3 Test via Web Browser

1. Navigate to `http://your-server-ip:5080`
2. **Verify version shows 15.0.0** in the top-left corner
3. Welcome page should load without errors

### 5.4 Test Core Functionality

#### Test RTMP Publishing

```bash
# Using OBS or ffmpeg
ffmpeg -re -i test.mp4 -c:v copy -c:a copy -f flv rtmp://your-server:1935/live/teststream
```

#### Test WebRTC (if using SSL)

1. Navigate to `https://your-domain:443/webrtcexamples/`
2. Test publisher page
3. Test subscriber page
4. Verify audio/video works

#### Test API (if configured)

```bash
# Test API endpoint
curl http://your-server:5080/api/v1/admin/event/app/live
```

### 5.5 Review Logs

```bash
# Check for any errors
grep -i "error" /usr/local/red5pro-server-15.0.0/log/red5.log | tail -20

# Verify plugins loaded
grep -i "plugin" /usr/local/red5pro-server-15.0.0/log/red5.log | grep -i "loaded"

# Check for warnings
grep -i "warn" /usr/local/red5pro-server-15.0.0/log/red5.log | tail -20
```

### 5.6 Test New v15 Features (Optional)

#### Test Social Pusher (Fixed in v15)

If you use Facebook streaming:

```bash
# Test Facebook push
# This feature had issues in v14 and is now fixed in v15
grep -i "facebook\|social" /usr/local/red5pro-server-15.0.0/log/red5.log
```

#### Test S3 Recording Reliability (Improved in v15)

If you record to S3:

```bash
# Record a test stream and verify upload
# v15 now retries failed uploads automatically
grep -i "s3\|cloudstorage" /usr/local/red5pro-server-15.0.0/log/red5.log
```

---
