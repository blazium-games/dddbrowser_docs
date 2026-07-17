---
sidebar_position: 6
---

# Advanced Features

This guide covers advanced scene features including skyboxes, spawn points, movement bounds, gamemodes, autosave, trigger volumes, and teleport volumes.

## Skybox

Skyboxes provide environment mapping for the scene background.

```json
"skybox": {
  "uri": "https://example.com/skybox.jpg",
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0}
}
```

**Properties**:
- `uri` (string, required): URL to skybox texture
  - **Permanent product path:** equirectangular LDR only (`.png`, `.jpg`, `.jpeg`, or `.tga`)
  - HDR/EXR environment maps are **not** a product path
  - Six-face cubemap file lists are **not** supported—export/convert to equirect
  - Must be HTTPS (or Allow HTTP for travel testing)
- `rotation` (vec3, optional): Rotation in degrees for animated skies

**Use cases**: Sky, space, indoor environments, atmosphere

## Spawn Points

Spawn points define where players appear when entering the scene.

```json
"spawn": {"x": 0.0, "y": 1.0, "z": 0.0}
```

**Default**: (0, 0, 0) if not specified

**Use cases**: 
- Start locations
- Respawn points
- Scene entry points

## Movement Bounds

Movement bounds limit player movement to a specific area.

```json
"movementBounds": {
  "min": {"x": -50.0, "y": 0.0, "z": -50.0},
  "max": {"x": 50.0, "y": 100.0, "z": 50.0}
}
```

**Properties**:
- `min` (vec3, required): Minimum bounds (X, Y, Z)
- `max` (vec3, required): Maximum bounds (X, Y, Z)

**Default when omitted**: movement is still clamped to approximately **±100 on each axis**
(`min` = (-100, -100, -100), `max` = (100, 100, 100)). Large open worlds must set
explicit `movementBounds` or players hit an invisible wall at ±100.

**Use cases**:
- Confined spaces
- Level boundaries
- Preventing players from leaving the play area

## Gamemode Scripts

Gamemode scripts provide scene-wide logic and state management.

```json
"gamemode": {
  "file": "gamemode-script"
}
```

**Properties**:
- `file` (string, required): Asset ID of the gamemode script

**Features**:
- Scene-wide state management
- Event system
- Save/load support
- Persistent data via localStorage

See [Lua/Luau API - Gamemode](/docs/luau/gamemode-api) for details.

## Autosave Volumes

Autosave volumes automatically save game state when the player enters.

```json
{
  "id": "autosave-zone",
  "type": "autosaveVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 5.0, "y": 5.0, "z": 5.0},
  "autosaveVolume": {}
}
```

**Behavior**:
- Triggers when player enters the volume
- Saves gamemode state and script state
- Can show notification (configured via `autosaveNotification`)

**Use cases**: Checkpoints, safe zones, progress saving

## Autosave Notifications

Configure on-screen notifications when autosave occurs.

```json
"autosaveNotification": {
  "text": "Game saved!",
  "x": 0.02,
  "y": 0.95,
  "font": "default-font",
  "color": {"x": 1.0, "y": 1.0, "z": 1.0}
}
```

**Properties**:
- `text` (string, optional): Notification text
- `x` / `y` (number, optional): Screen position (0–1 normalized)
  - X: 0 = left, 1 = right
  - Y: 0 = bottom, 1 = top
- `font` (string, optional): Font asset ID
- `color` (vec3, optional): Text color (RGB, 0-1)

## Trigger Volumes

Trigger volumes detect player presence and fire **author-chosen** gamemode event names via `Gamemode.onEvent(eventName, data)`. Most volume types require an `eventName` string in their typed properties object (not a synthetic `volume_*` name).

### Look At Volume (`type: "lookAtVolume"`)

Fires when the player looks toward the volume (outside it).

```json
{
  "id": "look-trigger",
  "type": "lookAtVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "lookAtVolume": {
    "eventName": "looked_at_sign",
    "singleUse": false,
    "cooldownSeconds": 0,
    "fovDegrees": 30
  }
}
```

**Properties**: `eventName` (required); optional `singleUse`, `cooldownSeconds`, `fovDegrees`

### Looked At Volume (`type: "lookedAtVolume"`)

Fires when the player is inside the volume and looks at a target instance.

```json
{
  "id": "looked-trigger",
  "type": "lookedAtVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "lookedAtVolume": {
    "eventName": "looked_at_npc",
    "targetInstanceId": "npc-1",
    "fovDegrees": 30
  }
}
```

**Properties**: `eventName`, `targetInstanceId` (required); optional `singleUse`, `cooldownSeconds`, `fovDegrees`

### Single Trigger Volume (`type: "singleTriggerVolume"`)

Fires once on enter.

```json
{
  "id": "single-trigger",
  "type": "singleTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "singleTriggerVolume": {
    "eventName": "checkpoint_reached"
  }
}
```

### Multi Trigger Volume (`type: "multiTriggerVolume"`)

Fires every enter (optionally capped).

```json
{
  "id": "multi-trigger",
  "type": "multiTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "multiTriggerVolume": {
    "eventName": "zone_entered",
    "maxFires": 0,
    "autoRemoveOnFire": false
  }
}
```

### Cooldown Trigger Volume (`type: "cooldownTriggerVolume"`)

Fires on enter with a cooldown between fires.

```json
{
  "id": "cooldown-trigger",
  "type": "cooldownTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "cooldownTriggerVolume": {
    "eventName": "pickup_pulse",
    "cooldownSeconds": 5.0,
    "maxFires": 0
  }
}
```

**Properties**: `eventName`, `cooldownSeconds` (required); optional `maxFires`

### Exit Trigger Volume (`type: "exitTriggerVolume"`)

Fires when the player exits the volume.

```json
{
  "id": "exit-trigger",
  "type": "exitTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "exitTriggerVolume": {
    "eventName": "left_safe_zone"
  }
}
```

### Stay Trigger Volume (`type: "stayTriggerVolume"`)

Fires repeatedly while the player remains inside.

```json
{
  "id": "stay-trigger",
  "type": "stayTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "stayTriggerVolume": {
    "eventName": "healing_tick",
    "stayInterval": 1.0
  }
}
```

**Properties**: `eventName`, `stayInterval` (required)

### Timed Entry Trigger Volume (`type: "timedEntryTriggerVolume"`)

Fires after the player has stayed inside for a duration.

```json
{
  "id": "timed-trigger",
  "type": "timedEntryTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "timedEntryTriggerVolume": {
    "eventName": "channel_complete",
    "requiredStayTime": 3.0
  }
}
```

**Properties**: `eventName`, `requiredStayTime` (required)

### Counter Trigger Volume (`type: "counterTriggerVolume"`)

Shares a named counter (`counter_word`) across volumes; increments on enter. Schema fields are `counter_word` / `required_count` only (no author `eventName` today).

```json
{
  "id": "counter-trigger",
  "type": "counterTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "counterTriggerVolume": {
    "counter_word": "switches",
    "required_count": 5,
    "auto_reset_after_fire": false,
    "fire_once_when_reached": false
  }
}
```

**Properties**: `counter_word`, `required_count` (required); optional `auto_reset_after_fire`, `fire_once_when_reached`

### Sequence Trigger Volume (`type: "sequenceTriggerVolume"`)

Volumes in the same `sequence_group_id` must be entered in ascending `sequence_index` order. Optional `eventName` is the **completion** event (fires once when the highest index in the group is completed correctly).

```json
{
  "id": "sequence-step-0",
  "type": "sequenceTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "sequenceTriggerVolume": {
    "sequence_group_id": "puzzle_a",
    "sequence_index": 0,
    "reset_if_wrong": true,
    "eventName": "puzzle_a_complete"
  }
}
```

**Properties**:
- `sequence_group_id` (string, required)
- `sequence_index` (integer, required, 0-based)
- `reset_if_wrong` (boolean, optional)
- `eventName` (string, optional): Completion gamemode event

### Toggle Trigger Volume (`type: "toggleTriggerVolume"`)

Toggles on/off each enter; fires `on_activate_event` / `on_deactivate_event` when set.

```json
{
  "id": "toggle-trigger",
  "type": "toggleTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "toggleTriggerVolume": {
    "is_on": false,
    "on_activate_event": "gate_open",
    "on_deactivate_event": "gate_close"
  }
}
```

## Teleport Volumes

Teleport volumes instantly move the player to a new position. On activation they also fire the fixed gamemode event `teleport_volume_activated`.

```json
{
  "id": "teleporter",
  "type": "teleportVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "teleportVolume": {
    "destination": {"x": 10.0, "y": 5.0, "z": 10.0}
  }
}
```

**Properties**:
- `destination` (vec3, required): Target position

**Use cases**: Elevators, fast travel, level transitions

## Interaction Volumes

Interaction volumes fire when the player is inside and presses a bound action. The `action` field is matched case-insensitively against runtime action names (`interact`, `jump`, etc.).

```json
{
  "id": "interaction-zone",
  "type": "interactionVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "interactionVolume": {
    "eventName": "zone_used",
    "action": "interact"
  }
}
```

**Properties**: `eventName`, `action` (required)

## Volume Size

All volumes use the `scale` property to define their size:

- **Scale X**: Width
- **Scale Y**: Height
- **Scale Z**: Depth

The volume is a box centered at the position, with dimensions determined by scale.

## Trigger Events

When a volume fires, the runtime calls `Gamemode.triggerEvent` / listeners registered with `Gamemode.onEvent` using the **author-supplied** `eventName` (or toggle activate/deactivate names, or sequence completion `eventName`). Payload typically includes `instanceId` and a `reason` string (for example `enter`, `exit`, `stay`, `interaction`).

There is **no** automatic `volume_<type>_<instanceId>` event name pattern.

Handle events in gamemode scripts:

```lua
Gamemode.onEvent("zone_used", function(data)
    print("Used zone", data.instanceId)
end)
```

## Best Practices

- **Size volumes appropriately**: Not too small (hard to trigger) or too large (triggers unexpectedly)
- **Use appropriate trigger types**: Choose the right volume type for your use case
- **Test trigger behavior**: Verify volumes work as expected
- **Combine with scripts**: Use volumes to trigger script behaviors
- **Organize with worlds**: Use world IDs to group related scenes

## Next Steps

- [Lua/Luau API](/docs/luau/intro) - Learn to script volume behaviors
- [Examples](/docs/examples/intro) - See advanced features in action
- [Scene Format Intro](/docs/scene-format/intro) - Return to scene format overview

