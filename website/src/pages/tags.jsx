import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './tags.module.css';
import { controversyIndex } from '../data/controversyIndex';
import categoriesData from '../categories.json';

export default function TagsPage() {
  const history = useHistory();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('frequency');
  const [selectedTag, setSelectedTag] = useState(null);

  // Check URL for tag parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tagParam = params.get('tag');
    if (tagParam) {
      setSelectedTag(tagParam);
    }
  }, [location.search]);

  // Calculate tag statistics
  const tagStats = useMemo(() => {
    const stats = {};
    controversyIndex.forEach(controversy => {
      if (controversy.specialTags && Array.isArray(controversy.specialTags)) {
        controversy.specialTags.forEach(tag => {
          if (!stats[tag]) {
            stats[tag] = {
              tag,
              count: 0,
              controversies: []
            };
          }
          stats[tag].count++;
          stats[tag].controversies.push(controversy);
        });
      }
    });
    return stats;
  }, []);

  // Get sorted tags
  const sortedTags = useMemo(() => {
    const tags = Object.values(tagStats);

    // Filter by search term
    const filtered = searchTerm
      ? tags.filter(t => t.tag.toLowerCase().includes(searchTerm.toLowerCase()))
      : tags;

    // Sort
    switch (sortBy) {
      case 'frequency':
        return filtered.sort((a, b) => b.count - a.count);
      case 'alphabetical':
        return filtered.sort((a, b) => a.tag.localeCompare(b.tag));
      default:
        return filtered;
    }
  }, [tagStats, searchTerm, sortBy]);

  // Get controversies for selected tag
  const selectedControversies = selectedTag ? tagStats[selectedTag]?.controversies || [] : [];

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleControversyClick = (id) => {
    history.push(`/controversy?id=${id}`);
  };

  const categories = categoriesData.categories;
  const severityLevels = categoriesData.severityLevels;

  return (
    <Layout
      title="Browse by Tags"
      description="Explore all tags used to categorize Trump controversies">
      <div className={styles.container}>
        <Breadcrumbs
          crumbs={[
            { label: 'Home', path: '/' },
            { label: 'Tags', path: '/tags' }
          ]}
        />

        {/* Header */}
        <div className={styles.header}>
          <h1>Browse by Tags</h1>
          <p className={styles.subtitle}>
            Explore {Object.keys(tagStats).length} tags across {controversyIndex.length} controversies
          </p>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.sortBox}>
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="frequency">Most Used First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{sortedTags.length}</span>
            <span className={styles.statLabel}>
              {sortedTags.length === 1 ? 'Tag' : 'Tags'} {searchTerm ? 'Found' : 'Total'}
            </span>
          </div>
          {selectedTag && (
            <div className={styles.stat}>
              <span className={styles.statNumber}>{tagStats[selectedTag]?.count || 0}</span>
              <span className={styles.statLabel}>
                {tagStats[selectedTag]?.count === 1 ? 'Controversy' : 'Controversies'} with "{selectedTag}"
              </span>
            </div>
          )}
        </div>

        {/* Tags Grid */}
        {sortedTags.length === 0 ? (
          <div className={styles.noResults}>
            <p>No tags found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className={styles.tagsGrid}>
            {sortedTags.map(({ tag, count }) => {
              const isSelected = selectedTag === tag;
              const sizeClass = count >= 10 ? styles.tagLarge :
                               count >= 5 ? styles.tagMedium :
                               count >= 2 ? styles.tagSmall :
                               styles.tagTiny;

              return (
                <button
                  key={tag}
                  className={`${styles.tagButton} ${sizeClass} ${isSelected ? styles.tagSelected : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  <span className={styles.tagName}>{tag}</span>
                  <span className={styles.tagCount}>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Tag Details */}
        {selectedTag && selectedControversies.length > 0 && (
          <div className={styles.tagDetails}>
            <div className={styles.tagDetailsHeader}>
              <h2>Controversies tagged with "{selectedTag}"</h2>
              <button
                className={styles.closeButton}
                onClick={() => setSelectedTag(null)}
              >
                ✕ Close
              </button>
            </div>

            <div className={styles.controversiesGrid}>
              {selectedControversies.map((controversy) => {
                const categoryData = categories[controversy.primaryCategory];
                const severityData = severityLevels[controversy.severity];

                return (
                  <div
                    key={controversy.id}
                    className={styles.controversyCard}
                    onClick={() => handleControversyClick(controversy.id)}
                  >
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{controversy.title}</h3>
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

                    <p className={styles.cardSummary}>
                      {controversy.summary.length > 150
                        ? controversy.summary.substring(0, 150) + '...'
                        : controversy.summary}
                    </p>

                    <div className={styles.cardMeta}>
                      {categoryData && (
                        <span className={styles.metaBadge} style={{ color: categoryData.color }}>
                          {categoryData.icon} {categoryData.title}
                        </span>
                      )}
                      {controversy.date && (
                        <span className={styles.metaBadge}>
                          📅 {new Date(controversy.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular Tags Section */}
        {!selectedTag && !searchTerm && (
          <div className={styles.popularSection}>
            <h2>Most Used Tags</h2>
            <div className={styles.popularTags}>
              {sortedTags.slice(0, 20).map(({ tag, count }) => (
                <div key={tag} className={styles.popularTag}>
                  <button
                    className={styles.popularTagButton}
                    onClick={() => handleTagClick(tag)}
                  >
                    <span className={styles.popularTagName}>{tag}</span>
                    <span className={styles.popularTagCount}>{count}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
