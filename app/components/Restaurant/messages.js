/*
 * RestaurantCard Messages
 *
 * This contains all the text for the RestaurantCard container.
 */
import { defineMessages } from 'react-intl';
import {IcoRxCasher, IcoRxHalel, IcoRxVegan} from "../lib/BsCustomerIcon/BsGenerateIcon";

export const scope = 'app.components.RestaurantCard';

export default defineMessages({
  averagePrice: {
    id: `${scope}.average.price`,
    defaultMessage: 'Prix moyen',
  },
  reduction:{
    id: `${scope}.reduction`,
    defaultMessage: 'Réduction',
  },
  deliveryFees: {
    id: `${scope}.delivery.fees`,
    defaultMessage: 'Frais de livraison',
  },
  nofavoris: {
    id: `${scope}.section.nfavorisTitle`,
    defaultMessage: 'Aucun favoris',
  },
  nofavorisD: {
    id: `${scope}.detail.nfavoris2`,
    defaultMessage: 'Vos meilleurs restaurants apparatront ici',
  },
  searchRestaurant2: {
    id: `${scope}.search2.restaurant`,
    defaultMessage: 'Trouvez un restaurant',
  },
  discountRestaurant: {
    id: `${scope}.discount.restaurant`,
    defaultMessage: '25% de Réduction',
  },
  filterPriceTitle: {
    id: `${scope}.filter.price.title`,
    defaultMessage: 'Prix',
  },
  filterDieteticTitle: {
    id: `${scope}.filter.dietetic.title`,
    defaultMessage: 'Diététique',
  },
  filterGlutenItem: {
    id: `${scope}.filter.dietetic.gluten.item`,
    defaultMessage: 'Gluten',
  },
  filterVegetarienItem: {
    id: `${scope}.filter.dietetic.Vegetarien.item`,
    defaultMessage: 'Végétarien',
  },
  filterHalelItem: {
    id: `${scope}.filter.Dietetic.Halel.item`,
    defaultMessage: 'Halel',
  },
  filterVeganItem: {
    id: `${scope}.filter.Dietetic.Vegan.item`,
    defaultMessage: 'Vegan',
  },
  filterCasherItem: {
    id: `${scope}.filter.Dietetic.Casher.item`,
    defaultMessage: 'Casher',
  },
  filterSortTitle: {
    id: `${scope}.filter.sort.title`,
    defaultMessage: 'Trier par',
  },
  filterSortNearItem: {
    id: `${scope}.filter.near.item`,
    defaultMessage: 'Proches de vous',
  },
  filterSortPopularItem: {
    id: `${scope}.filter.popular.item`,
    defaultMessage: 'Populaires',
  },
  filterSortNoteItem: {
    id: `${scope}.filter.note.item`,
    defaultMessage: 'Notes',
  },
  filterSortDeliveryItem: {
    id: `${scope}.filter.delivery.item`,
    defaultMessage: 'Livraison rapide',
  },
  filterDeleteAll: {
    id: `${scope}.filter.delete`,
    defaultMessage: 'Effacer tout',
  },
});
