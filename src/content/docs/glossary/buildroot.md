---
title: "Buildroot"
description: "The tool Home Assistant OS is built with. It builds a complete, small Linux system from source, instead of starting from a distribution like Ubuntu."
sidebarGroup: "Installation and system"
term:
  code:
    - "buildroot/"
    - "buildroot-external/"
  related:
    - "home-assistant-os"
    - "rauc"
  autolink:
    - "Buildroot"
---

The home-assistant/operating-system repository has [Buildroot](https://buildroot.org/) as a Git submodule, and keeps everything specific to Home Assistant OS, like the board configurations and packages, in `buildroot-external/`. See [Build Home Assistant OS](/os/operating-system/build/).
