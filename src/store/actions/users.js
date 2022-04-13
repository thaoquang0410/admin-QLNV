import * as type from "../actionTypes/users";

const getListUsers = (filter, onSuccess, onError) => {
    return {
        type: type.GET_USERS,
        payload: filter,
        onSuccess,
        onError
    };
};

const getAllAdmin = (onSuccess, onError) => {
    return {
        type: type.GET_ALL_ADMIN,
        onSuccess,
        onError
    };
}

const getAllAdminSuccess = (data) => {
    return {
        type: type.GET_ALL_ADMIN_SUCCESS,
        payload: data,
    };
};

const getAllAuthor = (onSuccess, onError) => {
    return {
        type: type.GET_ALL_AUTHOR,
        onSuccess,
        onError
    };
}

const getAllAuthorSuccess = (data) => {
    return {
        type: type.GET_ALL_AUTHOR_SUCCESS,
        payload: data,
    };
};

const getListRoles = (onSuccess, onError) => {
    return {
        type: type.GET_ROLES,
        onSuccess,
        onError
    };
};

const getUsersSuccess = (data) => {
    return {
        type: type.GET_USERS_SUCCESS,
        payload: data
    };
};

const getRolesSuccess = (data) => {
    return {
        type: type.GET_ROLES_SUCCESS,
        payload: data,
    };
};

const putUser = (data, onSuccess, onError) => {
    return {
        type: type.PUT_USER,
        payload: data,
        onSuccess,
        onError,
    };
};

const postUser = (data, onSuccess, onError) => {
    return {
        type: type.POST_USER,
        payload: data,
        onSuccess,
        onError,
    };
};

const putUserSuccess = (data) => {
    return {
        type: type.PUT_USER_SUCCESS,
        payload: data,
    };
};

const postUserSuccess = (data) => {
    return {
        type: type.POST_USER_SUCCESS,
        payload: data,
    };
};

export {
    getListUsers,
    getUsersSuccess,
    getListRoles,
    getRolesSuccess,
    putUser,
    postUser,
    getAllAdmin,
    getAllAdminSuccess,
    postUserSuccess,
    putUserSuccess,
    getAllAuthor,
    getAllAuthorSuccess
};
