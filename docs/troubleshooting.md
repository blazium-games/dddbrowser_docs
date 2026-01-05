---
sidebar_position: 1
---

# Troubleshooting

Common issues and solutions when using DDDBrowser.

## Scene Loading Issues

### Scene Won't Load

**Symptoms**: Scene fails to load, shows error message

**Solutions**:
- **Check URL**: Ensure URL is valid HTTPS
- **Verify scene JSON**: Check that scene JSON is valid
- **Check schema**: Ensure scene conforms to schema version 1.0
- **Required fields**: Verify all required fields are present (`name`, `version`, `schemaVersion`, `assets`)
- **Asset URLs**: Ensure all asset URLs are accessible and use HTTPS
- **Network**: Check internet connection

### Invalid Scene JSON

**Symptoms**: "Invalid scene JSON" error

**Solutions**:
- **Validate JSON**: Use a JSON validator to check syntax
- **Check schema**: Validate against `data/scene.schema.json`
- **Required fields**: Ensure all required fields are present
- **Field types**: Verify field types match schema (strings, numbers, objects, arrays)
- **Enum values**: Check enum values (e.g., `rating` must be "GENERAL", "MODERATE", or "ADULT")

### Assets Won't Download

**Symptoms**: Assets fail to download, loading hangs

**Solutions**:
- **HTTPS only**: Ensure all asset URLs use HTTPS (HTTP is not supported)
- **CORS**: Check CORS headers if hosting assets separately
- **File formats**: Verify file formats are supported (OBJ/MTL, PNG/JPG/TGA, WAV, TTF)
- **File size**: Large files may take time to download
- **Network**: Check internet connection and firewall settings

## Portal Issues

### Portal Won't Travel

**Symptoms**: Portal doesn't trigger travel

**Solutions**:
- **Check URL**: Verify destination URL is valid HTTPS
- **Trigger type**: Check portal trigger configuration (auto, manual, script)
- **Interaction**: Ensure you're pressing the interact key (E or F)
- **Radius**: Check trigger radius is appropriate
- **Validation**: Portal destination is validated before travel

### Invalid Portal Destination

**Symptoms**: "Invalid portal destination" error

**Solutions**:
- **URL format**: Ensure destination URL is valid HTTPS
- **Scene exists**: Verify destination scene exists and is accessible
- **World validation**: Check world ID and position if using worlds
- **Network**: Check network connectivity

## Script Issues

### Script Not Running

**Symptoms**: Script doesn't execute, no behavior

**Solutions**:
- **Script asset**: Verify script asset is defined and loaded
- **Script attachment**: Check script is attached to instance correctly
- **Script syntax**: Verify Luau syntax is correct
- **Return statement**: Ensure script returns a table
- **Lifecycle methods**: Check lifecycle methods are defined correctly

### Script Errors

**Symptoms**: Script errors in console, script disabled

**Solutions**:
- **Check API availability**: Always check if APIs exist before use
- **Error handling**: Add error handling for API calls
- **Nil checks**: Check for nil values before use
- **Type conversion**: Convert types properly (numbers, strings, booleans)
- **Debug**: Use `print()` statements to debug

### Script Performance Issues

**Symptoms**: Slow performance, frame rate drops

**Solutions**:
- **Optimize updates**: Avoid expensive operations in `on_update`
- **Use delta time**: Always use `dt` for frame-rate independent updates
- **Limit updates**: Only update when necessary
- **Cache values**: Cache frequently accessed values
- **Reduce complexity**: Simplify script logic

## Audio Issues

### No Audio

**Symptoms**: Audio doesn't play

**Solutions**:
- **Audio device**: Check audio device is selected in settings
- **Volume**: Verify volume levels are not zero
- **Audio asset**: Check audio asset is defined and loaded
- **Format**: Ensure audio is WAV format
- **Instance**: Verify audio instance is configured correctly

### Audio Too Quiet/Loud

**Symptoms**: Audio volume is incorrect

**Solutions**:
- **Master volume**: Check master volume in settings
- **Category volume**: Adjust category volumes (Music, SFX, Voice, UI)
- **Scene volume**: Check audio instance volume (0.0 to 1.0)
- **Spatial audio**: Spatial audio volume varies with distance

## Settings Issues

### Settings Not Saving

**Symptoms**: Settings don't persist between sessions

**Solutions**:
- **Permissions**: Check write permissions in `%LOCALAPPDATA%\DDDBrowser\`
- **Disk space**: Verify sufficient disk space
- **File lock**: Ensure DDDBrowser is closed before editing settings manually
- **JSON format**: If editing manually, ensure valid JSON format

### Keybindings Not Working

**Symptoms**: Keybindings don't respond

**Solutions**:
- **Save keybindings**: Ensure keybindings are saved
- **Conflicts**: Check for conflicting keybindings
- **Scene support**: Verify scene supports the action (e.g., movement in FPS gameType)
- **Rebind**: Try rebinding the key
- **Reset**: Reset keybindings to defaults if needed

## Performance Issues

### Slow Loading

**Symptoms**: Scenes take a long time to load

**Solutions**:
- **Asset size**: Optimize asset sizes (compress textures, simplify models)
- **Asset count**: Reduce number of assets if possible
- **Network**: Check network speed
- **Cache**: Clear cache if corrupted (`%LOCALAPPDATA%\DDDBrowser\cache\`)
- **Server**: Check server response times

### Low Frame Rate

**Symptoms**: Low FPS, stuttering

**Solutions**:
- **Light count**: Reduce number of lights
- **Shadow resolution**: Lower shadow map resolution
- **Model complexity**: Simplify 3D models
- **Texture size**: Reduce texture sizes
- **Scripts**: Optimize script performance
- **Hardware**: Check system requirements

## Cache Issues

### Stale Cache

**Symptoms**: Old versions of scenes/assets load

**Solutions**:
- **Clear cache**: Delete cache directory (`%LOCALAPPDATA%\DDDBrowser\cache\`)
- **Force reload**: Reload scene to fetch fresh assets
- **Cache key**: Cache is keyed by base URL, so changes to same URL may be cached

### Cache Corruption

**Symptoms**: Corrupted assets, loading errors

**Solutions**:
- **Clear cache**: Delete cache directory
- **Re-download**: Assets will be re-downloaded on next load
- **Verify files**: Check downloaded files are complete

## Network Issues

### HTTPS Required

**Symptoms**: "HTTPS required" error

**Solutions**:
- **Use HTTPS**: All URLs must use HTTPS (HTTP is not supported)
- **SSL certificate**: Ensure server has valid SSL certificate
- **Redirect**: Check if HTTP redirects to HTTPS

### Connection Errors

**Symptoms**: Network errors, timeouts

**Solutions**:
- **Internet**: Check internet connection
- **Firewall**: Check firewall settings
- **Proxy**: Configure proxy if needed
- **Server**: Verify server is accessible
- **Timeout**: Large files may timeout, check server timeout settings

## Getting Help

If you're still experiencing issues:

1. **Check logs**: Look for error messages in the application
2. **Validate scene**: Use schema validator to check scene JSON
3. **Test examples**: Try loading example scenes to verify DDDBrowser works
4. **Report issues**: Report bugs with:
   - Scene URL or JSON
   - Error messages
   - Steps to reproduce
   - System information

## Next Steps

- [Best Practices](/docs/best-practices) - Follow best practices to avoid issues
- [Scene Format](/docs/scene-format/intro) - Learn proper scene format
- [Examples](/docs/examples/intro) - See working examples

