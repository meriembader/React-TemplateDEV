import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Row, Col, Form } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import './MainLanding.scss';
import messages from './messages';
import { IcoRxAndroid, IcoRxApple, IcoRxStepThree, IcoRxStepTwo, IcoRxStepOne, IcoRxSearch }from '../../components/lib/BsCustomerIcon/BsGenerateIcon';
import PHONE_IMG from '../../www/landing/phone_img.jpg';
import { updateRestaurants, loadRestaurantsByCategories2 } from './Reducer/actions';
import RestaurantsByCategory from './RestaurantsByCategory';
import ArrowIcon from '../../www/icons/arrow2.svg';
import RestaurantsSpecialities from './RestaurantsSpecialities';
import NavbarHeader from '../NavbarHeader/NavbarHeader';
import history from '../../utils/history';

import {loadRestaurants} from '../MainApp/restaurants/Reducer/actions';

const MainLandingPage = ({
  intl: { formatMessage },
  loading, loadRestaurantsByFilter,
  restaurants,
  loadRestaurantsByCategories,
  updateRestaurants,
  firstName,
}) => {
  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    loadRestaurantsByCategories();
  }, []);

  return (
    <div>
      <NavbarHeader searchRestos={loadRestaurantsByFilter}/>
      <div>
        <div className="banner">
          <div className=" text-center">
            <h1>{formatMessage(messages.bannerTitle)}</h1>
            <div className="search-field d-flex mx-auto">
              <div className="mx-auto mt-auto mb-auto">
                 <IcoRxSearch width="20" />
              </div>
              <Form.Control
                type="text"
                className="search-field-input"
                placeholder={formatMessage(messages.searchPlaceholder)}
              />
              <img src={ArrowIcon}
                   onClick={loadRestaurantsByFilter}
                   alt="Arrow Logo" />
            </div>
          </div>
        </div>
        <div className="landing-body">
          <Row>
            <Col lg="7" md="7" xs="7" className="flex-column">
              <h3>{formatMessage(messages.howItWorks)}</h3>
              <IcoRxStepOne />
              <h5 className="mt-1">{formatMessage(messages.desc1)}</h5>

              <IcoRxStepTwo />
              <h5 className="mt-1">{formatMessage(messages.desc2)}</h5>

              <IcoRxStepThree />
              <h5 className="mt-1">{formatMessage(messages.desc3)}</h5>

              <div className="d-flex mt-5">
                <div className="icon-button d-flex">
                  <IcoRxApple />
                  <span className="ml-2">IPHONE</span>
                </div>
                <div className="icon-button d-flex ml-2">
                  <IcoRxAndroid />
                  <span className="ml-2">ANDROID</span>
                </div>
              </div>
            </Col>
            <Col lg="5" md="5" xs="5" className="p-5">
              <img src={PHONE_IMG} alt="Step3 icon" />
            </Col>
          </Row>

          <RestaurantsByCategory
            type="Reservation"
            updateRestaurants={updateRestaurants}
            restaurants={restaurants && restaurants.Reservation}
            categoryName="Réservez une table"
            className=" mt-5 mb-4"
            formatMessage={formatMessage}
          />
          <RestaurantsByCategory
            type="Livraison"
            updateRestaurants={updateRestaurants}
            restaurants={restaurants && restaurants.Livraison}
            categoryName="Livraison"
            className=" mt-5 mb-4"
            formatMessage={formatMessage}
          />
          <RestaurantsSpecialities
            categoryName="Choisissez votre spécialité"
            className=" mt-5 mb-4"
            formatMessage={formatMessage}
          />
          <RestaurantsByCategory
            type="new"
            updateRestaurants={updateRestaurants}
            restaurants={restaurants && restaurants.New}
            categoryName="Nouveau sur Mydish"
            className=" mt-5 mb-4"
            formatMessage={formatMessage}
          />
        </div>
      </div>
      
      <Footer />;
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { restaurants, loading, error } = state.landing || {};
  return {
    firstName: (state.login && state.login.firstName) || '',
    restaurants,
    loading,
    error,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    loadRestaurantsByCategories: () => dispatch(loadRestaurantsByCategories2()),
    loadRestaurantsByFilter: (filter) => dispatch(loadRestaurants({'criteria':filter})),
    updateRestaurants: (id, type, isFavorite) =>
      dispatch(updateRestaurants(id, type, isFavorite)),
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
)(MainLandingPage);
