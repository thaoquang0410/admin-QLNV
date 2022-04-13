import * as type from '../actionTypes/login';

const postEmail = (data, onSuccess, onError) => {
    return {
        type: type.POST_EMAIL,
        payload: data,
        onSuccess,
        onError
    }
}

const postEmailSuccess = (data) => {
    return {
        type: type.POST_EMAIL_SUCCESS,
        payload: data
    }
}

const postEmailGoogle = (data, onSuccess, onError) => {
    return {
        type: type.POST_EMAIL_GOOGLE,
        payload: data,
        onSuccess,
        onError
    }
}
const postEmailGoogleSuccess = (data) => {
    return {
        type: type.POST_EMAIL_GOOGLE_SUCCESS,
        payload: data,

    }
}

const logout = (onSuccess) => {
    return {
        type: type.LOGOUT,
        onSuccess
    }
}
export { postEmail, postEmailSuccess, postEmailGoogle, postEmailGoogleSuccess, logout }