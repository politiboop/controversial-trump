import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './critics.module.css';

// Import all critic JSON files
const criticModules = require.context('../data/critics', false, /\.json$/);

export default function CriticsPage() {
  const [critics, setCritics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedParty, setSelectedParty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCritics = async () => {
      try {
        const loadedCritics = criticModules.keys().map(key => {
          const critic = criticModules(key);
          return critic.default || critic;
        });

        // Sort critics alphabetically by name
        loadedCritics.sort((a, b) => a.name.localeCompare(b.name));

        setCritics(loadedCritics);
      } catch (err) {
        console.error('Failed to load critics:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCritics();
  }, []);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(critics.map(c => c.category));
    return Array.from(cats).sort();
  }, [critics]);

  // Get unique parties
  const parties = React.useMemo(() => {
    const partiesList = new Set(critics.map(c => c.party).filter(Boolean));
    return Array.from(partiesList).sort();
  }, [critics]);

  // Filter critics
  const filteredCritics = React.useMemo(() => {
    return critics.filter(critic => {
      const matchesCategory = selectedCategory === 'all' || critic.category === selectedCategory;
      const matchesParty = selectedParty === 'all' || critic.party === selectedParty;
      const matchesSearch = !searchTerm ||
        critic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        critic.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        critic.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesParty && matchesSearch;
    });
  }, [critics, selectedCategory, selectedParty, searchTerm]);

  // Group critics by category for display
  const groupedCritics = React.useMemo(() => {
    const groups = {};
    filteredCritics.forEach(critic => {
      if (!groups[critic.category]) {
        groups[critic.category] = [];
      }
      groups[critic.category].push(critic);
    });
    return groups;
  }, [filteredCritics]);

  const formatCategoryName = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'former-cabinet': '🏛️',
      'military-leader': '⭐',
      'congress': '🏢',
      'former-administration': '📋',
      'intelligence-community': '🔍',
      'former-officials': '👔',
      'former-associates': '🤝',
      'commentators': '📺'
    };
    return icons[category] || '👤';
  };

  const getPartyIcon = (party) => {
    const icons = {
      'Republican': '🐘',
      'Democrat': '🐴',
      'Independent': '🗽',
      'Libertarian': '🗽'
    };
    return icons[party] || '';
  };

  if (loading) {
    return (
      <Layout title="Trump Critics" description="People in authority who have warned against Trump">
        <div className={styles.container}>
          <div className={styles.loading}>Loading critics...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Trump Critics"
      description="Authority figures, former cabinet members, military leaders, and others who have warned against electing Donald Trump"
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Trump Critics</h1>
          <p className={styles.subtitle}>
            People in authority, former administration officials, military leaders, members of Congress,
            and other notable figures who have publicly warned against Donald Trump's presidency
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{critics.length}</span>
              <span className={styles.statLabel}>Critics</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{categories.length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search by name, role, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Filter by Category:</h3>
            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All ({critics.length})
              </button>
              {categories.map(category => {
                const count = critics.filter(c => c.category === category).length;
                return (
                  <button
                    key={category}
                    className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {getCategoryIcon(category)} {formatCategoryName(category)} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Filter by Party:</h3>
            <div className={styles.partyFilters}>
              <button
                className={`${styles.partyButton} ${selectedParty === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedParty('all')}
              >
                All ({critics.length})
              </button>
              {parties.map(party => {
                const count = critics.filter(c => c.party === party).length;
                return (
                  <button
                    key={party}
                    className={`${styles.partyButton} ${styles[`party${party}`]} ${selectedParty === party ? styles.active : ''}`}
                    onClick={() => setSelectedParty(party)}
                  >
                    {getPartyIcon(party)} {party} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className={styles.results}>
          <div className={styles.resultsCount}>
            Showing {filteredCritics.length} of {critics.length} critics
          </div>

          {selectedCategory === 'all' ? (
            // Grouped view
            Object.entries(groupedCritics).sort((a, b) => a[0].localeCompare(b[0])).map(([category, categoryCritics]) => (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>
                  {getCategoryIcon(category)} {formatCategoryName(category)}
                  <span className={styles.categoryCount}>({categoryCritics.length})</span>
                </h2>
                <div className={styles.criticGrid}>
                  {categoryCritics.map(critic => (
                    <Link
                      key={critic.id}
                      to={`/critic?id=${critic.id}`}
                      className={styles.criticCard}
                    >
                      <div className={styles.criticHeader}>
                        <h3 className={styles.criticName}>{critic.name}</h3>
                        <div className={styles.badges}>
                          {critic.militaryRank && (
                            <div className={styles.militaryBadge}>🎖️</div>
                          )}
                          {critic.party && (
                            <div className={`${styles.partyBadge} ${styles[`party${critic.party}`]}`}>
                              {getPartyIcon(critic.party)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.criticRole}>{critic.role}</div>
                      {critic.administration && (
                        <div className={styles.criticAdministration}>{critic.administration}</div>
                      )}
                      {critic.years && (
                        <div className={styles.criticYears}>{critic.years}</div>
                      )}
                      <p className={styles.criticSummary}>{critic.summary}</p>
                      {critic.endorsement && (
                        <div className={styles.criticEndorsement}>
                          <strong>Electoral Position:</strong> {critic.endorsement}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Single category view
            <div className={styles.criticGrid}>
              {filteredCritics.map(critic => (
                <Link
                  key={critic.id}
                  to={`/critic?id=${critic.id}`}
                  className={styles.criticCard}
                >
                  <div className={styles.criticHeader}>
                    <h3 className={styles.criticName}>{critic.name}</h3>
                    <div className={styles.badges}>
                      {critic.militaryRank && (
                        <div className={styles.militaryBadge}>🎖️</div>
                      )}
                      {critic.party && (
                        <div className={`${styles.partyBadge} ${styles[`party${critic.party}`]}`}>
                          {getPartyIcon(critic.party)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.criticRole}>{critic.role}</div>
                  {critic.administration && (
                    <div className={styles.criticAdministration}>{critic.administration}</div>
                  )}
                  {critic.years && (
                    <div className={styles.criticYears}>{critic.years}</div>
                  )}
                  <p className={styles.criticSummary}>{critic.summary}</p>
                  {critic.endorsement && (
                    <div className={styles.criticEndorsement}>
                      <strong>Electoral Position:</strong> {critic.endorsement}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          {filteredCritics.length === 0 && (
            <div className={styles.noResults}>
              <p>No critics found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
