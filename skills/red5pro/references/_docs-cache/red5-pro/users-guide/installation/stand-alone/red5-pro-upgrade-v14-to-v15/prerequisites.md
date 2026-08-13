_From: Upgrading from Red5 Pro v14 to v15_

## Prerequisites

Before beginning the upgrade, ensure you have:

1. **Access to your Red5 Pro account** at [https://account.red5.net/login](https://account.red5.net/login)
2. **Red5 Pro v15.0.0 server distribution** downloaded
3. **Valid Red5 Pro license key** (included in server download)
4. **Root or sudo access** to your server
5. **Current v14.x installation location** (typically `/usr/local/red5pro`)
6. **Backup of custom configurations** (see Backup section below)
7. **Maintenance window** - Plan for 15-30 minutes of downtime

### Quick Compatibility Check

```bash
# Verify you're running v14
curl -s http://localhost:5080 | grep -i "14\." || cat /usr/local/red5pro/log/red5.log | grep "version" | head -1

# Verify Java 21 is installed
java -version
# Should show: openjdk version "21.x.x"

# Check disk space (need ~2GB)
df -h /usr/local/
```

---
