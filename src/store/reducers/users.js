import * as type from "../actionTypes/users";

const initState = {
  users: [],
  total: "",
  roles: [],
  admins: [],
  authors:[]
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case type.GET_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload.users],
        total: action.payload.total,
      };
    case type.POST_USER_SUCCESS:
      const renderUsers = [...state.users];
      renderUsers.unshift({ ...action.payload });
      return {
        ...state,
        users: [...renderUsers],
        admins: []
      };
    case type.PUT_USER_SUCCESS:
      const updateUsers = [...state.users];
      for (let i = 0; i < updateUsers.length; i++) {
        if (updateUsers[i].id === action.payload.id) {
          updateUsers[i] = { ...action.payload };
          break;
        }
      }
      return {
        ...state,
        users: [...updateUsers],
        admins: []
      };
    case type.GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: [...action.payload],
      };
    case type.GET_ALL_ADMIN_SUCCESS:
      return {
        ...state,
        admins: [...action.payload],
      };
    case type.GET_ALL_AUTHOR_SUCCESS:
      return {
        ...state,
        authors: [...action.payload],
      };
    default:
      return state;
  }
};

export default usersReducer;
