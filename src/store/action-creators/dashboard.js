import { CHANGE_LOADING, SET_DASHBOARD } from "../types/dashboard";

export function changeLoading() {
  return {
    type: CHANGE_LOADING
  };
}

export function setDashboard(payload) {
  return {
    type: SET_DASHBOARD,
    payload
  };
}
