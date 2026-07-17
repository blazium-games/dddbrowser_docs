---
sidebar_position: 1
---

# Production minimal template

Copy-pasteable starter for a public HTTPS scene: discovery HTML + minimal valid scene JSON (OBJ placeholder, spawn, bounds).

## Discovery HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>My Scene</title>
  <meta name="x-blazium-scene-title" content="My Scene" />
</head>
<body>
<script id="blazium-scene" type="application/vnd.blazium.scene+json">
{
  "name": "My Scene",
  "version": "1.0",
  "schemaVersion": "1.0",
  "description": "Minimal production template",
  "spawn": {"x": 0.0, "y": 1.6, "z": 4.0},
  "movementBounds": {
    "min": {"x": -50.0, "y": 0.0, "z": -50.0},
    "max": {"x": 50.0, "y": 40.0, "z": 50.0}
  },
  "assets": [
    {
      "id": "floor",
      "type": "model",
      "uri": "https://example.com/assets/floor.obj",
      "mediaType": "model/obj"
    },
    {
      "id": "floor-mtl",
      "type": "material",
      "uri": "https://example.com/assets/floor.mtl",
      "mediaType": "model/mtl"
    }
  ],
  "instances": [
    {
      "id": "floor-1",
      "type": "model",
      "asset": "floor",
      "position": {"x": 0.0, "y": 0.0, "z": 0.0},
      "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
      "scale": {"x": 1.0, "y": 1.0, "z": 1.0}
    },
    {
      "id": "sun",
      "type": "directionalLight",
      "position": {"x": 0.0, "y": 10.0, "z": 0.0},
      "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
      "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
      "light": {
        "color": {"x": 1.0, "y": 0.98, "z": 0.95},
        "intensity": 1.0,
        "enabled": true,
        "direction": {"x": -0.3, "y": -1.0, "z": -0.2}
      }
    }
  ]
}
</script>
<p>Open this URL in DDDBrowser.</p>
</body>
</html>
```

## Replace before publish

1. Host real `floor.obj` / `floor.mtl` (and textures) on **HTTPS**.
2. Point asset `uri` values at your CDN.
3. Optional: add a portal with exactly one trigger flag.
4. Run through the [Publish checklist](/docs/guides/publish-checklist).

## Notes

- Model path is **OBJ-only**.
- Explicit `movementBounds` avoids the default ±100 clamp.
- Metadata meta tags are for travel/portal preview only—not a browse library.

## Related

- [Asset pipeline](/docs/guides/asset-pipeline)
- [Asset budgets](/docs/scene-format/asset-budgets)
- [Scene valid example](/docs/examples/basic/scene-valid)
