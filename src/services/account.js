import { api } from "../helpers/api";


const getAccount = () => {    
    return api.get("/users/getinfo");
}

export {getAccount}