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
  - Equirectangular LDR image only: `.png`, `.jpg`, `.jpeg`, or `.tga` (HDR/EXR not supported)
  - 6-face cubemap file lists are not supported
  - Must be HTTPS
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

**Default**: (-100, -100, -100) to (100, 100, 100) if not specified

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
  "position": {"x": 0.02, "y": 0.95},
  "font": "default-font",
  "color": {"x": 1.0, "y": 1.0, "z": 1.0}
}
```

**Properties**:
- `text` (string, optional): Notification text
- `position` (vec2, required): Screen position (0-1 normalized)
  - X: 0 = left, 1 = right
  - Y: 0 = bottom, 1 = top
- `font` (string, optional): Font asset ID
- `color` (vec3, optional): Text color (RGB, 0-1)

## Trigger Volumes

Trigger volumes detect player presence and trigger events. There are many types:

### Look At Volume (`type: "lookAtVolume"`)

Triggers when player looks at the volume.

```json
{
  "id": "look-trigger",
  "type": "lookAtVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "lookAtVolume": {}
}
```

### Looked At Volume (`type: "lookedAtVolume"`)

Triggers once when player has looked at it.

```json
{
  "id": "looked-trigger",
  "type": "lookedAtVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "lookedAtVolume": {}
}
```

### Single Trigger Volume (`type: "singleTriggerVolume"`)

Triggers once when player enters.

```json
{
  "id": "single-trigger",
  "type": "singleTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "singleTriggerVolume": {}
}
```

### Multi Trigger Volume (`type: "multiTriggerVolume"`)

Triggers every time player enters.

```json
{
  "id": "multi-trigger",
  "type": "multiTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "multiTriggerVolume": {}
}
```

### Cooldown Trigger Volume (`type: "cooldownTriggerVolume"`)

Triggers with a cooldown period.

```json
{
  "id": "cooldown-trigger",
  "type": "cooldownTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "cooldownTriggerVolume": {
    "cooldown": 5.0
  }
}
```

**Properties**:
- `cooldown` (number): Cooldown time in seconds

### Exit Trigger Volume (`type: "exitTriggerVolume"`)

Triggers when player exits the volume.

```json
{
  "id": "exit-trigger",
  "type": "exitTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "exitTriggerVolume": {}
}
```

### Stay Trigger Volume (`type: "stayTriggerVolume"`)

Triggers continuously while player stays in volume.

```json
{
  "id": "stay-trigger",
  "type": "stayTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "stayTriggerVolume": {
    "interval": 1.0
  }
}
```

**Properties**:
- `interval` (number, optional): Trigger interval in seconds

### Timed Entry Trigger Volume (`type: "timedEntryTriggerVolume"`)

Triggers after player has been in volume for a duration.

```json
{
  "id": "timed-trigger",
  "type": "timedEntryTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "timedEntryTriggerVolume": {
    "duration": 3.0
  }
}
```

**Properties**:
- `duration` (number): Required stay duration in seconds

### Counter Trigger Volume (`type: "counterTriggerVolume"`)

Triggers after player enters a certain number of times.

```json
{
  "id": "counter-trigger",
  "type": "counterTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "counterTriggerVolume": {
    "count": 5
  }
}
```

**Properties**:
- `count` (number): Required entry count

### Sequence Trigger Volume (`type: "sequenceTriggerVolume"`)

Volumes in the same `sequence_group_id` must be entered in ascending `sequence_index` order. The completion `eventName` fires only after the highest index in the group has been completed correctly.

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
- `sequence_group_id` (string): Group shared by ordered steps
- `sequence_index` (integer): Step index (0-based)
- `reset_if_wrong` (boolean): Reset progress when entered out of order
- `eventName` (string): Gamemode event fired when the full sequence completes

### Toggle Trigger Volume (`type: "toggleTriggerVolume"`)

Toggles on/off each time player enters.

```json
{
  "id": "toggle-trigger",
  "type": "toggleTriggerVolume",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 2.0},
  "toggleTriggerVolume": {}
}
```

## Teleport Volumes

Teleport volumes instantly move the player to a new position.

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

Interaction volumes provide custom interaction zones. The `action` field is matched case-insensitively against runtime action names (`interact`, `jump`, etc.). Docs/schema may use either `"interact"` or `"Interact"`.

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

## Volume Size

All volumes use the `scale` property to define their size:

- **Scale X**: Width
- **Scale Y**: Height
- **Scale Z**: Depth

The volume is a box centered at the position, with dimensions determined by scale.

## Trigger Events

Trigger volumes fire events that can be handled by:

- Gamemode scripts via `Gamemode.onEvent()`
- Entity scripts via event listeners
- Engine systems

Event names follow the pattern: `volume_<type>_<instanceId>`

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

