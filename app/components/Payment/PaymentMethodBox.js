import { Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import TitleBoldText from '../lib/TitleBoldText';
import SeparatorLine from '../lib/SeparatorLine';
import RadioButtonComponent from '../RadioButton/RadioButtonComponent';
import AddCardModal from './AddCardModal'
import AddBonModal from './AddBonModal'
const PAYMENT_METHODS = {
  cash: 'CASH',
  card: 'CARD',
  bon: 'BON',
};
const MyEdenred_LOGO = require('www/icons/Edenred_Logo.jpg');
const Swile_LOGO = require('www/icons/Swile_Logo.jpg');

const PaymentMethodBox = ({ intl: { formatMessage }, restaurantName = 'Titre-restaurant' }) => {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.card);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBonModal, setShowBonModal] = useState(false);

  const handlePassPayment = () => {
    if(paymentMethod == "BON"){
      setShowBonModal(true)
    }else if (paymentMethod == "CARD"){
      setShowPaymentModal(true)
    }

  }
  return (
    <div className="boxpay-with-border-radius">
      <TitleBoldText size="22px">
        {formatMessage(messages.paymentMethodTitle)}
      </TitleBoldText>
      <div className="mt-2">
        <RadioButtonComponent
          name={formatMessage(messages.paymentMethodDebitCardTitle)}
          selectedValue={paymentMethod}
          value={PAYMENT_METHODS.card}
          onChange={setPaymentMethod}
        />
        <SeparatorLine/>

        <RadioButtonComponent
          name={formatMessage(messages.paymentMethodCashTitle)}
          selectedValue={paymentMethod}
          value={PAYMENT_METHODS.cash}
          onChange={setPaymentMethod}
        />
        <SeparatorLine/>

        <RadioButtonComponent
          name={formatMessage(messages.paymentMethodBonTitle)}
          selectedValue={paymentMethod}
          value={PAYMENT_METHODS.bon}
          onChange={setPaymentMethod}
        />
        <SeparatorLine/>

        <TitleBoldText className="ml-2" size="16px">
          {restaurantName}
        </TitleBoldText>
        <RadioButtonComponent
          name="MyEdenred"
          selectedValue={paymentMethod}
          imageUri={MyEdenred_LOGO}
        />
        <RadioButtonComponent
          name="Swile"
          selectedValue={paymentMethod}
          onChange={setPaymentMethod}
          imageUri={Swile_LOGO}
        />
      </div>

      <Row>
        <span className="Trac-997"
                onClick  = {() => handlePassPayment(true)}
        >
          {formatMessage(messages.validatePaymentMethodBtn)}
        </span>
      </Row>
      <AddCardModal
        show={showPaymentModal}
        setShow={show => setShowPaymentModal(show)}
      />
      <AddBonModal
        show={showBonModal}
        setShow={show => setShowBonModal(show)}
      />
    </div>
  );
};

export default injectIntl(PaymentMethodBox);
