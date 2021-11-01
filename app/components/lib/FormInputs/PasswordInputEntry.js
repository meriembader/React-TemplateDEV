import React from 'react';
import { Form, FormControl, FormGroup, FormText, Row } from 'react-bootstrap';
import SEE_ICON from '../../../www/icons/see.svg';
import SEE__DISABLED_ICON from '../../../www/icons/see_disabled.svg';
import CHECKED_ICON from '../../../www/icons/select.svg'
import classNames from 'classnames';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TitleBoldText from '../TitleBoldText';
import './inputStyle.scss';


const PasswordInputEntry = field => {
  let {input, title, placeholder, disabled, readOnly, type, hidden, isLoading, className, id } = field;
  const [focused, setFocused] = React.useState(false);
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  let vs = {
    'error': input && field.meta.touched && field.meta.error
  };
  let gc = {
    'form-group': title,
    'text-entry-form-group': title,
    'focused': focused || (field.input && field.input.value)
  };

  const handleFocus = (event) => {
    setFocused(true);

    if (field.input && field.input.onFocus) {
      //this.field.input.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    setFocused( false);

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

  const handleChange = prop => event => {
    let newValue = event.target.value;
    setValues({ ...values, [prop]: newValue });
    setValues(newValue);

    if ( field.updateOnChange && field.onChange) {
      field.onChange(event, newValue);
    }

    if (field.input && field.input.onChange) {
      field.input.onChange(event);
    }
  }
  const handleKeyPress = (event) => {
    if (field.updateOnEnter === true) {
      var charCode = (typeof event.which == "number") ? event.which : event.keyCode;
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
    'text-entry-custom' : true
  };


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  input.autoComplete='new-password'
  return (
    <Form.Group controlId={id} bsClass={classNames(gc)} validationState={classNames(vs) || undefined}>
      <OutlinedInput
        {...input}
        className={classNames(inputClassNames)}
        placeholder={placeholder}
        id={id}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        disabled={disabled}
        onChange={handleChange('password')}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        isValid
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <img
                src={values.showPassword ? SEE_ICON : SEE__DISABLED_ICON}
                className="ml-1"
                alt="profile-icon"
              />

            </IconButton>
          </InputAdornment>
        }
        labelWidth={0}
      />
        {(field.meta && field.meta.touched && field.meta.error &&
          <FormText>  <TitleBoldText size="10px" color='#f56954' >{field.meta.error}</TitleBoldText></FormText>)}
    </Form.Group>
  );
};

export default PasswordInputEntry;
