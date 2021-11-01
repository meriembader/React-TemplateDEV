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

import './SelectRadioInput.css';

const RadioButtonComponent = ({
  imageUri,
  name,
  description,
  selectedValue,
  value,
  onChange,
  price,
}) => {
  // eslint-disable-next-line no-shadow
  const handleChange = event => {
    onChange(event.target.value);
  };
  return (
    <div>
      <Row className="select-input">
        <div>
          <Radio
            checked={selectedValue == value}
            onChange={handleChange}
            value={value}
            name={name}
            inputProps={{ 'aria-label': 'A' }}
            color="default"
          />
        </div>
        {imageUri && <div>
          <img
            src={imageUri}
            className="option-icon align-middle"
          />
        </div>}

        <div>
          <DetailsBoldText>{name}</DetailsBoldText>
          <DescriptionText>{description}</DescriptionText>
        </div>
        {price && <DescriptionText className="ml-auto">{price}</DescriptionText>}
      </Row>
    </div>
  );
};

export default RadioButtonComponent;
