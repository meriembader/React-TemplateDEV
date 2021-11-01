import { defineMessages } from 'react-intl';

export const scope = 'app.containers.restaurants';

export default defineMessages({
  bannerTitle: {
    id: `banner.title`,
    defaultMessage: "Réservez le meilleur restaurant et commandez à l'avance.",
  },
  specialOfferTitle: {
    id: `special.offer.title`,
    defaultMessage: 'Offres Spéciales',
  },
  restaurantsLabel: {
    id: `restaurants.search.restaurant.label`,
    defaultMessage: 'restaurants',
  },
  restaurantReservationTitle: {
    id: `restaurants.category.reservation`,
    defaultMessage: 'Réservez une table',
  },
  restaurantLivraisonTitle: {
    id: `restaurants.category.livraison`,
    defaultMessage: 'Réservez une table',
  },
  restaurantNewTitle: {
    id: `restaurants.category.new`,
    defaultMessage: 'Nouveau restaurant',
  },
  nearbyRestaurantsTitle: {
    id: 'restaurants.category.nearby',
    defineMessages: 'Populaires à proximité',
  },
  mapFilter2: {
    id: 'restaurants.map.filter2',
    defineMessages: 'Diététique',
  },
});
