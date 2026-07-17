---
sidebar_position: 6
---

# Save & autosave patterns

Checkpoints are intentional progress saves—not a full ECS world dump.

## What round-trips (`scene_state.json` v2)

- Player camera pose
- Script / gamemode `on_save` tables (`scriptState`)
- Session spawns (`Engine.spawnEntity`) + transforms
- `entityVisibility`, `entityLights` (including attenuation)
- Spawned audio **flags** (loop/volume/autoPlay/ambient)—not playback head

## Fail closed

Load rejects the checkpoint if `sceneUrl` is missing or does not match the active scene (normalized). Same-origin cache directories do not allow applying another scene’s save.

## Intentional omissions

Not restored: portals, volumes, physics velocities, scene-authored audio playback position, picturebox/textbox billboard runtime mutations, modal `openTextBox` UI state.

## Author patterns

1. Persist game progress in gamemode/`on_save` tables.
2. Use lights/visibility for puzzle state that must survive load.
3. Use autosave volumes for checkpoints; configure `autosaveNotification` with top-level `x` / `y`.
4. Do not assume music position or portal state survives.

## Related

- [Scene features — Autosave](/docs/using/scene-features)
- [Publish checklist](/docs/guides/publish-checklist)
