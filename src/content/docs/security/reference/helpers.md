---
title: Security helpers
description: The helpers of Home Assistant Core and the frontend that handle certificates, redaction, admin access, webhooks, paths, and untrusted content.
order: 1
---

All security-related helpers on one page. The guides explain when and why to use them: [integrations](/security/guides/integrations/) and [frontend](/security/guides/frontend/).

## Core

### Network

| Helper | Where | What it does |
| --- | --- | --- |
| `async_get_clientsession(hass, verify_ssl=True)` | `homeassistant.helpers.aiohttp_client` | The shared aiohttp session. Checks certificates by default, and refuses redirects from the network to a loopback address. |
| `async_create_clientsession(hass, verify_ssl=True)` | `homeassistant.helpers.aiohttp_client` | A new aiohttp session with the same protections, for when you need your own, like for cookies. |
| `get_async_client(hass, verify_ssl=True)` | `homeassistant.helpers.httpx_client` | The shared HTTPX client. Checks certificates by default. |
| `CONF_VERIFY_SSL` | `homeassistant.const` | The standard key for an option to turn certificate checks off. |

### Redaction

| Helper | Where | What it does |
| --- | --- | --- |
| `async_redact_data(data, to_redact)` | `homeassistant.components.diagnostics` | Replaces the values of the listed keys with `**REDACTED**`, also in nested dictionaries and lists. Empty values and `None` stay as they are. |
| `async_redact_data(data, to_redact)` | `homeassistant.helpers.redact` | The same, but `to_redact` can also map a key to a function that masks the value. |
| `partial_redact(value, unmasked_prefix=4, unmasked_suffix=4)` | `homeassistant.helpers.redact` | Keeps the first and last characters, and replaces the rest with `***`. Short values and values that are not strings become `**REDACTED**`. |

### Access

| Helper | Where | What it does |
| --- | --- | --- |
| `async_register_admin_service(hass, domain, service, handler)` | `homeassistant.helpers.service` | Registers an action that only admins may call. |
| `@websocket_api.require_admin` | `homeassistant.components.websocket_api` | Makes a WebSocket command admin-only. |
| `@require_admin` | `homeassistant.components.http` | Makes a method of an HTTP view admin-only. |
| `requires_auth` | `HomeAssistantView` | `True` by default: the view needs a logged-in user. |

See [permissions](/core/internals/permissions/) for checks on entities.

### Webhooks

| Helper | Where | What it does |
| --- | --- | --- |
| `async_generate_id()` | `homeassistant.components.webhook` | A webhook ID of 64 random hexadecimal characters. |
| `async_register(..., local_only=True)` | `homeassistant.components.webhook` | Ignores requests from outside the local network, and through Home Assistant Link. |
| `async_register(..., allowed_methods=...)` | `homeassistant.components.webhook` | The HTTP methods the webhook accepts. `POST` and `PUT` by default. |

### Files and URLs

| Helper | Where | What it does |
| --- | --- | --- |
| `hass.config.is_allowed_path(path)` | `homeassistant.core_config` | Whether a path is inside the folders the user allowed. Resolves the path first. Does blocking I/O: run it in the executor. |
| `hass.config.is_allowed_external_url(url)` | `homeassistant.core_config` | Whether a URL starts with one of the external URLs the user allowed. |

## Frontend

| Helper | Where | What it does |
| --- | --- | --- |
| `filterXSS(html)` | `src/common/util/xss.ts` | Removes all tags from a string, for text that must go into an HTML string. |
| `sanitizeHttpUrl(url)` | `src/common/url/sanitize-http-url.ts` | Returns the URL only if it is an absolute `http:` or `https:` URL. |
| `sanitizeLinkUrl(url)` | `src/common/url/sanitize-http-url.ts` | Like `sanitizeHttpUrl`, and also turns a `homeassistant://` deep link into a safe path inside the frontend. |
| `<ha-markdown>` | `src/components/ha-markdown.ts` | Renders Markdown, filtered with an allowlist of tags and attributes. Only use `allow-svg` for trusted content. |
