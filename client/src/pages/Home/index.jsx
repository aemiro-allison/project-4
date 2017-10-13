import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="title">
        <h1>On-Track</h1>
        <small>Take back control of your life</small>
      </div>

      <div className="desc">
        This should be the desc of my app.
      </div>

      <div className="call-to-action">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
