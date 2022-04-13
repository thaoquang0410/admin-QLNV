import { all, call } from 'redux-saga/effects';
import rootCategories from './categories';
import rootDepartments from './departments';
import rootLogin from './login';
import rootForgot from './forgotAuth';
import rootReset from './resetAuth';
import rootRequests from './requests';
import rootUsers from './users';
import rootComments from './comments';
import rootCommon from './common';


export default function* rootSaga() {
    yield all([
        call(rootLogin),
        call(rootUsers),
        call(rootForgot),
        call(rootReset),
        call(rootCategories),
        call(rootDepartments),
        call(rootRequests),
        call(rootComments),
        call(rootCommon)
    ])
}