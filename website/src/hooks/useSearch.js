import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

/**
 * Custom hook for searching controversies with fuzzy matching
 * Uses Fuse.js for fast, fuzzy search across multiple fields
 */
export function useSearch(controversies) {
  const [searchQuery, setSearchQuery] = useState('');

  // Create Fuse instance with search configuration
  const fuse = useMemo(() => {
    return new Fuse(controversies, {
      keys: [
        { name: 'title', weight: 2.0 },
        { name: 'description', weight: 1.5 },
        { name: 'summary', weight: 1.8 },
        { name: 'keyPoints', weight: 1.2 },
        { name: 'tags.timeline', weight: 0.5 },
        { name: 'tags.type', weight: 0.5 },
        { name: 'tags.topic', weight: 0.8 }
      ],
      threshold: 0.4, // Lower = more strict, Higher = more fuzzy
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true
    });
  }, [controversies]);

  // Perform search
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      return controversies;
    }

    const results = fuse.search(searchQuery.trim());
    return results.map(result => result.item);
  }, [fuse, searchQuery, controversies]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults
  };
}
