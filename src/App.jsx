import React from 'react';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white rounded">
          <div className="container">
            <a className="navbar-brand" href="/">Hexlet Chat</a>
          </div>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
