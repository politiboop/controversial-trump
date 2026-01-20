import React from 'react';
import styles from './ControversyCard.module.css';

const SEVERITY_COLORS = {
  'court-ruling': '#dc2626',
  'verified': '#ea580c',
  'opinion': '#ca8a04',
  'disputed': '#65a30d',
  'ongoing': '#0891b2'
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function truncate(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export default function ControversyCard({ controversy, onClick }) {
  const { title, summary, description, date, tags, sources, metadata } = controversy;

  // Use summary if available, otherwise use truncated description
  const displayText = summary || truncate(description, 200);

  return (
    <article className={styles.card} onClick={onClick}>
      {/* Severity Badge */}
      <div
        className={styles.severityBadge}
        style={{ backgroundColor: SEVERITY_COLORS[tags.severity] }}
        title={tags.severity.replace('-', ' ')}
      >
        {tags.severity.replace('-', ' ')}
      </div>

      {/* Featured Star */}
      {metadata?.featured && (
        <div className={styles.featured} title="Featured controversy">
          ⭐
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{formatDate(date)}</p>
        <p className={styles.summary}>{displayText}</p>

        {/* Tags */}
        <div className={styles.tags}>
          {tags.timeline.slice(0, 2).map(tag => (
            <span key={tag} className={`${styles.tag} ${styles.timeline}`}>
              {tag}
            </span>
          ))}
          {tags.topic.slice(0, 3).map(tag => (
            <span key={tag} className={`${styles.tag} ${styles.topic}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.sourceCount}>
            📄 {sources.length} source{sources.length !== 1 ? 's' : ''}
          </span>
          {controversy.keyPoints && controversy.keyPoints.length > 0 && (
            <span className={styles.keyPointsCount}>
              • {controversy.keyPoints.length} key point{controversy.keyPoints.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
