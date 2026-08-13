_From: Upgrading from Red5 Pro v13 to v15_

## Step 2: Install Java 21

v15 **requires** Java 21. v13 used Java 11, so you must upgrade.

### 2.1 Install Java 21 (Ubuntu/Debian)

```bash
# Update package lists
sudo apt-get update

# Install OpenJDK 21
sudo apt-get install -y openjdk-21-jdk

# Verify installation
java -version
# Should show: openjdk version "21.x.x"
```

### 2.2 Install Java 21 (CentOS/RHEL)

```bash
# Update package lists
sudo yum -y update

# Install OpenJDK 21
sudo yum -y install java-21-openjdk java-21-openjdk-devel

# Verify installation
java -version
# Should show: openjdk version "21.x.x"
```

### 2.3 Update JAVA_HOME

```bash
# Find Java 21 installation path
sudo update-alternatives --config java
# Note the path, typically: /usr/lib/jvm/java-21-openjdk-amd64

# For Ubuntu, JAVA_HOME is typically:
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

# For CentOS, JAVA_HOME is typically:
export JAVA_HOME=/usr/lib/jvm/jre-21
```

**Note:** You'll update the service file with the correct JAVA_HOME in a later step.

---
