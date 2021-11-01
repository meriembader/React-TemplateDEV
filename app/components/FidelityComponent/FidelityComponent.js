import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './FidelityComponent.scss';
import TitleBoldText from '../lib/TitleBoldText';
import DetailsText from '../lib/DetailsText/DetailsText';
import messages from './messages';
import {getPromotions} from '../../containers/FidelityPage/Reducer/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CardNothing from '../CardNothing/CardNothing';
const TEXT_COLOR = '#070304';

const FildelityItem = ({ restaurantName, restaurantType, promoCode }) => {
  return (
    <div className="fidelity-item-box">
      <Row className="fidelity-item-content">
        <Col lg={7} md={7} xs={6}>
          <TitleBoldText size="22px">{restaurantName}</TitleBoldText>
          <DetailsText color={TEXT_COLOR }>{restaurantType}</DetailsText>
        </Col>
        <Col lg={5} md={5} xs={6}>
          <div className="promoCode-box d-flex align-items-center">
            <DetailsText className="mx-auto promoCode-title"  color={TEXT_COLOR }>{promoCode}</DetailsText>
          </div>
        </Col>
      </Row>
    </div>
  );
};

FildelityItem.propTypes = {
  restaurantName: PropTypes.string.isRequired,
  restaurantType: PropTypes.string.isRequired,
  promoCode: PropTypes.string.isRequired,
};

const FidelityComponent =
    ({ getPromotions, fidelityData, intl: { formatMessage } }) => {
      useEffect(() => {
        getPromotions();
      }, []);
  return (
    <div className="pl-3">
      {fidelityData && fidelityData.length > 0 ? (<div className="mt-3">
        {fidelityData && fidelityData.map((el, index) => {
          return (
            <Row key={`fidelity-item-${index}`}>
              <FildelityItem
                promoCode={el.code}
                restaurantType={el.restaurant.type}
                restaurantName={el.restaurant.name}/>
            </Row>
          );
        })}
      </div>)
        :
        <CardNothing title={ messages.nofavorisComponentTitle} msgDetail1={messages.nofavorisComponentDetail}  buttonName={messages.searchRestaurant}/>}

    </div>
  );
};

FidelityComponent.propTypes = {
};

const mapStateToProps = state => {
  const fidelityData = state.profile && state.profile.promoCodes || [];
  return {
    fidelityData
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getPromotions: () => dispatch(getPromotions())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(FidelityComponent);
