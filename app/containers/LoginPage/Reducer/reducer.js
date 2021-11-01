import produce from 'immer';
import * as C from '../constants';

// The initial state of the App
export const initialState = { firstName: '' };

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case C.LOGIN_USER_SUCCESS:
        sessionStorage.setItem('firstName', action.data.user.firstName);
        sessionStorage.setItem('userId', action.data.user._id);
        sessionStorage.setItem('phone', action.data.user.phone);
        sessionStorage.setItem('userTofUri', action.data.user.tofUri);
        sessionStorage.setItem('myDish-token', action.data.token);
        break;
    }
  });

export default userReducer;
