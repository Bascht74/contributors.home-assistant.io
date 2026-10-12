---
title: "Bashio: variables, strings, files, and JSON"
sidebarLabel: "Variables, strings, files, and JSON"
description: "Bashio helper functions for values, strings, files, JSON with jq, the cache, network ports, and Have I Been Pwned."
order: 8
modules:
  - module: var
    heading: "Variables"
    intro: "Check values, and turn shell values into JSON."
  - module: string
    heading: "Strings"
    intro: "Change and measure strings."
  - module: fs
    heading: "Files"
    intro: "Check whether files, folders, devices, and sockets exist."
  - module: jq
    heading: "JSON"
    intro: "Query JSON with jq, and check the type of the result."
  - module: cache
    heading: "Cache"
    intro: "The file cache that the Supervisor API functions use, in `/tmp/.bashio` unless you set `CACHE_DIR`."
  - module: net
    heading: "Network"
    intro: "Wait for a TCP port to accept connections. The function returns after the timeout either way, so check the port again if your script depends on it."
  - module: pwned
    heading: "Have I Been Pwned"
    intro: "Check a password against the Have I Been Pwned database. Only the first five characters of the SHA-1 hash of the password leave the container."
---

These helpers do not call the Supervisor. They work on values, files, and JSON, and the other Bashio functions use them too. {{generated}}

The `bashio::var.*`, `bashio::fs.*`, and `bashio::jq.is*` functions are checks: they print nothing and return exit status `0` for yes, `1` for no. Use them in an `if`.

```bash
#!/command/with-contenv bashio

if ! bashio::fs.directory_exists '/data/db'; then
  mkdir -p /data/db
fi

config=$(bashio::var.json name "$(bashio::app.name)" port "^8080")
bashio::log.debug "${config}"

bashio::net.wait_for 3306 localhost 30
```

`bashio::var.json` builds a JSON object from key and value pairs. Values are strings, unless you start them with `^`: then they go in as they are, for numbers, booleans, and nested JSON.
