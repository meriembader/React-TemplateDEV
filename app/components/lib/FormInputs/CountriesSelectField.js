import React from 'react';
import 'react-phone-input-2/lib/bootstrap.css';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import './inputStyle.scss';
import { scope } from '../../Login/messages';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import classNames from 'classnames';


export const CountriesSelectField=(field)=>{
  const { id, title, fieldDescription, input, disabled, className, selectedCountry } = field;
  let style = `${className}  pull-right`;
  let defaultValue = selectedCountry ?selectedCountry : 'FR';

  let vs = {
    'error': input && field.meta.touched && field.meta.error
  };
  let gc = {
    'form-group-customer': true,
    'text-entry-form-group': title,
  };
 let selectCountryComponent = (<ReactFlagsSelect
    className= {style}
    countries={['FR', 'GB', 'BE', 'DE', 'IT', 'NG', 'TN', "US"]}
    {...input}
    showSelectedLabel={true}
    fullWidth={true}
    disabled={disabled}
    defaultCountry={defaultValue}
  />);
  let controlLabel = title ? <FormLabel className="form-label-customer" >{title}</FormLabel> : null;
  return (
    <FormGroup bsClass={classNames(gc)} validationState={classNames(vs) || undefined}>
      {controlLabel}
      {selectCountryComponent}
      <FormControl.Feedback type="invalid" >{field.meta.error}</FormControl.Feedback>
    </FormGroup>

  );
};

export default CountriesSelectField;
