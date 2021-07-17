import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import authContext from '../contexts';

const LogoutButton = () => {
  const auth = useContext(authContext);
  return (
    auth.loggedIn
      ? <Button variant="outline-primary" onClick={auth.logOut}>Выйти нахрен</Button>
      : null
  );
};

export default LogoutButton;
