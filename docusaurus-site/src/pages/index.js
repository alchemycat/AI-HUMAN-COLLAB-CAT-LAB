import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          <Translate id="homepage.title">AI-Human Collaboration Laboratory</Translate>
        </h1>
        <p className="hero__subtitle">
          <Translate id="homepage.subtitle">
            When artificial intelligence meets human creativity, extraordinary things happen.
          </Translate>
          <br/>
          <Translate id="homepage.subtitle2">
            Two epic journeys of building production software together.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            <Translate id="homepage.enterLab">🎬 Enter the Laboratory</Translate>
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
        <h2 className="text--center margin-bottom--lg">
          <Translate id="homepage.twoStories">Two Epic Stories of AI-Human Innovation</Translate>
        </h2>
        
        {/* Project 01 Card */}
        <div className={clsx('row', styles.projectCard)}>
          <div className="col col--6">
            <div className={styles.projectImage}>
              <div className={styles.moviePoster}>
                <h3><Translate id="homepage.module01">🌱 Module 01</Translate></h3>
                <h2><Translate id="homepage.module01.title">From Concept to Event Pass</Translate></h2>
                <p className={styles.tagline}>
                  <Translate id="homepage.module01.tagline">Building Multi-Chain NFT Event Passes with AI</Translate>
                </p>
                <div className={styles.stats}>
                  <span><Translate id="homepage.module01.commits">181 Commits</Translate></span> • 
                  <span><Translate id="homepage.module01.sessions">41 AI Sessions</Translate></span> • 
                  <span><Translate id="homepage.module01.words">37k Words</Translate></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.projectStory}>
              <h3><Translate id="homepage.drama">The Drama</Translate></h3>
              <p>
                <Translate id="homepage.module01.story1">
                  A human and AI embark on an ambitious mission to create NFT passes for carbon-neutral events. 
                  What starts as a simple NFT contract evolves into a production-ready, multi-chain system 
                  managing event access for 210 unique attendees with carbon offset tracking.
                </Translate>
              </p>
              <p>
                <strong><Translate id="homepage.module01.challenge">The Challenge:</Translate></strong>{' '}
                <Translate id="homepage.module01.story2">
                  Migrate from Hardhat to Foundry mid-project. Deploy identical contracts 
                  across multiple blockchains. Build 6 frontend interfaces. Optimize performance with Multicall3.
                </Translate>
              </p>
              <p>
                <strong><Translate id="homepage.module01.breakthrough">The Breakthrough:</Translate></strong>{' '}
                <Translate id="homepage.module01.story3">
                  A collaboration methodology emerges—rapid iteration, visual results, 
                  pattern recognition. Loading times drop from 30+ seconds to under 3 seconds.
                </Translate>
              </p>
              <div className={styles.projectLinks}>
                <Link to="/docs/uniserv-nft-carbon-credit/" className="button button--primary">
                  <Translate id="homepage.readCompleteStory">📖 Read the Complete Story</Translate>
                </Link>
                <Link to="/docs/uniserv-nft-carbon-credit/PROJECT_OVERVIEW" className="button button--outline button--primary">
                  <Translate id="homepage.executiveSummary">🚀 15-Min Executive Summary</Translate>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Project 02 Card */}
        <div className={clsx('row', styles.projectCard, styles.projectCardReverse)}>
          <div className="col col--6">
            <div className={styles.projectStory}>
              <h3><Translate id="homepage.mystery">The Mystery</Translate></h3>
              <p>
                <Translate id="homepage.module02.story1">
                  An AI detective dives deep into unknown production code—a sophisticated LIFF carbon offset application. 
                  278 commits, 4 contributors, 26 days of development. What secrets will the code archaeology reveal?
                </Translate>
              </p>
              <p>
                <strong><Translate id="homepage.module02.discovery">The Discovery:</Translate></strong>{' '}
                <Translate id="homepage.module02.story2">
                  This isn't tutorial code. It's serious production software with platform-specific 
                  LIFF handling, multi-chain blockchain integration, real environmental calculations, and complex payment workflows.
                </Translate>
              </p>
              <p>
                <strong><Translate id="homepage.module02.revelation">The Revelation:</Translate></strong>{' '}
                <Translate id="homepage.module02.story3">
                  How professional teams really build software—messy, iterative, human development 
                  that solves real problems. Advanced mobile integration patterns never found in documentation.
                </Translate>
              </p>
              <div className={styles.projectLinks}>
                <Link to="/docs/liff-carbon-offset-app/" className="button button--primary">
                  <Translate id="homepage.uncoverJourney">🔍 Uncover the Analysis Journey</Translate>
                </Link>
                <Link to="/docs/liff-carbon-offset-app/reports/REPOSITORY_FINAL_REPORT" className="button button--outline button--primary">
                  <Translate id="homepage.executiveAssessment">📊 Executive Assessment</Translate>
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.projectImage}>
              <div className={clsx(styles.moviePoster, styles.posterSecondary)}>
                <h3><Translate id="homepage.module02">🔍 Module 02</Translate></h3>
                <h2><Translate id="homepage.module02.title">AI Repository Detective</Translate></h2>
                <p className={styles.tagline}>
                  <Translate id="homepage.module02.tagline">Analyzing Production LIFF Carbon Technology</Translate>
                </p>
                <div className={styles.stats}>
                  <span><Translate id="homepage.module02.commits">278 Commits</Translate></span> • 
                  <span><Translate id="homepage.module02.analysis">3 Hours Analysis</Translate></span> • 
                  <span><Translate id="homepage.module02.words">15k Words</Translate></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text--center margin-top--xl">
          <h2><Translate id="homepage.chooseAdventure">Choose Your Adventure</Translate></h2>
          <p className="margin-bottom--lg">
            <Translate id="homepage.chooseAdventure.desc1">
              Two different stories, two different approaches to AI-human collaboration.
            </Translate>
            <br/>
            <Translate id="homepage.chooseAdventure.desc2">
              One builds from scratch, one analyzes existing mastery.
            </Translate>
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/docs/intro" className="button button--primary button--lg margin-horiz--sm">
              <Translate id="homepage.startOverview">🎯 Start with Overview</Translate>
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
      description={translate({
        id: 'homepage.metaDescription',
        message: 'When artificial intelligence meets human creativity - Two epic journeys of building production software together',
        description: 'The meta description for the homepage'
      })}>
      <HomepageHeader />
      <main>
        <ProjectShowcase />
      </main>
    </Layout>
  );
}