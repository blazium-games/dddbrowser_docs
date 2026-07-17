---
sidebar_position: 3
---

# Engine API

The `Engine` API provides access to core engine functionality including input, networking, entity manipulation, UI, and audio.

## Overview

The `Engine` table is available in all scripts and provides functions for:

- Input state queries
- Entity manipulation (position, scale, rotation, visibility)
- Light control (color, intensity, enabled, range) for session-spawned lights
- Camera get/set
- HTTP requests
- UI (textboxes, modals)
- Audio playback

## Script origin trust

Remote `.luau` execution is gated by an **origin allowlist** (not scene signatures):

- Scripts whose host matches the **active scene URL host** are allowed.
- Scripts from other hosts are **denied** unless the operator adds that host under **Settings → Script origins** (`scriptOriginsAllowlist` in `settings.json`).
- Inline `data:` script URIs are allowed (they come from the scene document).
- This is separate from **Network Policy** (which only controls `Engine.httpRequest` third-party hosts).
- Pair with per-asset `sha256` pins (scene format) and cache revalidation for integrity.

## Input Functions

### Engine.getActionState(action)

Get the current state of an input action.

```lua
local isMoving = Engine.getActionState("move_forward")
if isMoving then
    print("Player is moving forward")
end
```

**Parameters**:
- `action` (string): Action name (lowercase)
  - `"move_forward"` / `"move_backward"` / `"move_left"` / `"move_right"`
  - `"interact"` - Interact button held
  - `"jump"` - Jump press pending this frame
  - `"sprint"` / `"crouch"` - Modifier keys held

**Returns**: `boolean` - `true` if action is active, `false` otherwise

**Example**:
```lua
function MyScript:on_update(dt)
    if Engine and Engine.getActionState then
        local moving = Engine.getActionState("move_forward")
        if moving then
            -- Player is moving forward
        end
    end
end
```

### Engine.consumeAction(action)

Consume an interact action to prevent multiple triggers.

```lua
local consumed = Engine.consumeAction("interact")
if consumed then
    -- Handle interaction (only triggers once)
end
```

**Parameters**:
- `action` (string): Must be `"interact"`

**Returns**: `boolean` - `true` if action was consumed, `false` otherwise

**Use case**: Prevent multiple triggers from a single interaction press

**Example**:
```lua
function MyScript:on_interact(actorId)
    local consumed = Engine.consumeAction("interact")
    if consumed then
        -- This will only run once per interaction
        print("Interaction consumed")
    end
end
```

## Entity Manipulation

### Engine.setEntityPosition(entityIdOrInstanceId, x, y, z)

Set the position of an entity.

```lua
Engine.setEntityPosition(self.entity, 0, 5, 0)
-- or, for scene / spawnEntity instance ids:
Engine.setEntityPosition("lua_spawn_1", 0, 5, 0)
```

**Parameters**:
- `entityIdOrInstanceId` (number|string): Script entity id (`self.entity`) **or** scene instance id string
- `x` (number): X coordinate
- `y` (number): Y coordinate
- `z` (number): Z coordinate

**Returns**: None

**ID model**: Script components use numeric `self.entity`. Scene instances and `Engine.spawnEntity` use string instance ids. `getEntity*` / `destroyEntity` take instance ids; `setEntity*` accepts either form.

**Ownership**: String instance ids use **per-caller spawn ownership**. With a script caller, the id must be the caller's own `assetId` or a spawn created by that same script entity. Without a script caller (console), only **console-owned** spawns are accepted. Cross-script mutate/destroy of another script's `spawnEntity` ids is rejected. Rejected updates log a warning and do nothing (they do not throw).

**Example**:
```lua
function MyScript:on_update(dt)
    self.time = self.time + dt
    local y = math.sin(self.time) * 5
    Engine.setEntityPosition(self.entity, 0, y, 0)
end
```

### Engine.setEntityScale(entityIdOrInstanceId, x, y, z)

Set the scale of an entity. Accepts the same id forms as `setEntityPosition` (script entity id or scene/spawn instance id string). Scripts may transform instance ids returned from `Engine.spawnEntity` in the current session.

```lua
Engine.setEntityScale(self.entity, 2.0, 2.0, 2.0)
Engine.setEntityScale("lua_spawn_1", 2.0, 2.0, 2.0)
```

**Parameters**:
- `entityIdOrInstanceId` (number|string): Script entity id or instance id
- `x` (number): X scale (must be > 0)
- `y` (number): Y scale (must be > 0)
- `z` (number): Z scale (must be > 0)

**Returns**: None

**Example**:
```lua
function MyScript:on_start()
    self.baseScale = 1.0
    self.pulseSpeed = 2.0
end

function MyScript:on_update(dt)
    self.time = self.time + dt
    local scale = self.baseScale + math.sin(self.time * self.pulseSpeed) * 0.2
    Engine.setEntityScale(self.entity, scale, scale, scale)
end
```

### Engine.setEntityRotation(entityIdOrInstanceId, x, y, z)

Set the rotation of an entity (Euler angles in degrees). Same ownership rules as `setEntityPosition` / `setEntityScale`.

```lua
Engine.setEntityRotation(self.entity, 0, 45, 0)
Engine.setEntityRotation("lua_spawn_1", 0, 45, 0)
```

**Parameters**:
- `entityIdOrInstanceId` (number|string): Script entity id or instance id
- `x` (number): X rotation in degrees (pitch)
- `y` (number): Y rotation in degrees (yaw)
- `z` (number): Z rotation in degrees (roll)

**Returns**: None

**Example**:
```lua
function MyScript:on_update(dt)
    self.rotation = (self.rotation or 0) + dt * 90  -- 90 degrees per second
    Engine.setEntityRotation(self.entity, 0, self.rotation, 0)
end
```

### Engine.setEntityVisible(entityIdOrInstanceId, visible)

Show or hide a renderable entity. Same ownership rules as `setEntityPosition` (script entity id, or session-spawned / owned instance id).

```lua
Engine.setEntityVisible(self.entity, false)
Engine.setEntityVisible("lua_spawn_1", true)
```

**Parameters**:
- `entityIdOrInstanceId` (number|string): Script entity id or instance id
- `visible` (boolean): Whether the entity should render

**Returns**: `boolean` - `true` if the visibility change was applied

### Engine.getEntityVisible(entityIdOrInstanceId)

Query whether a renderable entity is visible.

```lua
local visible = Engine.getEntityVisible("lua_spawn_1")
```

**Parameters**:
- `entityIdOrInstanceId` (number|string): Script entity id or instance id

**Returns**: `boolean` or `nil` if the entity is missing / not renderable

### Engine.setLightColor(instanceId, r, g, b)

Set RGB color on a light entity. Intended for lights created via `Engine.spawnEntity` by the calling script (per-caller ownership).

```lua
Engine.setLightColor(lightId, 1.0, 0.5, 0.2)
```

**Returns**: `boolean` - `true` if applied

### Engine.setLightIntensity(instanceId, intensity)

Set light intensity multiplier.

```lua
Engine.setLightIntensity(lightId, 2.5)
```

**Returns**: `boolean` - `true` if applied

### Engine.setLightEnabled(instanceId, enabled)

Enable or disable a light without destroying it.

```lua
Engine.setLightEnabled(lightId, false)
```

**Returns**: `boolean` - `true` if applied

### Engine.setLightRange(instanceId, range)

Set range for point/spot lights (no-op for directional lights).

```lua
Engine.setLightRange(lightId, 20.0)
```

**Returns**: `boolean` - `true` if applied

### Engine.getLightColor(instanceId) / getLightIntensity / getLightEnabled / getLightRange

Read light properties. Unlike setters, getters are **not** ownership-gated (same open-read model as `getEntityPosition`). Returns `nil` / falsey when the id is missing or not a light.

```lua
local color = Engine.getLightColor(lightId)       -- {x,y,z} or nil
local intensity = Engine.getLightIntensity(lightId)
local enabled = Engine.getLightEnabled(lightId)   -- boolean or nil
local range = Engine.getLightRange(lightId)       -- number or nil (point/spot)
```

### Engine.getCamera()

Read the current camera position and forward vector from `InputState`.

```lua
local cam = Engine.getCamera()
-- cam.position = { x, y, z }
-- cam.forward = { x, y, z }
```

**Returns**: table with `position` and `forward` vec3 tables

### Engine.setCamera(...)

Set camera position and forward. Accepts either six numbers or a table.

```lua
Engine.setCamera(0, 1.6, 5, 0, 0, -1)
Engine.setCamera({
    position = { x = 0, y = 1.6, z = 5 },
    forward = { x = 0, y = 0, z = -1 },
})
```

Forces a one-shot camera sync on the render/player side (`forceCameraSync`), updates the player physics body, and resets FPS velocity. Forward is normalized; a zero-length forward is an error.

**Returns**: None

### Engine.triggerPortal(instanceId)

Trigger travel for a portal instance by id (uses the portal's `destinationUrl` through the shared travel/preview path).

```lua
function MyPortalScript:on_interact(actorId)
    Engine.triggerPortal(self.asset_id)  -- portal instance id (script env field)
end
```

Used with portals that have `scriptTrigger: true` (exactly one trigger mode). Prefer this when the destination should come from the portal component; use `Scene.TravelTo(url)` when the script chooses a URL.

**Returns**: `true` only if the portal exists, is active, and travel was requested; otherwise `false`.

## Networking

### Engine.httpRequest(options)

Make an **async** HTTPS GET request. Synchronous HTTP is disabled; a `callback` is required.
Script HTTP never inherits the downloader “Allow HTTP” or private-network flags; HTTPS-only and public hosts by default.

```lua
Engine.httpRequest({
    url = "https://api.example.com/data",
    method = "GET",
    callback = function(response)
        if response.success then
            print("Status: " .. tostring(response.status))
            print("Body: " .. tostring(response.body))
        else
            print("Error: " .. tostring(response.error))
        end
    end
})
```

**Parameters**: `options` (table) with:
- `url` (string, required): HTTPS URL
- `method` (string, optional): HTTP method (only "GET" is supported)
- `callback` (function, required): Invoked with the response table when complete

**Returns**: Immediately returns a small status table (request accepted / error). The response body is delivered to `callback`.

**Restrictions**:
- Only HTTPS URLs are allowed
- Only GET method is supported
- Host allowlist may be enforced (if configured)
- Response size is limited (default: 1MB)
- Concurrent in-flight requests are capped

## UI Functions

### Engine.openTextBox(instanceId, title, text, buttons, checkboxes, callback)

Open a **modal** textbox overlay. This is unrelated to scene JSON `type: "textbox"` world billboards (see [UI Elements](/docs/using/ui-elements)).

```lua
local success = Engine.openTextBox(
    "my-textbox",
    "Welcome",
    "Hello, World!",
    {"OK", "Cancel"},
    {["Remember"] = false},
    function(button, checkboxStates)
        print("Button: " .. tostring(button))
    end
)
```

**Parameters**:
- `instanceId` (string, required): Unique identifier for the textbox
- `title` (string, optional): Textbox title
- `text` (string, required): Textbox content
- `buttons` (table, optional): Array of button labels
- `checkboxes` (table, optional): Table mapping checkbox names to initial states
- `callback` (function, optional): Callback function(button, checkboxStates)

**Returns**: `boolean` - `true` if opened successfully

**Example**:
```lua
function MyScript:on_interact(actorId)
    Engine.openTextBox(
        "quest-" .. tostring(self.entity),
        "Quest Available",
        "Would you like to accept this quest?",
        {"Accept", "Decline"},
        {["Show hints"] = true},
        function(button, checkboxes)
            if button == "Accept" then
                print("Quest accepted!")
            end
        end
    )
end
```

### Engine.closeTextBox(instanceId)

Close a textbox modal.

```lua
Engine.closeTextBox("my-textbox")
```

**Parameters**:
- `instanceId` (string, required): Textbox instance ID

**Returns**: `boolean` - `true` if closed successfully

### Engine.openImGuiTextBox(title, text, buttons, checkboxes, callback)

Open an ImGui textbox (lightweight overlay).

```lua
Engine.openImGuiTextBox(
    "Info",
    "Quick message",
    {"OK"}
)
```

**Parameters**: Same as `openTextBox` except no `instanceId`

**Returns**: `boolean` - `true` if opened successfully

### Engine.closeImGuiTextBox()

Close the ImGui textbox.

```lua
Engine.closeImGuiTextBox()
```

**Parameters**: None

**Returns**: `boolean` - `true` if closed successfully

## Audio Functions

### Engine.playAudio(instanceId, assetId, position, ambient, loop, volume)

Play audio.

```lua
local success = Engine.playAudio(
    "my-audio-instance",
    "sound-effect",
    {0, 0, 0},  -- position
    false,      -- not ambient (spatial)
    false,      -- not looping
    0.8         -- volume
)
```

**Parameters**:
- `instanceId` (string, required): Unique identifier for the audio instance
- `assetId` (string, required): Audio asset ID
- `position` (table, optional): Position `{x, y, z}` for spatial audio, or `{0,0,0}` for ambient
- `ambient` (boolean, optional): `true` for constant volume, `false` for spatial (default: false)
- `loop` (boolean, optional): `true` to loop (default: false)
- `volume` (number, optional): Volume 0.0 to 1.0 (default: 1.0)

**Returns**: `boolean` - `true` if playback started

**Spatial Audio**: Volume varies with distance from position
**Ambient Audio**: Constant volume regardless of position

**Example**:
```lua
function MyScript:on_interact(actorId)
    -- Play spatial audio at entity position
    Engine.playAudio(
        "interaction-sound-" .. tostring(self.entity),
        "click-sound",
        {0, 0, 0},  -- Will use entity position
        false,      -- Spatial
        false,      -- No loop
        1.0         -- Full volume
    )
    
    -- Play ambient background music
    Engine.playAudio(
        "bg-music",
        "background-music",
        {0, 0, 0},
        true,       -- Ambient
        true,       -- Loop
        0.5         -- Half volume
    )
end
```

### Engine.stopAudio(instanceId)

Stop audio playback.

```lua
Engine.stopAudio("my-audio-instance")
```

**Parameters**:
- `instanceId` (string, required): Audio instance ID

**Returns**: `boolean` - `true` if stopped

## Physics / Entity Queries

### Engine.raycast(origin, direction, maxDistance)

Cast a physics ray and return the first hit.

**Parameters**:
- `origin` (table): `{x, y, z}`
- `direction` (table): `{x, y, z}` (normalized preferred)
- `maxDistance` (number, optional)

**Returns**: `table` with `hit`, `instanceId`, `distance`, `position`, `normal` (or nil fields when no hit)

### Engine.sphereOverlap(center, radius)

Return instance ids whose physics bodies overlap a sphere.

### Engine.getEntityPosition(instanceId) / getEntityRotation / getEntityScale

Read transform for a scene instance id (string). Returns a `{x,y,z}` table or nil.

### Engine.spawnEntity(desc)

Spawn a runtime instance. Returns the new **instance id** string, or nil.

```lua
local id = Engine.spawnEntity({
    type = "model",           -- model | pointlight | spotlight | directionallight | audio
    asset = "my-model-asset", -- required for model/audio
    position = {x = 0, y = 1, z = 0},
    rotation = {x = 0, y = 0, z = 0},
    scale = {x = 1, y = 1, z = 1},
    -- optional light props (lights):
    -- color = {x = 1, y = 0.5, z = 0.2}, intensity = 2.5, enabled = true, range = 12,
    -- direction = {x = 0, y = -1, z = 0}, cutoff = 12.5, outerCutoff = 17.5,
    -- optional audio props:
    -- loop = false, volume = 1.0, autoPlay = true, ambient = false
})
```

Absent optional fields keep the current spawn defaults (white light intensity 1 / range 10; audio loop false, volume 1, autoPlay true).

### Engine.destroyEntity(instanceId)

Destroy a non-critical instance by instance id.

**Ownership (per-caller)**: The instance must be the caller's script `assetId`, or a spawn created by that same script via `Engine.spawnEntity`. Other scripts cannot destroy or mutate your spawns. Console/`eval` with no script entity may only affect console-owned spawns. Portals, volumes, and the player are always rejected. Unauthorized calls return `false` (and log a warning); they do not throw.

## External URL Functions

### Engine.openExternalUrl(url, callback)

Open an external URL in the browser (with user confirmation).

```lua
local success = Engine.openExternalUrl(
    "https://example.com",
    function(accepted)
        if accepted then
            print("User accepted opening URL")
        else
            print("User declined")
        end
    end
)
```

**Parameters**:
- `url` (string, required): URL to open
- `callback` (function, optional): Callback function(accepted)

**Returns**: `boolean` - `true` if modal opened

**Security**: User must confirm before URL is opened

**Example**:
```lua
function MyScript:on_interact(actorId)
    Engine.openExternalUrl(
        "https://example.com/help",
        function(accepted)
            if accepted then
                print("Opening help page")
            end
        end
    )
end
```

## API Availability

Always check for API availability before use:

```lua
if Engine and Engine.setEntityPosition then
    Engine.setEntityPosition(self.entity, x, y, z)
end
```

This prevents errors if the API is not available.

## Error Handling

Engine functions may fail silently or return error indicators:

- Check return values (booleans for success)
- Check response tables for error fields
- Handle nil returns gracefully
- Log errors for debugging

## Next Steps

- [localStorage API](/docs/luau/localstorage-api) - Persistent storage
- [Gamemode API](/docs/luau/gamemode-api) - Scene-wide scripting
- [Scene API](/docs/luau/scene-api) - Scene information
- [Examples](/docs/luau/examples) - See Engine API in action

