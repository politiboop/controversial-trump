import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './browse.module.css';
import { controversyIndex } from '../data/controversyIndex';
import categoriesData from '../categories.json';

export default function BrowseAll() {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedTimeline, setSelectedTimeline] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const categories = categoriesData.categories;
  const severityLevels = categoriesData.severityLevels;
  const timelines = categoriesData.timelines;

  // Get unique values for filters
  const categoryList = useMemo(() => {
    const cats = new Set(controversyIndex.map(c => c.primaryCategory));
    return Array.from(cats).sort();
  }, []);

  const severityList = useMemo(() => {
    const sevs = new Set(controversyIndex.map(c => c.severity));
    return Array.from(sevs).sort((a, b) => {
      const order = { catastrophic: 0, serious: 1, concerning: 2, disputed: 3, absurd: 4 };
      return order[a] - order[b];
    });
  }, []);

  const timelineList = useMemo(() => {
    const times = new Set(controversyIndex.map(c => c.timeline));
    return Array.from(times).sort((a, b) => {
      const order = { 'pre-2016': 0, 'first-term': 1, 'between-terms': 2, 'campaign-2024': 3, 'second-term': 4 };
      return order[a] - order[b];
    });
  }, []);

  // Filter and sort controversies
  const filteredControversies = useMemo(() => {
    let filtered = controversyIndex.filter(controversy => {
      const matchesCategory = selectedCategory === 'all' || controversy.primaryCategory === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || controversy.severity === selectedSeverity;
      const matchesTimeline = selectedTimeline === 'all' || controversy.timeline === selectedTimeline;

      const matchesSearch = !searchTerm ||
        controversy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        controversy.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (controversy.specialTags && controversy.specialTags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      return matchesCategory && matchesSeverity && matchesTimeline && matchesSearch;
    });

    // Sort
    switch (sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'severity':
        filtered.sort((a, b) => {
          const order = { catastrophic: 0, serious: 1, concerning: 2, disputed: 3, absurd: 4 };
          return order[a.severity] - order[b.severity];
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, selectedSeverity, selectedTimeline, searchTerm, sortBy]);

  const handleControversyClick = (id) => {
    history.push(`/controversy?id=${id}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSeverity('all');
    setSelectedTimeline('all');
    setSortBy('date-desc');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSeverity !== 'all' ||
                          selectedTimeline !== 'all' || searchTerm !== '';

  return (
    <Layout
      title="Browse All Controversies"
      description="Browse all Trump controversies with advanced filtering and sorting">
      <div className={styles.container}>
        <Breadcrumbs
          crumbs={[
            { label: 'Home', path: '/' },
            { label: 'Browse All', path: '/browse' }
          ]}
        />

        {/* Header */}
        <div className={styles.header}>
          <h1>Browse All Controversies</h1>
          <p className={styles.subtitle}>
            Explore all {controversyIndex.length} documented controversies with advanced filtering
          </p>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{filteredControversies.length}</span>
            <span className={styles.statLabel}>
              {filteredControversies.length === 1 ? 'Controversy' : 'Controversies'} Found
            </span>
          </div>
          {hasActiveFilters && (
            <button onClick={clearFilters} className={styles.clearButton}>
              Clear All Filters
            </button>
          )}
        </div>

        {/* Filters */}
        <div className={styles.filtersSection}>
          {/* Search */}
          <div className={styles.filterGroup}>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Categories ({controversyIndex.length})</option>
              {categoryList.map(cat => {
                const count = controversyIndex.filter(c => c.primaryCategory === cat).length;
                const categoryData = categories[cat];
                return (
                  <option key={cat} value={cat}>
                    {categoryData?.icon} {categoryData?.title || cat} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Severity Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="severity">Severity</label>
            <select
              id="severity"
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Severities ({controversyIndex.length})</option>
              {severityList.map(sev => {
                const count = controversyIndex.filter(c => c.severity === sev).length;
                const sevData = severityLevels[sev];
                return (
                  <option key={sev} value={sev}>
                    {sevData?.icon} {sevData?.label || sev} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Timeline Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="timeline">Timeline</label>
            <select
              id="timeline"
              value={selectedTimeline}
              onChange={(e) => setSelectedTimeline(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">All Periods ({controversyIndex.length})</option>
              {timelineList.map(time => {
                const count = controversyIndex.filter(c => c.timeline === time).length;
                const timeData = timelines[time];
                return (
                  <option key={time} value={time}>
                    {timeData?.label || time} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Sort By */}
          <div className={styles.filterGroup}>
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="severity">Most Severe First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        {/* No Results */}
        {filteredControversies.length === 0 && (
          <div className={styles.noResults}>
            <p>No controversies found matching your filters.</p>
            <button onClick={clearFilters} className={styles.clearButton}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Controversies Grid */}
        <div className={styles.controversiesGrid}>
          {filteredControversies.map((controversy) => {
            const categoryData = categories[controversy.primaryCategory];
            const severityData = severityLevels[controversy.severity];
            const timelineData = timelines[controversy.timeline];

            return (
              <div
                key={controversy.id}
                className={styles.controversyCard}
                onClick={() => handleControversyClick(controversy.id)}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{controversy.title}</h3>
                  <div className={styles.badges}>
                    {severityData && (
                      <span
                        className={styles.severityBadge}
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
                </div>

                <p className={styles.cardSummary}>
                  {controversy.summary.length > 200
                    ? controversy.summary.substring(0, 200) + '...'
                    : controversy.summary}
                </p>

                <div className={styles.cardMeta}>
                  {categoryData && (
                    <span className={styles.metaBadge} style={{ color: categoryData.color }}>
                      {categoryData.icon} {categoryData.title}
                    </span>
                  )}
                  {timelineData && (
                    <span className={styles.metaBadge}>
                      📅 {timelineData.label}
                    </span>
                  )}
                  {controversy.date && (
                    <span className={styles.metaBadge}>
                      🗓️ {new Date(controversy.date).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {controversy.specialTags && controversy.specialTags.length > 0 && (
                  <div className={styles.tags}>
                    {controversy.specialTags.slice(0, 3).map((tag, idx) => (
                      <a
                        key={idx}
                        href={`/tags?tag=${encodeURIComponent(tag)}`}
                        className={styles.tag}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tag}
                      </a>
                    ))}
                    {controversy.specialTags.length > 3 && (
                      <a
                        href="/tags"
                        className={styles.tag}
                        onClick={(e) => e.stopPropagation()}
                      >
                        +{controversy.specialTags.length - 3} more
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
