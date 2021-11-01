import { defineMessages } from 'react-intl';

export const scope = 'app.components.fidelity';

export default defineMessages({

  nofavorisComponentTitle: {
    id: `${scope}.section.nfavoris.title`,
    defaultMessage: 'Aucun code promo',
  },
  nofavorisComponentDetail: {
    id: `${scope}.section.nfavoris.detail`,
    defaultMessage: 'Vous n`avez pas de code promotionnel en ce moment',
  },
  nofavorisComponentDetail2: {
    id: `${scope}.section.nfavoris.detail2`,
    defaultMessage: 'en ce moment',
  },
  searchRestaurant: {
    id: `${scope}.section.search.restaurant`,
    defaultMessage: 'Trouvez un restaurant',
  },
});
