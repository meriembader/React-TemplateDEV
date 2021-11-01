import React, { memo } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import {IcoRxFavoris, IcoRxOpinion, IcoRxSale, IcoRxBoocking, IcoRxPerson} from '../lib/BsCustomerIcon/BsGenerateIcon';

import messages from './messages';
import './SettingsMenu.scss';
import Burger from './Burger';

export const itemMenuMetadata = [
  {
    id: 'myspace.menu.myprofil',
    order: 1,
    path: '/PrincipalPage/profile',
    label: (
      <FormattedMessage {...messages.profileTitle} />
    ),
    className:"title-menu",
    componentIcon: IcoRxPerson,
    hidden: false,
  },
  {
    id: 'myspace.menu.myfavoris',
    order: 5,
    path: '/PrincipalPage/favoris',
    label: (
      <FormattedMessage {...messages.favorisComponentTitle}  />
    ),
    className:"title-menu",
    componentIcon: IcoRxFavoris,
    hidden: false,
  },
  {
    id: 'myspace.menu.myreservation',
    order: 2,
    path: '/PrincipalPage/reservation',
    label: (
      <FormattedMessage {...messages.reservationTitle}  />
    ),
    className:"title-menu",
    componentIcon:  IcoRxBoocking,
    hidden: false,
  },
  {
    id: 'myspace.menu.myopinion',
    order: 4,
    path: '/PrincipalPage/opinion',
    label: (
      <FormattedMessage {...messages.opinionTitle}  />
    ),
    className:"title-menu",
    componentIcon: IcoRxOpinion,
    hidden: false,
  },
  {
    id: 'myspace.menu.mySpaceTitle',
    order: 3,
    path: '/PrincipalPage/fidelity',
    label: <FormattedMessage {...messages.spaceTitle}  />,
    className:"title-menu",
    componentIcon: IcoRxSale,
    hidden: false,
  },
  {
    id: 'myspace.menu.login',
    order: 6,
    path: '/Login',
    label:   <FormattedMessage {...messages.disconnect}  />,
    className: "disconnect-menu",
    hidden: false,
  },
];

const SettingsMenu = () => {
  return (
        <Burger dataMenu={itemMenuMetadata}/>);
};


export default compose(
  memo,
  injectIntl,
)(SettingsMenu);
