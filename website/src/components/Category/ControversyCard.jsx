import React from 'react';
import styles from './ControversyCard.module.css';

const ControversyCard = ({ controversy, severityLevel, onClick }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Severity Badge */}
      <div className={styles.severityBadge} style={{ backgroundColor: severityLevel.color }}>
        <span className={styles.severityIcon}>{severityLevel.icon}</span>
        <span className={styles.severityLabel}>{severityLevel.label}</span>
      </div>

      {/* Title */}
      <h3 className={styles.title}>{controversy.title}</h3>

      {/* Date */}
      <div className={styles.date}>{formatDate(controversy.date)}</div>

      {/* Summary */}
      <p className={styles.summary}>{controversy.summary}</p>

      {/* Tags */}
      {controversy.specialTags && controversy.specialTags.length > 0 && (
        <div className={styles.tags}>
          {controversy.specialTags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.sourcesCount}>
          {controversy.sources.length} {controversy.sources.length === 1 ? 'source' : 'sources'}
        </span>
        <span className={styles.readMore}>Read more →</span>
      </div>
    </div>
  );
};

export default ControversyCard;
