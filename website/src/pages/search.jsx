import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import Fuse from 'fuse.js';
import SearchBar from '../components/Search/SearchBar';
import ControversyCard from '../components/Category/ControversyCard';
import { controversyIndex } from '../data/controversyIndex';
import categoriesData from '../categories.json';
import styles from './search.module.css';

export default function SearchPage() {
  const location = useLocation();
  const history = useHistory();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const severityLevels = categoriesData.severityLevels;

  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('searchHistory');
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load search history:', err);
    }
  }, []);

  // Save search to history
  const saveToHistory = (searchQuery) => {
    if (!searchQuery.trim()) return;

    try {
      // Add to history, avoiding duplicates and keeping only last 5
      const updated = [
        searchQuery,
        ...searchHistory.filter(q => q.toLowerCase() !== searchQuery.toLowerCase())
      ].slice(0, 5);

      setSearchHistory(updated);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save search history:', err);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q') || '';
    setQuery(q);

    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    performSearch(q);
  }, [location.search]);

  const performSearch = async (searchQuery) => {
    setLoading(true);
    saveToHistory(searchQuery);
    try {
      // Configure Fuse.js for fuzzy search
      const fuse = new Fuse(controversyIndex, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'summary', weight: 1.5 },
          { name: 'specialTags', weight: 1.2 },
          { name: 'id', weight: 1 },
          { name: 'severity', weight: 1 },
          { name: 'primaryCategory', weight: 0.8 },
          { name: 'timeline', weight: 0.5 }
        ],
        threshold: 0.4, // 0 = perfect match, 1 = match anything
        includeScore: true,
        includeMatches: true, // Include match information
        minMatchCharLength: 2,
        ignoreLocation: true, // Search anywhere in the text, not just at specific locations
        distance: 1000, // Maximum distance to search
      });

      // Perform fuzzy search on index
      const searchResults = fuse.search(searchQuery);

      // Load full controversy data for matches
      const loadedControversies = await Promise.all(
        searchResults.slice(0, 50).map(async (result) => {
          try {
            const module = await import(`../data/controversies/${result.item.filename}.json`);
            // Get match field names for highlighting
            const matchFields = result.matches?.map(m => m.key) || [];
            return {
              ...module.default,
              score: result.score,
              matchFields: matchFields
            };
          } catch (err) {
            console.error(`Failed to load ${result.item.filename}:`, err);
            return null;
          }
        })
      );

      setResults(loadedControversies.filter(Boolean));
    } catch (err) {
      console.error('Search error:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.push('/');
  };

  return (
    <Layout title="Search Controversies" description="Search Trump controversies">
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={handleBack} className={styles.backButton}>
            ← Back
          </button>
          <h1 className={styles.title}>Search Controversies</h1>
        </div>

        <div className={styles.searchSection}>
          <SearchBar autoFocus />
        </div>

        {loading ? (
          <div className={styles.loading}>Searching...</div>
        ) : query.trim() === '' ? (
          <div className={styles.empty}>
            <p>Enter a search term to find controversies.</p>

            {searchHistory.length > 0 && (
              <>
                <p className={styles.hint}>Recent searches:</p>
                <div className={styles.exampleTags}>
                  {searchHistory.map((term, idx) => (
                    <button
                      key={idx}
                      className={styles.historyTag}
                      onClick={() => history.push(`/search?q=${encodeURIComponent(term)}`)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </>
            )}

            <p className={styles.hint} style={{ marginTop: searchHistory.length > 0 ? '2rem' : '0' }}>
              {searchHistory.length > 0 ? 'Or try these examples:' : 'Try searching for:'}
            </p>
            <div className={styles.exampleTags}>
              {['ICE', 'January 6', 'lies', 'shooting', 'corruption', 'catastrophic', 'Kristi Noem'].map((example) => (
                <button
                  key={example}
                  className={styles.exampleTag}
                  onClick={() => history.push(`/search?q=${encodeURIComponent(example)}`)}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className={styles.empty}>
            <p>No results found for "{query}"</p>
            <p className={styles.hint}>Try different keywords or check spelling</p>
          </div>
        ) : (
          <>
            <div className={styles.resultsHeader}>
              <p className={styles.resultsCount}>
                Found {results.length} {results.length === 1 ? 'controversy' : 'controversies'} matching "{query}"
              </p>
            </div>

            <div className={styles.resultsGrid}>
              {results.map((controversy) => (
                <div key={controversy.id} className={styles.resultWrapper}>
                  {controversy.matchFields && controversy.matchFields.length > 0 && (
                    <div className={styles.matchInfo}>
                      Matched in: {controversy.matchFields.slice(0, 3).map(field => {
                        const labels = {
                          title: 'Title',
                          summary: 'Summary',
                          specialTags: 'Tags',
                          severity: 'Severity',
                          primaryCategory: 'Category',
                          timeline: 'Timeline',
                          id: 'ID'
                        };
                        return labels[field] || field;
                      }).join(', ')}
                    </div>
                  )}
                  <ControversyCard
                    controversy={controversy}
                    severityLevel={severityLevels[controversy.severity]}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
