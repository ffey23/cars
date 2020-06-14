import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.scss';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to="/model-list">Models</Link>
      <Link className={styles.link} to="/make-list">Makes</Link>
    </nav>
  );
}
