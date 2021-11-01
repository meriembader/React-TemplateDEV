import config from "./config";
import {hashHistory} from "react-router";
import Immutable from "seamless-immutable";
import {
  fetchLocale,
  FETCH_LOCALE,
  FETCH_LOCALE_SUCCESS,
  FETCH_LOCALE_FAIL,
  FETCH_OVERRIDE_LOCALE_FAIL,
  FETCH_OVERRIDE_LOCALE_SUCCESS
} from "./locales";
import {notify} from "../components/lib/notify";
import axios from "axios";
import {GlobalMessages} from "../intl/GlobalMessages";
import querystring from 'querystring';
import ProgressMonitor from "../../common/progress/ProgressMonitor";
import SubProgressMonitor from "../../common/progress/SubProgressMonitor";
import PromiseSemaphore from 'promise-semaphore';
import uuid from "uuid";

const LOGIN = 'authentication/LOGIN';
const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const LOGIN_FAIL = 'authentication/LOGIN_FAIL';
const SESSION_FAIL = 'authentication/SESSION_FAIL';
const SET_CAPTCHA = 'authentication/SET_CAPTCHA';

const INSTALL_SESSION = 'authentication/INSTALL_SESSION';

export const LOGOUT = 'authentication/LOGOUT';
const LOGOUT_SUCCESS = 'authentication/LOGOUT_SUCCESS';
const LOGOUT_FAILED = 'authentication/LOGOUT_FAILED';

export const ENCRYPT = 'authentication/ENCRYPT';
const ENCRYPT_SUCCESS = 'authentication/ENCRYPT_SUCCESS';
const ENCRYPT_FAILED = 'authentication/ENCRYPT_FAILED';
const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE';

const CONFIGURATION = 'authentication/CONFIGURATON';
export const CONFIGURATION_SUCCESS = 'authentication/CONFIGURATON_SUCCESS';
const CONFIGURATION_FAIL = 'authentication/CONFIGURATON_FAIL';

export const CLEAR_CACHE = 'all/CLEAR_CACHE';

export const REGISTER_USER = "authentication/REGISTER_USER";
export const REGISTER_USER_SUCCESS = "authentication/REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "authentication/REGISTER_USER_FAIL";

export const GUEST_LOGIN = "authentication/GUEST_LOGIN";
export const GUEST_LOGIN_FAIL = "authentication/GUEST_LOGIN_FAIL";

const SHOW_FIELDS = "conf/SHOW_FIELDS";
const CHANGE_SKIN = "conf/CHANGE_SKIN";

const GET_SESSION_LOADING = "user/GET_SESSION_LOADING";
const GET_SESSION_SUCCESS = "user/GET_SESSION_SUCCESS";
const GET_SESSION_FAILED = "user/GET_SESSION_FAILED";

var showBadNetworkStepSelection;

const initialState = {
  isAuthenticated: undefined,
  sessionUUID: undefined,
  loggedAsGuest: false,
  isLoading: false,
  username: null,
  errorMessage: null,
  user: {
    locale: "fr_FR",
    currencycode: "EUR",
    currencysymbol: "€",
  },
  stringOverride: {},
  skinClass: localStorage.getItem('skin') || 'skin-blue',
  showFields: false,
  options: {
    toplefttitle: 'Cassiopae POS',
    toplefttitleimage: undefined,
    toplefttitleimagemin: undefined,
    fixedLayout: true,
    showskinselector: true,
    showDashboardEditor: true,
    HideLeftBar: false,
    HideTopBar: false,
    HideRightBar: false
  },
  reCaptchaKeys: {},
};

// Reducer

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case GET_SESSION_LOADING:
      return state.merge({
        sessionLoading: true
      });

    case GET_SESSION_SUCCESS:
      return state.merge({
        sessionLoading: false,
        sessionFailed: false,
        isAuthenticated: true
      });

    case GET_SESSION_FAILED:
      let errorMessage = null;
      if (window.sessionStorage) {
        sessionStorage.removeItem("mydish.errorMessage");
        sessionStorage.removeItem("mydish.user");
        sessionStorage.removeItem('sessionToken');
      }

      return state.merge({
        sessionLoading: false,
        sessionFailed: action.error || true,
        isAuthenticated: false,
        errorMessage
      });

    case INSTALL_SESSION:
      if (window.localStorage) {
        localStorage.setItem("mydish.session." + action.sessionUUID, "true");
      }

      return state.merge({
        sessionUUID: action.sessionUUID,
        sessionWatchdog: action.sessionWatchdog,
      });

    case LOGIN:
      if (state.sessionWatchdog) {
        clearInterval(state.sessionWatchdog);
      }
      return state.merge({
        sessionWatchdog: undefined,
        loginLoading: true
      });

    case LOGIN_SUCCESS:

      return state.merge({
        loggedAsGuest: false,
        errorMessage: null,
        loginLoading: false,
        isAuthenticated: true
      });

    case LOGIN_FAIL:
      return state.merge({
        isAuthenticated: false,
        loginLoading: false,
        username: null,
        errorMessage: (action.error.response && action.error.response.status === 401) ? GlobalMessages.invalidUsername : action.error.message
      });

    case LOGOUT:
      console.log("LOGOUT session", state.sessionUUID);

      if (window.sessionStorage) {
        sessionStorage.removeItem("mydish.user");
        sessionStorage.removeItem('sessionToken');

        for (var i = 0; i < localStorage.length; i++) {
          let key = localStorage.key(i);
          if (!key || !/^mydish\.session\./.exec(key)) {
            continue;
          }

          console.log("LOGOUT remove session=", key);
          localStorage.removeItem(key);
          i--;
        }

        console.log("LOGOUT local attributes=", localStorage);
      }
      if (state.sessionWatchdog) {
        clearInterval(state.sessionWatchdog);
      }

      return state.merge({
        sessionWatchdog: undefined,
        isAuthenticated: false,
        loggedAsGuest: false,
        username: null,
        logoutRunning: true
      });

    case LOGOUT_SUCCESS:
      if (window.sessionStorage) {
        if (state.errorMessage) {
          sessionStorage.setItem("mydish.errorMessage", state.errorMessage);
        }
      }
      return state.merge({
        logoutRunning: false
      });

    case LOGOUT_FAILED:
      return state.merge({
        logoutRunning: false
      });

    case CONFIGURATION:
      return state.merge({
        configurationLoading: true
      });

    case CONFIGURATION_FAIL:
      return state.merge({
        configurationLoading: false,
        configurationError: action.error
      });

    case FETCH_LOCALE:
      return state.merge({
        isLoading: true
      });

    case FETCH_LOCALE_SUCCESS:
    case FETCH_LOCALE_FAIL:
    case SESSION_FAIL:
      return state.merge({
        isLoading: false
      });

    case GUEST_LOGIN:
      return state.merge({
        isLoading: true
      });


    case GUEST_LOGIN_FAIL:
      return state.merge({
        isAuthenticated: false,
        isLoading: false,
        username: null,
        loggedAsGuest: false,
        errorMessage: (action.error.response && action.error.response.status === 401) ? GlobalMessages.invalidUsername : action.error.message
      });

    case CONFIGURATION_SUCCESS: {
      let data = action.userConfigurationResult.data;
      if (data.options.networkstepselection !== 2 && !showBadNetworkStepSelection) {
        showBadNetworkStepSelection = true;
        alert("Bad networkStepSelection configuration ! Please call the support !");
      }

      state = state.merge({
        sessionUUID: action.sessionUUID,
        configurationLoading: false,
        //loggedAsGuest: action.loggedAsGuest,
        options: {...state.options, ...data.options},
        //skinClass: action.result.data.user.skin || 'skin-blue',
        username: data.user.firstname + " " + data.user.lastname,
        user: data.user,
        stringOverride: data.stringOverride,
        accesskeys: data.accesskeys.filter(m => m.visible)
      });

      return state;
    }

    case ERROR_MESSAGE: {
      return state.merge({
        errorMessage: action.message
      });
    }

    case SET_CAPTCHA:
      return state.set('reCaptchaKeys', action.reCaptchaKeys);

    case SHOW_FIELDS:
      return state.set("showFields", action.show || !state.showFields);

    default:
      return state;
  }
}

// Public action creators and async actions

export function displayAuthError(message) {
  return {type: ERROR_MESSAGE, message};
}

export function removeCache() {
  return {type: CLEAR_CACHE};
}

const sessionSemaphore = new PromiseSemaphore();

/**
 * Is current session is valid ?
 *
 * @returns {function(*, *)}
 */
export function getSession() {
  console.log("Get session");
  return (dispatch, getState) => {

    let promise = sessionSemaphore.add(() => {
      let state = getState();

      console.log("Get session state=", state.authentication.isAuthenticated);

      if (state.authentication.isAuthenticated === false) {
        return Promise.reject(new Error("Not authenticated"));
      }
      if (state.authentication.isAuthenticated === true) {
        return Promise.resolved(true);
      }

      dispatch({
        type: GET_SESSION_LOADING
      });

      console.log("Get session start loading");

      let promise = dispatch(verifyLogin()).then((result) => {
        console.log("Get session: verifyLogin result=", result);

        let promise = dispatch(installSession({setDefaultAsCurrent: true}));

        return promise;
      });

      promise = promise.then((result) => {
        console.log("Get session: main result=", result);

        dispatch({
          type: GET_SESSION_SUCCESS,
          payload: result
        });

        return result;

      }, (error) => {
        console.log("Get session: verifyLogin error=", error);
        dispatch({
          type: GET_SESSION_FAILED,
          error
        });

        dispatch(removeCache());
        hashHistory.push('login');
      });

      return promise;
    });

    return promise;
  };
}

function verifyLogin() {
  return (dispatch, getState) => {
    console.log("Verify login ...");

    let promise = axios.get('/userconfigurations', {
      noAutoLogoutOnError: true
    }).then((result) => {

      console.log("Verify login: success result=", result);

      return Promise.resolve(true);

    }, (error) => {
      console.error("Verify login: error=", error);

      return Promise.reject(error);
    });

    return promise;
  }
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @param {string} [apiName]
 * @param {ProgressMonitor} [progressMonitor]
 * @returns {function(*, *)}
 */
export function login(publicKey, username, password, apiName, progressMonitor = ProgressMonitor.empty()) {
  console.log("Login: username=", username, "apiName=", apiName);

  const api = config.apis ? config.apis[apiName || config.masterApi] : EMPTY_OBJECT;

  return (dispatch, getState) => {

    let state = getState();
    if (state.authentication.login) {
      return Promise.reject(new Error("Already performing ..."));
    }

    dispatch({
      type: LOGIN
    });

    progressMonitor.beginTask("Query authentication", 3);
    let promise = null;
    if (publicKey) {
      promise = axios.post(api.loginApi || '/login',
        querystring.stringify({ksiopuser: username, ksiopvalue: password}),
        {
          headers: {'X-KSIOP-Key': publicKey},
          api: apiName,
          noAutoLogoutOnError: true
        });

    }
    else {
      promise = axios.post(api.loginApi || '/login',
        querystring.stringify({ksiopuser: username, ksiopvalue: password}),
        progressMonitor.axios({
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          api: apiName,
          noAutoLogoutOnError: true
        }));
    }

    promise = promise.then((result) => {
      sessionStorage.removeItem('sessionToken');
      if (result.headers['mydish-session-token']) {
        sessionStorage.setItem('sessionToken', result.headers['mydish-session-token']);
      }
      console.log("Login: WS result=", result);

      let sub = new SubProgressMonitor(progressMonitor, 2);

      let promise = dispatch(installSession({setDefaultAsCurrent: true}, sub));

      promise = promise.then((configurationResult) => {
        dispatch({
          type: LOGIN_SUCCESS
        });

        return configurationResult;
      });

      return promise;

    }, (error) => {
      console.error("Login: Authentification failed error=", error);

      dispatch({
        type: LOGIN_FAIL,
        error
      });

      return Promise.reject(error);
    });

    promise = progressMonitor.thenDone(promise);

    return promise;
  };
}

export function ecryptedPassword(paswdr, apiName) {
  const api = config.apis ? config.apis[apiName || config.masterApi] : EMPTY_OBJECT;
  let hostname = api.hostname;
  if (!hostname || hostname == '.') {
    hostname = '%ROOT'
  }
  return {
    types: [ENCRYPT, ENCRYPT_SUCCESS, ENCRYPT_FAILED],
    promise: (client) => client.get(hostname + '/EncryptionServices/encryption/init')
  }
}

export function logout() {

  document.body.style.display = "none";
  let location = /^([^#?]+)/.exec(String(document.location))[1] + "?" + (new Date()).getTime();

  function reloadApplication() {
    document.body.innerHTML = "Déconnection de l'application";
    setTimeout(() => {
      console.log("Set location to", location);
      document.location = location;
    }, 150);

  }

  return (dispatch, getState) => {

    let state = getState();
    if (state.authentication.logoutRunning) {
      return;
    }

    dispatch({
      type: LOGOUT
    });

    let promise = axios.get('/mydishlogout').then((result) => {
      reloadApplication();

      dispatch({
        type: LOGOUT_SUCCESS
      });

      return result;

    }, (error) => {
      reloadApplication();
      dispatch({
        type: LOGOUT_FAILED,
        error
      });

      return Promise.reject(error);
    });

    return promise;
  };

}

function setReCaptchaKeys(reCaptchaSiteKey, reCaptchaSecretKey) {
  return {
    type: SET_CAPTCHA,
    reCaptchaKeys: {siteKey: reCaptchaSiteKey, secretKey: reCaptchaSecretKey}
  }
}

export function validateUser(username) {
  return axios.get('/users/validateusername?username=' + username)
}

export function register(data, isPortalUser, onSuccess, onError) {
  return {
    types: [REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL],
    promise: (client) => client.post('/users/createuser/', data),
    afterSuccess: (dispatch, getState, result) => {
      if (localStorage.getItem('isGuest-loggedIn') && result.data) {
        localStorage.removeItem('isGuest-loggedIn');
         hashHistory.push('logout');
       }
       hashHistory.push('login');
       notify.show('User registered successfully');

    },
    afterError: (dispatch, getState, result) => {
      notify.show('User not Registered');
    }
  }
}

export function forgotPassword(data) {
  hashHistory.push('login');
  notify.show('Email sent');
}

export function fetchClientConfig(client) {
  return {
    type: "REGISTER"
  }
}

export function installSession(params = {}, progressMonitor = ProgressMonitor.empty()) {
  return (dispatch, getState) => {

    let promise = dispatch(getConfiguration(params, progressMonitor));

    promise = promise.then((result) => {

      let sessionUUID = uuid();

      let sessionWatchdog = setInterval(() => {
        if (localStorage.getItem("mydish.session." + sessionUUID)) {
          return;
        }

        //alert("L'utilisateur a été changé pour cette session.\nVeuillez vous reconnecter !");

        dispatch(logout());
        dispatch(redirectToLoginWithMessage("La session de cet utilisateur a été fermée."));
      }, 1000);

      dispatch({
        type: INSTALL_SESSION,
        sessionUUID,
        sessionWatchdog
      });

      return result;
    });

    return promise;
  };
}

export function getConfiguration(params = {}, progressMonitor = ProgressMonitor.empty()) {
  return (dispatch, getState) => {
    dispatch({
      type: CONFIGURATION
    });

    progressMonitor.beginTask("Get user configuration", 2);

    let promise = axios.get("/mydishconfigurations", {
      ...progressMonitor.axios(),
      noAutoLogoutOnError: true

    }).then((userConfigurationResult) => {
      let data = userConfigurationResult.data;

      let sub = new SubProgressMonitor(progressMonitor, 1);

      let promise = dispatch(fetchLocale(data.user.locale, sub)).then((localeResult) => {

        dispatch({
          type: CONFIGURATION_SUCCESS,
          userConfigurationResult,
          localeResult
        });

        return data;
      });

      return promise;

    }, (error) => {

      dispatch({
        type: CONFIGURATION_FAIL,
        error
      });

      return Promise.reject(error);
    });

    promise = progressMonitor.thenDone(promise);

    return promise;
  };
}

export function updateConfiguration(myDishConfiguration, callback) {
  // TODO
  return {
    types: [CONFIGURATION, CONFIGURATION_SUCCESS, CONFIGURATION_FAIL],
    promise: client => client.post("/mydishconfigurations", myDishConfiguration),
    afterSuccess: (dispatch, getState, response) => {
      if (callback) {
        callback(dispatch);
      }
    }
  }
}

export function redirectToLoginWithMessage(message) {
  console.log("redirectToLoginWithMessage message=", message);
  return (dispatch, getState) => {
    const currentPath = getState().routing.locationBeforeTransitions.pathname;

    if (window.sessionStorage) {
      sessionStorage.setItem("mydish.errorMessage", message);
    }

    if (currentPath !== "/") {
      dispatch(displayAuthError(message));
    }

    if (currentPath !== 'login' && currentPath !== '/login') {
      hashHistory.replace({pathname: 'login', state: {nextPathname: currentPath}});
    }
  }
}


export function showFields(show) {
  return {
    type: SHOW_FIELDS,
    show
  }

}



export function changeSkin(skinClass) {
  return {
    type: CHANGE_SKIN,
    skinClass
  }
}


export function computeSkinClass(brand) {

  switch (brand) {
    case "KTMF":
      return "ypos-ktmf";

    case "HUSQVARNA":
      return "ypos-husqvarna";
  }

  return "ypos-sant";
}
