import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { Form } from 'react-bootstrap';
import TitleBoldText from '../TitleBoldText';
import './inputStyle.scss';

const PhoneInputField = field => {
  const {
    id,
    title,
    placeholder,
    fieldDescription,
    disabled,
    className,
    inputClass,
    input,
  } = field;
  return (

      <Form.Group controlId={id}>
        {title && (
          <Form.Label>
            <TitleBoldText size="16px">{title}</TitleBoldText>
          </Form.Label>
        )}
        <PhoneInput
          placeholder={placeholder}
          country="fr"
          disabled={disabled}
          inputClass={inputClass}
          className={className}
          {...input}
        />
        <Form.Text className="text-muted">{fieldDescription}</Form.Text>
      </Form.Group>

  );
};

export default PhoneInputField;
