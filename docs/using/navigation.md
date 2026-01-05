---
sidebar_position: 1
---

# Navigation & Controls

DDDBrowser provides first-person navigation controls for exploring 3D scenes. The exact controls depend on the scene's `gameType` setting.

## Movement Controls

### Basic Movement (FPS gameType)

When a scene has `"gameType": "FPS"`, you can move using:

- **W**: Move forward
- **S**: Move backward
- **A**: Move left (strafe)
- **D**: Move right (strafe)
- **Mouse**: Look around (first-person camera)
- **Space**: Jump
- **Shift**: Sprint (hold to run faster)
- **Ctrl**: Crouch (hold to crouch)
- **Z**: Prone (hold to go prone)
- **Alt**: Slow move (hold to move slowly)

### View-Only Mode (NONE gameType)

When a scene has `"gameType": "NONE"`, player movement is disabled. You can still:
- Look around with the mouse
- Interact with objects (if scripts allow)

## Interaction Controls

- **E or F**: Interact with objects
  - Triggers `on_interact` callbacks in scripts
  - Used for portals, interactive objects, etc.
- **Enter**: Confirm interaction (for menus, dialogs)
- **F**: Special interaction (context-dependent)

## Available Input Actions

DDDBrowser supports many input actions that can be bound to keys:

### Movement Actions
- `MoveForward` - Move forward
- `MoveBackward` - Move backward
- `MoveLeft` - Strafe left
- `MoveRight` - Strafe right
- `Jump` - Jump
- `Sprint` - Sprint
- `Crouch` - Crouch
- `Prone` - Go prone
- `SlowMove` - Move slowly

### Interaction Actions
- `Interact` - Generic interact/use
- `ConfirmInteract` - Confirm/talk/menu-style interact
- `SpecialInteract` - Special interaction (F key)

### Combat Actions
- `PrimaryAttack` - Primary attack
- `Block` - Block/defend
- `Reload` - Reload weapon
- `ThrowItem` - Throw item
- `MeleeAttack` - Melee attack
- `DropItem` - Drop item

### Slot Actions
- `Slot1` through `Slot9` - Quick slots 1-9
- `Slot0` - Quick slot 0

### System Actions
- `TerminalToggle` - Toggle terminal/console
- `FullscreenToggle` - Toggle fullscreen (Alt+Enter)

## Default Keybindings

The default keybindings are:

| Action | Default Key |
|--------|-------------|
| Move Forward | W |
| Move Backward | S |
| Move Left | A |
| Move Right | D |
| Jump | Space |
| Sprint | Shift |
| Crouch | Ctrl |
| Prone | Z |
| Interact | E |
| Confirm Interact | Enter |
| Special Interact | F |

## Customizing Keybindings

You can customize keybindings in the Settings menu:

1. Open Settings (from the menu system)
2. Go to the Keybindings tab
3. Click on an action to rebind it
4. Press the key(s) you want to use
5. Save your changes

Keybindings support:
- **Modifier keys**: Shift, Ctrl, Alt
- **Mouse buttons**: Left click, Right click
- **Multiple bindings**: One action can have multiple key combinations

Keybindings are saved to `%LOCALAPPDATA%\DDDBrowser\keybindings.json`.

## Camera Controls

The camera is controlled by mouse movement:

- **Mouse movement**: Rotate view (first-person)
- **Mouse sensitivity**: Controlled by your system mouse settings

The camera follows standard first-person shooter conventions:
- Mouse up: Look up
- Mouse down: Look down
- Mouse left: Turn left
- Mouse right: Turn right

## Interaction System

When you press the Interact key (E or F), DDDBrowser:

1. Performs a **raycast** from the camera forward
2. Checks for **interactive objects** within range
3. Calls the `on_interact` method on matching script components

Interactive objects are determined by:
- Script components attached to instances
- The bounding radius of the entity
- The distance from the camera

Scripts can use `Engine.consumeAction("interact")` to prevent multiple triggers from a single interaction.

## Next Steps

- [Loading Scenes](/docs/using/loading-scenes) - Learn how to load scenes
- [Scene Features](/docs/using/scene-features) - Understand what scenes can do
- [Customize Keybindings](/docs/settings/keybindings) - Set up your controls

