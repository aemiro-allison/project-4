import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div>
        <Link to="/">Brand</Link>
      </div>
      <nav>
        <Link to="/">tasks</Link>
        <Link to="/">groups</Link>
      </nav>
      <div>
        Profile
      </div>
    </header>
  );
}

export default Header;
