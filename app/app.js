/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import languageProviderReducer from './containers/LanguageProvider/Reducer/reducer';
import reducerProfile from './containers/MainApp/Profile/Reducer/reducer';
import reducerPesto from './containers/MainApp/Restaurant/Reducer/reducer';
import reducerMainApp from './containers/MainApp/Reducer/reducer';
import reducerListResto from './containers/MainApp/Restaurants/Reducer/reducer';
import reducerLogin from './containers/LoginPage/Reducer/reducer';
import reducerMain from './containers/MainLandingPage/Reducer/reducer';

// Needed for redux-saga es6 generator support
/* eslint-disable import/no-unresolved, import/extensions */
import '@babel/polyfill';
/* eslint-disable import/no-unresolved, import/extensions */
import './index.css';
/* eslint-disable import/no-unresolved, import/extensions */
import './tailwind.css';
import { ToastProvider } from 'react-toast-notifications';
// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./www/icons/facebook.svg';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
import { setupAxiosInterceptors } from './utils/axios';

// Import i18n messages
import { translationMessages } from './www/intl/i18n';

//import container
import RegistrationForm from './containers/RegistrationPage';
import CommentsList from './containers/HomePage';
import ForgetPswdPage from './containers/ForgetPswdPage';
import PrincipalPage from './containers/PrincipalPage';
import RestaurantLandingPage from './containers/RestaurantLandingPage';
import MainLandingPage from './containers/MainLandingPage';
import MainClientApp from './containers/MainApp/MainApp';
import RestaurantsApp from './containers/MainApp/Restaurants/RestaurantsContainer';
import LoginPage from './containers/LoginPage';
import CommandeContainer from "./containers/MainApp/Commande/CommandeContainer";

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);


export const reducers=[
  {key: 'language',  reducer: languageProviderReducer},
  {key: 'profile', reducer: reducerProfile},
  {key: 'restaurant',  reducer :reducerPesto},
  {key: 'restaurants', reducer: reducerListResto},
  {key: 'login', reducer: reducerLogin},
  {key: 'landing', reducer:reducerMain},
  {key: 'cart', reducer: reducerMainApp}];
reducers.map((reducer) => {
  store.injectReducer(reducer.key, reducer.reducer );
});

setupAxiosInterceptors(store.dispatch, store.getState);

const MOUNT_NODE = document.getElementById('app');


const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
          <LanguageProvider messages={messages}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={MainLandingPage} />
                <Route exact path="/app" component={App} />
                <Route exact path="/registration" component={RegistrationForm} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/ForgetPassword" component={ForgetPswdPage} />
                <Route path="/PrincipalPage" component={PrincipalPage} />
                <Route exact path="/landing" component={RestaurantLandingPage} />
                <Route exact path="/client" component={MainLandingPage} />
                <Route exact path="/comments" component={CommentsList} />
                <Route path="/restaurants" component={RestaurantsApp} />
                <Route path="/restaurant/" component={MainClientApp} />
                <Route path="/commande" component={CommandeContainer} />
              </Switch>
            </ConnectedRouter>
          </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./www/intl/i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
