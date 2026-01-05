---
sidebar_position: 2
---

# Script Lifecycle

Scripts in DDDBrowser follow a well-defined lifecycle. Understanding this lifecycle is essential for writing effective scripts.

## Lifecycle Overview

The script lifecycle consists of these stages:

1. **Load** - Script file is loaded and compiled
2. **Initialize** - Script instance is created
3. **on_start** - Called once for initialization
4. **on_update** - Called every frame (if defined)
5. **on_interact** - Called when player interacts (entity scripts)
6. **on_save** - Called when scene state is saved (optional)
7. **on_load** - Called when scene state is loaded (optional)
8. **on_shutdown** - Called when script is unloaded

## Lifecycle Methods

### on_start()

Called once when the script is first initialized.

```lua
function MyScript:on_start()
    -- Initialize variables
    self.counter = 0
    self.position = {x = 0, y = 0, z = 0}
    
    -- Load initial data if provided
    if self.data then
        self.speed = self.data.speed or 1.0
    end
end
```

**When**: Once, immediately after script is attached
**Parameters**: None
**Use for**: 
- Initializing variables
- Setting up initial state
- Reading script data
- One-time setup

**Example**:
```lua
local Entity = {}

function Entity:on_start()
    self.interactionCount = 0
    self.lastInteraction = nil
    
    -- Access entity information
    print("Entity " .. tostring(self.entity) .. " started")
    print("Asset ID: " .. tostring(self.asset_id))
end

return Entity
```

### on_update(dt)

Called every frame while the scene is active.

```lua
function MyScript:on_update(dt)
    -- Update logic here
    self.time = self.time + dt
    self.counter = self.counter + 1
end
```

**When**: Every frame (typically 60 times per second)
**Parameters**: 
- `dt` (number): Delta time in seconds since last frame
**Use for**:
- Continuous updates
- Animations
- Timers
- State changes over time

**Important**: 
- Use `dt` for frame-rate independent updates
- Keep updates fast (avoid expensive operations)
- Scripts that take too long may be throttled

**Example**:
```lua
local Animated = {}

function Animated:on_start()
    self.time = 0
    self.amplitude = 5.0
    self.speed = 2.0
end

function Animated:on_update(dt)
    self.time = self.time + dt
    local offset = math.sin(self.time * self.speed) * self.amplitude
    
    if Engine and Engine.setEntityPosition then
        Engine.setEntityPosition(self.entity, 0, offset, 0)
    end
end

return Animated
```

### on_interact(actorId)

Called when the player interacts with the entity (entity scripts only).

```lua
function MyScript:on_interact(actorId)
    -- Handle interaction
    self.interactionCount = self.interactionCount + 1
    print("Interacted by actor " .. tostring(actorId))
end
```

**When**: Player presses interact key (E) while looking at the entity
**Parameters**:
- `actorId` (number): ID of the actor interacting (usually 0 for player)
**Use for**:
- Interaction handling
- Opening dialogs
- Triggering events
- Activating objects

**Example**:
```lua
local Interactive = {}

function Interactive:on_start()
    self.interactionCount = 0
end

function Interactive:on_interact(actorId)
    self.interactionCount = self.interactionCount + 1
    
    if Engine and Engine.openTextBox then
        Engine.openTextBox(
            "interaction-" .. tostring(self.entity),
            "Interaction",
            "You've interacted " .. self.interactionCount .. " times!",
            {"OK"}
        )
    end
end

return Interactive
```

### on_shutdown()

Called when the script is being unloaded.

```lua
function MyScript:on_shutdown()
    -- Cleanup code
    if self.timer then
        -- Stop timers, close connections, etc.
    end
end
```

**When**: Scene is unloaded or script is detached
**Parameters**: None
**Use for**:
- Cleanup
- Stopping timers
- Releasing resources
- Final state updates

**Example**:
```lua
local Managed = {}

function Managed:on_start()
    self.active = true
end

function Managed:on_shutdown()
    self.active = false
    print("Script shutting down, cleaning up...")
end

return Managed
```

### on_save()

Called when the scene state is being saved. Returns save data.

```lua
function MyScript:on_save()
    return {
        counter = self.counter,
        position = self.position,
        state = self.state
    }
end
```

**When**: Scene state is saved (manual or autosave)
**Parameters**: None
**Returns**: Table with save data (or nil to skip saving)
**Use for**:
- Persisting script state
- Saving game progress
- Storing custom data

**Example**:
```lua
local Persistent = {}

function Persistent:on_start()
    self.counter = 0
    self.lastSave = nil
end

function Persistent:on_update(dt)
    self.counter = self.counter + 1
end

function Persistent:on_save()
    return {
        counter = self.counter,
        timestamp = os.time()
    }
end

return Persistent
```

### on_load(state)

Called when the scene state is being loaded. Receives previously saved state.

```lua
function MyScript:on_load(state)
    if state then
        self.counter = state.counter or 0
        self.position = state.position or {x = 0, y = 0, z = 0}
    end
end
```

**When**: Scene state is loaded (on scene load or after save)
**Parameters**:
- `state` (table): Previously saved state (or nil if no save data)
**Use for**:
- Restoring script state
- Loading game progress
- Resuming from saved state

**Example**:
```lua
local Restorable = {}

function Restorable:on_start()
    self.counter = 0
end

function Restorable:on_load(state)
    if state and state.counter then
        self.counter = state.counter
        print("Restored counter: " .. tostring(self.counter))
    end
end

function Restorable:on_save()
    return {
        counter = self.counter
    }
end

return Restorable
```

## Gamemode Lifecycle

Gamemode scripts have the same lifecycle methods but different context:

- **Scope**: Scene-wide (not per-entity)
- **State**: Shared across all entities
- **Events**: Can trigger and listen to events
- **Persistence**: State is saved/loaded automatically

See [Gamemode API](/docs/luau/gamemode-api) for details.

## Script Data

Scripts can receive initial data from the scene JSON:

```json
"script": {
  "file": "my-script",
  "data": {
    "speed": 2.0,
    "amplitude": 10.0
  }
}
```

Access in script:

```lua
function MyScript:on_start()
    if self.data then
        self.speed = self.data.speed or 1.0
        self.amplitude = self.data.amplitude or 5.0
    end
end
```

## Lifecycle Best Practices

- **Initialize in on_start**: Set up all variables here
- **Use on_update for animations**: Frame-by-frame updates
- **Handle interactions in on_interact**: User input handling
- **Save state in on_save**: Return data to persist
- **Restore state in on_load**: Load previously saved data
- **Clean up in on_shutdown**: Release resources

## Next Steps

- [Engine API](/docs/luau/engine-api) - Access engine functionality
- [Gamemode API](/docs/luau/gamemode-api) - Scene-wide scripting
- [Examples](/docs/luau/examples) - See lifecycle in action

