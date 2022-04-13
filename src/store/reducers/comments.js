import * as type from "../actionTypes/comments";

const initState = {
  comments: [],
  histories:[],
  total: "",
  totalH:""
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case type.GET_COMMENT_SUCCESS:
      return {
        comments: [...action.payload],
        total: action.payload.total,
      };
    case type.POST_COMMENT_SUCCESS:
      const renderComments = [...state.comments];
      renderComments.unshift({ ...action.payload });
      return {
        ...state,
        comments: [...renderComments],
        total: state.total+1,
      };
      case type.GET_HISTORY_SUCCESS:
        return {
          histories: [...action.payload.comment],
          totalH: action.payload.total,
        };
    default:
      return state;
  }
};

export default commentReducer;
