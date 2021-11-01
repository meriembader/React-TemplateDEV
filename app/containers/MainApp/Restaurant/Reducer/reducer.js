import produce from 'immer';
import {
  LOAD_RESTAURANT_DETAILS,
  LOAD_RESTAURANT_DETAILS_SUCCESS,
  LOAD_RESTAURANT_DETAILS_ERROR,
} from '../constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  restaurant: {},
  products: {},
};

/* eslint-disable default-case, no-param-reassign */
const restaurantReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_RESTAURANT_DETAILS:
        draft.loading = true;
        draft.error = false;
        break;

      case LOAD_RESTAURANT_DETAILS_SUCCESS:
        // eslint-disable-next-line no-case-declarations
        const { menus, ...restaurant } = action.data;
        const menuPerCategory = {
          DESSERT: [],
          PLAT: [],
          BOISSON: [],
          ENTREE: [],
        };

        menus.forEach(el => {
          menuPerCategory[el.category] && menuPerCategory[el.category].push(el);
        });
        draft.loading = false;
        draft.restaurant = restaurant;
        draft.products = menuPerCategory;
        break;

      case LOAD_RESTAURANT_DETAILS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default restaurantReducer;
