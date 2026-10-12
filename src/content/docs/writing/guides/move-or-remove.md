---
title: Move, rename, or remove a page
description: Pages get linked from everywhere. Here is how to change them without breaking those links.
order: 4
---

Documentation pages are linked from forum posts, blog posts, other websites, and Home Assistant itself. When a URL changes, those links should keep working.

## Move or rename a page

Add a redirect from the old URL to the new one in `source/_redirects`:

```text
/integrations/old_name  /integrations/new_name  301
```

The same applies when you move a section to another page: send the old address to where the content lives now.

## Remove an integration page

When an integration is removed from Home Assistant, or the whole integration is deprecated, its documentation goes too:

1. Delete the page from `source/_integrations`, together with its triggers, conditions, and actions in `source/_triggers`, `source/_conditions`, and `source/_actions`, if it has any.
2. Remove its icon and logo from the [brands repository](https://github.com/home-assistant/brands).
3. Remove its entry from the `CODEOWNERS` file.
4. Add a redirect in `source/_redirects`, in the section for removed integrations. Removed integrations all point to the same page, which explains to visitors what happened:

   ```text
   /integrations/old_name  /more-info/removed-integration  301
   ```

## Deprecated features

Do not wait until a feature is removed. The rule in the [documentation repository](https://github.com/home-assistant/home-assistant.io) is: "When a feature is deprecated or an integration is removed from Home Assistant, remove its documentation."

- If a feature is deprecated, remove its section from the integration page.
- Do not add a deprecation notice to the documentation.
- If an entire integration is deprecated, remove its page as described in [Remove an integration page](#remove-an-integration-page).
