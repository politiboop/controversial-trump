import React, { useState, useEffect } from 'react';
import ControversyCard from './ControversyCard';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import styles from './CategoryPage.module.css';

// Import data
import categoriesData from '../../categories.json';
import { controversyIndex } from '../../data/controversyIndex';

const CategoryPage = ({ categoryId, onControversyClick, onBack }) => {
  const [controversies, setControversies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date-desc');

  const category = categoriesData.categories[categoryId];
  const severityLevels = categoriesData.severityLevels;

  useEffect(() => {
    const loadControversies = async () => {
      setLoading(true);
      try {
        // Filter index by category FIRST to only load needed files
        const categoryControversies = controversyIndex.filter(
          (c) => c.primaryCategory === categoryId
        );

        // Only load the JSON files for this category
        const loadedControversies = await Promise.all(
          categoryControversies.map(async (item) => {
            try {
              const module = await import(`../../data/controversies/${item.filename}.json`);
              return module.default;
            } catch (err) {
              console.error(`Failed to load ${item.filename}:`, err);
              return null;
            }
          })
        );

        const filtered = loadedControversies.filter(Boolean);
        setControversies(filtered);
      } catch (err) {
        console.error('Failed to load controversies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadControversies();
  }, [categoryId]);

  // Sort controversies
  const sortedControversies = React.useMemo(() => {
    const sorted = [...controversies];

    switch (sortBy) {
      case 'date-desc':
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'severity':
        sorted.sort((a, b) => {
          const order = { catastrophic: 0, serious: 1, concerning: 2, disputed: 3, absurd: 4 };
          return order[a.severity] - order[b.severity];
        });
        break;
      case 'sources':
        sorted.sort((a, b) => (b.sources?.length || 0) - (a.sources?.length || 0));
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return sorted;
  }, [controversies, sortBy]);

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', path: '/' },
          { label: category.title, path: `/category/${categoryId}` }
        ]}
      />

      {/* Header */}
      <div className={styles.header} style={{ borderColor: category.color }}>
        <button onClick={onBack} className={styles.backButton}>
          ← Back
        </button>
        <div className={styles.headerContent}>
          <span className={styles.icon}>{category.icon}</span>
          <div>
            <h1 className={styles.title}>{category.title}</h1>
            <p className={styles.description}>{category.description}</p>
          </div>
        </div>
        <div className={styles.stats}>
          <span className={styles.count}>
            {controversies.length} {controversies.length === 1 ? 'controversy' : 'controversies'}
          </span>
        </div>
      </div>

      {/* Sort Controls */}
      {!loading && controversies.length > 1 && (
        <div className={styles.sortControls}>
          <label htmlFor="sort-select" className={styles.sortLabel}>Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="severity">Most Severe First</option>
            <option value="sources">Most Sources First</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
        </div>
      )}

      {/* Controversies Grid */}
      {loading ? (
        <div className={styles.loading}>Loading controversies...</div>
      ) : controversies.length === 0 ? (
        <div className={styles.empty}>No controversies found in this category.</div>
      ) : (
        <div className={styles.grid}>
          {sortedControversies.map((controversy) => (
            <ControversyCard
              key={controversy.id}
              controversy={controversy}
              severityLevel={severityLevels[controversy.severity]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
