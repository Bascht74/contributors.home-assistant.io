---
title: Licensing and the CLA
description: Which licenses Home Assistant uses, what the Contributor License Agreement says, and how you sign it.
sidebarLabel: Licensing and the CLA
order: 8
---

Everything you contribute to Home Assistant is shared with the world under an open source license. Before your first code contribution is merged, you confirm that you have the right to share it that way, by signing the Contributor License Agreement (CLA). You do that once.

## The licenses

- **Code** is released under the [Apache License 2.0](https://www.home-assistant.io/developers/license/). That includes Home Assistant Core, the frontend, and the other software repositories.
- **Documentation** on home-assistant.io is released under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](https://github.com/home-assistant/home-assistant.io/blob/current/LICENSE.md).

Each repository has a `LICENSE` file at its root. When in doubt, that file is what counts for that repository.

## The Contributor License Agreement

The CLA is short. By making a contribution, you certify the following:

```txt
By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the Apache 2.0 license; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the Apache 2.0 license; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it) is maintained indefinitely
    and may be redistributed consistent with this project or the open
    source license(s) involved.
```

In plain words: you wrote it yourself, or it comes from open source work you're allowed to share. And you understand that your contribution is public, and stays public.

The CLA is based on the [Developer Certificate of Origin](https://elinux.org/Developer_Certificate_Of_Origin) of the Linux project, changed to name the Apache 2.0 license and to leave out the sign-off. Its text is available under the [Creative Commons Attribution-ShareAlike 3.0 Unported License](https://creativecommons.org/licenses/by-sa/3.0/). The full page, with its history, is [on home-assistant.io](https://www.home-assistant.io/developers/cla/).

## Signing it

You don't need to do anything up front. The code repositories of Home Assistant, like Core, the frontend, the companion apps, the Supervisor, Home Assistant OS, and the official apps, check every pull request for a signed CLA. The first time you open a pull request in one of them without having signed, a bot comments with a link. Follow it and the instructions there. Once signed, it covers your future contributions too.

## Code from somewhere else

Point (b) matters when you bring in code you didn't write, like a snippet from another project. Only do that when its license allows it, and say where it comes from in your pull request. The same goes for code written with AI tools: you're responsible for what you submit. See the [AI policy](/start/ai-policy/).

## Credits

Home Assistant has a [credits page](https://www.home-assistant.io/developers/credits/) that lists the people who contributed across the repositories of the project.
