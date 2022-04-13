import * as type from "../actionTypes/requests";

const getListRequests = (filter, onSuccess, onError) => {
    return {
        type: type.GET_REQUESTS,
        payload: filter,
        onSuccess,
        onError
    };
};

const getRequestsSuccess = (data) => {
    return {
        type: type.GET_REQUESTS_SUCCESS,
        payload: data,
    };
};

const putRequest = (data, onSuccess, onError) => {
    return {
        type: type.PUT_REQUEST,
        payload: data,
        onSuccess,
        onError,
    };
};
const putRequestSuccess = (data) => {
    return {
        type: type.PUT_REQUEST_SUCCESS,
        payload: data
    };
};
const getTotalRequests = (onSuccess, onError) => {
    return {
        type: type.GET_TOTAL_REQUESTS,
        onSuccess,
        onError
    };
};
const getTotalRequestsSuccess = (data) => {
    return {
        type: type.GET_TOTAL_REQUESTS_SUCCESS,
        payload: data
    };
};
const postRequest = (data, onSuccess, onError) => {
    return {
        type: type.POST_REQUEST,
        payload: data,
        onSuccess,
        onError,
    };
};
const postRequestSuccess = (data) => {
    return {
        type: type.POST_REQUEST_SUCCESS,
        payload: data
    };
};

const deleteRequest = (data, onSuccess, onError) => {
    return {
        type: type.DELETE_REQUEST,
        payload: data,
        onSuccess,
        onError,
    };
};


export {
    getListRequests,
    getRequestsSuccess,
    putRequest,
    postRequest,
    deleteRequest,
    putRequestSuccess,
    postRequestSuccess,
    getTotalRequests,
    getTotalRequestsSuccess,
};
