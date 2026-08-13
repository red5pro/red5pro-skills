---
title: File Authentication Validator
description: ""
menu_order: 9
---

The Red5 Pro File Authentication Validator is one of the default validators provided with the `simple authenticaion` plugin. It uses a simple filesystem-based datastore to validate credentials.

The validator expects the default location of the file to be `{RED5_HOME}/conf/simple-auth-plugin.credentials`. However, a different file can also be specified using the validator's configuration options as long as the format is the same.

This validator is best suited when only application connection level security is required and there is no need to handle `publishers` and `subscribers` separately.