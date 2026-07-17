---
sidebar_position: 4
---

# Instances

Instances are objects placed in the 3D world. Each instance represents a positioned, rotated, and scaled object of a specific type.

## Instance Structure

All instances have this basic structure:

```json
{
  "id": "unique-instance-id",
  "type": "instance-type",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0}
}
```

### Required Properties

- **`id`** (string): Unique identifier for the instance
- **`position`** (vec3): Position in 3D space (X, Y, Z)
- **`rotation`** (vec3): Rotation in degrees (Euler angles)
- **`scale`** (vec3): Scale factors (must be > 0 for all components)

### Optional Properties

- **`type`** (string): Instance type (defaults to `"model"`)
- **`asset`** (string): Asset ID (required for model instances)
- Type-specific properties (see instance types below)

## Instance Types

### Model Instances (`type: "model"`)

Render a 3D model in the scene.

```json
{
  "id": "my-model-instance",
  "type": "model",
  "asset": "my-model",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 45.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0}
}
```

**Required**: `asset` property referencing a model asset

### Point Light Instances (`type: "pointLight"`)

Omni-directional light from a point.

```json
{
  "id": "my-point-light",
  "type": "pointLight",
  "position": {"x": 0.0, "y": 5.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "light": {
    "color": {"x": 1.0, "y": 1.0, "z": 1.0},
    "intensity": 1.0,
    "enabled": true,
    "range": 10.0
  }
}
```

**Required**: `light` property with light configuration

### Directional Light Instances (`type: "directionalLight"`)

Parallel light rays (like sunlight).

```json
{
  "id": "sun-light",
  "type": "directionalLight",
  "position": {"x": 0.0, "y": 20.0, "z": 0.0},
  "rotation": {"x": -45.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "light": {
    "color": {"x": 1.0, "y": 1.0, "z": 0.9},
    "intensity": 1.5,
    "enabled": true,
    "direction": {"x": 0.0, "y": -1.0, "z": 0.0},
    "shadowEnabled": true,
    "shadowMapResolution": 2048
  }
}
```

**Required**: `light` property with direction and optional shadow settings

### Spot Light Instances (`type: "spotLight"`)

Cone-shaped light.

```json
{
  "id": "spotlight",
  "type": "spotLight",
  "position": {"x": 0.0, "y": 5.0, "z": 0.0},
  "rotation": {"x": -90.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "light": {
    "color": {"x": 1.0, "y": 1.0, "z": 1.0},
    "intensity": 2.0,
    "enabled": true,
    "direction": {"x": 0.0, "y": -1.0, "z": 0.0},
    "cutoff": 30.0,
    "outerCutoff": 45.0,
    "range": 20.0,
    "shadowEnabled": true,
    "shadowBias": 0.005,
    "shadowMapResolution": 2048
  }
}
```

**Required**: `light` property with direction, cutoff angles, and range. Optional shadow fields match directional lights (`shadowEnabled`, `shadowBias`, `shadowMapResolution`).

### Portal Instances (`type: "portal"`)

Travel between scenes.

```json
{
  "id": "portal-to-next-scene",
  "type": "portal",
  "position": {"x": 10.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 180.0, "z": 0.0},
  "scale": {"x": 2.0, "y": 2.0, "z": 1.0},
  "portal": {
    "destinationUrl": "https://example.com/next-scene.html",
    "radius": 3.0,
    "autoTrigger": false,
    "manualTrigger": true,
    "scriptTrigger": false
  }
}
```

**Required**: `portal` property with destination URL.

**Trigger mutex**: Exactly one of `autoTrigger`, `manualTrigger`, or `scriptTrigger` must be `true` (schema rejects zero or multiple).

### Textbox Instances (`type: "textbox"`)

Display text as a **3D world billboard**. This is not a modal dialog; modals use `Engine.openTextBox` from scripts (see [UI Elements](/docs/using/ui-elements)).

```json
{
  "id": "welcome-textbox",
  "type": "textbox",
  "position": {"x": 0.0, "y": 2.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "textbox": {
    "asset": "welcome-textbox-asset"
  }
}
```

**Required**: `textbox` property with textbox asset ID

### Picturebox Instances (`type: "picturebox"`)

Display images in the 3D world.

```json
{
  "id": "sign-picturebox",
  "type": "picturebox",
  "position": {"x": 5.0, "y": 1.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 90.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "picturebox": {
    "asset": "sign-picturebox-asset"
  }
}
```

**Required**: `picturebox` property with picturebox asset ID

### Audio Instances (`type: "audio"`)

Play audio in the scene.

```json
{
  "id": "ambient-sound",
  "type": "audio",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "audio": {
    "asset": "ambient-audio",
    "loop": true,
    "volume": 0.5
  }
}
```

**Required**: `audio` property with audio asset ID

### Trigger Volume Instances

Various trigger volume types for detecting player presence and triggering events. See [Advanced Features](/docs/scene-format/advanced) for details.

### Autosave Volume Instances (`type: "autosaveVolume"`)

Automatically save game state when player enters.

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

### Teleport Volume Instances (`type: "teleportVolume"`)

Teleport player to a new position.

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

## Transform Properties

All instances have transform properties:

### Position

3D position in world space (X, Y, Z coordinates).

```json
"position": {"x": 0.0, "y": 1.0, "z": 0.0}
```

- **X**: Left/Right (positive = right)
- **Y**: Up/Down (positive = up)
- **Z**: Forward/Back (positive = forward)

### Rotation

Rotation in degrees using Euler angles (X, Y, Z).

```json
"rotation": {"x": 0.0, "y": 45.0, "z": 0.0}
```

- **X**: Pitch (rotation around X-axis)
- **Y**: Yaw (rotation around Y-axis)
- **Z**: Roll (rotation around Z-axis)

### Scale

Scale factors for each axis (must be > 0).

```json
"scale": {"x": 1.0, "y": 2.0, "z": 1.0}
```

- Values > 1.0 make the object larger
- Values < 1.0 make the object smaller
- All components must be greater than 0

## Script Attachment

Any instance can have a script attached:

```json
{
  "id": "animated-object",
  "asset": "my-model",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "script": {
    "file": "animation-script",
    "data": {
      "speed": 2.0,
      "amplitude": 5.0
    }
  }
}
```

**Script properties**:
- `file` (string, required): Script asset ID
- `data` (object, optional): Initial data passed to the script

## Light Properties

Light instances use the `light` property for configuration:

### Common Light Properties

- `color` (vec3): Light color (RGB, 0-1)
- `intensity` (number): Light brightness (must be > 0)
- `enabled` (boolean): Whether the light is active

### Point Light Specific

- `range` (number): Maximum light range (must be > 0)
- `attenuation` (object, optional): Light falloff
  - `constant` (number): Constant attenuation
  - `linear` (number): Linear attenuation
  - `quadratic` (number): Quadratic attenuation

### Directional Light Specific

- `direction` (vec3): Light direction vector
- `shadowEnabled` (boolean): Enable shadow casting
- `shadowBias` (number): Shadow bias value
- `shadowMapResolution` (number): Shadow map size (256-4096)
- `shadowOrthoSize` (number): Orthographic projection size

### Spot Light Specific

- `direction` (vec3): Light direction vector
- `cutoff` (number): Inner cone angle (0-90 degrees)
- `outerCutoff` (number): Outer cone angle (0-90 degrees)
- `range` (number): Maximum light range

## Portal Properties

Portal instances use the `portal` property:

- `destinationUrl` (string, required): URL of destination scene
- `radius` (number): Trigger radius (default: 0)
- `autoTrigger` (boolean): Enter radius → shared travel preview / load path (default: **false**)
- `manualTrigger` (boolean): Interact (raycast or nearby) → portal confirmation modal (default: **true**)
- `scriptTrigger` (boolean): Interact → script `on_interact`; script calls `Engine.triggerPortal(id)` or `Scene.TravelTo(url)` (default: **false**)

Exactly one trigger flag must be enabled. Defaults match the runtime (`manualTrigger` true, others false).

## Audio Properties

Audio instances use the `audio` property:

- `asset` (string, required): Audio asset ID
- `loop` (boolean): Whether to loop playback (default: false)
- `volume` (number): Volume level 0-1 (default: 1.0)

## Examples

### Complete Instance Set

```json
"instances": [
  {
    "id": "ground-model",
    "type": "model",
    "asset": "ground-model",
    "position": {"x": 0.0, "y": 0.0, "z": 0.0},
    "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
    "scale": {"x": 10.0, "y": 1.0, "z": 10.0}
  },
  {
    "id": "sun-light",
    "type": "directionalLight",
    "position": {"x": 0.0, "y": 20.0, "z": 0.0},
    "rotation": {"x": -45.0, "y": 0.0, "z": 0.0},
    "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
    "light": {
      "color": {"x": 1.0, "y": 1.0, "z": 0.9},
      "intensity": 1.5,
      "enabled": true,
      "direction": {"x": 0.0, "y": -1.0, "z": 0.0},
      "shadowEnabled": true
    }
  },
  {
    "id": "exit-portal",
    "type": "portal",
    "position": {"x": 10.0, "y": 0.0, "z": 0.0},
    "rotation": {"x": 0.0, "y": 180.0, "z": 0.0},
    "scale": {"x": 2.0, "y": 2.0, "z": 1.0},
    "portal": {
      "destinationUrl": "https://example.com/next.html",
      "radius": 3.0,
      "autoTrigger": false,
      "manualTrigger": true
    }
  }
]
```

## Next Steps

- [Advanced Features](/docs/scene-format/advanced) - Learn about trigger volumes and advanced features
- [Metadata](/docs/scene-format/metadata) - Learn about scene metadata
- [Examples](/docs/examples/intro) - See instance examples

