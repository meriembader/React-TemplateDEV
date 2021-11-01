import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Row, Button, Col } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import messages from './messages';
import DishDetail from '../../../components/mydishDetail/DishDetail';
import './RestaurantContainer.scss';
import ProductDetailsModal from '../../../components/Product/ProductDetailsModal';
import SeparatorLine from '../../../components/lib/SeparatorLine';
import useReactRouter from 'use-react-router';

const ProductListCategory = ({
  products = [],
  title,
  viewProductDetails,
  productsPerRow = 3,
  id
}) => {
  return(
    <div className="mt-5"  id= {id}>
      <h4>{title}</h4>

      <Row className="mt-0">
        {products &&
        products.map(el => (
          <Col
            lg={12 / productsPerRow}
            md={12 / productsPerRow}
            xs={12 / productsPerRow}
            className="mt-5"
          >
            <DishDetail
              {...el}
              product={el}
              viewProductDetails={viewProductDetails}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

const MenuReservation = ({ menu, deleteMenu }) => (
  <div className=" mb-3">
    <Row className="ml-0 mr-0 bold">
      <div>{menu.quantity}</div>
      <div className="ml-2">{menu.name}</div>
      <div className="ml-auto">{menu.price} €</div>
    </Row>
    <div className="detail ml-4">Vermicelle du riz. sauce tomate</div>
    <div className="detail ml-4">Piquante, plus de sauce.</div>
    <div className="row remove mr-0 ml-4 mt-2" onClick={() => deleteMenu(menu)}>
      <AiOutlineClose/>
      <span>Supprimer</span>
    </div>
  </div>
);

const ProductList = ({
  products = {},
  intl: { formatMessage },
  addProductToCart,
  restaurantName,
  restaurantId,
  setShowReservationModal,
  productsPerRow = 3,
  order = { subTotal: 0, orderDetails: [] },
  isReservationOptionsSet = true,
  removeMenu,
}) => {
  const { history } = useReactRouter();
  const [productCategory, setProductCategory] = useState('ENTREE');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const productsCol = isReservationOptionsSet ? 8 : 12;
  const viewProductDetails = product => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const confirmCommand = () => {
    history.push('/commande');
  };

  return (
    <div className="products-container">
      
      <Row className="products-list align-items-center mr-0">
        <div
          onClick={() => setProductCategory('ENTREE')}
          className={productCategory === 'ENTREE' ? 'active' : 'item'}
        >
          <a href="#categ-1" className="mx-auto toolbar-menu" >{formatMessage(messages.entree)}</a>
        </div>
        <div
          onClick={() => setProductCategory('PLAT')}
          className={productCategory === 'PLAT' ? 'active' : 'item'}
        >
          <a href="#categ-2" className="toolbar-menu">{formatMessage(messages.plat)}</a>
        </div>
        <div
          onClick={() => setProductCategory('DESSERT')}
          className={productCategory === 'DESSERT' ? 'active' : 'item'}
        >
          <a href="#categ-3" className="toolbar-menu">{formatMessage(messages.dessert)}</a>
        </div>
        <div
          onClick={() => setProductCategory('BOISSON')}
          className={productCategory === 'BOISSON' ? 'active' : 'item'}
        >
          <a href="#categ-4" className="toolbar-menu">{formatMessage(messages.boisson)}</a>
        </div>
        {!isReservationOptionsSet && <span
          variant="success"
          className="ml-auto reserve-btn"
          onClick={() => setShowReservationModal(true)}
        >
          {formatMessage(messages.reserveTable)}
        </span>}
      </Row>
      <Row>
        <Col lg={productsCol}  md={productsCol} xs={productsCol}>
          <ProductListCategory id= "categ-1"
            productsPerRow={productsPerRow}
            className="mt-5"
            products={products.ENTREE}
            title={formatMessage(messages.entree)}
            viewProductDetails={viewProductDetails}
          />
          <ProductListCategory id= "categ-2"
            productsPerRow={productsPerRow}
            products={products.PLAT}
            title={formatMessage(messages.plat)}
            viewProductDetails={viewProductDetails}
          />
          <ProductListCategory id= "categ-3"
            productsPerRow={productsPerRow}
            products={products.DESSERT}
            title={formatMessage(messages.dessert)}
            viewProductDetails={viewProductDetails}
          />
          <ProductListCategory id= "categ-4"
            productsPerRow={productsPerRow}
            products={products.BOISSON}
            title={formatMessage(messages.boisson)}
            viewProductDetails={viewProductDetails}
          />
        </Col>
        {isReservationOptionsSet && (
          <Col lg="4" md="4" xs="4">
            <div className="confirm-reser-box">
              <Button
                className={
                  order.orderDetails.length > 0
                    ? 'confirm-btn'
                    : 'confirm-btn-disabled'
                }
                variant="success"
                onClick={() => history.push('/Commande')}
              >
                Confirmer la réservation
              </Button>
              <SeparatorLine/>
              {!order.orderDetails.length && (
                <div>
                  Sélectionnez vos plats et ajoutez-les à votre réservation.
                </div>
              )}
              {order.orderDetails.length > 0 &&
                order.orderDetails.map(el => (
                  <MenuReservation menu={el} deleteMenu={removeMenu} />
                ))}
              {order.orderDetails.length > 0 && <SeparatorLine />}
              <Row className="mt-5 ml-0 mr-0 bold">
                <div>Sous-total</div>
                <div className="ml-auto">{order.subTotal || 0} €</div>
              </Row>
            </div>
          </Col>
        )}
      </Row>
      <ProductDetailsModal
        restaurantName={restaurantName}
        restaurantId={restaurantId}
        menu={selectedProduct}
        show={showProductModal}
        setShow={view => setShowProductModal(view)}
      />
    </div>
  );
};

export default injectIntl(ProductList);
