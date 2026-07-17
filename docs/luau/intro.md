---
sidebar_position: 1
---

# Lua/Luau Scripting Overview

DDDBrowser supports scripting with **Luau**, a fast, gradually-typed scripting language derived from Lua 5.1. Scripts enable interactive behaviors, animations, game logic, and dynamic content in scenes.

## What is Luau?

Luau is a scripting language that:

- Is **Lua 5.1 compatible** - Familiar syntax for Lua developers
- Has **gradual typing** - Optional type annotations
- Is **fast** - Optimized for performance
- Is **safe** - Sandboxed execution environment

Scripts in DDDBrowser are executed in a secure sandbox with access to engine APIs.

### Sandbox restrictions

The following Lua globals are **removed** (set to `nil`) before scripts run:

- `os`, `io`, `debug`, `package`, `buffer`
- `require`, `dofile`, `loadfile`, `load`, `loadstring`

Use `Engine`, `Scene`, `Gamemode`, and `localStorage` instead of OS/filesystem APIs. There is no `os.time()` — persist only your own script fields in `on_save`.

## Entity Scripts vs Gamemode Scripts

DDDBrowser supports two types of scripts:

### Entity Scripts

- **Attached to**: Individual instances in the scene
- **Scope**: Per-instance behavior
- **Lifecycle**: `on_start`, `on_update`, `on_interact`, etc.
- **Access**: Entity ID, asset ID, position, scale, rotation
- **Use cases**: Object behaviors, animations, interactions

### Gamemode Scripts

- **Scope**: Scene-wide logic
- **Lifecycle**: `on_start`, `on_update`, `on_save`, `on_load`
- **Features**: State management, events, persistence
- **Use cases**: Game rules, global state, scene-wide logic

## Script Structure

All scripts must return a table (object) with lifecycle methods:

```lua
local MyScript = {}

function MyScript:on_start()
    -- Initialization code
    self.value = 0
end

function MyScript:on_update(dt)
    -- Update code (called every frame)
    self.value = self.value + dt
end

return MyScript
```

**Key points**:
- Script must return a table
- Use `self` for instance variables
- Methods use colon syntax (`:`)
- Lifecycle methods are optional

## Environment Variables

Scripts have access to these built-in variables:

### Entity Scripts

- **`entity`** (number): Unique entity ID
- **`asset_id`** (string): Asset ID of the instance

### All Scripts

- **`Engine`** (table): Engine API (see [Engine API](/docs/luau/engine-api))
- **`localStorage`** (table): Persistent storage (see [localStorage API](/docs/luau/localstorage-api))
- **`Gamemode`** (table): Gamemode API (see [Gamemode API](/docs/luau/gamemode-api))
- **`Scene`** (table): Scene API (see [Scene API](/docs/luau/scene-api))

## Script Lifecycle

Scripts follow a lifecycle:

1. **Load**: Script file is loaded and compiled
2. **on_start**: Called once when script is initialized
3. **on_update**: Called every frame (if defined)
4. **on_interact**: Called when player interacts (entity scripts)
5. **on_save**: Called when scene state is saved (optional)
6. **on_load**: Called when scene state is loaded (optional)
7. **on_shutdown**: Called when script is unloaded

See [Script Lifecycle](/docs/luau/lifecycle) for details.

## Script Attachment

Scripts are attached to instances in the scene JSON:

```json
{
  "id": "animated-object",
  "asset": "my-model",
  "position": {"x": 0.0, "y": 0.0, "z": 0.0},
  "rotation": {"x": 0.0, "y": 0.0, "z": 0.0},
  "scale": {"x": 1.0, "y": 1.0, "z": 1.0},
  "script": {
    "file": "animation-script",
    "data": {
      "speed": 2.0
    }
  }
}
```

**Script properties**:
- `file` (string): Asset ID of the script
- `data` (object, optional): Initial data passed to script

The `data` object is available in the script as `self.data` or via the script's environment.

## Gamemode Scripts

Gamemode scripts are defined at the scene level:

```json
{
  "gamemode": {
    "file": "gamemode-script"
  }
}
```

Gamemode scripts have access to:
- Scene-wide state management
- Event system
- Save/load functionality
- localStorage for persistence

## Example Script

Here's a simple ping-pong animation script:

```lua
local PingPong = {}

function PingPong:on_start()
    self.time = 0
    self.amplitude = 10
    self.speed = 0.5
end

function PingPong:on_update(dt)
    self.time = self.time + dt
    local offset = math.sin(self.time * self.speed) * self.amplitude
    if Engine and Engine.setEntityPosition then
        Engine.setEntityPosition(self.entity, 0, offset, 0)
    end
end

return PingPong
```

This script:
- Initializes animation parameters in `on_start`
- Updates position every frame in `on_update`
- Uses `Engine.setEntityPosition` to move the entity
- Uses `self.entity` to reference the entity ID

## Security and Sandboxing

Scripts run in a secure sandbox:

- **No file system access**: Cannot read/write files
- **No network access**: Cannot make arbitrary network requests (only via Engine.httpRequest)
- **No OS access**: Cannot execute system commands
- **HTTPS only**: Network requests must use HTTPS
- **Host allowlist**: Optional host restrictions for network requests

## Error Handling

If a script encounters an error:

- The error is logged
- The script is **disabled** (no further calls)
- Other scripts continue to run
- The scene continues to function

Always check for API availability:

```lua
if Engine and Engine.setEntityPosition then
    Engine.setEntityPosition(self.entity, x, y, z)
end
```

## Performance

Scripts are executed every frame, so:

- **Keep updates fast**: Avoid expensive operations in `on_update`
- **Use delta time**: Use `dt` for frame-rate independent updates
- **Cache values**: Store frequently accessed values
- **Limit updates**: Only update when necessary

## Next Steps

- [Script Lifecycle](/docs/luau/lifecycle) - Learn about lifecycle methods
- [Engine API](/docs/luau/engine-api) - Access engine functionality
- [Gamemode API](/docs/luau/gamemode-api) - Scene-wide scripting
- [Examples](/docs/luau/examples) - See example scripts

