---
title: Blocking operations
description: How to keep blocking I/O and slow imports out of the event loop, and how to fix the blocking calls Home Assistant reports.
sidebarGroup: Async
order: 12
---

A blocking call in the [event loop](/glossary/event-loop/) stalls all of Home Assistant until it returns. Network I/O, disk I/O, sleeping, and heavy computation all block. Do them in the executor, or use an async alternative.

Home Assistant detects many blocking calls in the event loop and reports them in the log, with the integration and the line that made the call. Two of them, `sleep` and `putrequest`, are also stopped: the call raises a `RuntimeError` instead of running. If you got here from such a report, find your call in the list below.

## Run blocking code in the executor

In Home Assistant, use `hass.async_add_executor_job`. In a library, use the standard `loop.run_in_executor`:

```python
import asyncio
from functools import partial

# In Home Assistant
result = await hass.async_add_executor_job(blocking_code, "something")
result = await hass.async_add_executor_job(
    partial(blocking_code_with_kwargs, kwarg=True)
)

# In library code
loop = asyncio.get_running_loop()
result = await loop.run_in_executor(None, blocking_code, "something")
```

Read Python's notes on [running blocking code](https://docs.python.org/3/library/asyncio-dev.html#running-blocking-code) for the pitfalls.

## Calls Home Assistant detects

### File system: open, glob, walk, listdir, scandir, and pathlib reads and writes

`open`, `glob.glob`, `glob.iglob`, `os.walk`, `os.listdir`, `os.scandir`, and the `pathlib.Path` methods like `read_text`, `read_bytes`, `write_text`, and `write_bytes` all do disk I/O. Run them in the executor. The same goes for calls Home Assistant does not detect, like `os.stat` or `os.path.exists`.

> [!WARNING]
> Home Assistant only detects the `open` call, not the reads and writes on the file after it. When you move `open` into the executor, move the reads and writes along with it. A fix that only moves `open` leaves blocking I/O in place that nobody will notice for a long time.

### sleep

Replace `time.sleep` with `await asyncio.sleep`. A common source of a blocking sleep is `pyserial-asyncio`. Use [`serialx`](https://github.com/puddly/serialx) instead: it has native asyncio support, and is import-compatible with `serial`, `serial_asyncio`, and `serial_asyncio_fast`. See [migrating from pyserial to serialx](/blog/2026/04/27/pyserial-to-serialx/).

### putrequest

`http.client` and anything built on it, like `urllib` and `requests`, does blocking network I/O. Run it in the executor, or better, switch to an async HTTP client like `aiohttp`.

### SSL: load_default_certs, load_verify_locations, load_cert_chain, and set_default_verify_paths

Creating an SSL context reads certificates from disk. Do not create your own: use the shared clients and contexts Home Assistant already prepared outside the event loop.

- For `aiohttp`: `async_get_clientsession(hass)` from `homeassistant.helpers.aiohttp_client`.
- For `httpx2`: `get_async_client(hass)` from `homeassistant.helpers.httpx_client`.
- For anything else: the helpers in `homeassistant.util.ssl`, like `get_default_context()`.

### import_module

Importing a module reads it from disk. See [imports](#imports) below.

## Imports

Imports need care for two reasons: an import reads files from disk, which blocks, and imports in CPython are [not thread safe](https://github.com/python/cpython/issues/83065).

### Import at module level

If your integration imports what it needs at the top of its modules, and `__init__.py` imports the modules it needs, you have nothing to worry about. Home Assistant loads your integration before the event loop starts, or in the import executor: a separate thread just for imports.

This is the right choice for almost every integration.

### Import later, carefully

Sometimes a module is only needed in a rare case, or a top-level import creates a circular import. Then:

- If the module is already loaded, a plain `import` statement is fine: Python does not load it again.
- If the module is only imported in one place, put the import in a function and run that with `hass.async_add_executor_job`.
- If the module may be imported from different places at the same time, use `async_import_module` from `homeassistant.helpers.importlib`. It caches the result and makes concurrent imports wait for one another.

```python
from homeassistant.helpers.importlib import async_import_module

module = await async_import_module(
    hass, f"homeassistant.components.my_integration.{name}"
)
```

To check whether a module is loaded, look in `sys.modules`. A module appears there as soon as loading *starts*, so with imports from several paths, keep the race conditions in mind.

### Imports only for type checking

If you only need an import for type hints, guard it, so it is not imported at runtime at all:

```python
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from some_library import SomeClass


def some_function() -> SomeClass:
    ...
```

### Rarely used code

Importing costs CPU time and disk I/O, and memory once it is loaded. For code that is only needed now and then, a late import can be the better trade, as long as it follows the rules above.

## Find blocking calls early

Turn on debug mode while you develop, with `debug: true` under `homeassistant:` in `configuration.yaml`, and run with Python's [asyncio debug mode](https://docs.python.org/3/library/asyncio-dev.html#debug-mode). Both catch blocking calls that otherwise only show up as a slow system.
