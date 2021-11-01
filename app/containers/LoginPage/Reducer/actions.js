import * as c from '../constants';
import * as constant from "../../../components/Login/Constant";
import { change } from 'redux-form';

export function register(values) {
  // eslint-disable-next-line no-redeclare
  const user = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    postalCode: '19104',
    address: '4 Loeprich Drive',
    country: 'United States',
    password: values.password,
  };
  return {
    types: [c.REGISTER_USER, c.REGISTER_USER_SUCCESS, c.REGISTER_USER_ERROR],
    promise: client => client.post('/auth/register', user),
    afterError: () => {
      alert('User not Registered');
    },
  };
}

export function login(user, onSuccess, onError ) {
  return {
    types: [c.LOGIN_USER, c.LOGIN_USER_SUCCESS, c.LOGIN_USER_ERROR],
    promise: client => client.post('/auth/login', user),
    afterSuccess: (dispatch, getState, result) => {
      onSuccess();
    },
    afterError: (dispatch, getState, error) => {
      onError(error);
    }
  };
}

export function sendSMS(user, success, faild) {
  const type = 'email';
  return {
    types: [c.LOGIN_USER, c.LOGIN_USER_SUCCESS, c.LOGIN_USER_ERROR],
    promise: client => client.get(`/auth/send-sms?email=${user.email}&&type=${type}`),
    afterSuccess: (dispatch, getState, result) => {
      sessionStorage.setItem('code', result.data);
      success();
    },
    afterError: () => {
      faild();
    },
  };
}

export function forgotPassword(email, code, success, faild) {
  const data = {
    code: code,
    email: email
  }
  return {
    types: [c.LOGIN_USER, c.LOGIN_USER_SUCCESS, c.LOGIN_USER_ERROR],
    promise: client => client.post('/auth/forgot-password', data),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change(constant.FORM_FORGETPWD, 'email',data.email))
      sessionStorage.setItem('email', data.email);
      success();
    },
    afterError: () => {
      faild();
    },
  };
}

export function changePassword( data, onSuccess) {

  return {
    types: [c.RESET_PASSWORD, c.RESET_PASSWORD_SUCCESS, c.RESET_PASSWORD_FAIL],
    promise: (client) => client.put('/auth/change-password', {
      params: {
        email:  data.email,
        password: data.password,
        newpassword: data.newpassword,
      },
    }),
    afterSuccess: (dispatch, getState, result) => {
        onSuccess(result)
      },
      afterError: () => {
        faild();
      }
  }
}
