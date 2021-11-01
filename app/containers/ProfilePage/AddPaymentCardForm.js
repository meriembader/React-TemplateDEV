import React from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import { Button, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import TextEntry from '../../components/lib/FormInputs/InputTextEntry';
import { Field } from 'redux-form';
import  messages from '../../components/Payment/messages';
import msgLogin from '../../components/Login/messages';
import  TitleBoldText from "../../components/lib/TitleBoldText/index";
import 'react-flags-select/css/react-flags-select.css';
import "../../www/style/login.scss";
import CountriesSelectField from '../../components/lib/FormInputs/CountriesSelectField';
import { connect } from 'react-redux';
import {ProfileForm } from './ProfileForm';
import {UpdateProfile } from '../MainApp/Profile/Reducer/actions';

export const validate = values => {

  const errors = {user:{
    }};
  let expiryData = values.user && values.user.cardExpirationDate;
  expiryData = expiryData && expiryData.split('/');
  let currentMonth = '';
  currentMonth = expiryData && expiryData[0];
  currentMonth = currentMonth && currentMonth.replace('0', '');
  const currentDate = new Date();
  let a = currentDate.getMonth();
  let yearNumber = currentDate.getFullYear() % 200;
  if (values.user && values.user.cardExpirationDate && !/^(0|1)[0-9]{1}\/+[0-9]{2}$/i.test(values.user.cardExpirationDate)) {
    errors.user.cardExpirationDate = 'La date d expiration doit être dans cet format 0M/YY ou 1M/YY'
  }else if(values.user && expiryData
    && ((Number(expiryData[1]) < yearNumber) || ((Number(currentMonth) <= currentDate.getMonth()) && (Number(expiryData[1]) == yearNumber)))){
    errors.user.cardExpirationDate = 'La date d expiration doit être dans le futur'
  }else if(values.user && values.user.cardSecurityCode && values.user.cardSecurityCode.length > 3){
    errors.user.cardSecurityCode = 'Le code secret doit être de 3 chiffres'
  }else if(values.user && values.user.cardNumber && !/^[0-9]+$/i.test(values.user.cardNumber)){
    errors.user.cardNumber = 'Le numéro de la carte ne peut contenir que des chiffres'
  }

  return errors
}


export class AddPaymentCard extends React.Component {

    handleUpdateProfile = () => {
      let userId = sessionStorage.getItem('userId');
      this.props.dispatch(UpdateProfile(userId, this.props.profileData));

    }

    render() {
      const path = this.props.path;
      let { handleSubmit, pristine, reset, submitting, invalid, disabled } = this.props;

      return (
        <form onSubmit={handleSubmit(this.handleUpdateProfile)} className="mydish-form">
          <Row>
            <Col lg={6} md={12} xs={16}>
              <Field
                name={`${path}.cardNumber`}
                title={this.props.intl.formatMessage(messages.cardNumberLabel)}
                type="text"
                placeholder={this.props.intl.formatMessage(messages.cardNumberLabel)}
                component={TextEntry}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12} xs={16}>
              <Field
                name={`${path}.cardExpirationDate`}
                title={this.props.intl.formatMessage(messages.cardExpirationDateLabel)}
                type="text"
                placeholder={this.props.intl.formatMessage(messages.cardExpirationDatePlaceholder)}
                component={TextEntry}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12} xs={16}>
              <Field
                name={`${path}.cardSecurityCode`}
                title={this.props.intl.formatMessage(messages.cardSecurityCodeLabel)}
                type="password"
                placeholder={this.props.intl.formatMessage(messages.cardSecurityCodePlaceholder)}
                component={TextEntry}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12} xs={16}>
              <TitleBoldText size="13px">
                <FormattedMessage {...messages.countryLabel} />
              </TitleBoldText>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12} xs={16}>
              <Field
                name={`${path}.cardCountry`}
                type="text"
                className="country1-input"
                component={CountriesSelectField}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={12} xs={16}>
              <Button type="submit" onClick ={this.props.onSubmit} disabled={invalid || disabled || pristine || submitting} className="save-btn">{this.props.intl.formatMessage(msgLogin.validateButton)}</Button>
              <Button type="button" className="cancel-btn">{this.props.intl.formatMessage(msgLogin.cancelButton)}</Button>
            </Col>
          </Row>
        </form>
      );
    }
};

AddPaymentCard.propTypes = {
  intl: intlShape.isRequired,
};

const selector = formValueSelector('ProfileForm');
const mapStateToProps = state => {
  const profile = state.form.ProfileForm && state.form.ProfileForm.values && state.form.ProfileForm.values.user || {};
  const profileData = profile || {};
  const country =
    profileData.country === 'Tunisie' ? 'TN' : profileData.country;
  return {
    profileData,
    country
  };
};


AddPaymentCard = reduxForm({
  form: 'ProfileForm',  //Form name is same
  destroyOnUnmount: false,
  validate
})( injectIntl(AddPaymentCard));

export default connect(
  mapStateToProps
)(injectIntl(AddPaymentCard));
