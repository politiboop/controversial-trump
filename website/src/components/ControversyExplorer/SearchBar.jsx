import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, resultsCount }) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search controversies..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {value && (
        <span className={styles.resultsCount}>
          {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
