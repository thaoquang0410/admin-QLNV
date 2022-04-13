import { api } from "../helpers/api";


const getListRequest = (filter) => {
    const url = `/requests`;
    return api.get(url, { params: { ...filter } });
}

const editRequest = (data) => {
    const url = `/requests/${data.id}`;
    return api.post(url, data);
}

const createRequest = (data) => {
    return api.post("/requests", data);
}
const removeRequest = (id) => {
    const url = `/requests/${id}`;
    return api.delete(url);
}

const getTotalRequest = () => {
    return api.get(`/requests/count`);
}
export { getListRequest, editRequest, createRequest, removeRequest, getTotalRequest };

