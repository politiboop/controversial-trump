// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Trump Controversies Tracker',
  tagline: 'A comprehensive, sourced compilation of controversies, criticisms, and concerns',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://politiboop.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/controversial-trump/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'politiboop', // Usually your GitHub org/user name.
  projectName: 'controversial-trump', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          editUrl: 'https://github.com/politiboop/controversial-trump/edit/main/website/',
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Trump Controversies',
        hideOnScroll: false,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'controversiesSidebar',
            position: 'left',
            label: 'Controversies',
          },
          {
            to: '/docs/sources',
            label: 'Sources',
            position: 'left',
          },
          {
            to: '/docs/context',
            label: 'Context & Counterarguments',
            position: 'left',
          },
          {
            href: 'https://github.com/politiboop/controversial-trump',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'All Controversies',
                to: '/docs/intro',
              },
              {
                label: 'Sources & References',
                to: '/docs/sources',
              },
              {
                label: 'Context & Counterarguments',
                to: '/docs/context',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/politiboop/controversial-trump',
              },
              {
                label: 'sources.md',
                href: 'https://github.com/politiboop/controversial-trump/blob/main/sources.md',
              },
            ],
          },
        ],
        copyright: `This is a compilation of publicly available information and criticism. All claims are sourced. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
