import * as type from "../actionTypes/common";

const hideAuthor = () => ({ type: type.HIDE_COLUMN_AUTHOR });
const displayAuthor = () => ({ type: type.DISPLAY_COLUMN_AUTHOR });

const loading = () => ({ type: type.LOADING });
const loadSuccess = () => ({ type: type.LOAD_SUCCESS });

const getAccount = (onError) => ({type: type.GET_INFO_ACCOUNT, onError});
const getAccountSuccess = (data) => {
  return {
    type: type.GET_INFO_ACCOUNT_SUCCESS,
    payload: data
  }
}

export { hideAuthor, displayAuthor, loading, loadSuccess, getAccount, getAccountSuccess };
