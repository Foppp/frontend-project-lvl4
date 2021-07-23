import React from 'react';
import { useTranslation } from 'react-i18next';
import Hexlet from '../images/hexlet.png'
import LogoutButton from './LogoutButton';

const NavPanel = () => {
  const { t } = useTranslation();
  return (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white rounded">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img src={Hexlet} alt="" width="30" height="30" className="d-inline-block align-text-top" />
        <span className="m-2">{t('navBar.logoText')}</span>
        </a>
        <LogoutButton />
    </div>

  </nav>
)
};
export default NavPanel;
