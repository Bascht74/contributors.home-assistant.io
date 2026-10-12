---
title: The hass object and contexts
description: How components get their data. The hass object that holds everything, and the Lit contexts that give a component only the part it needs.
order: 2
---

The frontend keeps the state of Home Assistant in one object, `hass`. It holds the states of all entities, the registries, the configuration, the user, the translations, and the functions to call Core. Whenever something changes, the frontend makes a new `hass` object with new versions of only the parts that changed.

That makes it cheap to check for a change: compare by reference.

```ts
const changed = newHass.states !== oldHass.states;
```

## Two ways to get the data

**The `hass` property.** Panels, cards, and many components get `hass` set as a property, and pass it down to their children. It is simple, and it is the public API for [custom cards and panels](/frontend/custom-ui/). The downside: a new `hass` arrives on every change in the home, so a component that takes `hass` checks or rerenders far more often than it needs to, and it hides what data the component actually depends on.

**Contexts.** The root element provides the same data as a set of [Lit contexts](https://lit.dev/docs/data/context/), split by topic. A component consumes only the contexts it reads, and updates only when those change.

For new code in the frontend: leaf components consume the narrowest context that covers what they read. Containers that own `hass` and pass it on may keep the property.

## The contexts

The contexts are defined in `src/data/context/index.ts`.

| Context | Contains | Replaces |
| --- | --- | --- |
| `statesContext` | The states of all entities | `hass.states` |
| `entitiesContext` | The entity registry, for display | `hass.entities` |
| `devicesContext` | The device registry | `hass.devices` |
| `areasContext` | The area registry | `hass.areas` |
| `floorsContext` | The floor registry | `hass.floors` |
| `registriesContext` | All four registries together | |
| `servicesContext` | The available actions | `hass.services` |
| `internationalizationContext` | Language, locale, `localize`, and translation loaders | `hass.localize`, `hass.locale`, `hass.language` |
| `formattersContext` | The entity formatters | `hass.formatEntityState` and the others |
| `configContext` | Core configuration, the user, and auth | `hass.config`, `hass.user`, `hass.auth`, `hass.userData` |
| `connectionContext` | The WebSocket connection and its state | `hass.connection`, `hass.connected` |
| `apiContext` | The functions to call Core | `hass.callService`, `hass.callWS`, `hass.callApi`, and others |
| `uiContext` | Themes, panels, sidebar, and other UI state | `hass.themes`, `hass.panels`, and others |
| `narrowViewportContext` | Whether the main view uses the narrow layout | |
| `reducedMotionContext` | Whether the user prefers reduced motion | |

Some contexts are lazy: they subscribe to Core only when the first component consumes them, and unsubscribe after the last one goes away. These are `labelsContext`, `fullEntitiesContext`, `configEntriesContext`, `manifestsContext`, `triggerDescriptionsContext`, and `conditionDescriptionsContext`.

Older single-value contexts, like `localizeContext`, `themesContext`, and `userContext`, are deprecated. Use the grouped ones.

## Consume a context

Import `consume` from `src/common/decorators/consume`, not from `@lit/context`. The `@lit/context` version rerenders the component on every change of every consumed context. The frontend's version leaves that to the field, and ESLint blocks the other one.

```ts
@state()
@consume({ context: labelsContext, subscribe: true })
private _labels?: LabelRegistryEntry[];
```

How you combine the decorators decides when the component renders:

- `@state()` with `@consume`: the component rerenders when the context changes.
- `@state()` with `@consume` and `@transform`: the component rerenders only when the transformed value changes.
- `@consume` alone: the field stays current, but never triggers a render. Use this for values you only read in event handlers, like `apiContext`.

To take one value out of a grouped context, add `@transform` from `src/common/decorators/transform`:

```ts
@state()
@consume({ context: uiContext, subscribe: true })
@transform<HomeAssistantUI, Themes>({
  transformer: ({ themes }) => themes,
})
private _themes!: Themes;
```

### One entity

For a component that shows one entity, `src/common/decorators/consume-context-entry.ts` has helpers that follow an entity ID held on the component:

```ts
@state()
@consumeEntityState({ entityIdPath: ["_config", "entity"] })
private _stateObj?: HassEntity;

@state()
@consumeEntityRegistryEntry({ entityIdPath: ["_config", "entity"] })
private _entity?: EntityRegistryDisplayEntry;

@state() @consumeLocalize()
private _localize!: LocalizeFunc;
```

`consumeEntityStates` does the same for a list of entity IDs, and keeps the previous record when none of those entities changed.

The button card in `src/panels/lovelace/cards/hui-button-card.ts` is the reference example of a component that uses contexts instead of `hass`.

### In a reactive controller

A reactive controller extends `ContextController` and declares its fields with `consumeContext()`, both from `src/common/decorators/consume.ts`. `@state()` and `@transform` don't work on controllers: call `host.requestUpdate()` when the host needs to render. `src/data/service-info-controller.ts` is an example.

## Outside the frontend

Custom cards and panels can request contexts too, without importing anything from the frontend, by firing a `context-request` event. [Custom cards](/frontend/custom-ui/card/#get-only-the-data-you-need) shows how.

The methods and properties of `hass` itself are listed in [the hass object reference](/frontend/reference/hass-object/).
