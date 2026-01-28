import React from 'react';
import Link from '@docusaurus/Link';
import styles from './Breadcrumbs.module.css';

/**
 * Breadcrumbs component for navigation
 * @param {Array} crumbs - Array of breadcrumb objects {label, path}
 */
const Breadcrumbs = ({ crumbs }) => {
  if (!crumbs || crumbs.length === 0) return null;

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.breadcrumbList}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={index} className={styles.breadcrumbItem}>
              {isLast ? (
                <span className={styles.breadcrumbCurrent} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className={styles.breadcrumbLink}>
                    {crumb.label}
                  </Link>
                  <span className={styles.breadcrumbSeparator} aria-hidden="true">
                    →
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
