import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import dashboardReducer from "../store/reducers/dashboard";
import globalReducer from "../store/reducers/global";
import commitsReducer from "../store/reducers/commits";
import codeFrequencyReducer from "../store/reducers/code_frequency";

import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  global: globalReducer,
  commits: commitsReducer,
  code_frequency: codeFrequencyReducer
});

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk, logger))
);

export default store;
