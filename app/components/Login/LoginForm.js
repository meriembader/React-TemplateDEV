import React, { memo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { GrFormNext } from 'react-icons/Gr';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, getFormValues, getFormSyncErrors } from 'redux-form';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';

import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import TitleBoldText from '../lib/TitleBoldText';
import {maskedEmail, isValidEmailAddress, normalizeCodeSMS} from '../../utils/tools'
import messages from './messages';
import DetailsText from '../lib/DetailsText/DetailsText';
import InputTextEntry from '../lib/FormInputs/InputTextEntry';
import FacebookLogo from '../../www/icons/facebook1.svg';
import GoogleLogo from '../../www/icons/google.svg';

import '../../www/style/login.scss';
import { login, sendSMS, forgotPassword } from '../../containers/LoginPage/Reducer/actions';
import PasswordInputEntry from '../lib/FormInputs/InputPasswordEntry';
import MyDishLogo from '../../www/icons/MydishLogo.png';
import {validateForm} from './validateForm';
import * as constant from './Constant';
import Poster from '../lib/Poster/Poster';


const validate = (values, props) => {
  let errors = {};
  errors = validateForm( values, props, constant.FORM_CONNECTION);
 return errors;
}

let LoginForm = ({
  intl: { formatMessage },
  formValues,
  errors,
  router,
}) => {
  React.useEffect(() => {
    handleChange();
  }, [formValues, formValues && formValues.password]);
  const [step, setStep] = React.useState(constant.CONNECTION_STEP_EMAIL);
  const [classButton, setClassButton] = React.useState('next-btn');
  const [disabledButton, setDisabledButton] = React.useState(false);
  const [post, setPost] = React.useState({  hidden: true, type: 'info', msg:'' });
  const { history } = useReactRouter();
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

  const onClickNextStep = () => {
    setPost( {
      hidden: true, type: 'info', msg:''
    });
    if (!errors.email && !errors.password ) {
      switch (step) {
        case constant.CONNECTION_STEP_EMAIL:
          if (formValues && formValues.email) {
            setStep(constant.CONNECTION_STEP_PASSWORD);
            setClassButton('next-btn');
            setDisabledButton( true );
          }
          break;
        case constant.CONNECTION_STEP_PASSWORD:
          if (formValues && formValues.password) {
            dispatch( login({
                email: formValues.email,
                password: formValues.password,
              }, () => {
              // redirect to profile for demo
                history.push('/Client')},()=>{
              onError(messages.errorMsgPwdLogin );}
              ));
            }
          break;
        case 'EMAIL1':
          if (formValues && formValues.email1) {
            dispatch(sendSMS({
              email: formValues.email1
            }, () =>{
                onSuccess(messages.successSendSMSCode);
            } ,
              ()=> {onError( messages.errorSendSMSCode)}));
            setStep(constant.CONNECTION_STEP_CODE);
            setClassButton('next-btn');
            setDisabledButton( true );
          }
          break;
        case constant.CONNECTION_STEP_CODE:
          if (formValues && formValues.code) {
            dispatch(forgotPassword( formValues.email1, formValues.code, ()=>{
              onSuccess(messages.successPutSMSCode);
            }, ()=> {onError( messages.errorPutSMSCode)}));
            setStep(constant.CONNECTION_STEP_CONGRATULATION);
            setClassButton('validation-btn');
            setDisabledButton( false );
          }

          break;
        case constant.CONNECTION_STEP_CONGRATULATION:
              history.push('/client');
          break;
        default:
          setStep(constant.CONNECTION_STEP_EMAIL);
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
      case constant.CONNECTION_STEP_CODE:
        if (formValues && formValues.code) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        } else {
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;
      case constant.CONNECTION_STEP_EMAIL:
      case 'EMAIL1':
        if (formValues && ((formValues.email && isValidEmailAddress(formValues.email)) ||  (  formValues.email1 && isValidEmailAddress(formValues.email1) ) )) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        }else{
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;

      case constant.CONNECTION_STEP_PASSWORD:
        if (formValues && formValues.password) {
          setClassButton('validation-btn');
          setDisabledButton( false );
        } else {
          setClassButton('next-btn');
          setDisabledButton( true );
        }
        break;
      default:
        setClassButton('next-btn');
        setDisabledButton( true );
        break;
    }
  };
  const isTitle1 = step === constant.CONNECTION_STEP_PASSWORD || step === constant.CONNECTION_STEP_EMAIL;
  const isTitle2 = step === constant.CONNECTION_STEP_FORGETPASSWORD || step === 'EMAIL1'|| step === constant.CONNECTION_STEP_CONGRATULATION  ;
  const isTitle3 = step === constant.CONNECTION_STEP_EMAIL || step === 'EMAIL1';

  return (
  <>
  <div class="md:container md:mx-auto h-screen ImageSigninSignup md:py-32 py-10 px-4 text-left">
  <div className="flex flex-col justify-center  items-center">
  <div className="mb-16">
    <img className="w-40" src={MyDishLogo}/>
  </div>
  <form name={constant.FORM_CONNECTION}>
        <Col>
         
          <Poster {...post} />
          {isTitle1 && (
            <Row>
              <TitleBoldText size="37px">
                {' '}
                <FormattedMessage {...messages.bienvenueTitle1} />{' '}
              </TitleBoldText>
            </Row>
          )}
          {isTitle2 && (
            <Row>
               <TitleBoldText className="mydish-title">
                  {' '}
                  <FormattedMessage {...messages.forgetPassword} />
                </TitleBoldText>
            </Row>
          )}
          {step === constant.CONNECTION_STEP_CODE && (

            <Row>
              <TitleBoldText className="mydish-title">
                {' '}
                <FormattedMessage {...messages.verifyCode} />{' '}
              </TitleBoldText>
            </Row>

          )}
          {step === constant.CONNECTION_STEP_CODE && (
            <div className="social-media-connect">
              <Row>
                <DetailsText className="mydish-subtitle">
                  {' '}
                  <FormattedMessage {...messages.codeMessage1} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="code"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.codePlaceholder)}
                  component={InputTextEntry}
                  normalize={normalizeCodeSMS}
                  className="subscription-field"
                />
              </Row>
            </div>
          )}
          {step === constant.CONNECTION_STEP_EMAIL && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="16px" className="mydish-subtitle">
                  {' '}
                  <FormattedMessage {...messages.emailMessage1} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.emailPlaceholder1)}
                  component={InputTextEntry}
                  className="subscription-field focus:outline-none focus:ring focus:border-blue-300 "
                />
              </Row>
            </div>
          )}
          {step === constant.CONNECTION_STEP_PASSWORD && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  {' '}
                  <FormattedMessage {...messages.passwordMessage} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="password"
                  type="password"
                  onChange={handleChange}
                  seeIcon={true}
                  placeholder={formatMessage(messages.passwordPlaceholder)}
                  component={PasswordInputEntry}
                  className="password-field"
                />
              </Row>
            </div>
          )}
          {step === 'EMAIL1' && (
            <div className="social-media-connect">
              <Row>
                <DetailsText size="12px" className="mydish-subtitle">
                  {' '}
                  <FormattedMessage {...messages.emailMessage} />
                </DetailsText>
              </Row>
              <Row>
                <Field
                  name="email1"
                  type="email"
                  onChange={handleChange}
                  placeholder={formatMessage(messages.emailPlaceholder)}
                  component={InputTextEntry}
                  className="subscription-field"
                />
              </Row>
            </div>
          )}
          {step !== constant.CONNECTION_STEP_CONGRATULATION && (
             <div className="social-media-connect">
              <Row>
                <Button disabled={disabledButton} className={classButton} onClick={onClickNextStep}>
                  {formatMessage(messages.nextButton)}
                </Button>
              </Row>
              {isTitle3 && (
                <div>
                  <Row>
                    <DetailsText size="12px" className="mydish-subtitle2">
                      <FormattedMessage {...messages.compteMessage1} />
                      &nbsp;
                      <Link className="simple-link connect-registration mt-2" to="/registration">
                        <FormattedMessage {...messages.register} />
                      </Link>
                    </DetailsText>
                  </Row>
                  { step !== "EMAIL1" && (
                  <Row className="mt-2">
                    <div className="divider">
                      <hr className="left"/>
                      Ou
                      <hr className="right"/>
                    </div>
                  </Row>)}
                </div>
              )}
              {step === constant.CONNECTION_STEP_PASSWORD && (
                <Row>
                    <div className="forgetPassword link mt-3"  onClick={() => setStep('EMAIL1') }>
                        <FormattedMessage {...messages.forgetPassword1} />
                    </div>
                </Row>
              )}
              {step === constant.CONNECTION_STEP_CODE && (
                <Row className="mt-3">
                  <DetailsText size="12px"  textalign="right" width="60%">
                    <FormattedMessage {...messages.codeMessage2} />
                  </DetailsText>
                  <DetailsText className="link" size="12px"  width="25%" color="#45b995"  onClick={() =>    {   dispatch(sendSMS({
                      email: formValues.email1
                    }, () =>{
                      onSuccess(messages.successSendSMSCode);
                    } ,
                    ()=> {onError( messages.errorSendSMSCode)})); }} >
                    &nbsp;
                      <FormattedMessage {...messages.SMS} />
                  </DetailsText>
                </Row>
              )}
              {step === constant.CONNECTION_STEP_EMAIL && (
                <div className="social-media-connect mt-5">
                  <Row className="row-passedMouse" onClick={(e)=>alert('loggedgmail')}>
                    <Col lg={1} md={1} xs={2}>
                    <img
                      src={GoogleLogo}
                      className="login-icon mt-2"
                      alt="Google Logo"
                    />
                    </Col>
                    <Col lg={10} md={8} xs={8}>
                    <DetailsText
                      size="3vh"
                    >
                      <FormattedMessage {...messages.seConnecterGoogle} />
                    </DetailsText>
                    </Col>
                    <Col lg={1} md={1} xs={1}>
                      <GrFormNext  className="mt-2"/>
                    </Col>
                  </Row>
                  <Row className="mt-2 row-passedMouse"   onClick={(e)=>alert('loggedfacebook')}>
                    <Col lg={1} md={1} xs={2}>
                      <img
                        src={FacebookLogo}
                        className="login-icon mt-2"
                        alt="Facebook Logo"
                      />
                    </Col>
                    <Col lg={10} md={8} xs={8}>
                      <DetailsText size="3vh"  >
                        <FormattedMessage {...messages.seConnecterFace} />
                      </DetailsText>
                    </Col>
                    <Col lg={1} md={1} xs={1}>
                      <GrFormNext  className="mt-2"/>
                    </Col>
                  </Row>
                </div>
              )}
            </div>
          )}
          {step === constant.CONNECTION_STEP_CONGRATULATION && (
            <div className="social-media-connect">
              <Row className="mt-3">
                <DetailsText size="12px" className="mydish-subtitle">
                  <FormattedMessage {...messages.retourMessage} values={ { maskedEmail : maskedEmail(formValues.email1)}} />
                </DetailsText>
              </Row>
              <Row>
                <DetailsText  size="12px">
                  <FormattedMessage {...messages.retourMessage1}   />
                </DetailsText>
              </Row>
              <Row className="mt-3">
                <Button disabled={disabledButton} className={classButton} onClick={onClickNextStep}>
                  {formatMessage(messages.mydishPage)}
                </Button>
              </Row>
            </div>
          )}
        </Col>
      </form>
  
  </div>
  </div>
 

  </>
  );
};

LoginForm = reduxForm({
  // a unique name for the form
  form: constant.FORM_CONNECTION,
  enableReinitialize: true,
  validate
})(LoginForm);

LoginForm.propTypes = {
  intl: intlShape.isRequired,
};
const mapStateToProps = state => {
  const { restaurants, loading, error } = state.landing || {};
  const formValues = getFormValues(constant.FORM_CONNECTION)(state);
  const errors = getFormSyncErrors(constant.FORM_CONNECTION)(state);
  return {
    formValues,
    restaurants,
    loading,
    errors,
    error,
  };
};


const withConnect = connect(
  mapStateToProps
);

export default compose(
  withConnect,
  memo,
  injectIntl,
)(LoginForm);
