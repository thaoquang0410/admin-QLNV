import { combineReducers } from "redux";
import categoryReducer from "./categories";
import commentReducer from './comments';
import commonReducer from "./common";
import departmentReducer from "./departments";
import forgotReducer from "./forgotAuth";
import requestReducer from "./requests";
import resetReducer from "./resetAuth";
import usersReducer from "./users";

const rootReducer = combineReducers({
    common: commonReducer,
    users: usersReducer,
    forgot: forgotReducer,
    reset: resetReducer,
    categories: categoryReducer,
    departments: departmentReducer,
    requests: requestReducer,
    comments: commentReducer
})

export default rootReducer;