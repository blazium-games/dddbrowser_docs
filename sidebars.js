// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'getting-started',
    {
      type: 'category',
      label: 'Using DDDBrowser',
      items: [
        'using/navigation',
        'using/loading-scenes',
        'using/ui-elements',
        'using/scene-features',
      ],
    },
    {
      type: 'category',
      label: 'Scene Format Reference',
      items: [
        'scene-format/intro',
        'scene-format/schema-reference',
        'scene-format/assets',
        'scene-format/instances',
        'scene-format/metadata',
        'scene-format/advanced',
      ],
    },
    {
      type: 'category',
      label: 'Lua/Luau Scripting API',
      items: [
        'luau/intro',
        'luau/lifecycle',
        'luau/engine-api',
        'luau/localstorage-api',
        'luau/gamemode-api',
        'luau/scene-api',
        'luau/examples',
        'luau/best-practices',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/intro',
        {
          type: 'category',
          label: 'Basic Examples',
          items: [
            'examples/basic/scene-valid',
            'examples/basic/scene-single-entity',
            'examples/basic/scene-metadata-minimal',
            'examples/basic/scene-with-metadata',
          ],
        },
        {
          type: 'category',
          label: 'Feature Examples',
          items: [
            'examples/features/all-features-scene',
            'examples/features/ui-features-scene',
            'examples/features/media-features-scene',
            'examples/features/audio-scene',
            'examples/features/font-scene',
            'examples/features/picturebox-scene',
            'examples/features/textbox-scene',
          ],
        },
        {
          type: 'category',
          label: 'Lighting Examples',
          items: [
            'examples/lighting/directional-light',
            'examples/lighting/point-light',
            'examples/lighting/spot-light',
            'examples/lighting/lights-shadows',
            'examples/lighting/all-lights',
            'examples/lighting/scene-multiple-lights',
          ],
        },
        {
          type: 'category',
          label: 'Portal Examples',
          items: [
            'examples/portals/portal-source',
            'examples/portals/portal-destination',
            'examples/portals/portal-auto-trigger',
            'examples/portals/portal-invalid-url',
            'examples/portals/portal-invalid-world',
          ],
        },
        {
          type: 'category',
          label: 'Script Examples',
          items: [
            'examples/scripting/scene-with-scripts',
            'examples/scripting/luau-pingpong',
            'examples/scripting/luau-gamemode',
            'examples/scripting/scene-with-gamemode',
          ],
        },
        {
          type: 'category',
          label: 'Scene Save Examples',
          items: [
            'examples/scene-save/scene-save-gamemode-manual',
            'examples/scene-save/scene-save-autosave-default',
            'examples/scene-save/scene-save-autosave-custom-notification',
          ],
        },
        {
          type: 'category',
          label: 'Metadata Examples',
          items: [
            'examples/metadata/metadata-html',
            'examples/metadata/metadata-json',
            'examples/metadata/metadata-both',
            'examples/metadata/metadata-full',
          ],
        },
        {
          type: 'category',
          label: 'Special Examples',
          items: [
            'examples/special/retry',
            'examples/special/slow',
            'examples/special/url-modal-scene',
            'examples/special/imgui-textbox-scene',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Settings & Configuration',
      items: [
        'settings/application-settings',
        'settings/keybindings',
      ],
    },
    'troubleshooting',
    'best-practices',
  ],
};

export default sidebars;
