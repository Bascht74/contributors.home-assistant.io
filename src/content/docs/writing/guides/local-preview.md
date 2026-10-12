---
title: Preview the site locally
description: Run home-assistant.io on your own machine, so you can see bigger changes before you share them.
order: 2
---

For small fixes, the Deploy Preview on your pull request is enough. For bigger changes, like a new page or a restructured section, it is faster to see your work locally while you write.

## With a devcontainer

The easiest way is Visual Studio Code with a devcontainer. It sets up everything for you, without installing Ruby on your machine.

1. Fork the [home-assistant.io repository](https://github.com/home-assistant/home-assistant.io) and open it in Visual Studio Code.
2. When asked, reopen the folder in the container.
3. Open the command palette and run **Tasks: Run Task** > **Preview**.
4. Open `http://localhost:4000` in your browser.

## Without a devcontainer

You need Ruby and Node.js. The required versions are in the [`.ruby-version`](https://github.com/home-assistant/home-assistant.io/blob/current/.ruby-version) and [`.nvmrc`](https://github.com/home-assistant/home-assistant.io/blob/current/.nvmrc) files of the repository. Node.js is needed because generating the site also builds its Astro part.

1. Install Ruby, Bundler, and Node.js for your system.
2. In your clone of the repository, install the dependencies:

   ```shell
   bundle
   npm install
   ```

3. Generate the site once. The first time takes a minute:

   ```shell
   bundle exec rake generate
   ```

4. Start the preview:

   ```shell
   bundle exec rake preview
   ```

5. Open `http://127.0.0.1:4000`. Changes to files are picked up automatically, refresh your browser to see them.

## Run the checks

The same checks that run on your pull request can run on your machine. They need Node.js:

```shell
npm install
npm run markdown:lint
npm run textlint
```

`markdown:lint` checks the Markdown structure. `textlint` checks spelling and terminology. [Automated checks](/writing/reference/checks/) explains what they look for, and how to handle a false alarm.
