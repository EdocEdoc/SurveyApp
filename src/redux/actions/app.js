import { GOING_ADMIN_STATE, ONLINE_STATE_CHANGE } from "../constants";

export const SET_ONLINE = (receivedData) => async (dispatch) => {
  try {
    await dispatch({ type: ONLINE_STATE_CHANGE, payload: receivedData });
  } catch (error) {}
};

export const GOTO_ADMIN = (receivedData) => async (dispatch) => {
  try {
    await dispatch({ type: GOING_ADMIN_STATE, payload: receivedData });
  } catch (error) {}
};
