---
title: "Bashio: apps"
sidebarLabel: "Apps"
description: "Bashio functions to read and change the settings of your own app and other apps, through the Supervisor API."
order: 3
modules:
  - module: apps
    heading: "App functions"
    intro: "Read and change apps, their options, their state, and their resource usage. The `bashio::require.*` functions stop the script when protection mode is not what your app needs."
---

These functions wrap the [apps endpoints](/apps/supervisor-api/apps/) and parts of the [store endpoints](/apps/supervisor-api/store/) of the Supervisor API. {{generated}}

Most functions take the slug of an app as their first argument. Leave it out, and the function works on your own app, `self`. Your own app is always allowed; for other apps, your app needs `hassio_api: true` and a fitting role, see {{may-call}}.

```bash
#!/command/with-contenv bashio

bashio::log.info "Starting $(bashio::app.name) $(bashio::app.version)"

if bashio::var.true "$(bashio::app.update_available)"; then
  bashio::log.notice "Version $(bashio::app.version_latest) is out"
fi

port=$(bashio::app.ingress_port)
```

## Deprecated names

Bashio used to call these functions `bashio::addon.*`, `bashio::addons`, and `bashio::addons.*`. Every `bashio::app.*`, `bashio::apps`, and `bashio::apps.*` function still has an alias with the old name. The alias calls the new function and logs a warning the first time you use it. The aliases may be removed in a future release, so use the new names.
