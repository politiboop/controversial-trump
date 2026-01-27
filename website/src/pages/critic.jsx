import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import styles from './critic.module.css';

export default function CriticPage() {
  const location = useLocation();
  const history = useHistory();
  const [critic, setCritic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCritic = async () => {
      setLoading(true);
      setError(null);

      // Get critic ID from URL parameter
      const params = new URLSearchParams(location.search);
      const id = params.get('id');

      if (!id) {
        setError('No critic ID provided');
        setLoading(false);
        return;
      }

      try {
        // Load the critic JSON file
        const module = await import(`../data/critics/${id}.json`);
        setCritic(module.default);
      } catch (err) {
        console.error(`Failed to load critic ${id}:`, err);
        setError('Critic profile not found');
      } finally {
        setLoading(false);
      }
    };

    loadCritic();
  }, [location.search]);

  const handleBack = () => {
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push('/critics');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading critic profile">
        <div className={styles.container}>
          <div className={styles.loading}>Loading critic profile...</div>
        </div>
      </Layout>
    );
  }

  if (error || !critic) {
    return (
      <Layout title="Not Found" description="Critic not found">
        <div className={styles.container}>
          <div className={styles.error}>
            <h1>Critic Profile Not Found</h1>
            <p>{error || 'The requested critic profile could not be found.'}</p>
            <button onClick={handleBack} className={styles.backButton}>
              ← Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Create meta description from summary
  const metaDescription = critic.summary.substring(0, 160) + (critic.summary.length > 160 ? '...' : '');

  return (
    <Layout
      title={critic.name}
      description={metaDescription}
    >
      {/* Open Graph meta tags for social sharing */}
      <head>
        <meta property="og:title" content={`${critic.name} - Trump Critic`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://controversial-trump.vercel.app/critic?id=${critic.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${critic.name} - Trump Critic`} />
        <meta name="twitter:description" content={metaDescription} />
      </head>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Back to Critics
          </button>

          {/* Name and Title */}
          <h1 className={styles.name}>{critic.name}</h1>
          <div className={styles.role}>
            {critic.role}
            {critic.administration && ` • ${critic.administration}`}
            {critic.years && ` (${critic.years})`}
          </div>

          {/* Military Rank if applicable */}
          {critic.militaryRank && (
            <div className={styles.militaryRank}>
              🎖️ {critic.militaryRank}
            </div>
          )}

          {/* Party Badge */}
          {critic.party && (
            <div className={`${styles.partyBadge} ${styles[`party${critic.party}`]}`}>
              {critic.party === 'Republican' && '🐘'}
              {critic.party === 'Democrat' && '🐴'}
              {critic.party === 'Independent' && '🗽'}
              {critic.party === 'Libertarian' && '🗽'}
              {' '}{critic.party}
            </div>
          )}

          {/* Category Badge */}
          <div className={styles.categoryBadge}>
            {critic.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>

          {/* Share Button */}
          <div className={styles.shareSection}>
            <button
              className={styles.shareButton}
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: `${critic.name} - Trump Critic`,
                    text: metaDescription,
                    url: url
                  }).catch(err => console.log('Share failed:', err));
                } else {
                  navigator.clipboard.writeText(url);
                  alert('Link copied to clipboard!');
                }
              }}
            >
              🔗 Share
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Summary */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Summary</h2>
            <p className={styles.summary}>{critic.summary}</p>
          </section>

          {/* Key Statements */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Statements</h2>
            <div className={styles.statements}>
              {critic.keyStatements.map((statement, idx) => (
                <div key={idx} className={styles.statement}>
                  <blockquote className={styles.quote}>"{statement.quote}"</blockquote>
                  <div className={styles.statementMeta}>
                    <span className={styles.statementDate}>{formatDate(statement.date)}</span>
                    <span className={styles.statementSource}>{statement.source}</span>
                  </div>
                  {statement.context && (
                    <div className={styles.statementContext}>{statement.context}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          {critic.timeline && critic.timeline.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Timeline</h2>
              <div className={styles.timeline}>
                {critic.timeline.map((event, idx) => (
                  <div key={idx} className={styles.timelineEvent}>
                    <div className={styles.timelineDate}>{event.date}</div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineEventTitle}>{event.event}</div>
                      <div className={styles.timelineSignificance}>{event.significance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Credibility */}
          {critic.credibility && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Credibility & Background</h2>
              <p className={styles.background}>{critic.credibility.background}</p>

              {critic.credibility.positions && critic.credibility.positions.length > 0 && (
                <>
                  <h3 className={styles.subsectionTitle}>Positions Held</h3>
                  <ul className={styles.positionsList}>
                    {critic.credibility.positions.map((position, idx) => (
                      <li key={idx} className={styles.position}>{position}</li>
                    ))}
                  </ul>
                </>
              )}

              {critic.credibility.awards && critic.credibility.awards.length > 0 && (
                <>
                  <h3 className={styles.subsectionTitle}>Awards & Honors</h3>
                  <ul className={styles.awardsList}>
                    {critic.credibility.awards.map((award, idx) => (
                      <li key={idx} className={styles.award}>🏅 {award}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          )}

          {/* Opposition Reasons */}
          {critic.oppositionReasons && critic.oppositionReasons.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Reasons for Opposition</h2>
              <ul className={styles.reasonsList}>
                {critic.oppositionReasons.map((reason, idx) => (
                  <li key={idx} className={styles.reason}>{reason}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Endorsement */}
          {critic.endorsement && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Electoral Position</h2>
              <p className={styles.endorsement}>{critic.endorsement}</p>
            </section>
          )}

          {/* Sources */}
          {critic.sources && critic.sources.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Sources ({critic.sources.length})
              </h2>
              <div className={styles.sources}>
                {critic.sources.map((source, idx) => (
                  <div key={idx} className={styles.source}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      <span className={styles.sourceLinkIcon}>🔗</span>
                      <span className={styles.sourceLinkText}>{source.title}</span>
                    </a>
                    <div className={styles.sourceMeta}>
                      {source.date && <span className={styles.sourceDate}>{source.date}</span>}
                      {source.type && <span className={styles.sourceType}>{source.type}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
