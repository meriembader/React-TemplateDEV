import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col, FormGroup } from 'react-bootstrap';
import messages from './messages';
import RestaurantMapCard from './RestaurantMapCard';
import { getFavoriteRestaurants , dataFavoris} from '../../containers/MainApp/Profile/Reducer/actions';
import './RestaurantCard.scss';
import CardNothing from '../CardNothing/CardNothing';

const RestaurantCardList = ({
  cardsData,
  intl: { formatMessage },
  getFavoriteRestaurants,
}) => {
         useEffect(() => {
            getFavoriteRestaurants();
          }, []);
          let cardsCols = [];
          const cardsRows = [];
          cardsData && cardsData.map((el, index) => {
            cardsCols.push(<Col lg={4} md={4} xs={4} className="card-element">
                                  <RestaurantMapCard  favoris ={el} order={index} withOpinionIcon={true} />
                            </Col>);
           if((index !== 0 && (index+1)%3===0) || index+1 === cardsData.length){
                       cardsRows.push((<Row> {cardsCols} </Row>));
                       cardsCols=[];
           }
    });


  return (

 
    <FormGroup bsPrefix="ml--3">
        {cardsRows && cardsRows.length > 0 ?  ( cardsRows ):
          (
            <CardNothing title={ messages.nofavoris} msgDetail1={messages.nofavorisD}  buttonName={messages.searchRestaurant2}/>
          )}

    </FormGroup>
  );
};

RestaurantCardList.propTypes = {
  cardsData: PropTypes.array,
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const profile = state.profile || {};
  const cardsData =  dataFavoris// profile && profile.favoriteRestaurants||[];
  return {
    cardsData
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getFavoriteRestaurants: () => dispatch(getFavoriteRestaurants()),
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
)(RestaurantCardList);
