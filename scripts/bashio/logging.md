---
title: "Bashio: logging, exit, and errors"
sidebarLabel: "Logging, exit, and errors"
description: "Bashio functions to write log messages with levels, stop a script with an error, and run commands without stopping on the first failure."
order: 2
modules:
  - module: log
    heading: "Logging"
    intro: "Leveled log functions, colored output, and the log level."
  - module: exit
    heading: "Exit"
    intro: "Stop the script, with or without an error. `bashio::exit.nok` logs the message as fatal and exits with code `1`."
  - module: try
    heading: "Try"
    intro: "Run a command in a subshell with `errexit` on, and check afterwards whether it failed."
  - module: debug
    heading: "Debug mode"
    intro: "Checks the current log level."
  - module: trace
    heading: "Trace mode"
    intro: "Checks the current log level."
  - module: color
    heading: "Colors"
    intro: "Print the escape codes for terminal colors. The `bashio::log.<color>` functions use the same colors."
---

These functions write to the log of your app, stop a script, and help with error handling. {{generated}}

## How the log level works

Every leveled function, like `bashio::log.info`, only writes when the current log level is the same as its own level, or noisier. The levels, from quiet to noisy, are `off`, `fatal`, `error`, `warning`, `notice`, `info`, `debug`, `trace`, and `all`. The default is `info`.

Bashio reads the starting level from the `LOG_LEVEL` environment variable, as a number from `0` (`off`) to `8` (`all`). To change it from a script, call `bashio::log.level` with the name of a level:

```bash
#!/command/with-contenv bashio

if bashio::config.has_value 'log_level'; then
  bashio::log.level "$(bashio::config 'log_level')"
fi

bashio::log.debug "Only shown when the log level is debug or lower"
```

The base image of Home Assistant Community Apps does this for you: when your app has a `log_level` option, a startup service of that image writes the matching number to `LOG_LEVEL` in the container environment. The Home Assistant base images do not, so call `bashio::log.level` yourself.

Log messages go to a copy of the standard output that Bashio makes when it loads. That way, a log line inside a function does not end up in the output you capture with `$(...)`. The format is `[{TIMESTAMP}] {LEVEL}: {MESSAGE}`, and you change it with the `LOG_FORMAT` and `LOG_TIMESTAMP` environment variables.

## Errors and exit

Bashio turns on `errexit`, `errtrace`, `nounset`, and `pipefail` for your script. A command that fails, or a variable that is not set, stops the script. That is usually what you want in a startup script. When a failure is expected, handle it: add `|| true`, test the command in an `if`, or run it with `bashio::try`.
