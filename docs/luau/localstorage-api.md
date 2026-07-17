---
sidebar_position: 4
---

# localStorage API

The `localStorage` API provides persistent key-value storage that survives between scene loads. Data is stored per scene (based on the base URL).

## Overview

`localStorage` provides:

- **Persistent storage**: Data survives scene reloads
- **Per-scene storage**: Each scene has its own storage
- **Simple key-value**: String keys and string values
- **Automatic persistence**: Data is saved automatically

## Storage Location

Data is stored in:
- **Location**: `%LOCALAPPDATA%\DDDBrowser\cache\<md5-hash>\localStorage.json`
- **Key**: MD5 hash of the base URL (scheme://host[:port])
- **Scope**: All scenes from the same base URL share storage

## Quotas

| Limit | Value |
|-------|-------|
| Key size | **256 bytes** |
| Value size | **64 KiB** |
| Total payload | **1 MiB** |
| Entry count | **512** |
| On-disk file gate | **2 MiB** (before parse) |

Writes that exceed these limits fail (return `false` / no-op).

## API Functions

### localStorage.get(key)

Get a stored value.

```lua
local value = localStorage.get("playerName")
if value then
    print("Player name: " .. value)
else
    print("No player name stored")
end
```

**Parameters**:
- `key` (string, required): Storage key

**Returns**: `string` or `nil` if not found

**Example**:
```lua
function MyScript:on_start()
    local savedCounter = localStorage.get("counter")
    if savedCounter then
        self.counter = tonumber(savedCounter) or 0
    else
        self.counter = 0
    end
end
```

### localStorage.set(key, value)

Store a value.

```lua
local success = localStorage.set("playerName", "Alice")
if success then
    print("Saved player name")
end
```

**Parameters**:
- `key` (string, required): Storage key
- `value` (string, required): Value to store

**Returns**: `boolean` - `true` if saved successfully

**Note**: Only strings can be stored. Convert numbers/booleans to strings.

**Example**:
```lua
function MyScript:on_update(dt)
    self.counter = (self.counter or 0) + 1
    localStorage.set("counter", tostring(self.counter))
end
```

### localStorage.remove(key)

Remove a stored value.

```lua
local success = localStorage.remove("playerName")
if success then
    print("Removed player name")
end
```

**Parameters**:
- `key` (string, required): Storage key

**Returns**: `boolean` - `true` if removed successfully

**Example**:
```lua
function MyScript:on_interact(actorId)
    -- Clear saved progress
    localStorage.remove("progress")
    localStorage.remove("checkpoint")
end
```

### localStorage.clear()

Clear all stored values.

```lua
local success = localStorage.clear()
if success then
    print("Cleared all storage")
end
```

**Parameters**: None

**Returns**: `boolean` - `true` if cleared successfully

**Warning**: This removes ALL data for the current scene's base URL.

**Example**:
```lua
function MyScript:on_interact(actorId)
    -- Reset all saved data
    localStorage.clear()
    print("All saved data cleared")
end
```

### localStorage.getAll()

Get all stored key-value pairs.

```lua
local allData = localStorage.getAll()
for key, value in pairs(allData) do
    print(key .. " = " .. value)
end
```

**Parameters**: None

**Returns**: `table` - Mapping of keys to values

**Example**:
```lua
function MyScript:on_start()
    local allData = localStorage.getAll()
    print("Stored data:")
    for key, value in pairs(allData) do
        print("  " .. key .. ": " .. value)
    end
end
```

## Data Types

`localStorage` only stores strings. To store other types:

### Numbers

```lua
-- Store
localStorage.set("counter", tostring(42))

-- Retrieve
local value = localStorage.get("counter")
local number = tonumber(value) or 0
```

### Booleans

```lua
-- Store
localStorage.set("enabled", tostring(true))

-- Retrieve
local value = localStorage.get("enabled")
local enabled = (value == "true")
```

### Tables/Objects

Convert to JSON string (if you have a JSON library) or use a simple format:

```lua
-- Store (simple format)
localStorage.set("position", "10,20,30")

-- Retrieve
local value = localStorage.get("position")
local x, y, z = value:match("([^,]+),([^,]+),([^,]+)")
```

## Use Cases

### Save Game Progress

```lua
function MyScript:on_save()
    -- Save to localStorage for persistence
    localStorage.set("level", tostring(self.level))
    localStorage.set("score", tostring(self.score))
    localStorage.set("checkpoint", tostring(self.checkpoint))
    
    return {
        level = self.level,
        score = self.score
    }
end
```

### Player Preferences

```lua
function MyScript:on_start()
    -- Load preferences
    local difficulty = localStorage.get("difficulty")
    if difficulty then
        self.difficulty = difficulty
    else
        self.difficulty = "normal"
    end
end

function MyScript:on_interact(actorId)
    -- Save preference
    localStorage.set("difficulty", "hard")
end
```

### Persistent State

```lua
function MyScript:on_start()
    -- Load persistent counter
    local saved = localStorage.get("visitCount")
    self.visitCount = tonumber(saved) or 0
    self.visitCount = self.visitCount + 1
    localStorage.set("visitCount", tostring(self.visitCount))
end
```

## Best Practices

- **Convert types**: Always convert numbers/booleans to/from strings
- **Check for nil**: Handle missing values gracefully
- **Use descriptive keys**: Make keys clear and unique
- **Namespace keys**: Use prefixes to organize (e.g., "player.name", "game.score")
- **Don't store sensitive data**: localStorage is not encrypted
- **Handle errors**: Check return values

## Limitations

- **String values only**: Must convert other types
- **Per-scene storage**: Scenes from different URLs have separate storage
- **Size limits**: Large amounts of data may be slow
- **No expiration**: Data persists until explicitly removed
- **No encryption**: Data is stored in plain text

## Next Steps

- [Gamemode API](/docs/luau/gamemode-api) - Scene-wide state management
- [Examples](/docs/luau/examples) - See localStorage in action
- [Best Practices](/docs/luau/best-practices) - Scripting guidelines

