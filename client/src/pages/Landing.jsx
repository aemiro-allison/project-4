import React from 'react';
import { Link } from 'react-router-dom';
// remember to add ' to users.
const Landing = () => (
  <main id="landing-page">

      <section className="title">
        <h1>OnTrack</h1>
        <small>Take back control of your life.</small>
      </section>

      <section id="landing-page-desc">
        <p>Fight off your overwelming load of things to do with OnTrack.
          OnTrack is a one stop solution for all your organizing needs.
          Our app will intelligently schedule users task do be done in
          the most efficient way possible; creating more time for you to
          enjoy life.
        </p>
      </section>

      <section className="call-to-action">
        <Link className="button" to="/signup">SIGN UP</Link>
        <Link className="button" to="/login">LOGIN</Link>
      </section>

  </main>
);

export default Landing;
