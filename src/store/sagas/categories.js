import { call, put, takeLatest } from "redux-saga/effects";
import * as status_ from "../../config/status";
import {
  createCategory,
  editCategory,
  getAllCategory,
  getListCategory
} from "../../services/categories";
import {
  getAllCategoriesSuccess,
  getCategoriesSuccess,
  postCategorySuccess,
  putCategorySuccess
} from "../actions/categories";
import * as type from "../actionTypes/categories";

function* getCategories(action) {
  try {
    const respone = yield call(getListCategory, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess();
      yield put(getCategoriesSuccess(data.data));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { status } = e.respone;
    action.onError(status, e.message);
  }
}

function* getAllCategories(action) {
  try {
    const respone = yield call(getAllCategory, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      yield put(getAllCategoriesSuccess(data.data));
      action.onSuccess();
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}

function* postCategory(action) {
  try {
    const respone = yield call(createCategory, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess();
      yield put(postCategorySuccess(data.Category));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    action.onError(e.code, e.message);
  }
}

function* putCategory(action) {
  try {
    const respone = yield call(editCategory, action.payload);
    const { data } = respone;
    if (data.code === status_.OK) {
      action.onSuccess();
      yield put(putCategorySuccess(data.Category));
    } else {
      action.onError(data.code, data.message);
    }
  } catch (e) {
    const { status } = e.respone;
    action.onError(status, e.message);
  }
}

function* rootCategories() {
  yield takeLatest(type.GET_CATEGORIES, getCategories);
  yield takeLatest(type.POST_CATEGORY, postCategory);
  yield takeLatest(type.PUT_CATEGORY, putCategory);
  yield takeLatest(type.GET_ALL_CATEGORIES, getAllCategories);
}

export default rootCategories;
