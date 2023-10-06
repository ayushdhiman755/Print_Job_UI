const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        userDetails: null,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        isFetching: false,
        userDetails: action.payload.userDetails,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "SET_DETAILS":
      return {
        ...state,
        isFetching: false,
        userDetails: action.payload.userDetails,
        error: false,
      };
    case "RESET_USER": {
      return {
        user: null,
        isFetching: false,
        error: false,
        userDetails: null,
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
