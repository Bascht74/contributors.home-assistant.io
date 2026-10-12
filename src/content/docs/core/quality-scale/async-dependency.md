---
title: Use an async dependency
description: "Platinum rule async-dependency: the library of the integration uses asyncio."
sidebarLabel: async-dependency
sidebarGroup: Platinum
order: 1
---

This is a Platinum rule. In `quality_scale.yaml`, it is called `async-dependency`.

The library that the integration uses to talk to the device or service must be written for asyncio. Its I/O, like network requests, runs as coroutines on the [event loop](/glossary/event-loop/) of Home Assistant, instead of blocking calls that need a thread.

## Why it matters

Home Assistant runs on asyncio. A blocking library cannot run on the event loop, so every call has to go to a thread in the executor, and the result has to come back to the loop. Each of those switches costs time and memory, and with many integrations polling many devices, it adds up. An async library avoids all of that, and the integration code gets simpler as well.

## Example

With a blocking library, every call goes through the executor:

```python
data = await hass.async_add_executor_job(client.get_data)
```

With an async library, you await the call directly:

```python
data = await client.get_data()
```

If you maintain the library yourself, this usually means building it on `aiohttp` or `httpx` for HTTP, or on the asyncio streams for raw sockets. That also makes [inject-websession](/core/quality-scale/inject-websession/) possible.

## How it is checked

This rule is checked in review. A good hint in the code is the use of `async_add_executor_job` for calls to the library.

## Exceptions

If the integration has no external dependencies, or its dependencies do no I/O, this rule does not apply.

## Related rules

- [inject-websession](/core/quality-scale/inject-websession/): pass in the web session.
- [dependency-transparency](/core/quality-scale/dependency-transparency/): use transparent dependencies.
