/*
 * RestaurantMapCard
 *
 * This is the restaurant Map Card Components
 *
 */

import React, { memo } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row } from 'react-bootstrap';
import messages from './messages';
import favoriteIconActive from '../../www/icons/favorite-active.svg';
import favoriteIconInactive from '../../www/icons/favorite-inactive.svg';
import DetailsBoldText from '../lib/DetailsBoldText';
import DetailsText from '../lib/DetailsText/DetailsText';
import './RestaurantCard.scss';
import {
  addFavoriteToUser,
  deleteFavoriteUser,
} from '../../containers/MainApp/Profile/Reducer/actions';

const RestaurantCard2 = ({
  imageUrl,
  name,
  _id,
  avgPrice,
  type,
  isFavorite,
  globalRating,
  addFavoriteToUser,
  deleteFavoriteUser,
  className,
  typeCateg,
  updateRestaurants,
}) => {
  const handleFavorite = async () => {
    const promises = [];
    if (!isFavorite) {
      await promises.push(deleteFavoriteUser(_id));
    } else {
      await promises.push(addFavoriteToUser(_id));
    }
    await Promise.all(promises).then(() => {
      updateRestaurants(_id, typeCateg, !isFavorite);
    });
  };

  return (
    <div>
     
      <div className={className}>
        <div
          className="restaurant-card-img"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
          }}
        >
          {/* eslint-disable-next-line no-template-curly-in-string,jsx-a11y/alt-text */}
          <img
            src={isFavorite ? favoriteIconActive : favoriteIconInactive}
            className="favorite-icon"
            alt="favorite-icon"
            onClick={handleFavorite}
          />
        </div>
        <div>
          <Row className="mx-0">
            <DetailsBoldText className="mr-auto">{name}</DetailsBoldText>
            <DetailsText>
              <span className="rate-value">{globalRating}</span> /10
            </DetailsText>
          </Row>

          <DetailsText className="avg-price">
            {' '}
            <FormattedMessage {...messages.averagePrice} />: {avgPrice}
          </DetailsText>

          <DetailsText className="type">{type}</DetailsText>
        </div>
      </div>
    </div>
  );
};

export function mapDispatchToProps(dispatch) {
  return {
    addFavoriteToUser: id => dispatch(addFavoriteToUser(id)),
    deleteFavoriteUser: id => dispatch(deleteFavoriteUser(id)),
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(RestaurantCard2);
