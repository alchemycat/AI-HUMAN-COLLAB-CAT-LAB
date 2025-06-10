import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ProjectEntry = {
  title: string;
  date: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: ReactNode;
  highlights: string[];
  link: string;
};

const ProjectTimeline: ProjectEntry[] = [
  {
    title: 'Project 001: Uniserv NFT Carbon Credit System',
    date: 'May 30 - June 10, 2025',
    duration: '11 days',
    status: 'completed',
    description: (
      <>
        <strong>🚀 Latest Collaboration:</strong> Built a production-ready multi-chain NFT carbon credit platform through intensive AI-human partnership.
      </>
    ),
    highlights: [
      '181 commits across 13+ intensive sessions',
      'Multi-chain deployment (Sichang, JBC) with deterministic addresses',
      '90% performance improvement through Multicall3 optimization',
      '6 production frontend interfaces',
      '37,396 words of comprehensive documentation'
    ],
    link: '/docs/uniserv-nft-carbon-credit/INDEX',
  },
  {
    title: 'Project 002: [Future Collaboration]',
    date: 'Coming Soon',
    duration: 'TBD',
    status: 'planned',
    description: (
      <>
        <strong>🔮 Next Chapter:</strong> Ready for the next AI-human collaboration challenge. Stay tuned for our upcoming development adventure.
      </>
    ),
    highlights: [
      'New technology stack to explore',
      'Different collaboration patterns to test',
      'Enhanced documentation methodology',
      'Community feedback integration'
    ],
    link: '#',
  },
];

function ProjectCard({title, date, duration, status, description, highlights, link}: ProjectEntry) {
  const statusEmoji = {
    'completed': '✅',
    'in-progress': '🚧', 
    'planned': '📋'
  };

  const statusColor = {
    'completed': 'success',
    'in-progress': 'warning',
    'planned': 'secondary'
  };

  return (
    <div className={clsx('col col--12', 'margin-bottom--lg')}>
      <div className={clsx('card', 'shadow--md')}>
        <div className="card__header">
          <div className="row">
            <div className="col">
              <Heading as="h3" className="margin-bottom--none">
                {statusEmoji[status]} {title}
              </Heading>
              <div className="margin-top--sm">
                <span className={clsx('badge', `badge--${statusColor[status]}`)}>
                  📅 {date}
                </span>
                <span className={clsx('badge', 'badge--primary', 'margin-left--sm')}>
                  ⏱️ {duration}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card__body">
          <p>{description}</p>
          
          <div className="margin-top--md">
            <strong>🎯 Key Achievements:</strong>
            <ul className="margin-top--sm">
              {highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
        {status !== 'planned' && (
          <div className="card__footer">
            <Link
              className="button button--primary"
              to={link}>
              📖 Read Complete Story
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">🗓️ Development Diary Timeline</Heading>
          <p className="margin-bottom--lg">
            A chronological journey through AI-human collaborative development projects
          </p>
        </div>
        
        <div className="row">
          {ProjectTimeline.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>

        <div className="text--center margin-top--lg">
          <div className="card shadow--md">
            <div className="card__body">
              <Heading as="h3">📊 Overall Statistics</Heading>
              <div className="row">
                <div className="col col--3">
                  <div className="text--center">
                    <strong style={{fontSize: '2rem', color: 'var(--ifm-color-primary)'}}>1</strong>
                    <div>Completed Projects</div>
                  </div>
                </div>
                <div className="col col--3">
                  <div className="text--center">
                    <strong style={{fontSize: '2rem', color: 'var(--ifm-color-primary)'}}>37,396+</strong>
                    <div>Documentation Words</div>
                  </div>
                </div>
                <div className="col col--3">
                  <div className="text--center">
                    <strong style={{fontSize: '2rem', color: 'var(--ifm-color-primary)'}}>181+</strong>
                    <div>Commits Analyzed</div>
                  </div>
                </div>
                <div className="col col--3">
                  <div className="text--center">
                    <strong style={{fontSize: '2rem', color: 'var(--ifm-color-primary)'}}>41+</strong>
                    <div>Session Documents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
