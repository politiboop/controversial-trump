import { useState, useMemo } from 'react';

/**
 * Custom hook for managing controversy filters
 * Handles timeline, type, topic, severity, and sort filters
 */
export function useFilters() {
  const [filters, setFilters] = useState({
    timeline: [],
    type: [],
    topic: [],
    severity: null,
    sortBy: 'priority'
  });

  /**
   * Update a specific filter
   * @param {string} category - Filter category (timeline, type, topic, severity, sortBy)
   * @param {any} value - New value for the filter
   */
  const setFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  /**
   * Clear all filters and reset to defaults
   */
  const clearFilters = () => {
    setFilters({
      timeline: [],
      type: [],
      topic: [],
      severity: null,
      sortBy: 'priority'
    });
  };

  /**
   * Count active filters (excludes sortBy)
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.timeline.length;
    count += filters.type.length;
    count += filters.topic.length;
    if (filters.severity) count += 1;
    return count;
  }, [filters]);

  /**
   * Apply filters to a list of controversies
   * @param {Array} controversies - Array of controversy objects
   * @returns {Array} Filtered and sorted controversies
   */
  const applyFilters = (controversies) => {
    let filtered = [...controversies];

    // Apply timeline filter
    if (filters.timeline.length > 0) {
      filtered = filtered.filter(c =>
        c.tags.timeline.some(t => filters.timeline.includes(t))
      );
    }

    // Apply type filter
    if (filters.type.length > 0) {
      filtered = filtered.filter(c =>
        c.tags.type.some(t => filters.type.includes(t))
      );
    }

    // Apply topic filter
    if (filters.topic.length > 0) {
      filtered = filtered.filter(c =>
        c.tags.topic.some(t => filters.topic.includes(t))
      );
    }

    // Apply severity filter
    if (filters.severity) {
      filtered = filtered.filter(c =>
        c.tags.severity === filters.severity
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'priority':
        default:
          const priorityA = a.metadata?.priority || 5;
          const priorityB = b.metadata?.priority || 5;
          if (priorityB !== priorityA) {
            return priorityB - priorityA;
          }
          // Secondary sort by date if priority is the same
          return new Date(b.date) - new Date(a.date);
      }
    });

    return filtered;
  };

  return {
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
    applyFilters
  };
}
