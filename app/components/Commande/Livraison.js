import React, { useState, useRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, Form, reduxForm } from 'redux-form';
import { Button, Col, Row } from 'react-bootstrap';
import CommandesBox from './CommandesBox';
import SubTitleBoldText from '../lib/SubTitleBoldText';
import messages from './messages';
import Select from 'react-select'

import TextField from '../lib/FormInputs/TextField';
import DetailsText from '../lib/DetailsText/DetailsText';
import TextEntry from "../lib/FormInputs/InputTextEntry";


const selectType = () => (
  <Select options={options} />
)

let Livraison = ({ onClickNextStep }) => (
  <div>
    <SubTitleBoldText size="22px" className="mt-2">
      <FormattedMessage {...messages.livraisonTitle} />
    </SubTitleBoldText>
    <Form className="mt-5">
      <Row className="ml-0">
        <Field
          name="codePromo"
          type="text"
          placeholder="En main propre"
          component={TextEntry}
        />
      </Row>
      <SubTitleBoldText size="16px">
        {' '}
        <FormattedMessage {...messages.adresseTitle} />
      </SubTitleBoldText>
      <Row className="ml-0">
        <Field
          name="email"
          type="email"
          component={TextEntry}
        />
      </Row>
      <SubTitleBoldText size="16px">
        {' '}
        <FormattedMessage {...messages.instructionTitle} />
      </SubTitleBoldText>
      <Row className="ml-0">
        <Field
          name="inst"
          type="email"
          component={TextEntry}
        />
      </Row>
      <Row className="ml-0">
        <Button
          className="validation-btn-Common text-center"
          onClick={onClickNextStep}
        >
          <FormattedMessage {...messages.nextButton} />
        </Button>
      </Row>
    </Form>
  </div>
);
// eslint-disable-next-line no-const-assign
Livraison = reduxForm({
  // a unique name for the form
  form: 'livraisonForm',
})(Livraison);
export default injectIntl(Livraison);
