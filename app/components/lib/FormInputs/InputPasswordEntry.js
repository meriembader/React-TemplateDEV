'use strict'
import React from 'react'
import classNames from 'classnames';
import SEE_ICON from '../../../www/icons/see.svg';
import SEE__DISABLED_ICON from '../../../www/icons/see_disabled.svg';
import CHECKED_ICON from '../../../www/icons/select.svg'
import { FormGroup, FormLabel, Row, InputGroup, Col, FormControl, FormCheck, FormText, Form } from 'react-bootstrap';
import './inputStyle.scss';
import TitleBoldText from '../TitleBoldText';

//only used with redux form
const InputPasswordEntry = field => {
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
    size,
    inSize,
    prefixIn,
    checkIcon,
    prefixExt,
    seeIcon
  } = field;
  const [focused, setFocused] = React.useState(false);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  let vs = {
    'error': input && field.meta.touched && field.meta.error
  };
  let gc = {
    'form-group-customer': true,
    'text-entry-form-group': true,
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


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange  = prop => (event) => {
    let newValue = event.target.value;

    setValues({ ...values, [prop]: event.target.value });

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
    'text-entry-custom': true,
  };
  let rowClassNames = {
    'row_input_customer':true,
    'input-error': input && field.meta.touched && field.meta.error
  }


  let inputComponent = <input
    type={values.showPassword ? 'text' : 'password'}
    placeholder={placeholder}
    name={name ? name : (input?input.name:'input')}
    disabled={disabled}
    size={size}
    readOnly={readOnly}
    value={values.password}
    data-reduxname={reduxName}
    autoComplete={(field.autoComplete === false) ? 'new-password' : 'on'}
    onChange={handleChange('password')}
    onBlur={handleBlur}
    onKeyPress={handleKeyPress}
    onFocus={handleFocus}
    className={classNames(inputClassNames)}
  />;

  if (isLoading) {
    inputComponent = <span className={classNames(inputClassNames)} aria-hidden={true}>
                <span className="Select-loading" /></span>
  }

  let inputSize = inSize ? inSize : (input?input.size:null );
  if (inputSize) {
    inputComponent = (<Col lg={inputSize} md={inputSize} className="form-subcol">{inputComponent}</Col>);
  }


  let readOnlyInput = <InputGroup>{values.password?'****':'n/a'}</InputGroup>;
  let prefix =  prefixIn? ( <Col className="col-customer-input" lg={1} md={1} xs={1}>  {prefixIn}  </Col>): null;
  let see_icon =    seeIcon?( <Col className="col-customer-input-without-padding" lg={1} md={1} xs={1}>  </Col>): null;
  let check_icon =   (checkIcon && field.meta && field.meta.touched && !field.meta.error)?( <Col className="col-customer-input-without-padding" lg={1} md={1} xs={1}> <img src={ CHECKED_ICON } onClick={handleClickShowPassword} className="hover:cursor-pointer" alt='SEE_ICON'/>  </Col>): null;

  let controlLabel = title ? <FormLabel className="form-label-customer" >{title}</FormLabel> : null;
  return (

    <FormGroup className={classNames(gc)} validationState={classNames(vs) || undefined}>
      {controlLabel}
      <Row className={classNames(rowClassNames)}>
        {prefix}
        <Col className="col-customer-input-without-padding">{readOnly ? readOnlyInput : inputComponent}</Col>
        {check_icon}
        {see_icon}
      </Row>
      {(field.meta && field.meta.touched && field.meta.error &&
        <FormText>  <TitleBoldText size="10px" color='#f56954' >{field.meta.error}</TitleBoldText></FormText>)}
    </FormGroup>

  )

}
export default InputPasswordEntry;
