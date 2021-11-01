import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Nav, Navbar } from 'react-bootstrap';
import useReactRouter from 'use-react-router';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import messages from './messages';

const LandingNavbar = ({ intl: { formatMessage }}) => {
  const { history } = useReactRouter();
 return (
    <div>
      <Navbar className="pl-5 pr-5" fixed="top" bg="light">
        <Navbar.Brand className="ml-5" href="/landing">
          <img
            src={MyDishLogo}
            width="164.2"
            height="50"
            className="d-inline-block align-top"
            alt="My Dish Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav " className="pr-5">
          <Nav className="ml-auto mr-5">
            <Nav.Item className="primary-link-inline mt-2" href="/registration">
              {formatMessage(messages.downloadApp)}
            </Nav.Item>
            <Nav.Item
              className="secondary-button-border ml-3"
              onClick={() => history.push('/login')}
            >
              {formatMessage(messages.login)}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default injectIntl(LandingNavbar);
