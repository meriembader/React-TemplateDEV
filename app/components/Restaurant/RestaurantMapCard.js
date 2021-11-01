
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {IcoRxOpinion} from '../lib/BsCustomerIcon/BsGenerateIcon';

import './RestaurantCard.scss';
import messages from './messages';
import DetailsText from '../lib/DetailsText/DetailsText';
import DetailsBoldText from '../lib/DetailsBoldText';
import favoriteIconActive from '../../www/icons/favorite-active.svg';
import favoriteIconInactive from '../../www/icons/favorite-inactive.svg';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteFavoriteUser , addFavoriteToUser} from '../../containers/MainApp/Profile/Reducer/actions';

const RestaurantMapCard = ({
  favoris,
  order, unMarkedList,
  deleteFavorite,
   addFavorite,
  withOpinionIcon
}) => {

  const unbooked = unMarkedList && unMarkedList.find((i)=>  i == favoris._id) ;

  const handleFavorite = async () => {
    const promises = [];
    if (!unbooked) {
      await promises.push(deleteFavorite(favoris._id, order));
    } else {
      await promises.push(addFavorite(favoris._id));
    }
    await Promise.all(promises).then(() => {
    });
  };

  return (
  
      <div className="restaurant-card-box-map">
        <div
          className="restaurant-card-img"
          style={{
            backgroundImage: `url(${favoris.imageUrl})`,
            backgroundSize: 'cover',
          }}
        >
          <img
            src={unbooked ? favoriteIconInactive: favoriteIconActive}
            className="favorite-icon"
            alt="favorite-icon"
            onClick={() => handleFavorite()}
          />
        </div>
        <div className="restaurant-card-details-section ">
          <div className="">
            <DetailsBoldText>{favoris.name}</DetailsBoldText>
            <DetailsText>{favoris.address}</DetailsText>
            <DetailsText className="avg-price">
              {' '}
              <FormattedMessage {...messages.averagePrice} />: {favoris.avgPrice}€
            </DetailsText>
            <DetailsText className="type">{favoris.type}</DetailsText>
            <DetailsText>
              <span className="offers-2">{favoris.offers}</span>
            </DetailsText>
            <div className="restaurant-card-rate">
              <DetailsText>
                <span className="rate-value">{favoris.globalRating}</span> /10
              </DetailsText>
                           {withOpinionIcon&&   <DetailsText> <IcoRxOpinion/> {favoris.ratingsNb}  </DetailsText> }

            </div>
          </div>
        </div>
      </div>

  );
}


const mapStateToProps = state => {
  const profile = state.profile || {};
  const unMarkedList = state.form.profile && state.form.profile.values && state.form.profile.values.unbookmarkedRestaurantsIds || [];
  const cardsData = (profile && profile.favoriteRestaurants) || [];
  return {
    cardsData,
    unMarkedList
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    deleteFavorite: (id, order) => dispatch(deleteFavoriteUser(id, order)),
    addFavorite: (id) => dispatch(addFavoriteToUser(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps

);

export default compose(
  withConnect,
  injectIntl,
)(RestaurantMapCard);
