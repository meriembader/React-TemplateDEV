import { defineMessages } from 'react-intl';
import React from 'react';

export const scope = 'app.containers.Footer';

export default defineMessages({
  about: {
    id: `${scope}.about.title`,
    defaultMessage: 'A propos',
  },
  contact: {
    id: `${scope}.contact.title`,
    defaultMessage: 'Contact',
  },
  help: {
    id: `${scope}.help.title`,
    defaultMessage: 'Obtenir de l\'aide',
  },
  faq: {
    id: `${scope}.faq.title`,
    defaultMessage: 'FAQ',
  },
  languageFr: {
    id: `${scope}.langue.fr.title`,
    defaultMessage: 'Français',
  },
  reservedRight: {
    id: `${scope}.reservation.title`,
    defaultMessage: '© 2020 Mydish Tous droits réservés',
  },
  condition: {
    id: `${scope}.condition.title`,
    defaultMessage: 'Condition',
  },
  confidentiality: {
    id: `${scope}.confidentiality.title`,
    defaultMessage: 'Politique de confidentialité ',
  },
  newsletterSubscription: {
    id: `${scope}.subscribe.title`,
    defaultMessage: 'Inscrivez-vous à notre newsletter ',
  },
  joinUs: {
    id: `${scope}.joinUs.title`,
    defaultMessage: 'Rejoignez-nous sur',
  },
  downloadApp: {
    id: `${scope}.download.app.title`,
    defaultMessage: 'Téléchargez mydish',
  },
  email: {
    id: `${scope}.email.title`,
    defaultMessage: 'Votre adresse e-mail',
  },
  abonner: {
    id: `${scope}.abonner.title`,
    defaultMessage: "S'abonner",
  },
});
