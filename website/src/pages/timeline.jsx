import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import { Timeline as VisTimeline } from 'vis-timeline/standalone';
import { DataSet } from 'vis-data';
import { controversyIndex } from '../data/controversyIndex';
import categoriesData from '../categories.json';
import 'vis-timeline/styles/vis-timeline-graph2d.css';
import styles from './timeline.module.css';

export default function TimelinePage() {
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const severityLevels = categoriesData.severityLevels;

  useEffect(() => {
    if (!timelineRef.current) return;

    // Prepare timeline items from controversies
    const items = controversyIndex
      .filter(c => {
        if (filter === 'all') return true;
        return c.timeline === filter;
      })
      .filter(c => {
        if (selectedSeverity === 'all') return true;
        return c.severity === selectedSeverity;
      })
      .map(controversy => {
        const severity = severityLevels[controversy.severity];
        const date = new Date(controversy.date);

        // Truncate title for display
        const displayTitle = controversy.title.length > 60
          ? controversy.title.substring(0, 60) + '...'
          : controversy.title;

        return {
          id: controversy.id,
          content: `<div class="timeline-item">
            <div class="timeline-item-icon">${severity.icon}</div>
            <div class="timeline-item-title">${displayTitle}</div>
          </div>`,
          start: date,
          type: 'box',
          className: `severity-${controversy.severity}`,
          style: `background-color: ${severity.color}; border-color: ${severity.color};`,
          title: controversy.summary.substring(0, 300) + '...'
        };
      });

    const dataset = new DataSet(items);

    // Timeline options
    const options = {
      width: '100%',
      height: '700px',
      margin: {
        item: {
          horizontal: 10,
          vertical: 10
        },
        axis: 40
      },
      orientation: 'top',
      stack: true,
      stackSubgroups: true,
      showCurrentTime: false,
      zoomMin: 1000 * 60 * 60 * 24 * 7, // 1 week
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 15, // 15 years
      tooltip: {
        followMouse: true,
        overflowMethod: 'cap'
      },
      verticalScroll: true,
      horizontalScroll: true,
      format: {
        minorLabels: {
          minute: 'h:mma',
          hour: 'ha',
          weekday: 'ddd D',
          day: 'D',
          week: 'w',
          month: 'MMM',
          year: 'YYYY'
        },
        majorLabels: {
          minute: 'ddd D MMMM',
          hour: 'ddd D MMMM',
          weekday: 'MMMM YYYY',
          day: 'MMMM YYYY',
          week: 'MMMM YYYY',
          month: 'YYYY',
          year: ''
        }
      }
    };

    // Create timeline
    if (timelineInstance.current) {
      timelineInstance.current.destroy();
    }

    timelineInstance.current = new VisTimeline(timelineRef.current, dataset, options);

    // Handle click events
    timelineInstance.current.on('select', (properties) => {
      if (properties.items.length > 0) {
        const controversyId = properties.items[0];
        history.push(`/controversy?id=${controversyId}`);
      }
    });

    // Set initial view to show a good range
    if (items.length > 0) {
      // Find date range of items
      const dates = items.map(item => item.start);
      const minDate = new Date(Math.min(...dates));
      const maxDate = new Date(Math.max(...dates));

      // Add some padding (10% on each side)
      const range = maxDate - minDate;
      const paddedMin = new Date(minDate.getTime() - range * 0.1);
      const paddedMax = new Date(maxDate.getTime() + range * 0.1);

      timelineInstance.current.setWindow(paddedMin, paddedMax);
    }

    setLoading(false);

    // Cleanup
    return () => {
      if (timelineInstance.current) {
        timelineInstance.current.destroy();
        timelineInstance.current = null;
      }
    };
  }, [filter, selectedSeverity, history, severityLevels]);

  const handleFit = () => {
    if (timelineInstance.current) {
      timelineInstance.current.fit();
    }
  };

  const handleZoomIn = () => {
    if (timelineInstance.current) {
      timelineInstance.current.zoomIn(0.5);
    }
  };

  const handleZoomOut = () => {
    if (timelineInstance.current) {
      timelineInstance.current.zoomOut(0.5);
    }
  };

  return (
    <Layout
      title="Interactive Timeline"
      description="Explore Trump controversies on an interactive timeline"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Interactive Timeline</h1>
            <p className={styles.subtitle}>
              Explore {controversyIndex.length} controversies across time. Click any event to learn more.
            </p>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Timeline Period:</label>
              <select
                className={styles.filterSelect}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Periods</option>
                {Object.entries(categoriesData.timelines).map(([key, timeline]) => (
                  <option key={key} value={key}>{timeline.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Severity:</label>
              <select
                className={styles.filterSelect}
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
              >
                <option value="all">All Severities</option>
                {Object.entries(severityLevels).map(([key, level]) => (
                  <option key={key} value={key}>{level.icon} {level.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <button onClick={handleZoomIn} className={styles.controlButton}>
              🔍+ Zoom In
            </button>
            <button onClick={handleZoomOut} className={styles.controlButton}>
              🔍- Zoom Out
            </button>
            <button onClick={handleFit} className={styles.controlButton}>
              📏 Fit All
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendTitle}>Severity Legend:</div>
          <div className={styles.legendItems}>
            {Object.entries(severityLevels).map(([key, level]) => (
              <div key={key} className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: level.color }}
                />
                <span className={styles.legendLabel}>
                  {level.icon} {level.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        {loading && <div className={styles.loading}>Loading timeline...</div>}
        <div ref={timelineRef} className={styles.timeline} />

        {/* Instructions */}
        <div className={styles.instructions}>
          <h3>How to use:</h3>
          <ul>
            <li>📅 <strong>Click</strong> any event to view full details</li>
            <li>🖱️ <strong>Drag</strong> to pan left/right</li>
            <li>🔍 <strong>Scroll</strong> to zoom in/out</li>
            <li>🎯 Use <strong>Fit All</strong> to see entire timeline</li>
            <li>🔎 Use <strong>filters</strong> to narrow by period or severity</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
