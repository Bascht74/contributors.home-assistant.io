---
title: Design principles
description: The values behind every design decision. What the Open Home means for the interface, and how the personality of Home Assistant shows up in it.
order: 3
sidebarLabel: Principles
---

Every design decision in Home Assistant goes back to a few values. When two good options compete, these decide.

This page is about what those values mean for the interface. [Our principles](/start/principles/) covers the values of the whole project and how we work together. [Architecture principles](/architecture/principles/) covers what they mean for the code.

## The Open Home

The Open Home is the vision of Home Assistant for the smart home. It rests on three values of the [Open Home Foundation](/glossary/open-home-foundation/): privacy, choice, and sustainability.

### Privacy

Your home is your safe space. Devices work locally, and no one else needs to know when you turn on a light. A cloud connection is fine as an extra, but it is opt-in, never required.

In design: local first. Never design a flow that only works through the cloud when it can work locally.

### Choice

The data your devices collect is yours. You can combine devices from any manufacturer, and no vendor gets to lock you in.

In design: don't favor one brand or ecosystem. Show people what is possible, and let them decide.

### Sustainability

A smart home should keep working for the next decade, not until a manufacturer moves on. Devices and software are built to last.

In design: be careful with change. Every change in the interface asks something of millions of people who learned the old way. Change when it makes things clearly better, and help people find their way.

## How Home Assistant behaves

Home Assistant has a personality, described in five traits. In the interface, they show up in the small things: how an error is explained, how a setting is named, how an empty screen invites you to act.

- **Welcoming**: meet people at their own level. Never make anyone feel stupid for not knowing something.
- **Candid**: be honest about what works and what doesn't. Don't hide complexity behind false simplicity.
- **Supportive**: guide people forward without taking over. Explain what went wrong and what to do next.
- **Generous**: give people control. No artificial limits, no dark patterns.
- **Independent**: do things the Home Assistant way, not because a big tech platform does it like that.

The full description of each trait is on [Personality](/brand/personality/).
