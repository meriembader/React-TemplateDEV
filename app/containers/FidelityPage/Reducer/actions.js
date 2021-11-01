import {change} from 'redux-form';


export const GET_PROMO_LIST = 'profile/GET_PROMO_LIST';
export const GET_PROMO_LIST_SUCCESS = 'profile/GET_PROMO_LIST_SUCCESS';
export const GET_PROMO_LIST_ERROR = 'profile/GET_PROMO_LIST_ERROR';

export function getPromotions() {
  return {
    types: [
      GET_PROMO_LIST,
      GET_PROMO_LIST_SUCCESS,
      GET_PROMO_LIST_ERROR,
    ],
    promise: client => client.get('/promoCode/list')
  };
}
