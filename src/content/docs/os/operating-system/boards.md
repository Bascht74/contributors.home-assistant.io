---
title: Supported boards
description: Every board Home Assistant OS builds for, with its build target, bootloader, and machine type.
sidebarGroup: Boards
order: 1
---

Home Assistant OS builds one image per target. Each target has a configuration in `buildroot-external/configs/<target>_defconfig`, and a board folder with its [metadata](/os/operating-system/board-metadata/) in `buildroot-external/board/`. Since Home Assistant OS 17, every target is 64-bit.

## All targets

| Board | Build target | Bootloader | Partition table | Machine | Notes |
| --- | --- | --- | --- | --- | --- |
| Home Assistant Green | `green` | U-Boot | Hybrid | `green` | |
| Home Assistant Yellow | `yellow` | U-Boot | Hybrid | `yellow` | Carrier board for Raspberry Pi Compute Module 4 and 5 |
| Raspberry Pi 3 | `rpi3_64` | U-Boot | Hybrid | `raspberrypi3-64` | [Raspberry Pi](/os/operating-system/raspberry-pi/) |
| Raspberry Pi 4 | `rpi4_64` | U-Boot | Hybrid | `raspberrypi4-64` | [Raspberry Pi](/os/operating-system/raspberry-pi/) |
| Raspberry Pi 5 | `rpi5_64` | Tryboot | GPT | `raspberrypi5-64` | [Raspberry Pi](/os/operating-system/raspberry-pi/) |
| ODROID-C2 | `odroid_c2` | U-Boot | MBR | `odroid-c2` | [ODROID](/os/operating-system/odroid/) |
| ODROID-C4 | `odroid_c4` | U-Boot | MBR | `odroid-c4` | [ODROID](/os/operating-system/odroid/) |
| ODROID-M1 | `odroid_m1` | U-Boot | Hybrid | `odroid-m1` | [ODROID](/os/operating-system/odroid/) |
| ODROID-M1S | `odroid_m1s` | U-Boot | Hybrid | `odroid-m1` | [ODROID](/os/operating-system/odroid/) |
| ODROID-N2 and N2+ | `odroid_n2` | U-Boot | MBR | `odroid-n2` | [ODROID](/os/operating-system/odroid/), also Home Assistant Blue |
| Khadas VIM3 | `khadas_vim3` | U-Boot | MBR | `khadas-vim3` | |
| Generic x86-64 | `generic_x86_64` | GRUB | GPT | `generic-x86-64` | [Generic systems](/os/operating-system/generic/) |
| Generic aarch64 | `generic_aarch64` | GRUB | GPT | `qemuarm-64` | [Generic systems](/os/operating-system/generic/), also virtual machine images |
| Virtual machine | `ova` | GRUB | GPT | `qemux86-64` | [Virtual machines](/os/operating-system/virtual-machine/) |

The build target is what you pass to `make`, see [build an image](/os/operating-system/build/). The board identifier in image file names uses dashes instead, like `haos_rpi4-64-18.3.img.xz`.

## Kernels

Most boards run the mainline Linux kernel. Raspberry Pi boards and Home Assistant Yellow run the [Raspberry Pi fork](https://github.com/raspberrypi/linux). The current versions are in `Documentation/kernel.md` in the repository.

## Boards that were removed

The 32-bit targets were removed in Home Assistant OS 17: Raspberry Pi 2, the 32-bit builds of Raspberry Pi 3 and 4, ODROID-XU4, and ASUS Tinker Board. Raspberry Pi 1 and Zero W were dropped before that. Existing installations on those boards no longer get updates.

## Adding a board

Which boards are supported is a decision of the project, not only a question of code. [ADR-0015](https://github.com/home-assistant/architecture/blob/master/adr/0015-home-assistant-os.md) defines the supported hardware, and [ADR-0017](https://github.com/home-assistant/architecture/blob/master/adr/0017-hardware-screening-os.md) lists what a new board must meet, like long availability and upstream kernel support. Propose a new board in the [architecture repository](https://github.com/home-assistant/architecture) before you start.
