import React, { memo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SubTitleBoldText from '../lib/SubTitleBoldText';
import './commande.css';
import TitleBoldText from '../lib/TitleBoldText';
import DetailsText from '../lib/DetailsText/DetailsText';
import { IoIosClose } from 'react-icons/io';
import { CgEuro } from 'react-icons/cg';
import messages from './messages';
import redminus from '../../www/icons/redminus.png';
import greenplus from '../../www/icons/greenplus.png';

const Commande = ({ commandeData, productTotal, setProductTotal }) => {

const [productNbr, setProductNbr] = useState(commandeData.quantity);
const handlechangeQuantity = (nbre) => {
  if (productNbr - nbre < 0){
    productTotal += commandeData.price;
  }else {
    productTotal -= commandeData.price;
  }
  setProductNbr(nbre);
  setProductTotal(productTotal);

}
return (
<div className="mb-3">
    <Row className="ml-0 mr-0">
      <div>
        <img
          size="lg"
          variant="light"
          src={redminus}
          onClick={() => handlechangeQuantity(productNbr - 1)}
          className="edit-quantity"
        >
        </img>
        <TitleBoldText size="15px">
          {productNbr}
        </TitleBoldText>
          <img
            size="lg"
            variant="light"
            src={greenplus}
            onClick={() => handlechangeQuantity(productNbr + 1)}
            className="edit-quantity"
          >
          </img>
      </div>
      <div>
        <span className="title-item">
          {commandeData.name}
        </span>
      </div>
      <div className="ml-auto offer-price">
        <DetailsText size="18px">
          {commandeData.price}
          <CgEuro />
        </DetailsText>
      </div>
    </Row>
    <DetailsText>{commandeData.description}</DetailsText>

  </div>
);
};
Commande.propTypes = {
  commandeData: PropTypes.string,
};
export default injectIntl(Commande);
