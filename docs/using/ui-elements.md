---
sidebar_position: 3
---

# UI Elements

DDDBrowser provides a minimal, unobtrusive user interface that stays out of your way while exploring 3D scenes. This guide explains all the UI elements available.

## Top Bar

The top bar is always visible and provides essential controls:

### URL Input Field

- **Purpose**: Enter scene URLs to load
- **Location**: Left side of top bar
- **Usage**: Type a URL and press Enter or click Load
- **Requirements**: Prefer HTTPS; plain HTTP prompts for **Allow HTTP**

### Load Button

- **Purpose**: Start loading the scene from the URL input
- **Location**: Next to URL input field
- **Usage**: Click to begin loading
- **Keyboard**: Press Enter while URL input is focused

### Progress Indicator

- **Purpose**: Shows loading progress
- **Location**: Center of top bar
- **Displays**:
  - Scene definition / load stage
  - Asset download progress
  - Processing status
- **States**: Idle, Loading, Complete, Error

### Leave Instance Button

- **Purpose**: Unload current scene and return to idle state
- **Location**: Right side of top bar
- **Usage**: Click to leave the current scene
- **Effect**: Returns to default grid view, unloads all assets

## Settings Modal

Open via **Esc → Settings** (or the menu entry for Settings). Details: [Application Settings](/docs/settings/application-settings).

### General view

- **Audio Device** and per-bus volume sliders
- **Quit Confirmation**: "Don't ask again"
- **Graphics**: Occlusion culling, Shadows
- **Network Policy**: script HTTP third-party host allowlist
- **Script origins**: hosts allowed to supply remote `.luau` beyond the scene origin
- **Open Cache**, **Change Keybindings**, **Cancel**, **Save**

### Keybindings view

- **Action List**: All available input actions
- **Current Bindings**: Shows current key assignments
- **Rebind**: Click an action, then press the key(s) to bind
- **Modifiers**: Support for Shift, Ctrl, Alt
- **Mouse Buttons**: Can bind to left/right mouse buttons
- Esc returns to the General view without closing Settings

## Travel Modal

The travel modal appears when:

- You interact with a portal
- A script calls `Scene.TravelTo(url)`

**Features**:
- Shows destination URL
- Displays scene metadata (if available)
- Confirmation button to travel
- Cancel option

## Portal Modal

When you approach a portal, a modal may appear showing:

- **Destination**: Where the portal leads
- **World Information**: World ID and position (if applicable)
- **Validation Status**: Whether the destination is valid
- **Travel Button**: Confirm travel to destination

Portals can be configured to:
- Auto-trigger (travel immediately)
- Manual trigger (require interaction)
- Script trigger (controlled by scripts)

## Textbox Modal

Textboxes display information and can collect input:

**Features**:
- **Title**: Optional title text
- **Content**: Main text content (supports newlines)
- **Buttons**: Optional action buttons
- **Checkboxes**: Optional checkboxes for preferences
- **Callback**: Script callback when user interacts

Textboxes are opened by:
- Scripts calling `Engine.openTextBox()`
- Textbox instances in the scene

## URL Modal

The URL modal appears when:

- A script calls `Engine.openExternalUrl(url)`
- User confirmation is required to open external URLs

**Features**:
- Shows the URL that will be opened
- Security warning about external sites
- Accept/Decline buttons
- Script callback with user's choice

## Menu System (Esc)

Press **Esc** for the exit/pause menu. Typical actions:

- **Settings**: Application settings (see above)
- **Leave** / leave-instance controls (also on the top bar when in a scene)
- **Quit**: Exit the application (respects quit confirmation preference)

URL travel remains on the **top bar** URL field + Load.

## ImGui Textbox

ImGui textboxes are lightweight text displays:

- **Purpose**: Quick information display
- **Opened by**: `Engine.openImGuiTextBox()`
- **Features**: Similar to regular textbox but lighter weight
- **Use case**: Temporary messages, debug info

## UI State Indicators

DDDBrowser shows visual indicators for:

- **Loading State**: Progress bar and status text
- **Error State**: Error messages with retry option
- **Active State**: Scene is loaded and interactive
- **Idle State**: No scene loaded, showing grid

## Customization

UI elements cannot be customized by users, but scenes can:

- **Control textboxes**: Scripts can open/close textboxes
- **Trigger modals**: Scripts can trigger various modals
- **Display information**: Use textboxes to show scene-specific UI

## Best Practices

- **Keep UI minimal**: Don't overwhelm users with too many modals
- **Provide feedback**: Use progress indicators and status messages
- **Handle errors gracefully**: Show clear error messages
- **Respect user input**: Allow cancellation of actions

## Next Steps

- [Scene Features](/docs/using/scene-features) - Learn what scenes can do
- [Settings](/docs/settings/application-settings) - Configure the application
- [Scripting](/docs/luau/intro) - Control UI from scripts

