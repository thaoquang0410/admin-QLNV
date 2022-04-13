import { api } from "../helpers/api"


const login = (data) => {
    return api.post('/auth/login', data);
}
const loginGoogle = (data) => {
    return api.post('/auth/login-google', data);
}
const logoutAcc = ()=>{
    return api.post("/auth/logout");
}
export { login, loginGoogle, logoutAcc }
