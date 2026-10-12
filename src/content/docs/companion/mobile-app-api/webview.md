---
title: Web view
description: Show the Home Assistant frontend inside an app without asking the user to log in a second time.
order: 6
---

The user already logged in when they set up your app. They shouldn't have to log in again to see their dashboards. The frontend supports that: when it runs inside an app, it can ask the app for an access token instead of showing a login page.

## External authentication

The app injects a small JavaScript bridge into the web view. When the frontend needs a token, it calls the app through that bridge, and the app answers with an access token. When the user logs out in the frontend, it asks the app to revoke the token.

The app refreshes the access token itself, with the refresh token it got at [login](/companion/mobile-app-api/setup/#log-the-user-in). The frontend never sees the refresh token.

## The external bus

The same bridge carries the external bus: messages in both directions between the frontend and the app. Through it, the frontend can open the native settings of the app, start a barcode scanner, start Assist, or hand an entity to the app's own **Add to** actions, and the app can tell the frontend what it supports.

Both protocols are documented on the frontend side: [external authentication](/frontend/reference/external-auth/) and the [external bus](/frontend/reference/external-bus/). For how the Android app implements them, see [the frontend screen](/companion/android/frontend-screen/#talking-to-the-frontend).

## Needs a direct connection

The web view loads the frontend from the instance itself: the internal URL, the external URL, or the remote URL of Home Assistant Link. The webhook's cloudhook URL is no use here.
