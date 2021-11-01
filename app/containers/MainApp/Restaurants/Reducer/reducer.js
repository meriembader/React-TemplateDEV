import produce from 'immer';
import {
  LOAD_RESTAURANTS,
  LOAD_RESTAURANTS_SUCCESS,
  LOAD_RESTAURANTS_ERROR, LOAD_RESTAURANTS_SORT,
} from '../constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  restaurants: [],
  pagination: {},
  filter: null,
};

/* eslint-disable default-case, no-param-reassign */
const restaurantsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_RESTAURANTS:
        draft.loading = true;
        draft.error = false;
        draft.filter = action.filter;
        break;

      case LOAD_RESTAURANTS_SUCCESS:
        const { docs, ...pagination } = action.data;
        draft.loading = false;
        draft.restaurants = docs;
        draft.filter = action.filter;
        draft.pagination = pagination;
        break;

      case LOAD_RESTAURANTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOAD_RESTAURANTS_SORT:
        draft.loading = true;
        draft.restaurants = action.restaurants;
        break;
    }
  });

export default restaurantsReducer;
