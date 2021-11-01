import messages from './messages';
import { isValidEmailAddress, validatePassword } from '../../utils/tools';
import * as constant from './Constant';

export const validateForm = (values, props, stepToValidate) => {
  const errors = {};

  if (stepToValidate === constant.FORM_REGISTRATION || stepToValidate === constant.FORM_CONNECTION ){
    if (!values.firstName) {
      console.log('First Name is required');
      errors.firstName = props.intl.formatMessage(messages.fieldRequire);
    }
  if (!values.lastName) {
    console.log('Last Name is required');
    errors.lastName = props.intl.formatMessage(messages.fieldRequire);
  }
  if (!values.email) {
    console.log('email is required');
    errors.email = props.intl.formatMessage(messages.fieldRequire);
  } else if (!isValidEmailAddress(values.email)) {
    console.log('email is invalid');
    errors.email = props.intl.formatMessage(messages.invalidEmail);
  }
}
  if( stepToValidate === constant.FORM_REGISTRATION ) {
      if (!validatePassword(values.password)) {
        errors.password = props.intl.formatMessage(messages.passwordIncorrect);
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = props.intl.formatMessage(messages.verifyPassword);

      }
  }
  if( stepToValidate === constant.FORM_FORGETPWD ) {
    if (values.newpassword && !validatePassword(values.newpassword)) {
      errors.newpassword = props.intl.formatMessage(messages.passwordIncorrect);
    } else if (values.confirmnewpassword && values.newpassword !== values.confirmnewpassword) {
      errors.confirmnewpassword = props.intl.formatMessage(messages.verifyPassword);

    }
  }
  return errors;
};
