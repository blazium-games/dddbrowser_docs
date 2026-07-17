---
sidebar_position: 5
---

# Scene Metadata

Scene metadata provides information about the scene that can be discovered before loading the full scene JSON. This enables previews, thumbnails, and scene browsing without downloading the entire scene definition.

## What is Scene Metadata?

Scene metadata is a subset of scene information that can be embedded in HTML pages or HTTP headers. It includes:

- Scene identification (ID, name)
- Author information
- Content rating
- Thumbnail image
- World information

Metadata allows DDDBrowser to:
- Show scene previews
- Display scene information before loading
- Organize scenes by world
- Filter by content rating

## Discovery Priority

DDDBrowser discovers scene metadata using a priority order:

1. **HTML `<script>` tag** (highest priority)
2. **HTML `<meta>` tag**
3. **HTTP `X-Blazium-Scene` header** (lowest priority)

DDDBrowser checks each method in order and uses the first valid metadata found.

## HTML Script Tag Format

The recommended method is embedding the full scene JSON in a `<script>` tag:

```html
<script id="blazium-scene" type="application/vnd.blazium.scene+json">
{
  "name": "My Scene",
  "version": "1.0",
  "schemaVersion": "1.0",
  "id": "my_scene",
  "author": "Scene Creator",
  "rating": "GENERAL",
  "thumbnail": "https://example.com/thumb.jpg",
  "world": {
    "id": "my_world",
    "position": {"x": 0.0, "y": 0.0, "z": 0.0}
  },
  "assets": [],
  "instances": []
}
</script>
```

**Requirements**:
- `id` attribute must be `"blazium-scene"`
- `type` attribute must be `"application/vnd.blazium.scene+json"`
- Content must be valid JSON

**Advantages**:
- Contains full scene definition
- No need for separate metadata
- Single source of truth

## HTML Meta Tag Format

Metadata can be provided via HTML meta tags:

```html
<meta name="scene:id" content="my_scene">
<meta name="scene:name" content="My Scene">
<meta name="scene:author" content="Scene Creator">
<meta name="scene:rating" content="GENERAL">
<meta name="scene:thumbnail" content="https://example.com/thumb.jpg">
<meta name="scene:world:id" content="my_world">
<meta name="scene:world:position" content="0,0,0">
```

**Meta tag names**:
- `scene:id` - Scene identifier
- `scene:name` - Scene name
- `scene:author` - Scene author
- `scene:rating` - Content rating (GENERAL, MODERATE, ADULT)
- `scene:thumbnail` - Thumbnail image URL
- `scene:world:id` - World identifier
- `scene:world:position` - World position (format: "x,y,z")

**Use case**: When you want to provide metadata separately from the scene JSON

## HTTP Header Format

Metadata can be provided via HTTP response headers:

```
X-Blazium-Scene: {"id":"my_scene","name":"My Scene","author":"Creator","rating":"GENERAL"}
```

**Format**: JSON object with metadata fields

**Use case**: Server-side scene generation or dynamic metadata

## Metadata Fields

### Scene Identification

- **`id`** (string): Unique scene identifier
- **`name`** (string): Human-readable scene name

### Author Information

- **`author`** (string): Scene creator/author

### Content Rating

- **`rating`** (string): Content rating
  - `"GENERAL"` - Suitable for all audiences
  - `"MODERATE"` - May contain mild content
  - `"ADULT"` - Mature content

### Visual Preview

- **`thumbnail`** (string): URL to thumbnail image
  - Should be a square image (recommended: 512x512 or 1024x1024)
  - Formats: PNG, JPG, JPEG
  - Must be HTTPS

### World Information

- **`world.id`** (string): World identifier
- **`world.position`** (vec3): Position in world space

`world.id` / `world.position` are metadata for display and portal world-id checks. The runtime loads one scene at a time; seamless shared-coordinate multi-scene worlds are not implemented yet.

## Complete Example

### HTML with Script Tag

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Scene</title>
  
  <meta name="scene:id" content="my_scene">
  <meta name="scene:name" content="My Scene">
  <meta name="scene:author" content="Creator">
  <meta name="scene:rating" content="GENERAL">
  <meta name="scene:thumbnail" content="https://example.com/thumb.jpg">
  
  <script id="blazium-scene" type="application/vnd.blazium.scene+json">
  {
    "name": "My Scene",
    "version": "1.0",
    "schemaVersion": "1.0",
    "id": "my_scene",
    "author": "Creator",
    "rating": "GENERAL",
    "thumbnail": "https://example.com/thumb.jpg",
    "assets": [],
    "instances": []
  }
  </script>
</head>
<body>
  <h1>My Scene</h1>
</body>
</html>
```

### Meta Tags Only

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Scene</title>
  
  <meta name="scene:id" content="my_scene">
  <meta name="scene:name" content="My Scene">
  <meta name="scene:author" content="Creator">
  <meta name="scene:rating" content="GENERAL">
  <meta name="scene:thumbnail" content="https://example.com/thumb.jpg">
  <meta name="scene:world:id" content="my_world">
  <meta name="scene:world:position" content="0,0,0">
  
  <meta name="x-blazium-scene" content='{"name":"My Scene","version":"1.0","schemaVersion":"1.0","assets":[],"instances":[]}'>
</head>
<body>
  <h1>My Scene</h1>
</body>
</html>
```

## Best Practices

- **Always provide metadata**: Makes scenes discoverable and browsable
- **Use script tags**: Most reliable and contains full scene definition
- **Include thumbnails**: Visual previews help users find scenes
- **Set appropriate ratings**: Helps users find suitable content
- **Use world IDs**: Organize related scenes together
- **Keep metadata consistent**: Ensure metadata matches scene JSON

## Metadata vs Scene JSON

Metadata and scene JSON can overlap:

- **Metadata**: Quick preview, discovery, browsing
- **Scene JSON**: Complete scene definition, required for loading

If both are provided:
- Metadata is used for previews
- Scene JSON is used for actual loading
- They should be consistent but can differ (e.g., metadata might be cached)

## Next Steps

- [Scene Format Intro](/docs/scene-format/intro) - Return to scene format overview
- [Schema Reference](/docs/scene-format/schema-reference) - Complete schema documentation
- [Examples](/docs/examples/metadata/metadata-html) - See metadata examples

