import React from 'react';
import Hexlet from '../images/hexlet.png'
import LogoutButton from './LogoutButton';

const NavPanel = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img src={Hexlet} alt="" width="30" height="30" className="d-inline-block align-text-top" />
        Hexlet Chat
      </a>
        <LogoutButton />
    </div>

  </nav>
);
export default NavPanel;
