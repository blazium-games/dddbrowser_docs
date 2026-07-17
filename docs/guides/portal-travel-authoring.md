---
sidebar_position: 3
---

# Portal & travel authoring

How portals and URL travel work for authors.

## One scene at a time

DDDBrowser loads **exactly one** scene. Portal or URL travel **unloads** the current scene and **loads** the destination. There is no seamless streamed adjacency yet (`world.id` / `world.position` are metadata + compatibility checks).

## Trigger mutex

Each portal must enable **exactly one** trigger mode:

| Flag | Default | Behavior |
|------|---------|----------|
| `manualTrigger` | **true** | Interact → confirmation modal → load |
| `autoTrigger` | false | Enter radius → shared travel preview / load path |
| `scriptTrigger` | false | Interact → script `on_interact`; script calls `Engine.triggerPortal(id)` or `Scene.TravelTo(url)` |

Schema/runtime reject zero or multiple triggers. Omitting flags yields manual-only defaults.

## Author UX tips

1. Prefer **manual** portals for public hubs (clear confirm).
2. Use **auto** only when accidental travel is acceptable.
3. Use **script** when game logic must gate travel (`Engine.triggerPortal`).
4. Destination URL: HTTPS preferred; HTTP requires user Allow HTTP.
5. Metadata/thumbnail improve the confirm preview—not an in-app catalog.

## URL bar travel

Top-bar URL + Load uses the same load path (discovery → validate → assets → render). Portals do not keep the previous world in memory.

## Related

- [Scene features — Portals](/docs/using/scene-features)
- [Instances — Portal](/docs/scene-format/instances)
- [Engine API — triggerPortal](/docs/luau/engine-api)
- [Publish checklist](/docs/guides/publish-checklist)
