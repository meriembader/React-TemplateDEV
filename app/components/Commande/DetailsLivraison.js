import React, { useState, useRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Col, Row } from 'react-bootstrap';
import { Form } from 'redux-form';
import CommandesBox from './CommandesBox';
import Livraison from './Livraison';
import SeparatorLine from '../lib/SeparatorLine';
import TitleBoldText from '../lib/TitleBoldText';
import SubTitleText from '../lib/SubTitleText';
import SubTitleBoldText from '../lib/SubTitleBoldText';
import messages from './messages';

const DetailsLivraison = ({}) => (
  <div>
    <Row className="row-menu ml-0">
      <SubTitleBoldText size="20px">
        <FormattedMessage {...messages.livraisonTitle} />
      </SubTitleBoldText>
      <span className="mt-2" style={{ 'font-size': '12px', color: '#45b995' }}>
        Modifier
      </span>
    </Row>

    <SeparatorLine className="mt-2 mb-2" />
    <SubTitleText className="SubTitle"> En main propre</SubTitleText>
    <div className="mt-2">
      <SubTitleBoldText size="16px">
        {' '}
        <FormattedMessage {...messages.adresseTitle} />
      </SubTitleBoldText>
      <br />
      <SubTitleText className="SubTitle"> 10 rue Gustave</SubTitleText>
    </div>
    <div className="mt-2">
      <SubTitleBoldText size="16px">
        {' '}
        <FormattedMessage {...messages.instructionTitle} />
      </SubTitleBoldText>
      <br />
      <SubTitleText className="SubTitle">
        Près de l'hôtel la défense Courbevoie.
      </SubTitleText>
    </div>
  </div>
);
export default injectIntl(DetailsLivraison);
