import { createHashHistory } from 'history';
import { round } from 'lodash';

// Public action creators and async actions

export function displayAuthError(message) {
  return {type: ERROR_MESSAGE, message};
}

export function redirectToLoginWithMessage(message) {
  const hashHistory = createHashHistory();
  return (dispatch, getState) => {
    const currentPath = getState().routing.locationBeforeTransitions.pathname;

    if (window.sessionStorage) {
      window.sessionStorage.setItem("session.errorMessage", message);
    }

    if (currentPath !== "/") {
      dispatch(displayAuthError(message));
    }

    if (currentPath !== 'login' && currentPath !== '/login') {
      hashHistory.replace({pathname: 'login', state: {nextPathname: currentPath}});
    }
  }
}

/**
 *
 * @param list
 * @param attribut
 * @returns {number}
 */
export function moyenneTableau(list, attribut) {
  var somme = 0;
  if(!list || list.length<1 ){
    return 0;
  }
  for (var i = 0, j = list.length; i < j; i++) {
    somme += list[i][attribut];
  }
  return round(somme / list.length, 2);
}


/**
 *
 * @param email
 * @returns {boolean} TRUE if email is valid
 */
export function isValidEmailAddress(email) {
  // A valid function returns TRUE if it is VALID not the opposite !
  return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(email));
}


export function maskedEmail(email){
  if(isValidEmailAddress(email)) {
    const emailArray = email.split('@');
    const lastEmail = email.slice(-4);
    const maskedStartEmail = emailArray[0] && emailArray[0].length > 1 ? emailArray[0].substr(0, 2).padEnd(emailArray[0].length, '*') : '*';
    const maskedLastEMail = lastEmail ? lastEmail.padStart(emailArray[1].length, '*') : '*';
    return maskedStartEmail + '@' + maskedLastEMail;
  }else{
    return '*****'
  }

}
/**
 *
 * @param {string}
 *            atenum
 * @returns {boolean} TRUE if telephone n
 */
export function isValidTelephoneNo(phoneNumber) {
  return /^\+\d{10,13}$|^\d{10}$/.test(phoneNumber);
}

/**
 *
 * @param password
 * @returns {boolean|*}
 */
export function validatePassword(password){
  if(password) {
    let decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return (password.match(decimal));
  }else{
    return false;
  }
}

/**
 *
 * @param value
 * @returns {*}
 */
export function normalizeCodeSMS(value) {
  let normalizedValue = '';

  if (value && value.length) {
    normalizedValue += value.replace(/[^0-9]/g, '');
  }


  return normalizedValue.substring(0, 3);
}
