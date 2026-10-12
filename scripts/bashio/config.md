---
title: "Bashio: options"
sidebarLabel: "Options"
description: "Bashio functions to read the options of your app, check them, and stop with a clear message when a required one is missing."
order: 1
modules:
  - module: config
    heading: "Options"
    intro: "Functions that read and check the options of your app."
---

These functions read the options the user set on the **Configuration** tab of your app. {{generated}}

A few things that are good to know, from the code:

- `bashio::config` does not read `/data/options.json`. It gets your options from the Supervisor API, at `/addons/self/options/config`, and caches the answer. So your script needs `SUPERVISOR_TOKEN` in its environment: start it with `#!/command/with-contenv bashio`.
- The key is a jq path, so `bashio::config 'logins[0].username'` works for nested options.
- An option that is not set returns the default you pass as the second argument, or the text `null`. A list returns one item per line. An empty string or an empty list returns nothing.
- The `require` functions log a fatal message and exit the script when the option has no value. The `suggest` functions only log a warning.
- `bashio::config.is_safe_password` accepts a password that shows up in Have I Been Pwned when the option `i_like_to_be_pwned` is `true`.

```bash
#!/command/with-contenv bashio

bashio::config.require 'username'
bashio::config.require.safe_password 'password'

port=$(bashio::config 'port' '8080')

if bashio::config.true 'ssl'; then
  bashio::config.require.ssl
fi
```

For the options themselves, how to define them and their types, see [Add options](/apps/guides/options/).
