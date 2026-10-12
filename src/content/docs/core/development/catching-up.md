---
title: Keeping your branch up to date
description: Bring the latest changes from the dev branch of Home Assistant Core into your branch, and resolve conflicts.
sidebarLabel: Keeping up to date
sidebarGroup: Pull requests
order: 4
---

The `dev` branch moves fast. If your work takes a while, or your pull request waits for review, bring in the latest changes now and then. It avoids conflicts, and failures that only show up once your change meets the latest code.

Use `git merge`, not `git rebase`, once your pull request is open. A rebase rewrites the commits reviewers have already seen.

## Merge the latest dev

Make sure you have the Home Assistant repository as a remote called `upstream`. If you followed the [environment setup](/core/development/environment/), you do. Otherwise, add it:

```shell
git remote add upstream https://github.com/home-assistant/core.git
```

Then, from your branch:

```shell
git fetch upstream dev
git merge upstream/dev
```

## Resolve conflicts

If Git reports conflicts:

1. Run `git status` to see which files conflict.
2. Edit each file, and resolve the parts between the `<<<<<<<` and `>>>>>>>` markers.
3. Add the resolved files with `git add`.
4. Finish the merge with `git commit`. The default message is fine.

Run the tests again: a merge without conflicts can still break your code.

## Push

```shell
git push
```

If Git answers that the upstream branch does not match the name of your branch, your branch still follows `upstream/dev`. Push once with `git push -u origin HEAD`, and a plain `git push` and `git pull` use your fork from then on.

If the push is rejected, someone pushed to your branch in the meantime. That can be you from another computer, or a reviewer who applied a suggestion. Pull those changes in, and push again:

```shell
git pull --no-rebase
git push
```

## Make sure the result is clean

If your pull request suddenly shows commits from other people, the merge went wrong. A pull request with unrelated commits cannot be reviewed. The easiest fix is a fresh branch from the latest `dev`, with only your changes, and a new pull request.
