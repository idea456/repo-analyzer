import { GET_CONTRIBUTORS_DATA, CHANGE_LOADING } from "../types/contributors";

const initialState = {
  loading: true,
  contributors_data: []
};

function contributorsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_CONTRIBUTORS_DATA:
      return {
        ...state,
        loading: action.payload.loading,
        contributors_data: action.payload.contributors_data
      };
    default:
      return state;
  }
}

export default contributorsReducer;
