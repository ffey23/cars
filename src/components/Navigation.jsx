import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav>
      <Link to="/models-list">Models</Link>
      <Link to="/makes-list">Makes</Link>
    </nav>
  );
}
