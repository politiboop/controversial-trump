import React from 'react';
import styles from './CategoryTile.module.css';

const CategoryTile = ({ category, controversyCount, onClick }) => {
  return (
    <div
      className={styles.tile}
      style={{ borderColor: category.color }}
      onClick={onClick}
    >
      <div className={styles.header}>
        <span className={styles.icon}>{category.icon}</span>
        <h3 className={styles.title}>{category.title}</h3>
      </div>

      <p className={styles.description}>{category.description}</p>

      <div className={styles.examples}>
        {category.examples.map((example, idx) => (
          <span key={idx} className={styles.exampleTag}>
            {example}
          </span>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.count}>
          {controversyCount} {controversyCount === 1 ? 'controversy' : 'controversies'}
        </span>
        <span className={styles.arrow}>→</span>
      </div>
    </div>
  );
};

export default CategoryTile;
