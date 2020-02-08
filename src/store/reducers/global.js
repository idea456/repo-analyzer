import { CHANGE_SEARCHED, ERROR_ENCOUNTERED, SET_ERROR } from "../types/global";

const initialState = {
  searched: false,
  error: false,
  error_msg: ""
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCHED:
      return {
        searched: true
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
        error_msg: action.payload.msg
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
