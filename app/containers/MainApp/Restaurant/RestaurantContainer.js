import React, { memo, useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import './RestaurantContainer.scss';

import { loadRestaurantDetails } from './Reducer/actions';
import MapComponent from '../../../components/Restaurant/MapComponent';
import ProductList from './ProductsList';
import { addMenu, removeMenu, validateReservationOptions } from '../Reducer/actions';
import InformationsModal from '../../../components/details/InformationsModal';
import messages from './messages';
import ReservationModal from '../../../components/ReservationModal/ReservationModal';
import {IcoFavorisAtive, IcoFavorisDisAtive} from '../../../components/lib/BsCustomerIcon/BsGenerateIcon';
import { addFavoriteToUser} from '../Profile/Reducer/actions';
import DetailsText from "../../../components/lib/DetailsText/DetailsText";

const detailsTestData = {
  name: 'Moom-Mam',
  numTel: '+33655714239',
  adresse: '10 rue Gustave Flaubert, 7658 Paris.',
  heureDej: 'de 12h à 15h',
  HeureDiner: 'de 19h à 00h',
  caracteristique: 'Cosy, Mesures Covid-19, Asiatique',
  services: 'American, Express, Carte Bleue',
};

const RestaurantContainer = ({
  intl: { formatMessage },
  loading,
  restaurant = {},
  loadRestaurantDetails,
  validateReservationOptions,
  products,
  addMenu,
  order = {},
  removeMenu,
  addFavorite
}) => {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const { match } = useReactRouter();
  const { restaurantId } = match.params;
  const restaurantMarker = restaurant; /*&&
    restaurant.location && {
      lng: restaurant.location.coordinates[0],
      lat: restaurant.location.coordinates[1],
    };*/
  const [showRestaurantDetailModal, setShowRestaurantDetailModal] = useState(
    false,
  );

  const [bookMark, setBookMark] = useState(
    false,
  );

  const handleFavorite = async () => {
    setBookMark(!bookMark);
    const promises = [];
    await promises.push(addFavorite(restaurant._id));
    await Promise.all(promises)
  };

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    loadRestaurantDetails(restaurantId);
  }, []);

  const isReservationOptionsSet = !!order.data;
  const productsPerRow = isReservationOptionsSet ? 2 : 3;

  return (

    
    <div className="mt-5">
     
      {!isReservationOptionsSet &&
      <Row className="restaurant-detail">
      
        <Col lg="7" md="7" xs="7" className="restaurant-detail-card">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${restaurant.imageUrl})`,
              backgroundSize: 'cover',
            }}
          />
          <span className="name-title">{restaurant.name}</span>
          <Row className="ml-0">
            {restaurant.globalRating}/10
            <div className="ml-2">
              <FaRegComment /> {restaurant.views}
            </div>
          </Row>
          <div className="restaurant-detail-text">{restaurant.type}</div>
          <div className="restaurant-detail-text">{formatMessage(messages.detailsPrice)} {restaurant.budget} €</div>
          <div className="restaurant-detail-text">
            {restaurant.address}{' '}
            <span
              className="ml-2 simple-link"
              onClick={() => setShowRestaurantDetailModal(true)}
            >
              {formatMessage(messages.detailsTitle)}
            </span>
          </div>
          <Row className="r-action">
            <Col>
              <div onClick={() => handleFavorite()}>
                { bookMark? <IcoFavorisAtive /> : <IcoFavorisDisAtive/>}
              </div>
            </Col>
            <Col>
              {restaurant.offers && (
                <DetailsText mt='4%' className="offer-details">
                  {<span type="button" className="offers">{restaurant.offers}</span>}
                </DetailsText>
              ) }
              {restaurant.discount && (
                 <span type="button"  className="discount" >{restaurant.discount}%  <FormattedMessage {...messages.reduction} /></span>
              ) }
            </Col>
          </Row>
        </Col>
        <Col lg="5" md="5" xs="5">
          {restaurant && restaurant._id && (
            <MapComponent containerStyle="h-100" marker={restaurant}/>
          )}
        </Col>
      </Row>}
      {isReservationOptionsSet &&
      <Row className="reservation-desc">
        <h3>{order.data}</h3>
        <span>{'   .'}</span>
        <span type="button" className="disbtn">25%</span>
      </Row>}

      <ProductList
        productsPerRow={productsPerRow}
        restaurantName={restaurant.name}
        restaurantId={restaurant._id}
        addProductToCart={addMenu}
        products={products}
        setShowReservationModal={setShowReservationModal}
        isReservationOptionsSet={isReservationOptionsSet}
        order={order}
        removeMenu={removeMenu}
      />
      <InformationsModal
        {...detailsTestData}
        show={showRestaurantDetailModal} restaurantMarker={restaurantMarker}
        handleModal={show => setShowRestaurantDetailModal(show)}
      />

      <ReservationModal
        restaurant={restaurant}
        show={showReservationModal}
        setShow={setShowReservationModal}
        validateReservationOptions={validateReservationOptions}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { restaurant, loading, error, products } = state.restaurant || {};
  const { cart = {} } = state;
  const order = cart.order || {};
  return {
    restaurant,
    products,
    loading,
    error,
    order,
  };
};

const mapDispatchToProps = {
  loadRestaurantDetails,
  addMenu,
  validateReservationOptions,
  removeMenu,
  addFavorite: (id) => dispatch(addFavoriteToUser(id)),
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(RestaurantContainer);
