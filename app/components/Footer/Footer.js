import React from 'react';
import { Button, InputGroup, Row, Col, FormControl } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import messages from './messages';
import './Footer.scss';
import MyDishLogo from '../../www/icons/myDish_logo_light.svg';
import {IcoRxApple, IcoRxAndroid, IcoRxTwitter, IcoRxInstagram,IcoRxFacebook } from '../lib/BsCustomerIcon/BsGenerateIcon'


const Footer = ({ intl: { formatMessage } }) => (
  <div>
    <div className="footer-box-1">
      <Row>
        <img
          src={MyDishLogo}
          width="164.2"
          height="50"
          className="d-inline-block align-top"
          alt="My Dish Logo"
        />
      </Row>
      <Row className="mt-3">
        <div className="d-flex flex-column">
          <span>{formatMessage(messages.about)}</span>
          <span>{formatMessage(messages.contact)}</span>
          <span>{formatMessage(messages.help)}</span>
          <span>{formatMessage(messages.faq)}</span>
          <span>{formatMessage(messages.languageFr)}</span>
        </div>
        <div className="d-flex flex-column footer-section">
          <span>{formatMessage(messages.newsletterSubscription)}</span>
          <InputGroup className="newsletter">
            <FormControl
              className="newsletter-input"
              placeholder={formatMessage(messages.email)}
              aria-label={formatMessage(messages.email)}
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="secondary" className="newsletter-btn">{formatMessage(messages.abonner)}</Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
        <div className="d-flex flex-column footer-section">
          <span>{formatMessage(messages.joinUs)}</span>
          <div className="d-flex mt-3">
              <Row>
                <Col>
                  <IcoRxFacebook />
                </Col>
                <Col>
                  <IcoRxInstagram />
                </Col>
                <Col>
                  <IcoRxTwitter />
                </Col>
            </Row>
          </div>
        </div>
        <div className="d-flex flex-column footer-section ">
          <span>{formatMessage(messages.downloadApp)}</span>
          <InputGroup>
            <div className="footer-icon">
              <IcoRxApple />
            </div>
              <span className="download-app">
                iPhone
               </span>
          </InputGroup>
          <InputGroup>
            <div className="footer-icon">
              <IcoRxAndroid />
            </div>
            <span className="download-app">
             Android
           </span>
          </InputGroup>
        </div>
      </Row>
    </div>
    <div className="footer-box-2 d-flex">
      <div>{formatMessage(messages.reservedRight)}</div>
      <div className="ml-auto">
        <span> {formatMessage(messages.confidentiality)} </span>
        <span className="ml-4"> {formatMessage(messages.condition)}</span>
      </div>
    </div>
  </div>
);

export default injectIntl(Footer);
