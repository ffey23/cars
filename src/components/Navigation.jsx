import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <Link to="/model-list">Models</Link>
      <Link to="/make-list">Makes</Link>
    </nav>
  );
}
