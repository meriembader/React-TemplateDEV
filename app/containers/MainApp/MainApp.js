import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import Footer from '../../components/Footer/Footer';
import './main.scss';
import NavbarClient from '../NavbarHeader/NavbarHeader';
import RestaurantsContainer from './Restaurants/RestaurantsContainer';
import RestaurantContainer from './Restaurant/RestaurantContainer';
import CommandeContainer from './Commande/CommandeContainer';

const MainClientApp = () => {
  return (
    <div className="main-client-app">
      <NavbarClient withSearchText={true}/>
      <Switch>
        <Route
          path="/restaurants/:category"
          component={RestaurantsContainer}
        />
        <Route
          path="/restaurants/"
          component={RestaurantsContainer}
        />
        <Route
          path="/restaurant/:restaurantId"
          component={RestaurantContainer}
        />
        <Route path="/commande" component={CommandeContainer} />
      </Switch>
      <Footer />
    </div>
  );
};

export default injectIntl(MainClientApp);
