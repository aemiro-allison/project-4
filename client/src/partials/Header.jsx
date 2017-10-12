import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => (
  <header className="top-header">

    <div className="top-header-left">
      <Link to="/">Home</Link>
    </div>

    <nav className="top-header-center">
      <Link to="/">Tasks</Link>
      <Link to="/">About</Link>
    </nav>

    <div className="top-header-right">
      { props.user? <Link to="/">Profile</Link> : null }
    </div>

  </header>
);

export default Header;
