import React, { useState } from 'react';
import FilterPanel from './FilterPanel';
import SearchBar from './SearchBar';
import ControversyCard from './ControversyCard';
import ControversyDetail from './ControversyDetail';
import { useFilters } from '@site/src/hooks/useFilters';
import { useSearch } from '@site/src/hooks/useSearch';
import data from '@site/src/data/controversies.json';
import styles from './ControversyExplorer.module.css';

export default function ControversyExplorer() {
  const [selectedControversy, setSelectedControversy] = useState(null);

  // Get controversies from aggregated data
  const allControversies = data.controversies || [];

  // Filter state and logic
  const {
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
    applyFilters
  } = useFilters();

  // Search state and logic
  const {
    searchQuery,
    setSearchQuery,
    searchResults
  } = useSearch(allControversies);

  // Apply filters to search results (or all controversies if no search)
  const filteredControversies = applyFilters(searchResults);

  return (
    <div className={styles.explorerContainer}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultsCount={filteredControversies.length}
        />
      </div>

      <div className={styles.mainContent}>
        {/* Filter Sidebar */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilter}
          onClearFilters={clearFilters}
          activeCount={activeFilterCount}
        />

        {/* Results Area */}
        <div className={styles.resultsArea}>
          <div className={styles.resultsHeader}>
            <h2>
              {filteredControversies.length} Controvers{filteredControversies.length !== 1 ? 'ies' : 'y'}
            </h2>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className={styles.clearFiltersButton}>
                Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
              </button>
            )}
          </div>

          {filteredControversies.length === 0 ? (
            <div className={styles.noResults}>
              <p>No controversies found matching your criteria.</p>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredControversies.map(controversy => (
                <ControversyCard
                  key={controversy.id}
                  controversy={controversy}
                  onClick={() => setSelectedControversy(controversy)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedControversy && (
        <ControversyDetail
          controversy={selectedControversy}
          onClose={() => setSelectedControversy(null)}
        />
      )}
    </div>
  );
}
