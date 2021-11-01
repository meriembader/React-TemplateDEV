import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { change, Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Profile from '../../components/Users/Profile';
import TitleBoldText from '../../components/lib/TitleBoldText/index';
import messages from '../../components/Login/messages';
import CountriesSelectField from '../../components/lib/FormInputs/CountriesSelectField';
import TextEntry from '../../components/lib/FormInputs/InputTextEntry';
import { getProfile, UpdateProfile, updateFormProfile } from '../MainApp/Profile/Reducer/actions';
import  PaymentCard from '../../components/Login/PaymentCard.component'
import alertIcon from '../../www/icons/alert-icon.png';
import check from '../../www/icons/check.png';
import {isValidEmailAddress, validatePassword} from "../../utils/tools";
import adress from '../../www/icons/adress.png';

export const validate = (values, props) => {
  const errors = {user:{
    }};
  if (values.user && values.user.email && !isValidEmailAddress(values.user.email)) {
    errors.user.email = props.intl.formatMessage(messages.invalidEmail);
  } else if (values.user && values.user.password && !validatePassword(values.user.password)) {
    errors.user.password = props.intl.formatMessage(messages.passwordIncorrect);
  }
  return errors
}

export class ProfileForm extends React.Component {

  componentWillMount() {
    let userId = sessionStorage.getItem('userId');
    if(this.props.profileData._id == undefined){
      this.props.getProfileUser(userId);
      this.props.dispatch(updateFormProfile(true));
    }
    this.props.dispatch(change('ProfileForm', 'submitSuccess', false));

  }

  handleUpdateProfile = () => {
    let userId = sessionStorage.getItem('userId');
    this.props.UpdateProfile(userId, this.props.profileData);
    this.props.dispatch(updateFormProfile(true));
  }

  handleRemoveCard = () => {
    this.props.dispatch(change('ProfileForm', 'user.cardNumber', 'cc'));
  }

  render() {
    let { handleSubmit, pristine, reset, submitting, invalid, disabled, selectedCountry, submitSuccess } = this.props;

    if(disabled == null){
      disabled= true;
    }

    let mainProfileForm = (
      <form onSubmit={handleSubmit(this.handleUpdateProfile)}  className="mydish-form">
        <Row>
          <Col lg={6} md={12} xs={16}>
            <Field
              name="user.lastName"
              type="text"
              disabled= {disabled}
              placeholder={this.props.intl.formatMessage(messages.namePlaceholder)}
              title={this.props.intl.formatMessage(messages.nameTitle)}
              component={TextEntry}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
            <Field
              name="user.firstName"
              type="text"
              disabled= {disabled}
              placeholder={this.props.intl.formatMessage(messages.snamePlaceholder)}
              title={this.props.intl.formatMessage(messages.snamePlaceholder)}
              component={TextEntry}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
            <Field
            name="user.address"
            type="text"
            prefixSrc={adress}disabled= {disabled}
            placeholder={this.props.intl.formatMessage(messages.adresse)}
            title={this.props.intl.formatMessage(messages.adresse)}
            component={TextEntry}
          /></Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
            <Field
              name="user.postalCode"
              type="text"
              disabled= {disabled}
              placeholder={this.props.intl.formatMessage(messages.codePostal)}
              title={this.props.intl.formatMessage(messages.codePostal)}
              component={TextEntry}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
            <Field
              value={this.props.country}
              title={this.props.intl.formatMessage(messages.countryLabel)}
              type="text"
              disabled= {disabled}
              selectedCountry={selectedCountry}
              className={disabled? "country1-input-disabled" : "country1-input"}
              component={CountriesSelectField}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
            <Field
              name="user.email"
              type="email"
              disabled= {disabled }
              placeholder={this.props.intl.formatMessage(messages.emailLabel)}
              title={this.props.intl.formatMessage(messages.emailLabel)}
              component={TextEntry}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
            <TitleBoldText size="13px">
              {' '}
              <FormattedMessage {...messages.carte} />
            </TitleBoldText>
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12} xs={16}>
             <PaymentCard user={this.props.profileData} onAddNewCard={this.props.onAddNewCard} disabled= {disabled} onRemoveCard={this.handleRemoveCard}  />
          </Col>
        </Row>
        {!disabled && <Row>
          <Col lg={6} md={12} xs={16}>
            <button type="submit" onClick ={handleSubmit(this.handleUpdateProfile)} disabled={invalid || disabled || pristine || submitting} className="save-btn">{this.props.intl.formatMessage(messages.validateButton)}</button>
            <button type="button" className="cancel-btn">{this.props.intl.formatMessage(messages.cancelButton)}</button>
          </Col>
        </Row>}
      </form>
    );

    let mainProfileSection = (
      <div>
        {invalid && (<Row className="box-error">
          <img className = "alert-icon" src={alertIcon} />
          <span className = "alert-text">{this.props.intl.formatMessage(messages.alertForm)}</span>
        </Row>)}
        {submitSuccess && !invalid && (<Row className="box-success">
          <img className = "alert-icon" src={check} />
          <span className = "alert-text">{this.props.intl.formatMessage(messages.successForm)}</span>
        </Row>)}
        <Profile imageUri={sessionStorage.getItem('userTofUri')} firstName={sessionStorage.getItem('firstName')} phoneNumber={sessionStorage.getItem('phone')?sessionStorage.getItem('phone'):'+331 XX XX XX XX XX'}/>
        {mainProfileForm}
      </div>
    );

    return mainProfileSection;
  }
};

ProfileForm.propTypes = {
  intl: intlShape.isRequired,
};
const selector = formValueSelector('ProfileForm');
const mapStateToProps = state => {
  const profile = state.form.ProfileForm && state.form.ProfileForm.values && state.form.ProfileForm.values.user || {};
  const profileData = profile || {};
  const country = profileData.country === 'Tunisie' ? 'TN' : profileData.country === 'United States' ? 'US': profileData.country === 'France' ? 'FR': profileData.country;
  const values = state.form.ProfileForm && state.form.ProfileForm.values || {};
  const disabled = state.profile.formProfileDisabled;
  const submitSuccess = values.submitSuccess;
  return {
    profileData,
    selectedCountry : country,
    disabled,
    submitSuccess
  };
};


export function mapDispatchToProps(dispatch) {
  return {
    getProfileUser: (id) => dispatch(getProfile(id)),
    UpdateProfile: (id, data) => dispatch(UpdateProfile(id, data)),
  };
}

ProfileForm = reduxForm({
  form: 'ProfileForm',  //Form name is same
  destroyOnUnmount: false,
  validate,
})(ProfileForm);


export default connect(
  mapStateToProps, mapDispatchToProps
)(injectIntl(ProfileForm));
