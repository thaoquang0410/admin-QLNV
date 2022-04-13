import { call, put, takeLatest } from "redux-saga/effects";
import * as status from "../../config/status";
import {
  createRequest,
  editRequest,
  getListRequest,
  removeRequest,
  getTotalRequest
} from "../../services/requests";
import {
  getRequestsSuccess, postRequestSuccess, putRequestSuccess, getTotalRequestsSuccess
} from "../actions/requests";
import * as type from "../actionTypes/requests";

function* getRequests(action) {
  try {
    const respone = yield call(getListRequest, action.payload);
    const { data } = respone;
    if (data.code === status.OK) {
      action.onSuccess();
      yield put(getRequestsSuccess(data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}

function* postRequest(action) {
  try {
    const respone = yield call(createRequest, action.payload);
    const { data } = respone;
    if (data.code === status.OK) {
      action.onSuccess(data.message);
      yield put(postRequestSuccess(data.data));
    } else {
      action.onError(data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}
function* gettotalRequests(action) {
  try {
    const respone = yield call(getTotalRequest);
    const { data } = respone;
    if (data.code === status.OK) {
      action.onSuccess();
      yield put(getTotalRequestsSuccess(data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}
function* putRequest(action) {
  try {
    const respone = yield call(editRequest, action.payload);
    const { data } = respone;
    if (data.code === status.OK) {
      action.onSuccess("Update dữ liệu thành công");
      yield put(putRequestSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}

function* deleteRequest(action) {
  try {
    const respone = yield call(removeRequest, action.payload);
    const { data } = respone;
    if (data.code === status.OK) {
      action.onSuccess();
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { status } = e.response;
    action.onError(status, e.message);
  }
}

function* rootRequests() {
  yield takeLatest(type.GET_REQUESTS, getRequests);
  yield takeLatest(type.POST_REQUEST, postRequest);
  yield takeLatest(type.PUT_REQUEST, putRequest);
  yield takeLatest(type.DELETE_REQUEST, deleteRequest);
  yield takeLatest(type.GET_TOTAL_REQUESTS, gettotalRequests);
}

export default rootRequests;
