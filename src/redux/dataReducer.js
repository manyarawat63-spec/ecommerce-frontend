export const initialState = {
  items: [],
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
      };
    default:
      return state;
  }
};