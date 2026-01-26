import React, { useState, useEffect } from 'react';
import ControversyCard from './ControversyCard';
import styles from './CategoryPage.module.css';

// Import data
import categoriesData from '../../categories.json';
import { controversyIndex } from '../../data/controversyIndex';

const CategoryPage = ({ categoryId, onControversyClick, onBack }) => {
  const [controversies, setControversies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className={styles.container}>
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

      {/* Controversies Grid */}
      {loading ? (
        <div className={styles.loading}>Loading controversies...</div>
      ) : controversies.length === 0 ? (
        <div className={styles.empty}>No controversies found in this category.</div>
      ) : (
        <div className={styles.grid}>
          {controversies.map((controversy) => (
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
