import produce from 'immer';
import { ADD_MENU, ADD_RESERVATION_OPTIONS, DECREMENT_MENU, INCREMENT_MENU, REMOVE_MENU } from './actions';

const initialState = {
  loading: false,
  error: false,
  order: {
    orderDetails: [],
    subTotal: 0,
    total: 0,
    reduction: 0,
    promoCode: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_MENU:
        draft.order.restaurant = action.restaurantData.restaurant;
        draft.order.restaurantName = action.restaurantData.restaurantName;
        draft.order.restaurantType = action.restaurantData.restaurantType;
        draft.order.orderCreator = action.userId;
        draft.order.consigne = action.consigne;
        draft.order.orderDetails.push({
          menu: action.menu._id,
          name: action.menu.name,
          price: action.menu.price,
          description: action.menu.description,
          quantity: action.quantity,
        });
        draft.order.subTotal = calculateSubTotal(draft.order.orderDetails);
        break;
      case INCREMENT_MENU:
        draft.order.orderDetails.forEach(el => {
          if (el.menu == action.menu) {
            el.quantity += action.quantity;
          }
        });
        draft.order.subTotal = calculateSubTotal(draft.order.orderDetails);
        break;
      case DECREMENT_MENU:
        draft.orderDetails.forEach(el => {
          if (el.menu == action.menu) {
            el.quantity -= action.quantity;
          }
        });
        draft.order.subTotal = calculateSubTotal(draft.order.orderDetails);
        break;
      case ADD_RESERVATION_OPTIONS:
        draft.order.data = action.reservationData;
        draft.order.restaurant = action.restaurant._id;
        draft.order.orderedForDate = action.reservationDate;
        draft.order.orderedForHour = action.reservationTime;
        draft.order.peopleNumber = action.invitedNbr;
        draft.order.offer = action.offer;
        break;
      case REMOVE_MENU:
        draft.order.orderDetails = draft.order.orderDetails.filter(el => el.menu != action.menu.menu);
        draft.order.subTotal = calculateSubTotal(draft.order.orderDetails);
        if (!draft.order.orderDetails.length) {
          draft.order = initialState.order;
        }
    }
  });

const calculateSubTotal = (orderDetails) => {
  return orderDetails.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);
};

export default reducer;
