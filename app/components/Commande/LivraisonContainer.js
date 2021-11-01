import React, { useState, useRef, memo } from 'react';
import { injectIntl } from 'react-intl';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DetailsLivraison from './DetailsLivraison';
import Livraison from './Livraison';
import CommandesBox from './CommandesBox';
import SeparatorLine from '../lib/SeparatorLine';
import TitleBoldText from '../lib/TitleBoldText';
import PaymentMethodBox from '../Payment/PaymentMethodBox';
import { loadRestaurantDetails } from '../../containers/MainApp/Restaurant/Reducer/actions';
import { addMenu } from '../../containers/MainApp/Reducer/actions';
import {
  loadRestaurantsByCategories2,
  updateRestaurants,
} from '../../containers/MainLandingPage/Reducer/actions';

const LivraisonContainer = ({ order = {} }) => {
  const [step, setStep] = useState('DETAILS');
  const onClickNextStep = () => {
    switch (step) {
      case 'DETAILS':
        setStep('PAYMENT');
        break;
      default:
        setStep('CLIENT');
        break;
    }
  };
  return (
    <div>
      <TitleBoldText size="30px">{order.data}</TitleBoldText>
      <span type="button" className="disbtn">25%</span>

      <SeparatorLine />
      <Row className="delivery-box">
        {step === 'DETAILS' && (
          <Col lg={5} md={5} xs={5}>
            <Livraison onClickNextStep={onClickNextStep} />
          </Col>
        )}
        <Col lg={3} md={3} xs={3}>
          {step === 'PAYMENT' && <DetailsLivraison />}
        </Col>
        <Col lg={4} md={4} xs={4}>
          <CommandesBox order={order} />
        </Col>
        {step === 'PAYMENT' && (
          <Col lg={5} md={5} xs={5}>
            <PaymentMethodBox />
          </Col>
        )}
      </Row>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { order } = state.cart || {};
  return {
    order,
  };
};

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(LivraisonContainer);
