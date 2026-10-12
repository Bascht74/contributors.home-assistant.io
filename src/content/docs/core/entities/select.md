---
title: Select entity
description: Build a select entity that lets people pick one option from a fixed list, like an operating mode.
sidebarLabel: Select
sidebarGroup: Inputs and helpers
---

A select entity lets people pick one option from a limited list that your integration provides, like the operating mode of a device or the sensitivity of a motion sensor. Inherit from `SelectEntity` in `homeassistant.components.select`.

Use select only when no platform fits better. The effect of a light bulb could be a select, but it belongs on the [light](/core/entities/light/) entity, which supports effects. The same goes for fan presets, climate modes, and the source of a media player.

## Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `list[str]` | Required | The options people can pick from. |
| `current_option` | `str \| None` | `None` | The option that is selected now. |

You can also set `options` on a `SelectEntityDescription`. When neither the attribute nor the description gives options, the property raises an `AttributeError`.

The generic properties every entity has, like `name`, `available`, and `unique_id`, are on [the entity class](/core/entities/entity-class/).

## Supported features

This entity has no supported features.

## Translating options

Options are values, not text for people to read. Make them lowercase `snake_case` keys, like `eco` or `high_power`, set a [translation key](/glossary/translation-key/) on the entity, and translate each option as a state in `strings.json`:

```json
{
  "entity": {
    "select": {
      "operating_mode": {
        "name": "Operating mode",
        "state": {
          "eco": "Eco",
          "high_power": "High power"
        }
      }
    }
  }
}
```

The frontend shows the translations, while automations keep working with the stable keys. See [making your strings translatable](/translate/guides/developers/), and [icons](/core/entities/icons/) to give each option its own icon.

## Methods

### Select option

Called when someone picks an option in the UI, or an automation or script calls the `select.select_option` action. Implement one of the two.

```python
class MySelect(SelectEntity):
    # Implement one of these methods.

    def select_option(self, option: str) -> None:
        """Change the selected option."""

    async def async_select_option(self, option: str) -> None:
        """Change the selected option."""
```

The base class validates the option first: you only get options that are in `options`. Anything else raises a `ServiceValidationError` before your method runs.

The actions `select.select_first`, `select.select_last`, `select.select_next`, and `select.select_previous` are handled by the base class. They work out the new option from `options` and `current_option`, and call your select method with it. You don't implement them.

## States

The state is `current_option`. It is `unknown` when `current_option` is `None`, or when it is not one of the `options`.

`options` is a capability attribute: it is written to the [entity registry](/core/entities/registry/) and left out of the recorder history.

## Example

```python
from homeassistant.components.select import SelectEntity
from homeassistant.const import EntityCategory


class ExampleOperatingMode(SelectEntity):
    """The operating mode of a heat pump."""

    _attr_has_entity_name = True
    _attr_translation_key = "operating_mode"
    _attr_entity_category = EntityCategory.CONFIG
    _attr_options = ["eco", "comfort", "high_power"]

    def __init__(self, device: ExampleDevice) -> None:
        """Initialize the select."""
        self._device = device
        self._attr_unique_id = f"{device.serial}_operating_mode"
        self._attr_current_option = device.mode

    async def async_select_option(self, option: str) -> None:
        """Change the operating mode."""
        await self._device.set_mode(option)
        self._attr_current_option = option
        self.async_write_ha_state()
```
