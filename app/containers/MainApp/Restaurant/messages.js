import { defineMessages } from 'react-intl';

export const scope = 'app.containers.restaurant.detail';

export default defineMessages({
  entree: {
    id: `common.product.category.entree`,
    defaultMessage: 'Entrées',
  },
  detailsTitle: {
    id: `${scope}.modal.title`,
    defaultMessage: 'Plus d’informations',
  },
  reduction:{
    id: `${scope}.reduction`,
    defaultMessage: 'Réduction',
  },
  detailsPrice: {
    id: `${scope}.price.title`,
    defaultMessage: 'Prix moyen:',
  },
  plat: {
    id: `common.product.category.plat`,
    defaultMessage: 'Plats',
  },
  dessert: {
    id: `common.product.category.dessert`,
    defaultMessage: 'Désserts',
  },
  boisson: {
    id: `common.product.category.boisson`,
    defaultMessage: 'Boissons',
  },
  reserveTable: {
    id: `common.reserve.table`,
    defaultMessage: 'Réserver une table',
  },
});
