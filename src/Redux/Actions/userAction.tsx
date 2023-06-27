import { IUser } from "../../pages/Login/Login";

export interface UserActionTypes {
  type: string;
  payload: IUser;
}
export const userAction = (
  data: IUser,
  dispatch: React.Dispatch<UserActionTypes>
) => {
  dispatch({
    type: "usersData",
    payload: data,
  });
};
