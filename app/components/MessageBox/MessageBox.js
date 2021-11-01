/*
 * RadioButtonComponent
 *
 * This is the RadioButton Method Component
 *
 */

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import DetailsBoldText from '../lib/DetailsBoldText';
import DescriptionText from '../lib/DescriptionText';

import './MessageBox.css';

const MessageBox = ({ imageUri, name, description }) => (
  <div
    className="message-box d-flex align-items-center justify-content-center"
    style={{
      backgroundImage: `url(${imageUri})`,
      backgroundSize: 'cover',
    }}
  >
    <DetailsBoldText>{name}</DetailsBoldText>
  </div>
);

export default MessageBox;
