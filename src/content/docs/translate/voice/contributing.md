---
title: Contribute sentences and responses
description: How to change the sentences, responses, and tests of your language in the intents repository, check your work, and open a pull request.
order: 2
sidebarLabel: Contribute sentences
---

All sentences, responses, and tests live in the [intents repository](https://github.com/OHF-Voice/intents) on GitHub. You change them with a pull request, and the language leader of your language reviews it. This page walks you through that.

## Add one sentence in your browser

The smallest useful change is one new way to say a command that Assist already knows. You can make it on GitHub, in your browser, without installing anything. New to GitHub? [Use GitHub, without being a developer](/start/github/) covers the basics.

Every sentence needs a test, so your change always touches two files with the same path: the sentence file and its test file. To teach Dutch a new way to turn something on by its name, for example:

1. Open [`sentences/nl/HassTurnOn/name_only.yaml`](https://github.com/OHF-Voice/intents/blob/main/sentences/nl/HassTurnOn/name_only.yaml) and select the pencil icon to edit it.
2. Add your sentence template to the `sentences` list of the block it belongs to.
3. Select **Commit changes** and create a new branch. If you cannot write to the repository, GitHub makes a copy (a fork) for you and puts the branch there.
4. Before you open the pull request, open `tests/nl/HassTurnOn/name_only.yaml` on that same branch and edit it the same way. Add a test sentence that uses your new template to the test group with the same slots and response, and commit it to the branch.
5. Open the pull request.

The checks on your pull request then tell you if something is off. They fail when a sentence file has no test file, when a file has fewer test sentences than sentence templates, when a sentence template is not used by any test sentence, and when a test sentence does not match the expected intent, slots, or response. They also check the formatting of your YAML. After that, the language leader of your language reviews your change.

Ready for more than one sentence? Read on.

## What is where

Every language has its own folders. Replace `<language>` with your language code, like `nl` or `pt-BR`:

| Folder | What it holds |
| --- | --- |
| `sentences/<language>/<intent>/<slot_combination>.yaml` | The sentence templates for one intent and slot combination |
| `sentences/<language>/_common.yaml` | Error responses, skip words, and settings for the whole language |
| `responses/<language>/<intent>.yaml` | The responses of one intent |
| `lists/<language>/` | Slot lists, like colors or states |
| `rules/<language>/` | Expansion rules, like the verbs for turning something on |
| `tests/<language>/<intent>/<slot_combination>.yaml` | The tests for one intent and slot combination |

Two files at the root apply to every language:

- [`intents.yaml`](https://github.com/OHF-Voice/intents/blob/main/intents.yaml) declares the intents and their slot combinations.
- [`languages.yaml`](https://github.com/OHF-Voice/intents/blob/main/languages.yaml) lists the languages and their leaders.

So if you want to improve how Dutch speakers turn things on and off by name, you change these four files:

- `sentences/nl/HassTurnOn/name_only.yaml`
- `sentences/nl/HassTurnOff/name_only.yaml`
- `tests/nl/HassTurnOn/name_only.yaml`
- `tests/nl/HassTurnOff/name_only.yaml`

## Who owns what

The folders of a language belong to its language leaders. The [`CODEOWNERS`](https://github.com/OHF-Voice/intents/blob/main/CODEOWNERS) file, generated from `languages.yaml`, asks them for a review automatically.

`intents.yaml` is different. A change there affects every language at once, so only the repository maintainers can change it. A pull request from anyone else that touches it fails the `guard-core-files` check. If a slot combination is missing, is marked wrong, or does not fit your language, [open an issue](https://github.com/OHF-Voice/intents/issues) that explains what you need.

> [!NOTE]
> Serbian in Latin script (`sr-Latn`) is generated from Serbian in Cyrillic script (`sr`). Make your changes in `sr`. A check fails when the two drift apart.

## Keep it small

Limit each pull request to one language and one intent. Small pull requests are easier to review, so they get merged sooner. Ten small pull requests beat one huge one.

## Pick your setup

There are three ways to work on the repository. Pick the one that fits the size of your change.

### Edit on GitHub

For a small fix in one file, like a typo in a response, you do not need anything installed. New to GitHub? [Use GitHub, without being a developer](/start/github/) walks you through the same steps in more detail.

1. Open the file on GitHub and select the pencil icon to edit it.
2. Make your change.
3. Select **Commit changes**, choose to create a new branch and start a pull request, and describe what you changed.

The checks run on your pull request, so you still find out if something is wrong.

### Use a codespace

For anything bigger, a [GitHub codespace](https://docs.github.com/codespaces/overview) gives you a complete environment in your browser, with an editor and a terminal. Nothing to install.

1. On the [repository page](https://github.com/OHF-Voice/intents), select **Code** > **Codespaces** > **Create codespace on main**. It takes a minute or two to start.
2. Select the branch name in the status bar at the bottom, and create a new branch.
3. Make your changes.
4. Run the checks for the file you have open: open the menu, select **Terminal** > **Run Task**, and pick **Run tests for current file**.
5. In **Source Control**, commit your changes and select **Create Pull Request**.

The [codespace walkthrough](https://github.com/OHF-Voice/intents/blob/main/docs/codespace/README.md) in the repository has screenshots of every step.

### Work locally

If you prefer your own machine, fork and clone the repository, then set it up:

```shell
git clone https://github.com/<your-username>/intents
cd intents
script/setup
```

`script/setup` creates a Python virtual environment in `venv/` and installs everything you need. Activate it with `source venv/bin/activate` before you run the commands below. The repository also works as a [devcontainer](https://containers.dev/), if your editor supports those.

Create a branch, make your changes, and push them to your fork to open a pull request.

## Check your work

The checks that run on your pull request can also run on your machine or in your codespace. Run them before you open the pull request, it saves you a round trip.

Validate the files of your language:

```shell
python3 -m script.intentfest validate --language nl
```

Validation checks that every file matches the slot combinations in `intents.yaml`, that every list and rule you use exists, and that all `required` slot combinations have sentences.

Run the tests of your language:

```shell
pytest tests --language nl
```

Add `-k HassTurnOn` to only test one intent, and `-n auto` to run the tests in parallel. The tests check that every sentence matches the right intent, fills the right slots, and gives the right response. They also fail when a sentence template is never used by any test sentence.

`script/test` runs both: validation and all tests. You can pass the same options, like `script/test --language nl`.

## Try things out

A few more tools help you while you write.

See what your language makes of a sentence:

```shell
python3 -m script.intentfest parse --language en \
  --sentence 'turn on the lights in the kitchen'
```

It prints the intent and the slots it matched, as JSON.

See which sentences a template produces:

```shell
python3 -m script.intentfest sample_template 'turn on [the] light[s]'
```

You can give it list values, number ranges, and rules too, like `--values color red green`, `--range brightness 1 2`, or `--rule color '[the] {color}'`.

Sample sentences your language accepts, for some intents:

```shell
python3 -m script.intentfest sample --language nl \
  --intents HassTurnOn HassTurnOff -n 5
```

Count how many sentences your templates add up to:

```shell
python3 -m script.intentfest count_sentences --language nl --summary
```

Optional words and alternatives multiply. A language with millions of possible sentences gets slow on small devices. Leave off `--summary` to see the count per template, so you can find the ones that grew too large.

## What the pull request checks

On top of validation and tests, a pull request also checks that:

- No intent steals the sentences of another intent. A greedy template for playing media should not catch "set the light to maximum", for example.
- Your language has no rules or lists left that nothing uses.
- `CODEOWNERS` still matches `languages.yaml`.
- Your YAML files are formatted the way [Prettier](https://prettier.io/) formats them. `script/lint` runs this check, and the Python checks, locally.

A pull request can only be merged when all checks pass.

## After the merge

New sentences are published in the next release of the `home-assistant-intents` package. Home Assistant updates to new releases of that package, and from then on, your sentences ship with Home Assistant.
