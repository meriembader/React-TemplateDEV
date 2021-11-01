import React, { memo, useState } from 'react';
import {  injectIntl } from 'react-intl';
import {Col, Dropdown, Form, Nav, Navbar, Row} from 'react-bootstrap';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import ArrowIcon from '../../www/icons/arrow2.svg';
import SearchIcon from '../../www/icons/search.svg';

import useReactRouter from 'use-react-router';
import messages from '../MainLandingPage/messages';

import './NavbarHeader.scss';
import espaceDesac from '../../www/icons/menu/espaceDesac.svg';

import DetailsBoldText from '../../components/lib/DetailsBoldText';
import panierDesac from '../../www/icons/panier-desactive.png';
import { connect } from 'react-redux';
import { compose } from 'redux';
import  NavbarSetting  from '../../components/mydishNav/NavbarSetting';
import InputTextEntry from "../../components/lib/FormInputs/InputTextEntry";


const NavbarHeader = ({ intl: { formatMessage }, order = {} , withSearchText, searchRestos}) => {
  const { history } = useReactRouter();
  const [filter, setFilter] = useState('');
  return(
    <div className="app-header">
      <Navbar className="pl-5 pr-5" fixed="top" bg="white">
        <Navbar.Brand className="ml-5 pl-5" href="/landing">
          <img
            src={MyDishLogo}
            className="d-inline-block align-top"
            alt="My Dish Logo"
          />
        </Navbar.Brand>  {  withSearchText && (
        <Col lg={6} md={6} xs={6} className="Col-customer-header">
          <InputTextEntry
            type="text"
            name="search"
            size="lg"
            onChange={(event)=>{event.target.value !== event.target.currentValue &&  setFilter(event.target.value);}}
            className="search-field-input1"
            placeholder={formatMessage(messages.searchTitle)}
            prefixIn={<img src={SearchIcon} id="logo-Search1"  className="right" alt="Search Logo" onClick={searchRestos && searchRestos(filter)}/>}
            sufixIn={ <img id="arrow-search"  src={ArrowIcon} alt="Arrow Logo" onClick={searchRestos && searchRestos(filter)}/>}
            groupClassName="form-group-header-search"
          />
        </Col>)}
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>

        {sessionStorage.getItem('myDish-token') &&
        <div className="pr-5 ml-auto mr-5">
          <Row className="row-menu">
            <Dropdown alignLeft drop="left">
              <Dropdown.Toggle
                variant="white"
                className="bg-white border-0 p-0"
                id="dropdown-basic"
              >
                <img alt="user_image" src={espaceDesac}/>
              </Dropdown.Toggle>
              <NavbarSetting  />
            </Dropdown>
            <DetailsBoldText className="name">{sessionStorage.getItem('firstName')}</DetailsBoldText>
            {order.orderDetails && order.orderDetails.length &&
          <div                 className="image-menu"
          >
            <img
              alt="user_image"
              src={panierDesac}
              onClick={() => history.push('/Commande')}
            />

          </div>
          }
            {order.orderDetails && order.orderDetails.length &&
            <DetailsBoldText className="name">{order.orderDetails.length}</DetailsBoldText>
            }
          </Row>
        </div>}
        {!sessionStorage.getItem('myDish-token') &&
        <Navbar.Collapse id="basic-navbar-nav " className=" pr-5">
          <Nav className="ml-auto mr-5">
            <Nav.Item className="primary-link-inline mt-2" href="#home">
              {formatMessage(messages.downloadApp)}
            </Nav.Item>
            <Nav.Item
              className="secondary-button-border ml-3"
              onClick={() => history.push('/login')}
            >
              {formatMessage(messages.login)}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>}
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { order } = state.cart || {};
  return {
    order,
  };
};

export function mapDispatchToProps() {
  return {

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(NavbarHeader);
