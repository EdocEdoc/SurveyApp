import {
  CLEAR_DATA,
  GOING_ADMIN_STATE,
  ONLINE_STATE_CHANGE,
} from "../constants";

const initialState = {
  isOnline: false,
  goingAdmin: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONLINE_STATE_CHANGE:
      return {
        ...state,
        isOnline: action.payload,
      };
    case GOING_ADMIN_STATE:
      return {
        ...state,
        goingAdmin: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
