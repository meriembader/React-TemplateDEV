import React from 'react';
import { injectIntl } from 'react-intl';
import InputTextEntry from '../../components/lib/FormInputs/InputTextEntry';
import { Navbar, Row, Col } from 'react-bootstrap';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import ArrowIcon from '../../www/icons/arrow2.svg';
import SearchIcon from '../../www/icons/search.svg';
import messages from '../../containers/MainLandingPage/messages';
import './HeaderBar.scss';
import espaceDesac from '../../www/icons/menu/espaceDesac.svg';
import Profile from '../Users/Profile';

let classNameProfil={
  avatar:'Col-customer-header',
  name:"pull-right margin-15px"
}
const HeaderBar = ({ intl: { formatMessage } }) => (
  <Row className="note-header">
    <Col lg={2} md={2} xs={2} className="Col-customer-header" >
      <Navbar.Brand className="ml-5" href="/landing">
        <img
          src={MyDishLogo}
          className="d-inline-block align-top"
          alt="My Dish Logo"
        />
      </Navbar.Brand>
    </Col>
    <Col lg={6} md={6} xs={6} className="Col-customer-header">
        <InputTextEntry
          type="text"
          name="search"
          size="lg"
          className="search-field-input1"
          placeholder={formatMessage(messages.searchTitle)}
          prefixIn={<img src={SearchIcon} id="logo-Search1"  className="right" alt="Search Logo" />}
          sufixIn={ <img id="arrow-search"  src={ArrowIcon} alt="Arrow Logo" />}
          groupClassName="form-group-header-search"
        />
    </Col>
    <Col md={{ span: 2, offset: 2 }}  className="Col-customer-header">
      <Profile imageUri={espaceDesac} firstName={sessionStorage.getItem('firstName')} phoneNumber={sessionStorage.getItem('phone')} classNames={classNameProfil}/>
    </Col>
  </Row>);


export default injectIntl(HeaderBar);
