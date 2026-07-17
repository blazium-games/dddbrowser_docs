---
sidebar_position: 3
---

# Assets

Assets are resources used by the scene, such as 3D models, textures, scripts, and audio files. All assets must be defined in the `assets` array before they can be used in instances.

## Asset Structure

All assets have this basic structure:

```json
{
  "id": "unique-asset-id",
  "type": "asset-type",
  "uri": "https://example.com/resource.ext",
  "mediaType": "type/subtype"
}
```

### Required Properties

- **`id`** (string): Unique identifier for the asset. Must be unique within the scene.
- **`type`** (string): Asset type (see types below)
- **`uri`** (string): URL to the asset file. Must be HTTPS.
- **`mediaType`** (string): MIME type of the asset

## Asset Types

### Model (`type: "model"`)

3D geometry files in OBJ format.

```json
{
  "id": "my-model",
  "type": "model",
  "uri": "https://example.com/model.obj",
  "mediaType": "model/obj"
}
```

**Supported formats**: OBJ (`.obj` files)
**Media types**: `model/obj`
**Materials**: Use separate material assets (MTL files)
**Constraints**:
- Triangle faces only (quads/ngons are skipped)
- OBJ file size cap: **64 MiB**; MTL: **16 MiB**
- Soft caps: ~2M vertices, ~8M indices, 8192 meshes / 4096 shapes / 4096 materials per OBJ

### Material (`type: "material"`)

Material definitions in MTL format.

```json
{
  "id": "my-material",
  "type": "material",
  "uri": "https://example.com/material.mtl",
  "mediaType": "model/mtl"
}
```

**Supported formats**: MTL (`.mtl` files)
**Media types**: `model/mtl`
**Usage**: Referenced by OBJ models

### Texture (`type: "texture"`)

Image files used for textures.

```json
{
  "id": "my-texture",
  "type": "texture",
  "uri": "https://example.com/texture.jpg",
  "mediaType": "image/jpeg"
}
```

**Supported formats**: PNG, JPG, JPEG, TGA (LDR only)
**Media types**: `image/png`, `image/jpeg`, `image/jpg`, `image/tga`
**Usage**: Referenced by materials or pictureboxes
**Limits** (rejected at load):
- Max dimension: **8192** px on either side
- Max total pixels: **4096×4096** (16,777,216)
- Max file size: **64 MiB**

### Script (`type: "script"`)

Lua/Luau script files for interactive behaviors.

```json
{
  "id": "my-script",
  "type": "script",
  "uri": "https://example.com/script.luau",
  "mediaType": "application/x-luau"
}
```

**Supported formats**: Luau (`.luau` files)
**Media types**: `application/x-luau`
**Usage**: Attached to instances via the `script` property

### Font (`type: "font"`)

TrueType font files for text rendering.

```json
{
  "id": "my-font",
  "type": "font",
  "uri": "https://example.com/font.ttf",
  "mediaType": "font/ttf",
  "font": {
    "size": 16,
    "style": "normal"
  }
}
```

**Supported formats**: TTF (`.ttf`) and OTF (`.otf`)
**Media types**: `font/ttf`, `font/otf`
**Font properties**:
- `size` (number, optional): Font size in pixels
- `style` (string, optional): Font style - `"normal"`, `"bold"`, or `"italic"`

### Audio (`type: "audio"`)

Audio files for sound effects and music.

```json
{
  "id": "my-audio",
  "type": "audio",
  "uri": "https://example.com/sound.wav",
  "mediaType": "audio/wav",
  "audio": {
    "format": "wav",
    "ambient": false
  }
}
```

**Supported formats**: WAV (`.wav` files), **PCM only** (compressed WAV is not supported)
**Media types**: `audio/wav`
**Limits**: Max WAV file size **32 MiB**
**Audio properties**:
- `format` (string, required by schema): Must be `"wav"`
- `ambient` (boolean, optional): Whether audio is ambient (constant volume)

### Textbox (`type: "textbox"`)

Textbox asset definitions for displaying text.

```json
{
  "id": "my-textbox",
  "type": "textbox",
  "uri": "data:text/plain,textbox",
  "mediaType": "application/json",
  "textbox": {
    "text": "Hello, World!",
    "title": "Welcome",
    "font": "my-font",
    "size": 1.0,
    "color": {"x": 1.0, "y": 1.0, "z": 1.0}
  }
}
```

**Textbox properties**:
- `text` (string, required): Text content
- `title` (string, optional): Title text
- `font` (string, optional): Font asset ID
- `size` (number, optional): Text size multiplier
- `color` (vec3, optional): Text color (RGB, 0-1)

### Picturebox (`type: "picturebox"`)

Picturebox asset definitions for displaying images.

```json
{
  "id": "my-picturebox",
  "type": "picturebox",
  "uri": "data:text/plain,picturebox",
  "mediaType": "application/json",
  "picturebox": {
    "texture": "my-texture",
    "width": 2.0,
    "height": 2.0
  }
}
```

**Picturebox properties**:
- `texture` (string, required): Texture asset ID
- `width` (number, required): Width in world units (must be > 0)
- `height` (number, required): Height in world units (must be > 0)

## URI Formats

Assets can use two URI formats:

### HTTPS URLs

Standard web URLs (required for most assets):

```json
"uri": "https://example.com/model.obj"
```

**Requirements**:
- Must use HTTPS (HTTP is not supported)
- Must be publicly accessible
- Should use proper file extensions

### Data URIs

Inline data for textbox and picturebox assets:

```json
"uri": "data:text/plain,textbox"
```

**Use case**: Textbox and picturebox assets that don't need external files

## Media Types Reference

| Asset Type | Media Type |
|------------|------------|
| Model (OBJ) | `model/obj` |
| Material (MTL) | `model/mtl` |
| Texture (PNG) | `image/png` |
| Texture (JPG) | `image/jpeg` or `image/jpg` |
| Texture (TGA) | `image/tga` |
| Script (Luau) | `application/x-luau` |
| Font (TTF) | `font/ttf` |
| Font (OTF) | `font/otf` |
| Audio (WAV) | `audio/wav` |
| Textbox | `application/json` |
| Picturebox | `application/json` |

## Asset Colliders

Model assets can optionally specify collider information:

```json
{
  "id": "model-with-collider",
  "type": "model",
  "uri": "https://example.com/model.obj",
  "mediaType": "model/obj",
  "collider": {
    "type": "mesh"
  }
}
```

Collider types:
- `"mesh"`: Use the mesh geometry as collider
- `"box"`: Axis-aligned bounding box
- `"sphere"`: Bounding sphere

## Asset Examples

### Complete Asset Set

```json
"assets": [
  {
    "id": "capsule-model",
    "type": "model",
    "uri": "https://example.com/capsule.obj",
    "mediaType": "model/obj"
  },
  {
    "id": "capsule-material",
    "type": "material",
    "uri": "https://example.com/capsule.mtl",
    "mediaType": "model/mtl"
  },
  {
    "id": "capsule-texture",
    "type": "texture",
    "uri": "https://example.com/capsule.jpg",
    "mediaType": "image/jpeg"
  },
  {
    "id": "pingpong-script",
    "type": "script",
    "uri": "https://example.com/pingpong.luau",
    "mediaType": "application/x-luau"
  },
  {
    "id": "test-audio",
    "type": "audio",
    "uri": "https://example.com/sound.wav",
    "mediaType": "audio/wav",
    "audio": {
      "format": "wav",
      "ambient": false
    }
  }
]
```

## Best Practices

- **Use descriptive IDs**: Make asset IDs clear and meaningful
- **Organize assets**: Group related assets together
- **Optimize files**: Compress textures and models for faster loading
- **Use HTTPS**: All URIs must be HTTPS
- **Validate media types**: Ensure media types match file formats

## Next Steps

- [Instances](/docs/scene-format/instances) - Learn how to use assets in instances
- [Scene Format Intro](/docs/scene-format/intro) - Return to scene format overview
- [Examples](/docs/examples/intro) - See asset examples

