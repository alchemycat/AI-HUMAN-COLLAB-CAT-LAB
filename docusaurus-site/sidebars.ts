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
          label: '1 📝 Personal Diary (5 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/diary/HONEST_REFLECTION',
              label: '1.1 Honest Reflection: What This Collaboration Was Really Like',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/diary/SESSION_BY_SESSION_REALITY',
              label: '1.2 Session by Session Reality: What Actually Happened',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/diary/COLLABORATION_INSIGHTS',
              label: '1.3 Collaboration Insights: What Actually Worked',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/diary/TECHNICAL_EVOLUTION',
              label: '1.4 Technical Evolution: What Actually Changed',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/diary/DEVELOPMENT_TIMELINE',
              label: '1.5 Development Timeline: Session-by-Session Journey',
            },
          ],
        },
        {
          type: 'category',
          label: '2 🔍 Analysis (2 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/analysis/CHALLENGES_AND_SOLUTIONS',
              label: '2.1 Challenges and Solutions: What We Actually Fixed',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/analysis/COLLABORATION_FAILURE_POINTS',
              label: '2.2 Collaboration Failure Points: What Almost Broke This',
            },
          ],
        },
        {
          type: 'category',
          label: '3 📊 Reports (3 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/reports/PROJECT_FINAL_REPORT',
              label: '3.1 Project Final Report: Uniserv NFT ERC721 Carbon Credit System',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/reports/TECHNICAL_ACHIEVEMENTS',
              label: '3.2 Technical Achievements: What Actually Got Built',
            },
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/reports/FUTURE_ROADMAP',
              label: '3.3 Future Roadmap: Next Steps',
            },
          ],
        },
        {
          type: 'category',
          label: '4 📖 Complete Story (1 doc)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'uniserv-nft-carbon-credit/blog/AI_HUMAN_COLLABORATION_STORY',
              label: '4.1 From Concept to Carbon: Building a Multi-Chain NFT System with AI',
            },
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
          label: '1 📝 AI Analysis Diary (4 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/diary/HONEST_REFLECTION',
              label: '1.1 Honest Reflection: AI Perspective on Repository Analysis',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/diary/ANALYSIS_SESSION_REALITY',
              label: '1.2 Analysis Session Reality: Step-by-Step Discovery Process',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/diary/CODE_EXPLORATION_INSIGHTS',
              label: '1.3 Code Exploration Insights: Technical Discoveries',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/diary/TECHNICAL_DISCOVERIES',
              label: '1.4 Technical Discoveries: Production LIFF Patterns',
            },
          ],
        },
        {
          type: 'category',
          label: '2 🔍 Technical Analysis (4 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/analysis/CODEBASE_ARCHITECTURE',
              label: '2.1 Codebase Architecture: System Design Analysis',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/analysis/GIT_HISTORY_ANALYSIS',
              label: '2.2 Git History Analysis: Development Evolution',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/analysis/LIFF_IMPLEMENTATION_REVIEW',
              label: '2.3 LIFF Implementation Review: LINE Platform Integration',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/analysis/ENVIRONMENTAL_IMPACT_ASSESSMENT',
              label: '2.4 Environmental Impact Assessment: Carbon System Analysis',
            },
          ],
        },
        {
          type: 'category',
          label: '3 📊 Executive Reports (3 docs)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/reports/REPOSITORY_FINAL_REPORT',
              label: '3.1 Repository Final Report: Comprehensive Project Assessment',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/reports/TECHNICAL_ASSESSMENT',
              label: '3.2 Technical Assessment: Code Quality and Architecture',
            },
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/reports/SUSTAINABILITY_ANALYSIS',
              label: '3.3 Sustainability Analysis: Environmental Authenticity',
            },
          ],
        },
        {
          type: 'category',
          label: '4 📖 Analysis Story (1 doc)',
          collapsed: false, // Expanded when parent opens
          items: [
            {
              type: 'doc',
              id: 'liff-carbon-offset-app/blog/LIFF_CARBON_ANALYSIS_STORY',
              label: '4.1 AI Repository Analysis Journey: LIFF Carbon Offset App',
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
