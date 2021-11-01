import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Landing';

export default defineMessages({
  login: {
    id: `common.login.title`,
    defaultMessage: 'Se connecter',
  },
  downloadApp: {
    id: `common.download.app`,
    defaultMessage: "Téléchargez l'application",
  },
  searchPlaceholder: {
    id: `common.search.placeholder`,
    defaultMessage: 'Saisissez une ville ou un restaurant',
  },
  bannerTitle: {
    id: `banner.title`,
    defaultMessage: "Réservez le meilleur restaurant et commandez à l'avance.",
  },
  searchTitle: {
    id: `common.input.searchTitle`,
    defaultMessage: 'Saisissez une ville ou un restaurant',
  },
  howItWorks: {
    id: `common.how.works`,
    defaultMessage: 'Comment fonctionne Mydish',
  },
  seeMore: {
    id: `common.category.seeMore`,
    defaultMessage: 'Voir plus',
  },
  desc1: {
    id: `common.how.works.desc1`,
    defaultMessage: 'Consultez les menus des restaurants près de chez vous.',
  },
  desc2: {
    id: `common.how.works.desc2`,
    defaultMessage:
      "Commandez à l'avance pour la livraison ou réservez une table.",
  },
  desc3: {
    id: `common.how.works.desc3`,
    defaultMessage: 'Gagnez du temps et profitez des offres à chaque commande.',
  },
});
