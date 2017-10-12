import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Partials
import Header from './partials/Header';
import Footer from './partials/Footer';

// Pages
import LandingPage from './pages/Landing';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/login" component={LoginPage} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
