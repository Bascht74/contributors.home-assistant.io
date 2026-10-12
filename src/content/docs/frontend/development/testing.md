---
title: Linting and tests
description: The linters, type checks, unit tests, and end-to-end tests of the frontend, and when to write a test.
order: 5
---

CI runs all of these on your pull request. Running them yourself first is faster than waiting for CI to tell you.

## Lint and format

```shell
pnpm lint
pnpm format
```

`pnpm lint` runs ESLint, Prettier, the TypeScript compiler, and the Lit analyzer, which checks your templates against the properties of the elements in them. `pnpm format` fixes what ESLint and Prettier can fix by themselves.

To run only the type check:

```shell
pnpm lint:types
```

> [!WARNING]
> Never pass a file to `pnpm lint:types` or `tsc`. With a file argument, the compiler ignores `tsconfig.json` and can write `.js` files into `src/`. If that happens, delete those generated files before you commit. For quick feedback on one file, use the diagnostics in your editor.

## Unit tests

Unit tests run with [Vitest](https://vitest.dev/). They live in `test/`, in a folder structure that mirrors `src/`:

```shell
pnpm test
pnpm test:coverage
```

A test file looks like this:

```ts
import { describe, expect, it } from "vitest";
import { ensureArray } from "../../../src/common/array/ensure-array";

describe("ensureArray", () => {
  it("wraps a single value in an array", () => {
    expect(ensureArray("light.kitchen")).toEqual(["light.kitchen"]);
  });
});
```

### When to write a test

Write a test for code that computes something, where a mistake could slip through unnoticed: data processing, utilities, config validation, and dashboard strategies.

Don't write tests that check how something renders: the text, styles, or slots of a component, or that a panel shows the data it gets. Those break with every design change and protect little. If the visuals change, add screenshots to your pull request instead.

Tests never talk to a real Home Assistant. Replace `callWS`, `callApi`, and the connection with fakes. Before you write a new fixture or helper, look at the ones the test suite already has.

## End-to-end tests

End-to-end tests run with [Playwright](https://playwright.dev/), in three suites. Each suite has its own development server:

| Suite | Development server | Port | Test command |
| --- | --- | --- | --- |
| App | `pnpm test:e2e:app:dev` | 8095 | `pnpm test:e2e:app` |
| Demo | `pnpm dev:demo` | 8090 | `pnpm test:e2e:demo` |
| Gallery | `pnpm dev:gallery` | 8100 | `pnpm test:e2e:gallery` |

The app suite tests the app against a stripped-down harness made for these tests. The demo and gallery suites use their normal development servers.

Start the development server of a suite in the background, then run the suite. Playwright reuses the server that is already running instead of doing a slow full build, and the server rebuilds when you save, so you can run the tests again without restarting anything:

```shell
pnpm test:e2e:app:dev --background
pnpm test:e2e:app
```

Narrow a run down with `-g` for test names and `--project` for a browser. The projects are `chromium` and `mobile-chrome`:

```shell
pnpm test:e2e:app -g "more-info" --project=chromium
```

`pnpm test:e2e` runs all three suites, and `pnpm test:e2e:show-report` opens the combined report.

A local run against a development server is not the same as the clean build CI uses. Use it to iterate quickly, and check that the end-to-end jobs on your pull request pass too.

## Benchmarks

The data transforms behind charts, like history, statistics, and energy, have benchmarks. Before you optimize one, read the workflow in [`test/benchmarks/README.md`](https://github.com/home-assistant/frontend/blob/dev/test/benchmarks/README.md). An optimization must keep the output identical: never update snapshots or fixtures to make one pass.

## What to run when

- **A utility or data change**: the related unit tests, then `pnpm lint:types`.
- **A component change**: `pnpm lint`, and the unit tests that cover the logic in it.
- **A change to a flow that has end-to-end tests**: the relevant suite, narrowed down to the affected tests.
- **A broad refactor**: `pnpm lint` and `pnpm test`.
