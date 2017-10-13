import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import partials
import Header from './partials/Header';
import Footer from './partials/Footer';

// import components
import Page from './components/Page';
import Index from './pages/index';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <Page>
            <Index />
          </Page>
        <Footer />
      </div>
    );
  }
}

export default App;
