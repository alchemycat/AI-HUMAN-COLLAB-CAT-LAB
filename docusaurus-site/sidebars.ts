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
      label: '1️⃣ Project 001 - Uniserv NFT Carbon Credit',
      collapsed: true, // Collapsed by default
      items: [
        'uniserv-nft-carbon-credit/index',
        'uniserv-nft-carbon-credit/PROJECT_OVERVIEW',
        {
          type: 'category',
          label: '1.1 📝 Personal Diary (5 docs)',
          collapsed: false, // Expanded when parent opens
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
          label: '1.2 🔍 Analysis (2 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            'uniserv-nft-carbon-credit/analysis/CHALLENGES_AND_SOLUTIONS',
            'uniserv-nft-carbon-credit/analysis/COLLABORATION_FAILURE_POINTS',
          ],
        },
        {
          type: 'category',
          label: '1.3 📊 Reports (3 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            'uniserv-nft-carbon-credit/reports/PROJECT_FINAL_REPORT',
            'uniserv-nft-carbon-credit/reports/TECHNICAL_ACHIEVEMENTS',
            'uniserv-nft-carbon-credit/reports/FUTURE_ROADMAP',
          ],
        },
        {
          type: 'category',
          label: '1.4 📖 Complete Story (1 doc)',
          collapsed: false, // Expanded when parent opens
          items: [
            'uniserv-nft-carbon-credit/blog/AI_HUMAN_COLLABORATION_STORY',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '2️⃣ Project 002 - LIFF Carbon Offset App',
      collapsed: true, // Collapsed by default
      items: [
        'liff-carbon-offset-app/INDEX',
        {
          type: 'category',
          label: '2.1 📝 AI Analysis Diary (4 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            'liff-carbon-offset-app/diary/HONEST_REFLECTION',
            'liff-carbon-offset-app/diary/ANALYSIS_SESSION_REALITY',
            'liff-carbon-offset-app/diary/CODE_EXPLORATION_INSIGHTS',
            'liff-carbon-offset-app/diary/TECHNICAL_DISCOVERIES',
          ],
        },
        {
          type: 'category',
          label: '2.2 🔍 Technical Analysis (4 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            'liff-carbon-offset-app/analysis/CODEBASE_ARCHITECTURE',
            'liff-carbon-offset-app/analysis/GIT_HISTORY_ANALYSIS',
            'liff-carbon-offset-app/analysis/LIFF_IMPLEMENTATION_REVIEW',
            'liff-carbon-offset-app/analysis/ENVIRONMENTAL_IMPACT_ASSESSMENT',
          ],
        },
        {
          type: 'category',
          label: '2.3 📊 Executive Reports (3 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            'liff-carbon-offset-app/reports/REPOSITORY_FINAL_REPORT',
            'liff-carbon-offset-app/reports/TECHNICAL_ASSESSMENT',
            'liff-carbon-offset-app/reports/SUSTAINABILITY_ANALYSIS',
          ],
        },
        {
          type: 'category',
          label: '2.4 📖 Analysis Story (1 doc)',
          collapsed: false, // Expanded when parent opens
          items: [
            'liff-carbon-offset-app/blog/LIFF_CARBON_ANALYSIS_STORY',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
