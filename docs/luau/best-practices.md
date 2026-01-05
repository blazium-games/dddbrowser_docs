---
sidebar_position: 8
---

# Script Best Practices

Follow these guidelines to write effective, performant, and maintainable scripts for DDDBrowser.

## Script Structure

### Always Return a Table

Scripts must return a table with lifecycle methods:

```lua
local MyScript = {}

function MyScript:on_start()
    -- Initialization
end

return MyScript
```

**Don't**:
```lua
-- Wrong: No return statement
local MyScript = {}
function MyScript:on_start()
end
```

### Use `self` for Instance Variables

Store instance-specific data in `self`:

```lua
function MyScript:on_start()
    self.counter = 0
    self.position = {x = 0, y = 0, z = 0}
end
```

**Don't** use module-level variables (they're shared across instances):
```lua
-- Wrong: Shared across all instances
local counter = 0

function MyScript:on_start()
    counter = counter + 1  -- All instances share this!
end
```

### Initialize in on_start

Set up all variables in `on_start`, not at module level:

```lua
function MyScript:on_start()
    self.time = 0
    self.speed = 1.0
    self.amplitude = 5.0
    
    -- Load initial data
    if self.data then
        self.speed = self.data.speed or self.speed
    end
end
```

## Performance

### Use Delta Time

Always use `dt` (delta time) for frame-rate independent updates:

```lua
function MyScript:on_update(dt)
    self.time = self.time + dt  -- Frame-rate independent
    local offset = math.sin(self.time) * 5
end
```

**Don't** assume fixed frame rate:
```lua
-- Wrong: Frame-rate dependent
function MyScript:on_update(dt)
    self.time = self.time + 1  -- Will vary with FPS!
end
```

### Keep Updates Fast

Avoid expensive operations in `on_update`:

```lua
-- Good: Cache expensive calculations
function MyScript:on_start()
    self.cachedValue = expensiveCalculation()
end

function MyScript:on_update(dt)
    -- Use cached value
    useValue(self.cachedValue)
end
```

### Limit Update Frequency

Only update when necessary:

```lua
function MyScript:on_update(dt)
    self.updateTimer = (self.updateTimer or 0) + dt
    
    -- Update every 0.1 seconds instead of every frame
    if self.updateTimer >= 0.1 then
        self.updateTimer = 0
        -- Do expensive update here
    end
end
```

## Error Handling

### Check API Availability

Always check if APIs exist before using them:

```lua
if Engine and Engine.setEntityPosition then
    Engine.setEntityPosition(self.entity, x, y, z)
end
```

### Handle Missing Values

Check for nil values:

```lua
local value = localStorage.get("key")
if value then
    self.data = value
else
    self.data = "default"
end
```

### Graceful Degradation

Provide fallbacks when features aren't available:

```lua
function MyScript:on_update(dt)
    if Engine and Engine.setEntityPosition then
        Engine.setEntityPosition(self.entity, x, y, z)
    else
        -- Fallback behavior
        self.lastPosition = {x = x, y = y, z = z}
    end
end
```

## State Management

### Save State Properly

Use `on_save()` to persist complex state:

```lua
function MyScript:on_save()
    return {
        counter = self.counter,
        position = self.position,
        state = self.state
    }
end
```

### Load State Properly

Restore state in `on_load()`:

```lua
function MyScript:on_load(state)
    if state then
        self.counter = state.counter or 0
        self.position = state.position or {x = 0, y = 0, z = 0}
    end
end
```

### Use localStorage for Simple Values

For simple string values, use localStorage:

```lua
-- Save
localStorage.set("playerName", "Alice")

-- Load
local name = localStorage.get("playerName")
```

## Event-Driven Architecture

### Use Events for Communication

Decouple scripts using events:

```lua
-- Gamemode triggers event
Gamemode.triggerEvent("playerDied", {reason = "fall"})

-- Entity listens
Gamemode.onEvent("playerDied", function(data)
    -- Handle player death
end)
```

### Namespace Event Names

Use prefixes to organize events:

```lua
-- Good: Namespaced
Gamemode.triggerEvent("game.levelComplete", data)
Gamemode.triggerEvent("player.died", data)

-- Avoid: Generic names
Gamemode.triggerEvent("event", data)
```

## Code Organization

### Keep Scripts Focused

Each script should have a single responsibility:

```lua
-- Good: Focused script
local Animation = {}
function Animation:on_update(dt)
    -- Only handles animation
end
```

### Modular Design

Break complex logic into functions:

```lua
local ComplexScript = {}

function ComplexScript:calculatePosition(time)
    return math.sin(time) * 5
end

function ComplexScript:on_update(dt)
    self.time = self.time + dt
    local pos = self:calculatePosition(self.time)
    Engine.setEntityPosition(self.entity, 0, pos, 0)
end
```

## Common Patterns

### Animation Pattern

```lua
local Animated = {}

function Animated:on_start()
    self.time = 0
    self.speed = 1.0
    self.amplitude = 5.0
end

function Animated:on_update(dt)
    self.time = self.time + dt
    local offset = math.sin(self.time * self.speed) * self.amplitude
    Engine.setEntityPosition(self.entity, 0, offset, 0)
end

return Animated
```

### Interaction Pattern

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

### State Persistence Pattern

```lua
local Persistent = {}

function Persistent:on_start()
    local saved = localStorage.get("counter")
    self.counter = tonumber(saved) or 0
end

function Persistent:on_update(dt)
    self.counter = self.counter + 1
    localStorage.set("counter", tostring(self.counter))
end

function Persistent:on_save()
    return {
        counter = self.counter
    }
end

function Persistent:on_load(state)
    if state and state.counter then
        self.counter = state.counter
    end
end

return Persistent
```

## Debugging

### Use print() for Debugging

Print statements help debug scripts:

```lua
function MyScript:on_start()
    print("Script started for entity " .. tostring(self.entity))
end

function MyScript:on_update(dt)
    if self.debug then
        print("Time: " .. tostring(self.time))
    end
end
```

### Enable Script Tracing

Set environment variable for detailed logging:

```bash
DDDBROWSER_SCRIPT_TRACE=1
```

This enables detailed method call logging.

## Security

### Validate Input

Always validate user input and external data:

```lua
function MyScript:on_interact(actorId)
    if actorId and actorId == 0 then
        -- Only allow player interactions
    end
end
```

### Don't Trust External Data

Validate data from HTTP requests:

```lua
local response = Engine.httpRequest({url = "https://api.example.com/data"})
if response.success then
    local data = response.body
    -- Validate data before using
    if isValid(data) then
        useData(data)
    end
end
```

## Next Steps

- [Script Examples](/docs/luau/examples) - See these patterns in action
- [Engine API](/docs/luau/engine-api) - Complete API reference
- [Troubleshooting](/docs/troubleshooting) - Fix common issues

