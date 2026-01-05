---
sidebar_position: 2
---

# Getting Started

This guide will help you get DDDBrowser up and running so you can start exploring 3D virtual worlds.

## Installation

DDDBrowser is a desktop application. To install it:

1. Download the latest release from the project repository
2. Extract the archive to a folder of your choice
3. Run `DDDBrowser.exe` (Windows) or the appropriate executable for your platform

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
- **NONE**: No player movement (for viewing only)

## Understanding the UI

### Top Bar

The top bar provides quick access to:

- **URL Input**: Enter scene URLs to load
- **Load Button**: Start loading the scene
- **Progress Indicator**: Shows download/loading progress
- **Leave Instance**: Return to the idle state (unload current scene)

### Settings

Access settings via the menu system:

- **Audio Settings**: Adjust volume levels and select audio device
- **Keybindings**: Customize input controls
- **General**: Quit confirmation preferences

## Configuration

DDDBrowser stores settings in:

- **Settings**: `%LOCALAPPDATA%\DDDBrowser\settings.json`
- **Keybindings**: `%LOCALAPPDATA%\DDDBrowser\keybindings.json`
- **Cache**: `%LOCALAPPDATA%\DDDBrowser\cache\<md5-hash>\`

The cache directory stores downloaded assets to speed up subsequent loads of the same scenes.

## Next Steps

Now that you have DDDBrowser running:

- [Learn Navigation](/docs/using/navigation) - Master the controls
- [Explore Scene Features](/docs/using/scene-features) - Understand what scenes can do
- [Create Your Own Scene](/docs/scene-format/intro) - Build your first scene
- [Try Examples](/docs/examples/intro) - See what's possible

