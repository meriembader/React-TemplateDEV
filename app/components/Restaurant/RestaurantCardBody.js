/*
 * RestaurantCardBody
 *
 * This is the restaurant Card Components
 *
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Col} from 'react-bootstrap';
import {IcoRxOpinion} from '../lib/BsCustomerIcon/BsGenerateIcon';
import './RestaurantCard.scss';
import messages from './messages';
import DetailsText from '../lib/DetailsText/DetailsText';
import DetailsBoldText from '../lib/DetailsBoldText';
import SeparatorLine from '../lib/SeparatorLine';
import history from 'utils/history';

const RestaurantCardBody = ({restaurant, vertical}) => {

  const openRestaurantDetail = () => {
    history.push('/restaurant/'+restaurant._id);
  }
  return (
        <Col lg={vertical?12:6} md={6} xs={6} className="restaurant-card-details-section">
          <div  onClick={openRestaurantDetail}>
            <DetailsBoldText mb='6%'>{restaurant.name}</DetailsBoldText>
            <DetailsText hidden={vertical}>{restaurant.address}</DetailsText>
            <DetailsText mt='4%'>
              <FormattedMessage {...messages.averagePrice}/> : {restaurant.type}
            </DetailsText>
            <DetailsText mt='4%'>
              <FormattedMessage {...messages.deliveryFees}/> : {restaurant.deliveryFees}
            </DetailsText>
            <DetailsText className="type" hidden={!vertical}>{restaurant.type}</DetailsText>
            {restaurant.offers && (
              <DetailsText mt='4%' className="offer-details">
                {!vertical ? <span type="button" className="offers">{restaurant.offers}</span> : <DetailsText color='#45b995'> {restaurant.offers} </DetailsText>}
              </DetailsText>
            ) }
            {restaurant.discount && (
              !vertical ? <span type="button" className="discount-card">{restaurant.discount}%  <FormattedMessage {...messages.reduction} /></span> :  <DetailsText color='red'> {restaurant.discount}%  <FormattedMessage {...messages.reduction} /> </DetailsText>
            ) }
            <SeparatorLine hidden={vertical}/>
            <DetailsText className="type" hidden={vertical}>{restaurant.type}</DetailsText>
            <div className={vertical ? 'restaurant-card-rate-v' : 'restaurant-card-rate'}>
              <DetailsText>{restaurant.globalRating} / 10</DetailsText>
              <DetailsText mt='4%'>
                <IcoRxOpinion width="13" height="13"/> {restaurant.ratingsNbr}
              </DetailsText>
            </div>
          </div>
        </Col>
  )};

export default RestaurantCardBody;
