import axios from "axios";
import { GET_CONTRIBUTORS_DATA, CHANGE_LOADING } from "../types/contributors";

export function getContributorsData(owner, name) {
  return async function(dispatch, getState) {
    dispatch({
      type: CHANGE_LOADING,
      payload: true
    });

    let contributors_url = `https://api.github.com/repos/${owner}/${name}/stats/contributors`;
    const contributors = await axios.get(contributors_url);
    const contributors_data = contributors.data;

    dispatch({
      type: GET_CONTRIBUTORS_DATA,
      payload: {
        loading: false,
        contributors_data
      }
    });
  };
}
