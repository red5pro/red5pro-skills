_From: Upgrading from Red5 Pro v13 to v15_

## Step 7: Test the v15 Installation

Before switching to the new installation permanently, test that it works.

### 7.1 Start Red5 Pro v15

```bash
# Start the service with the new configuration
sudo systemctl start red5pro

# Watch the logs for any errors
sudo tail -f /usr/local/red5pro-server-15.0.0/log/red5.log
```

### 7.2 Verify Startup

Check that Red5 Pro v15 started successfully:

```bash
# Check service status
sudo systemctl status red5pro

# Check that port 5080 is listening
netstat -an | grep ':5080'

# Check the process
ps aux | grep java | grep red5
```

### 7.3 Verify via Web Browser

1. Open a web browser
2. Navigate to `http://your-server-ip:5080`
3. Verify the version number shows **15.0.0** in the top-left corner
4. You should see the Red5 Pro welcome page

### 7.4 Test WebRTC (if using SSL)

If you're using WebRTC with SSL:

1. Navigate to `https://your-domain:443/webrtcexamples/`
2. Try publishing a test stream
3. Try subscribing to the test stream
4. Verify audio/video works correctly

### 7.5 Test RTMP Publishing

```bash
# Using ffmpeg (if installed)
ffmpeg -re -i test.mp4 -c:v copy -c:a copy -f flv rtmp://your-server:1935/live/test

# Then subscribe to stream "test" via webrtcexamples or another client
```

### 7.6 Check Logs for Errors

```bash
# Look for any ERROR or WARN messages
grep -i "error\|warn" /usr/local/red5pro-server-15.0.0/log/red5.log | tail -50

# Check for startup errors
grep -i "started\|failed" /usr/local/red5pro-server-15.0.0/log/red5.log | tail -20
```

---
