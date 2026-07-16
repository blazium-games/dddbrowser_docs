---
sidebar_position: 2
---

# Keybindings

DDDBrowser allows you to customize all input controls. This guide explains how to rebind keys and configure your preferred control scheme.

## Accessing Keybindings

To customize keybindings:

1. Open Settings (from the menu system)
2. Go to the **Keybindings** tab
3. You'll see a list of all available actions and their current bindings

## Rebinding Keys

To change a keybinding:

1. **Click on an action** in the list
2. **Press the key(s)** you want to bind
   - Can be a single key
   - Can include modifiers (Shift, Ctrl, Alt)
   - Can be a mouse button (Left, Right)
3. **The binding updates** immediately
4. **Save your changes** (changes are saved automatically)

### Modifier Keys

You can combine keys with modifiers:

- **Shift + Key**: Hold Shift and press the key
- **Ctrl + Key**: Hold Ctrl and press the key
- **Alt + Key**: Hold Alt and press the key
- **Multiple modifiers**: Can combine Shift+Ctrl+Key, etc.

### Mouse Buttons

You can bind actions to mouse buttons:

- **Left Mouse Button**: Click left mouse button
- **Right Mouse Button**: Click right mouse button
- **Mouse + Modifiers**: Can combine mouse buttons with modifiers

### Multiple Bindings

Each action can have multiple keybindings:

- **Primary binding**: The main key for the action
- **Secondary bindings**: Additional keys that trigger the same action
- **Use case**: Support both WASD and arrow keys, or multiple input methods

## Available Actions

### Movement Actions

| Action | Default | Description |
|--------|---------|-------------|
| `MoveForward` | W | Move forward |
| `MoveBackward` | S | Move backward |
| `MoveLeft` | A | Strafe left |
| `MoveRight` | D | Strafe right |
| `Jump` | Space | Jump |
| `Sprint` | Shift | Sprint (hold) |
| `Crouch` | Ctrl | Crouch (hold) |
| `Prone` | Z | Go prone (hold) |
| `SlowMove` | Alt | Move slowly (hold) |

### Interaction Actions

| Action | Default | Description |
|--------|---------|-------------|
| `Interact` | E | Interact / script `on_interact` |
| `ConfirmInteract` | Enter | Confirm/talk/menu interact (`on_interact`) |
| `SpecialInteract` | F | Special interact (same `on_interact` path) |

### Reserved (no browser gameplay)

Combat/slot actions (`PrimaryAttack`, `Block`, `Reload`, `ThrowItem`, `MeleeAttack`, `DropItem`, `Slot0`–`Slot9`, weapon modes) may appear in the keybindings list but are not wired to gameplay systems in DDDBrowser.

### System Actions

| Action | Default | Description |
|--------|---------|-------------|
| `TerminalToggle` | (unbound) | Toggle terminal console (Luau when Active) |
| `FullscreenToggle` | Alt+Enter | Toggle fullscreen |

## Keybindings Storage

Keybindings are stored in:

**Location**: `%LOCALAPPDATA%\DDDBrowser\keybindings.json`

**Format**: JSON file mapping actions to keybindings:

```json
{
  "MoveForward": [
    {
      "scancode": 26,
      "shift": false,
      "ctrl": false,
      "alt": false,
      "mouseLeft": false,
      "mouseRight": false
    }
  ],
  "Interact": [
    {
      "scancode": 8,
      "shift": false,
      "ctrl": false,
      "alt": false,
      "mouseLeft": false,
      "mouseRight": false
    }
  ]
}
```

**Persistence**: Keybindings are saved automatically when changed.

## Default Keybindings Reference

Here are the default keybindings for quick reference:

| Key | Action |
|-----|--------|
| W | Move Forward |
| S | Move Backward |
| A | Move Left |
| D | Move Right |
| Space | Jump |
| Shift | Sprint |
| Ctrl | Crouch |
| Z | Prone |
| Alt | Slow Move |
| E | Interact |
| Enter | Confirm Interact |
| F | Special Interact |
| 1-9 | Slots 1-9 |
| 0 | Slot 0 |
| Alt+Enter | Fullscreen Toggle |

## Best Practices

### Ergonomic Layouts

- **WASD**: Standard for first-person games
- **Arrow Keys**: Alternative for movement
- **Mouse Buttons**: Good for frequent actions
- **Modifiers**: Use for less common actions

### Avoiding Conflicts

- Don't bind the same key to multiple actions
- Reserve modifier combinations for special actions
- Test your bindings to ensure they work as expected

### Accessibility

- Consider users who may need different layouts
- Support both left and right-handed configurations
- Provide alternative bindings for common actions

## Resetting Keybindings

To reset keybindings to defaults:

1. Close DDDBrowser
2. Delete or rename `keybindings.json`
3. Restart DDDBrowser
4. Default keybindings will be created automatically

## Troubleshooting

### Key Not Working

- Verify the keybinding is saved correctly
- Check for conflicts with other actions
- Ensure the action is supported in the current scene
- Try rebinding to a different key

### Binding Not Saving

- Verify write permissions in `%LOCALAPPDATA%\DDDBrowser\`
- Check disk space
- Look for error messages in the application log

### Modifier Keys Not Working

- Ensure you're pressing modifiers before the main key
- Check system keyboard settings
- Try a different modifier combination

## Next Steps

- [Navigation](/docs/using/navigation) - Learn how controls work
- [Application Settings](/docs/settings/application-settings) - Configure other settings
- [Troubleshooting](/docs/troubleshooting) - Fix issues

