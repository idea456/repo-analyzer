import { CHANGE_LOADING, SET_COMMITS } from "../types/commits";
import axios from "axios";

export function changeLoading(payload) {
  return {
    type: CHANGE_LOADING,
    payload
  };
}
export function getCommitsData(owner, name) {
  return async function(dispatch, getState) {
    // query the data
    //   this.props.changeLoading(true);
    const url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${owner}/${name}/stats/commit_activity`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });

    const commits_url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${owner}/${name}/commits`;
    const response = await axios.get(commits_url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
    let commit_labels = [];
    let commit_data = [];

    for (let i = 0; i < data.length; i++) {
      commit_labels.push(new Date(data[i].week * 1000).toISOString());
      commit_data.push({
        t: new Date(data[i].week * 1000).toISOString(),
        y: data[i].total
      });
    }

    let timeline_additions = [];
    let timeline_deletions = [];

    const code_frequency_url = `https://cors-anywhere.herokuapp.com/https://api.github.com/repos/${owner}/${name}/stats/code_frequency`;
    const code_frequency_data = await axios.get(code_frequency_url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });

    for (let i = 0; i <= code_frequency_data.data.length; i++) {
      if (code_frequency_data.data[i] !== undefined) {
        let date = new Date(
          code_frequency_data.data[i][0] * 1000
        ).toISOString();
        timeline_additions.push({
          t: date,
          y: code_frequency_data.data[i][1]
        });
        timeline_deletions.push({
          t: date,
          y: code_frequency_data.data[i][2]
        });
      }
    }

    dispatch({
      type: SET_COMMITS,
      payload: {
        loading: false,
        timeline_labels: commit_labels,
        timeline_data: commit_data,
        commits_data: response.data,
        timeline_additions,
        timeline_deletions
      }
    });
  };
}
