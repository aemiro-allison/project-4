import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// import pages.
import Home from './Home';
import Signup from './Signup';
import Login from './Login';

function Index() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  );
}

export default Index;
