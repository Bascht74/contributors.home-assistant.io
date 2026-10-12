---
title: Build an image
description: Set up the build container and build Home Assistant OS for a board.
sidebarGroup: Guides
order: 1
---

Home Assistant OS builds inside a Debian based container that has every tool Buildroot needs. You do not install Buildroot's dependencies on your own machine, and every contributor builds in the same environment.

New to embedded Linux and Buildroot? The free training material from [Bootlin](https://bootlin.com/docs/) is a good place to start. The [Buildroot manual](https://buildroot.org/downloads/manual/manual.html) is the reference you will keep coming back to.

## What you need

- A Linux machine with Docker, and permission to run privileged containers. Rootless Docker does not work: the build mounts a file system image on a loop device inside the container.
- A regular user account with `sudo`. The build scripts refuse to run as root, but some steps need elevated privileges.
- Disk space and time. A first build downloads and compiles everything, and takes an hour or more, depending on your machine.

## Get the source

The repository pulls in Buildroot as a Git submodule. Clone with the submodule:

```shell
git clone https://github.com/home-assistant/operating-system.git
cd operating-system
git submodule update --init
```

When you pull new changes, update the submodule as well. Buildroot is updated regularly, and a mismatch causes confusing build errors:

```shell
git pull
git submodule update
```

To throw away all your local changes and get back to a clean state:

```shell
git reset --hard
git submodule update --init --force
```

## Build for a board

Each build target has a configuration file in `buildroot-external/configs/`, named `<target>_defconfig`. Pass the target name to `make`, without the `_defconfig` part. `scripts/enter.sh` builds the build container and runs the command in it:

```shell
scripts/enter.sh make rpi4_64
```

`make help` lists every target. [Supported boards](/os/operating-system/boards/) explains which target is which board.

The build output goes to `output/`. The finished images are in `output/images/`, named after the board and version, like `haos_rpi4-64-18.4.dev0.img.xz`. Next to the disk image is a RAUC update bundle, `.raucb`, that you can use to update an existing installation. See [test your build](/os/operating-system/test/).

Downloads and the compiler cache are kept in `~/hassos-cache`, outside the repository. Set `CACHE_DIR` to put them somewhere else. Later builds are much faster because of it.

## Build more than one target

One output folder holds one target. To build several boards from the same checkout, give each its own output folder with `O=`:

```shell
scripts/enter.sh make O=output_rpi4_64 rpi4_64
scripts/enter.sh make O=output_ova ova
```

If you reuse an output folder for a different target, the build warns you and waits ten seconds. Run `make distclean` first in that case.

## Rebuild a package

Buildroot builds packages from source and remembers what it has built. A second build only regenerates what changed and the final image. To force a package to build again, delete its build folder:

```shell
rm -rf output/build/linux-custom/
```

Not sure which package a file in the image comes from? `output/build/packages-file-list.txt` maps every file to its package.

## Work inside the build container

Without arguments, `scripts/enter.sh` opens a shell in the build container. From there you can run the same builds, and other Buildroot targets:

```shell
scripts/enter.sh
make O=output_rpi4_64 rpi4_64
```

Targets the repository's `Makefile` does not know are passed on to Buildroot. For example, to change the configuration of a target interactively and then graph the dependencies between packages:

```shell
make O=output_rpi4_64 menuconfig
make O=output_rpi4_64 graph-depends
```

Run `make buildroot-help` to see everything Buildroot offers.

## Signing

Every build signs its update bundle. The first time you build, a self-signed certificate and key are created as `cert.pem` and `key.pem` in the root of the repository, and added to the keyring in the image. Every later build uses the same pair. That way an image you built yourself accepts update bundles from your later builds. [The update system](/os/operating-system/update-system/#security) has the details.

Keep the pair if you want to keep updating devices that run your builds. Deleting it means a new certificate, and devices with the old one will refuse your new bundles.
