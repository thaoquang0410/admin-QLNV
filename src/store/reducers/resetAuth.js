import * as type from '../actionTypes/resetAuth';

const initState = {
    reset: {}
}

const resetReducer = (state = initState, action) => {
    switch (action.type) {
        case type.POST_EMAIL_RESET_SUCCESS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

export default resetReducer;
