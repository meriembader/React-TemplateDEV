import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import SeparatorLine from '../../components/lib/SeparatorLine';
import TitleBoldText from '../../components/lib/TitleBoldText';
import { listSpecialités } from './constants';
import {
  IcoRxLeftArrowActif,
  IcoRxLeftArrowInactif,
  IcoRxRightArrowActif, IcoRxRightArrowInactif,
} from '../../components/lib/BsCustomerIcon/BsGenerateIcon';

const RestaurantsSpecialities = ({
  categoryName,
  restaurants,
  className,
  type,
  updateRestaurants,
}) => {
  const [page, usePage] = useState(1);
  const leftArrow = page == 1 ? <IcoRxLeftArrowInactif  /> : <IcoRxLeftArrowActif   />;
  const rightArrow = page == 1 ? <IcoRxRightArrowActif /> : <IcoRxRightArrowInactif  />;


  return (
    <div className={className}>
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
              <TitleBoldText size="16px">Voir plus</TitleBoldText>
            </Link>
            <div
              className="link-icon ml-1"
              onClick={() => usePage(1)}
            >
              {leftArrow}
            </div>
            <div
              className="link-icon ml-1"
              onClick={() => usePage(2)}
            >
              {rightArrow}
            </div>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {listSpecialités &&
          listSpecialités.map((el, index) => {
            if (page == 1) {
              if (index < 7) {
                return (
                  <div>
                    <img
                      className="link-icon ml-3 speciality-box"
                      src={el.imageUrl}
                      alt={el.name}
                    />
                    <div className=" text-center speciality-title">
                      {el.name}
                    </div>
                  </div>
                );
              }
            } else if (index > 8) {
              return (
                <div>
                  <img
                    className="link-icon ml-1 speciality-box"
                    src={el.imageUrl}
                    alt={el.name}
                  />
                  <div className="center-text">{el.name}</div>
                </div>
              );
            }
          })}
      </Row>
    </div>
  );
};

export default RestaurantsSpecialities;
