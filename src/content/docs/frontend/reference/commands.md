---
title: Commands
description: Every command of the frontend repository, what it does, and the port it uses.
order: 1
---

Run these from the root of the [frontend repository](https://github.com/home-assistant/frontend).

## Setup

| Command | What it does |
| --- | --- |
| `script/setup` | Installs the dependencies. In the devcontainer, also the right Node.js. |
| `script/core` | In the devcontainer only: installs and starts Home Assistant Core from its `dev` branch, with a configuration that uses your frontend. `-r <ref>` picks another branch or tag, `-s` skips the install. |
| `script/setup_translations` | Fetches the latest translations, and asks for GitHub authorization the first time. |

## Development servers

| Command | Port | What it serves |
| --- | --- | --- |
| `pnpm dev` | | Builds the app into `hass_frontend/` for a Core with `development_repo` set. Open it on the port of that Core. |
| `pnpm dev:serve` | 8124 | Builds and serves the app, connected to a Core. `-c <url>` sets the Core (default `http://localhost:8123`), `-p <port>` the port. In the devcontainer the default port is 8123, which is 8124 on your computer. |
| `pnpm dev:demo` | 8090 | The [demo](/frontend/development/gallery-and-demo/#the-demo). |
| `pnpm dev:gallery` | 8100 | The [gallery](/frontend/development/gallery-and-demo/#the-gallery). |
| `pnpm test:e2e:app:dev` | 8095 | The app harness for the end-to-end tests. |

All development servers accept `--background`, `--status`, `--logs [--follow]`, and `--stop`. All except the end-to-end harness accept `--fetch-translations`. See [Run the frontend](/frontend/development/run/#keep-a-server-running-in-the-background).

## Checks and tests

| Command | What it does |
| --- | --- |
| `pnpm lint` | ESLint, Prettier, the TypeScript compiler, and the Lit analyzer. |
| `pnpm format` | Fixes what ESLint and Prettier can fix. |
| `pnpm lint:types` | Only the TypeScript compiler. Never pass it a file. |
| `pnpm lint:lit` | Only the Lit analyzer. |
| `pnpm test` | The unit tests, with Vitest. |
| `pnpm test:coverage` | The unit tests, with a coverage report. |
| `pnpm test:e2e:app` | The end-to-end tests of the app. |
| `pnpm test:e2e:demo` | The end-to-end tests of the demo. |
| `pnpm test:e2e:gallery` | The end-to-end tests of the gallery. |
| `pnpm test:e2e` | All three end-to-end suites. |
| `pnpm test:e2e:show-report` | Opens the combined end-to-end report. |

## Builds

| Command | What it does |
| --- | --- |
| `pnpm build` | A full production build into `hass_frontend/`. Accepts the background flags. |
| `pnpm build --modern` | Only the modern build, for size and performance comparisons. |
| `script/gen_demo_core_data` | Regenerates the demo data that comes from Core. |
