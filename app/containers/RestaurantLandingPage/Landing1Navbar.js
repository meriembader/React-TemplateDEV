import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Nav, Navbar } from 'react-bootstrap';
import useReactRouter from 'use-react-router';
import MyDishLogoTrans from '../../www/icons/myDish_logo_transparent.svg';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import messages from './messages';

const Landing1Navbar = ({ intl: { formatMessage } }) => {
  const [isNavbarTransparent, setIsNavbarTransparent] = useState(true);
  const { history } = useReactRouter();
  const logoImg = isNavbarTransparent ? MyDishLogoTrans : MyDishLogo;
  const navItemStyle = isNavbarTransparent
    ? 'navbar-link-trans'
    : 'navbar-link-light';
  const navItemSpecStyle = isNavbarTransparent
    ? 'navbar-link-trans ml-3 navbar-link-trans-border'
    : 'ml-3 navbar-link-primary';
  const navbarBg = isNavbarTransparent ? 'transparent' : 'light';
  const listenScrollEvent = e => {
    if (window.scrollY > 150) {
      setIsNavbarTransparent(false);
    } else {
      setIsNavbarTransparent(true);
    }
  };
  window.addEventListener('scroll', listenScrollEvent);

  return (
    <div>
      <Navbar className="pl-5 pr-5" fixed="top" bg={navbarBg}>
        <Navbar.Brand className="ml-5">
          <img
            src={logoImg}
            width="164.2"
            height="50"
            className="d-inline-block align-top"
            alt="My Dish Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className="pr-5">
          <Nav className="ml-auto mr-5">
            <Nav.Item
              className={navItemStyle}
              onClick={() => history.push('/login')}
            >
              {formatMessage(messages.login)}
            </Nav.Item>
            <Nav.Item
              className={navItemSpecStyle}
              onClick={() => history.push('/registration')}
            >
              {formatMessage(messages.register)}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default injectIntl(Landing1Navbar);
