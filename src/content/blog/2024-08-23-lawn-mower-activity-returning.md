---
title: New returning type in LawnMowerActivity
description: As of Home Assistant Core 2024.9, integrations implementing LawnMowerEntity can indicate that their mower is returning to the dock by using the new LawnMowerActivity.RETURNING state.
date: 2024-08-23
authors:
  - Michael Arthur
areas:
  - core
---

As of Home Assistant Core 2024.9, integrations implementing `LawnMowerEntity` can indicate that their mower is returning to the dock by using the new `LawnMowerActivity.RETURNING` state.

More details can be found in the [documentation](/core/entities/lawn-mower/)

## Example

```python
    async def async_dock(self) -> None:
        """Start docking."""
        self._attr_activity = LawnMowerActivity.RETURNING
        self.async_write_ha_state()
```

or by returning `LawnMowerActivity.RETURNING` in the activity property of your `lawn_mower` entity.

```python
    @property
    def activity(self) -> LawnMowerActivity:
        """Return the state of the mower."""
        mower = self.mower
        if mower.state is RETURNING:
            return LawnMowerActivity.RETURNING
        ...
```