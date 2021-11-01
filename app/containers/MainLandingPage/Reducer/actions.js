import {
  LOAD_RESTAURANTS_BY_CATEGORIES,
  LOAD_RESTAURANTS_BY_CATEGORIES_ERROR,
  LOAD_RESTAURANTS_BY_CATEGORIES_SUCCESS,
  UPDATE_RESTAURANTS,
} from '../constants';

export function loadRestaurantsByCategories() {
  return {
    type: LOAD_RESTAURANTS_BY_CATEGORIES,
  };
}

export function loadRestaurantsByCategories2() {
  return {
    types: [
      LOAD_RESTAURANTS_BY_CATEGORIES,
      LOAD_RESTAURANTS_BY_CATEGORIES_SUCCESS,
      LOAD_RESTAURANTS_BY_CATEGORIES_ERROR,
    ],
    promise: client => client.get('/restaurants/categories/list'),
  };
}

export function restaurantsLoaded(restaurants, categories) {
  return {
    type: LOAD_RESTAURANTS_BY_CATEGORIES_SUCCESS,
    restaurants,
    categories,
  };
}

export function restaurantsLoadingError(error) {
  return {
    type: LOAD_RESTAURANTS_BY_CATEGORIES_ERROR,
    error,
  };
}
export function updateRestaurants(id, typeCateg, isFavorite) {
  return {
    type: UPDATE_RESTAURANTS,
    id,
    typeCateg,
    isFavorite,
  };
}
