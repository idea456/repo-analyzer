import { CHANGE_LOADING, SET_COMMITS } from "../types/commits";

const initialState = {
  loading: true,
  timeline_data: [],
  timeline_labels: [],
  timeline_commit_data_owner: [],
  timeline_commit_data_all: [],
  commits_data: []
};

function commitsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_COMMITS:
      return {
        loading: action.payload.loading,
        timeline_data: action.payload.timeline_data,
        timeline_labels: action.payload.timeline_labels,
        timeline_commit_data_owner: action.payload.timeline_commit_data_owner,
        timeline_commit_data_all: action.payload.timeline_commit_data_all,
        commits_data: action.payload.commits_data,
        commit_count_owner: action.payload.commit_count_owner,
        commit_count_all: action.payload.commit_count_all
      };
    default:
      return state;
  }
}

export default commitsReducer;
