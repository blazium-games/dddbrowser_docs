---
sidebar_position: 2
---

# Getting Started

This guide will help you get DDDBrowser up and running so you can start exploring 3D virtual worlds.

## Installation

DDDBrowser is a **Windows** desktop application (x64). Linux/macOS are not supported for public releases.

1. Download the latest Windows release (staged folder or zip) and the matching `SHA256SUMS.txt`
2. Verify checksums, then extract/copy the `browser` payload to a folder of your choice
3. Run `DDDBrowser.exe`

Settings, cache, and logs live under `%LOCALAPPDATA%\DDDBrowser\` (telemetry, when enabled, under `%LOCALAPPDATA%\Blazium\logs\`). Default logs redact URL paths (scheme + host only).

## Running the Application

After installation, launch DDDBrowser. You should see:

- A **black screen** with a white XZ grid (Y=0 plane)
- A **top bar** with:
  - URL input field
  - Load button
  - Progress indicator
  - Leave Instance button

This is the default "idle" state when no scene is loaded.

## Loading Your First Scene

To load a scene:

1. **Enter a URL** in the URL input field at the top
   - The URL should point to an HTML page that contains scene metadata
   - Example: `https://blazium-engine.github.io/DDDBrowserExamples/index.html`

2. **Click the Load button** or press Enter

3. **Wait for loading** - DDDBrowser will:
   - Download the HTML page
   - Discover the scene definition
   - Validate the scene JSON
   - Download all assets (models, textures, etc.)
   - Render the scene

4. Once loaded, you'll see the 3D scene and can start exploring!

## Basic Navigation

Once a scene is loaded, you can navigate using:

- **WASD keys**: Move forward, backward, left, right
- **Mouse**: Look around (first-person camera)
- **Space**: Jump (if enabled in the scene)
- **Shift**: Sprint (if enabled)
- **E or F**: Interact with objects

The exact controls depend on the scene's `gameType` setting:
- **FPS**: First-person shooter style movement
- **NONE**: WASD fly-cam exploration (no FPS physics)

## Understanding the UI

### Top Bar

The top bar provides quick access to:

- **URL Input**: Enter scene URLs to load
- **Load Button**: Start loading the scene
- **Progress Indicator**: Shows download/loading progress
- **Leave Instance**: Return to the idle state (unload current scene)

### Settings

Press **Esc → Settings**:

- **Audio**: Volume levels and audio device
- **Graphics**: Occlusion culling, shadows
- **Network Policy**: Script HTTP third-party hosts
- **Script origins**: Hosts allowed for remote `.luau`
- **Keybindings**: Customize input controls
- **Quit confirmation**: Don't-ask-again preference

## Configuration

DDDBrowser stores settings in:

- **Settings**: `%LOCALAPPDATA%\DDDBrowser\settings.json`
- **Keybindings**: `%LOCALAPPDATA%\DDDBrowser\keybindings.json`
- **Cache**: `%LOCALAPPDATA%\DDDBrowser\cache\<md5-hash>\`

The cache directory stores downloaded assets to speed up subsequent loads of the same scenes. Each cached network asset has a sibling `.meta` file with `etag` / `lastModified` validators. On reuse, DDDBrowser **revalidates** with the origin (`If-None-Match` / `If-Modified-Since`): HTTP 304 keeps the file; a new 200 replaces it; a failed revalidation **fails the scene load** (fail closed — unrevalidated disk bytes are not used for scripts or other assets).

### Privacy

Default application logs redact `http(s)` URLs to `scheme://host/***`. Telemetry is **off by default**; when enabled, string payload fields are redacted the same way unless full-URL debug logging is explicitly enabled.

## Next Steps

Now that you have DDDBrowser running:

- [Learn Navigation](/docs/using/navigation) - Master the controls
- [Explore Scene Features](/docs/using/scene-features) - Understand what scenes can do
- [Create Your Own Scene](/docs/scene-format/intro) - Build your first scene
- [Try Examples](/docs/examples/intro) - See what's possible

