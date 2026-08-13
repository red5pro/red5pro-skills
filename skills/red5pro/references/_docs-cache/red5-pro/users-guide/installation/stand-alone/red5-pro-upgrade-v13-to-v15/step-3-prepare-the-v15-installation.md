_From: Upgrading from Red5 Pro v13 to v15_

## Step 3: Prepare the v15 Installation

### 3.1 Upload and Extract v15 Distribution

```bash
# Upload red5pro-server-15.0.0.zip to /tmp/ via SFTP/SCP

# Verify the file
ls -lh /tmp/red5pro-server-15.0.0.zip

# Extract to /usr/local/ (NOT into the old red5pro directory)
cd /usr/local
sudo unzip /tmp/red5pro-server-15.0.0.zip

# Verify extraction
ls -la /usr/local/red5pro-server-15.0.0/
```

### 3.2 Verify License Key

```bash
# Check that LICENSE.KEY exists in the new distribution
ls -la /usr/local/red5pro-server-15.0.0/LICENSE.KEY

# If your license has been updated, ensure it's the correct one
# You can find your license at: https://account.red5.net/overview
```

---
