import * as type from '../actionTypes/forgotAuth';

const initState = {
    forgot: {}
}

const forgotReducer = (state = initState, action) => {
    switch (action.type) {
        case type.POST_EMAIL_FORGOT_SUCCESS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

export default forgotReducer;
