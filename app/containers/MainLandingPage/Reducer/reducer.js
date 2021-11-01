import produce from 'immer';
import Immutable from 'seamless-immutable';
import {
  LOAD_RESTAURANTS_BY_CATEGORIES,
  LOAD_RESTAURANTS_BY_CATEGORIES_SUCCESS,
  LOAD_RESTAURANTS_BY_CATEGORIES_ERROR,
  UPDATE_RESTAURANTS,
} from '../constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  restaurants: [],
};

/* eslint-disable default-case, no-param-reassign */
const landingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_RESTAURANTS_BY_CATEGORIES:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_RESTAURANTS_BY_CATEGORIES_SUCCESS:
        draft.loading = false;
        draft.restaurants = action.data;
        break;

      case UPDATE_RESTAURANTS:
        // eslint-disable-next-line no-case-declarations
        const restaurants = Immutable.asMutable(state.restaurants, {
          deep: true,
        });
        const restaurantsByCateg =
          restaurants &&
          restaurants[action.typeCateg].map(el => {
            // eslint-disable-next-line no-underscore-dangle
            if (el._id === action.id) {
              el.isFavorite = action.isFavorite;
            }
            return el;
          });
        draft.restaurants[action.typeCateg] = restaurantsByCateg;
        break;

      case LOAD_RESTAURANTS_BY_CATEGORIES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default landingReducer;
