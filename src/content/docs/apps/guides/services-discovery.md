---
title: Share services and discover integrations
description: Offer an MQTT broker or a MySQL database to other apps, use one without asking the user for details, and let Home Assistant set up an integration for your app.
order: 7
---

The Supervisor helps apps find each other and Home Assistant find your app, so users do not have to type host names, ports, and passwords. There are two mechanisms:

- **Services**: an app that provides a service, like an MQTT broker, registers its connection details. Other apps read them.
- **Discovery**: an app tells Home Assistant it is running, and Home Assistant offers to set up the matching [integration](/glossary/integration/).

## Services

Two services are supported: `mqtt` and `mysql`. List the ones your app works with in `config.yaml`, with a role:

```yaml
services:
  - mqtt:want
```

| Role | Meaning |
| --- | --- |
| `provide` | Your app provides this service |
| `want` | Your app can use this service, but works without it |
| `need` | Your app needs this service to work |

Your app can only read or write a service it lists. Only one app can provide a service at a time.

### Use a service

Read the connection details from the Supervisor API, at `GET /services/mqtt`, or with Bashio:

```bash
#!/command/with-contenv bashio

if bashio::services.available "mqtt"; then
  mqtt_host=$(bashio::services mqtt "host")
  mqtt_port=$(bashio::services mqtt "port")
  mqtt_user=$(bashio::services mqtt "username")
  mqtt_password=$(bashio::services mqtt "password")
else
  bashio::log.warning "No MQTT broker found"
fi
```

It is good practice to also offer options for these details, so users can connect to a broker that does not run as an app.

### Provide a service

Your app registers its details with `POST /services/mqtt` when it starts, and removes them with `DELETE /services/mqtt` when it no longer provides the service. List the service with `provide` in `config.yaml`: removing a registration needs that role.

| Service | Keys |
| --- | --- |
| `mqtt` | `host` and `port` (required), `username`, `password`, `ssl` (default `false`), and `protocol` (`3.1` or `3.1.1`, the default) |
| `mysql` | `host` and `port` (required), `username`, and `password` |

With Bashio:

```bash
#!/command/with-contenv bashio

config=$(bashio::var.json \
  host "$(hostname)" \
  port "^1883" \
  username "app" \
  password "${password}")

bashio::services.publish "mqtt" "${config}"
```

Create a separate user for the apps that use your service, instead of sharing an administrator account. The official Mosquitto broker app does exactly this, and is a good example to read.

## Discovery

Discovery lets your app say "I am here, and this is how to reach me" to Home Assistant. Home Assistant then shows a discovered integration under **Settings** > **Devices & services**, and the user sets it up with one confirmation.

### Send a discovery message

List the integrations your app sends discovery for in `config.yaml`, by their domain:

```yaml
discovery:
  - adguard
```

Then, when your app has started, send a message to `POST /discovery`, with the domain as `service` and the connection details in `config`:

```bash
#!/command/with-contenv bashio

config=$(bashio::var.json \
  host "$(hostname)" \
  port "^3000")

if bashio::discovery "adguard" "${config}" > /dev/null; then
  bashio::log.info "Sent discovery information to Home Assistant"
else
  bashio::log.error "Discovery message to Home Assistant failed!"
fi
```

The Supervisor rejects a message for a domain that is not in your `discovery` list. The response contains a `uuid`, which you can use to remove the message again with `DELETE /discovery/<uuid>`. Messages of an app are removed when it is uninstalled.

### Receive it in the integration

On the Home Assistant side, the integration with that domain needs a [config flow](/glossary/config-flow/) step called `hassio`. It receives a `HassioServiceInfo` with the `config` you sent, the `name` and `slug` of your app, and the `uuid` of the message:

```python
async def async_step_hassio(
    self, discovery_info: HassioServiceInfo
) -> ConfigFlowResult:
    """Handle discovery from an app."""
    await self._async_handle_discovery_without_unique_id()
    self._config = discovery_info.config
    return await self.async_step_hassio_confirm()
```

Integrations like AdGuard Home, ESPHome, Matter, MQTT, and Z-Wave already have this step. To add discovery to a new integration, see the [Core and integrations](/core/) area.
