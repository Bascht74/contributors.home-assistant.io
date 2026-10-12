---
title: Test the connection in the config flow
description: "Bronze rule test-before-configure: the config flow tests the connection before it creates the entry."
sidebarLabel: test-before-configure
sidebarGroup: Bronze
order: 18
---

This is a Bronze rule. In `quality_scale.yaml`, it is called `test-before-configure`.

Before the [config flow](/glossary/config-flow/) creates the config entry, it must test that the integration can connect with what the user entered. When the test fails, the flow shows the form again with an error that tells the user what went wrong.

## Why it matters

A config flow that accepts anything leaves the user with an integration that does not work, and no clue why. Many problems are easy to catch at this point: a typo in the IP address, a wrong port, a firewall in the way, a DNS problem, wrong credentials, or a device that is not supported. Catching them here, while the user is still looking at the form, is far friendlier than an error in the logs later.

## Example

Make a real call with the library, like fetching the device information, and map the exceptions of the library to errors on the form:

```python
async def async_step_user(
    self, user_input: dict[str, Any] | None = None
) -> ConfigFlowResult:
    """Handle a flow started by the user."""
    errors: dict[str, str] = {}
    if user_input is not None:
        client = MyClient(
            user_input[CONF_HOST], async_get_clientsession(self.hass)
        )
        try:
            await client.get_device_info()
        except MyConnectionError:
            errors["base"] = "cannot_connect"
        except MyAuthenticationError:
            errors["base"] = "invalid_auth"
        except Exception:
            LOGGER.exception("Unexpected exception")
            errors["base"] = "unknown"
        else:
            return self.async_create_entry(
                title="My integration", data=user_input
            )

    return self.async_show_form(
        step_id="user",
        data_schema=probatio.Schema({probatio.Required(CONF_HOST): str}),
        errors=errors,
    )
```

The error keys go in `strings.json`, under `config.error`. Common errors like `cannot_connect`, `invalid_auth`, and `unknown` have shared translations you can reference with `[%key:common::config_flow::error::cannot_connect%]`.

## How it is checked

- Pylint, when the rule is `done`: `home-assistant-missing-test-before-configure` warns when a config flow creates entries but shows no sign of reporting a failure: no `errors=` passed to a form, and no abort inside an `except`. OAuth2 flows are skipped, because the token exchange is the connection test.
- Whether the test makes sense for the device is checked in review.

## Exceptions

- Integrations that do not connect to a device or service, like [helpers](/glossary/helper/), have nothing to test and are exempt.
- Integrations that discover their devices at runtime, without connection details from the user (like Google Cast), are exempt.

## Related rules

- [config-flow](/core/quality-scale/config-flow/): set up from the UI with a config flow.
- [unique-config-entry](/core/quality-scale/unique-config-entry/): prevent duplicate config entries.
- [config-flow-test-coverage](/core/quality-scale/config-flow-test-coverage/): test the config flow fully.
- [discovery](/core/quality-scale/discovery/): support discovery.
- [reauthentication-flow](/core/quality-scale/reauthentication-flow/): reauthenticate from the UI.
- [reconfiguration-flow](/core/quality-scale/reconfiguration-flow/): reconfigure from the UI.
