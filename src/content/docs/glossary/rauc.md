---
title: "RAUC"
description: "The update system of Home Assistant OS. It installs a new version of the whole system next to the running one, so a device can go back when an update does not work."
sidebarGroup: "Installation and system"
term:
  aliases:
    - "update bundle"
  code:
    - ".raucb"
    - "buildroot-external/ota/"
  related:
    - "home-assistant-os"
    - "buildroot"
    - "supervisor"
  autolink:
    - "RAUC"
---

Home Assistant OS has two system slots. [RAUC](https://rauc.io/) writes an update bundle to the slot that is not running, and the device boots into it. If that does not work, it goes back to the slot it came from. The Supervisor starts these updates. See [The update system](/os/operating-system/update-system/).
