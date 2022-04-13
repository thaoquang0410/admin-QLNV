import * as type from "../actionTypes/common";

const initState = {
  displayColumnAuthor: true,
  isLoading: false,
  account: {},
};

const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case type.HIDE_COLUMN_AUTHOR:
      return {
        ...state,
        displayColumnAuthor: false,
      };
    case type.DISPLAY_COLUMN_AUTHOR:
      return {
        ...state,
        displayColumnAuthor: true,
      };
    case type.LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case type.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case type.GET_INFO_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: {...action.payload}
      };
    default:
      return state;
  }
};

export default commonReducer;
