/*
 * RestaurantCard Messages
 *
 * This contains all the text for the RestaurantCard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Node';

export default defineMessages({
  mesReservationTitle: {
    id: `${scope}.reservation.title`,
    defaultMessage: 'Mes réservations',
  },
  fidelityComponentTitle: {
    id: `${scope}.section.title`,
    defaultMessage: 'Mon espace fidélité',
  },
  editProfile: {
    id: `${scope}.nav.editProfile`,
    defaultMessage: 'Modifier',
  },
  profileTitle: {
    id: `${scope}.nav.profileTitle`,
    defaultMessage: 'Mon profil',
  },
  reservationTitle: {
    id: `${scope}.nav.reservationTitle`,
    defaultMessage: 'Mes réservations',
  },
  spaceTitle: {
    id: `${scope}.nav.spaceTitle`,
    defaultMessage: 'Mon espace de fidélité',
  },
  opinionTitle: {
    id: `${scope}.nav.opinionTitle`,
    defaultMessage: 'Mes avis',
  },
  disconnect: {
    id: `${scope}.nav.deconnectTitle`,
    defaultMessage: 'Se déconnecter',
  },
  favorisComponentTitle: {
    id: `${scope}.section.favoris.title`,
    defaultMessage: 'Mes favoris',
  },
  searchTitle1: {
    id: `common.input.searchTitle`,
    defaultMessage: 'Saisissez une ville ou un restaurant',
  },
  deleteSuccess: {
    id: `${scope}.deleteSuccess`,
    defaultMessage: 'l avis a été supprimé avec succés.',
  },
  extendText: {
    id: `${scope}.extendText`,
    defaultMessage: 'Plus ...',
  }
});
