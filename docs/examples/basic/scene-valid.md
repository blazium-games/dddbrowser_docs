---
sidebar_position: 1
---

# Valid Scene

The minimal valid scene that demonstrates the absolute minimum required to load a scene.

## Overview

This example shows the simplest possible scene that will load successfully in DDDBrowser. It includes only the required fields.

## Scene Definition

```html:examples/scene_valid.html
<script id="blazium-scene" type="application/vnd.blazium.scene+json">
{
  "name": "Valid Scene",
  "version": "1.0",
  "schemaVersion": "1.0",
  "description": "Integration test scene",
  "assets": [
    {
      "id": "model1",
      "type": "model",
      "uri": "https://blazium-engine.github.io/DDDBrowserExamples/assets/capsule.obj",
      "mediaType": "model/obj"
    },
    {
      "id": "pingpong-script",
      "type": "script",
      "uri": "https://blazium-engine.github.io/DDDBrowserExamples/assets/pingpong.luau",
      "mediaType": "application/x-luau"
    }
  ],
  "instances": [
    {
      "id": "instance1",
      "asset": "model1",
      "position": {"x": 0.0, "y": 0.0, "z": 0.0},
      "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
      "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
      "script": {
        "file": "pingpong-script",
        "data": {
          "boundingRadius": 12.0
        }
      }
    }
  ]
}
</script>
```

## Key Points

- **Required fields**: `name`, `version`, `schemaVersion`, `assets`
- **Assets array**: Can be empty `[]` but must be present
- **Instances**: Optional, but this example includes one
- **Script attachment**: Shows how to attach a script to an instance

## What You'll See

- A 3D capsule model at the origin
- The capsule animates up and down (ping-pong script)
- Basic scene with minimal configuration

## Try It

Load this example:
```
https://blazium-engine.github.io/DDDBrowserExamples/scene_valid.html
```

## Next Steps

- [Single Entity Scene](/docs/examples/basic/scene-single-entity) - Another minimal example
- [Scene Format](/docs/scene-format/intro) - Learn the scene format
- [Scripting](/docs/luau/intro) - Learn about scripts

