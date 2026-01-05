---
sidebar_position: 6
---

# Scene API

The `Scene` API provides access to scene metadata and allows scripts to travel between scenes.

## Overview

The `Scene` API provides:

- **Metadata access**: Scene information (name, author, rating, etc.)
- **World information**: World ID and position
- **Scene travel**: Programmatically load other scenes

## Metadata Functions

### Scene.getId()

Get the scene ID.

```lua
local sceneId = Scene.getId()
if sceneId then
    print("Scene ID: " .. sceneId)
end
```

**Returns**: `string` or `nil` if not available

### Scene.getName()

Get the scene name.

```lua
local sceneName = Scene.getName()
if sceneName then
    print("Scene: " .. sceneName)
end
```

**Returns**: `string` or `nil` if not available

### Scene.getDescription()

Get the scene description.

```lua
local description = Scene.getDescription()
if description then
    print("Description: " .. description)
end
```

**Returns**: `string` or `nil` if not available

### Scene.getAuthor()

Get the scene author.

```lua
local author = Scene.getAuthor()
if author then
    print("Author: " .. author)
end
```

**Returns**: `string` or `nil` if not available

### Scene.getRating()

Get the scene content rating.

```lua
local rating = Scene.getRating()
if rating then
    print("Rating: " .. rating)  -- "GENERAL", "MODERATE", or "ADULT"
end
```

**Returns**: `string` or `nil` if not available

Possible values: `"GENERAL"`, `"MODERATE"`, `"ADULT"`

### Scene.getThumbnail()

Get the thumbnail image URL.

```lua
local thumbnail = Scene.getThumbnail()
if thumbnail then
    print("Thumbnail: " .. thumbnail)
end
```

**Returns**: `string` or `nil` if not available

### Scene.getManifestUrl()

Get the manifest URL (if specified).

```lua
local manifestUrl = Scene.getManifestUrl()
if manifestUrl then
    print("Manifest: " .. manifestUrl)
end
```

**Returns**: `string` or `nil` if not available

## World Functions

### Scene.getWorldId()

Get the world ID.

```lua
local worldId = Scene.getWorldId()
if worldId then
    print("World ID: " .. worldId)
end
```

**Returns**: `string` or `nil` if not available

### Scene.getWorldPosition()

Get the world position as a comma-separated string.

```lua
local worldPos = Scene.getWorldPosition()
if worldPos then
    print("World position: " .. worldPos)  -- "x,y,z"
    -- Parse if needed
    local x, y, z = worldPos:match("([^,]+),([^,]+),([^,]+)")
end
```

**Returns**: `string` or `nil` if not available

**Format**: `"x,y,z"` (comma-separated coordinates)

## Travel Function

### Scene.TravelTo(url)

Travel to another scene.

```lua
local success, error = Scene.TravelTo("https://example.com/next-scene.html")
if success then
    print("Traveling to next scene...")
else
    print("Travel failed: " .. tostring(error))
end
```

**Parameters**:
- `url` (string, required): Scene URL to load

**Returns**: 
- `success` (boolean): `true` if travel was initiated
- `error` (string, optional): Error message if failed

**Use case**: Programmatically trigger scene travel

**Example**:
```lua
function MyScript:on_interact(actorId)
    -- Travel to next level
    local success, error = Scene.TravelTo("https://example.com/level2.html")
    if not success then
        print("Failed to travel: " .. tostring(error))
    end
end
```

## Complete Example

```lua
local SceneInfo = {}

function SceneInfo:on_start()
    -- Display scene information
    local name = Scene.getName()
    local author = Scene.getAuthor()
    local rating = Scene.getRating()
    local worldId = Scene.getWorldId()
    
    print("=== Scene Information ===")
    if name then print("Name: " .. name) end
    if author then print("Author: " .. author) end
    if rating then print("Rating: " .. rating) end
    if worldId then print("World: " .. worldId) end
    
    -- Check world position
    local worldPos = Scene.getWorldPosition()
    if worldPos then
        print("World Position: " .. worldPos)
    end
end

function SceneInfo:on_interact(actorId)
    -- Travel to hub scene
    Scene.TravelTo("https://example.com/hub.html")
end

return SceneInfo
```

## Best Practices

- **Check for nil**: Always check if metadata is available
- **Use for UI**: Display scene information to players
- **World organization**: Use world IDs to organize related scenes
- **Travel confirmation**: Consider confirming before traveling
- **Error handling**: Handle travel failures gracefully

## Next Steps

- [Engine API](/docs/luau/engine-api) - Access engine functionality
- [Gamemode API](/docs/luau/gamemode-api) - Scene-wide scripting
- [Examples](/docs/luau/examples) - See Scene API in action

