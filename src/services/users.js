import { api } from "../helpers/api"


const getListUser = (filter, getAll = false) => {
    let url = `/users?page=${filter.page}&user_name=${filter.keyword}&department_id=${filter.department}`;
    if (getAll) {
        url = "/users?pageUser=0";
    }
    return api.get(url);

}

const getAllAdmin = () => {
    return api.get("/users?pageAdmin=0")
}

const editUser = (data) => {
    const url = `/users/${data.id}`;
    return api.post(url, data)

}

const createUser = (data) => {
    return api.post("/users", data);
}

const getLisRole = () => {
    return api.get("/roles");
}

export { getListUser, editUser, createUser, getLisRole, getAllAdmin }
