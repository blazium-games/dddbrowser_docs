---
sidebar_position: 2
---

# Best Practices

Follow these guidelines to create high-quality scenes and scripts for DDDBrowser.

## Scene Creation

### Scene Structure

- **Use descriptive names**: Make scene names clear and meaningful
- **Version your scenes**: Use semantic versioning (e.g., "1.0", "1.2.3")
- **Include metadata**: Provide complete metadata for discoverability
- **Organize assets**: Group related assets together
- **Validate early**: Test scenes against schema before publishing

### Asset Management

- **Optimize assets**: Compress textures, simplify models
- **Use appropriate formats**: Use supported formats (OBJ/MTL, PNG/JPG/TGA, WAV, TTF)
- **HTTPS by default**: Serve assets over HTTPS; treat Allow HTTP as a local/dev escape hatch only
- **Descriptive IDs**: Use clear, unique asset IDs
- **Reuse assets**: Reference the same asset multiple times rather than duplicating

### Instance Placement

- **Logical organization**: Place instances in logical groups
- **Appropriate scale**: Use realistic scale values
- **Consistent units**: Use consistent units throughout (meters recommended)
- **Clear positioning**: Position instances clearly and intentionally

## Scripting

### Script Structure

- **Return a table**: Scripts must return a table
- **Use self**: Store instance data in `self`
- **Initialize in on_start**: Set up variables in `on_start`
- **Check APIs**: Always check API availability before use
- **Handle errors**: Add error handling for robustness

### Performance

- **Use delta time**: Always use `dt` for frame-rate independent updates
- **Keep updates fast**: Avoid expensive operations in `on_update`
- **Cache values**: Cache frequently accessed values
- **Limit updates**: Only update when necessary
- **Optimize loops**: Minimize loop iterations

### State Management

- **Save state**: Use `on_save()` for complex state
- **Load state**: Use `on_load()` to restore state
- **Use localStorage**: Use localStorage for simple string values
- **Persist important data**: Save player progress, preferences, etc.

## Metadata

### Discovery

- **Use script tags**: Prefer `<script>` tags for full scene JSON
- **Provide metadata**: Include metadata in HTML for previews
- **Consistent data**: Keep metadata consistent with scene JSON
- **Complete information**: Provide author, rating, thumbnail, etc.

### World Organization

- **Use world IDs**: Organize related scenes with world IDs
- **World positions**: Set appropriate world positions for spatial organization
- **Consistent naming**: Use consistent naming conventions

## User Experience

### Navigation

- **Set spawn points**: Define appropriate spawn points
- **Movement bounds**: Set movement bounds for confined spaces
- **Clear paths**: Provide clear navigation paths
- **Portal placement**: Place portals in logical locations

### Interaction

- **Clear interactables**: Make interactive objects obvious
- **Feedback**: Provide visual/audio feedback for interactions
- **Error messages**: Show clear error messages
- **Loading states**: Show loading progress

### Performance

- **Optimize for performance**: Keep scenes performant
- **Test on target hardware**: Test on target hardware configurations
- **Monitor frame rate**: Ensure smooth frame rates
- **Reduce complexity**: Simplify when possible

## Security

### URLs

- **Prefer HTTPS**: Default for travel and scripts; HTTP travel requires an Allow HTTP confirmation
- **Validate URLs**: Validate URLs before using
- **User confirmation**: Request confirmation for external / HTTP travel when appropriate
- **No sensitive data**: Don't store sensitive data in scenes
- **Script HTTP**: Keep `Engine.httpRequest` on HTTPS + allowlisted hosts (separate from travel Allow HTTP)

### Scripts

- **Sandboxed execution**: Scripts run in a Luau sandbox (no filesystem / OS), but may call `Engine.httpRequest` under Network Policy
- **Validate input**: Validate all user input
- **Error handling**: Handle errors gracefully
- **No file system access**: Scripts cannot access the file system

## Documentation

### Scene Documentation

- **Clear descriptions**: Write clear scene descriptions
- **Document features**: Document scene features and requirements
- **Provide examples**: Include example usage
- **Update documentation**: Keep documentation current

### Code Documentation

- **Comment scripts**: Add comments to complex logic
- **Document APIs**: Document custom functions
- **Explain decisions**: Explain non-obvious design decisions
- **Keep comments current**: Update comments with code changes

## Testing

### Validation

- **Schema validation**: Always validate against schema
- **Test loading**: Test scene loading before publishing
- **Test features**: Test all scene features
- **Test scripts**: Test all scripts thoroughly

### Compatibility

- **Test on different systems**: Test on different hardware
- **Test network conditions**: Test with various network speeds
- **Test edge cases**: Test edge cases and error conditions
- **Test updates**: Test scene updates and version changes

## Publishing

### Preparation

- **Final validation**: Validate scene one final time
- **Test thoroughly**: Test all features
- **Optimize assets**: Optimize all assets
- **Check metadata**: Verify all metadata is correct

### Hosting

- **Reliable hosting**: Use reliable hosting with HTTPS
- **CDN**: Consider CDN for faster asset delivery
- **CORS**: Configure CORS if needed
- **Cache headers**: Set appropriate cache headers

## Next Steps

- [Scene Format](/docs/scene-format/intro) - Learn the scene format
- [Lua/Luau API](/docs/luau/intro) - Learn scripting
- [Examples](/docs/examples/intro) - See examples
- [Troubleshooting](/docs/troubleshooting) - Fix issues

