import produce from 'immer';
import * as C from '../constants';
import * as F from '../../../FidelityPage/Reducer/actions';

// The initial state of the App
export const initialState = {
  favoriteRestaurants: [],
  unbookmarkedRestaurantsIds: [],
  profileData: {},
  opinions: [],
  promoCodes:[],
  reservations: [],
  initialValues: {
    profile: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case C.GET_FAVORITE_RESTAURANTS_SUCCESS:
        draft.favoriteRestaurants = action.data;
        break;

      case C.GET_PROFILE_SUCCESS:
        draft.profileData = action.data;
        draft.initialValues.profile = action.data;
        break;

      case C.GET_OPINIONS_USER_SUCCESS:
        draft.opinions = action.data;
        break;

      case C.UPDATE_OPINIONS:
        draft.opinions = action.data;
        break;
      case C.UPDATE_FORM_PROFILE:
        draft.formProfileDisabled = action.isDisabled;
        break;
      case C.UNBOOKMARK_RESTAURANT:
        draft.unbookmarkedRestaurantsIds = action.data;
        break;

      case F.GET_PROMO_LIST_SUCCESS:
        draft.promoCodes = action.data;
        break;

      case C.GET_RESERVATIONS_USER_SUCCESS:
        draft.reservations = action.data;
        break;
    }
  });

export default profileReducer;
