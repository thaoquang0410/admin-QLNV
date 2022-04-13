import * as type from "../actionTypes/requests";

const initState = {
    requests: [],
    total: "",
    totalRequest: []
};

const requestReducer = (state = initState, action) => {
    switch (action.type) {
        case type.GET_REQUESTS_SUCCESS:
            return {
                ...state,
                requests: [...action.payload.data.requests],
                total: action.payload.data.total,
            };
        case type.POST_REQUEST_SUCCESS:
            const renderRequests = [...state.requests];
            renderRequests.unshift({ ...action.payload });
            return {
                ...state,
                requests: [...renderRequests],
            };
        case type.GET_TOTAL_REQUESTS_SUCCESS:
            return {
                ...state,
                totalRequest: [...action.payload.data],
            };
        case type.PUT_REQUEST_SUCCESS:
            const updateRequests = [...state.requests];
            for (let i = 0; i < updateRequests.length; i++) {
                if (updateRequests[i].id === action.payload.id) {
                    updateRequests[i] = { ...action.payload };
                    break;
                }
            }
            return {
                ...state,
                requests: [...updateRequests],
            };
        default:
            return state;
    }
};

export default requestReducer;
