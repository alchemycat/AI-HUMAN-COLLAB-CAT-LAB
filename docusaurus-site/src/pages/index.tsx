import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          📖 {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          🤖👨‍💻 {siteConfig.tagline}
        </p>
        <p style={{fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9}}>
          A chronological archive of real AI-human collaboration sessions, complete with honest reflections, 
          technical challenges, and breakthrough moments from intensive development partnerships.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/uniserv-nft-carbon-credit/INDEX">
            📚 Latest Project Story
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro"
            style={{marginLeft: '1rem'}}>
            🚀 Explore All Projects
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
