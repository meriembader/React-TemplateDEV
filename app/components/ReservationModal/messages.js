/*
 * Reservation Messages
 *
 * This contains all the text for the Reservation container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components';

export default defineMessages({
  reservationTitle: {
    id: `${scope}.reservation.title`,
    defaultMessage: 'Réservation',
  },
  invitedNumber: {
    id: `${scope}.invited.number.title`,
    defaultMessage: 'Nombre de personne',
  },
  diner: {
    id: `${scope}.diner.title`,
    defaultMessage: 'Déjeuner',
  },
  offer: {
    id: `${scope}.offer.title`,
    defaultMessage: 'Offre',
  },
  next: {
    id: `common.next.label`,
    defaultMessage: 'Suivant',
  },
  newBookingTitle: {
    id: `${scope}.newBook.title`,
    defaultMessage: 'À venir',
  },
  oldBookingTitle: {
    id: `${scope}.oldBook.title`,
    defaultMessage: 'Anciennes',
  },

});
