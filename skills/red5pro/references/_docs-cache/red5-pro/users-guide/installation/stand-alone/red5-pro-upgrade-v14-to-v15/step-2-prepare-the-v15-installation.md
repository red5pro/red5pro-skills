_From: Upgrading from Red5 Pro v14 to v15_

## Step 2: Prepare the v15 Installation

### 2.1 Upload and Extract v15 Distribution

```bash
# Upload red5pro-server-15.0.0.zip to /tmp/ via SFTP/SCP

# Verify upload
ls -lh /tmp/red5pro-server-15.0.0.zip

# Extract to /usr/local/ (NOT into the existing red5pro directory)
cd /usr/local
sudo unzip /tmp/red5pro-server-15.0.0.zip

# Verify extraction
ls -la /usr/local/red5pro-server-15.0.0/
```

### 2.2 Verify License Key

```bash
# Check LICENSE.KEY exists
ls -la /usr/local/red5pro-server-15.0.0/LICENSE.KEY

# If you have an updated license, verify it matches your account
# https://account.red5.net/overview
```

---
