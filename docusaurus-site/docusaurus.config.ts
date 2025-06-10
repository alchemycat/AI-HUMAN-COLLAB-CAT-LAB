import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AI-Human Collaboration Lab',
  tagline: 'Documentation archive for AI-human collaborative development projects',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://alchemycat.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/AI-HUMAN-COLLAB-CAT-LAB/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'alchemycat', // Usually your GitHub org/user name.
  projectName: 'AI-HUMAN-COLLAB-CAT-LAB', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB/tree/main/docusaurus-site/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB/tree/main/docusaurus-site/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AI-Human Collaboration Lab',
      logo: {
        alt: 'AI-Human Collaboration Lab Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'projectSidebar',
          position: 'left',
          label: 'Projects',
        },
        {to: '/blog', label: 'Stories', position: 'left'},
        {
          href: 'https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Get Started',
              to: '/docs/intro',
            },
            {
              label: 'Project 001',
              to: '/docs/uniserv-nft-carbon-credit/INDEX',
            },
          ],
        },
        {
          title: 'Projects',
          items: [
            {
              label: 'Uniserv NFT Carbon Credit',
              to: '/docs/uniserv-nft-carbon-credit/PROJECT_OVERVIEW',
            },
            {
              label: 'Original Repository',
              href: 'https://github.com/alchemycat/uniserv-nft-erc721',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Collaboration Stories',
              to: '/blog',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/alchemycat/AI-HUMAN-COLLAB-CAT-LAB',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AI-Human Collaboration Lab. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
