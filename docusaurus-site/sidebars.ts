import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // AI-Human Collaboration sidebar
  projectSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Project 001 - Uniserv NFT Carbon Credit',
      collapsed: false, // Expanded by default
      items: [
        'uniserv-nft-carbon-credit/index',
        'uniserv-nft-carbon-credit/PROJECT_OVERVIEW',
        {
          type: 'category',
          label: 'Personal Diary',
          collapsed: false, // Expanded by default
          items: [
            'uniserv-nft-carbon-credit/diary/HONEST_REFLECTION',
            'uniserv-nft-carbon-credit/diary/SESSION_BY_SESSION_REALITY',
            'uniserv-nft-carbon-credit/diary/COLLABORATION_INSIGHTS',
            'uniserv-nft-carbon-credit/diary/TECHNICAL_EVOLUTION',
            'uniserv-nft-carbon-credit/diary/DEVELOPMENT_TIMELINE',
          ],
        },
        {
          type: 'category',
          label: 'Analysis',
          collapsed: false, // Expanded by default
          items: [
            'uniserv-nft-carbon-credit/analysis/CHALLENGES_AND_SOLUTIONS',
            'uniserv-nft-carbon-credit/analysis/COLLABORATION_FAILURE_POINTS',
          ],
        },
        {
          type: 'category',
          label: 'Reports',
          collapsed: false, // Expanded by default
          items: [
            'uniserv-nft-carbon-credit/reports/PROJECT_FINAL_REPORT',
            'uniserv-nft-carbon-credit/reports/TECHNICAL_ACHIEVEMENTS',
            'uniserv-nft-carbon-credit/reports/FUTURE_ROADMAP',
          ],
        },
        'uniserv-nft-carbon-credit/blog/AI_HUMAN_COLLABORATION_STORY',
      ],
    },
  ],
};

export default sidebars;
