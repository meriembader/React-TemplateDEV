import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Form, FormText } from 'react-bootstrap';
import SEE_ICON from '../../../www/icons/see.svg';
import SEE__DISABLED_ICON from '../../../www/icons/see_disabled.svg';
import TitleBoldText from '../TitleBoldText';
import './inputStyle.scss';

// eslint-disable-next-line react/prop-types
const PasswordInputField = field => {
  const { id, className, placeholder, input, disabled } = field;
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    input.onChange();
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
      <Form.Group controlId={id}>
        <OutlinedInput
          {...input}
          className={className}
          placeholder={placeholder}
          id="outlined-adornment-weight"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          disabled={disabled}
          onChange={handleChange('password')}
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

export default PasswordInputField;
