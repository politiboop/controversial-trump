import React, { useState, useEffect } from 'react';
import ControversyCard from '../Category/ControversyCard';
import styles from './TimelinePage.module.css';

// Import data
import categoriesData from '../../categories.json';
import { controversyIndex } from '../../data/controversyIndex';

const TimelinePage = ({ timelineId, onControversyClick, onBack }) => {
  const [controversies, setControversies] = useState([]);
  const [loading, setLoading] = useState(true);

  const timeline = categoriesData.timelines[timelineId];
  const severityLevels = categoriesData.severityLevels;

  useEffect(() => {
    const loadControversies = async () => {
      setLoading(true);
      try {
        // Filter index by timeline FIRST to only load needed files
        const timelineControversies = controversyIndex.filter(
          (c) => c.timeline === timelineId
        );

        // Only load the JSON files for this timeline
        const loadedControversies = await Promise.all(
          timelineControversies.map(async (item) => {
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
  }, [timelineId]);

  if (!timeline) {
    return <div>Timeline not found</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          ← Back
        </button>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>{timeline.label}</h1>
            <p className={styles.description}>{timeline.description}</p>
            <p className={styles.range}>{timeline.range}</p>
          </div>
          <div className={styles.count}>
            {controversies.length} {controversies.length === 1 ? 'controversy' : 'controversies'}
          </div>
        </div>
      </div>

      {/* Controversies Grid */}
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : controversies.length === 0 ? (
        <div className={styles.empty}>No controversies found for this timeline period.</div>
      ) : (
        <div className={styles.grid}>
          {controversies.map((controversy) => (
            <ControversyCard
              key={controversy.id}
              controversy={controversy}
              severityLevel={severityLevels[controversy.severity]}
              onClick={() => onControversyClick(controversy)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;
