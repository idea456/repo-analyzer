import { CHANGE_LOADING, SET_DASHBOARD } from "../types/dashboard";

const initialState = {
  loading: true,
  commits: 0,
  branches: 0,
  releases: 0,
  forks: 0,
  pull_requests: 0,
  watch: 0,
  stars: 0,
  issues: 0
};

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_DASHBOARD:
      return {
        loading: action.payload.loading,
        commits: action.payload.commits,
        branches: action.payload.branches,
        releases: action.payload.releases,
        forks: action.payload.forks,
        pull_requests: action.payload.pull_requests,
        watch: action.payload.watch,
        stars: action.payload.stars,
        issues: action.payload.issues,
        popularity_data: action.payload.popularity_data,
        popularity_labels: action.payload.popularity_labels,
        language_labels: action.payload.language_labels,
        language_count: action.payload.language_count
      };
    default:
      return state;
  }
}

export default dashboardReducer;
