import React, { useEffect, useMemo } from 'react';
import styles from './ControversyDetail.module.css';

// Import data
import categoriesData from '../../categories.json';
import { controversyIndex } from '../../data/controversyIndex';

const ControversyDetail = ({ controversy, onClose }) => {
  const severityLevel = categoriesData.severityLevels[controversy.severity];
  const category = categoriesData.categories[controversy.primaryCategory];
  const timeline = categoriesData.timelines[controversy.timeline];

  // Find related controversies based on shared tags or category
  const relatedControversies = useMemo(() => {
    if (!controversy) return [];

    return controversyIndex
      .filter(c => {
        // Don't include the current controversy
        if (c.id === controversy.id) return false;

        // Check if they share the same category
        if (c.primaryCategory === controversy.primaryCategory) return true;

        // Check if they share any tags
        if (controversy.specialTags && c.specialTags) {
          const sharedTags = c.specialTags.some(tag =>
            controversy.specialTags.includes(tag)
          );
          if (sharedTags) return true;
        }

        return false;
      })
      .slice(0, 6); // Limit to 6 related controversies
  }, [controversy]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
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
                  <a
                    key={idx}
                    href={`/tags?tag=${encodeURIComponent(tag)}`}
                    className={styles.tag}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Related Controversies */}
          {relatedControversies.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Related Controversies ({relatedControversies.length})
              </h2>
              <p className={styles.sectionIntro}>
                Other controversies in the same category or with shared tags
              </p>
              <div className={styles.relatedGrid}>
                {relatedControversies.map((related) => {
                  const relatedSeverity = categoriesData.severityLevels[related.severity];
                  return (
                    <a
                      key={related.id}
                      href={`/controversy?id=${related.id}`}
                      className={styles.relatedCard}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className={styles.relatedHeader}>
                        <h4 className={styles.relatedTitle}>{related.title}</h4>
                        {relatedSeverity && (
                          <span
                            className={styles.relatedSeverityBadge}
                            style={{
                              backgroundColor: relatedSeverity.color + '30',
                              color: relatedSeverity.color
                            }}
                          >
                            {relatedSeverity.icon}
                          </span>
                        )}
                      </div>
                      <p className={styles.relatedSummary}>
                        {related.summary.length > 100
                          ? related.summary.substring(0, 100) + '...'
                          : related.summary}
                      </p>
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControversyDetail;
