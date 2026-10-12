---
title: Secure companion apps
description: What the advisories of the Android and iOS apps teach about links, exported components, the WebView, and the JavaScript bridge.
sidebarLabel: Companion apps
order: 4
---

A [companion app](/glossary/companion-app/) is logged in to the Home Assistant server of the user, and it keeps that login on the phone. That makes the app a key to the house. Anything that can make the app do something on its own, like another app on the same phone, a link in a message, or a web page in a frame, can use that key without ever knowing the password.

Most advisories of the companion apps come down to that one idea. This guide goes through them, by the kind of mistake, with what the apps do today. For how the apps are built, see [Companion apps](/companion/).

## Ask before acting on a link

The apps react to links and tags: an NFC tag, a QR code, a `homeassistant://` link, a universal link to `https://www.home-assistant.io/tag/`. The operating system delivers those to the app, and it does not care who sent them. Another app on the phone can send the same link, with no user in the loop.

That went wrong twice:

- In 2023, a link or a QR code could make the iOS and macOS app [call actions](https://github.com/home-assistant/core/security/advisories/GHSA-h2jp-7grc-9xpp) on the server, without asking.
- In 2026, other apps could open a tag link in the [Android app](https://github.com/home-assistant/core/security/advisories/GHSA-2xqv-hwrf-983f) and the [iOS app](https://github.com/home-assistant/core/security/advisories/GHSA-j23v-9672-677j), and the scan went straight to the server. Tags are often tied to automations that unlock a door or disarm an alarm.

The lesson: a link is a request, not a command. When it would change something on the server, the user approves it first, inside the app.

What the apps do today:

- Both apps ask before they send a tag scan from a link to the server, with **Allow once** and **Allow always**. A setting lets the user take back the tags that are always allowed.
- The iOS app asks for confirmation before it calls an action, fires an event, or sends the location because of a URL.

If you add a new link, a new intent, or a new shortcut that acts on the server, give it the same confirmation.

## Show which server you connect to

An invite link of the Android app carried the address of a server, and the app started onboarding against it [without showing that address](https://github.com/home-assistant/core/security/advisories/GHSA-68f4-97mf-f68w). The login page then loads in a WebView without an address bar. A fake server could show a perfect copy of the login page and collect the password.

The lesson: when a link decides where the app connects, show the user where that is before anything happens. The Android app now shows an invitation screen with the address of the server, a warning to only accept invites from people you trust, and **Accept** and **Reject**.

## Keep the internal URL at home

The internal URL of a server is often plain `http:`, which is fine on the home network, and not anywhere else. The iOS app [fell back to the internal URL](https://github.com/home-assistant/core/security/advisories/GHSA-cm5v-547m-qh5h) on networks that were not on the list of home Wi-Fi networks of the user. On a public network, the token could go out in plain text, to whoever answered on that address.

The lesson: a list that is meant to limit where something happens has to limit it on every path, including the fallback. The iOS app now has a connection security level per server. This choice matters when the internal URL is the only URL of the server, and it is not `https:`. With **Most secure**, the app only uses that URL on the home networks the user listed. With **Less secure**, it uses it anywhere, and the user accepts that risk. The Android app keeps a similar choice per server, as `allowInsecureConnection`.

## Keep components private

On Android, an activity, a service, or a receiver with `android:exported="true"` can be started by any app on the phone, with any data. The location receiver of the Android app was exported, and [accepted location updates](https://github.com/home-assistant/core/security/advisories/GHSA-77r5-pw5w-mgj3) from any app. A malicious app could send a fake location, and trigger automations that react to someone coming home.

The fix shows the pattern:

- The receiver that handles location data is not exported anymore.
- A small, separate receiver stays exported, for the public action that tools like Tasker use. It only accepts that one action, drops whatever data the caller sends along, and passes the request on inside the app.

```xml
<receiver
    android:name=".sensors.LocationSensorReceiver"
    android:exported="false" />
```

Before you export a component, ask who else needs to reach it. If the answer is nobody, set `android:exported="false"`. If some other app must reach it, accept the smallest thing that works, and never trust the data that comes with it.

The [architecture skill](https://github.com/home-assistant/android/blob/main/.agents/skills/ha-android-architecture/SKILL.md) of the Android repository adds a related rule: always set the mutability of a `PendingIntent`, and default to `FLAG_IMMUTABLE`, because needless mutability widens the attack surface.

## Load only the server in the WebView

The WebView of the apps runs the frontend, with access to the token. In 2023, a link could make the Android app [load an arbitrary URL](https://github.com/home-assistant/core/security/advisories/GHSA-jvpm-q3hq-86rg) in that WebView. A page of an attacker would then run with the same powers as the frontend.

The lesson: a URL from a link, an intent, or a notification is untrusted. Check where it points before the WebView loads it.

## Guard the JavaScript bridge

The frontend talks to the app through a JavaScript bridge: `window.externalApp` on Android, and message handlers like `getExternalAuth` on iOS. The frontend asks for the access token through it.

In 2026, [two mistakes together](https://github.com/home-assistant/core/security/advisories/GHSA-7jp2-p2fw-mgvf) let a web page in a frame, like a Webpage card on a dashboard, get that token:

1. The bridge answered every frame, also frames from another origin.
2. The app put the callback name from the message into JavaScript it ran in the main frame, without checking it.

What the apps do today:

- On Android, a newer bridge, `externalAppV2`, uses `addWebMessageListener` and ignores messages from frames, and from origins that do not match the loaded server. The app uses it when the server and the WebView support it.
- On Android, `getExternalAuth` and `revokeExternalAuth` only accept the two callback names the frontend uses, `externalAuthSetToken` and `externalAuthRevokeToken`, for both bridges.
- On iOS, `SafeScriptMessageHandler` only passes on messages from the main frame, with a scheme, host, and port that match a URL of the server.

The core of the Android check looks like this:

```kotlin
if (!isMainFrame) {
    Timber.w("Ignored message from iframe")
    return@addWebMessageListener
}
val currentUri = stateProvider().url?.toUri()
if (!sourceOrigin.hasSameOrigin(currentUri)) {
    return@addWebMessageListener
}
```

The lesson: decide who may talk to the bridge, by frame and by origin. And never turn a value from a message into code: compare it to a fixed list instead.

## Keep secrets out of logs

Users share logs when they report a problem. The [logging skill](https://github.com/home-assistant/android/blob/main/.agents/skills/ha-android-logging-errors/SKILL.md) of the Android repository asks you to wrap user data in `sensitive()`, so it does not show in release logs. Entity IDs are fine. URLs, and anything that identifies the server or the user, are not. For data stored on the phone, the [architecture skill](https://github.com/home-assistant/android/blob/main/.agents/skills/ha-android-architecture/SKILL.md) points to `EncryptedSharedPreferences`.

## Related

- [Past advisories](/security/reference/advisories/#companion-apps): every advisory of the companion apps in one table.
- [Untrusted content in the frontend](/security/guides/frontend/): the frontend side, which the apps show.
- [Companion apps](/companion/): how the apps are built.
