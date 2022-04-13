import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import { resetAuth } from "../../services/resetAuth";
import { postEmailSuccess } from "../actions/resetAuth";
import { POST_EMAIL_RESET } from "../actionTypes/resetAuth";


function* postEmail(action) {
    try {
        const respone = yield call(resetAuth, action.payload);
        const { data } = respone;
        if (data.code === status_.OK) {
            yield put(postEmailSuccess(data.data));
            action.onSuccess(data.message)
        } else {
            action.onError(data.message);
        }
    } catch (e) {
        const { status } = e.respone;
        action.onError(status, e.message);
    }
}


function* rootReset() {
    yield takeLatest(POST_EMAIL_RESET, postEmail);
}

export default rootReset;
