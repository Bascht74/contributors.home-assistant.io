---
title: "Bashio: services, discovery, auth, and ingress"
sidebarLabel: "Services, discovery, auth, and ingress"
description: "Bashio functions to use and offer services like MQTT, send discovery messages to Home Assistant, check user credentials, and work with ingress."
order: 7
modules:
  - module: services
    heading: "Services"
    intro: "Use a service like MQTT or MySQL, or offer one, from `/services`."
  - module: discovery
    heading: "Discovery"
    intro: "Send discovery messages to Home Assistant, at `/discovery`."
  - module: auth
    heading: "Auth"
    intro: "Check the credentials of Home Assistant users, list the users, and reset a password, from `/auth`. Only `bashio::auth` works with `auth_api: true`. The others are account administration and need `hassio_api: true` with a [role](/apps/guides/security/#api-roles): `hassio_role: admin` to list users or reset a password, and `manager` or `admin` to clear the cache."
  - module: ingress
    heading: "Ingress"
    intro: "Ingress panels and sessions, from `/ingress`. Listing the panels needs `hassio_api: true` with `hassio_role: admin`. Creating and validating sessions only works for Home Assistant Core: with the token of an app, these calls fail. For the ingress port and URL of your own app, use the `bashio::app.ingress_*` functions on the [apps page](/apps/bashio/apps/)."
---

These functions wrap the [services, discovery, auth, and ingress endpoints](/apps/supervisor-api/services/) of the Supervisor API. {{generated}}

They need the matching permission in `config.yaml`: `services` to use or offer a service, `discovery` to send discovery messages, and `auth_api: true` to check credentials. Some auth and ingress functions need more, see their sections. How these fit together is in [Share services and discover integrations](/apps/guides/services-discovery/) and [Add a web interface with ingress](/apps/guides/ingress/).

```bash
#!/command/with-contenv bashio

if bashio::services.available 'mqtt'; then
  host=$(bashio::services 'mqtt' 'host')
  port=$(bashio::services 'mqtt' 'port')
  bashio::log.info "Using the MQTT broker at ${host}:${port}"
fi
```
