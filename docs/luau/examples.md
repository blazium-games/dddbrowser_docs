---
sidebar_position: 7
---

# Script Examples

This page contains complete script examples from the `examples/assets/` directory, demonstrating various Lua/Luau API features.

## Ping-Pong Animation

Simple animation that moves an entity up and down.

```lua:examples/assets/pingpong.luau
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
    else
        self.last_offset = offset
    end
end

return PingPong
```

**Features demonstrated**:
- `on_start()` initialization
- `on_update(dt)` frame updates
- `Engine.setEntityPosition()` entity manipulation
- Frame-rate independent animation using delta time

## Gamemode Script

Scene-wide state management with events and persistence.

```lua:examples/assets/gamemode_test.luau
local GamemodeTable = {}

function GamemodeTable:on_start()
    self.counter = 0
    self.initialized = true
    -- Load from localStorage if available
    local saved = localStorage.get("counter")
    if saved then
        self.counter = tonumber(saved) or 0
    end
end

function GamemodeTable:on_update(dt)
    self.counter = (self.counter or 0) + 1
    -- Save to localStorage
    localStorage.set("counter", tostring(self.counter))
    
    -- Trigger event every 10 updates
    if self.counter % 10 == 0 then
        local api = Gamemode or self._GamemodeAPI
        if api and api.triggerEvent then
            api.triggerEvent("counter_updated", self.counter)
        end
    end
end

return GamemodeTable
```

**Features demonstrated**:
- Gamemode lifecycle
- `localStorage.get()` and `localStorage.set()` persistence
- `Gamemode.triggerEvent()` event system
- State management

## Entity Event Listener

Entity script that listens to gamemode events.

```lua:examples/assets/entity_listener.luau
local Entity = {}

function Entity:on_start()
    self.eventCount = 0
    self.lastEventData = nil
    
    -- Listen for events from gamemode
    local entitySelf = self
    Gamemode.onEvent("counter_updated", function(data)
        entitySelf.eventCount = entitySelf.eventCount + 1
        entitySelf.lastEventData = data
    end)
end

function Entity:on_update(dt)
    -- Entity can access gamemode state
    local counter = Gamemode.getState("counter")
    if counter then
        self.gamemodeCounter = tonumber(counter) or 0
    end
end

return Entity
```

**Features demonstrated**:
- `Gamemode.onEvent()` event listening
- `Gamemode.getState()` accessing gamemode state
- Entity-gamemode communication

## Audio Playback

Script that plays and stops audio on interaction.

```lua:examples/assets/audio_test.luau
local AudioTest = {}

function AudioTest:on_start()
    self.audioPlaying = false
    self.ambientPlaying = false
    self.loopingPlaying = false
    self.interactionCount = 0
end

function AudioTest:on_interact()
    self.interactionCount = self.interactionCount + 1
    
    if not self.audioPlaying then
        -- Play spatial audio at entity position
        if Engine and Engine.playAudio then
            local pos = {0, 0, 0}  -- Will use entity position
            local success = Engine.playAudio(
                "spatial-audio-" .. tostring(self.entity),
                "test-audio",
                pos,
                false,  -- not ambient (spatial)
                false,  -- not looping
                0.8     -- volume
            )
            
            if success then
                self.audioPlaying = true
                print("Started spatial audio playback")
            end
        end
    else
        -- Stop spatial audio
        if Engine and Engine.stopAudio then
            Engine.stopAudio("spatial-audio-" .. tostring(self.entity))
            self.audioPlaying = false
            print("Stopped spatial audio")
        end
    end
    
    -- Toggle ambient audio
    if not self.ambientPlaying then
        if Engine and Engine.playAudio then
            local pos = {0, 0, 0}
            local success = Engine.playAudio(
                "ambient-audio-" .. tostring(self.entity),
                "test-audio",
                pos,
                true,   -- ambient (constant volume)
                true,   -- looping
                0.5     -- volume
            )
            
            if success then
                self.ambientPlaying = true
                print("Started ambient looping audio")
            end
        end
    else
        if Engine and Engine.stopAudio then
            Engine.stopAudio("ambient-audio-" .. tostring(self.entity))
            self.ambientPlaying = false
            print("Stopped ambient audio")
        end
    end
end

return AudioTest
```

**Features demonstrated**:
- `Engine.playAudio()` spatial and ambient audio
- `Engine.stopAudio()` stopping playback
- Audio instance management
- Interaction-based audio control

## Textbox Interaction

Script that opens and closes textboxes with callbacks.

```lua:examples/assets/textbox_test.luau
local TextBoxTest = {}

function TextBoxTest:on_start()
    self.textboxOpen = false
    self.interactionCount = 0
end

function TextBoxTest:on_interact()
    self.interactionCount = self.interactionCount + 1
    
    if not self.textboxOpen then
        -- Open textbox with quest acceptance scenario
        local buttons = {"Accept Quest", "Decline"}
        local checkboxes = {
            ["Remember my choice"] = false,
            ["Show hints"] = true
        }
        
        if Engine and Engine.openTextBox then
            local success = Engine.openTextBox(
                "quest-textbox-" .. tostring(self.entity),
                "Quest: Find the Lost Artifact",
                "A mysterious artifact has been discovered. Will you help recover it?\n\nRewards:\n- 100 Gold\n- Rare Item\n- Experience Points",
                buttons,
                checkboxes
            )
            
            if success then
                self.textboxOpen = true
                print("Opened textbox for entity " .. tostring(self.entity))
            end
        end
    else
        -- Close textbox
        if Engine and Engine.closeTextBox then
            Engine.closeTextBox("quest-textbox-" .. tostring(self.entity))
            self.textboxOpen = false
            print("Closed textbox for entity " .. tostring(self.entity))
        end
    end
end

return TextBoxTest
```

**Features demonstrated**:
- `Engine.openTextBox()` with buttons and checkboxes
- `Engine.closeTextBox()` closing textboxes
- Interaction-based UI control

## URL Modal

Script that opens external URLs with user confirmation.

```lua:examples/assets/url_modal_test.luau
local UrlModalTest = {}

function UrlModalTest:on_start()
    self.modalOpen = false
    self.interactionCount = 0
    self.testUrls = {
        "https://www.example.com",
        "https://github.com",
        "https://blazium-engine.github.io"
    }
    self.currentUrlIndex = 1
end

function UrlModalTest:on_interact()
    self.interactionCount = self.interactionCount + 1
    
    if not self.modalOpen then
        -- Open external URL modal
        local url = self.testUrls[self.currentUrlIndex]
        if not url then
            self.currentUrlIndex = 1
            url = self.testUrls[1]
        end
        
        if Engine and Engine.openExternalUrl then
            local success = Engine.openExternalUrl(url)
            
            if success then
                self.modalOpen = true
                print("Opened URL modal for: " .. url)
                
                -- Cycle to next URL for next interaction
                self.currentUrlIndex = self.currentUrlIndex + 1
                if self.currentUrlIndex > #self.testUrls then
                    self.currentUrlIndex = 1
                end
            end
        end
    else
        -- Modal should close via user interaction (accept/decline)
        self.modalOpen = false
    end
end

return UrlModalTest
```

**Features demonstrated**:
- `Engine.openExternalUrl()` opening external URLs
- User confirmation modals
- URL cycling

## Combined Features

Script demonstrating multiple features together.

```lua:examples/assets/combined_features_test.luau
-- This script demonstrates multiple features working together
-- See the actual file for the complete implementation
```

**Features demonstrated**:
- Integration of multiple APIs
- Complex interaction patterns
- State management across features

## ImGui Textbox

Script using ImGui textboxes for lightweight UI.

```lua:examples/assets/imgui_textbox_test.luau
-- Demonstrates ImGui textbox usage
-- See the actual file for the complete implementation
```

**Features demonstrated**:
- `Engine.openImGuiTextBox()` lightweight UI
- `Engine.closeImGuiTextBox()` closing ImGui textboxes

## Next Steps

- [Best Practices](/docs/luau/best-practices) - Learn scripting guidelines
- [Engine API](/docs/luau/engine-api) - Complete API reference
- [Examples Directory](/docs/examples/intro) - See example scenes

