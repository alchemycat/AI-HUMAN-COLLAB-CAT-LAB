import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">AI-Human Collaboration Laboratory</h1>
        <p className="hero__subtitle">
          When artificial intelligence meets human creativity, extraordinary things happen.<br/>
          Two epic journeys of building production software together.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            🎬 Enter the Laboratory
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProjectShowcase() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">Two Epic Stories of AI-Human Innovation</h2>
        
        {/* Project 01 Card */}
        <div className={clsx('row', styles.projectCard)}>
          <div className="col col--6">
            <div className={styles.projectImage}>
              <div className={styles.moviePoster}>
                <h3>🌱 Module 01</h3>
                <h2>From Concept to Event Pass</h2>
                <p className={styles.tagline}>Building Multi-Chain NFT Event Passes with AI</p>
                <div className={styles.stats}>
                  <span>181 Commits</span> • <span>41 AI Sessions</span> • <span>37k Words</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.projectStory}>
              <h3>The Drama</h3>
              <p>
                A human and AI embark on an ambitious mission to create NFT passes for carbon-neutral events. 
                What starts as a simple NFT contract evolves into a <strong>production-ready, multi-chain system</strong> 
                managing event access for 210 unique attendees with carbon offset tracking.
              </p>
              <p>
                <strong>The Challenge:</strong> Migrate from Hardhat to Foundry mid-project. Deploy identical contracts 
                across multiple blockchains. Build 6 frontend interfaces. Optimize performance with Multicall3.
              </p>
              <p>
                <strong>The Breakthrough:</strong> A collaboration methodology emerges—rapid iteration, visual results, 
                pattern recognition. Loading times drop from 30+ seconds to under 3 seconds.
              </p>
              <div className={styles.projectLinks}>
                <Link to="/docs/uniserv-nft-carbon-credit/" className="button button--primary">
                  📖 Read the Complete Story
                </Link>
                <Link to="/docs/uniserv-nft-carbon-credit/PROJECT_OVERVIEW" className="button button--outline button--primary">
                  🚀 15-Min Executive Summary
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Project 02 Card */}
        <div className={clsx('row', styles.projectCard, styles.projectCardReverse)}>
          <div className="col col--6">
            <div className={styles.projectStory}>
              <h3>The Mystery</h3>
              <p>
                An AI detective dives deep into unknown production code—a sophisticated LIFF carbon offset application. 
                <strong>278 commits, 4 contributors, 26 days of development.</strong> What secrets will the code archaeology reveal?
              </p>
              <p>
                <strong>The Discovery:</strong> This isn't tutorial code. It's serious production software with platform-specific 
                LIFF handling, multi-chain blockchain integration, real environmental calculations, and complex payment workflows.
              </p>
              <p>
                <strong>The Revelation:</strong> How professional teams really build software—messy, iterative, human development 
                that solves real problems. Advanced mobile integration patterns never found in documentation.
              </p>
              <div className={styles.projectLinks}>
                <Link to="/docs/liff-carbon-offset-app/" className="button button--primary">
                  🔍 Uncover the Analysis Journey
                </Link>
                <Link to="/docs/liff-carbon-offset-app/reports/REPOSITORY_FINAL_REPORT" className="button button--outline button--primary">
                  📊 Executive Assessment
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.projectImage}>
              <div className={clsx(styles.moviePoster, styles.posterSecondary)}>
                <h3>🔍 Module 02</h3>
                <h2>AI Repository Detective</h2>
                <p className={styles.tagline}>Analyzing Production LIFF Carbon Technology</p>
                <div className={styles.stats}>
                  <span>278 Commits</span> • <span>3 Hours Analysis</span> • <span>15k Words</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text--center margin-top--xl">
          <h2>Choose Your Adventure</h2>
          <p className="margin-bottom--lg">
            Two different stories, two different approaches to AI-human collaboration.<br/>
            One builds from scratch, one analyzes existing mastery.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/docs/intro" className="button button--primary button--lg margin-horiz--sm">
              🎯 Start with Overview
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="When artificial intelligence meets human creativity - Two epic journeys of building production software together">
      <HomepageHeader />
      <main>
        <ProjectShowcase />
      </main>
    </Layout>
  );
}