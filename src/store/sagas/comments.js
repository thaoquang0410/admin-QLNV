import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import { getComments, getHistory, postComment } from "../../services/comments";
import { getCommentsSuccess, getHistoriesSuccess, postCommentsSuccess } from "../actions/comments";
import * as type from "../actionTypes/comments";

function* getListComments(action) {
  try {
    const respone = yield call(getComments, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess();
      yield put(getCommentsSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { data } = e.response;
    action.onError(data.code, data.message);
  }
}

function* addComment(action) {
  try {
    const respone = yield call(postComment, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess(data.message);
      yield put(postCommentsSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}

function* getHistories(action) {
  try {
    const respone = yield call(getHistory, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess();
      yield put(getHistoriesSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}



function* rootComments() {
  yield takeLatest(type.GET_COMMENT, getListComments);
  yield takeLatest(type.POST_COMMENT, addComment);
  yield takeLatest(type.GET_HISTORY, getHistories);
}

export default rootComments;
