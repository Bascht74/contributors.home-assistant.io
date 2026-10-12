---
title: Add options
description: Let users configure your app. Define options and their types, read them in your scripts, and give them translated labels.
order: 3
---

Options are the settings of your app that users change on its **Configuration** tab. You define them in `config.yaml`, the Supervisor validates what the user enters, and your app reads the result from `/data/options.json`.

## Options and schema

Two keys work together:

- `options` holds the default values. These are what a new user starts with.
- `schema` holds the type of every option. The Supervisor validates the user's input against it, and the UI builds the form from it.

```yaml
options:
  message: "Hello world"
  port: 8080
  logins:
    - username: "beer"
      password: "123456"
  log_level: "info"
schema:
  message: str
  port: port
  logins:
    - username: str
      password: password
  log_level: "list(debug|info|warning|error)"
  api_key: "str?"
```

Every key in `schema` is required, unless its type ends with `?`. Here:

- `message`, `port`, `logins`, and `log_level` are required, and have a default.
- `api_key` is optional. It has no default, so it is not in `options`.

If you give a required option no default, or a default of `null`, the user has to fill it in before the app can start. Leave optional options out of `options`, so they stay unset until the user fills them in.

Options can be nested: a list of values, a list of mappings, or a mapping. A list cannot contain another list directly.

Set `schema: false` to turn off validation completely. The app then gets the options as they are, and the UI shows no form.

## Schema types

| Type | Accepts | Form field |
| --- | --- | --- |
| `str` | Any text | Text |
| `str(min,max)` | Text with a minimum and maximum length. Leave one out for no limit, like `str(3,)` | Text |
| `password` | Text, shown hidden. Also takes `(min,max)` | Password |
| `bool` | `true` or `false` | Toggle |
| `int` | A whole number. Also takes `(min,max)`, like `int(1,10)` | Number |
| `float` | A number. Also takes `(min,max)`, like `float(0.5,)` | Number |
| `email` | An email address | Email |
| `url` | A URL | URL |
| `port` | A network port, 1 to 65535 | Number |
| `match(regex)` | Text that matches the regular expression | Text |
| `list(a\|b\|c)` | One of the listed values | Dropdown |
| `device` | The path of a device on the host | Dropdown of devices |
| `device(subsystem=tty)` | A device of that subsystem, like serial ports | Dropdown of devices |

The Supervisor checks the hash of every `password` value against the Have I Been Pwned database and warns the user if it shows up there.

## Secrets

Users can reference a secret from the `secrets.yaml` of Home Assistant instead of typing a value, with `!secret name`. The Supervisor looks it up and validates the real value. Your app receives the resolved value in `options.json`, so you do not need to do anything for this to work.

## Read the options

The Supervisor writes the validated options to `/data/options.json` every time your app starts:

```json
{
  "message": "Hello world",
  "port": 8080,
  "logins": [{ "username": "beer", "password": "123456" }],
  "log_level": "info"
}
```

In a shell script, read them with [Bashio](/apps/bashio/config/). Bashio does not read the file: it asks the Supervisor API for the same options, so start the script with `with-contenv` to give it the token it needs.

```bash
#!/command/with-contenv bashio

message=$(bashio::config 'message')
first_user=$(bashio::config 'logins[0].username')

if bashio::config.has_value 'api_key'; then
  api_key=$(bashio::config 'api_key')
fi
```

The key is a jq path, so nested options work too. In any other language, read `/data/options.json` as JSON.

Options change only when the user saves them, and the Supervisor writes the file before your app starts. So read them at startup; the user has to restart your app for new values to apply.

## Translate the options

Without translations, the form shows the raw option keys, like `log_level`. Add a translation file to give each option a readable name and a description:

```yaml
# translations/en.yaml
configuration:
  message:
    name: "Message"
    description: "The message to show in the log at startup."
  log_level:
    name: "Log level"
    description: "How much detail to write to the log."
  logins:
    name: "Logins"
    description: "The users that can log in."
    fields:
      username:
        name: "Username"
      password:
        name: "Password"
```

The keys under `configuration` match the keys of your `schema`; `fields` does the same for nested options. Add a file per language, like `nl.yaml` or `de.yaml`. The format is in [App files](/apps/reference/files/#translation-file).

## Remove an option

When you drop an option from your `schema`, users who already installed your app still have it saved. The Supervisor then logs a warning like `Option 'old_key' does not exist in the schema for My app (local_my_app)` every time it validates the options.

To clean that up, remove the option from the saved options at startup. With Bashio, `bashio::app.option` without a value deletes the key:

```bash
#!/command/with-contenv bashio

if bashio::jq.exists "$(bashio::app.options)" ".old_key"; then
  bashio::log.info "Removing old option old_key"
  bashio::app.option 'old_key'
fi
```

This calls the Supervisor API on `/addons/self/options`, which every app may use without `hassio_api`.

## Configuration files for users

Some software is easier to configure with its own configuration file than with a form. Think of a complex list the form cannot express, a binary file like a certificate, or a file the software reloads when it changes.

For these cases, map `app_config`:

```yaml
map:
  - type: app_config
    read_only: false
```

Each app then gets its own public configuration folder. Inside your container, it is at `/config`. Users find it in the `app_configs` folder (through Samba, SSH, or a file editor app), in a subfolder named after the app ID, like `app_configs/local_my_app`.

Tell users in your documentation which file to put there, or add an option with the file name. Write files to this folder too, if users need them: logs, a generated configuration, or a database to inspect. The folder is part of the backups of your app, and is removed when the app is uninstalled, if the user chooses to remove its data.
