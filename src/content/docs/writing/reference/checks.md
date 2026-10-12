---
title: Automated documentation checks
description: What the automated checks on your documentation pull request look for, how to run them yourself, and how to change them.
order: 4
sidebarLabel: Automated checks
---

Every pull request to the [home-assistant.io repository](https://github.com/home-assistant/home-assistant.io) runs a set of automated checks. They catch the small things, like a code block without a language or a misspelled product name, so reviewers can focus on the content.

The checks run in the [`test.yml`](https://github.com/home-assistant/home-assistant.io/blob/current/.github/workflows/test.yml) GitHub Actions workflow. Two of them are about your writing:

- **Lint Markdown** checks the structure and formatting of your Markdown, with [remark](https://remark.js.org/).
- **Lint Text** checks spelling, terminology, and wording, with [textlint](https://textlint.github.io/).

The Markdown job also checks that integration pages in `source/_integrations/` use the `.markdown` file extension. A `.md` file there fails the check.

A third job, **Build Astro site**, builds the part of the site in the `astro` folder. It does not look at your writing, but it has to pass too.

## Run the checks locally

You need [Node.js](https://nodejs.org/). The lint jobs in the CI use version 20. The repository's `.nvmrc` file and the devcontainer use version 26.

1. In your clone of the repository, install the dependencies:

   ```shell
   npm install
   ```

2. Run the Markdown checks:

   ```shell
   npm run markdown:lint
   ```

3. Run the text checks:

   ```shell
   npm run textlint
   ```

These are the same commands the CI runs. They are defined in [`package.json`](https://github.com/home-assistant/home-assistant.io/blob/current/package.json).

To check a single page while you work, run the tools on that file directly:

```shell
npx remark --quiet --frail source/_integrations/my_integration.markdown
npx textlint source/_integrations/my_integration.markdown
```

> [!TIP]
> The repository recommends the textlint and markdownlint extensions for Visual Studio Code. With those installed, you see most problems in your editor while you type.

## Markdown checks

The `markdown:lint` script runs `remark --quiet --frail .` on the whole repository. The `--frail` flag turns warnings into failures, so every finding blocks the check.

The rules live in [`.remarkrc.js`](https://github.com/home-assistant/home-assistant.io/blob/current/.remarkrc.js). They check:

- **Code blocks**: every fenced code block names its language. Shell examples do not start each line with `$`, because that breaks copy and paste. A `$` is fine when you need to tell a command apart from its output.
- **Headings**: headings use the `#` style, and only go down one level at a time. No jumping from `##` to `####`.
- **Lists**: unordered lists use `-`. Ordered lists use a period after the number, like `1.`, and number their items consistently. Counting up, `1.`, `2.`, `3.`, is the convention.
- **Spelling of names**: a list of prohibited strings, like `Github` instead of `GitHub`, `websocket` or `Websocket` instead of `WebSocket`, and `Speech-To-Text` instead of `Speech-to-text`.
- **Links to the site itself**: a full `https://www.home-assistant.io/` link should be a relative path, like `/integrations/hue/`.

Some files are skipped on purpose, like the blog posts and changelogs. They are listed in [`.remarkignore`](https://github.com/home-assistant/home-assistant.io/blob/current/.remarkignore).

### Add a remark rule

1. Install the package of the rule, which updates `package.json` and `package-lock.json`:

   ```shell
   npm install --save-dev remark-lint-some-rule
   ```

2. Enable and configure the rule in `.remarkrc.js`.
3. Run `npm run markdown:lint`.
4. Fix the existing violations, or add a justified exclusion to `.remarkignore`.

## Text checks

The `textlint` script checks these folders:

- `source/_docs`
- `source/_faq`
- `source/_integrations`
- `source/_dashboards`
- `source/cloud`
- `source/getting-started`
- `source/hassio`
- `source/dashboards`

Other folders, like the blog, are not checked by the CI. To check everything under `source`, run `npm run textlint:all`.

The rules live in [`.textlintrc.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.textlintrc.json):

- `common-misspellings` catches common spelling mistakes.
- `terminology` enforces product names, preferred terms, and wording. It skips text inside blockquotes.
- The `comments` filter lets you turn textlint off for a part of a page.
- The `allowlist` filter ignores text that would otherwise give false positives, like YAML keys such as `mqtt:` or `homeassistant:`.

### Add a terminology entry

Terminology lives in the `terms` list of the `terminology` rule, in `.textlintrc.json`. An entry takes one of two forms.

A plain string is a term that must keep exactly this spelling and capitalization:

```json
"Home Assistant",
"Z-Wave",
"GitHub"
```

A pair flags one spelling and suggests another. The first value is the pattern to match, the second is the suggestion shown to the contributor:

```json
["addon", "add-on"],
["colour", "color"],
["repo\\b", "repository"]
```

The pattern is a regular expression inside a JSON string. Escape characters that have a special meaning in either, like the backslash in `\\b` above.

Put new entries near related ones. Then run `npm run textlint` to see what the change catches.

### Disable textlint for a part of a page

Sometimes textlint flags something that is correct. In that case, wrap the text in HTML comments:

```html
<!-- textlint-disable -->

Text that textlint should skip.

<!-- textlint-enable -->
```

To turn off only one rule, add its name:

```html
<!-- textlint-disable terminology -->

Text that the terminology rule should skip.

<!-- textlint-enable terminology -->
```

Some guidelines:

- Keep the disabled part as small as possible.
- Put a blank line before and after each comment, unless that breaks the surrounding Markdown.
- Do not put these comments inside a [text box](/writing/reference/liquid/#text-boxes).

### Add a textlint rule

1. Add the package of the rule to `package.json`, and update `package-lock.json`.
2. Enable and configure the rule in `.textlintrc.json`.
3. Run `npm run textlint`.
4. Fix the existing violations, or add narrow exclusions to the `allowlist` in `.textlintrc.json`.

## Markdownlint

The repository also has a [`.markdownlint.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.markdownlint.json) file. It configures [markdownlint](https://github.com/DavidAnson/markdownlint) for editors:

- The first heading of a page is level 2 (`MD002`), because the title comes from the front matter.
- There is no line length limit (`MD013`), so you can write flowing text.
- Headings with the same text are allowed, as long as they are not siblings under the same parent (`MD024`).
- Inline HTML is allowed (`MD033`).

The markdownlint extension is in the recommended extensions of [`.vscode/extensions.json`](https://github.com/home-assistant/home-assistant.io/blob/current/.vscode/extensions.json), so you may see its warnings in Visual Studio Code.

> [!NOTE]
> Markdownlint does not run in the CI, and there is no `package.json` script for it. Its warnings are hints, not blockers. If a markdownlint rule must be enforced on pull requests, it also needs a script and a step in the workflow.
