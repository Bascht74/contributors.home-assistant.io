---
title: Get the instance URL
description: Find a URL that a device, a service, or the browser of the user can reach Home Assistant on.
sidebarLabel: Instance URL
sidebarGroup: Data and updates
order: 3
---

Sometimes your integration has to tell something else how to reach Home Assistant. A device sends data back, a cloud service calls a webhook, or a media player fetches a generated image or sound file. For that, you need a URL to this Home Assistant instance.

That is harder than it sounds. A user can have several URLs: one set for the home network, one Home Assistant detects by itself, one set for access from the internet, and one from Home Assistant Link. They can use non-standard ports, with or without SSL. The `get_url` helper picks the right one for you.

## The get_url helper

```python
from homeassistant.helpers.network import NoURLAvailableError, get_url

try:
    url = get_url(hass, allow_internal=False, require_ssl=True)
except NoURLAvailableError as err:
    raise ConfigEntryNotReady(
        translation_domain=DOMAIN,
        translation_key="no_external_url",
    ) from err
```

If no URL matches your requirements, it raises `NoURLAvailableError`. Catch it, and tell the user what to set up.

| Parameter | Default | What it does |
| --- | --- | --- |
| `require_current_request` | `False` | The URL must match the one the user has open in their browser. Raises if there is no current request. |
| `require_ssl` | `False` | The URL must use `https` |
| `require_standard_port` | `False` | The URL must use port 80 for `http`, or 443 for `https` |
| `require_cloud` | `False` | The URL must be a Home Assistant Link URL |
| `allow_internal` | `True` | Allow the internal URL set by the user, or one detected on the network. Set to `False` if you need an external URL. |
| `allow_external` | `True` | Allow the external URL set by the user, or a Home Assistant Link URL. Set to `False` if you need an internal URL. |
| `allow_cloud` | `True` | Allow a Home Assistant Link URL |
| `allow_ip` | Depends | Allow an IP address as host. By default allowed, unless Home Assistant itself is served over SSL. |
| `prefer_external` | Depends | Try external URLs before internal ones. By default only when Home Assistant itself is served over SSL. |
| `prefer_cloud` | `False` | Prefer the Home Assistant Link URL over the external URL set by the user |

## What it returns by default

Without parameters, `get_url(hass)` allows any URL, and prefers a local one:

1. The internal URL set by the user. If there is none, one detected from the network settings.
2. If there is no internal URL, the external URL set by the user.
3. If there is none, the Home Assistant Link URL, if the user has a subscription.

When Home Assistant itself is served over SSL, it tries external URLs first, and does not allow IP addresses.

## Pick your requirements

Ask for what your use case really needs, and nothing more. Every requirement makes it more likely that no URL is available.

- A device on the local network calls back: the default is fine, or `allow_external=False` if the device cannot reach the internet.
- A cloud service calls a webhook: `allow_internal=False`. Add `require_ssl=True` if the service only accepts `https`.
- A device that only accepts `https` on port 443 and checks certificates: `allow_internal=False`, `allow_ip=False`, `require_ssl=True`, and `require_standard_port=True`.
