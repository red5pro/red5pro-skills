_From: Upgrading from Red5 Pro v14 to v15_

## Step 7: Explore New v15 Features

Now that you've upgraded, take advantage of new features:

### 7.1 JWT Authentication (SimpleAuth Plugin)

If you want token-based authentication instead of username/password:

1. Edit `/usr/local/red5pro/conf/simple-auth-plugin.properties`
2. Add JWT configuration:
   ```properties
   jwt.enabled=true
   jwt.secret=your-secure-secret-key
   jwt.algorithm=HS256
   jwt.expiration=3600
   ```
3. Restart Red5 Pro
4. Generate JWT tokens using your secret key
5. Use tokens in publish/subscribe URLs

### 7.2 Conference API (Stream Manager 2.0)

If you're using Stream Manager 2.0, v15 includes a new Conference API:

- Multi-party video conferencing support
- Dynamic participant management
- Conference room creation and management
- See [Conference API Documentation](/docs/red5-pro/development/api/stream-manager-2-0/) for details

### 7.3 SRT Egress Support

v15 adds SRT egress capabilities:

- Stream out to SRT destinations
- Complements existing SRT ingress
- Configure in `restreamer-plugin.properties`
- See [SRT Documentation](/docs/red5-pro/users-guide/restreamer/red5-pro-restreamer-srt/) for details

### 7.4 Mixer Image Overlays

If you use the Red5 Pro Mixer:

- Add image overlays to mixed streams
- Watermarks, logos, branding
- Dynamic image composition
- See [Mixer Documentation](/docs/red5-pro/users-guide/mixer/) for details

### 7.5 Hyper-V Support

v15 is now certified for Hyper-V virtualization environments:

- Run Red5 Pro in Hyper-V VMs
- Full performance and feature support
- Same configuration as other platforms

---
