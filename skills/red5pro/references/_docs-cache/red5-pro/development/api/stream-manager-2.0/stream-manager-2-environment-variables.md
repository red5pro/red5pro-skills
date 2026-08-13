---
title: Stream Manager 2.0 Environment Variables
menu_order: 10
---

## Environment Variables

Each microservice defines its own set of environment-driven properties, each of which may or may not have a default value.

The Docker compose files define the container environment, either by defining values directly, or by referring to variables from Docker's own environment, or defaults. The Docker files may ignore properties defined in any given microservice if the microservice specifies a default.

The SM 2.0 Microservices define the following environment variables and properties defaults. A property below is _OPTIONAL_ if it has a default value. In this case, you can omit from your Docker file if the default is acceptable.


### AS-Admin

* `R5AS_BOOTSTRAP_SERVERS` - default: `localhost:9092` - Address of the Kafka bootstrap server(s).
* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Maximum acceptable JWT time-to-live, in minutes.
* `R5AS_APPLICATION_PORT` - default: `8080` - Docker-internal webapp application port.
* `R5AS_APPLICATION_HOST` - default: `localhost` - Used to specify Kafka Streams APPLICATION_SERVER_CONFIG.
* `HOSTNAME` - default: `localhost` - Backup for R5AS_APPLICATION_HOST, used when R5AS_APPLICATION_HOST is empty or `localhost`.
* `R5AS_STATE_DIRECTORY` - default: `/tmp/kafka-streams` - Path to Kafka Streams state data (internal to the Docker container).
* `R5AS_WS_STATE_DIRECTORY` - default: `/tmp/kafka-streams-ws` - Path to Kafka Streams state data for WebSocket service (internal to the Docker container).
* `R5AS_TERRAFORM_QUERY_TIMEOUT` - default: `8200` - Timeout in milliseconds since last TerraformResponse was processed until the `/terraform-healthz` health check returns failure.
* `R5AS_PROCESS_NODEGROUP_CONFIG_TIMEOUT` - default: `30000` - Timeout for NodeGroupConfig processing (ms).
* `R5AS_MESSAGE_BUS_CLEAR_STREAMS` - default: `false` - Clear (delete) Kafka Streams state stores on start.
* `R5AS_REPLICATION_FACTOR` - default: `1` - Replication factor for created Kafka Topics.
* `R5AS_AUTOSCALE_PARTITIONS` - default: `2` - Number of Autoscale service Kafka partitions.
* `R5AS_CLOUD_PLATFORM_TYPE` - default: `DOCKER` - The Cloud platform type in use. Valid values are `AWS`, `AZURE`, `DO`, `DOCKER`, `GCP`, `KUBERNETES`, `LINODE`, `OCI`, `VSPHERE`, `HYPERV`, `LIBVIRT`, `STATIC`.
* `R5AS_SECURITY_PROTOCOL_CONFIG` - default: _empty/no value_ - Kafka security configuration. The security protocol to use. Valid values are `SSL`, `SASL_SSL`, or leave empty to disable.
* `R5AS_SSL_TRUSTSTORE_TYPE_CONFIG` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_TYPE_CONFIG`.
* `R5AS_SSL_CA_CERTIFICATE` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_CERTIFICATES_CONFIG`.
* `R5AS_SASL_USERNAME` - default: _empty/no value_ - Kafka security configuration. SASL username.
* `R5AS_SASL_PASSWORD` - default: _empty/no value_ - Kafka security configuration. SASL password.
* `R5AS_SASL_ENABLED_MECHANISMS` - default: _empty/no value_ - Kafka security configuration. SASL enabled mechanisms.
* `R5AS_SCHEDULE_PROCESSING_INTERVAL_MS` - default: `5000` - How often the ScheduleProcessor checks for overlay activation/deactivation (ms).
* `USAGE_SCHEDULE_MIN_PERIOD_S` - default: `300` - Minimum period duration for usage-based scheduling (seconds). Lower for test environments.
* `R5AS_WS_EXECUTOR_THREADS` - default: `10` - The maximum number of threads the WebSocket event service will use to deliver. Also, separately, the maximum number of threads that can execute WS keep-alive tasks (ping/pong). Threads are created as needed, pooled, and reused.
* `R5AS_WS_UNAUTH_IDLE_TIMEOUT_S` - default: `60` - The amount of time a newly created WebSocket will remain idle without authentication. If an authentication message has not arrived after this time, the socket is closed.
* `R5AS_WS_PING_PONG_INTERVAL_S` - default: `300` - WebSocket ping-pong interval, in seconds.
* `R5AS_WS_PONG_TIMEOUT_S` - default: `60` - WebSocket pong timeout in seconds. If the client does not respond to ping after this time, the socket is closed.

---

### AS-Auth

* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Time-to-live for generated JWTs, in minutes.
* `R5AS_AUTH_USER` - default: `admin` - The administrator username.
* `R5AS_AUTH_PASS` - default: `xyz123` - The administrator password.
* `R5AS_PROXY_USER` - default: `proxy` - The proxy user username.
* `R5AS_PROXY_PASS` - default: `123abc` - The proxy user password.

---

### AS-Autoscale

* `R5AS_APPLICATION_HOST` - default: `localhost` - Used to specify Kafka Streams APPLICATION_SERVER_CONFIG.
* `HOSTNAME` - default: `localhost` - Backup for R5AS_APPLICATION_HOST, used when R5AS_APPLICATION_HOST is empty or `localhost`.
* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Maximum acceptable JWT time-to-live, in minutes.
* `R5AS_APPLICATION_PORT` - default: `8080` - Docker-internal webapp application port.
* `R5AS_BOOTSTRAP_SERVERS` - default: `localhost:9092` - Address of the Kafka bootstrap server(s).
* `R5AS_BOOTSTRAP_SERVERS_FOR_NODES` - default: `localhost:9092` - Address of the Kafka bootstrap server(s) for created Red5Pro server instances (network nodes).
* `R5AS_AUTOCALE_EVALUATION_INTERVAL` - default: `4000` - Interval in milliseconds between NodeGroup processing. NodeGroupConfig changes will take effect on this basis.
* `R5AS_REPLICATION_FACTOR` - default: `1` - Replication factor for created Kafka Topics. This may be greater or less than R5AS_AUTOSCALE_PARTITIONS -- Kafka will distribute the partitions among the replicated servers.
* `R5AS_AUTOSCALE_PARTITIONS` - default: `2` - Number of Autoscale service Kafka partitions.
* `R5AS_NODE_REQUEST_TIMEOUT` - default: `300000` - Milliseconds. Time a node is allowed to dwell in state REQUESTED before this is determined to be a FAULT. During this time, Terraform service is communicating with the Cloud Provider to provision resources.
* `R5AS_NODE_CREATING_TIMEOUT` - default: `300000` - Milliseconds. Time a node is allowed to dwell in state CREATING before this is determined to be a FAULT. During this time, the Cloud service is starting new instances.
* `R5AS_NODE_CREATED_TIMEOUT` - default: `300000` - Milliseconds. Time a node is allowed to dwell in state CREATED before this is determined to be a FAULT. During this time, the new instance is starting up, the operating system and server applications initialize. The server establishes communication with Kafka and then sends its first ClusterNodeEvent.
* `R5AS_NODE_STARTED_TIMEOUT` - default: `300000` - Milliseconds. Time a node is allowed to dwell in state STARTED before this is determined to be a FAULT. During this time, the node has started and is establishing cluster connections.
* `R5AS_NODE_SUNSET_TIMEOUT` - default: `300000` - Milliseconds. Time a node is allowed to dwell in state SUNSET before this is determined to be a FAULT.
* `R5AS_NODE_DOOMED_TIMEOUT` - default: `300000` - Milliseconds. Time a node is allowed to dwell in state DOOMED before destruction.
* `R5AS_NODE_FAULT_TIMEOUT` - default: `-1` - Milliseconds. Time a node is allowed to dwell in state FAULT before DOOMED. `-1` = no timeout (nodes stay in FAULT indefinitely).
* `R5AS_NODE_STATUS` - default: `60000` - Node status timeout in milliseconds. Time since last ClusterNodeEvent from node before this is determined to be a FAULT.
* `R5AS_FAILED_NODE_THRESHOLD` - default: `5` - Max FAULT nodes per SubGroup-Role before ScaleRules stop processing. Prevents runaway provisioning when infrastructure is broken.
* `R5AS_AUTO_REINSTATE_FAULT_NODES` - default: `false` - If `true`, nodes in FAULT state that resume sending ClusterNodeEvents are automatically reinstated. Set `true` for production; leave `false` when diagnosing issues.
* `R5AS_STATE_DIRECTORY` - default: `/tmp/kafka-streams` - Path to Kafka Streams state data (internal to the Docker container).
* `R5AS_MESSAGE_BUS_CLEAR_STREAMS` - default: `false` - Clear (delete) Kafka Streams state stores on start.
* `R5AS_SPRINGDOC_SWAGGER_UI_ENABLED` - default: `true` - Enable Swagger UI.
* `R5AS_SECURITY_PROTOCOL_CONFIG` - default: _empty/no value_ - Kafka security configuration. The security protocol to use. Valid values are `SSL`, `SASL_SSL`, or leave empty to disable.
* `R5AS_SSL_TRUSTSTORE_TYPE_CONFIG` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_TYPE_CONFIG`.
* `R5AS_SSL_CA_CERTIFICATE` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_CERTIFICATES_CONFIG`.
* `R5AS_SASL_USERNAME` - default: _empty/no value_ - Kafka security configuration. SASL username.
* `R5AS_SASL_PASSWORD` - default: _empty/no value_ - Kafka security configuration. SASL password.
* `R5AS_SASL_ENABLED_MECHANISMS` - Kafka security configuration. SASL enabled mechanisms.

---

### AS-Terraform

* `R5AS_BOOTSTRAP_SERVERS` - default: `localhost:9092` - Address of the Kafka bootstrap server(s).
* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Maximum acceptable JWT time-to-live, in minutes.
* `R5AS_TERRAFORM_APPLICATION_PORT` - default: `9395` - HTTP port for the Terraform service.
* `R5AS_APPLICATION_HOST` - default: `localhost` - Used to specify Kafka Streams APPLICATION_SERVER_CONFIG.
* `HOSTNAME` - default: `localhost` - Backup for R5AS_APPLICATION_HOST, used when R5AS_APPLICATION_HOST is empty or `localhost`.
* `R5AS_STATE_DIRECTORY` - default: `/tmp/kafka-streams` - Path to Kafka Streams state data (internal to the Docker container).
* `R5AS_MESSAGE_BUS_CLEAR_STREAMS` - default: `false` - Clear (delete) Kafka Streams state stores on start.
* `R5AS_REPLICATION_FACTOR` - default: `1` - Replication factor for created Kafka Topics.
* `R5AS_AUTOSCALE_PARTITIONS` - default: `2` - Number of Autoscale service Kafka partitions.
* `R5AS_MAX_BATCH_SIZE` - default: `50` - Max number of Terraform operations per batch.
* `R5AS_TERRAFORM_PARALLELISM` - default: `50` - Terraform `-parallelism` flag value.
* `R5AS_TERRAFORM_SCRIPTS_BASE_PATH` - default: `/terraform` - Path to Terraform script directory inside the container.
* `R5AS_TERRAFORM_EXE` - default: `/usr/bin/terraform` - Path to Terraform executable inside the container.
* `R5AS_SECURITY_PROTOCOL_CONFIG` - default: _empty/no value_ - Kafka security configuration. The security protocol to use. Valid values are `SSL`, `SASL_SSL`, or leave empty to disable.
* `R5AS_SSL_TRUSTSTORE_TYPE_CONFIG` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_TYPE_CONFIG`.
* `R5AS_SSL_CA_CERTIFICATE` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_CERTIFICATES_CONFIG`.
* `R5AS_SASL_USERNAME` - default: _empty/no value_ - Kafka security configuration. SASL username.
* `R5AS_SASL_PASSWORD` - default: _empty/no value_ - Kafka security configuration. SASL password.
* `R5AS_SASL_ENABLED_MECHANISMS` - Kafka security configuration. SASL enabled mechanisms.

---

### AS-Proxy

* `R5AS_BOOTSTRAP_SERVERS` - default: `localhost:9092` - Address of the Kafka bootstrap server(s).
* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Maximum acceptable JWT time-to-live, in minutes.
* `R5AS_APPLICATION_PORT` - default: `8080` - Docker-internal webapp application port.
* `R5AS_APPLICATION_HOST` - default: `localhost` - Used to specify Kafka Streams APPLICATION_SERVER_CONFIG.
* `HOSTNAME` - default: `localhost` - Backup for R5AS_APPLICATION_HOST, used when R5AS_APPLICATION_HOST is empty or `localhost`.
* `R5AS_STATE_DIRECTORY` - default: `/tmp/kafka-streams` - Path to Kafka Streams state data (internal to the Docker container).
* `R5AS_MESSAGE_BUS_CLEAR_STREAMS` - default: `false` - Clear (delete) Kafka Streams state stores on start.
* `R5AS_REPLICATION_FACTOR` - default: `1` - Replication factor for created Kafka Topics.
* `R5AS_AUTOSCALE_PARTITIONS` - default: `2` - Number of Autoscale service Kafka partitions.
* `R5AS_PROXY_HTTP_REQUEST_TIMEOUT_S` - default: `60` - HTTP request timeout for proxied calls to cluster nodes (seconds).
* `R5AS_TRAEFIK_HOST` - default: `localhost` - Traefik hostname (used internally by the proxy).
* `R5AS_SECURITY_PROTOCOL_CONFIG` - default: _empty/no value_ - Kafka security configuration. The security protocol to use. Valid values are `SSL`, `SASL_SSL`, or leave empty to disable.
* `R5AS_SSL_TRUSTSTORE_TYPE_CONFIG` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_TYPE_CONFIG`.
* `R5AS_SSL_CA_CERTIFICATE` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_CERTIFICATES_CONFIG`.
* `R5AS_SASL_USERNAME` - default: _empty/no value_ - Kafka security configuration. SASL username.
* `R5AS_SASL_PASSWORD` - default: _empty/no value_ - Kafka security configuration. SASL password.
* `R5AS_SASL_ENABLED_MECHANISMS` - Kafka security configuration. SASL enabled mechanisms.

---

### AS-Streams

* `R5AS_BOOTSTRAP_SERVERS` - default: `localhost:9092` - Address of the Kafka bootstrap server(s).
* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Maximum acceptable JWT time-to-live, in minutes.
* `R5AS_APPLICATION_PORT` - default: `8080` - Docker-internal webapp application port.
* `R5AS_APPLICATION_HOST` - default: `localhost` - Used to specify Kafka Streams APPLICATION_SERVER_CONFIG.
* `HOSTNAME` - default: `localhost` - Backup for R5AS_APPLICATION_HOST, used when R5AS_APPLICATION_HOST is empty or `localhost`.
* `R5AS_STATE_DIRECTORY` - default: `/tmp/kafka-streams` - Path to Kafka Streams state data (internal to the Docker container).
* `R5AS_MESSAGE_BUS_CLEAR_STREAMS` - default: `false` - Clear (delete) Kafka Streams state stores on start.
* `R5AS_REPLICATION_FACTOR` - default: `1` - Replication factor for created Kafka Topics.
* `R5AS_AUTOSCALE_PARTITIONS` - default: `2` - Number of Autoscale service Kafka partitions.
* `R5AS_STREAM_TIMEOUT` - default: `30` - Stream timeout (seconds). Stale stream entries are cleaned up after this period.
* `R5AS_RESTREAMER_REDISTRIBUTE_SECONDS` - default: `60` - Restreamer redistribution interval (seconds).
* `R5AS_RESTREAMER_STATE_DIRECTORY` - default: `/tmp/kafka-restreamer` - Kafka Streams state directory for restreamer.
* `R5AS_RESTREAM_EXECUTOR_THREAD_COUNT` - default: `10` - Restreamer executor thread pool size.
* `R5AS_USE_PRIVATE_BACKPLANE` - default: `true` - Use private IP addresses for inter-node backplane communication.
* `R5AS_VIDEO_PACKAGER_URL_PATH` - default: `start-stream` - URL path for video packager start-stream endpoint.
* `R5AS_VIDEO_PACKAGER_PORT` - default: `5080` - Video packager HTTP port.
* `R5AS_VIDEO_PACKAGER_MONITOR_STATE_DIRECTORY` - default: `/tmp/kafka-video-packager-monitor` - State directory for video packager monitor.
* `R5AS_VIDEO_PACKAGER_MONITOR_EXECUTOR_THREAD_COUNT` - default: `4` - Video packager monitor thread count.
* `R5AS_VIDEO_PACKAGER_MONITOR_CHECK_INTERVAL_MS` - default: `5000` - Video packager monitor check interval (ms).
* `R5AS_VIDEO_PACKAGER_MONITOR_STALE_THRESHOLD_MS` - default: `15000` - Video packager monitor stale threshold (ms).
* `R5AS_CONSUMER_GROUP_INSTANCE_ID_SUFFIX` - default: _empty/no value_ - Suffix appended to consumer group instance ID. For multi-instance deployments.
* `R5AS_SECURITY_PROTOCOL_CONFIG` - default: _empty/no value_ - Kafka security configuration. The security protocol to use. Valid values are `SSL`, `SASL_SSL`, or leave empty to disable.
* `R5AS_SSL_TRUSTSTORE_TYPE_CONFIG` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_TYPE_CONFIG`.
* `R5AS_SSL_CA_CERTIFICATE` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_CERTIFICATES_CONFIG`.
* `R5AS_SASL_USERNAME` - default: _empty/no value_ - Kafka security configuration. SASL username.
* `R5AS_SASL_PASSWORD` - default: _empty/no value_ - Kafka security configuration. SASL password.
* `R5AS_SASL_ENABLED_MECHANISMS` - Kafka security configuration. SASL enabled mechanisms.

---

### AS-Conference

* `R5AS_BOOTSTRAP_SERVERS` - default: `localhost:9092` - Address of the Kafka bootstrap server(s).
* `R5AS_AUTH_SECRET` - default: `foo` - Authentication secret used to create and authenticate JWTs.
* `R5AS_AUTH_JWT_TTL_MINUTES` - default: `400` - Maximum acceptable JWT time-to-live, in minutes.
* `R5AS_APPLICATION_PORT` - default: `8080` - Docker-internal webapp application port.
* `R5AS_APPLICATION_HOST` - default: `localhost` - Used to specify Kafka Streams APPLICATION_SERVER_CONFIG.
* `HOSTNAME` - default: `localhost` - Backup for R5AS_APPLICATION_HOST, used when R5AS_APPLICATION_HOST is empty or `localhost`.
* `R5AS_STATE_DIRECTORY` - default: `/tmp/kafka-streams` - Path to Kafka Streams state data (internal to the Docker container).
* `R5AS_MESSAGE_BUS_CLEAR_STREAMS` - default: `false` - Clear (delete) Kafka Streams state stores on start.
* `R5AS_REPLICATION_FACTOR` - default: `1` - Replication factor for created Kafka Topics.
* `R5AS_AUTOSCALE_PARTITIONS` - default: `2` - Number of Autoscale service Kafka partitions.
* `R5AS_CONFERENCE_SECRET` - default: _empty/no value_ - Conference service secret.
* `R5AS_NODE_API_ACCESS_TOKEN` - default: `abc123` - Access token for node API calls.
* `R5AS_TRANSCRIPTION_ENDPOINT` - default: _empty/no value_ - Transcription service endpoint URL.
* `R5AS_CONSUMER_MAX_POLL_INTERVAL` - default: `600000` - Consumer max poll interval (ms). Conference-specific variant.
* `R5AS_GLOBAL_CONSUMER_REQUEST_TIMEOUT` - default: `300000` - Global consumer request timeout (ms).
* `R5AS_GLOBAL_CONSUMER_MAX_POLL_INTERVAL` - default: `600000` - Global consumer max poll interval (ms).
* `R5AS_GLOBAL_CONSUMER_FETCH_MAX_WAIT_TIMEOUT` - default: `1000` - Global consumer fetch max wait (ms).
* `R5AS_SECURITY_PROTOCOL_CONFIG` - default: _empty/no value_ - Kafka security configuration. The security protocol to use. Valid values are `SSL`, `SASL_SSL`, or leave empty to disable.
* `R5AS_SSL_TRUSTSTORE_TYPE_CONFIG` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_TYPE_CONFIG`.
* `R5AS_SSL_CA_CERTIFICATE` - default: _empty/no value_ - Kafka security configuration. Corresponds to `SSL_TRUSTSTORE_CERTIFICATES_CONFIG`.
* `R5AS_SASL_USERNAME` - default: _empty/no value_ - Kafka security configuration. SASL username.
* `R5AS_SASL_PASSWORD` - default: _empty/no value_ - Kafka security configuration. SASL password.
* `R5AS_SASL_ENABLED_MECHANISMS` - Kafka security configuration. SASL enabled mechanisms.

---





