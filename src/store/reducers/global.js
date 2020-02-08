import { CHANGE_SEARCHED, ERROR_ENCOUNTERED } from "../types/global";

const initialState = {
  searched: false,
  error: false
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCHED:
      return {
        searched: true
      };
    case ERROR_ENCOUNTERED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default globalReducer;
