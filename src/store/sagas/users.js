import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import { createUser, editUser, getAllAdmin, getLisRole, getListUser } from "../../services/users";
import { getAllAdminSuccess, getAllAuthorSuccess, getRolesSuccess, getUsersSuccess, postUserSuccess, putUserSuccess } from "../actions/users";
import * as type from "../actionTypes/users";


function* getUsers(action) {
    try {
        const respone = yield call(getListUser, action.payload);
        const { data } = respone;
        if (data.code === status_.OK) {
            yield put(getUsersSuccess(data.data));
            action.onSuccess();
        }
        else {
            action.onError(data.code, data.message);
        }
    } catch (e) {
        const { status } = e.respone;
        action.onError(status, e.message);
    }
}

function* getAllAd(action) {
    try {
        const respone = yield call(getAllAdmin);
        const { data } = respone;
        if (data.code === status_.OK) {
            yield put(getAllAdminSuccess(data.data));
            action.onSuccess();
        }
        else {
            action.onError(data.code, data.message);
        }
    } catch (e) {
        const { status } = e.respone;
        action.onError(status, e.message);
    }
}

function* getAllAu(action) {
    try {
        const respone = yield call(getListUser,{page: "",keyword: "", department: "" },true);
        const { data } = respone;
        if (data.code === status_.OK) {
            yield put(getAllAuthorSuccess(data.data));
            action.onSuccess();
        }
        else {
            action.onError(data.code, data.message);
        }
    } catch (e) {
        action.onError(e.code, e.message);
    }
}

function* postUser(action) {
    try {
        const respone = yield call(createUser, action.payload);
        const { data } = respone;
        if (data.code === status_.OK) {
            action.onSuccess();
            yield put(postUserSuccess(data.data));
        }
        else {
            action.onError(data.code, data.message);
        }
    } catch (e) {
        const { status } = e.respone;
        action.onError(status, e.message);
    }
}

function* putUser(action) {
    try {
        const respone = yield call(editUser, action.payload);
        const { data } = respone;
        if (data.code === status_.OK) {
            action.onSuccess();
            yield put(putUserSuccess(data.data));
        }
        else {
            action.onError(data.code, data.message);
        }
    } catch (e) {
        const { status } = e.respone;
        action.onError(status, e.message);
    }
}

function* getRoles(action) {
    try {
        const respone = yield call(getLisRole);
        const { data } = respone;
        if (data.code === status_.OK) {
            yield put(getRolesSuccess(data.data));
            action.onSuccess(data.message);
        }
        else {
            action.onError(data.code, data.message);
        }
    } catch (e) {
        action.onError(e.message);
    }
}


function* rootUsers() {
    yield takeLatest(type.GET_USERS, getUsers);
    yield takeLatest(type.POST_USER, postUser);
    yield takeLatest(type.PUT_USER, putUser);
    yield takeLatest(type.GET_ROLES, getRoles);
    yield takeLatest(type.GET_ALL_ADMIN, getAllAd);
    yield takeLatest(type.GET_ALL_AUTHOR, getAllAu);
}

export default rootUsers;
