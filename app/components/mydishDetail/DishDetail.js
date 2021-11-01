import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Mydish.css';
import { CgEuro } from 'react-icons/cg';
import DetailsText from '../lib/DetailsText/DetailsText';
import DetailsBoldText from '../lib/DetailsBoldText';

// eslint-disable-next-line no-empty-pattern
const DishDetail = ({
  name,
  description,
  price,
  imageUrl,
  viewProductDetails,
  product,
}) => (
  <div>
    
    <Row className="mydish-box">
      <Col lg={6} md={6} xs={6} className="restaurant-card-details-section ">
        <DetailsBoldText
          className="link"
          onClick={() => viewProductDetails(product)}
        >
          {name}
        </DetailsBoldText>
        <DetailsText className="detail">{description}</DetailsText>

        <div className="price-style">
          <DetailsBoldText size="13px">
            {price}
            <CgEuro />
          </DetailsBoldText>
        </div>
      </Col>
      <Col
        lg={6}
        md={6}
        xs={6}
        className="mydish-card-img link"
        onClick={() => viewProductDetails(product)}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
        }}
      />
    </Row>
  </div>
);

export default DishDetail;
