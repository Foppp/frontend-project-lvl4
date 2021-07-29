import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Hexlet from '../images/hexlet.png'
import LogoutButton from './LogoutButton';

const NavPanel = () => {
  const { t } = useTranslation();
  return (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white rounded">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img src={Hexlet} alt="" width="30" height="30" className="d-inline-block align-text-top" />
        <span className="m-2">Hexlet Chat</span>
      </Link>
      <LogoutButton />
    </div>

  </nav>
)
};
export default NavPanel;
