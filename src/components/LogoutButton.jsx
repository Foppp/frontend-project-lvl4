import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks';
import authContext from '../contexts';

const LogoutButton = () => {
  const auth = useContext(authContext);
  return (
    auth.loggedIn
      ? <Button variant="primary" onClick={auth.logOut}>Log Out</Button>
      : null
  );
};

export default LogoutButton;
