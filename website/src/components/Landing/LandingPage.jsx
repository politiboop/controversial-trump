import React, { useState, useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import CategoryTile from './CategoryTile';
import TimelineBar from './TimelineBar';
import SearchBar from '../Search/SearchBar';
import styles from './LandingPage.module.css';

// Import data
import categoriesData from '../../categories.json';
import { controversyIndex } from '../../data/controversyIndex';

const LandingPage = ({ onCategoryClick, onTimelineClick }) => {
  const history = useHistory();
  const [controversyCount, setControversyCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [timelineCounts, setTimelineCounts] = useState({});

  // Get featured controversies (most severe and recent)
  const featuredControversies = React.useMemo(() => {
    return controversyIndex
      .filter(c => c.severity === 'catastrophic' || c.severity === 'serious')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6);
  }, []);

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
    'public-health',
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
        <div className={styles.searchWrapper}>
          <SearchBar placeholder="Search controversies..." />
        </div>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{controversyCount}</span>
            <span className={styles.statLabel}>Controversies Documented</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{Object.keys(categoryCounts).length}</span>
            <span className={styles.statLabel}>Major Categories</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{Object.keys(timelineCounts).length}</span>
            <span className={styles.statLabel}>Timeline Periods</span>
          </div>
        </div>
      </div>

      {/* Browse All CTA */}
      <div className={styles.browseAllCTA}>
        <h2>Explore All {controversyCount} Controversies</h2>
        <p>Use advanced filters to find exactly what you're looking for</p>
        <button
          className={styles.browseAllButton}
          onClick={() => history.push('/browse')}
        >
          Browse All Controversies →
        </button>
      </div>

      {/* Featured Controversies */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Recent Major Controversies</h2>
        <p className={styles.sectionSubheading}>
          Latest catastrophic and serious controversies from Trump's presidency
        </p>
        <div className={styles.featuredGrid}>
          {featuredControversies.map((controversy) => {
            const categoryData = categoriesData.categories[controversy.primaryCategory];
            const severityData = categoriesData.severityLevels[controversy.severity];

            return (
              <a
                key={controversy.id}
                href={`/controversy?id=${controversy.id}`}
                className={styles.featuredCard}
              >
                <div className={styles.featuredHeader}>
                  <h3 className={styles.featuredTitle}>{controversy.title}</h3>
                  {severityData && (
                    <span
                      className={styles.featuredSeverityBadge}
                      style={{
                        backgroundColor: severityData.color + '20',
                        color: severityData.color,
                        borderColor: severityData.color
                      }}
                    >
                      {severityData.icon} {severityData.label}
                    </span>
                  )}
                </div>

                <p className={styles.featuredSummary}>
                  {controversy.summary.length > 150
                    ? controversy.summary.substring(0, 150) + '...'
                    : controversy.summary}
                </p>

                <div className={styles.featuredMeta}>
                  {categoryData && (
                    <span className={styles.featuredMetaBadge} style={{ color: categoryData.color }}>
                      {categoryData.icon} {categoryData.title}
                    </span>
                  )}
                  {controversy.date && (
                    <span className={styles.featuredMetaBadge}>
                      📅 {new Date(controversy.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

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
