import * as type from '../actionTypes/forgotAuth';

const postEmailForgot = (data, onSuccess, onError) => {
    return {
        type: type.POST_EMAIL_FORGOT,
        payload: data,
        onSuccess,
        onError
    }
}

const postEmailSuccess = (data, onSuccess, onError) => {
    return {
        type: type.POST_EMAIL_FORGOT_SUCCESS,
        payload: data,

    }
}


export { postEmailForgot, postEmailSuccess }
