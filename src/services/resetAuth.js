import { api } from "../helpers/api"


const resetAuth = (data) => {
    return api.post('/auth/reset-password', data);
}
export { resetAuth }
