---
sidebar_position: 1
---

# Introduction to DDDBrowser

DDDBrowser is a 3D scene browser that allows you to explore and interact with virtual worlds loaded from web URLs. It supports rich 3D scenes with models, lighting, audio, scripting, and portals that connect different scenes together.

## What is DDDBrowser?

DDDBrowser is a desktop application that:

- **Loads 3D scenes** from web URLs (HTTPS default; HTTP via Allow HTTP)
- **Renders interactive 3D environments** with models, lights, and effects
- **Supports scripting** with Lua/Luau for interactive behaviors
- **Enables travel** between scenes via portals
- **Provides a first-person** navigation experience

Think of it as a browser for 3D virtual worlds - similar to how a web browser loads HTML pages, DDDBrowser loads 3D scene definitions and renders them in real-time.

## Key Concepts

### Scenes

A **scene** is a JSON definition that describes a 3D environment. Scenes contain:
- **Assets**: Models, textures, materials, scripts, fonts, and audio files
- **Instances**: Placed objects in the 3D world (models, lights, portals, etc.)
- **Metadata**: Information about the scene (name, author, rating, thumbnail)

Scenes are discovered from HTML pages using:
1. `<script>` tags with scene JSON
2. `<meta>` tags with scene metadata
3. HTTP headers with scene information

### Instances

**Instances** are objects placed in the 3D world. Each instance has:
- **Position**: Where it appears (x, y, z coordinates)
- **Rotation**: How it's oriented (Euler angles in degrees)
- **Scale**: How large it is (x, y, z scale factors)
- **Type**: What kind of object it is (model, light, portal, etc.)

### Assets

**Assets** are resources used by the scene:
- **Models**: 3D geometry (OBJ/MTL format)
- **Textures**: Images (PNG, JPG, JPEG, TGA)
- **Materials**: Material definitions (MTL files)
- **Scripts**: Lua/Luau code for interactivity
- **Fonts**: TrueType / OpenType fonts (TTF, OTF)
- **Audio**: Sound files (WAV)

### Portals

**Portals** are special instances that allow you to travel between scenes. When you interact with a portal, DDDBrowser loads the destination scene URL.

### Worlds

**Worlds** are metadata on scenes (`world.id`, `world.position` in scene JSON; exposed to scripts as `Scene.getWorldId()` / `Scene.getWorldPosition()`) used for display and portal compatibility checks. DDDBrowser loads one scene at a time; seamless multi-scene worlds in a shared coordinate space are not implemented yet.

## Supported Formats

DDDBrowser supports the following file formats:

- **Models**: OBJ (geometry) and MTL (materials)
- **Textures**: PNG, JPG, JPEG, TGA
- **Fonts**: TTF / OTF
- **Audio**: WAV
- **Scripts**: Luau (Lua 5.1 compatible)

**HTTPS is the default and recommended** for scene and asset URLs. Plain `http://` travel/load is allowed only after an explicit **Allow HTTP** confirmation in the client (user-gated escape hatch). Script `Engine.httpRequest` is separate: it remains HTTPS-only and does **not** inherit the travel Allow HTTP flag.

## Scene Discovery

DDDBrowser discovers scenes from HTML pages using a priority order:

1. **`<script>` tag** (highest priority):
   ```html
   <script id="blazium-scene" type="application/vnd.blazium.scene+json">
   {
     "name": "My Scene",
     "version": "1.0",
     ...
   }
   </script>
   ```

2. **`<meta>` tag**:
   ```html
   <meta name="x-blazium-scene" content='{"name":"My Scene",...}'>
   ```

3. **HTTP header** (lowest priority):
   ```
   X-Blazium-Scene: {"name":"My Scene",...}
   ```

## What You Can Do

With DDDBrowser, you can:

- **Explore 3D worlds** loaded from web URLs
- **Interact with objects** using scripts
- **Travel between scenes** via portals
- **Experience audio** and visual effects
- **Customize controls** and settings
- **Create your own scenes** using the scene format

## Next Steps

- [Get Started](/docs/getting-started) - Learn how to install and run DDDBrowser
- [Scene Format](/docs/scene-format/intro) - Learn how to create scenes
- [Lua/Luau API](/docs/luau/intro) - Learn how to script interactive behaviors
- [Examples](/docs/examples/intro) - See example scenes
