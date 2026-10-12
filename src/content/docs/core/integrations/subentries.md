---
title: Config subentries
description: Split a config entry into parts users add one by one, like the locations of a weather service.
sidebarLabel: Subentries
sidebarGroup: Setup and configuration
order: 5
---

A [config subentry](/glossary/config-subentry/) is a part of a config entry that users add, change, and remove on its own. Think of a weather service: the config entry holds the account, and each location you want a forecast for is a subentry. Users add subentries from the page of the config entry, without setting up the account again.

Subentries have their own flows. A subentry flow works like a [config flow](/core/integrations/config-flow/), with two differences: it only starts with the `user` or `reconfigure` step, and it supports no discovery and no reauthentication.

## Add a subentry type

Tell Home Assistant which types of subentries your config entry supports, and which flow handles each type:

```python
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigSubentryFlow,
    SubentryFlowResult,
)
from homeassistant.core import callback


class ExampleConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Example."""

    @classmethod
    @callback
    def async_get_supported_subentry_types(
        cls, config_entry: ConfigEntry
    ) -> dict[str, type[ConfigSubentryFlow]]:
        """Return the subentry types this integration supports."""
        return {"location": LocationSubentryFlow}


class LocationSubentryFlow(ConfigSubentryFlow):
    """Add and change a location."""

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> SubentryFlowResult:
        """Add a new location."""
        if user_input is not None:
            return self.async_create_entry(
                title=user_input[CONF_NAME],
                data=user_input,
                unique_id=f"{user_input[CONF_LATITUDE]}"
                f"_{user_input[CONF_LONGITUDE]}",
            )

        return self.async_show_form(
            step_id="user", data_schema=LOCATION_SCHEMA
        )
```

In a subentry flow, `self._get_entry()` returns the parent config entry. A config flow can also create subentries right away, by passing `subentries` to its own `async_create_entry`.

## Unique IDs

A subentry can have a unique ID. The same [rules as for config entries](/core/integrations/config-flow/#what-makes-a-good-unique-id) apply, except that it only needs to be unique within its config entry.

## Reconfigure a subentry

Add a `reconfigure` step to let users change an existing subentry. Home Assistant shows the option as soon as the step exists. Get the subentry with `self._get_reconfigure_subentry()`, and finish with `async_update_and_abort` or `async_update_reload_and_abort`:

```python
async def async_step_reconfigure(
    self, user_input: dict[str, Any] | None = None
) -> SubentryFlowResult:
    """Change an existing location."""
    entry = self._get_entry()
    subentry = self._get_reconfigure_subentry()

    if user_input is not None:
        return self.async_update_reload_and_abort(
            entry, subentry, data_updates=user_input
        )

    return self.async_show_form(
        step_id="reconfigure",
        data_schema=self.add_suggested_values_to_schema(
            LOCATION_SCHEMA, subentry.data
        ),
    )
```

`async_update_reload_and_abort` reloads the parent config entry. It raises an error if the entry has an update listener.

## Use subentries when setting up

Subentries are in `entry.subentries`, a mapping from subentry ID to `ConfigSubentry`, with its `subentry_type`, `title`, `data`, and `unique_id`. To get all subentries of one type, call `entry.get_subentries_of_type("location")`.

Entities and devices can belong to a subentry. Pass `config_subentry_id` when you add the entities, so they are grouped under the right subentry and removed with it:

```python
async def async_setup_entry(
    hass: HomeAssistant,
    entry: ExampleConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up a weather entity per location."""
    for subentry in entry.get_subentries_of_type("location"):
        async_add_entities(
            [ExampleWeather(entry.runtime_data, subentry)],
            config_subentry_id=subentry.subentry_id,
        )
```

## Texts and translations

The texts of a subentry flow go in `strings.json` under `config_subentries`, with one key per subentry type. Next to the usual `step`, `error`, and `abort` sections, each type needs:

- `entry_type`: what one subentry of this type is called, like "Location".
- `initiate_flow`: the labels of the buttons that start the flows. `user` is required, `reconfigure` is optional.

```json
{
  "config_subentries": {
    "location": {
      "entry_type": "Location",
      "initiate_flow": {
        "user": "Add location",
        "reconfigure": "Change location"
      },
      "step": {
        "user": {
          "title": "Add location",
          "data": {
            "name": "[%key:common::config_flow::data::name%]"
          }
        },
        "reconfigure": {
          "title": "Change location"
        }
      }
    }
  }
}
```
