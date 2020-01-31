import { CHANGE_SEARCHED, ERROR_ENCOUNTERED } from "../types/global";

export function changeSearched() {
  return {
    type: CHANGE_SEARCHED
  };
}

export function errorEncountered() {
  return {
    type: ERROR_ENCOUNTERED
  };
}
