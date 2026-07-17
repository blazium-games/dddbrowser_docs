---
sidebar_position: 4
---

# Scene Features

DDDBrowser supports a rich set of features that make scenes interactive and engaging. This guide covers all the features available in scenes.

## Portals

Portals allow you to travel between scenes:

- **Purpose**: Connect different scenes together
- **Trigger modes** (exactly one per portal):
  - **Auto** (`autoTrigger`): enter radius → travel preview / load (same URL validation and HTTP prompt as other travel)
  - **Manual** (`manualTrigger`): interact (look+click or nearby+interact) → portal confirmation modal
  - **Script** (`scriptTrigger`): interact → entity `on_interact`; call `Engine.triggerPortal(instanceId)` or `Scene.TravelTo(url)`
- **Validation**: Destination URL and world are validated
- **Travel**: Loads destination scene when the player confirms (manual) or the script/auto path proceeds

Portals can specify:
- Destination URL
- Trigger radius
- World ID and position (for world-based scenes)

See [Portal Examples](/docs/examples/portals/portal-source) for more details.

## Textboxes

Two related surfaces exist:

- **World billboard textboxes**: Scene instances of type `textbox` (asset + instance). These are 3D-positioned billboards rendered in the world by the textbox system. They are authored in scene JSON, not opened as a modal.
- **Modal textboxes**: Script-driven UI via `Engine.openTextBox()` / `Engine.closeTextBox()` (and the ImGui variants). These show an overlay modal with title, body, buttons, and checkboxes, with an optional Lua callback for the result.

Do not confuse world billboard instances with the modal API — both can appear in the same scene for different purposes.

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
- Scene JSON authoring **and** script APIs: `Engine.setLight*` / `Engine.getLight*` (setters use session-global soft ownership for spawned lights; getters are open reads). Lights may also be spawned with optional props via `Engine.spawnEntity({ type = "pointlight", color = ..., intensity = ..., ... })`.

Scene-authored light props and entity visibility are restored from `scene_state` v2 (`entityLights`, `entityVisibility`) on reload.

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
- **Format**: Equirectangular skybox texture as an LDR image (**PNG / JPG / JPEG / TGA** only). HDR/EXR skyboxes are not supported. Separate 6-face cubemap file lists are not supported.
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
- **State** (`scene_state.json` v2): player camera pose, script/gamemode `on_save` tables, session-spawned entities (`Engine.spawnEntity`), transforms for mutable scene instances, plus `entityVisibility` (hidden renderables) and `entityLights` (color/intensity/enabled/range and spot extras for **scene-authored and spawned** lights). Session-spawned audio restores loop/volume/autoPlay/ambient. Spawn ids (`lua_spawn_N`) advance the session counter on load so new spawns do not collide. Not a full ECS world dump (portals, volumes, physics velocities, etc. are not serialized).

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

When OpenGL 4.3+ compute is available, DDDBrowser builds a hierarchical Z-buffer on the GPU (from the previous frame’s depth) and batch-tests mesh bounds with a compute shader. Visibility results are applied with a **one-frame delay** (double-buffered SSBO readback) so the current frame does not stall on `glGetBufferSubData`. New or unknown candidates stay visible (conservative) until a delayed result arrives. Without compute support, occlusion culling is skipped (frustum/portal culling still apply).

## Asset streaming (textures / IBL)

Texture uploads use a small **PBO ring** on the render thread; mipmap generation is deferred to a follow-up frame. Skybox equirectangular upload and IBL (irradiance + specular prefilter) share the per-frame asset budget (~6 ms): IBL advances one cubemap face (or one prefilter mip-face) per tick instead of baking everything in a single frame.

## Instanced mesh sync

ECS → InstanceManager sync interns mesh cache keys (`MeshKeyId`) and tracks a per-mesh **entity-set fingerprint**. Transform-only updates patch instances in place; adding or removing entities remaps only the affected mesh batch (no global instance clear on set changes).

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

