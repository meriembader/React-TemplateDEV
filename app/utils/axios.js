import axios from 'axios';

const BASE_URL = 'http://mydish-back.herokuapp.com/api';//const BASE_URL = 'https://mydish-backend.herokuapp.com/api';


const setupAxiosInterceptors = (dispatch, getState) => {
  const onRequestSuccess = config => {
    if (config.method == 'get') {
      config.headers = {
        ...config.headers,
        Pragma: 'no-cache',
        'If-Modified-Since': '0',
      };
    }

    /*if (
      sessionStorage.getItem('myDish-token') !== undefined &&
      sessionStorage.getItem('myDish-token') !== null
    ) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${sessionStorage.getItem('myDish-token')}`,
      };
    }*/

    return { ...config, url: BASE_URL + config.url };
  };

  const onResponseSuccess = response => Promise.resolve(response);
  const onResponseError = error => {
    if (
      error.response &&
      (error.response.status === 409 || error.response.status === 401)
    ) {
      if (error.config.noAutoLogoutOnError) {
        return Promise.reject(error);
      }
      const state = getState();

      console.log('Authentication=', state.authentication);
      /* if (state.authentication.isAuthenticated) {
        dispatch(logout());
        dispatch(redirectToLoginWithMessage('L\'utilisateur a été changé pour cette session. Veuillez vous reconnecter !'));
      } */
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export { setupAxiosInterceptors };
