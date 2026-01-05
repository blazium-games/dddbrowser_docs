# DDDBrowser Documentation

This is the documentation website for DDDBrowser, a 3D scene browser for interactive virtual worlds. The documentation is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Documentation Structure

The documentation covers:

- **Introduction**: What is DDDBrowser and key concepts
- **Getting Started**: Installation and basic usage
- **Using DDDBrowser**: Navigation, loading scenes, UI elements, scene features
- **Scene Format Reference**: Complete scene format documentation
- **Lua/Luau Scripting API**: Complete scripting API reference
- **Examples**: Example scenes demonstrating features
- **Settings & Configuration**: Application settings and keybindings
- **Troubleshooting**: Common issues and solutions
- **Best Practices**: Guidelines for creating scenes and scripts

## Installation

```bash
npm install
```

or

```bash
yarn install
```

## Local Development

```bash
npm start
```

or

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

The site will be available at `http://localhost:3000/dddbrowser_docs/`

## Build

```bash
npm run build
```

or

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The documentation is deployed to GitHub Pages at:
```
https://blazium-engine.github.io/dddbrowser_docs/
```

### Deploying to GitHub Pages

Using SSH:

```bash
USE_SSH=true npm run deploy
```

or

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

or

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

This command builds the website and pushes to the `gh-pages` branch.

## Project Structure

```
dddbrowser_docs/
├── docs/              # Documentation markdown files
│   ├── intro.md
│   ├── getting-started.md
│   ├── using/         # Using DDDBrowser guides
│   ├── settings/      # Settings documentation
│   ├── scene-format/  # Scene format reference
│   ├── luau/          # Lua/Luau API documentation
│   ├── examples/      # Example scene documentation
│   ├── troubleshooting.md
│   └── best-practices.md
├── sidebars.js        # Sidebar configuration
├── docusaurus.config.js  # Docusaurus configuration
└── README.md          # This file
```

## Contributing

When contributing to the documentation:

1. **Follow the structure**: Maintain the existing documentation structure
2. **User-focused**: Focus on user-facing documentation, not internal implementation
3. **Examples**: Include examples from the `examples/` directory
4. **Code references**: Use code references to show actual code from the project
5. **Test locally**: Build and test locally before submitting changes

## License

This documentation is part of the DDDBrowser project.
