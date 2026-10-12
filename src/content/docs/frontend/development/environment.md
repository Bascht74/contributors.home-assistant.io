---
title: Set up the environment
description: Get the frontend code and its dependencies, with the devcontainer or on your own machine.
order: 1
---

You can work on the frontend in a devcontainer, or directly on your machine. The devcontainer is the easier start: it brings the right Node.js, pnpm, and Python, and it can run Home Assistant Core next to the frontend.

## Get the code

Fork the [frontend repository](https://github.com/home-assistant/frontend) on GitHub, then clone your fork and add the main repository as `upstream`:

```shell
git clone git@github.com:YOUR_GIT_USERNAME/frontend.git
cd frontend
git remote add upstream https://github.com/home-assistant/frontend.git
```

Branch off `dev` for every change. That is the branch pull requests go to.

## With the devcontainer

You need Visual Studio Code with the Dev Containers extension, and Docker or a compatible container runtime.

1. Open the cloned repository in Visual Studio Code.
2. When asked, select **Reopen in Container**. Or open the command palette and run **Dev Containers: Reopen in Container**.
3. Wait for the container to build. Every time the container starts, it runs `script/bootstrap`, which installs the Node.js version from `.nvmrc` and the dependencies.

The container has the recommended extensions for ESLint, Prettier, and Lit, and formats files when you save.

Port 8123 in the container is published as port **8124** on your computer. Whatever runs on 8123 inside the container, you open at `http://localhost:8124`.

## On your own machine

You need:

- **Node.js**, in the version from the [`.nvmrc`](https://github.com/home-assistant/frontend/blob/dev/.nvmrc) file. With [nvm](https://github.com/nvm-sh/nvm), run `nvm install` in the repository and it picks the right one.
- **pnpm**, in the version pinned in the `packageManager` field of `package.json`. With Corepack, that version is used automatically:

  ```shell
  corepack enable pnpm
  ```

  If your Node.js does not include Corepack, install it with `npm install -g corepack`, or [install pnpm directly](https://pnpm.io/installation).

Then install the dependencies:

```shell
nvm use
script/setup
```

`script/setup` runs `script/bootstrap`, which runs `pnpm install`. Run it again after you pull changes that touch `package.json` or `pnpm-lock.yaml`.

## Translations

Without anything else, the frontend runs in English only. To get the latest translations of all languages, start a development server with `--fetch-translations`, like `pnpm dev --fetch-translations`. The first time, it asks you to authorize with GitHub, and it saves the token in `translations/token.json`. If that authorization stops working, for example with a "Bad credentials" error, delete the file and run the command again.

## AI tools

The repository has instructions for AI coding tools in `AGENTS.md`, and skills in `.agents/skills/` for components, styling, user-facing text, testing, and review. Claude Code, GitHub Copilot, and Codex pick them up by themselves. [Contribute with AI tools](/start/ai-tools/) lists them, with a workflow for adding a card, and explains what the [AI policy](/start/ai-policy/) asks of you.

## Next step

[Run the frontend](/frontend/development/run/) against a Home Assistant instance.
