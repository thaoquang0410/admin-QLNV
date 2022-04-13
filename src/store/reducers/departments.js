import * as type from "../actionTypes/departments";

const initState = {
  departments: [],
  total: "",
  all: []
};

const departmentReducer = (state = initState, action) => {
  switch (action.type) {
    case type.GET_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: [...action.payload.department],
        total: action.payload.total,
      };
    case type.GET_ALL_DEPARTMENT_SUCCESS:
      return {
        ...state,
        all: [...action.payload]
      };
    case type.PUT_DEPARTMENT_SUCCESS:
      const updateDepartment = [...state.departments];
      for (let i = 0; i < updateDepartment.length; i++) {
        if (updateDepartment[i].id === action.payload.id) {
          updateDepartment[i] = { ...action.payload };
          break;
        }
      }
      return {
        ...state,
        departments: [...updateDepartment],
        all: []
      };
    case type.POST_DEPARTMENT_SUCCESS:
      const renderDepartment = [...state.departments];
      renderDepartment.unshift({ ...action.payload });
      return {
        ...state,
        departments: [...renderDepartment],
        all: []
      };
    default:
      return state;
  }
};

export default departmentReducer;
