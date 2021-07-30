import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/index';

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

export default PrivateRoute;
