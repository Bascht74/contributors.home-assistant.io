---
title: Build a Python library
description: Why integrations talk to devices through a separate library, what the library must meet, and how to structure authentication and data models.
sidebarLabel: Build a Python library
sidebarGroup: Getting started
order: 3
---

Home Assistant does not contain protocol code. An integration never builds HTTP requests or parses a device's packets itself: it uses a Python library, published on PyPI, that does. The integration translates between that library and Home Assistant. Nothing more.

This keeps integrations small and easier to review, and lets others use and test the library on its own. This page is about writing that library. The example is a REST API with JSON, the most common case, but the structure works for other protocols too.

> [!TIP]
> Designing the API of your own product? Local, push based APIs work best for Home Assistant. Your users get instant updates, and it keeps working without the internet.

## Requirements

A library used by an integration in core must:

- Be published on PyPI with a source distribution. A library with only binary packages is not accepted.
- Publish from a public repository, with every release on PyPI matching a tagged release there.
- Publish automatically, for example from a GitHub Actions workflow, not by hand.
- Have an issue tracker, if it talks to devices or services.
- Use an [OSI-approved license](https://opensource.org/licenses), for the library and everything it depends on, and state it in its metadata.

If the library mainly exists for Home Assistant and you own the integration, consider an issue template picker that points people to the [core issue tracker](https://github.com/home-assistant/core/issues), like [the one of zwave-js-server-python](https://github.com/home-assistant-libs/zwave-js-server-python/issues/new/choose).

Home Assistant prefers async libraries. Sync libraries work, through the executor, but cost a thread for every call. See [async in Home Assistant](/core/internals/asyncio/).

## Structure

A library has two parts:

- **Authentication**: makes authenticated requests and returns the responses. The only code that talks to the API.
- **Data models**: represent the data of the API, and offer methods to act on it.

## Authentication

The authentication part gets tokens, refreshes them when needed, and adds them to every request. It does not know what the requests are about, and it does not store tokens: that is the job of whoever uses the library. When you return tokens, return something JSON serializable, like a `dict` of strings and numbers, so Home Assistant can store it in a config entry.

If the API can be at different addresses, like a device on the local network, let the caller pass in the host.

Use `aiohttp`, and let the caller pass in the `ClientSession`. Home Assistant has a shared session, and creating your own costs resources and blocks the event loop while it loads certificates.

```python
from aiohttp import ClientResponse, ClientSession


class Auth:
    """Make authenticated requests to the API."""

    def __init__(
        self, session: ClientSession, host: str, access_token: str
    ) -> None:
        """Initialize the auth."""
        self.session = session
        self.host = host
        self.access_token = access_token

    async def request(
        self, method: str, path: str, **kwargs
    ) -> ClientResponse:
        """Make a request."""
        headers = dict(kwargs.pop("headers", None) or {})
        headers["authorization"] = f"Bearer {self.access_token}"

        return await self.session.request(
            method, f"{self.host}/{path}", **kwargs, headers=headers
        )
```

Using it, outside Home Assistant:

```python
import asyncio

import aiohttp

from my_library import Auth


async def main() -> None:
    async with aiohttp.ClientSession() as session:
        auth = Auth(session, "http://example.com/api", "secret_token")

        response = await auth.request("get", "lights")
        print(response.status, await response.json())


asyncio.run(main())
```

### OAuth 2

With OAuth 2, access tokens expire after a short time, and a refresh token gets new ones. Refreshing needs a client ID and secret, and those may live somewhere else entirely: Home Assistant can refresh tokens through the account linking service of Home Assistant Link, so users do not need their own developer account.

So let the caller decide how to get a valid token. An abstract method does that neatly:

```python
from abc import ABC, abstractmethod

from aiohttp import ClientResponse, ClientSession


class AbstractAuth(ABC):
    """Make authenticated requests to the API."""

    def __init__(self, session: ClientSession, host: str) -> None:
        """Initialize the auth."""
        self.session = session
        self.host = host

    @abstractmethod
    async def async_get_access_token(self) -> str:
        """Return a valid access token."""

    async def request(
        self, method: str, path: str, **kwargs
    ) -> ClientResponse:
        """Make a request."""
        headers = dict(kwargs.pop("headers", None) or {})
        access_token = await self.async_get_access_token()
        headers["authorization"] = f"Bearer {access_token}"

        return await self.session.request(
            method, f"{self.host}/{path}", **kwargs, headers=headers
        )
```

In the integration, the subclass gets the token from Home Assistant's OAuth 2 helper, which refreshes it when needed. See [OAuth 2 in integrations](/core/integrations/oauth2/).

## Data models

Represent the data the way the API does. Keep the names and the structure, even when the API design is odd or has a typo in it. Someone who reads the API documentation should find their way in your library without a translation table.

And do as little as possible. A library represents data, it does not interpret it. Do not convert Celsius to Fahrenheit, for example: that involves choices about rounding and precision, and those belong to whoever uses the library.

Say the API has these endpoints:

- `GET /lights`: all lights, as a list.
- `GET /light/<id>`: one light, like `{"id": 1234, "name": "Desk", "is_on": true}`.
- `POST /light/<id>`: control a light with `{"is_on": false}`. Returns the new state.

A class for a light:

```python
from typing import Any

from .auth import Auth


class Light:
    """A light of the ExampleHub API."""

    def __init__(self, raw_data: dict[str, Any], auth: Auth) -> None:
        """Initialize the light."""
        self.raw_data = raw_data
        self.auth = auth

    @property
    def id(self) -> int:
        """Return the ID of the light."""
        return self.raw_data["id"]

    @property
    def name(self) -> str:
        """Return the name of the light."""
        return self.raw_data["name"]

    @property
    def is_on(self) -> bool:
        """Return whether the light is on."""
        return self.raw_data["is_on"]

    async def async_control(self, is_on: bool) -> None:
        """Turn the light on or off."""
        response = await self.auth.request(
            "post", f"light/{self.id}", json={"is_on": is_on}
        )
        response.raise_for_status()
        self.raw_data = await response.json()

    async def async_update(self) -> None:
        """Fetch the latest data of the light."""
        response = await self.auth.request("get", f"light/{self.id}")
        response.raise_for_status()
        self.raw_data = await response.json()
```

And the entry point of the API:

```python
from .auth import Auth
from .light import Light


class ExampleHubAPI:
    """Talk to the ExampleHub API."""

    def __init__(self, auth: Auth) -> None:
        """Initialize the API."""
        self.auth = auth

    async def async_get_lights(self) -> list[Light]:
        """Return all lights."""
        response = await self.auth.request("get", "lights")
        response.raise_for_status()
        return [Light(data, self.auth) for data in await response.json()]

    async def async_get_light(self, light_id: int) -> Light:
        """Return one light."""
        response = await self.auth.request("get", f"light/{light_id}")
        response.raise_for_status()
        return Light(await response.json(), self.auth)
```

Raise your own exceptions for errors, like `ExampleHubAuthenticationError` and `ExampleHubConnectionError`, so the integration can tell a wrong password from a device that is offline. The integration needs that difference to start reauthentication or to retry later.

## Try your library in Home Assistant

Before you publish, install your library in editable mode in the virtual environment of your [development environment](/core/development/environment/). Run this from your core checkout, with the library in a folder next to it:

```shell
uv pip install -e ../my-library
```

That path works with a manual setup. The development container only has your core checkout mounted, so clone the library inside the container, like in `~/my-library`, and install it from there. The [tutorial](/core/integrations/tutorial/#1-start-with-the-library) shows both setups.

Then start Home Assistant without letting it install the published version over yours:

```shell
hass --skip-pip-packages my-library
```

Once it works, publish a release and set the version in the `requirements` of your integration's [manifest](/core/integrations/manifest/).
