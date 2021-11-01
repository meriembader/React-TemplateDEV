/*
 * RestaurantCard Messages
 *
 * This contains all the text for the RestaurantCard container.
 */
import { defineMessages } from 'react-intl';

const scope = 'app.components.details';

export default defineMessages({
  detailsTitle: {
    id: `${scope}.modal.title`,
    defaultMessage: 'Plus d’informations',
  },
  details: {
    id: `${scope}.button.details`,
    defaultMessage: 'Plus de details',
  },
  horOverture: {
    id: `${scope}.modal.details.horOverture`,
    defaultMessage: 'Horaires ouverture',
  },
  hourLunch: {
    id: `${scope}.modal.details.hourLunch`,
    defaultMessage: 'Déjeuner:',
  },
  dinerTime: {
    id: `${scope}.modal.details.dinerTime`,
    defaultMessage: 'Diner:',
  },
  contact: {
    id: `${scope}.modal.details.contact`,
    defaultMessage: 'Contact',
  },
  adresseRest: {
    id: `${scope}.modal.details.adresse`,
    defaultMessage: 'Adresse',
  },
  caracteristique: {
    id: `${scope}.modal.details.caracteristique`,
    defaultMessage: 'Caracteristiques',
  },
  services: {
    id: `${scope}.modal.details.services`,
    defaultMessage: 'Services',
  },
});
