import {
  LOAD_RESTAURANT_DETAILS,
  LOAD_RESTAURANT_DETAILS_ERROR,
  LOAD_RESTAURANT_DETAILS_SUCCESS,
} from '../constants';

export function loadRestaurantDetails(
  restaurantId
) {
  return {
    types: [
      LOAD_RESTAURANT_DETAILS,
      LOAD_RESTAURANT_DETAILS_SUCCESS,
      LOAD_RESTAURANT_DETAILS_ERROR,
    ],
    promise: client => client.get(`/restaurants/${restaurantId}`),
  };
}
