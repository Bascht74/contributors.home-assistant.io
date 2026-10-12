---
title: Apps endpoints
description: Supervisor API endpoints for installed apps, their options, their state, and their logs.
sidebarLabel: Apps
order: 1
---

These endpoints work on apps that are installed. To browse and install apps, use the [store endpoints](/apps/supervisor-api/store/).

`<app>` is the slug of an installed app, like `core_mosquitto` or `local_hello_world`. Your app can always use `self` to mean itself. Calls to `/addons/self/...` need no extra permission, see [what your app may call](/apps/supervisor-api/#what-your-app-may-call).

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/addons` | List installed apps |
| `POST` | `/addons/reload` | Reload the app store |
| `GET` | `/addons/<app>/info` | Details of an app |
| `POST` | `/addons/<app>/options` | Change the options of an app |
| `POST` | `/addons/<app>/options/validate` | Validate options |
| `GET` | `/addons/<app>/options/config` | Read your own validated options |
| `POST` | `/addons/<app>/sys_options` | Mark an app as managed by Home Assistant |
| `POST` | `/addons/<app>/security` | Turn protection mode on or off |
| `POST` | `/addons/<app>/start` | Start an app |
| `POST` | `/addons/<app>/stop` | Stop an app |
| `POST` | `/addons/<app>/restart` | Restart an app |
| `POST` | `/addons/<app>/rebuild` | Rebuild a locally built app |
| `POST` | `/addons/<app>/uninstall` | Uninstall an app |
| `POST` | `/addons/<app>/stdin` | Write to the standard input of an app |
| `GET` | `/addons/<app>/stats` | Resource usage of an app |
| `GET` | `/addons/<app>/logs` | Logs of an app, and the other [log endpoints](/apps/supervisor-api/#log-endpoints) |
| `POST` | `/addons/<app>/install` | Older path for [store install](/apps/supervisor-api/store/#post-storeaddonsappinstall) |
| `POST` | `/addons/<app>/update` | Older path for [store update](/apps/supervisor-api/store/#post-storeaddonsappupdate) |
| `GET` | `/addons/<app>/icon` | Older path for the [store icon](/apps/supervisor-api/store/#get-storeaddonsappicon) |
| `GET` | `/addons/<app>/logo` | Older path for the [store logo](/apps/supervisor-api/store/#get-storeaddonsapplogo) |
| `GET` | `/addons/<app>/changelog` | Older path for the [store changelog](/apps/supervisor-api/store/#get-storeaddonsappchangelog) |
| `GET` | `/addons/<app>/documentation` | Older path for the [store documentation](/apps/supervisor-api/store/#get-storeaddonsappdocumentation) |

## List and reload

### `GET /addons`

Returns the installed apps.

| Key | Type | Description |
| --- | --- | --- |
| `addons` | list | A list of [app models](/apps/supervisor-api/models/#app) |

```json
{
  "addons": [
    {
      "name": "Hello world",
      "slug": "local_hello_world",
      "description": "My first real app!",
      "advanced": false,
      "stage": "stable",
      "version": "1.1.0",
      "version_latest": "1.1.0",
      "update_available": false,
      "available": true,
      "detached": false,
      "homeassistant": null,
      "state": "started",
      "repository": "local",
      "build": true,
      "url": null,
      "icon": false,
      "logo": false,
      "system_managed": false
    }
  ]
}
```

### `POST /addons/reload`

Reloads the app store: reads all repositories again and looks for new versions. Does the same as [`POST /store/reload`](/apps/supervisor-api/store/#post-storereload).

## Information and options

### `GET /addons/<app>/info`

Returns the details of an app. When the app is not installed, this falls back to the store information of the app, with `state` set to `unknown` and the default options.

| Key | Type | Description |
| --- | --- | --- |
| `name` | string | Name of the app |
| `slug` | string | Slug of the app, including the repository prefix |
| `hostname` | string | Host name of the app on the internal network |
| `dns` | list | DNS names of the app |
| `description` | string | Short description |
| `long_description` | string or null | The content of `README.md` |
| `advanced` | boolean | Deprecated, always `false` |
| `stage` | string | `stable`, `experimental`, or `deprecated` |
| `repository` | string | Slug of the repository the app comes from |
| `version` | string | Installed version |
| `version_latest` | string | Latest available version |
| `update_available` | boolean | `true` if an update is available |
| `protected` | boolean | `true` if protection mode is on |
| `rating` | integer | Security rating, from 1 to 8 |
| `boot_config` | string | Boot mode from the app configuration: `auto`, `manual`, or `manual_only` |
| `boot` | string | Boot mode set by the user: `auto` or `manual` |
| `options` | dictionary | Options of the app. Empty when another app asks, unless that app has the `manager` or `admin` role. Options can hold passwords |
| `schema` | list or null | The options schema, prepared for the options form in the UI |
| `arch` | list | Supported architectures |
| `machine` | list | Supported machine types |
| `homeassistant` | string or null | Minimum Home Assistant version |
| `url` | string or null | Website of the app |
| `detached` | boolean | `true` if the app is no longer in any repository |
| `available` | boolean | `true` if the app can run on this system |
| `build` | boolean | `true` if the app is built locally |
| `network` | dictionary or null | Port mapping, container port to host port |
| `network_description` | dictionary or null | Description per port |
| `host_network` | boolean | Uses the host network |
| `host_pid` | boolean | Uses the host PID namespace |
| `host_ipc` | boolean | Uses the host IPC namespace |
| `host_uts` | boolean | Uses the host UTS namespace |
| `host_dbus` | boolean | Has access to the host D-Bus |
| `privileged` | list | Extra Linux capabilities |
| `full_access` | boolean | Has full hardware access |
| `apparmor` | string | `disable`, `default`, or `profile` |
| `icon` | boolean | Has an icon |
| `logo` | boolean | Has a logo |
| `changelog` | boolean | Has a changelog |
| `documentation` | boolean | Has documentation |
| `stdin` | boolean | Accepts input on stdin |
| `hassio_api` | boolean | Has access to the Supervisor API |
| `hassio_role` | string | Supervisor API role |
| `auth_api` | boolean | Can check user credentials |
| `homeassistant_api` | boolean | Has access to the Home Assistant Core API proxy |
| `gpio` | boolean | Has GPIO access |
| `usb` | boolean | Has USB access |
| `uart` | boolean | Has access to serial devices |
| `kernel_modules` | boolean | Has access to kernel modules |
| `devicetree` | boolean | Has access to the device tree |
| `udev` | boolean | Has access to the udev database |
| `docker_api` | boolean | Has access to the Docker API |
| `video` | boolean | Has access to video devices |
| `audio` | boolean | Uses the audio system |
| `startup` | string | `initialize`, `system`, `services`, `application`, or `once` |
| `services` | list | Services the app provides or uses, like `mqtt:provide` |
| `discovery` | list | Integrations the app can send discovery messages for |
| `translations` | dictionary | The translation files of the app, per language |
| `ingress` | boolean | Uses ingress |
| `ingress_entry` | string or null | Ingress path of the app |
| `ingress_url` | string or null | Full ingress URL, including the entry point |
| `ingress_port` | integer or null | Port the app listens on for ingress |
| `ingress_panel` | boolean or null | `true` if the app shows in the sidebar |
| `signed` | boolean | Always `false`, image signing is not checked |
| `state` | string | `startup`, `started`, `stopped`, `unknown`, or `error` |
| `webui` | string or null | URL of the web interface, with placeholders |
| `audio_input` | string or null | Selected audio input device |
| `audio_output` | string or null | Selected audio output device |
| `auto_update` | boolean | `true` if the app updates automatically |
| `ip_address` | string | IP address on the internal network |
| `watchdog` | boolean | `true` if the watchdog is on |
| `devices` | list | Device paths mapped into the app |
| `system_managed` | boolean | `true` if Home Assistant manages the app |
| `system_managed_config_entry` | string or null | ID of the config entry that manages the app |

### `POST /addons/<app>/options`

Changes the settings of an app. Send only the keys you want to change. To reset `network`, `audio_input`, `audio_output`, or `options` to the default, send `null`.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `boot` | string | No | `auto` or `manual`. Fails when the app uses `manual_only` |
| `auto_update` | boolean | No | Update the app automatically |
| `network` | dictionary or null | No | Port mapping, like `"8000/tcp": 8000`. A `null` port disables that mapping |
| `options` | dictionary or null | No | The app options, validated against the schema of the app |
| `audio_input` | string or null | No | Audio input device |
| `audio_output` | string or null | No | Audio output device |
| `ingress_panel` | boolean | No | Show the app in the sidebar |
| `watchdog` | boolean | No | Turn the watchdog on or off |

Options can use `!secret name` to refer to an entry in the `secrets.yaml` of Home Assistant. The Supervisor stores the reference and gives the app the resolved value.

```json
{
  "boot": "manual",
  "options": {
    "name": "world",
    "beer": true
  },
  "watchdog": true
}
```

Changes to `options` take effect the next time the app starts.

### `POST /addons/<app>/options/validate`

Validates options against the schema of the app. Send the options to check as the body, or send nothing to check the stored options. Also checks passwords against known leaks when that check is on, see [`/security`](/apps/supervisor-api/supervisor/#security).

| Key | Type | Description |
| --- | --- | --- |
| `message` | string | What is wrong, or empty |
| `valid` | boolean | `true` if the options are valid |
| `pwned` | boolean or null | `true` if a password is known to be leaked, `null` if the check failed |

### `GET /addons/<app>/options/config`

Returns the options of your own app, validated, with defaults filled in and `!secret` references resolved. Only works with `self`: no app can read the rendered options of another app.

### `POST /addons/<app>/sys_options`

Marks an app as managed by Home Assistant. Only Home Assistant Core can call this.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `system_managed` | boolean | No | `true` if Home Assistant manages the app |
| `system_managed_config_entry` | string or null | No | ID of the config entry that manages the app |

### `POST /addons/<app>/security`

Turns protection mode of an app on or off. Needs the `admin` role, also when an app calls it for itself with `self`.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `protected` | boolean | No | `true` to turn protection mode on |

## Running the app

### `POST /addons/<app>/start`

Starts an app. Waits until the app is running. Fails while the Supervisor is still starting up or restoring a backup.

### `POST /addons/<app>/stop`

Stops an app.

### `POST /addons/<app>/restart`

Restarts an app. Fails while the Supervisor is still starting up or restoring a backup.

### `POST /addons/<app>/rebuild`

Builds the image of a locally built app again and restarts it.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `force` | boolean | No | Rebuild even if the app uses a prebuilt image. Default `false` |

### `POST /addons/<app>/uninstall`

Uninstalls an app.

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `remove_config` | boolean | No | Also delete the public configuration folder of the app (`app_config`). Default `false` |

### `POST /addons/<app>/stdin`

Writes the raw request body to the standard input of the app. The app needs `stdin: true` in its configuration.

## Usage and logs

### `GET /addons/<app>/stats`

Returns the resource usage of the app as a [stats model](/apps/supervisor-api/models/#stats). Add the `one_shot` query parameter to get a single quick sample. In a one-shot sample, `cpu_percent` is `null`.

```json
{
  "cpu_percent": 14.0,
  "cpu_usage": 3412000000,
  "cpu_system_usage": 98231000000000,
  "online_cpus": 4,
  "memory_usage": 288888,
  "memory_limit": 322222,
  "memory_percent": 32.4,
  "network_tx": 110,
  "network_rx": 902,
  "blk_read": 12,
  "blk_write": 27
}
```

### `GET /addons/<app>/logs`

Returns the logs of the app. The `follow`, `latest`, and `boots` variants are there too. They all work like the other [log endpoints](/apps/supervisor-api/#log-endpoints).
