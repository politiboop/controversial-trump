import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import categoriesData from '../categories.json';
import styles from './controversy.module.css';

export default function ControversyPage() {
  const location = useLocation();
  const history = useHistory();
  const [controversy, setControversy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadControversy = async () => {
      setLoading(true);
      setError(null);

      // Get controversy ID from URL parameter
      const params = new URLSearchParams(location.search);
      const id = params.get('id');

      if (!id) {
        setError('No controversy ID provided');
        setLoading(false);
        return;
      }

      try {
        // Load the controversy JSON file
        const module = await import(`../data/controversies/${id}.json`);
        setControversy(module.default);
      } catch (err) {
        console.error(`Failed to load controversy ${id}:`, err);
        setError('Controversy not found');
      } finally {
        setLoading(false);
      }
    };

    loadControversy();
  }, [location.search]);

  const handleBack = () => {
    if (window.history.length > 1) {
      history.goBack();
    } else {
      history.push('/');
    }
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading controversy">
        <div className={styles.container}>
          <div className={styles.loading}>Loading controversy...</div>
        </div>
      </Layout>
    );
  }

  if (error || !controversy) {
    return (
      <Layout title="Not Found" description="Controversy not found">
        <div className={styles.container}>
          <div className={styles.error}>
            <h1>Controversy Not Found</h1>
            <p>{error || 'The requested controversy could not be found.'}</p>
            <button onClick={handleBack} className={styles.backButton}>
              ← Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const severityLevel = categoriesData.severityLevels[controversy.severity];
  const category = categoriesData.categories[controversy.primaryCategory];
  const timeline = categoriesData.timelines[controversy.timeline];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Create meta description from summary
  const metaDescription = controversy.summary.substring(0, 160) + (controversy.summary.length > 160 ? '...' : '');

  return (
    <Layout
      title={controversy.title}
      description={metaDescription}
    >
      {/* Open Graph meta tags for social sharing */}
      <head>
        <meta property="og:title" content={controversy.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://controversial-trump.vercel.app/controversy?id=${controversy.id}`} />
        <meta property="article:published_time" content={controversy.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={controversy.title} />
        <meta name="twitter:description" content={metaDescription} />
      </head>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Back
          </button>

          {/* Metadata */}
          <div className={styles.metadata}>
            <div className={styles.severityBadge} style={{ backgroundColor: severityLevel.color }}>
              <span>{severityLevel.icon}</span>
              <span>{severityLevel.label}</span>
            </div>

            <div className={styles.categoryBadge} style={{ borderColor: category.color }}>
              <span>{category.icon}</span>
              <span>{category.title}</span>
            </div>

            <div className={styles.timelineBadge}>
              <span>📅</span>
              <span>{timeline.label}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className={styles.title}>{controversy.title}</h1>

          {/* Date */}
          <div className={styles.date}>{formatDate(controversy.date)}</div>

          {/* Share Button */}
          <div className={styles.shareSection}>
            <button
              className={styles.shareButton}
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({
                    title: controversy.title,
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
            <p className={styles.summary}>{controversy.summary}</p>
          </section>

          {/* Key Facts */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Facts</h2>
            <ul className={styles.factsList}>
              {controversy.keyFacts.map((fact, idx) => (
                <li key={idx} className={styles.fact}>
                  {fact}
                </li>
              ))}
            </ul>
          </section>

          {/* Sources */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Sources ({controversy.sources.length})
            </h2>
            <div className={styles.sources}>
              {controversy.sources.map((source, idx) => (
                <div key={idx} className={styles.source}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                  >
                    <span className={styles.sourceLinkIcon}>🔗</span>
                    <span className={styles.sourceLinkText}>{source.text}</span>
                  </a>
                  {source.type && <span className={styles.sourceType}>{source.type}</span>}
                </div>
              ))}
            </div>
          </section>

          {/* Tags */}
          {controversy.specialTags && controversy.specialTags.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Tags</h2>
              <div className={styles.tags}>
                {controversy.specialTags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}
