import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import { getAccount } from "../../services/account";
import { getAccountSuccess } from "../actions/common";
import * as type from "../actionTypes/common";

function* getAcc(action) {
  try {
    const respone = yield call(getAccount);
    const { data } = respone;
    if (data.code === status_.OK) {
      yield put(getAccountSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) { }
}

function* rootCommon() {
  yield takeLatest(type.GET_INFO_ACCOUNT, getAcc);
}

export default rootCommon;
