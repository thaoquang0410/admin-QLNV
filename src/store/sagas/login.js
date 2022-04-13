import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import { setUpToken } from "../../helpers/api";
import { login, loginGoogle, logoutAcc } from "../../services/login";
import { getAccountSuccess } from "../actions/common";
import { LOGOUT, POST_EMAIL, POST_EMAIL_GOOGLE } from "../actionTypes/login";

function* postEmail(action) {
  try {
    const respone = yield call(login, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      setUpToken(data.data.access_token);
      yield put(getAccountSuccess(data.data.user));
      action.onSuccess("Đăng nhập thành công");
    } else {
      action.onError(
        "Đăng nhập thất bại vui lòng xem lại tài khoản hoặc mật khẩu"
      );
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* postGoogle(action) {
  try {
    const respone = yield call(loginGoogle, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      setUpToken(data.data.access_token);
      yield put(getAccountSuccess(data.data.user));
      action.onSuccess("Đăng nhập thành công");
    } else {
      action.onError(
        "Đăng nhập thất bại vui lòng xem lại tài khoản hoặc mật khẩu"
      );
    }
  } catch (e) {
    action.onError(e.message);
  }
}

function* logout(action) {
  try {
    const respone = yield call(logoutAcc);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess(data.message);
    } 
  } catch (e) {
  }
}

function* rootLogin() {
  yield takeLatest(POST_EMAIL, postEmail);
  yield takeLatest(POST_EMAIL_GOOGLE, postGoogle);
  yield takeLatest(LOGOUT, logout);
}

export default rootLogin;
