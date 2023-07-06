import { accountReducer } from "./reducers/account";
import { combineReducers } from "redux";
import { appReducer } from "./reducers/app";

const Reducers = combineReducers({
  accountState: accountReducer,
  appState: appReducer,
});

export default Reducers;
