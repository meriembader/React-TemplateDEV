import React, {memo} from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, getFormSyncErrors, reduxForm } from 'redux-form';
import { useParams } from 'react-router-dom';
import  '../../www/style/login.scss';
import TitleBoldText from '../lib/TitleBoldText';
import messages from './messages';
import DetailsText from '../lib/DetailsText/DetailsText';
import PasswordInputField from '../lib/FormInputs/InputPasswordEntry';
import * as constant from './Constant';
import {validateForm} from './validateForm';
import { connect, useDispatch } from 'react-redux';
import { changePassword } from '../../containers/LoginPage/Reducer/actions';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import {compose} from "redux";
import {useToasts} from "react-toast-notifications";
import useReactRouter from "use-react-router";


const validate = (values, props) => {
  let errors = {};
  errors = validateForm( values, props, constant.FORM_FORGETPWD);
  return errors;
}

let ForgetPswdForm = ({ intl: { formatMessage }, passwordData }) => {
  const { user } = useParams();
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const { addToast } = useToasts();
  const { history } = useReactRouter();

  const   onSuccess=(success) => {
    addToast( formatMessage( success ), {
      appearance: 'success',
      placement: 'top-center' ,
      autoDismiss: true,
      autoDismissTimeout: 10000,
      isRunning: true,
      transitionDuration: 500,

    })
  }
  const handleChange = () => {
    dispatch( changePassword(
      {
        password: passwordData.oldpassword,
        newpassword: passwordData.newpassword,
        email: url.searchParams.get('email')
    },() => {
        history.push('/login');
        onSuccess(messages.suucessMsgUpdatePsw)}
    ));
  }

    return (
    <div
      className="background-signin-sign-up" >
      <div className="container" >
        <form name={constant.FORM_FORGETPWD}>
            <Col lg={3} md={6} xs={8} className="mydish-registration">
              <Row className="row-logo">
                <img
                  src={MyDishLogo}
                  width="197"
                  height="60"
                  className="d-inline-block align-top"
                  alt="My Dish Logo"
                />
              </Row>
              <Row>
                <TitleBoldText className="mydish-title">
                  {' '}
                  <FormattedMessage {...messages.newPassword} />{' '}
                </TitleBoldText>
              </Row>
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  {' '}
                  <FormattedMessage {...messages.newPasswordMessage}   values={{ name: {user} }}/>
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="newpassword"
                  type="password"
                  seeIcon={true}
                  checkIcon={true}
                  placeholder={formatMessage(messages.passwordPlaceholder)}
                  component={PasswordInputField}
                  className="subscription-field"
                />
              </Row>
              <Row>
                <Field
                  name="confirmnewpassword"
                  type="password"
                  seeIcon={true}
                  checkIcon={true}
                  placeholder={formatMessage(messages.confirmedPasswordPlaceholder)}
                  component={PasswordInputField}
                  className="subscription-field"
                />
              </Row>
              <Row>
                <Button className="validation-btn"  onClick={handleChange}>
                  {formatMessage(messages.nextButton)}
                </Button>
              </Row>
            </Col>
        </form>
      </div>
    </div>
  );
};

ForgetPswdForm = reduxForm({
  // a unique name for the form
  form: constant.FORM_FORGETPWD,
  validate
})(ForgetPswdForm);

ForgetPswdForm.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const passwordData = state.form.ForgetPswdForm && state.form.ForgetPswdForm.values && state.form.ForgetPswdForm.values || {};
  const errors = getFormSyncErrors(constant.FORM_FORGETPWD)(state);
  return {
    passwordData,
    errors
  };
};


const withConnect = connect(
  mapStateToProps
);

export default compose(
  withConnect,
  injectIntl,
)(ForgetPswdForm);
