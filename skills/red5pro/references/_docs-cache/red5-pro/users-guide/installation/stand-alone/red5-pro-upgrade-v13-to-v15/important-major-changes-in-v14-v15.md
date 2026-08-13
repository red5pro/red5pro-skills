_From: Upgrading from Red5 Pro v13 to v15_

## Important: Major Changes in v14/v15

Upgrading from v13 to v15 involves several critical infrastructure changes introduced in v14 and maintained in v15:

### Java Runtime Upgrade (v14+)
- **v13 uses Java 11** → **v15 requires Java 21**
- This is a **mandatory** upgrade that affects all installations
- Custom plugins must be recompiled for JDK 21 compatibility

### Tomcat Upgrade (v14+)
- **v13 uses Tomcat 8.5** → **v15 uses Tomcat 11**
- Custom webapps may need updates for Tomcat 11 compatibility
- [Tomcat Migration Guide](https://tomcat.apache.org/migration.html)

### SSL Configuration Simplification (v14+)
- **v13:** Requires editing both `red5.properties` and `jee-container.xml`
- **v15:** Only requires editing `red5.properties` (simplified)
- New properties: `secure.enabled=true` and `websocket.enabled=true`

### Removed Features
- **RTMPE removed in v14** - Use RTMPS instead
- **Shared Objects removed in v13** - No longer available

---
