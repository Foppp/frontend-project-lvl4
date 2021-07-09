import React, { useContext, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"
import NavPanel from './components/NavPanel';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import useAuth from './hooks/index';
import authContext from './contexts/index';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();
  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
}

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <NavPanel />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
            <PrivateRoute exact path="/">
              <HomePage />
              </PrivateRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App;
