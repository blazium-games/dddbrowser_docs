---
sidebar_position: 1
---

# Scene Format Overview

A scene is a JSON definition that describes a 3D virtual world. This guide introduces the scene format and its structure.

## What is a Scene?

A scene is a complete description of a 3D environment, including:

- **Assets**: Resources used by the scene (models, textures, scripts, etc.)
- **Instances**: Objects placed in the 3D world
- **Metadata**: Information about the scene (name, author, description)
- **Configuration**: Settings like spawn points, movement bounds, game type

Scenes are defined as JSON and can be embedded in HTML pages or served via HTTP headers.

## Scene File Structure

A scene JSON has this basic structure:

```json
{
  "name": "My Scene",
  "version": "1.0",
  "schemaVersion": "1.0",
  "description": "A sample scene",
  "assets": [],
  "instances": []
}
```

### Required Fields

Every scene must have:

- `name` (string): Scene name
- `version` (string): Scene version
- `schemaVersion` (string): Schema version (currently "1.0")
- `assets` (array): List of assets (can be empty)

### Optional Fields

Scenes can optionally include:

- `description` (string): Scene description
- `id` (string): Unique scene identifier
- `author` (string): Scene author
- `rating` (string): Content rating (GENERAL, MODERATE, ADULT)
- `thumbnail` (string): Thumbnail image URL
- `manifestUrl` (string): Alternative manifest URL
- `world` (object): World ID and position
- `spawn` (vec3): Player spawn point
- `movementBounds` (object): Player movement limits
- `gameType` (string): Movement type (FPS, NONE)
- `instances` (array): Placed objects in the scene
- `gamemode` (object): Gamemode script
- `skybox` (object): Skybox configuration
- `autosaveNotification` (object): Autosave notification settings

## JSON Schema Validation

DDDBrowser validates all scenes against a JSON schema before loading. The schema ensures:

- Required fields are present
- Field types are correct
- Values are within valid ranges
- References are valid (e.g., asset IDs in instances)

If validation fails, the scene will not load and an error message will be shown.

## Example Scene

Here's a minimal valid scene:

```json
{
  "name": "Valid Scene",
  "version": "1.0",
  "schemaVersion": "1.0",
  "description": "Integration test scene",
  "assets": [
    {
      "id": "model1",
      "type": "model",
      "uri": "https://example.com/model.obj",
      "mediaType": "model/obj"
    }
  ],
  "instances": [
    {
      "id": "instance1",
      "asset": "model1",
      "position": {"x": 0.0, "y": 0.0, "z": 0.0},
      "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
      "scale": {"x": 1.0, "y": 1.0, "z": 1.0}
    }
  ]
}
```

This scene:
- Defines one asset (a 3D model)
- Places one instance of that model at the origin
- Is valid and will load successfully

## Scene Discovery

Scenes are discovered from HTML pages using a priority order:

1. **`<script>` tag** (highest priority):
   ```html
   <script id="blazium-scene" type="application/vnd.blazium.scene+json">
   { ... scene JSON ... }
   </script>
   ```

2. **`<meta>` tag**:
   ```html
   <meta name="x-blazium-scene" content='{... scene JSON ...}'>
   ```

3. **HTTP header** (lowest priority):
   ```
   X-Blazium-Scene: {... scene JSON ...}
   ```

See [Scene Metadata](/docs/scene-format/metadata) for details.

## Data Types

Scenes use these common data types:

### Vec3

A 3D vector with x, y, z components:

```json
{"x": 0.0, "y": 1.0, "z": 0.0}
```

Used for: positions, rotations, colors, directions

### Vec2

A 2D vector with x, y components:

```json
{"x": 0.5, "y": 0.5}
```

Used for: 2D positions, texture coordinates

### Scale Vec3

A Vec3 where all components must be > 0:

```json
{"x": 1.0, "y": 2.0, "z": 1.0}
```

Used for: scale values (cannot be zero or negative)

## Next Steps

- [Schema Reference](/docs/scene-format/schema-reference) - Complete schema documentation
- [Assets](/docs/scene-format/assets) - Learn about assets
- [Instances](/docs/scene-format/instances) - Learn about placing objects
- [Examples](/docs/examples/intro) - See example scenes

