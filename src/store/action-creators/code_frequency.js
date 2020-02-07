import axios from "axios";
import {
  GET_CODE_FREQUENCY_DATA,
  CHANGE_LOADING
} from "../types/code_frequency";

export function getCodeFrequencyData(owner, name) {
  return async function(dispatch, getState) {
    dispatch({
      type: CHANGE_LOADING,
      payload: true
    });

    let code_additions = [];
    let code_deletions = [];

    const code_frequency_url = `https://api.github.com/repos/${owner}/${name}/stats/code_frequency`;
    const code_frequency_data = await axios.get(code_frequency_url);

    for (let i = 0; i <= code_frequency_data.data.length; i++) {
      if (code_frequency_data.data[i] !== undefined) {
        let date = new Date(
          code_frequency_data.data[i][0] * 1000
        ).toISOString();
        code_additions.push({
          t: date,
          y: code_frequency_data.data[i][1]
        });
        code_deletions.push({
          t: date,
          y: code_frequency_data.data[i][2]
        });
      }
    }

    dispatch({
      type: GET_CODE_FREQUENCY_DATA,
      payload: {
        loading: false,
        code_additions,
        code_deletions
      }
    });
  };
}
