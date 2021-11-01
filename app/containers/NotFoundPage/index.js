/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import RestaurantCard from '../../components/Restaurant/RestaurantCard';
import Profile from '../../components/Users/Profile';
import RadioButtonComponent from '../../components/RadioButton/RadioButtonComponent';
import MessageBox from '../../components/MessageBox/MessageBox';
import MenuNav from '../../components/mydishNav/SettingsMenu';
import NoteComponent from '../../components/Note/NoteComponent';
import InformationsModal from '../../components/details/InformationsModal';
import ReservationModal from '../../components/ReservationModal/ReservationModal';
import PaymentMethodBox from '../../components/Payment/PaymentMethodBox';
import CommandesBox from '../../components/Commande/CommandesBox';
import FidelityComponent from '../../components/FidelityComponent/FidelityComponent';
import RestaurantMapCard from '../../components/Restaurant/RestaurantMapCard';
import DishDetail from '../../components/mydishDetail/DishDetail';
import NavbarClient from '../NavbarHeader/NavbarHeader';

const restaurantTestData = {
  imageUrl:
    'https://cdn.zeplin.io/5f3ba56c9e5bff26991556f4/assets/FD7D1209-8A02-4B64-88EE-2BD57CC55EFB.png',
  name: 'Restaurant Name',
  address: 'some address',
  avgPrice: 22,
  deliveryFees: 6,
  offers: '3rd purchase is free',
  type: 'Italian',
  isFavorite: false,
  globalRating: 7,
  ratingsNbr: 44,
};

const PaymentMethodtestData = {
  name: 'Carte de crédit ou de débit ',
  // eslint-disable-next-line global-require
  imageUri: require('www/icons/icon.png'),
  description: 'Pas de carte enregistrée',
  selectedValue: 'a',
  value: 'a',
  onChange: () => {
    // eslint-disable-next-line no-console
    console.log('onchange radiobutton');
  },
};

const MessageBoxTestData = {
  name: 'Vous-navez-pas-de-bon-en-ce-moment',
  // eslint-disable-next-line global-require
  imageUri: require('www/img/bon-popup-bg.png'),
};

const ProfilTestData = {
  name: 'Ahmed Saidi',
  // eslint-disable-next-line global-require
  imageUri: require('www/img/avatar.png'),
  num: '+33655714239',
};

const detailsTestData = {
  name: 'Joayo Haussmann',
  numTel: '+33655714239',
  adresse: '10 rue Gustave Flaubert, 7658 Paris.',
  heureDej: 'de 12h à 15h',
  HeureDiner: 'de 19h à 00h',
  caracteristique: 'Cosy, Mesures Covid-19, Asiatique',
  services: 'American, Express, Carte Bleue',
};

const fidelityTestData = [
  {
    restaurantName: 'Joayo Haussmann',
    restaurantType: 'Italien • Pizza',
    promoCode: 'FID1287',
  },
  {
    restaurantName: 'Les Rupins',
    restaurantType: 'Thaïlandais',
    promoCode: 'FID1287',
  },
  {
    restaurantName: 'Les Rupins',
    restaurantType: 'Thaïlandais',
    promoCode: 'FID1287',
  },
];

const productDetailsTestData = {
  name: 'Soupe de nouilles au bœuf piquant',
  description:
    'Pâtes fraîches au choix. Sauce tomate, basilic, piment et parmesan.',
  options: {
    name: 'Pâtes au choix',
    isMandatory: true,
    choices: [
      {
        label: 'Vermicelle du riz',
        price: '1.00 $',
      },
      {
        label: 'Pâtes épaisses',
        price: '2.00 $',
      },
      {
        label: 'Pâtes fines',
        price: '3.00 $',
      },
    ],
  },
  price: '12 €',
};

export default function NotFound() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <RadioButtonComponent {...PaymentMethodtestData} />
      <MessageBox {...MessageBoxTestData} />
      <RestaurantCard {...restaurantTestData} />
      <Profile {...ProfilTestData} />
      <MenuNav />
      <NoteComponent />
      <InformationsModal {...detailsTestData} />
      <ReservationModal />
      <PaymentMethodBox />
      <DishDetail />
      <RestaurantMapCard {...restaurantTestData} />

      <NavbarClient />
    </h1>
  );
}
