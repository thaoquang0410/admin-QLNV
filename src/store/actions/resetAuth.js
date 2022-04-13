import * as type from '../actionTypes/resetAuth';

const postEmailReset = (data, onSuccess, onError) => {
    return {
        type: type.POST_EMAIL_RESET,
        payload: data,
        onSuccess,
        onError
    }
}

const postEmailSuccess = (data, onSuccess, onError) => {
    return {
        type: type.POST_EMAIL_RESET_SUCCESS,
        payload: data,
        onSuccess,
        onError
    }
}


export { postEmailReset, postEmailSuccess }
