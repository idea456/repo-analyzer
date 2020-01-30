import { createStore } from "redux";
import dashboardReducer from "../store/reducers/dashboard";

const store = createStore(dashboardReducer);

export default store;
