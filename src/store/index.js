import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import dashboardReducer from "../store/reducers/dashboard";
import globalReducer from "../store/reducers/global";
import commitsReducer from "../store/reducers/commits";

import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  global: globalReducer,
  commits: commitsReducer
});

const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(thunk, logger))
);

export default store;
