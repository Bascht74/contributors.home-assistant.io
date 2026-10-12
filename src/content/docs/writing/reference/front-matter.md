---
title: Integration front matter
description: Every key you can use at the top of an integration page, what it does, and which values it accepts.
order: 5
---

Every integration page starts with front matter: a block of YAML between two `---` lines. It is not just metadata. It drives the [integration overview](https://www.home-assistant.io/integrations/), the setup button, the discovery text, the quality scale badge, and the sidebar of the page.

Many keys mirror the integration manifest in Home Assistant Core. Those must match the manifest exactly. Some of them, like `ha_quality_scale`, are updated by documentation syncs from the core codebase, so you rarely need to touch them after the first version. Getting them right in a new page is still on you.

## Example

A typical page for an integration that is set up from the UI:

```yaml
---
title: Awesome Lights
description: Control your Awesome Lights from Home Assistant.
ha_release: 2026.11
ha_category:
  - Light
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@your-github-username"
ha_domain: awesome_lights
ha_integration_type: hub
ha_platforms:
  - light
  - sensor
ha_quality_scale: bronze
ha_zeroconf: true
related:
  - docs: /docs/automation/
    title: Automations
  - url: https://www.example.com/awesome-lights/manual
    title: Awesome Lights user manual
---
```

The keys below are grouped by purpose. Keys that do not apply to your integration are left out. Do not set a key to `false` to say "no".

## The basics

These keys belong on every integration page.

- `title`: the name of the integration. Use the `name` from the manifest, as written there.
- `description`: one sentence about what the page covers. Search engines and link previews show it.
- `ha_domain`: the domain of the integration. It must match the `domain` in the manifest, and the file name of the page. For the example above, that is `source/_integrations/awesome_lights.markdown`.
- `ha_release`: the Home Assistant release that first shipped the integration, in the format `YYYY.M`. For a new integration, that is the next release: if the current release is 2026.10, use 2026.11. The site build fails if this key is missing.
- `ha_codeowners`: the GitHub usernames or teams responsible for the integration, each starting with `@`. Match the `codeowners` in the manifest. Quote each entry, because a bare `@` is not valid at the start of a YAML value.

> [!IMPORTANT]
> Quote releases that end in a zero, like `ha_release: "2025.10"`. Without quotes, YAML reads `2025.10` as the number 2025.1, and the page shows the wrong release.

## Classification

These keys describe what the integration is and does. They power the filters on the integration overview.

- `ha_category`: the categories the integration is listed under on the integration overview. Use a single value or a list. A page without a category does not show up in the overview at all.
  - Most categories match an entity platform the integration provides, like `Light`, `Switch`, `Sensor`, `Binary sensor`, `Climate`, or `Media player`.
  - Other categories describe the purpose of the integration, like `Hub`, `Energy`, `DIY`, or `Weather`.
  - For communication protocols, see [Protocol categories](#protocol-categories) below.
- `ha_integration_type`: the type of the integration. It must match `integration_type` in the manifest: `device`, `entity`, `hardware`, `helper`, `hub`, `service`, `system`, or `virtual`. If the manifest does not set one, the type is `hub`.
- `ha_iot_class`: how the integration talks to the device or service. Use `Local Polling`, `Local Push`, `Cloud Polling`, `Cloud Push`, `Assumed State`, or `Calculated`, matching `iot_class` in the manifest. Integrations where it depends on the setup use `Configurable`. The [IoT class blog post](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/) explains each class.
- `ha_platforms`: the entity platforms the integration implements, like `light` and `sensor`. Also list `diagnostics` when the integration supports downloading diagnostics.
- `ha_config_flow`: set to `true` if the integration is set up from the UI. This adds the setup button to the sidebar of the page. Leave the key out otherwise.
- `ha_quality_scale`: the tier of the integration on the quality scale: `bronze`, `silver`, `gold`, or `platinum`. Integrations that are internal to Home Assistant use `internal`, and older integrations that have not been scored yet use `legacy`. For a new integration, use `bronze`. This key is updated by documentation syncs from the core codebase, so you normally do not edit it by hand.

### Protocol categories

Some communication protocols have two categories:

- The plain protocol name, like `Serial`, is for integrations that *provide* the connection, so other integrations can use it.
- The `-controlled` variant, like `Serial-controlled`, is for integrations that *talk to a specific device* over that connection. They might control the device, read from it, or both.

Pick the category by the role the integration plays, not by what the hardware happens to support.

- `Infrared`: provides an infrared transmitter or receiver that other integrations can use. Examples: ESPHome, Broadlink, MQTT Infrared.
- `Infrared-controlled`: talks to a specific device through an `Infrared` provider. Example: LG Infrared.
- `Radio frequency`: provides a radio frequency transmitter or receiver, like sub-GHz, that other integrations can use. Examples: ESPHome, Broadlink.
- `Radio frequency-controlled`: talks to a specific device through a `Radio frequency` provider. Example: KlikAanKlikUit.
- `Modbus`: provides a Modbus connection, RTU or TCP, that other integrations can use. Example: Modbus.
- `Modbus-controlled`: controls or reads a specific device over its Modbus interface, directly or through a gateway. Example: Nibe Heat Pump.
- `Serial`: provides a serial port, like UART, RS-232, or RS-485, that other integrations can use, for example by sharing it over the network. Example: ESPHome.
- `Serial-controlled`: controls or reads a specific device over its serial interface, directly or through a serial proxy or serial-to-IP adapter. Example: Denon RS-232.

Do not use these categories when the protocol is only how Home Assistant reaches a gateway for another technology. A Zigbee coordinator plugged in over USB serial does not get `Serial`.

## Discovery

Set these to `true` when the integration can be discovered that way. They must match the discovery entries in the manifest. Leave out the ones that do not apply.

- `ha_bluetooth`: discovered over Bluetooth.
- `ha_dhcp`: discovered through DHCP.
- `ha_homekit`: discovered through HomeKit.
- `ha_mqtt`: discovered through MQTT.
- `ha_ssdp`: discovered through SSDP.
- `ha_zeroconf`: discovered through mDNS, also known as Zeroconf.

When `ha_dhcp`, `ha_homekit`, `ha_mqtt`, `ha_ssdp`, or `ha_zeroconf` is set, the standard configuration text on the page tells readers that Home Assistant can find their device automatically. See [Integration page structure](/writing/reference/integration-page/#reusable-text).

## Related links

`related` adds links to the end of the page. Each entry is one link:

- `docs`: a path to a page on home-assistant.io, like `/docs/automation/`. It may include an anchor. These show up under **Related topics**. The `title` is optional: without one, the title of the linked page is used.
- `url`: a link to another website. These show up under **Related links**, and open in a new tab. Always add a `title`, otherwise the bare URL is shown.

```yaml
related:
  - docs: /voice_control/s3_box_voice_assistant/
    title: Create an ESP32-S3-BOX-3 voice assistant
  - url: https://esphome.io/projects/
    title: ESPHome projects
```

A `docs` entry that points to a page that does not exist is silently dropped, so check your paths.

## Virtual integrations and brands

Some pages do not document an integration with code of its own. They exist so people can find a product by its brand name.

A *virtual integration* is a product that works through another integration. Its manifest uses `integration_type: virtual`, and it comes in two kinds.

The "supported by" kind points to the integration that does the work. For example, Dacia cars work through the Renault integration.

- `ha_supporting_domain`: the domain of the integration that does the work, like `renault`. It must match `supported_by` in the manifest of the virtual integration. The setup button and links on the page use this domain.
- `ha_supporting_integration`: the name of that integration, like `Renault`. The generated page uses it to tell readers which integration to set up.

The "IoT standard" kind is a brand whose devices use a standard protocol:

- `ha_iot_standard`: the standard the products use: `zigbee`, `zwave`, or `homekit`. It must match `iot_standards` in the manifest. Brand pages for Matter products use `matter`. For Zigbee and Z-Wave, the page shows a button that starts adding a device with that standard.

A *brand* page groups several integrations or products from the same manufacturer under one name. For example, the Google brand page groups Google integrations, and the Inovelli brand page points to the Zigbee and Z-Wave standards its devices use. A brand is not the same as a virtual integration.

- `ha_brand`: set to `true` if the page represents a brand rather than an actual integration. The page then takes its logo from the brand images instead of the integration images. Leave the key out on regular integration pages.

A virtual integration or brand only gets a provider category, like `Infrared`, `Radio frequency`, `Modbus`, or `Serial`, when the brand itself sells devices that provide that capability. Do not copy those categories from the supporting integration.

## Maintainer only

Do not add these keys yourself. A maintainer sets them.

- `works_with`: marks a brand as part of the [Works with Home Assistant](https://works-with.home-assistant.io/) partner program. It adds the program badge, and generates text about the program on the page. Each value is a connectivity method the products are certified for. List more than one when that applies, like both `zigbee` and `matter`.
  - `zwave`: shows as Z-Wave, and adds a Z-Wave badge and onboarding text.
  - `zigbee`: shows as Zigbee, and adds a Zigbee badge and onboarding text.
  - `matter`: shows as Matter, and adds a Matter badge and onboarding text.
  - `bluetooth`: products connect over Bluetooth.
  - `local`: products work locally, for example over the local network.
  - Any other value is shown as written, with a capital first letter.
- `featured`: set to `true` to highlight the integration on the integration overview. Note that this key has no `ha_` prefix.
