const initData = {
  userData: {},
  profileData: {
    userExist: true,
  },
  loggedInUser: false,
};

export const Reducer = (storeData = initData, action: any) => {
  switch (action.type) {
    case "loginData": {
      return {
        ...storeData,
        loggedInUser: action.payload,
      };
    }
    case "usersData": {
      return {
        ...storeData,
        userData: action.payload,
      };
    }
    default: {
      return storeData;
    }
  }
};
