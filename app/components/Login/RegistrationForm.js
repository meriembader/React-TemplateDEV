import React, { memo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { Field, getFormSyncErrors, getFormValues, reduxForm } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import  '../../www/style/login.scss';
import TitleBoldText from '../lib/TitleBoldText';
import messages from './messages';
import PhoneInputField from '../lib/FormInputs/PhoneInputField';
import DetailsText from '../lib/DetailsText/DetailsText';
import PasswordInputField from '../lib/FormInputs/InputPasswordEntry';
import TextEntry from '../lib/FormInputs/InputTextEntry';
import { register, sendSMS } from '../../containers/LoginPage/Reducer/actions';
import MyDishLogo from '../../www/icons/myDish_logo.svg';
import {validateForm} from './validateForm';
import history from '../../utils/history';

import * as constant from './Constant';
import Poster from '../lib/Poster/Poster';

const validate = (values, props) => {
  return validateForm( values, props, constant.FORM_REGISTRATION);
}

let RegistrationForm = ({
  intl: { formatMessage },
  registerUser,
  formValues,
}) => {
  const [step, setStep] = React.useState(constant.REGISTRATION_STEP_PHONE);
  const [disabledButton, setDisabledButton] = React.useState(false);
  const [classButton, setClassButton] = React.useState('next-btn');
  const [post, setPost] = React.useState({  hidden: true, type: 'info', msg:'' });
  const dispatch = useDispatch();

  const   onSuccess=(success) => {
    setPost( {
      hidden: false, type: 'success', msg:formatMessage( success )
    })
  }
  const   onError=(error) => {
    setPost( {
      hidden: false, type: 'error', msg:formatMessage( error )
    })
  }
  React.useEffect(() => {
    handleChange();
  }, [
    formValues,
    formValues && formValues.password,
    formValues && formValues.confirmPassword,
  ]);

  // eslint-disable-next-line no-unused-vars
  const onClickNextStep = () => {
    if (step !== constant.REGISTRATION_STEP_CONGRATULATION) {
      setPost( {
        hidden: true, type: 'info', msg:''
      });
      switch (step) {
        case constant.REGISTRATION_STEP_PHONE:
          if (formValues && formValues.phone && formValues.phone.length > 4) {
            dispatch(sendSMS({
                phone: formValues.phone
              }, () =>{
                onSuccess(messages.successSendSMSCode);
              } ,
              ()=> {onError( messages.errorSendSMSCode)}));
            setStep(constant.REGISTRATION_STEP_CODE);
            setClassButton('next-btn');
            setDisabledButton( true );
          }
          break;
        case constant.REGISTRATION_STEP_CODE:
          if (formValues && formValues.code) {
            setStep(constant.REGISTRATION_STEP_EMAIL);
            setClassButton('next-btn');
            setDisabledButton( true );
          }
          break;
        case constant.REGISTRATION_STEP_EMAIL:
          if (formValues && formValues.email) {
            setStep(constant.REGISTRATION_STEP_NAME);
            setClassButton('next-btn');
            setDisabledButton( true );
          }
          break;
        case constant.REGISTRATION_STEP_NAME:
          if (formValues && formValues.firstName && formValues.lastName) {
            setStep(constant.REGISTRATION_STEP_PASSWORD);
            setClassButton('next-btn');
            setDisabledButton( true );
          }
          break;
        case constant.REGISTRATION_STEP_PASSWORD:
          if (
            formValues &&
            formValues.password &&
            formValues.confirmPassword &&
            formValues.password === formValues.confirmPassword
          ) {
            registerUser(formValues).then(() => {
              setStep(constant.REGISTRATION_STEP_CONGRATULATION);
              setClassButton('validation-btn');
              setDisabledButton( false );
            });
          }
          break;
        default:
          setStep(constant.REGISTRATION_STEP_PHONE);
          setClassButton('next-btn');
          setDisabledButton( true );
          break;
      }
    }
  };

  const handleChange = () => {
    setPost( {
      hidden: true, type: 'info', msg:''
    });
    switch (step) {
      case constant.REGISTRATION_STEP_PHONE:
        if (formValues && formValues.phone) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        } else {
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;
      case constant.REGISTRATION_STEP_CODE:
        if (formValues && formValues.code) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        } else {
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;
      case constant.REGISTRATION_STEP_EMAIL:
        if (formValues && formValues.email) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        }
        break;
      case constant.REGISTRATION_STEP_NAME:
        if (formValues && formValues.firstName && formValues.lastName) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        } else {
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;
      case constant.REGISTRATION_STEP_PASSWORD:
        if (
          formValues &&
          formValues.password &&
          formValues.confirmPassword &&
          formValues.password === formValues.confirmPassword
        ) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        } else {
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;
      case constant.REGISTRATION_STEP_CONGRATULATION:
        history.push('/Login');
        break;
      default:
        setClassButton('next-btn');
        break;
    }
  };

  return (
    <>
    <div class="md:container md:mx-auto h-screen ImageSigninSignup md:py-32 py-10 px-4 text-left">
      <div className="flex flex-col justify-center  items-center">
      <div className="mb-16">
    <img className="w-40" src={MyDishLogo}/>
  </div>
        <Col lg={3} md={6} xs={12} >
        
          <Poster {...post} />
          {step !== constant.REGISTRATION_STEP_CONGRATULATION && (
            <Row>
              <TitleBoldText size="37px">
                <FormattedMessage {...messages.bienvenueTitle} />{' '}
              </TitleBoldText>
            </Row>
          )}
          {step === constant.REGISTRATION_STEP_CONGRATULATION && (
            <div className="social-media-connect">
              <Row>
                <TitleBoldText textalign="center" className="mydish-title">
                  <FormattedMessage
                    {...messages.felicitationMessage}
                    values={{ firstName: `${formValues.firstName}` }}
                  />
                </TitleBoldText>
              </Row>
              <Row>
                <DetailsText
                  size="12px"
                  textalign="center"
                  className="felicitation-subtitle"
                >
                  <FormattedMessage {...messages.registrationSucces} />
                </DetailsText>
              </Row>
            </div>
          )}
          {step === constant.REGISTRATION_STEP_PHONE && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="14px" className="mydish-subtitle0">
                  <FormattedMessage {...messages.phoneMessage} />
                </DetailsText>
              </Row>
              <Row>
                <DetailsText size="12px" className="mydish-bottom">
                  <FormattedMessage {...messages.phoneMessage1} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="phone"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.phoneNumberPlaceholder)}
                  component={PhoneInputField}
                  inputClass="subscription-form"
                />
              </Row>
            </div>
          )}
          {step === constant.REGISTRATION_STEP_CODE && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  <FormattedMessage {...messages.codeMessage} values={{numTel:formValues.phone}} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="code"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.codePlaceholder)}
                  component={TextEntry}
                  className="subscription-field"
                />
              </Row>
            </div>
          )}
          {step === constant.REGISTRATION_STEP_EMAIL && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  <FormattedMessage {...messages.emailMessage} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.emailPlaceholder)}
                  component={TextEntry}
                  className="subscription-field"
                />
              </Row>
            </div>
          )}
          {step ===constant.REGISTRATION_STEP_NAME && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  <FormattedMessage {...messages.nomMessage} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.snamePlaceholder)}
                  component={TextEntry}
                  className="subscription-field"
                />
              </Row>
              <Row>
                <Field
                  name="lastName"
                  type="text"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.namePlaceholder)}
                  component={TextEntry}
                  className="subscription-field"
                />
              </Row>
            </div>
          )}
          {step === constant.REGISTRATION_STEP_PASSWORD && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  <FormattedMessage {...messages.passwordMessage} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="password"
                  type="password"
                  seeIcon={true}
                  checkIcon={true}
                  onChange={handleChange}
                  placeholder={formatMessage(messages.passwordPlaceholder1)}
                  component={PasswordInputField}
                  className="password-field-withmargin"
                />
              </Row>
              <Row>
                <Field
                  name="confirmPassword"
                  type="password"
                  seeIcon={true}
                  checkIcon={true}
                  onChange={handleChange}
                  placeholder={formatMessage(
                    messages.confirmedPasswordPlaceholder,
                  )}
                  component={PasswordInputField}
                  className="password-field"
                />
              </Row>
            </div>
          )}
          {step !== constant.REGISTRATION_STEP_CONGRATULATION && (
            <div className="social-media-connect">
              <Row>
                <Button disabled={disabledButton} className={classButton} onClick={onClickNextStep}>
                  {formatMessage(messages.nextButton)}
                </Button>
              </Row>
              {step === constant.REGISTRATION_STEP_PHONE && (
                <Row>
                  <DetailsText size="12px" className="mydish-subtitle2" textalign='center'>
                    <FormattedMessage {...messages.compteMessage} />  <Link className="simple-link connect-registration mt-2" to="/Login"> <FormattedMessage {...messages.seConnecter} />     </Link>
                  </DetailsText>
                </Row>
              )}
              {step === constant.REGISTRATION_STEP_CODE && (
                <Row className="mt-3">
                  <DetailsText size="12px"  textalign="right" width="60%">
                    <FormattedMessage {...messages.codeMessage2} />
                  </DetailsText>
                  <DetailsText className="link" size="12px"  width="25%" color="#45b995"  onClick={() =>    {   dispatch(sendSMS({
                      phone: formValues.phone
                    }, () =>{
                      onSuccess(messages.successSendSMSCode);
                    } ,
                    ()=> {onError( messages.errorSendSMSCode)})); }} >
                    &nbsp;
                    <FormattedMessage {...messages.SMS} />
                  </DetailsText>
                </Row>
              )}
            </div>
          )}
          {step === constant.REGISTRATION_STEP_CONGRATULATION && (
              <Row>
                <Button disabled={disabledButton}  className={classButton}  onClick={handleChange}>
                  {formatMessage(messages.mydishButton)}
                </Button>
              </Row>
          )}
        </Col>
      </div>
    </div>
    </>
  );
};

RegistrationForm = reduxForm({
  // a unique name for the form
  form: constant.FORM_REGISTRATION,
  validate
})(RegistrationForm);

RegistrationForm.propTypes = {
  intl: intlShape.isRequired,
};
const mapStateToProps = state => {
  const formValues = getFormValues(constant.FORM_REGISTRATION)(state);
  const errors = getFormSyncErrors(constant.FORM_REGISTRATION)(state);
  return {
    formValues,
    errors,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    registerUser: user => dispatch(register(user)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(RegistrationForm);
