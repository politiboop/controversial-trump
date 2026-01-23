import React from 'react';
import styles from './TimelineBar.module.css';

const TimelineBar = ({ timelines, timelineCounts, onTimelineClick }) => {
  const timelineOrder = ['pre-2016', 'first-term', 'between-terms', 'campaign-2024', 'second-term'];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Browse by Timeline</h2>
      <div className={styles.timeline}>
        {timelineOrder.map((timelineId) => {
          const timeline = timelines[timelineId];
          const count = timelineCounts[timelineId] || 0;

          return (
            <div
              key={timelineId}
              className={styles.period}
              onClick={() => onTimelineClick(timelineId)}
            >
              <div className={styles.periodHeader}>
                <h4 className={styles.periodLabel}>{timeline.label}</h4>
                <span className={styles.periodRange}>{timeline.range}</span>
              </div>
              <p className={styles.periodDescription}>{timeline.description}</p>
              <div className={styles.periodFooter}>
                <span className={styles.periodCount}>
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineBar;
