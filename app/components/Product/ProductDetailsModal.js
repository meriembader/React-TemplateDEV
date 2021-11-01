import { Button, Modal, Row, Col } from 'react-bootstrap';
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineClose,
} from 'react-icons/ai';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from './messages';
import TitleBoldText from '../lib/TitleBoldText';
import DescriptionText from '../lib/DescriptionText';
import SeparatorLine from '../lib/SeparatorLine';
import RadioButtonComponent from '../RadioButton/RadioButtonComponent';
import { loadRestaurantDetails } from '../../containers/MainApp/Restaurant/Reducer/actions';
import { addMenu } from '../../containers/MainApp/Reducer/actions';
import plusActive from '../../www/icons/plus-active.png';
import plusDesactive from '../../www/icons/plus-desactive.png';
import minusActive from '../../www/icons/minus-active.png';
import minusDisable from '../../www/icons/minus-disabled.png';

const TEST_DATA = {
  description:
    'Pâtes fraîches au choix. Sauce tomate, basilic, piment et parmesan.',
  options: {
    name: 'Pâtes au choix',
    isMandatory: true,
    choices: [
      {
        label: 'Vermicelle du riz',
        price: '1.00 $',
      },
      {
        label: 'Pâtes épaisses',
        price: '2.00 $',
      },
      {
        label: 'Pâtes fines',
        price: '3.00 $',
      },
    ],
  },
};
const ProductDetailsModal = ({
  intl: { formatMessage },
  menu = {},
  addProductToCart,
  show,
  setShow,
  restaurantData,
  restaurantName,
  restaurantId,
}) => {
  const [productNbr, setProductNbr] = useState(1);
  const [consigne, setConsigne] = useState('');
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);
  const {
    name,
    description = TEST_DATA.description,
    imageUrl,
    options = TEST_DATA.options,
    price,
  } = menu;
  const minusDisabled = productNbr <= 1;

  const addCommand = () => {
    setShow(false);
    addProductToCart(menu, productNbr, consigne, restaurantData, '')
  }
  return (
    <div className="modal-container">
      <Modal
        show={show}
        size="lg"

      >
        <Modal.Header className="modal-header-style m-0 p-0">
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            alt="product-image"
            className="img-border-radius"
            src={imageUrl}
          />
        </Modal.Header>
        <Modal.Body className="p-5">
          <TitleBoldText size="22px">{name}</TitleBoldText>
          <DescriptionText size="16">{description}</DescriptionText>
          <SeparatorLine />

          {options.name && (
            <div>
              <TitleBoldText size="18px">{options.name}</TitleBoldText>
              {options.isMandatory && (
                <DescriptionText size="16">Obligatoire</DescriptionText>
              )}
              {options.choices &&
                options.choices.map((el, index) => (
                  <RadioButtonComponent
                    key={`product-option-${index}`}
                    name={el.label}
                    selectedValue={selectedOptionValue}
                    onChange={() => setSelectedOptionValue(el.label)}
                    value={el.label}
                    price={el.price}
                  />
                ))}
            </div>
          )}
          <SeparatorLine />
          <div>
            <TitleBoldText size="16px">
              {formatMessage(messages.specialInsctruction)}
            </TitleBoldText>
            <Row>
              <textarea
                className="Path-971"
                id="specialInstructionArea"
                placeholder="Ajouter une remarque ou une instruction spéciale"
                rows="3"
              />
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer-style m-0 p-0">
          <row className="edit-product-nbr">
            <img
              onClick={() => setProductNbr(productNbr - 1)}
              size="lg"
              variant="light"
              src={minusDisabled ? minusDisable: minusActive}
            >
            </img>
            {' '}
            <TitleBoldText size="18px">{productNbr}</TitleBoldText>
            {' '}
            <img
              onClick={() => setProductNbr(productNbr + 1)}
              size="lg"
              variant="light"
              src={plusActive}

            >
            </img>
            <span
              size="lg"
              className="Path-917"
              variant="secondary"
              onClick={() => addCommand()}
            >
              {formatMessage(messages.addToCommand)}+ {`${price * productNbr},00 €` }
            </span>
          </row>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

ProductDetailsModal.propTypes = {
  menu: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  restaurantName: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  const { restaurant = {} } = state.restaurant || {};
  const restaurantData = {
    restaurant: restaurant._id,
    restaurantName: restaurant.name,
    restaurantType: restaurant.type,
  };
  return {
    restaurant,
    restaurantData,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    loadRestaurant: restaurantId =>
      dispatch(loadRestaurantDetails(restaurantId)),
    addProductToCart: (
      menu,
      quantity,
      consigne,
      restaurantData,
      userId,
    ) =>
      dispatch(
        addMenu(menu, quantity, consigne, restaurantData, userId),
      ),
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
)(ProductDetailsModal);
