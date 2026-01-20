import React from 'react';
import styles from './FilterPanel.module.css';
import tagsData from '@site/src/data/controversies.json';

const tags = tagsData.tags || {
  timeline: [],
  type: [],
  topic: [],
  severity: []
};

export default function FilterPanel({ filters, onFilterChange, onClearFilters, activeCount }) {
  const toggleFilter = (category, value) => {
    const current = filters[category];
    if (category === 'severity') {
      // Single select for severity
      onFilterChange(category, current === value ? null : value);
    } else {
      // Multi-select for others
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      onFilterChange(category, newValues);
    }
  };

  return (
    <aside className={styles.filterPanel}>
      <div className={styles.header}>
        <h3>Filters</h3>
        {activeCount > 0 && (
          <button onClick={onClearFilters} className={styles.clearAll}>
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {/* Timeline Filter */}
      <div className={styles.filterSection}>
        <h4>Timeline</h4>
        <div className={styles.filterGroup}>
          {tags.timeline.map(option => (
            <label key={option.value} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={filters.timeline.includes(option.value)}
                onChange={() => toggleFilter('timeline', option.value)}
              />
              <span className={styles.icon}>{option.icon}</span>
              <span className={styles.label}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className={styles.filterSection}>
        <h4>Type</h4>
        <div className={styles.filterGroup}>
          {tags.type.map(option => (
            <label key={option.value} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={filters.type.includes(option.value)}
                onChange={() => toggleFilter('type', option.value)}
              />
              <span className={styles.icon}>{option.icon}</span>
              <span className={styles.label}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Topic Filter */}
      <div className={styles.filterSection}>
        <h4>Topic</h4>
        <div className={styles.filterGroup}>
          {tags.topic.map(option => (
            <label key={option.value} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={filters.topic.includes(option.value)}
                onChange={() => toggleFilter('topic', option.value)}
              />
              <span className={styles.icon}>{option.icon}</span>
              <span className={styles.label}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Severity Filter */}
      <div className={styles.filterSection}>
        <h4>Evidence Level</h4>
        <div className={styles.filterGroup}>
          {tags.severity.map(option => (
            <label key={option.value} className={styles.filterOption}>
              <input
                type="radio"
                name="severity"
                checked={filters.severity === option.value}
                onChange={() => toggleFilter('severity', option.value)}
              />
              <span
                className={styles.severityDot}
                style={{ backgroundColor: option.color }}
              />
              <span className={styles.label}>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className={styles.filterSection}>
        <h4>Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className={styles.sortSelect}
        >
          <option value="priority">Priority</option>
          <option value="date">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </aside>
  );
}
