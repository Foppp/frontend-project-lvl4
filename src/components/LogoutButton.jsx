import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import authContext from '../contexts';

const LogoutButton = () => {
  const { t } = useTranslation();
  const auth = useContext(authContext);
  return (
    auth.loggedIn
      ? <Button variant="outline-primary" onClick={auth.logOut}>{t('buttons.logOutButton')}</Button>
      : null
  );
};

export default LogoutButton;
