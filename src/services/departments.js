import { api } from "../helpers/api";


const getListDepartment = (filter) => {
    const url = `/departments/?page=${filter.page}&name=${filter.keyword}`;
    return api.get(url);
}

const getAllListDepartment = () => {
    return api.get("/departments");
}

const editDepartment = (data) => {
    const url = `/departments/${data.id}`;
    return api.post(url, data);
}

const createDepartment = (data) => {
    return api.post("/departments", data);
}


export { getListDepartment, editDepartment, createDepartment, getAllListDepartment };
