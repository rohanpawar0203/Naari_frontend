import { Dispatch, Action } from "redux";

export const loginAction = (data: Boolean, dispatch: Dispatch<Action>) => {
  dispatch({
    type: "loginData",
    payload: data,
  });
};
