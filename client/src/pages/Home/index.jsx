import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="title">
        <h1>Ontrack</h1>
        <small>Take back control of your life</small>
      </div>

      <div className="desc">
        Fight off your overwelming load of things to do with Ontrack.
        Ontrack is a one stop solution for all your organizing needs.
      </div>

      <div className="call-to-action">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
