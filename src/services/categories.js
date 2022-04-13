import { api } from "../helpers/api";


const getListCategory = (filter) => {
    const url = `/category/search/?page=${filter.page}&name=${filter.keyword}`;
    return api.get(url);
}

const getAllCategory = () => {
    return api.get("/category/list");
}

const editCategory = (data) => {
    const url = `/category/update/${data.id}`;
    const { id, ...rest } = data;
    return api.post(url, rest);
}

const createCategory = (data) => {
    return api.post("/category/store", data);
}

export { getListCategory, editCategory, createCategory, getAllCategory };
