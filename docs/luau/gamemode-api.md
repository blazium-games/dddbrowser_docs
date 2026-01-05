---
sidebar_position: 5
---

# Gamemode API

The `Gamemode` API provides scene-wide scripting capabilities including state management, events, and save/load functionality.

## Overview

Gamemode scripts run at the scene level and provide:

- **State management**: Scene-wide persistent state
- **Event system**: Trigger and listen to custom events
- **Save/load**: Automatic state persistence
- **localStorage integration**: String values automatically persisted

## Gamemode Script Structure

Gamemode scripts must return a table with lifecycle methods:

```lua
local Gamemode = {}

function Gamemode:on_start()
    self.counter = 0
    self.initialized = true
end

function Gamemode:on_update(dt)
    self.counter = self.counter + 1
end

return Gamemode
```

## State Management

### Gamemode.getState(key)

Get a gamemode state value.

```lua
local counter = Gamemode.getState("counter")
if counter then
    local num = tonumber(counter) or 0
    print("Counter: " .. tostring(num))
end
```

**Parameters**:
- `key` (string, required): State key

**Returns**: Value (any type) or `nil` if not found

**Note**: String values are automatically persisted to localStorage.

**Example**:
```lua
function MyScript:on_update(dt)
    local score = Gamemode.getState("score")
    if score then
        self.displayScore = tonumber(score) or 0
    end
end
```

### Gamemode.setState(key, value)

Set a gamemode state value.

```lua
Gamemode.setState("counter", 42)
Gamemode.setState("playerName", "Alice")
Gamemode.setState("level", 5)
```

**Parameters**:
- `key` (string, required): State key
- `value` (any type): State value

**Returns**: None

**Persistence**: String values are automatically saved to localStorage.

**Example**:
```lua
function MyScript:on_start()
    -- Initialize state
    Gamemode.setState("score", 0)
    Gamemode.setState("level", 1)
    Gamemode.setState("playerName", "Player")
end

function MyScript:on_update(dt)
    -- Update state
    local currentScore = tonumber(Gamemode.getState("score")) or 0
    Gamemode.setState("score", tostring(currentScore + 1))
end
```

## Event System

### Gamemode.triggerEvent(eventName, data)

Trigger a custom event.

```lua
Gamemode.triggerEvent("playerDied", {reason = "fall"})
Gamemode.triggerEvent("levelComplete", {level = 5, score = 1000})
```

**Parameters**:
- `eventName` (string, required): Event identifier
- `data` (any type, optional): Event payload

**Returns**: None

**Use case**: Notify entity scripts of game events

**Example**:
```lua
function Gamemode:on_update(dt)
    self.counter = (self.counter or 0) + 1
    
    if self.counter % 100 == 0 then
        -- Trigger event every 100 updates
        Gamemode.triggerEvent("milestone", self.counter)
    end
end
```

### Gamemode.onEvent(eventName, callback)

Register an event handler.

```lua
Gamemode.onEvent("playerDied", function(data)
    print("Player died: " .. tostring(data.reason))
    -- Handle player death
end)
```

**Parameters**:
- `eventName` (string, required): Event identifier
- `callback` (function, required): Callback function(data)

**Returns**: None

**Use case**: Listen for events from gamemode or other scripts

**Example**:
```lua
function MyScript:on_start()
    -- Listen for gamemode events
    Gamemode.onEvent("levelComplete", function(data)
        if data and data.level then
            print("Level " .. tostring(data.level) .. " completed!")
        end
    end)
    
    Gamemode.onEvent("playerDied", function(data)
        print("Player died, resetting...")
        self.reset()
    end)
end
```

## Save/Load

### Gamemode.saveGame()

Request a manual save.

```lua
local success = Gamemode.saveGame()
if success then
    print("Game saved")
else
    print("Save failed")
end
```

**Parameters**: None

**Returns**: `boolean` - `true` if save was initiated

**Use case**: Trigger manual save from script

**Example**:
```lua
function MyScript:on_interact(actorId)
    -- Manual save on interaction
    local success = Gamemode.saveGame()
    if success then
        print("Game saved manually")
    end
end
```

## Gamemode Lifecycle

Gamemode scripts have the same lifecycle as entity scripts:

### on_start()

Called when gamemode loads.

```lua
function Gamemode:on_start()
    self.counter = 0
    -- Load from localStorage if available
    local saved = localStorage.get("counter")
    if saved then
        self.counter = tonumber(saved) or 0
    end
end
```

### on_update(dt)

Called every frame.

```lua
function Gamemode:on_update(dt)
    self.counter = (self.counter or 0) + 1
    -- Save to localStorage
    localStorage.set("counter", tostring(self.counter))
    
    -- Trigger event periodically
    if self.counter % 10 == 0 then
        Gamemode.triggerEvent("counter_updated", self.counter)
    end
end
```

### on_save()

Called when saving. Returns state to persist.

```lua
function Gamemode:on_save()
    return {
        counter = self.counter,
        level = self.level,
        score = self.score
    }
end
```

**Returns**: Table with save data (or nil to skip)

### on_load(state)

Called when loading. Receives previously saved state.

```lua
function Gamemode:on_load(state)
    if state then
        self.counter = state.counter or 0
        self.level = state.level or 1
        self.score = state.score or 0
    end
end
```

**Parameters**:
- `state` (table): Previously saved state

## Event Examples

### Entity Listening to Gamemode Events

```lua
local Entity = {}

function Entity:on_start()
    -- Listen for gamemode events
    Gamemode.onEvent("counter_updated", function(data)
        self.gamemodeCounter = data
        print("Gamemode counter: " .. tostring(data))
    end)
end

return Entity
```

### Gamemode Triggering Events

```lua
local Gamemode = {}

function Gamemode:on_update(dt)
    self.counter = (self.counter or 0) + 1
    
    if self.counter % 100 == 0 then
        Gamemode.triggerEvent("milestone", {
            count = self.counter,
            message = "Reached milestone!"
        })
    end
end

return Gamemode
```

## State Persistence

String values in gamemode state are automatically persisted:

```lua
-- This is automatically saved to localStorage
Gamemode.setState("playerName", "Alice")

-- This is also saved (converted to string)
Gamemode.setState("score", "1000")

-- Non-string values are not auto-persisted
Gamemode.setState("complexData", {x = 1, y = 2})  -- Not auto-saved
```

For complex data, use `on_save()` and `on_load()`:

```lua
function Gamemode:on_save()
    return {
        complexData = self.complexData,
        nested = {
            value = self.nestedValue
        }
    }
end

function Gamemode:on_load(state)
    if state and state.complexData then
        self.complexData = state.complexData
    end
end
```

## Best Practices

- **Use state for simple values**: String values are auto-persisted
- **Use events for communication**: Decouple gamemode and entity scripts
- **Save complex data in on_save**: Use on_save/on_load for complex structures
- **Initialize in on_start**: Set up initial state
- **Update in on_update**: Continuous state changes
- **Namespace event names**: Use prefixes (e.g., "game.levelComplete")

## Next Steps

- [Scene API](/docs/luau/scene-api) - Access scene information
- [Examples](/docs/luau/examples) - See gamemode examples
- [Best Practices](/docs/luau/best-practices) - Scripting guidelines

