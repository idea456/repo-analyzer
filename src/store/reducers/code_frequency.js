import {
  GET_CODE_FREQUENCY_DATA,
  CHANGE_LOADING
} from "../types/code_frequency";

const initialState = {
  loading: true,
  code_additions: [],
  code_deletions: []
};

function codeFrequencyReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_CODE_FREQUENCY_DATA:
      return {
        ...state,
        loading: action.payload.loading,
        code_additions: action.payload.code_additions,
        code_deletions: action.payload.code_deletions,
        contributors_data: action.payload.contributors_data
      };
    default:
      return state;
  }
}

export default codeFrequencyReducer;
