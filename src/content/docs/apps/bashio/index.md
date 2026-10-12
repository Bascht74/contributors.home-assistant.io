---
title: Bashio
description: The shell function library in the app base images. How to load it, what it changes in your script, and every function it has.
order: 30
---

Bashio is a library of Bash functions for apps. It reads the options of your app, writes log messages with levels, and wraps the [Supervisor API](/apps/supervisor-api/) in more than 500 functions, so your scripts do not deal with `curl`, tokens, and `jq` themselves. It is made by [Home Assistant Community Apps](https://github.com/hassio-addons/bashio) and comes with every Home Assistant base image.

The function lists on the pages below are generated from the docblocks in its source.

## Which images have it

Both Home Assistant base images ship Bashio and S6 overlay:

- [`ghcr.io/home-assistant/base`](https://github.com/home-assistant/docker-base), and its Python, Debian, and Ubuntu variants
- [`ghcr.io/hassio-addons/base`](https://github.com/hassio-addons/app-base), the base image of Home Assistant Community Apps

Which versions an image has is in the Dockerfile of its repository. In the image, the library is in `/usr/lib/bashio`, and `/usr/bin/bashio` loads it.

Building on another image? Copy the steps from one of these Dockerfiles: they download a release of Bashio, move its `lib` folder to `/usr/lib/bashio`, and link `/usr/lib/bashio/bashio` to `/usr/bin/bashio`.

## Load Bashio

Use `bashio` as the interpreter of your script, instead of `bash`:

```bash
#!/command/with-contenv bashio

name=$(bashio::config 'name')
bashio::log.info "Hello ${name}!"
```

The `bashio` command loads the library and then runs your script with it. `with-contenv` comes from [S6 overlay](/apps/guides/s6-overlay/#the-container-environment): it gives the script the environment of the container. Bashio needs that, because it reads `SUPERVISOR_TOKEN` from it to call the Supervisor API, and even `bashio::config` gets your options from that API. Without `with-contenv`, a script that S6 starts has no token, and those calls fail.

`#!/usr/bin/with-contenv bashio` works too, in all images above: they install the links from `/usr/bin` that S6 overlay offers for older scripts. For a script that does not need the container environment, `#!/usr/bin/env bashio` is enough.

## What Bashio changes in your script

Bashio turns on strict error handling before it runs your script:

- `errexit`: the script stops when a command fails.
- `nounset`: the script stops when it uses a variable that is not set.
- `pipefail`: a pipe fails when any command in it fails, not only the last one.
- `errtrace` and `inherit_errexit`: the same rules apply inside functions and `$(...)`.

That catches mistakes early, but it also means an expected failure needs handling. A `grep` that finds nothing returns `1` and stops your script. Add `|| true`, test the command in an `if`, or use [`bashio::try`](/apps/bashio/logging/#try).

## How the functions answer

Bashio functions answer in one of two ways:

- Checks, like `bashio::config.true` or `bashio::fs.file_exists`, print nothing. They return exit status `0` for yes and `1` for no, so you use them in an `if`.
- Getters, like `bashio::config` or `bashio::app.version`, print the value. Capture it with `$(...)`.

Log messages do not mix with the value you capture. Bashio keeps a copy of the standard output when it loads, and writes log messages there. More on that in [logging](/apps/bashio/logging/).

Most functions that call the Supervisor API cache the answer in a file, in `/tmp/.bashio`. Every script in the container shares that cache. Functions that change a setting through the API, like `bashio::app.options` with a new value, clear the whole cache afterwards, so you do not read your old value back.

## Environment variables

Bashio reads these variables when it loads:

| Variable | Default | What it does |
| --- | --- | --- |
| `SUPERVISOR_TOKEN` | Empty | The token for the Supervisor API. The Supervisor sets it for every app. |
| `SUPERVISOR_API` | `http://supervisor` | The address of the Supervisor API. |
| `LOG_LEVEL` | `5` (info) | The log level, as a number from `0` (off) to `8` (all). |
| `LOG_FORMAT` | `[{TIMESTAMP}] {LEVEL}: {MESSAGE}` | The format of log messages. |
| `LOG_TIMESTAMP` | `%T` | The format of `{TIMESTAMP}`, as for the `date` command. |
| `CACHE_DIR` | `/tmp/.bashio` | Where the cache lives. |
| `HIBP_ENDPOINT` | `https://api.pwnedpasswords.com/range` | The Have I Been Pwned API for password checks. |

## Deprecated names

Apps used to be called add-ons, and so were the Bashio functions. Every `bashio::app.*`, `bashio::apps`, and `bashio::apps.*` function still has an alias with the old name: `bashio::addon.*`, `bashio::addons`, and `bashio::addons.*`. An alias calls the new function and logs a warning the first time you use it. The aliases may be removed in a future release, so use the new names in new code.

A few other old names work the same way: `hass.die_if_true` and `hass.die_if_empty` call `bashio::exit.die_if_true` and `bashio::exit.die_if_empty`, and `bashio::pwned.occurances` calls `bashio::pwned.occurrences`. Each of these logs a warning on every call.

## Functions

The functions are grouped by what they work on. Each page lists every public function of its modules, with its arguments and the description from the source.

- [Options](/apps/bashio/config/): read and check the options of your app.
- [Logging, exit, and errors](/apps/bashio/logging/): log levels, colored output, stopping a script, and `bashio::try`.
- [Apps](/apps/bashio/apps/): your own app and other apps: settings, state, ports, ingress, and resource usage.
- [Supervisor and system](/apps/bashio/supervisor/): the raw API call, the Supervisor, system information, updates, jobs, backups, repositories, mounts, Docker, and security settings.
- [Core, host, and OS](/apps/bashio/core-host-os/): Home Assistant Core, the host, Home Assistant OS, hardware, and the network.
- [Plugins](/apps/bashio/plugins/): audio, CLI, DNS, multicast, and the observer.
- [Services, discovery, auth, and ingress](/apps/bashio/services/): MQTT and other services, discovery messages, user credentials, and ingress sessions.
- [Variables, strings, files, and JSON](/apps/bashio/helpers/): helpers for values, strings, files, jq, the cache, ports, and Have I Been Pwned.

## Help and changes

Missing a function, or found a bug? Bashio has its own repository: [hassio-addons/bashio](https://github.com/hassio-addons/bashio). Its README notes that some parts of the Supervisor API have no function yet. For those, call [`bashio::api.supervisor`](/apps/bashio/supervisor/#api) directly.
