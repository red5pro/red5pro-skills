_From: Upgrading from Red5 Pro v13 to v15_

## Step 5: Handle RTMPE Deprecation (if applicable)

**RTMPE was removed in v14.** If you were using RTMPE for secure RTMP streaming, you must migrate to RTMPS.

### 5.1 Check if RTMPE is Enabled

```bash
# In your v13 installation, check if RTMPE is configured
grep -i "rtmpe" /usr/local/red5pro/conf/red5-core.xml
```

### 5.2 Migrate to RTMPS

If RTMPE was enabled, you must switch to RTMPS. See [SSL Configuration Guide](/docs/red5-pro/users-guide/installation/ssl/) for complete setup instructions.

RTMPS requires:
1. Valid SSL certificate (keystore.jks)
2. Truststore (truststore.jks)
3. Configuration in `red5.properties` and `red5-core.xml`

---
