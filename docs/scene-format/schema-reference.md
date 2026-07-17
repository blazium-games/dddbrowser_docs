---
sidebar_position: 2
---

# Scene Schema Reference

This is a complete reference for the scene JSON schema. All scenes must conform to this schema to load successfully.

## Top-Level Properties

### Required Properties

#### `name` (string, required)

The name of the scene. Must be at least 1 character.

```json
"name": "My Awesome Scene"
```

#### `version` (string, required)

The version of the scene. Use semantic versioning (e.g., "1.0", "1.2.3").

```json
"version": "1.0"
```

#### `schemaVersion` (string, required)

The schema version this scene conforms to. Currently "1.0".

```json
"schemaVersion": "1.0"
```

#### `assets` (array, required)

Array of asset definitions. Can be empty `[]` but must be present.

```json
"assets": [
  {
    "id": "model1",
    "type": "model",
    "uri": "https://example.com/model.obj",
    "mediaType": "model/obj"
  }
]
```

### Optional Properties

#### `description` (string, optional)

A description of the scene.

```json
"description": "A beautiful 3D environment"
```

#### `id` (string, optional)

Unique identifier for the scene. Used for references and portal/travel metadata.

```json
"id": "my_scene_001"
```

#### `author` (string, optional)

The author or creator of the scene.

```json
"author": "John Doe"
```

#### `rating` (string, optional)

Content rating. Must be one of:
- `"GENERAL"` - Suitable for all audiences
- `"MODERATE"` - May contain mild content
- `"ADULT"` - Mature content

```json
"rating": "GENERAL"
```

#### `thumbnail` (string, optional)

URL to a thumbnail image for the scene. Must be a valid URI.

```json
"thumbnail": "https://example.com/thumbnail.jpg"
```

#### `manifestUrl` (string, optional)

Alternative URL where the scene manifest can be found. Must be a valid URI.

```json
"manifestUrl": "https://example.com/manifest.json"
```

#### `world` (object, optional)

World information for scenes that belong to a larger world.

```json
"world": {
  "id": "my_world",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0}
}
```

Properties:
- `id` (string): World identifier
- `position` (vec3): Position of this scene in the world

#### `spawn` (vec3, optional)

Player spawn point. Defaults to (0, 0, 0) if not specified.

```json
"spawn": {"x": 0.0, "y": 1.0, "z": 0.0}
```

#### `movementBounds` (object, optional)

Limits player movement to a bounding box.

```json
"movementBounds": {
  "min": {"x": -10.0, "y": 0.0, "z": -10.0},
  "max": {"x": 10.0, "y": 20.0, "z": 10.0}
}
```

Properties:
- `min` (vec3, required): Minimum bounds
- `max` (vec3, required): Maximum bounds

**When omitted**, the runtime still clamps movement to approximately **±100 per axis**
((-100,-100,-100)…(100,100,100)). Set explicit bounds for larger playable areas.

#### `gameType` (string, optional)

Player movement type. Must be one of:
- `"FPS"` - Physics-driven first-person movement (default)
- `"NONE"` - WASD fly-cam exploration (no FPS physics controller)

```json
"gameType": "FPS"
```

#### `instances` (array, optional)

Array of instances (objects placed in the scene). Can be empty `[]` or omitted.

```json
"instances": [
  {
    "id": "instance1",
    "asset": "model1",
    "position": {"x": 0.0, "y": 0.0, "z": 0.0},
    "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
    "scale": {"x": 1.0, "y": 1.0, "z": 1.0}
  }
]
```

#### `gamemode` (object, optional)

Gamemode script for scene-wide logic.

```json
"gamemode": {
  "file": "gamemode-script"
}
```

Properties:
- `file` (string, required): Asset ID of the gamemode script

#### `skybox` (object, optional)

Skybox configuration for environment mapping.

```json
"skybox": {
  "uri": "https://example.com/skybox.jpg",
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0}
}
```

Properties:
- `uri` (string, required): HTTPS URL to an equirectangular LDR skybox (`.png`, `.jpg`, `.jpeg`, or `.tga` only). HDR/EXR and six-face cubemap lists are not product paths.
- `rotation` (vec3, optional): Rotation in degrees

#### `autosaveNotification` (object, optional)

Configuration for autosave notifications.

```json
"autosaveNotification": {
  "text": "Game saved!",
  "x": 0.02,
  "y": 0.95,
  "font": "default-font",
  "color": {"x": 1.0, "y": 1.0, "z": 1.0}
}
```

Properties:
- `text` (string, optional): Notification text
- `x` / `y` (number, optional): Screen position (0–1 normalized)
- `font` (string, optional): Font asset ID
- `color` (vec3, optional): Text color (RGB, 0-1)

## Validation Rules

- All required fields must be present
- Field types must match (string, number, boolean, object, array)
- Enum values must be from the allowed set
- URIs must be valid HTTPS URLs
- Vec3 values must have x, y, z components
- Scale values must be > 0
- Asset IDs must be unique within the scene
- Instance IDs must be unique within the scene
- Asset references in instances must exist

## Example Complete Scene

```json
{
  "name": "Complete Scene Example",
  "version": "1.0",
  "schemaVersion": "1.0",
  "description": "A complete scene with all optional fields",
  "id": "complete_scene",
  "author": "Scene Creator",
  "rating": "GENERAL",
  "thumbnail": "https://example.com/thumb.jpg",
  "world": {
    "id": "my_world",
    "position": {"x": 0.0, "y": 0.0, "z": 0.0}
  },
  "spawn": {"x": 0.0, "y": 1.0, "z": 0.0},
  "movementBounds": {
    "min": {"x": -50.0, "y": 0.0, "z": -50.0},
    "max": {"x": 50.0, "y": 100.0, "z": 50.0}
  },
  "gameType": "FPS",
  "assets": [],
  "instances": []
}
```

## Next Steps

- [Assets](/docs/scene-format/assets) - Learn about asset definitions
- [Instances](/docs/scene-format/instances) - Learn about placing objects
- [Metadata](/docs/scene-format/metadata) - Learn about scene metadata
- [Advanced Features](/docs/scene-format/advanced) - Learn about advanced features

