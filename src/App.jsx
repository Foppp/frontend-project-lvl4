import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavPanel from './components/chat/NavPanel';
import Login from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './auth/PrivateRoute';
import AuthProvider from './auth/AuthProvider';

const App = ({ socket }) => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <Router>
        <NavPanel />
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage socket={socket} />
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
