import { call, put, takeLatest } from "redux-saga/effects";
import { forgotAuth } from "../../services/forgotAuth";
import { postEmailSuccess } from "../actions/forgotAuth";
import { POST_EMAIL_FORGOT } from "../actionTypes/forgotAuth";
import * as status_ from "../../config/status";


function* postEmail(action) {
    try {
        const response = yield call(forgotAuth, action.payload);
        const { data, status } = response;
        if (status === status_.OK) {
            yield put(postEmailSuccess(data.data));
            action.onSuccess("Reset Email is send successfully, please check your mail");
        } else {
            action.onError(data.message);
        }
    } catch (e) {
        action.onError(e.message);
    }
}


function* rootForgot() {
    yield takeLatest(POST_EMAIL_FORGOT, postEmail);
}

export default rootForgot;
