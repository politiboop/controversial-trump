import React, { useState, useEffect } from 'react';
import CategoryTile from './CategoryTile';
import TimelineBar from './TimelineBar';
import styles from './LandingPage.module.css';

// Import data
import categoriesData from '../../categories.json';
import { controversyIndex } from '../../data/controversyIndex';

const LandingPage = ({ onCategoryClick, onTimelineClick }) => {
  const [controversyCount, setControversyCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [timelineCounts, setTimelineCounts] = useState({});

  useEffect(() => {
    // Calculate counts from index (no need to load all JSON files!)
    const catCounts = {};
    const timeCounts = {};

    controversyIndex.forEach((controversy) => {
      // Count by primary category
      const cat = controversy.primaryCategory;
      catCounts[cat] = (catCounts[cat] || 0) + 1;

      // Count by timeline
      const timeline = controversy.timeline;
      timeCounts[timeline] = (timeCounts[timeline] || 0) + 1;
    });

    setControversyCount(controversyIndex.length);
    setCategoryCounts(catCounts);
    setTimelineCounts(timeCounts);
  }, []);

  const categoryOrder = [
    'democracy',
    'women',
    'racism',
    'corruption',
    'abuse-of-power',
    'character',
    'narcissism',
    'rewriting-history',
    'ice-enforcement',
    'covid',
    'absurd',
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Trump Controversies Tracker</h1>
        <p className={styles.heroSubtitle}>
          A comprehensive, sourced database of controversies, criticisms, and concerns about
          Donald Trump from his presidency and beyond.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{controversyCount}</span>
            <span className={styles.statLabel}>Controversies Documented</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>11</span>
            <span className={styles.statLabel}>Major Categories</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>5</span>
            <span className={styles.statLabel}>Timeline Periods</span>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Browse by Category</h2>
        <div className={styles.categoryGrid}>
          {categoryOrder.map((categoryId) => {
            const category = categoriesData.categories[categoryId];
            const count = categoryCounts[categoryId] || 0;

            return (
              <CategoryTile
                key={categoryId}
                category={category}
                controversyCount={count}
                onClick={() => onCategoryClick(categoryId)}
              />
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.section}>
        <TimelineBar
          timelines={categoriesData.timelines}
          timelineCounts={timelineCounts}
          onTimelineClick={onTimelineClick}
        />
      </section>

      {/* Footer Note */}
      <div className={styles.note}>
        <p>
          <strong>Note:</strong> This is an explicitly one-sided compilation of controversies and
          criticisms. All claims are sourced. Where Trump denies allegations, this is noted.
          Disputed claims are identified as such.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
