import * as type from "../actionTypes/categories";

const getListCategories = (filter, onSuccess, onError) => {
    return {
        type: type.GET_CATEGORIES,
        payload: filter,
        onSuccess,
        onError
    };
};

const getCategoriesSuccess = (data) => {
    return {
        type: type.GET_CATEGORIES_SUCCESS,
        payload: data,
    };
};

const putCategory = (data, onSuccess, onError) => {
    return {
        type: type.PUT_CATEGORY,
        payload: data,
        onSuccess,
        onError,
    };
};

const postCategory = (data, onSuccess, onError) => {
    return {
        type: type.POST_CATEGORY,
        payload: data,
        onSuccess,
        onError,
    };
};

const getAllCategories = (onSuccess, onError) => {
    return {
        type: type.GET_ALL_CATEGORIES,
        onSuccess,
        onError
    };
}

const getAllCategoriesSuccess = (data) => {
    return {
        type: type.GET_ALL_CATEGORIES_SUCCESS,
        payload: data,
    };
};

const putCategorySuccess = (data) => {
    return {
        type: type.PUT_CATEGORY_SUCCESS,
        payload: data,
    };
};

const postCategorySuccess = (data) => {
    return {
        type: type.POST_CATEGORY_SUCCESS,
        payload: data,
    };
};

export {
    getListCategories,
    getCategoriesSuccess,
    putCategory,
    postCategory,
    getAllCategories,
    getAllCategoriesSuccess,
    postCategorySuccess,
    putCategorySuccess
};
