---
title: Your first app
description: Build a "Hello world" app, install it on your own Home Assistant, and grow it into a small web server with options.
order: 2
---

The fastest way to understand apps is to build one. In this tutorial, you write a tiny app, install it on your own Home Assistant, and then extend it step by step. It takes about half an hour.

You need a Home Assistant installation that runs apps, which means Home Assistant OS, and a way to put files on it.

## 1. Get access to the local apps folder

The Supervisor looks for apps you build yourself in a folder called `local_apps`. Every app in there shows up in the app store under **Local apps**. To get to that folder, install one of these apps first:

- [Samba share](https://my.home-assistant.io/redirect/supervisor_app/?app=core_samba): your Home Assistant shows up as a network share on your computer, with a folder called `local_apps`. On macOS, if it does not show up, open Finder, press <kbd>Cmd</kbd> + <kbd>K</kbd>, and enter `smb://homeassistant.local`.
- [Terminal & SSH](https://my.home-assistant.io/redirect/supervisor_app/?app=core_ssh): open its web terminal, or log in over SSH, and work in `/local_apps`. For SSH, add your public key to the app configuration first, see its documentation.

## 2. Create the app

In `local_apps`, create a folder called `hello_world` with three files: `Dockerfile`, `config.yaml`, and `run.sh`.

The `Dockerfile` describes the container image of your app. It starts from the Home Assistant base image, which already contains the tools most apps need:

```dockerfile
FROM ghcr.io/home-assistant/base:3.24

# Copy the start script into the image
COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

The `config.yaml` tells the Supervisor what your app is and what it needs:

```yaml
name: "Hello world"
description: "My first real app!"
version: "1.0.0"
slug: "hello_world"
init: false
arch:
  - aarch64
  - amd64
```

The `run.sh` script runs when your app starts:

```bash
#!/command/with-contenv bashio

bashio::log.info "Hello world!"
```

> [!IMPORTANT]
> Save `run.sh` with Unix line endings (LF), not Windows line endings (CRLF). With CRLF, the script fails to start with an error that does not mention line endings at all.

A few things worth knowing about these files:

- `slug` is the ID of your app. It must be unique within the repository, and it is good practice to give the folder the same name.
- `init: false` is needed because the base image brings its own init system, S6 overlay. [Run services with S6 overlay](/apps/guides/s6-overlay/) explains why.
- The first line of `run.sh` loads [Bashio](/apps/bashio/), a library of shell functions for apps, with the environment of the container. `bashio::log.info` writes a log line with a time and a level. In step 6, you use Bashio to read options too.

## 3. Install and start your app

1. In Home Assistant, go to **Settings** > **Apps** and select **Install app**. This opens the **App store**.
2. In the top-right menu, select **Check for updates**. Refresh the page if needed.
3. A new section, **Local apps**, shows up with your app in it. Select it.
4. Select **Install**. The Supervisor now builds the image from your `Dockerfile`, which takes a moment.
5. Select **Start**, then open the **Log** tab. You see a line like `[12:34:56] INFO: Hello world!`.

### My app does not show up

First, refresh your browser with <kbd>Ctrl</kbd> + <kbd>F5</kbd> (Windows and Linux) or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> (macOS). If it is still missing, the Supervisor could not read your `config.yaml`. It is either invalid YAML, or one of the keys has a value the Supervisor does not accept.

The Supervisor logs tell you which one. Go to **Settings** > **System** > **Logs**, select **Supervisor** in the menu at the top right, and look for a line that mentions your app. Fix the problem, then select **Check for updates** in the app store again.

## 4. Serve a web page

An app that prints one line is not very useful yet. Let's turn it into a web server, using the HTTP server that comes with Python.

Install Python in the `Dockerfile`, and make `/data` the working directory. `/data` is the persistent storage of your app; more on that in a moment.

```dockerfile
FROM ghcr.io/home-assistant/base:3.24

# Install the requirements of the app
RUN apk add --no-cache python3

# The Python HTTP server serves the working directory
WORKDIR /data

COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
```

Start the server in `run.sh`:

```bash
#!/command/with-contenv bashio

bashio::log.info "Hello world!"

python3 -m http.server 8000
```

Then expose port 8000 of the container on port 8000 of the host, and raise the version:

```yaml
name: "Hello world"
description: "My first real app!"
version: "1.1.0"
slug: "hello_world"
init: false
arch:
  - aarch64
  - amd64
startup: services
ports:
  8000/tcp: 8000
```

## 5. Install the update

Because you raised `version`, Home Assistant offers an update for your app. Select **Check for updates** in the app store if you do not see it yet, then update the app. The Supervisor rebuilds the image with your changes. Did you forget to raise the version? Then uninstall and install the app again.

Start the app and open `http://homeassistant.local:8000` in your browser. You see a file listing with one file in it: `options.json`.

## 6. Add options

`options.json` holds the settings the user chose for your app. The Supervisor writes it to `/data` before your app starts. It is empty now, because your app has no options yet. Add some to `config.yaml`: `options` holds the default values, and `schema` says what type each option is.

```yaml
options:
  name: "world"
  beer: true
  year: 2017
schema:
  name: str
  beer: bool
  year: int
```

Raise the version again and update the app. The **Configuration** tab of your app now shows a form with these three options. Change one, save, and restart the app. Download `options.json` from your web server, and you see your values in it.

Your script can read the options with Bashio. Change `run.sh`:

```bash
#!/command/with-contenv bashio

name=$(bashio::config 'name')
bashio::log.info "Hello ${name}!"

if bashio::config.true 'beer'; then
  bashio::log.info "Cheers, it is $(bashio::config 'year')."
fi

python3 -m http.server 8000
```

Raise the version, update, and start the app again. The log now greets the name you set. `bashio::config` gets the options from the Supervisor, which is one reason the script starts with `with-contenv`: that gives it the token it needs to ask. The [Bashio options reference](/apps/bashio/config/) has every function for options.

## What is next

You now have the basics: a `Dockerfile`, a `config.yaml`, options, logging, and a port.

Next: [build a real app](/apps/build-a-real-app/). It walks through a complete example app, with services that start in order, options and logging with Bashio, translations, documentation, CI, and releases. That is how you set up an app other people install.

After that, [how apps work](/apps/how-apps-work/) explains what the Supervisor does with your app.

Other places to go from here:

- Show your web server inside the Home Assistant UI with [ingress](/apps/guides/ingress/), instead of opening a port.
- Copy the [example app repository](https://github.com/home-assistant/apps-example) as the start of your own. It has a build workflow, documentation files, and an AppArmor profile ready to go.
- Look up every key in the [app configuration](/apps/reference/configuration/) reference.
- Ready to help with the official apps or the tooling behind them? Continue with [contribute to the official apps](/apps/first-contribution/#2-pick-where-to-help).
