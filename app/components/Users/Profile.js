/**
 * Profile.js
 * COMPB001
 */

import React from 'react';
import {  Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DetailsBoldText from '../lib/DetailsBoldText';
import DetailsText from '../lib/DetailsText/DetailsText';
import { IcoRxAvatar } from '../lib/BsCustomerIcon/BsGenerateIcon';
import './Profile.scss';
import moment from 'moment';

const Profile = ({ imageUri, firstName, phoneNumber, date, classNames }) => {
  let classNameAvatar=classNames&&classNames.avatar?classNames.avatar:"avatar";
  let classNameName=classNames&&classNames.name?classNames.name:"name";
  let classNameNum=classNames&&classNames.num?classNames.num:"num";
  let classNameDate=classNames&&classNames.date?classNames.date:"num";
  return(
    <Media>
      {imageUri?<img alt="user_image" className={classNameAvatar} src={imageUri} />:<IcoRxAvatar />}
      <Media.Body>
        <DetailsBoldText className={classNameName}>
          {firstName?firstName:'Rondino'}
        </DetailsBoldText>
        { phoneNumber && <DetailsText className={classNameNum}>{phoneNumber}</DetailsText> }
        { date && <DetailsText className={classNameDate}>{moment(date).lang('fr').format('DD/MM/YYYY')}</DetailsText> }
      </Media.Body>
    </Media>
  );
}
Profile.propTypes = {
  imageUri: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  classNames: PropTypes.object,
};
export default Profile;
