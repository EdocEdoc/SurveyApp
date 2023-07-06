import { ACCOUNT_STATE_CHANGE, CLEAR_DATA } from "../constants";

const initialState = {
  currentAccount: null,
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNT_STATE_CHANGE:
      return {
        ...state,
        currentAccount: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};
