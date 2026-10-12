---
title: Services, discovery, auth, and ingress endpoints
description: Supervisor API endpoints apps use to share services like MQTT, announce themselves to Home Assistant, check user credentials, and work with ingress.
sidebarLabel: Services, discovery, auth, and ingress
order: 8
---

These endpoints are how apps work together, and with Home Assistant. Most of them need no `hassio_api` permission: what your app may do is set in its `config.yaml` instead, with `services`, `discovery`, and `auth_api`. See [services and discovery](/apps/guides/services-discovery/) for how to use them in your app.

## Services

A service is something one app provides and other apps use, like an MQTT broker. The providing app registers its connection details, and apps that need the service read them, so users do not have to type in a host name and password.

There are two services: `mqtt` and `mysql`.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/services` | List the services |
| `GET` | `/services/<service>` | Read the connection details of a service |
| `POST` | `/services/<service>` | Register as the provider of a service |
| `DELETE` | `/services/<service>` | Remove the registration of a service |

Your app needs the service in the `services` option of its configuration. What the Supervisor checks:

- Reading and registering work with any role for the service: `want`, `need`, or `provide`. Registering fails while another app is registered as the provider.
- Removing a registration needs `<service>:provide`.

In the configuration, `provide` is the role meant for the app that registers.

### `GET /services`

| Key | Type | Description |
| --- | --- | --- |
| `services` | list | A list of [service models](/apps/supervisor-api/models/#service) |

### `GET /services/<service>`

Returns the connection details the provider registered. Fails when no app provides the service.

```json
{
  "addon": "core_mosquitto",
  "host": "core-mosquitto",
  "port": 1883,
  "ssl": false,
  "protocol": "3.1.1",
  "username": "addons",
  "password": "Ahng5Ohghahy"
}
```

### `POST /services/mqtt`

Registers your app as the MQTT broker.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `host` | string | Yes | Host name of the broker |
| `port` | integer | Yes | Port of the broker |
| `username` | string | No | User name for other apps |
| `password` | string | No | Password for other apps |
| `ssl` | boolean | No | The broker uses TLS. Default `false` |
| `protocol` | string | No | `3.1` or `3.1.1`. Default `3.1.1` |

### `POST /services/mysql`

Registers your app as the MySQL server.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `host` | string | Yes | Host name of the server |
| `port` | integer | Yes | Port of the server |
| `username` | string | No | User name for other apps |
| `password` | string | No | Password for other apps |

### `DELETE /services/<service>`

Removes the registration of the service. Call it from the providing app when it stops providing the service. The Supervisor does not check which app made the registration: it removes the current one.

## Discovery

With discovery, your app tells Home Assistant it is running, and how to reach it. Home Assistant then offers to set up the matching integration. Your app may only send discovery for the integrations listed in the `discovery` option of its configuration.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/discovery` | Send a discovery message |
| `DELETE` | `/discovery/<uuid>` | Remove a discovery message |
| `GET` | `/discovery` | List the discovery messages. Only Home Assistant Core can call this |
| `GET` | `/discovery/<uuid>` | One discovery message. Only Home Assistant Core can call this |

### `POST /discovery`

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `service` | string | Yes | Domain of the integration, like `mqtt` |
| `config` | dictionary | Yes | What the integration needs to connect, like a host and port |

```json
{
  "service": "mqtt",
  "config": {
    "host": "core-mosquitto",
    "port": 1883
  }
}
```

The response has the `uuid` of the message. Keep it, so you can remove the message later.

### `DELETE /discovery/<uuid>`

Removes a discovery message. Your app can only remove its own messages.

### `GET /discovery`

| Key | Type | Description |
| --- | --- | --- |
| `discovery` | list | [Discovery models](/apps/supervisor-api/models/#discovery) of apps that are running |
| `services` | dictionary | Per integration, the slugs of the apps that can send discovery for it |

## Auth

With `auth_api: true` in its configuration, your app can check the user name and password of a Home Assistant user. Use it to let users log in to your app with their Home Assistant account.

`auth_api` only covers `/auth` itself. The other auth endpoints are account administration, and need `hassio_api: true` with a [role](/apps/guides/security/#api-roles): `admin` for `/auth/list` and `/auth/reset`, `manager` or `admin` for `/auth/cache`.

| Method | Path | Description |
| --- | --- | --- |
| `GET`, `POST` | `/auth` | Check user credentials |
| `GET` | `/auth/list` | List the users |
| `POST` | `/auth/reset` | Change the password of a user |
| `DELETE` | `/auth/cache` | Clear the credentials cache |

### `POST /auth`

Checks a user name and password. Send them in one of three ways:

- An `Authorization: Basic` header. Send your token in `X-Supervisor-Token` then.
- A JSON body with `username` and `password`.
- A form body (`application/x-www-form-urlencoded`) with `username` and `password`.

Returns success when the credentials are right, and `401` when they are not. The Supervisor caches correct credentials for a while, so Home Assistant does not get a request for every login.

Any `Authorization` header counts as the first way, so the Supervisor tries to read it as `Basic` credentials. Send your token in `X-Supervisor-Token` here, not in `Authorization: Bearer`:

```bash
curl -sSL -X POST \
  -H "X-Supervisor-Token: ${SUPERVISOR_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"username": "jane", "password": "secret"}' \
  http://supervisor/auth
```

### `GET /auth/list`

Returns the users of Home Assistant that have a user name.

| Key | Type | Description |
| --- | --- | --- |
| `users` | list | A list of [user models](/apps/supervisor-api/models/#user) |

### `POST /auth/reset`

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `username` | string | Yes | User name |
| `password` | string | Yes | New password |

### `DELETE /auth/cache`

Clears the cache of correct credentials.

## Ingress

[Ingress](/apps/guides/ingress/) shows the web interface of your app inside Home Assistant. The Supervisor proxies the requests, so your app does not need its own login or open port. Home Assistant Core uses these endpoints to set up ingress sessions. Your app does not call them itself.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/ingress/panels` | Sidebar panels of apps that use ingress. An app needs the `admin` role |
| `POST` | `/ingress/session` | Create an ingress session. Only Home Assistant Core can call this |
| `POST` | `/ingress/validate_session` | Check an ingress session. Only Home Assistant Core can call this |

### `GET /ingress/panels`

| Key | Type | Description |
| --- | --- | --- |
| `panels` | dictionary | Per app slug, a [panel model](/apps/supervisor-api/models/#panel) |

### `POST /ingress/session`

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `user_id` | string | No | ID of the Home Assistant user. The Supervisor passes the user to the app in headers |

Returns the new session as `session`. The browser sends it to the Supervisor in the `ingress_session` cookie.

### `POST /ingress/validate_session`

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `session` | string | Yes | The session to check |

Returns success when the session is valid, and `401` when it is not.
