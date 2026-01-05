---
sidebar_position: 1
---

# Application Settings

DDDBrowser stores application settings that persist between sessions. This guide covers all available settings and how to configure them.

## Accessing Settings

To access settings:

1. Open the menu system (keyboard shortcut or system menu)
2. Select "Settings"
3. The Settings modal will appear with two tabs:
   - **General**: Audio and application preferences
   - **Keybindings**: Input control customization

## Audio Settings

### Audio Device Selection

Choose which audio output device to use:

- **Dropdown menu**: Lists all available audio devices
- **Default**: System default device is selected automatically
- **Change**: Select a different device from the dropdown
- **Save**: Changes are saved immediately

The selected device is used for all audio playback in DDDBrowser.

### Volume Controls

DDDBrowser provides fine-grained volume control:

#### Master Volume

- **Range**: 0.0 to 1.0
- **Default**: 0.25 (25%)
- **Purpose**: Overall volume level for all audio
- **Effect**: Multiplies all other volume levels

#### Music Volume

- **Range**: 0.0 to 1.0
- **Default**: 1.0 (100%)
- **Purpose**: Background music volume
- **Use case**: Adjust music relative to other sounds

#### SFX Volume

- **Range**: 0.0 to 1.0
- **Default**: 1.0 (100%)
- **Purpose**: Sound effects volume
- **Use case**: Adjust effect sounds (footsteps, impacts, etc.)

#### Voice Volume

- **Range**: 0.0 to 1.0
- **Default**: 1.0 (100%)
- **Purpose**: Voice/dialogue volume
- **Use case**: Adjust spoken dialogue and voiceovers

#### UI Volume

- **Range**: 0.0 to 1.0
- **Default**: 1.0 (100%)
- **Purpose**: User interface sounds volume
- **Use case**: Adjust menu sounds, notifications, etc.

### Volume Calculation

Final volume for any sound is calculated as:

```
Final Volume = Master Volume × Category Volume × Scene Volume
```

For example, if Master is 0.5, SFX is 0.8, and a scene sound has volume 0.6:
- Final = 0.5 × 0.8 × 0.6 = 0.24 (24%)

## General Settings

### Quit Confirmation

- **Option**: "Don't ask again" checkbox
- **Default**: Unchecked (shows confirmation dialog)
- **Purpose**: Skip quit confirmation dialog
- **When checked**: Application quits immediately when you choose Quit
- **When unchecked**: Shows confirmation dialog before quitting

## Settings Storage

Settings are stored in:

**Location**: `%LOCALAPPDATA%\DDDBrowser\settings.json`

**Format**: JSON file with the following structure:

```json
{
  "audioDevice": {
    "deviceId": 0,
    "deviceName": "Default Audio Device"
  },
  "audioVolumes": {
    "masterVolume": 0.25,
    "musicVolume": 1.0,
    "sfxVolume": 1.0,
    "voiceVolume": 1.0,
    "uiVolume": 1.0
  },
  "quitDontAsk": false
}
```

**Persistence**: Settings are saved automatically when changed.

**Backup**: You can backup your settings by copying the JSON file.

## Resetting Settings

To reset settings to defaults:

1. Close DDDBrowser
2. Delete or rename `settings.json`
3. Restart DDDBrowser
4. Default settings will be created automatically

## Troubleshooting

### Audio Not Working

- Check that an audio device is selected
- Verify the device is not muted in system settings
- Try selecting a different audio device
- Check Master Volume is not set to 0

### Settings Not Saving

- Verify write permissions in `%LOCALAPPDATA%\DDDBrowser\`
- Check disk space
- Look for error messages in the application log

### Volume Too Low/High

- Adjust Master Volume first (affects everything)
- Then adjust category volumes (Music, SFX, etc.)
- Remember: Final volume = Master × Category × Scene

## Next Steps

- [Keybindings](/docs/settings/keybindings) - Customize input controls
- [Using DDDBrowser](/docs/using/navigation) - Learn the controls
- [Troubleshooting](/docs/troubleshooting) - Fix issues

