import React from 'react';
import Markdown from 'react-markdown';
import styles from './ControversyDetail.module.css';

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

export default function ControversyDetail({ controversy, onClose }) {
  if (!controversy) return null;

  const { title, description, date, dateRange, tags, sources, keyPoints, quotes, metadata } = controversy;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.meta}>
              <span className={styles.date}>
                {dateRange ? `${formatDate(dateRange.start)} - ${dateRange.end ? formatDate(dateRange.end) : 'Present'}` : formatDate(date)}
              </span>
              <span
                className={styles.severityBadge}
                style={{ backgroundColor: SEVERITY_COLORS[tags.severity] }}
              >
                {tags.severity.replace('-', ' ')}
              </span>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Tags */}
          <div className={styles.tags}>
            {tags.timeline.map(tag => (
              <span key={tag} className={`${styles.tag} ${styles.timeline}`}>{tag}</span>
            ))}
            {tags.type.map(tag => (
              <span key={tag} className={`${styles.tag} ${styles.type}`}>{tag}</span>
            ))}
            {tags.topic.map(tag => (
              <span key={tag} className={`${styles.tag} ${styles.topic}`}>{tag}</span>
            ))}
          </div>

          {/* Key Points */}
          {keyPoints && keyPoints.length > 0 && (
            <div className={styles.section}>
              <h3>Key Points</h3>
              <ul className={styles.keyPoints}>
                {keyPoints.map((point, i) => (
                  <li key={i}>
                    <Markdown>{point}</Markdown>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Description */}
          <div className={styles.section}>
            <h3>Details</h3>
            <div className={styles.description}>
              <Markdown>{description}</Markdown>
            </div>
          </div>

          {/* Quotes */}
          {quotes && quotes.length > 0 && (
            <div className={styles.section}>
              <h3>Notable Quotes</h3>
              {quotes.map((quote, i) => (
                <blockquote key={i} className={styles.quote}>
                  <p>"{quote.text}"</p>
                  <cite>
                    — {quote.speaker}
                    {quote.date && ` (${formatDate(quote.date)})`}
                    {quote.context && ` - ${quote.context}`}
                  </cite>
                </blockquote>
              ))}
            </div>
          )}

          {/* Sources */}
          {sources && sources.length > 0 && (
            <div className={styles.section}>
              <h3>Sources ({sources.length})</h3>
              <ul className={styles.sources}>
                {sources.map((source, i) => (
                  <li key={i}>
                    {source.url ? (
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.text}
                      </a>
                    ) : (
                      source.text
                    )}
                    {source.type && <span className={styles.sourceType}> [{source.type}]</span>}
                    {source.date && <span className={styles.sourceDate}> - {formatDate(source.date)}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
