export const ADD_MENU = 'cart/ADD_MENU';
export const REMOVE_MENU = 'cart/REMOVE_MENU';
export const INCREMENT_MENU = 'cart/INCREMENT_MENU';
export const DECREMENT_MENU = 'cart/DECREMENT_MENU';
export const ADD_RESERVATION_OPTIONS = 'cart/ADD_RESERVATION_OPTIONS';

export function addMenu(menu = {}, quantity, consigne, restaurantData = {}, userId) {
  return {
    type: ADD_MENU,
    menu,
    quantity,
    restaurantData,
    userId,
    consigne,
  };
}

export function validateReservationOptions(reservationDate, reservationTime, invitedNbr, offer, restaurant, reservationData) {
  return {
    type: ADD_RESERVATION_OPTIONS,
    reservationDate,
    reservationTime,
    invitedNbr,
    offer,
    restaurant,
    reservationData,
  };
}

export function incrementMenu(menu, quantity = 1) {
  return {
    type: INCREMENT_MENU,
    menu,
    quantity,
  };
}

export function decrementMenu(menu, quantity = 1) {
  return {
    type: DECREMENT_MENU,
    menu,
    quantity,
  };
}

export function removeMenu(menu) {
  return {
    type: REMOVE_MENU,
    menu,
  };
}
