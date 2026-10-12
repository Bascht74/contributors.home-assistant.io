---
title: "Bashio: Supervisor and system"
sidebarLabel: "Supervisor and system"
description: "Bashio functions that wrap the Supervisor API for the Supervisor itself, system information, updates, jobs, backups, repositories, mounts, Docker, and security."
order: 4
modules:
  - module: api
    heading: "API"
    intro: "The low-level call to the Supervisor API."
  - module: supervisor
    heading: "Supervisor"
    intro: "The Supervisor itself: version, updates, settings, logs, and resource usage."
  - module: info
    heading: "System information"
    intro: "General information about the system, from `/info`."
  - module: updates
    heading: "Updates"
    intro: "Available updates for the whole system."
  - module: jobs
    heading: "Jobs"
    intro: "Jobs the Supervisor runs, from `/jobs`."
  - module: resolution
    heading: "Resolution center"
    intro: "Issues, suggestions, and checks of the resolution center, from `/resolution`."
  - module: backups
    heading: "Backups"
    intro: "Make, restore, and inspect backups, from `/backups`."
  - module: repositories
    heading: "Repositories"
    intro: "App repositories in the store, from `/store/repositories`."
  - module: mounts
    heading: "Mounts"
    intro: "Network storage mounts, from `/mounts`."
  - module: docker
    heading: "Docker"
    intro: "Docker settings and registries, from `/docker`."
  - module: security
    heading: "Security settings"
    intro: "Security settings of the Supervisor, from `/security`."
---

These functions wrap the [Supervisor endpoints](/apps/supervisor-api/supervisor/), the [backup endpoints](/apps/supervisor-api/backups/), and the store and Docker parts of the Supervisor API. {{generated}}

Many of them need `hassio_api: true` and a role that allows the call, see {{may-call}}. `bashio::supervisor.ping` and the `bashio::info.*` functions work for every app.

The functions without arguments read one value from a cached answer of the API. The functions with a cache key and a jq filter as arguments return the whole JSON object, or the part your filter selects.

```bash
#!/command/with-contenv bashio

bashio::log.info "Running on $(bashio::info.operating_system)"
bashio::log.info "Supervisor $(bashio::supervisor.version)"
```

`bashio::api.supervisor` is the function all the others use. Call it directly for an endpoint that has no function of its own. It adds the token, checks the HTTP status, and returns the `data` part of the answer.
