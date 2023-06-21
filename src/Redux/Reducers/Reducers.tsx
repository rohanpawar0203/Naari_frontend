const initData = {
    Agotime: "",
    userData: {},
    profileData: {
      userExist: true,
    },
    postData: [],
    commentData: [],
    loggedInUser: true,
  };
  
  export const Reducer = (storeData = initData, action: any) => {
    switch (action.type) {
      case "loginData": {
        return {
          ...storeData,
          loggedInUser: action.payload,
        };
      }
      default: {
        return storeData;
      }
    }
  };
  