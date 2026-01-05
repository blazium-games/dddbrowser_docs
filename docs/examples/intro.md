---
sidebar_position: 1
---

# Examples Overview

The DDDBrowser examples demonstrate various features and use cases. All examples are available in the `examples/` directory and can be loaded directly in DDDBrowser.

## Purpose

Examples serve to:

- **Demonstrate features**: Show how to use scene format features
- **Provide templates**: Starting points for your own scenes
- **Test functionality**: Verify features work correctly
- **Learn by example**: See real-world usage patterns

## Example Structure

All examples follow this structure:

1. **HTML file**: Contains scene metadata and JSON
2. **Assets**: Referenced assets (models, textures, scripts, etc.)
3. **Scene JSON**: Complete scene definition

Examples are self-contained and can be loaded directly from their URLs.

## How to Use Examples

### Loading Examples

1. **Get the example URL**: Examples are hosted at:
   ```
   https://blazium-engine.github.io/DDDBrowserExamples/
   ```

2. **Load in DDDBrowser**:
   - Enter the example URL in DDDBrowser
   - Click Load
   - Explore the example scene

### Running Locally

To run examples locally:

1. **Serve the examples directory**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```

2. **Load in DDDBrowser**:
   - URL: `http://localhost:8000/example-name.html`
   - Note: HTTPS is required, so use a local HTTPS server or test server

## Example Categories

Examples are organized by category:

- **Basic Examples**: Minimal scenes demonstrating core concepts
- **Feature Examples**: Scenes showcasing specific features
- **Lighting Examples**: Different lighting setups
- **Portal Examples**: Portal configurations and behaviors
- **Script Examples**: Lua/Luau scripting demonstrations
- **Scene Save Examples**: Save/load functionality
- **Metadata Examples**: Different metadata formats
- **Special Examples**: Edge cases and special scenarios

## Example Index

The main example hub is available at:
- **URL**: `https://blazium-engine.github.io/DDDBrowserExamples/index.html`
- **Features**: Portal hub connecting to all examples

## Next Steps

- Browse examples by category below
- [Scene Format](/docs/scene-format/intro) - Learn the scene format
- [Lua/Luau API](/docs/luau/intro) - Learn scripting

