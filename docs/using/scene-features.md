---
sidebar_position: 4
---

# Scene Features

DDDBrowser supports a rich set of features that make scenes interactive and engaging. This guide covers all the features available in scenes.

## Portals

Portals allow you to travel between scenes:

- **Purpose**: Connect different scenes together
- **Trigger**: Interact with portal instance
- **Configuration**: 
  - Auto-trigger (travel immediately on approach)
  - Manual trigger (require interaction)
  - Script trigger (controlled by scripts)
- **Validation**: Destination URL and world are validated
- **Travel**: Loads destination scene when triggered

Portals can specify:
- Destination URL
- Trigger radius
- World ID and position (for world-based scenes)

See [Portal Examples](/docs/examples/portals/portal-source) for more details.

## Textboxes

Textboxes display information and collect user input:

- **Purpose**: Show text, dialogs, quests, etc.
- **Features**:
  - Title and content text
  - Action buttons
  - Checkboxes for preferences
  - Script callbacks for user actions
- **Types**:
  - Scene textbox instances (3D positioned)
  - ImGui textboxes (overlay style)

Textboxes are controlled by scripts using `Engine.openTextBox()` and `Engine.closeTextBox()`.

See [Textbox Examples](/docs/examples/features/textbox-scene) for usage.

## Pictureboxes

Pictureboxes display images in the 3D world:

- **Purpose**: Show images, signs, UI elements in 3D space
- **Configuration**: Texture asset reference
- **Positioning**: Placed like any other instance
- **Use cases**: Signs, billboards, UI panels

Pictureboxes are defined as assets and placed as instances.

See [Picturebox Examples](/docs/examples/features/picturebox-scene) for usage.

## Audio Playback

Scenes can play audio:

- **Types**:
  - **Spatial audio**: Positioned in 3D space, volume based on distance
  - **Ambient audio**: Constant volume regardless of position
- **Features**:
  - Looping support
  - Volume control
  - Multiple simultaneous sounds
  - Script-controlled playback

Audio is controlled by:
- Audio instances in the scene
- Scripts using `Engine.playAudio()` and `Engine.stopAudio()`

See [Audio Examples](/docs/examples/features/audio-scene) for usage.

## Lighting

DDDBrowser supports three types of lights:

### Point Lights

- **Type**: Omni-directional light from a point
- **Properties**: Color, intensity, range
- **Use case**: Lamps, torches, area lighting

### Directional Lights

- **Type**: Parallel light rays (like sunlight)
- **Properties**: Color, intensity, direction, shadows
- **Use case**: Sun, moon, global illumination
- **Shadows**: Can cast shadows with configurable resolution

### Spot Lights

- **Type**: Cone-shaped light
- **Properties**: Color, intensity, direction, angle, range
- **Use case**: Flashlights, spotlights, focused lighting

All lights support:
- Color (RGB)
- Intensity (brightness)
- Shadows (directional lights)
- Configured in scene JSON (script light setters are not available)

See [Lighting Examples](/docs/examples/lighting/directional-light) for usage.

## Shadows

Directional lights can cast shadows:

- **Purpose**: Realistic lighting with depth
- **Configuration**: 
  - Shadow map resolution
  - Shadow bias
  - Orthographic size
- **Performance**: Higher resolution = better quality but slower
- **Shadows**: Directional (CSM), spot, and point (cubemap) lights can cast shadows when `shadowEnabled` is set

## Skyboxes

Skyboxes provide environment mapping:

- **Purpose**: Background environment (sky, space, etc.)
- **Format**: Equirectangular skybox texture (HDR/LDR image). Separate 6-face cubemap file lists are not supported.
- **Rotation**: Optional rotation for animated skies
- **Configuration**: Defined in scene JSON

Skyboxes create atmosphere and context for scenes.

## Scripts and Gamemodes

Scenes can include Lua/Luau scripts:

### Entity Scripts

- **Attached to**: Individual instances
- **Lifecycle**: `on_start`, `on_update`, `on_interact`, etc.
- **Purpose**: Object behaviors, interactions, animations
- **Access**: Entity ID, asset ID, position, etc.

### Gamemode Scripts

- **Scope**: Scene-wide
- **Purpose**: Game logic, state management, events
- **Features**: 
  - State persistence
  - Event system
  - Save/load support

See [Lua/Luau API](/docs/luau/intro) for complete scripting documentation.

## Trigger Volumes

Trigger volumes detect player presence and trigger events:

- **Types**:
  - `lookAtVolume`: Player looks at it
  - `lookedAtVolume`: Player has looked at it
  - `singleTriggerVolume`: Triggers once
  - `multiTriggerVolume`: Triggers multiple times
  - `cooldownTriggerVolume`: Triggers with cooldown
  - `exitTriggerVolume`: Triggers on exit
  - `stayTriggerVolume`: Triggers while staying
  - `timedEntryTriggerVolume`: Triggers after time
  - `counterTriggerVolume`: Triggers after count
  - `sequenceTriggerVolume`: Triggers in sequence
  - `toggleTriggerVolume`: Toggles on/off
- **Use cases**: Doors, checkpoints, events, puzzles

## Autosave Volumes

Autosave volumes automatically save scene state:

- **Purpose**: Persistent game state
- **Trigger**: Player enters the volume
- **Notification**: Optional on-screen notification
- **State**: Saves gamemode and script state

See [Scene Save Examples](/docs/examples/scene-save/scene-save-autosave-default) for usage.

## Teleport Volumes

Teleport volumes move the player:

- **Purpose**: Instant player movement
- **Trigger**: Player enters the volume
- **Destination**: Target position in the scene
- **Use cases**: Elevators, portals, fast travel

## Spawn Points

Spawn points define where players appear:

- **Purpose**: Set initial player position
- **Configuration**: X, Y, Z coordinates
- **Default**: (0, 0, 0) if not specified
- **Use case**: Start locations, respawn points

## Movement Bounds

Movement bounds limit player movement:

- **Purpose**: Restrict player to an area
- **Configuration**: Min and max X, Y, Z coordinates
- **Default**: (-100, -100, -100) to (100, 100, 100)
- **Use case**: Confined spaces, levels with boundaries

## Occlusion culling

When OpenGL 4.3+ compute is available, DDDBrowser builds a hierarchical Z-buffer on the GPU and batch-tests mesh bounds with a compute shader (compact visibility readback only). There is no per-frame CPU depth download. Without compute support, occlusion culling is skipped (frustum/portal culling still apply).

## Game Types

Scenes can specify a game type:

- **FPS**: First-person shooter style movement
  - Full movement controls
  - Jump, sprint, crouch, etc.
- **NONE**: Fly-cam exploration (no FPS physics controller)
  - WASD free-look camera movement
  - Mouse look
  - Interact with objects / portals

## Next Steps

- [Scene Format](/docs/scene-format/intro) - Learn how to define features
- [Lua/Luau API](/docs/luau/intro) - Script interactive features
- [Examples](/docs/examples/intro) - See features in action

