import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import authContext from '../contexts';
import Hexlet from '../images/hexlet.png';

const NavPanel = () => {
  const { t } = useTranslation();
  const auth = useContext(authContext);
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white rounded">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={Hexlet} alt="" width="30" height="30" className="d-inline-block align-text-top" />
          <span className="m-2">{t('navBar.logoText')}</span>
        </Link>
        { auth.loggedIn
          ? <Button variant="outline-primary" onClick={auth.logOut}>{t('buttons.logOutButton')}</Button>
          : null}
      </div>
    </nav>
  );
};
export default NavPanel;
