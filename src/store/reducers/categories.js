import * as type from "../actionTypes/categories";

const initState = {
  categories: [],
  total: "",
  all: [],
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case type.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...action.payload.Category],
        total: action.payload.total,
      };
    case type.POST_CATEGORY_SUCCESS:
      const renderCategories = [...state.categories];
      renderCategories.unshift({ ...action.payload });
      return {
        ...state,
        categories: [...renderCategories],
        all: []
      };
    case type.PUT_CATEGORY_SUCCESS:
      const updateCategories = [...state.categories];
      for (let i = 0; i < updateCategories.length; i++) {
        if (updateCategories[i].id === +action.payload.id) {
          updateCategories[i] = { ...action.payload };
          break;
        }
      }
      return {
        ...state,
        categories: [...updateCategories],
        all: []
      };
    case type.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        all: [...action.payload],
      };
    default:
      return state;
  }
};

export default categoryReducer;
