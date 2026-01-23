import React, { useEffect } from 'react';
import styles from './ControversyDetail.module.css';

// Import data
import categoriesData from '../../categories.json';

const ControversyDetail = ({ controversy, onClose }) => {
  const severityLevel = categoriesData.severityLevels[controversy.severity];
  const category = categoriesData.categories[controversy.primaryCategory];
  const timeline = categoriesData.timelines[controversy.timeline];

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
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControversyDetail;
