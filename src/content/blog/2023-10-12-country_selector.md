---
title: Country selector
description: Selectors has been expanded and now also includes a CountrySelector.
date: 2023-10-12
authors:
  - G Johansson
areas:
  - core
---

[Selectors](https://www.home-assistant.io/docs/blueprint/selectors/) has been expanded and now also includes a `CountrySelector`.

Using this in [config flows](/core/integrations/flow-steps/#show-a-form) will allow frontend to automatically translate the country codes into the proper country names.

Example:

```python
vol.Schema(
    {
        vol.Optional(CONF_COUNTRY): CountrySelector(
            CountrySelectorConfig(
                countries=["DE", "US"],
            )
        ),
    }
)
```
