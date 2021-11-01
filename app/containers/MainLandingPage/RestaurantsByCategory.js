import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, FormGroup, InputGroup } from 'react-bootstrap';
import SeparatorLine from '../../components/lib/SeparatorLine';
import TitleBoldText from '../../components/lib/TitleBoldText';
import { IcoRxLeftArrowActif, IcoRxLeftArrowInactif, IcoRxRightArrowActif, IcoRxRightArrowInactif }from '../../components/lib/BsCustomerIcon/BsGenerateIcon';
import { restaurantsTestData } from './constants';
import RestaurantMapCard from '../../components/Restaurant/RestaurantMapCard';
import messages from './messages';

const RestaurantsByCategory = ({
  categoryName,
  restaurants,
  className,
  formatMessage,
  type,
  updateRestaurants,
}) => {
  const [page, usePage] = useState(1);
  const leftArrow = page === 1 ? <IcoRxLeftArrowInactif  /> : <IcoRxLeftArrowActif   />;
  const rightArrow = (page*4) === restaurantsTestData.length ? <IcoRxRightArrowInactif  />: <IcoRxRightArrowActif />;

  return (
    <FormGroup bsPrefix={className}>
      <SeparatorLine className="mb-5 mt-4" />
      <Row className="mt-5 mx-0">
        <Col>
        <TitleBoldText className="mr-auto" size="26px">
          {categoryName}
        </TitleBoldText>
        </Col>
        <Col md={{ span: 2, offset: 2 }} bsPrefix="nav-card">
          <InputGroup>
            <Link className="simple-link mt-2" to={`/restaurants/${type}`}>
              <TitleBoldText size="16px">{formatMessage(messages.seeMore)}</TitleBoldText>
            </Link>
            <div
              className="link-icon ml-1"
              onClick={() => usePage(page - 1)}
            >
            {leftArrow}
            </div>
            <div
              className="link-icon ml-1"
              onClick={() => usePage(page + 1)}
            >
              {rightArrow}
            </div>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {restaurantsTestData &&
        restaurantsTestData.map((el, index) => {
          if( (((page-1)*4) <= index) && index < (((page-1)*4)+4))
                return (
                  <Col lg="3" md="3" xs="3" className="ignore-panding-right">
                    <RestaurantMapCard
                      favoris ={el} order={index} type={type}
                    />
                  </Col>
                );
          })}
      </Row>
    </FormGroup>
  );
};

export default RestaurantsByCategory;
