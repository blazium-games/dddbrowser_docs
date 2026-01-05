---
sidebar_position: 2
---

# Loading Scenes

DDDBrowser loads 3D scenes from web URLs. This guide explains how scene loading works and how to use it effectively.

## Using the URL Input

The URL input field is located in the top bar of DDDBrowser. To load a scene:

1. **Enter a URL** in the input field
   - Must be a valid HTTPS URL
   - Should point to an HTML page containing scene metadata
   - Example: `https://blazium-engine.github.io/DDDBrowserExamples/index.html`

2. **Click Load** or press Enter

3. **Wait for loading** - The progress indicator shows:
   - Scene discovery
   - Asset downloads
   - Scene processing

## Scene Discovery Methods

DDDBrowser discovers scene definitions using a priority order. It checks each method in sequence until it finds a valid scene:

### 1. HTML `<script>` Tag (Highest Priority)

DDDBrowser first looks for a `<script>` tag with the scene JSON:

```html
<script id="blazium-scene" type="application/vnd.blazium.scene+json">
{
  "name": "My Scene",
  "version": "1.0",
  "schemaVersion": "1.0",
  "assets": [],
  "instances": []
}
</script>
```

This is the recommended method as it provides the full scene definition inline.

### 2. HTML `<meta>` Tag

If no script tag is found, DDDBrowser checks for a meta tag:

```html
<meta name="x-blazium-scene" content='{"name":"My Scene",...}'>
```

The `content` attribute should contain a JSON-encoded scene definition.

### 3. HTTP Header (Lowest Priority)

Finally, DDDBrowser checks for an HTTP header:

```
X-Blazium-Scene: {"name":"My Scene",...}
```

This is useful for server-side scene generation.

## Loading Process

When you load a scene, DDDBrowser:

1. **Downloads the HTML page** from the URL
2. **Discovers the scene definition** using the priority order above
3. **Validates the scene JSON** against the schema
4. **Downloads all assets**:
   - Models (OBJ/MTL files)
   - Textures (PNG, JPG, JPEG, TGA)
   - Scripts (Luau files)
   - Fonts (TTF files)
   - Audio (WAV files)
5. **Processes the scene**:
   - Creates 3D instances
   - Sets up lighting
   - Loads scripts
   - Initializes physics
6. **Renders the scene** and makes it interactive

## Loading Progress

The progress indicator in the top bar shows:

- **Scene discovery**: Finding the scene definition
- **Validation**: Checking scene JSON validity
- **Asset downloads**: Downloading required files
- **Processing**: Creating 3D objects and initializing systems

## Error Handling

If loading fails, DDDBrowser will:

- **Show an error message** explaining what went wrong
- **Provide a retry option** to try loading again
- **Common errors**:
  - Invalid URL or network error
  - Scene JSON validation failure
  - Missing required assets
  - Unsupported file formats

## Cache Behavior

DDDBrowser caches downloaded assets to speed up subsequent loads:

- **Cache location**: `%LOCALAPPDATA%\DDDBrowser\cache\<md5-hash>\`
- **Cache key**: MD5 hash of the base URL (scheme://host[:port])
- **Benefits**: Faster loading when revisiting scenes
- **Automatic**: No configuration needed

The cache is organized by base URL, so assets from the same domain are shared across scenes.

## HTTPS Requirement

DDDBrowser **only supports HTTPS URLs** for security:

- ✅ `https://example.com/scene.html` - Allowed
- ❌ `http://example.com/scene.html` - Rejected
- ❌ `file:///path/to/scene.html` - Not supported

This ensures all assets are downloaded securely and prevents man-in-the-middle attacks.

## Leaving a Scene

To unload the current scene and return to the idle state:

- Click the **Leave Instance** button in the top bar
- Or use the menu system to navigate away

This will:
- Unload all scene assets
- Stop all scripts
- Return to the default grid view
- Clear the scene state

## Best Practices

- **Use HTTPS**: Always serve scenes over HTTPS
- **Optimize assets**: Compress textures and models for faster loading
- **Provide metadata**: Include scene metadata for better discovery
- **Test loading**: Verify your scene loads correctly before sharing
- **Handle errors**: Provide fallbacks for missing assets

## Next Steps

- [Scene Format](/docs/scene-format/intro) - Learn how to create scenes
- [Scene Metadata](/docs/scene-format/metadata) - Understand metadata discovery
- [Troubleshooting](/docs/troubleshooting) - Fix loading issues

