---
title: The data layer
description: How the frontend talks to Core. WebSocket commands, subscriptions, and collections in src/data, and how components use them.
order: 3
---

Everything the frontend knows about Home Assistant comes over one WebSocket connection, managed by the [`home-assistant-js-websocket`](https://github.com/home-assistant/home-assistant-js-websocket) library. The core of the state, like entities and registries, arrives through `hass` and the [contexts](/frontend/architecture/hass-and-contexts/). Everything else, a component asks for itself.

## src/data

All communication with Core goes through `src/data/`. Each file, or folder, owns one topic: its types, and the functions that call Core for it. Components import those functions instead of sending messages themselves. That keeps the shape of each message in one place, next to its types.

A typical data module has a type that matches what Core sends, and a function per command:

```ts
export interface LabelRegistryEntry extends RegistryEntry {
  label_id: string;
  name: string;
  icon: string | null;
  color: string | null;
  description: string | null;
}

export const createLabelRegistryEntry = (
  hass: HomeAssistant,
  values: LabelRegistryEntryMutableParams
) =>
  hass.callWS<LabelRegistryEntry>({
    type: "config/label_registry/create",
    ...values,
  });
```

Types follow the source that owns the data, the WebSocket command in Core, not what one component happens to need. Optional and nullable fields in the type match what Core actually sends.

## Commands

For a single request and answer, use `hass.callWS()`. It sends a message and returns a promise of the result. It rejects with an error object when Core reports a failure.

```ts
const labels = await hass.callWS<LabelRegistryEntry[]>({
  type: "config/label_registry/list",
});
```

`hass.callService()` calls an [action](/glossary/action/), and `hass.callApi()` calls the REST API. New features use WebSocket commands, not REST.

## Subscriptions

To stay in sync with something that changes, subscribe. Core then pushes every change to the frontend until you unsubscribe.

```ts
export const subscribeFrontendUserData = (
  conn: Connection,
  key: string,
  onChange: (data: { value: unknown }) => void
) =>
  conn.subscribeMessage(onChange, {
    type: "frontend/subscribe_user_data",
    key,
  });
```

`subscribeMessage` returns a promise of an unsubscribe function. Always call it when the data is no longer needed, or Core keeps sending updates to a component that is gone.

## Collections

When several components need the same data, a collection shares one subscription between them. `createCollection` from `home-assistant-js-websocket` takes a key, a function that fetches the data, and a function that subscribes to updates. Every subscriber gets the same data. When the last subscriber leaves, the subscription to Core is closed after a grace period of 5 seconds, so a component that comes right back doesn't start a new one.

```ts
export const subscribeLabelRegistry = (
  conn: Connection,
  onChange: (labels: LabelRegistryEntry[]) => void
) =>
  createCollection<LabelRegistryEntry[]>(
    "_labelRegistry",
    fetchLabelRegistry,
    subscribeLabelRegistryUpdates,
    conn,
    onChange
  );
```

Here, `subscribeLabelRegistryUpdates` listens for the `label_registry_updated` event, and fetches the list again when it fires.

## Subscribe from a component

`SubscribeMixin` from `src/mixins/subscribe-mixin.ts` handles the lifecycle for you. Return your subscriptions from `hassSubscribe()`. The mixin subscribes when the component is connected and has `hass`, and unsubscribes when it disconnects.

```ts
@customElement("ha-config-repairs-dashboard")
class HaConfigRepairsDashboard extends SubscribeMixin(LitElement) {
  @state() private _issues: RepairsIssue[] = [];

  public hassSubscribe(): UnsubscribeFunc[] {
    return [
      subscribeRepairsIssueRegistry(this.hass.connection!, (repairs) => {
        this._issues = repairs.issues;
      }),
    ];
  }
}
```

When the subscription depends on another property, list that property in `hassSubscribeRequiredHostProps`. The mixin waits until it is set.

For data that many components share, like labels, prefer a [lazy context](/frontend/architecture/hass-and-contexts/#the-contexts) over a subscription per component.

## Something new in Core

When the data you need is not available yet, Core needs a new WebSocket command. [Add a WebSocket command](/frontend/extending/websocket-api/) shows both sides.
