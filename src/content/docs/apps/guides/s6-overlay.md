---
title: Run services with S6 overlay
description: How the base images start your app with S6 overlay. Oneshot and longrun services, dependencies, finish scripts that stop the container, and the environment.
sidebarLabel: Run services with S6 overlay
order: 2
---

Every Home Assistant base image starts with [S6 overlay](https://github.com/just-containers/s6-overlay) as its init system. It is the first process in the container: it runs your setup steps, starts your programs, restarts them when they crash, and shuts everything down in order when the app stops. This guide explains how it works in an app, and how to set up your services the way [hassio-addons/app-example](https://github.com/hassio-addons/app-example) does.

All of this is about S6 overlay version 3, the version in the current base images.

## Why apps use it

An app often needs more than one process. A web interface with nginx in front of your program, a database next to it, or a step that writes a configuration file before the program starts. Docker runs one command per container. S6 overlay runs many, in the right order.

It also does what a good process 1 should do: it cleans up zombie processes, passes on signals, and gives the container a meaningful exit code. The S6 overlay project puts its policy like this: a container does one thing, and when that thing fails, the container should fail too. That fits apps well. When your container stops with an error, the watchdog of the Supervisor sees it and restarts your app.

## What the base images set up

The base images install S6 overlay and make `/init` the entrypoint. Keep that entrypoint: do not set your own `ENTRYPOINT`. To start your program, either give it as `CMD`, or add service definitions to the image. `/init` starts both, see [three ways to start your app](#three-ways-to-start-your-app).

In `config.yaml`, set `init: false`. S6 overlay must run as process 1. With the default `init: true`, Docker puts its own init process in front of it, and the container stops right away with `s6-overlay-suexec: fatal: can only run as pid 1`.

The base images also set a few environment variables for S6 overlay:

| Variable | Value in the base images | What it does |
| --- | --- | --- |
| `S6_BEHAVIOUR_IF_STAGE2_FAILS` | `2` | Stop the container when a setup step or a oneshot service fails. The S6 overlay default, `0`, carries on silently. |
| `S6_CMD_WAIT_FOR_SERVICES` | `1` | Wait for the services in `/etc/services.d` to be ready before starting the `CMD`. |
| `S6_CMD_WAIT_FOR_SERVICES_MAXTIME` | `0` | No time limit for starting the services. This is also the S6 overlay default in versions after 3.1.6.2; up to that version, it gave up after five seconds. |
| `S6_SERVICES_READYTIME` | `50` | Milliseconds to wait before checking that a service in `/etc/services.d` is ready. Only the Home Assistant base images set this one, to the S6 overlay default. |

Both the Home Assistant base images and the base image of Home Assistant Community Apps install the optional links in `/usr/bin` as well. That is why scripts with `#!/usr/bin/with-contenv` still work, next to the `#!/command/with-contenv` that S6 overlay version 3 uses.

The base image of Home Assistant Community Apps adds two oneshot services of its own: one logs a banner with the app name, version, and system when the app starts, and one sets the Bashio log level from a `log_level` option. The Home Assistant base images do not have these.

## Three ways to start your app

S6 overlay gives you three ways to run your program. Pick one.

| Way | Where | When to use it |
| --- | --- | --- |
| `CMD` | `CMD` in the `Dockerfile` | One program, and the app stops when it stops. Used in [your first app](/apps/first-app/). |
| Legacy services | `/etc/cont-init.d/` and `/etc/services.d/` | Still supported. Many existing apps use it, including [home-assistant/apps-example](https://github.com/home-assistant/apps-example). |
| s6-rc services | `/etc/s6-overlay/s6-rc.d/` | The format S6 overlay recommends. Supports dependencies between services. Used by [hassio-addons/app-example](https://github.com/hassio-addons/app-example). |

With the legacy format, executable scripts in `/etc/cont-init.d/` run one after the other, before the services start. Each folder in `/etc/services.d/` is a service with a `run` script and an optional `finish` script. That works fine for simple apps.

The rest of this guide is about the s6-rc format. It does everything the legacy format does, and you can say what starts after what.

## The s6-rc layout

Your service definitions go in the `rootfs` folder of your app, which the `Dockerfile` copies into the image with `COPY rootfs /`. This is the layout of the example app of Home Assistant Community Apps, with one setup step and two programs:

```text
rootfs/etc/s6-overlay/
├── s6-rc.d/
│   ├── init-example/
│   │   ├── dependencies.d/
│   │   │   └── base
│   │   ├── run
│   │   ├── type
│   │   └── up
│   ├── example1/
│   │   ├── dependencies.d/
│   │   │   └── init-example
│   │   ├── finish
│   │   ├── run
│   │   └── type
│   └── example2/
│       ├── dependencies.d/
│       │   └── example1
│       ├── finish
│       ├── run
│       └── type
└── user-bundles.d/
    └── user/
        └── contents.d/
            ├── example1
            ├── example2
            └── init-example
```

Each folder in `s6-rc.d` is one service. The name of the folder is the name of the service. What goes in it depends on the type of the service.

### The type file

`type` holds one word, `oneshot` or `longrun`, and a newline:

- A **oneshot** runs once and exits. Use it for setup: write a configuration file, create a folder, check the options.
- A **longrun** is a program that keeps running. S6 supervises it and starts it again when it exits.

Your main program is a longrun. Everything that has to happen before it, is a oneshot.

### A longrun service

A longrun needs a `run` script. It is executed, so it needs a shebang line and must be executable:

```bash
#!/command/with-contenv bashio
# rootfs/etc/s6-overlay/s6-rc.d/example1/run

bashio::log.info "Starting Example1..."

exec /usr/bin/example1.sh
```

Two details matter here:

- Start your program with `exec`. The program then replaces the script, so S6 supervises your program itself and not a shell around it.
- Keep your program in the foreground. A program that forks into the background exits as far as S6 can see, and S6 starts it again and again. The S6 overlay README runs nginx with `nginx -g "daemon off;"` for this reason.

A longrun can also have a `finish` script, which runs every time the program exits. See [Stop the container when a service fails](#stop-the-container-when-a-service-fails).

### A oneshot service

A oneshot needs an `up` file. This file is not a script: it holds a single command line, which S6 reads with the execline parser. The simplest way to use it is to point it at a script:

```text
/etc/s6-overlay/s6-rc.d/init-example/run
```

Then put your setup in that script, and make it executable:

```bash
#!/command/with-contenv bashio
# rootfs/etc/s6-overlay/s6-rc.d/init-example/run

bashio::log.info "Writing the configuration..."

mkdir -p /data/config
```

The name `run` for that script is only a convention of the example app. For a oneshot, S6 only looks at `up`, and an optional `down` that runs when the app stops.

If a oneshot fails, the base images stop the container, because of `S6_BEHAVIOUR_IF_STAGE2_FAILS=2`. So a oneshot is also the place to check the options: when `bashio::config.require` exits, your app stops with a clear message in the log.

### Dependencies

The `dependencies.d` folder of a service holds an empty file for every service that must be up first. In the example:

- `init-example` depends on `base`. That is a bundle of S6 overlay itself, which holds the basic setup of the container. S6 overlay recommends that every service depends on `base`, either directly or through another service. Otherwise, a service might start before the container is fully set up.
- `example1` depends on `init-example`, so it starts after the setup step is done.
- `example2` depends on `example1`.

S6 starts the services in that order. When the app stops, it stops them in reverse order: `example2` first, `base` last.

### The user bundle

A service only starts when it is in the `user` bundle. Add an empty file with the name of the service to `user-bundles.d/user/contents.d/`. Forget this, and your service is never started, without any error.

## Stop the container when a service fails

S6 starts a longrun again every time it exits. That is not always what you want. If your program crashes, it is often better to stop the whole container: the Supervisor sees that the container stopped, and if the user turned on the watchdog, it restarts the app.

To do that, add a `finish` script to the service. S6 runs it every time the program exits, with two arguments:

- `$1`: the exit code of the program, or `256` if a signal killed it.
- `$2`: the number of that signal, if there was one.

The script decides what happens next. To stop the container, it writes the exit code the container should have to `/run/s6-linux-init-container-results/exitcode`, and runs `/run/s6/basedir/bin/halt`. This is the `finish` script of the example app, a little shortened:

```bash
#!/command/with-contenv bashio
# rootfs/etc/s6-overlay/s6-rc.d/example1/finish

readonly results="/run/s6-linux-init-container-results/exitcode"
readonly exit_code_service="${1}"
readonly exit_code_signal="${2}"
exit_code_container=$(<"${results}")

bashio::log.info "Service example1 exited with code ${exit_code_service}"

if [[ "${exit_code_service}" -eq 256 ]]; then
  # Killed by a signal. Keep the exit code of the first service that failed.
  if [[ "${exit_code_container}" -eq 0 ]]; then
    echo $((128 + exit_code_signal)) > "${results}"
  fi

  # SIGTERM means the container is stopping: take everything down.
  [[ "${exit_code_signal}" -eq 15 ]] && exec /run/s6/basedir/bin/halt

elif [[ "${exit_code_service}" -ne 0 ]]; then
  # The program crashed: stop the container with its exit code.
  if [[ "${exit_code_container}" -eq 0 ]]; then
    echo "${exit_code_service}" > "${results}"
  fi

  exec /run/s6/basedir/bin/halt

else
  # A clean exit: let S6 start it again.
  bashio::log.info "Service example1 restarting..."
fi
```

The checks on `exit_code_container` keep the first exit code. When one service crashes and the others are stopped because of it, the container still exits with the code of the service that started the trouble.

A shorter version, from [home-assistant/apps-example](https://github.com/home-assistant/apps-example), only halts on a crash and lets S6 handle everything else:

```bash
#!/usr/bin/env bashio

if [[ "${1}" -ne 0 ]] && [[ "${1}" -ne 256 ]]; then
  bashio::log.warning "Halt app with exit code ${1}"
  echo "${1}" > /run/s6-linux-init-container-results/exitcode
  exec /run/s6/basedir/bin/halt
fi
```

## The container environment

S6 starts every service, and the `CMD`, with a minimal environment. The variables of the container, like `SUPERVISOR_TOKEN` and the variables from `environment` in your `config.yaml`, are kept apart. `with-contenv` loads them before it runs your script.

So start every script that talks to the Supervisor with `#!/command/with-contenv bashio`. That includes every script that reads options with [Bashio](/apps/bashio/), because `bashio::config` gets them from the Supervisor API.

A oneshot can also add a variable for the services after it. Write the value to a file named after the variable, in `/var/run/s6/container_environment/`. The base image of Home Assistant Community Apps sets `LOG_LEVEL` this way:

```bash
echo -n "${log_level}" > /var/run/s6/container_environment/LOG_LEVEL
```

Every script that starts with `with-contenv` after that sees the new value.

## Tune S6 overlay

S6 overlay reads more environment variables than the base images set. Set them with `ENV` in your `Dockerfile`. A few that are useful in apps:

| Variable | Default | What it does |
| --- | --- | --- |
| `S6_VERBOSITY` | `2` | How much S6 logs at start and stop. `1` only logs warnings and errors, `0` only errors. |
| `S6_KILL_GRACETIME` | `3000` | Milliseconds S6 waits at shutdown before it kills processes that did not stop. |
| `S6_SERVICES_GRACETIME` | `3000` | Milliseconds S6 waits for the services in `/etc/services.d` to stop. |
| `S6_KILL_FINISH_MAXTIME` | `5000` | Milliseconds a script in `/etc/cont-finish.d` may take at shutdown. |

The full list is in the [S6 overlay README](https://github.com/just-containers/s6-overlay#customizing-s6-overlay-behaviour).

## Common mistakes

- **`init: true`.** The container stops with `can only run as pid 1`. Set `init: false` in `config.yaml`.
- **Scripts that are not executable.** S6 overlay version 3 executes scripts instead of passing them to a shell. Make them executable in Git, or add `RUN chmod a+x` for them in the `Dockerfile`.
- **Windows line endings.** A script saved with CRLF line endings fails to start, often with an error that does not mention line endings at all. Save scripts with LF.
- **No `with-contenv`.** The script has no `SUPERVISOR_TOKEN`, and every Bashio call to the Supervisor fails, including `bashio::config`.
- **A service missing from the user bundle.** It never starts. Add an empty file for it to `user-bundles.d/user/contents.d/`.
- **A script in the `up` file.** `up` holds one command line. Put the script in its own file and point `up` at it.
- **A daemon that forks.** S6 thinks it exited, and starts it again. Run it in the foreground.
- **No dependency on `base`.** The service might start before the container is ready. Add `dependencies.d/base`, or depend on a service that does.
- **`host_pid: true`.** S6 overlay does not work in the PID namespace of the host.

## Learn more

- [S6 overlay README](https://github.com/just-containers/s6-overlay): the init stages, the legacy format, logging, and every environment variable.
- [s6-rc source format](https://skarnet.org/software/s6-rc/s6-rc-compile.html#source): every file a service definition can have.
- [Build a real app](/apps/build-a-real-app/): the example app of Home Assistant Community Apps, step by step.
