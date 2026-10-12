---
title: Network discovery
description: Use the zeroconf, SSDP, DHCP, USB, MQTT, and network APIs of Home Assistant to find devices while your integration runs.
sidebarGroup: Discovery
order: 2
---

[Discovery through the manifest](/core/integrations/discovery/) starts a config flow for new devices. Some integrations need more: a hub that adds devices as they appear, or an integration that looks up where a known device is now. Home Assistant shares its discovery integrations through the APIs on this page, so your integration does not need to run its own scanner.

Add the integration you use, like `zeroconf` or `ssdp`, to the `dependencies` in your [manifest](/core/integrations/manifest/#dependencies).

## Zeroconf

Home Assistant runs one mDNS implementation, [python-zeroconf](https://github.com/python-zeroconf/python-zeroconf), and shares it. Running several mDNS implementations on one host is not recommended, so never start your own. Get the shared instance instead, and pass it to your library:

```python
from homeassistant.components import zeroconf

aiozc = await zeroconf.async_get_async_instance(hass)
```

Use `zeroconf.async_get_instance(hass)` for the synchronous `Zeroconf` object. The examples of python-zeroconf show what you can do with both.

## SSDP

The SSDP integration keeps a cache of the devices it found. Look them up with:

| Function | Returns |
| --- | --- |
| `ssdp.async_get_discovery_info_by_udn_st(hass, udn, st)` | The discovery info for one UDN and ST, or `None` |
| `ssdp.async_get_discovery_info_by_st(hass, st)` | A list of everything found with this ST |
| `ssdp.async_get_discovery_info_by_udn(hass, udn)` | A list of all services of one device |

```python
from homeassistant.components import ssdp

discovery_infos = await ssdp.async_get_discovery_info_by_st(
    hass, "urn:schemas-upnp-org:device:ZonePlayer:1"
)
```

To hear about new devices right away, register a callback with `ssdp.async_register_callback`. It matches with the same format as `ssdp` in the manifest, and `MATCH_ALL` from `homeassistant.const` matches any value of a header:

```python
from homeassistant.components import ssdp

entry.async_on_unload(
    await ssdp.async_register_callback(
        hass,
        _async_player_discovered,
        {"st": "urn:schemas-upnp-org:device:ZonePlayer:1"},
    )
)
```

## DHCP

`dhcp.async_discovered_service_info` returns the devices that are still in the DHCP cache, as `DhcpServiceInfo` objects with `ip`, `hostname`, and `macaddress`. The hostname is lowercase, and the MAC address is lowercase without colons: `AA:BB:CC:12:34:56` becomes `aabbcc123456`.

```python
from homeassistant.components import dhcp

for service_info in dhcp.async_discovered_service_info(hass):
    ...
```

## USB

The USB integration looks for new devices when Home Assistant starts, when the user opens the integrations page, and when a device is plugged in, if the system supports that. To check for new compatible devices at the same moments, register a callback:

```python
from homeassistant.components import usb
from homeassistant.core import callback


@callback
def _async_check_for_usb() -> None:
    """Check for new compatible USB devices."""


entry.async_on_unload(
    usb.async_register_scan_request_callback(hass, _async_check_for_usb)
)
```

## MQTT

Integrations that use MQTT have to wait until the MQTT client is available before they subscribe. `async_wait_for_mqtt_client` waits while MQTT is being set up. It returns `True` when the client is available, and `False` when MQTT is not set up, or not available within a timeout. The client does not have to be connected yet.

```python
from homeassistant.components import mqtt

if not await mqtt.async_wait_for_mqtt_client(hass):
    raise ConfigEntryNotReady("MQTT is not available")
```

## Network adapters

If your integration uses its own discovery method, it needs to know which network interfaces to use. The [Network integration](https://www.home-assistant.io/integrations/network/) holds the preferences of the user. Ask it, instead of looking at the interfaces yourself:

```python
from homeassistant.components import network

adapters = await network.async_get_adapters(hass)
```

Each adapter is a dictionary like this:

```python
{
    "name": "eth1",
    "enabled": True,
    "auto": True,
    "default": False,
    "ipv4": [{"address": "192.168.1.5", "network_prefix": 23}],
    "ipv6": [],
}
```

Only use adapters that are `enabled`. To get the network of an address:

```python
from ipaddress import ip_network

for adapter in adapters:
    if not adapter["enabled"]:
        continue

    for ip_info in adapter["ipv4"]:
        network_range = ip_network(
            f"{ip_info['address']}/{ip_info['network_prefix']}", False
        )
```
