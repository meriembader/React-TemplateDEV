/*
 * OfferCardComponent
 *
 * This is the OfferCard Method Component
 *
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BsChat } from 'react-icons/bs';
import Radio from '@material-ui/core/Radio';
import DetailsBoldText from '../lib/DetailsBoldText';
import DescriptionText from '../lib/DescriptionText';
import './OfferCard.css';

export const OfferCardComponent = ({ title, description, indexSelected, index, handleSelectOffer }) => (
  <div
    className="row offer-card"
    style={{
      backgroundColor: indexSelected==index ? '#f1f5f8' : null,
    }}
  >
    <Col lg={12} md={12} className=" align-self-center justify-content-center" onClick={() => handleSelectOffer(title)}>
      <DescriptionText
        className="text-center"
        size="17px"
        color={indexSelected ==index ? '#fb5557' : '#000000'}
      >
        {title}
      </DescriptionText>
      <DescriptionText className="text-center" size="16px" color="#000000">
        {description}
      </DescriptionText>
    </Col>
  </div>
);

// eslint-disable-next-line react/prop-typescdz
export const OfferCardList = ({ offers, handleSelectOffer, indexSelected }) => (
  <div>{offers && offers.map((el,i) => <OfferCardComponent indexSelected= {indexSelected} handleSelectOffer={handleSelectOffer} index={i} {...el} />)}</div>
);
