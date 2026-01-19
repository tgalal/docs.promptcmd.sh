import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "promptcmd",
  description: "Turn GenAI prompts into runnable programs",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    editLink: {
      pattern: 'https://github.com/tgalal/docs.promptcmd.sh/edit/main/:path'
    },
    nav: [
      { text: 'Prompt Creator', link: 'https://promptcmd.sh/creator/' },
      { text: 'Prompt Lib', link: 'https://promptcmd.sh/lib/' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is promptcmd?', link: '/intro/' },
          { text: 'Installation', link: '/intro/installation' },
          { text: 'Quick Start', link: '/intro/quick-start' },
          { text: 'Lookup Paths', link: '/intro/lookup-paths' },
          { text: 'Uninstall & Cleanup', link: '/intro/uninstall' },
        ]
      },
      {
        text: 'Configuration',
        collapsed: false,
        items: [
          { text: 'Configuration Sources', link: '/configuration/sources/', items: [
            {
              text: 'Configuration File', link: '/configuration/sources/config.toml',
            },
            {
              text: 'Environment Variables', link: '/configuration/sources/env',
            },
            {
              text: 'Command line Arguments', link: '/configuration/sources/cmd',
            },
          ]},
          { text: 'Base Providers', link: '/configuration/providers' },
          { text: 'Variants', link: '/configuration/variants' },
          { text: 'Groups & Load Balancing', link: '/configuration/groups' },
          { text: 'Caching', link: '/configuration/caching' },
          { text: 'Sample config.toml', link: '/configuration/sample' },
          { text: 'Model Resolution', link: '/configuration/model-resolution' },
          { text: 'Config Resolution', link: '/configuration/config-resolution' },
        ]
      },
      {
        text: 'Dotprompt File',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/dotprompt/' },
          { text: 'Frontmatter', link: '/dotprompt/frontmatter' },
          { text: 'Templates', link: '/dotprompt/templates' }
        ]
      },
      {
        text: 'Concepts',
        collapsed: false,
        items: [
          { text: 'Enabling/Disabling Prompts', link: '/concepts/enable_disable' },
          { text: 'Executing Prompts', link: '/concepts/exec' },
          { text: 'Monitoring Usage', link: '/concepts/monitoring_usage' },
        ]
      }
    ]
    ,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tgalal/promptcmd' }
    ]
  }
})
