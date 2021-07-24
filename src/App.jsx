import React, { useContext, useState, useEffect } from 'react';
import { useTranslation, initReactI18next, I18nextProvider } from 'react-i18next';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import NavPanel from './components/NavPanel';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/PageNotFound';
import useAuth from './hooks/index';
import authContext from './contexts/index';
import i18n from './utils/i18n';


const AuthProvider = ({ children }) => {
  const loggedInUser = localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(loggedInUser ? true: false);
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
    <div className="d-flex flex-column h-100">
    <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <Router>
        <NavPanel />
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage />
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
    </I18nextProvider>
  </div>
);
}

export default App;
