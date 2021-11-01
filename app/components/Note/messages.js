/*
 * RestaurantCard Messages
 *
 * This contains all the text for the RestaurantCard container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Node';

export default defineMessages({
  avisNote: {
    id: `${scope}.label.Note`,
    defaultMessage: 'Note',
  },
  avisTitle: {
    id: `${scope}.label.title`,
    defaultMessage: "Titre de l'avis",
  },
  avisDescription: {
    id: `${scope}.label.description`,
    defaultMessage: 'Avis',
  },
  addAvis: {
    id: `${scope}.popup.avis`,
    defaultMessage: 'Écriver un avis',
  },
  popupAvis: {
    id: `${scope}.popup.title`,
    defaultMessage: 'Écriver un avis',
  },
  avisNumber: {
    id: `${scope}.comment.avisNumber`,
    defaultMessage: 'Avis',
  },
  searchTitle: {
    id: `common.input.searchTitle`,
    defaultMessage: 'Saisissez une ville ou un restaurant',
  },
  mydishTitle: {
    id: `${scope}.input.mydishTitle`,
    defaultMessage: 'mydish',
  },
  editOpinion: {
  id: `${scope}.editOpinion`,
    defaultMessage: 'Modifier l` avis',
  },
  valider: {
    id: `${scope}.valider`,
    defaultMessage: 'Valider',
  }

});
