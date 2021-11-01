/**
 * Comment.js
 * COMPB001
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DetailsBoldText from '../lib/DetailsBoldText';
import SeparatorLine from '../lib/SeparatorLine';
import DetailsText from '../lib/DetailsText/DetailsText';
import {IcoMyDishSymbol} from '../lib/BsCustomerIcon/BsGenerateIcon';
import './NoteComment.scss';
import Profile from '../Users/Profile';

const Comment = ({ imageUrl, userName, detail, globalRating, updatedAt, comment }) => {

  return(
  <div>
    <Row>
      <Col>
          <Profile imageUri={imageUrl} firstName={userName} date={updatedAt} />
      </Col>
      <Col md={{ span: 2, offset: 2 }} bsPrefix="col-max-width">
       <IcoMyDishSymbol />{` ${globalRating}/10`}
      </Col>
    </Row>
    <Col>
      <DetailsBoldText mt='10px'>{comment}</DetailsBoldText>
      <DetailsText>{detail}</DetailsText>
      <SeparatorLine />
    </Col>
  </div>
);}
Comment.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  globalRating: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};
export default Comment;
