---
sidebar_position: 3
---

# Engine API

The `Engine` API provides access to core engine functionality including input, networking, entity manipulation, UI, and audio.

## Overview

The `Engine` table is available in all scripts and provides functions for:

- Input state queries
- Entity manipulation (position, scale, rotation)
- HTTP requests
- UI (textboxes, modals)
- Audio playback

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
- `action` (string): Action name
  - `"move_forward"` - Move forward
  - `"move_backward"` - Move backward
  - `"move_left"` - Move left
  - `"move_right"` - Move right
  - `"interact"` - Interact button held

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

### Engine.setEntityPosition(entityId, x, y, z)

Set the position of an entity.

```lua
Engine.setEntityPosition(self.entity, 0, 5, 0)
```

**Parameters**:
- `entityId` (number): Entity ID (use `self.entity` for current entity)
- `x` (number): X coordinate
- `y` (number): Y coordinate
- `z` (number): Z coordinate

**Returns**: None

**Example**:
```lua
function MyScript:on_update(dt)
    self.time = self.time + dt
    local y = math.sin(self.time) * 5
    Engine.setEntityPosition(self.entity, 0, y, 0)
end
```

### Engine.setEntityScale(entityId, x, y, z)

Set the scale of an entity.

```lua
Engine.setEntityScale(self.entity, 2.0, 2.0, 2.0)
```

**Parameters**:
- `entityId` (number): Entity ID
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

### Engine.setEntityRotation(entityId, x, y, z)

Set the rotation of an entity (Euler angles in degrees).

```lua
Engine.setEntityRotation(self.entity, 0, 45, 0)
```

**Parameters**:
- `entityId` (number): Entity ID
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

## Networking

### Engine.httpRequest(options)

Make an HTTPS GET request.

```lua
local response = Engine.httpRequest({
    url = "https://api.example.com/data",
    method = "GET"
})

if response.success then
    print("Status: " .. tostring(response.status))
    print("Body: " .. response.body)
else
    print("Error: " .. tostring(response.error))
end
```

**Parameters**: `options` (table) with:
- `url` (string, required): HTTPS URL
- `method` (string, optional): HTTP method (only "GET" is supported)
- `body` (string, optional): Request body (not used for GET)

**Returns**: `table` with:
- `success` (boolean): Whether request succeeded
- `status` (number): HTTP status code
- `body` (string): Response body
- `elapsedSeconds` (number): Request duration
- `error` (string, optional): Error message if failed

**Restrictions**:
- Only HTTPS URLs are allowed
- Only GET method is supported
- Host allowlist may be enforced (if configured)
- Response size is limited (default: 1MB)

**Example**:
```lua
function MyScript:on_interact(actorId)
    local response = Engine.httpRequest({
        url = "https://api.example.com/status"
    })
    
    if response.success then
        local data = response.body
        -- Process response data
    else
        print("Request failed: " .. tostring(response.error))
    end
end
```

## UI Functions

### Engine.openTextBox(instanceId, title, text, buttons, checkboxes, callback)

Open a textbox modal.

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

