---
title: Virtual machines
description: The ova target, the virtual disk formats it builds, and what a virtual machine needs to run Home Assistant OS.
sidebarGroup: Boards
order: 5
---

The `ova` target builds Home Assistant OS for x86-64 virtual machines. Its board files are in `buildroot-external/board/pc/ova/`. It is also the target the automated tests use, see [test your build](/os/operating-system/test/).

## Formats

One build produces the same system in several formats. The virtual disk is 32 GB.

| Format | File | For |
| --- | --- | --- |
| OVA | `.ova` | Import as a complete virtual machine, like in VMware or VirtualBox |
| VMDK | `.vmdk.zip` | VMware, VirtualBox |
| VHDX | `.vhdx.zip` | Hyper-V |
| VDI | `.vdi.zip` | VirtualBox |
| QCOW2 | `.qcow2.xz` | QEMU, KVM, Proxmox |

## Requirements

- UEFI boot. Legacy BIOS boot does not work.
- A 64-bit Linux guest type, kernel 4.x or later.
- At least 2 virtual CPUs and 2 GB of memory. More helps.
- A network adapter.

The image includes guest tools for common hypervisors, like the QEMU guest agent and the Hyper-V daemons.

## Consoles

The console shows on the virtual screen, and on the first serial port, `ttyS0`. The GRUB boot menu lets you pick a slot or a rescue shell, see [debug the host](/os/operating-system/debugging/#rescue-shell).
