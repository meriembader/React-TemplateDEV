'use strict'
import React from 'react'
import classNames from 'classnames';
import {FormGroup, FormLabel, Row, InputGroup, Col, FormControl} from 'react-bootstrap';
import './inputStyle.scss';

//only used with redux form
const InputTextEntry = field => {
  let {
    input,
    title,
    name,
    placeholder,
    disabled,
    readOnly,
    type,
    hidden,
    isLoading,
    className,
    role,
    size,
    inSize,
    prefixIn,
    rows,
    sufixIn,
    prefixExt,
    sufixExt
  } = field;
  const [focused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState(field.value || '');


  let vs = {
    'error': input && field.meta.touched && field.meta.error
  };
  let gc = {
    'form-group-customer': true,
    'text-entry-form-group': title,
  };

  const handleFocus = (event) => {
    setFocused(true);

    if (field.input && field.input.onFocus) {
      //this.field.input.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setFocused(false);

    let UOC = field.updateOnChange;

    if (!UOC && field.onChange) {
      field.onChange(event, event.target.value);
    }

    if (field.input) {
      if (field.input.onBlur)
        field.input.onBlur(event);
      if (!UOC && field.input.onChange)
        field.input.onChange(event);
    }
  }

  const handleChange = (event) => {
    let newValue = event.target.value;

    setValue(newValue);

    if (field.updateOnChange && ield.onChange) {
      field.onChange(event, newValue);
    }

    if (field.input && field.input.onChange) {
      field.input.onChange(event);
    }
  }
  const handleKeyPress = (event) => {
    if (field.updateOnEnter === true) {
      let charCode = (typeof event.which == "number") ? event.which : event.keyCode;
      if (charCode == 13) { // on Enter pressed
        field.onChange(event, event.target.value);
      }
    }
  }


  if (field.groupClassName) {
    gc[field.groupClassName] = true;
  }

  let reduxName = field.reduxName || (field.input && field.input.name);
  let inputClassNames = {
    'form-control': true,
    'Select-loading-zone': !!isLoading,
    'text-entry-custom': true
  };


  let inputComponent = <FormControl
    type={type || "text"}
    placeholder={placeholder}
    name={name ? name : (input?input.name:'input')}
    disabled={disabled}
    size={size}
    readOnly={readOnly}
    value={value}
    data-reduxname={reduxName}
    autoComplete={(field.autoComplete === false) ? 'new-password' : 'on'}
    isInvalid={field.meta && field.meta.touched && field.meta.error}
    onBlur={handleBlur}
    onChange={handleChange}
    onKeyPress={handleKeyPress}
    onFocus={handleFocus}
    normaloze={field.normalize}
    className={classNames(inputClassNames)}
  />;
  if(role) {
    inputComponent = <FormControl
      as={role}
      rows={rows||1}
      placeholder={placeholder}
      name={name ? name : (input ? input.name : 'input')}
      disabled={disabled}
      size={size}
      readOnly={readOnly}
      value={value}
      data-reduxname={reduxName}
      autoComplete={(field.autoComplete === false) ? 'new-password' : 'on'}
      isInvalid={field.meta && field.meta.touched && field.meta.error}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      onFocus={handleFocus}
      normaloze={field.normalize}
      className={classNames(inputClassNames)}
    />;
  }

  if (isLoading) {
    inputComponent = <span className={classNames(inputClassNames)} aria-hidden={true}>
                <span className="Select-loading" /></span>
  }

  let inputSize = inSize ? inSize : (input?input.size:null );
  if (inputSize) {
    inputComponent = (<Col lg={inputSize} md={inputSize} className="form-subcol">{inputComponent}</Col>);
  }


  let readOnlyInput = <InputGroup>{value || 'n/a'}</InputGroup>;
  let prefix =  prefixIn? ( <Col className="col-customer-input" lg={1} md={1} xs={1}>  {prefixIn}  </Col>): null;
  let suffix =  sufixIn? ( <Col className="col-customer-input" lg={1} md={1} xs={1}>  {sufixIn}  </Col>): null;

  let controlLabel = title ? <FormLabel className="form-label-customer" >{title}</FormLabel> : null;
  return (

      <FormGroup className={classNames(gc)} validationState={classNames(vs) || undefined}>
        {controlLabel}
        <Row className="row_input_customer">
          {prefix}
         <Col className="col-customer-input-without-padding">{readOnly ? readOnlyInput : inputComponent}</Col>
          {suffix}
        </Row>
        <FormControl.Feedback type="invalid" >{field.meta && field.meta.error}</FormControl.Feedback>
      </FormGroup>

  )

}
export default InputTextEntry
