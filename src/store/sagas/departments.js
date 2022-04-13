import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import {
  createDepartment,
  editDepartment,
  getAllListDepartment,
  getListDepartment
} from "../../services/departments";
import {
  getAllDepartmentsSuccess, getDepartmentsSuccess, postDepartmentSuccess,
  putDepartmentSuccess
} from "../actions/departments";
import * as type from "../actionTypes/departments";

function* getDepartments(action) {
  try {
    const respone = yield call(getListDepartment, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess();
      yield put(getDepartmentsSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { status } = e.respone;
    action.onError(status, e.message);
  }
}

function* getAllDepartments(action) {
  try {
    const respone = yield call(getAllListDepartment);
    const { data } = respone;
    if (data.code === status_.OK) {
      yield put(getAllDepartmentsSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { status } = e.respone;
    action.onError(status, e.message);
  }
}

function* postDepartment(action) {
  try {
    const respone = yield call(createDepartment, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      yield put(postDepartmentSuccess(data.data));
      action.onSuccess();
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { data } = e.respone;
    action.onError(data.code, e.message);
  }
}

function* putDepartment(action) {
  try {
    const respone = yield call(editDepartment, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      yield put(putDepartmentSuccess(data.data));
      action.onSuccess();
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}

function* rootDepartments() {
  yield takeLatest(type.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(type.GET_ALL_DEPARTMENT, getAllDepartments);
  yield takeLatest(type.POST_DEPARTMENT, postDepartment);
  yield takeLatest(type.PUT_DEPARTMENT, putDepartment);
}

export default rootDepartments;
