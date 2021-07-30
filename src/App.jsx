import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavPanel from './components/NavPanel';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/PageNotFound';
import useAuth from './hooks/index';
import authContext from './contexts/index';

const AuthProvider = ({ children }) => {
  const loggedInUser = localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(!!loggedInUser);
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
};

const App = ({ socket }) => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Router>
        <NavPanel />
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage socket={socket}/>
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  </div>
);

export default App;
