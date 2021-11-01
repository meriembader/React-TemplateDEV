import React from 'react';
import {RiBankCardLine}  from "react-icons/ri";
import {BsPlusCircle}  from "react-icons/bs";
import { Button, Col, Row } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import TextEntry from '../lib/FormInputs/TextEntry';
import { Field } from 'redux-form';
import creditCard from '../../www/icons/credit-card.png';

let PaymentCard = ({ intl: { formatMessage } , user, onAddNewCard, disabled, onRemoveCard }) => {

  let NoPaymentCardSection = (
    <Row className="payment-card-row">
      <img  src={creditCard} fill="red" className="payment-card-icons"/>
      <span className = "payment-card-status">
         <FormattedMessage {...messages.nocard} />
      </span>
      <Button disabled= {disabled } onClick = {onAddNewCard}  variant="link"><BsPlusCircle className = "payment-card-status"/>
      </Button>
    </Row>
  );

  let cardNumber = user && user.cardNumber ? user.cardNumber : '';

  if (!cardNumber){
    return NoPaymentCardSection;
  }else{
    return (
      <Field
        name='user.cardNumber'
        onChange={onRemoveCard}
        type="text"
        disabled= {disabled }
        component={TextEntry}
        prefixSrc={creditCard}
        className="text-input"
      />

    );
  }
};

PaymentCard.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(PaymentCard);
