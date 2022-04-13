import * as type from "../actionTypes/comments";

const getComments = (data, onSuccess, onError) => {
  return {
    type: type.GET_COMMENT,
    payload: data,
    onSuccess,
    onError,
  };
};

const getCommentsSuccess = (data) => {
  return {
    type: type.GET_COMMENT_SUCCESS,
    payload: data,
  };
};

const postComment = (data, onSuccess, onError) => {
  return {
    type: type.POST_COMMENT,
    payload: data,
    onSuccess,
    onError,
  };
};

const postCommentsSuccess = (data) => {
  return {
    type: type.POST_COMMENT_SUCCESS,
    payload: data,
  };
};

const getHistories = (data, onSuccess, onError) => {
  return {
    type: type.GET_HISTORY,
    payload: data,
    onSuccess,
    onError,
  };
};

const getHistoriesSuccess = (data) => {
  return {
    type: type.GET_HISTORY_SUCCESS,
    payload: data,
  };
};

export {
  getComments,
  getCommentsSuccess,
  postComment,
  postCommentsSuccess,
  getHistories,
  getHistoriesSuccess,
};
