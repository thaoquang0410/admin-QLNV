import { api } from "../helpers/api"


const forgotAuth = (email) => {
    const url = `/auth/forgot-password?email=${email}`
    return api.get(url);
}
export { forgotAuth }
