_From: Upgrading from Red5 Pro v13 to v15_

## Prerequisites

Before beginning the upgrade, ensure you have:

1. **Access to your Red5 Pro account** at [https://account.red5.net/login](https://account.red5.net/login)
2. **Red5 Pro v15.0.0 server distribution** downloaded
3. **Valid Red5 Pro license key** (included in server download)
4. **Root or sudo access** to your server
5. **Current v13.x installation location** (typically `/usr/local/red5pro`)
6. **Backup of all custom configurations** (see Backup section below)
7. **Maintenance window** - Plan for 30-60 minutes of downtime

### System Requirements Check

Verify your system meets the requirements for v15:

```bash
# Check current Java version
java -version

# Check available disk space (need ~2GB for new installation)
df -h /usr/local/

# Check current Red5 Pro version
cat /usr/local/red5pro/red5-server.jar | grep -i "Implementation-Version" || echo "Version in welcome page"
```

---
