import * as type from "../actionTypes/departments";

const getListDepartments = (filter, onSuccess, onError) => {
    return {
        type: type.GET_DEPARTMENTS,
        payload: filter,
        onSuccess,
        onError
    };
};

const getAllListDepartments = (onSuccess, onError) => {
    return {
        type: type.GET_ALL_DEPARTMENT,
        onSuccess,
        onError
    };
};

const getAllDepartmentsSuccess = (data) => {
    return {
        type: type.GET_ALL_DEPARTMENT_SUCCESS,
        payload: data,
    };
};

const getDepartmentsSuccess = (data) => {
    return {
        type: type.GET_DEPARTMENTS_SUCCESS,
        payload: data,
    };
};

const putDepartment = (data,onSuccess, onError) => {
    return {
        type: type.PUT_DEPARTMENT,
        payload: data,
        onSuccess,
        onError,
    };
};

const putDepartmentSuccess = (data) => {
    return {
        type: type.PUT_DEPARTMENT_SUCCESS,
        payload: data,
    };
};

const postDepartmentSuccess = (data) => {
    return {
        type: type.POST_DEPARTMENT_SUCCESS,
        payload: data,
    };
};

const postDepartment = (data, onSuccess, onError) => {
    return {
        type: type.POST_DEPARTMENT,
        payload: data,
        onSuccess,
        onError,
    };
};

export {
    getListDepartments,
    getDepartmentsSuccess,
    putDepartment,
    postDepartment,
    getAllListDepartments,
    getAllDepartmentsSuccess,
    putDepartmentSuccess,
    postDepartmentSuccess
};

