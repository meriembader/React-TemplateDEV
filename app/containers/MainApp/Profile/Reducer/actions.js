import * as c from '../constants';
import {change} from 'redux-form';


export function getFavoriteRestaurants() {
  return {
    types: [
      c.GET_FAVORITE_RESTAURANTS,
      c.GET_FAVORITE_RESTAURANTS_SUCCESS,
      c.GET_FAVORITE_RESTAURANTS_ERROR,
    ],
    promise: client => client.get('/user/bookmarks'),
  };
}

export function getProfile(id) {
  return {
    types: [c.GET_PROFILE, c.GET_PROFILE_SUCCESS, c.GET_PROFILE_ERROR],
    promise: client => client.get('/user/profile?id='+id),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change('ProfileForm', 'user', result.data.data));
      dispatch(change('ProfileForm', 'submitSuccess', false));
    }
  };
}

export function addFavoriteToUser(id) {
  return {
    types: [
      c.ADD_FAVORITE_TO_USER,
      c.ADD_FAVORITE_TO_USER_SUCCESS,
      c.ADD_FAVORITE_TO_USER_ERROR,
    ],
    promise: client => client.post(`/Restaurants/bookmark/${id}`),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change('profile', 'unbookmarkedRestaurantsIds', []));
    },
  };
}

export function deleteFavoriteUser(id, order) {
  return {
    types: [
      c.DELETE_FAVORITE_USER,
      c.DELETE_FAVORITE_USER_SUCCESS,
      c.DELETE_FAVORITE_USER_ERROR,
    ],
    promise: client => client.post(`/Restaurants/unbookmark/${id}`),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change('profile', 'unbookmarkedRestaurantsIds', [id]));

    },
  };
}

export function getOpinionsUser() {
  return {
    types: [
      c.GET_OPINIONS_USER,
      c.GET_OPINIONS_USER_SUCCESS,
      c.GET_OPINIONS_USER_ERROR,
    ],
    promise: client => client.get('/user/ratings'),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change('comment', 'deletedSuccess', false));
    }
  };
}

export function removeOpinionsUser(ratingId) {
  return {
    types: [
      c.DELETE_OPINIONS_USER,
      c.DELETE_OPINIONS_USER_SUCCESS,
      c.DELETE_OPINIONS_USER_ERROR,
    ],
    promise: client => client.delete(`/user/ratings/${ratingId}`),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change('comment', 'deletedSuccess', true));
      dispatch(getOpinionsUser());
    }
  };
}

export function updateOpinionsUser(data) {
  return {
    types: [
      c.DELETE_OPINIONS_USER,
      c.DELETE_OPINIONS_USER_SUCCESS,
      c.DELETE_OPINIONS_USER_ERROR,
    ],
    promise: client => client.put(`/user/ratings/${data._id}`, data),
    afterSuccess: (dispatch, getState, result) => {
    }
  };
}

export function insertOpinionsUser(data) {
  return {
    types: [
      c.ADD_OPINIONS_USER,
      c.ADD_OPINIONS_USER_SUCCESS,
      c.ADD_OPINIONS_USER_ERROR,
    ],
    promise: client => client.put(`/user/ratings`, data),
    afterSuccess: (dispatch, getState, result) => {
    }
  };
}

export function refreshOpinionsUser(data) {
  return {
    type: c.UPDATE_OPINIONS,
    data
  };
}

export function updateFormProfile(isDisabled) {
  return {
    type: c.UPDATE_FORM_PROFILE,
    isDisabled
  };
}

export function getReservationsUser() {
  return {
    types: [
      c.GET_RESERVATIONS_USER,
      c.GET_RESERVATIONS_USER_SUCCESS,
      c.GET_RESERVATIONS_USER_ERROR,
    ],
    promise: client =>
      client.post('/orders/list', {
        orderType: 'Réservation',
      }),
  };
}

export function UpdateProfile(id, data) {
  return {
    types: [c.UPDATE_PROFILE, c.UPDATE_PROFILE_SUCCESS, c.UPDATE_PROFILE_ERROR],
    promise: client => client.put('/user/profile?id='+id, data),
    afterSuccess: (dispatch, getState, result) => {
      dispatch(change('ProfileForm', 'submitSuccess', true));
    }
  };
}
