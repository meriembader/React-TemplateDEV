import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Row, Col } from 'react-bootstrap';
import Form, { Field, reduxForm } from 'redux-form';
import '../../www/style/appstyle.scss';
import './RestaurantLandingPage.scss';
import './RestaurantLandingPage.css';

import Landing1Navbar from './Landing1Navbar';
import Footer from '../../components/Footer/Footer';
import messages from './messages';
import Image1 from '../../www/landing/image1.jpg';
import Image2 from '../../www/landing/image2.jpg';
import Image3 from '../../www/landing/image3.jpg';
import Image4 from '../../www/landing/image4.jpg';
import Resources from '../../www/landing/ressources.svg';
import TimeSvg from '../../www/landing/temps.svg';
import ClientsSvg from '../../www/landing/clients.svg';
import TextField from '../../components/lib/FormInputs/TextField';
import PhoneInputField from '../../components/lib/FormInputs/PhoneInputField';

let RestaurantLandingPage = ({ intl: { formatMessage } }) => (
  <div className="restaurant-landing">
    <Landing1Navbar/>

    <div className="image">
      <div className="heading">
        <h1>{formatMessage(messages.landingHeaderTitle)}</h1>
        <h1 className="primary">{formatMessage(messages.withMyDish)}</h1>
        <p>{formatMessage(messages.landingHeaderDescription1)}</p>
        <p>{formatMessage(messages.landingHeaderDescription2)}</p>
      </div>
    </div>

    <div className="restaurant-landing-body">
      <div className="register-box mx-auto">
        <Row className="register-box-description mx-auto justify-content-center">
          <h2 className="text-center">
            {formatMessage(messages.subscribeBoxTitle)}
          </h2>
          <div className="text-center">
            <p>{formatMessage(messages.subscribeBoxDescription)}</p>
          </div>
        </Row>
        <div>
          <Row>
            <Col lg="6" md="6" xs="6">
              <Field
                name="restaurantName"
                type="text"
                placeholder={formatMessage(messages.restaurantNamePlaceholder)}
                component={TextField}
                className="subscription-form"
              />
            </Col>
            <Col lg="6" md="6" xs="6">
              <Field
                name="address"
                type="text"
                placeholder={formatMessage(
                  messages.restaurantAddressPlaceholder,
                )}
                component={TextField}
                className="subscription-form"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="6" xs="6">
              <Field
                name="name"
                type="text"
                placeholder={formatMessage(messages.namePlaceholder)}
                component={TextField}
                className="subscription-form"
              />
            </Col>
            <Col lg="6" md="6" xs="6">
              <Field
                name="email"
                type="email"
                placeholder={formatMessage(messages.surnamePlaceholder)}
                component={TextField}
                className="subscription-form"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="6" xs="6">
              <Field
                name="phone"
                placeholder={formatMessage(messages.phoneNumberPlaceholder)}
                component={PhoneInputField}
                inputClass="subscription-form"
              />
            </Col>
            <Col lg="6" md="6" xs="6">
              <Field
                name="email"
                placeholder={formatMessage(messages.emailPlaceholder)}
                component={TextField}
                className="subscription-form"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="6" xs="6">
              <Field
                name="restaurantsNbr"
                type="number"
                placeholder={formatMessage(messages.restaurantNumber)}
                component={TextField}
                className="subscription-form"
              />
            </Col>
            <Col lg="6" md="6" xs="6">
              <Field
                name="cuisine"
                type="text"
                placeholder={formatMessage(messages.cuisineTitle)}
                component={TextField}
                className="subscription-form"
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg="8" md="8" xs="8">
              <p>{formatMessage(messages.acceptPolicyMessage)}</p>
            </Col>
            <Col lg="4" md="4" xs="4">
              <Button size="lg" variant="default" className="submit-button-landing">
                {formatMessage(messages.submitButton)}
              </Button>
            </Col>

          </Row>
        </div>
      </div>
      <Row>
        <Col lg="6" md="6" xs="6" className="pt-5">
          <h2>{formatMessage(messages.landingSectionOptimizeTitle)}</h2>
          <div className="section-desc">
            {formatMessage(messages.landingSectionOptimizeDescription)}
          </div>
        </Col>
        <Col lg="6" md="6" xs="6">
          <img src={Image1} className="section-image" alt="Landing Image1"/>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg="6" md="6" xs="6">
          <img src={Image2} className="section-image" alt="Landing Image2"/>
        </Col>
        <Col lg="6" md="6" xs="6" className="pt-5">
          <h2>{formatMessage(messages.landingSectionClientTitle)}</h2>
          <div className="section-desc">
            {formatMessage(messages.landingSectionClientDescription)}
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col lg="6" md="6" xs="6" className="pt-5">
          <h2>{formatMessage(messages.landingSectionSellsTitle)}</h2>
          <div className="section-desc">
            {formatMessage(messages.landingSectionSellsDescription)}
          </div>
        </Col>
        <Col lg="6" md="6" xs="6">
          <img src={Image3} className="section-image" alt="Landing Image3"/>
        </Col>
      </Row>
    </div>
    <div className="white-section pt-5">
      <h2>{formatMessage(messages.whyChooseUsTitle)}</h2>
      <Row className="mt-5">
        <Col lg="4" md="4" xs="4" className="d-flex">
          <div className="pt-3 mr-4">
            <img src={Resources} alt="Landing ressources "/>
          </div>
          <div>
            <h3>{formatMessage(messages.landingSectionEconomizeTitle)}</h3>
            <div className="section-desc2">
              {formatMessage(messages.landingSectionEconomizeDescription)}
            </div>
          </div>
        </Col>
        <Col lg="4" md="4" xs="4" className="d-flex">
          <div className="pt-3 mr-4">
            <img src={TimeSvg} alt="Landing Time "/>
          </div>
          <div>
            <h3>{formatMessage(messages.landingSectionOptimizeTimeTitle)}</h3>
            <div className="section-desc2">
              {formatMessage(messages.landingSectionOptimizeTimeDescription)}
            </div>
          </div>
        </Col>
        <Col lg="4" md="4" xs="4" className="d-flex">
          <div className="pt-3 mr-4">
            <img src={ClientsSvg} alt="Landing Clients "/>
          </div>
          <div>
            <h3>{formatMessage(messages.landingSectionFidelityTitle)}</h3>
            <div className="section-desc2">
              {formatMessage(messages.landingSectionFidelityDescription)}
            </div>
          </div>
        </Col>
      </Row>
    </div>

    <div className="restaurant-landing-body">
      <h2>{formatMessage(messages.landingSectionClientReview)}</h2>
      <div className="d-flex">
        <img
          className="section-image2"
          src={Image4}
          alt="Landing review image 4 "
        />
        <div className="review-section-description ">
          {formatMessage(messages.clientReview1)}
        </div>
      </div>
    </div>

    <Footer/>
  </div>
);

RestaurantLandingPage = reduxForm({
  // a unique name for the form
  form: 'subscribeForm',
})(RestaurantLandingPage);

export default injectIntl(RestaurantLandingPage);
