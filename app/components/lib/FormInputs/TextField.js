import React from 'react';
import { Form, FormText,HelpBlock } from 'react-bootstrap';
import classNames from 'classnames';
import TitleBoldText from '../TitleBoldText';
import './inputStyle.scss';

// eslint-disable-next-line react/prop-types
const TextField = field => {
  const {
    id,
    title,
    placeholder,
    fieldDescription,
    type,
    className,
    input,
    disabled,
    prefix,
    error
  } = field;
  let vs = {
    'error': input && field.meta.touched && field.meta.error
  };
  if(prefix){
    input.value = prefix + input.value;
  }

  return (
      <Form.Group controlId={id}  validationState={classNames(vs) || undefined}>
        {title && (
          <Form.Label>
            <TitleBoldText size="16px">{title}</TitleBoldText>
          </Form.Label>
        )}
        <Form.Control
          {...input}
          className={className}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Form.Text className="text-muted">{fieldDescription}</Form.Text>
        {(field.meta && field.meta.touched && field.meta.error &&
          <span className="error-field"> {field.meta.error}</span>)}
      </Form.Group>
  );
};

export default TextField;
