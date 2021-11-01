import { Col, Row } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import DetailsBoldText from '../lib/DetailsBoldText';
import DetailsText from '../lib/DetailsText/DetailsText';
import calendarGrey from '../../www/icons/calendarGrey.svg';
import calendar from '../../www/icons/calendrier-black.png';
import PROFILE_GREY_ICON from '../../www/icons/profile-grey.svg';
import PROFILE_ICON from '../../www/icons/Personne.png';
import SeparatorLine from '../lib/SeparatorLine';
const TEXT_COLOR = '#b0b3bc';
const TEXT_COLOR2 = '#000000';

const ReservationItem = ({
  orderedForDate,
  peopleNumber,
  restaurant,
}) => {
const ToDate = new Date();
const isOld = (new Date(orderedForDate).getTime() < ToDate.getTime()) ? true : false;
  return(
    <div className="card-box">
      <Row className="h-100">
        <Col
          lg={6}
          md={6}
          sd={6}
          xs={5}
          style={{
            backgroundImage: `url(${restaurant && restaurant.imageUrl})`,
            backgroundSize: 'cover',
            borderRadius: '15px'
          }}
        />
        <Col  className="painding-card">
          <Row>
            <Col >
              <DetailsBoldText color={isOld? TEXT_COLOR : TEXT_COLOR2}>{restaurant && restaurant.name}</DetailsBoldText>
            </Col>
          </Row>
          <Row>
            <DetailsText color={isOld? TEXT_COLOR : TEXT_COLOR2}>{restaurant && restaurant.address}</DetailsText>
          </Row>
          <Row className="date-info" >
            <Col  lg={1} md={1} xs={1}>
              <img alt="user_image" src={isOld ? calendarGrey: calendar} fill="red" className="icon-style"/>
            </Col>
            <Col  lg={6} md={6} xs={6}>
              <DetailsText  color={isOld? TEXT_COLOR : TEXT_COLOR2}>
                {moment(orderedForDate)
                  .locale('fr')
                  .format('ddd, DD MMMM.HH:mm')}
              </DetailsText>
            </Col>
            <Col lg={1} md={1} xs={1} >
              <img src={isOld ? PROFILE_GREY_ICON : PROFILE_ICON}  className="icon-profile" alt="profile-icon" />
            </Col>
            <Col lg={1} md={1} xs={1} >
            <DetailsText className="number-inv" color={isOld? TEXT_COLOR : TEXT_COLOR2}>
              {peopleNumber}
            </DetailsText>
            </Col>
          </Row>
          <Row >
            <SeparatorLine width='90%'/>
          </Row>
          <Row>
            <DetailsText size="14px" color={TEXT_COLOR}>
              {restaurant && restaurant.type}
            </DetailsText>
          </Row>
        </Col>
      </Row>
    </div>
  )
};

ReservationItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default injectIntl(ReservationItem);
