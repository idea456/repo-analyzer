import { CHANGE_SEARCHED, ERROR_ENCOUNTERED, SET_ERROR } from "../types/global";

export function changeSearched() {
  return {
    type: CHANGE_SEARCHED
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload
  };
}

export function errorEncountered() {
  return {
    type: ERROR_ENCOUNTERED
  };
}
